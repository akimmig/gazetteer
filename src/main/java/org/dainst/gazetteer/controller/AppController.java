package org.dainst.gazetteer.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.dainst.gazetteer.dao.RecordGroupRepository;
import org.dainst.gazetteer.domain.User;
import org.dainst.gazetteer.domain.RecordGroup;
import org.dainst.gazetteer.helpers.LanguagesHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.support.RequestContext;

@Controller
public class AppController {
	
	private static Logger logger = LoggerFactory.getLogger(AppController.class);
	
	@Value("${baseUri}")
	private String baseUri;
	
	@Value("${googleMapsApiKey}")
	private String googleMapsApiKey;
	
	@Value("${idTypes}")
	private String[] idTypes;
	
	@Value("${placeTypes}")
	private String[] placeTypes;
	
	@Value("${placeTypeGroups}")
	private String[] placeTypeGroups;
	
	@Value("${placeTypeGroupIds}")
	private int[] placeTypeGroupIds;
	
	@Value("${version}")
	private String version;
	
	@Autowired
	private RecordGroupRepository recordGroupDao;
	
	@Autowired
	LanguagesHelper langHelper;
	@RequestMapping(value="/app/")
	public String app(ModelMap model, HttpServletRequest request, 
			@RequestParam(value="_escaped_fragment_", required=false) String fragment) throws UnsupportedEncodingException {
		
		// render static html for crawlers
		if (fragment != null && !fragment.isEmpty() && fragment.startsWith("/show")) {
			String[] split = URLDecoder.decode(fragment, "UTF-8").split("/");
			return "forward:/doc/" + split[2] + ".html";
		}
		
		model.addAttribute("baseUri",baseUri);
		Locale locale = new RequestContext(request).getLocale();
		model.addAttribute("language", locale.getLanguage());
		model.addAttribute("languages", langHelper.getLocalizedLanguages(locale));
		model.addAttribute("googleMapsApiKey", googleMapsApiKey);
		model.addAttribute("idTypes", idTypes);
		model.addAttribute("placeTypes", placeTypes);
		model.addAttribute("placeTypeGroups", placeTypeGroups);
		model.addAttribute("placeTypeGroupIds", placeTypeGroupIds);
		model.addAttribute("version", version);
		logger.info("accept: {}", request.getHeader("Accept"));
		return "app/index";
	}
	
	@RequestMapping(value="/app/{view}.html")
	public String app(@PathVariable String view, ModelMap model, HttpServletRequest request) {		
		model.addAttribute("baseUri",baseUri);
		Locale locale = new RequestContext(request).getLocale();
		model.addAttribute("language", locale.getLanguage());
		model.addAttribute("languages", langHelper.getLocalizedLanguages(locale));
		model.addAttribute("googleMapsApiKey", googleMapsApiKey);
		model.addAttribute("idTypes", idTypes);
		model.addAttribute("placeTypes", placeTypes);
		model.addAttribute("placeTypeGroups", placeTypeGroups);
		model.addAttribute("placeTypeGroupIds", placeTypeGroupIds);
		return "app/" + view;
	}
	
	@RequestMapping(value="/app/partials/{view}.html")
	public String appPartials(@PathVariable String view, ModelMap model, HttpServletRequest request) {
		User user = null;
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal != null && principal instanceof User) {
			user = (User) principal;
		
			List<RecordGroup> recordGroups = (List<RecordGroup>) recordGroupDao.findAll();
			List<RecordGroup> availableRecordGroups = new ArrayList<RecordGroup>();
			for (RecordGroup recordGroup : recordGroups) {
				if (user.getRecordGroupIds().contains(recordGroup.getId()))
					availableRecordGroups.add(recordGroup);
			}
			
			model.addAttribute("recordGroups", availableRecordGroups.toArray());
		}
		
		model.addAttribute("baseUri",baseUri);
		Locale locale = new RequestContext(request).getLocale();
		model.addAttribute("language", locale.getLanguage());
		model.addAttribute("languages", langHelper.getLocalizedLanguages(locale));
		model.addAttribute("idTypes", idTypes);
		model.addAttribute("placeTypes", placeTypes);
		model.addAttribute("placeTypeGroups", placeTypeGroups);
		model.addAttribute("placeTypeGroupIds", placeTypeGroupIds);
		return "app/partials/" + view;
	}
	
}
