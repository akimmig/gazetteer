package org.dainst.gazetteer.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dainst.gazetteer.converter.JsonPlaceDeserializer;
import org.dainst.gazetteer.dao.PlaceRepository;
import org.dainst.gazetteer.dao.UserRepository;
import org.dainst.gazetteer.domain.Place;
import org.dainst.gazetteer.domain.User;
import org.dainst.gazetteer.helpers.ProtectLocationsService;
import org.dainst.gazetteer.search.ElasticSearchPlaceQuery;
import org.elasticsearch.client.Client;
import org.elasticsearch.search.facet.Facet;
import org.elasticsearch.search.facet.terms.TermsFacet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.RequestContext;

@Controller
public class SearchController {

	private static final Logger logger = LoggerFactory.getLogger(SearchController.class);
	
	@Autowired
	private PlaceRepository placeDao;
	
	@Autowired
	private UserRepository userDao;
	
	@Autowired
	private JsonPlaceDeserializer jsonPlaceDeserializer;
	
	@Autowired
	private Client client;
	
	@Value("${baseUri}")
	private String baseUri;
	
	@Value("${languages}")
	private String[] languages;
	
	@Value("${googleMapsApiKey}")
	private String googleMapsApiKey;
	
	@Autowired
	MessageSource messageSource;
	
	@RequestMapping(value="/search", method=RequestMethod.GET)
	public ModelAndView simpleSearch(@RequestParam(defaultValue="10") int limit,
			@RequestParam(defaultValue="0") int offset,
			@RequestParam(required=false) String q,
			@RequestParam(required=false) String fq,
			@RequestParam(required=false) String sort,
			@RequestParam(defaultValue="asc") String order,
			@RequestParam(required=false) String type,
			@RequestParam(required=false, defaultValue="map,table") String view,
			@RequestParam(required=false) String callback,
			@RequestParam(required=false) String showInReview,
			@RequestParam(required=false) double[] bbox,
			HttpServletRequest request,
			HttpServletResponse response) {
		
		logger.info("bbox:" + Arrays.toString(bbox));
		
		RequestContext requestContext = new RequestContext(request);
		Locale locale = requestContext.getLocale();
		
		logger.debug("Searching places with query: " + q + ", fq: " + fq + ", limit: " + limit + ", offset: " + offset);
		
		ElasticSearchPlaceQuery query = new ElasticSearchPlaceQuery(client);
		if (q != null) {
			q = q.replace("/", "\\/");
			
			if ("fuzzy".equals(type)) query.fuzzySearch(q);
			else if ("prefix".equals(type)) query.prefixSearch(q);
			else if ("queryString".equals(type)) query.queryStringSearch(q);
			else if ("extended".equals(type)) query.extendedSearch(q);
			else query.metaSearch(q);
		} else {
			query.listAll();
		}
		if (fq != null && !fq.isEmpty()) {
			query.addFilter(fq);
		}
		query.addBoostForChildren();
		query.limit(limit);
		query.offset(offset);
		if (sort != null && !sort.isEmpty()) {
			query.addSort(sort, order);
		}
		query.addFilter("deleted:false");
		if (!"true".equals(showInReview)) query.addFilter("needsReview:false");		
		query.addFacet("parent");
		query.addFacet("type");
		//query.addFacet("tags");
		
		if (bbox != null && bbox.length > 0) {
			query.addBBoxFilter(bbox[0], bbox[1], bbox[2], bbox[3]);
		}
		
		// get ids from elastic search
		String[] result = query.execute();
		
		logger.debug("Querying index returned: " + result.length + " places");
		logger.debug("Result: {}", Arrays.toString(result));
		
		// get places for the result ids from db
		List<Place> places = placesForList(result);
		logger.debug("Places: {}", places);
		Map<String,List<String[]>> facets = processFacets(query, locale);
		
		User user = null;
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof User)
			user = (User) principal;
		
		for (Place place : places)
			ProtectLocationsService.protectLocations(user, place);
		
		ModelAndView mav = new ModelAndView("place/list");
		mav.addObject("places", places);
		mav.addObject("facets", facets);
		mav.addObject("baseUri", baseUri);
		mav.addObject("language", locale.getISO3Language());
		mav.addObject("limit", limit);
		mav.addObject("offset", offset);
		mav.addObject("hits", query.getHits());
		mav.addObject("view", view);
		mav.addObject("q", q);
		mav.addObject("googleMapsApiKey", googleMapsApiKey);
		mav.addObject("callback", callback);
		
		return mav;
		
	}

	@RequestMapping(value="/search", method=RequestMethod.POST)
	public ModelAndView extendedSearch(@RequestParam(defaultValue="10") int limit,
			@RequestParam(defaultValue="0") int offset,
			@RequestParam(required=false) String showInReview,
			@RequestBody String jsonQuery,
			HttpServletRequest request) {
		
		RequestContext requestContext = new RequestContext(request);
		Locale locale = requestContext.getLocale();
		
		ElasticSearchPlaceQuery query = new ElasticSearchPlaceQuery(client);
		query.extendedSearch(jsonQuery);
		query.limit(limit);
		query.offset(offset);
		query.addBoostForChildren();
		query.addFilter("deleted:false");
		if (!"true".equals(showInReview)) query.addFilter("needsReview:false");
		query.addFacet("parent");
		query.addFacet("type");
		//query.addFacet("tags");
		
		logger.debug("executing extended search with query: {}", jsonQuery);
		
		// get ids from elastic search
		String[] result = query.execute();
		
		List<Place> places = placesForList(result);
		Map<String,List<String[]>> facets = processFacets(query, locale);
		
		User user = null;
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof User)
			user = (User) principal;
		
		for (Place place : places)
			ProtectLocationsService.protectLocations(user, place);
		
		ModelAndView mav = new ModelAndView("place/list");
		mav.addObject("places", places);
		mav.addObject("facets", facets);
		mav.addObject("baseUri", baseUri);
		mav.addObject("language", locale.getISO3Language());
		mav.addObject("limit", limit);
		mav.addObject("offset", offset);
		mav.addObject("hits", query.getHits());
		mav.addObject("googleMapsApiKey", googleMapsApiKey);
		return mav;
		
	}
	
	@RequestMapping(value="/geoSearch", method=RequestMethod.GET)
	public ModelAndView geoList(@RequestParam(defaultValue="10") int limit,
			@RequestParam(defaultValue="0") int offset,
			@RequestParam double lat,
			@RequestParam double lon,
			@RequestParam(defaultValue="50") int distance,
			@RequestParam(required=false) String filter,
			@RequestParam(required=false) String showInReview,
			HttpServletRequest request,
			HttpServletResponse response) {
		
		RequestContext requestContext = new RequestContext(request);
		Locale locale = requestContext.getLocale();
		
		ElasticSearchPlaceQuery query = new ElasticSearchPlaceQuery(client);
		query.geoDistanceSearch(lon, lat, distance);
		query.addGeoDistanceSort(lon, lat);
		query.limit(limit);
		query.offset(offset);
		query.addFilter("deleted:false");
		if (!"true".equals(showInReview)) query.addFilter("needsReview:false");
		query.addFacet("parent");
		query.addFacet("type");
		//query.addFacet("tags");
		
		if (filter != null) {
			query.addFilter(filter);
		}
		
		// get ids from elastic search
		String[] result = query.execute();
		Map<String,List<String[]>> facets = processFacets(query, locale);
		
		logger.debug("Querying index returned: " + result.length + " places");
		
		List<Place> places = placesForList(result);
		
		User user = null;
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof User)
			user = (User) principal;
		
		for (Place place : places)
			ProtectLocationsService.protectLocations(user, place);
		
		ModelAndView mav = new ModelAndView("place/list");
		mav.addObject("places", places);
		mav.addObject("facets", facets);
		mav.addObject("baseUri", baseUri);
		mav.addObject("language", locale.getISO3Language());
		mav.addObject("limit", limit);
		mav.addObject("offset", offset);
		mav.addObject("hits", query.getHits());
		mav.addObject("googleMapsApiKey", googleMapsApiKey);
		
		return mav;
		
	}
	
	// get places for the result ids from db
	private List<Place> placesForList(String[] result) {
		List<Place> places = new ArrayList<Place>();
		for (int i = 0; i < result.length; i++) {
			places.add(placeDao.findOne(result[i]));
		}
		return places;
	}

	private Map<String,List<String[]>> processFacets(ElasticSearchPlaceQuery query, Locale locale) {
		
		Map<String,List<String[]>> result = new HashMap<String,List<String[]>>();
		List<Facet> facets = query.getFacets().facets();
		
		if (facets != null) for (Facet facet : facets) {
			
			List<String[]> terms = new ArrayList<String[]>();
			
			TermsFacet f = (TermsFacet) facet;
			
			// replace parent ids with prefName
			if (facet.getName().equals("parent")) {
				for (TermsFacet.Entry entry : f) {
					Place place = placeDao.findOne(entry.getTerm().string());
					if (place == null) continue;
					String[] term = new String[3];
					try {
						term[0] = place.getPrefName().getTitle();
					} catch (NullPointerException e) {
						logger.warn("could not resolve parent name for facet. place: " + place, e);
						continue;
					}
					term[1] = entry.getTerm().string();
					term[2] = String.valueOf(entry.getCount());
					terms.add(term);
				}
			} else if (facet.getName().equals("type")) {
				for (TermsFacet.Entry entry : f) {
					String message;
					try {
						message = messageSource.getMessage("place.types."+entry.getTerm(), null, locale);
					} catch (NoSuchMessageException e) {
						logger.warn("No message for type '" + entry.getTerm() + "'.", e);
						message = entry.getTerm().string();
					}
					String[] term = new String[3];
					term[0] = message;
					term[1] = entry.getTerm().string();
					term[2] = String.valueOf(entry.getCount());
					terms.add(term);
				}
			} else {
				for (TermsFacet.Entry entry : f) {
					String[] term = new String[3];
					term[0] = entry.getTerm().string();
					term[1] = entry.getTerm().string();
					term[2] = String.valueOf(entry.getCount());
					terms.add(term);
				}
			}	
			
			result.put(facet.getName(), terms);
			
		}
		
		return result;
		
	}
	
}
