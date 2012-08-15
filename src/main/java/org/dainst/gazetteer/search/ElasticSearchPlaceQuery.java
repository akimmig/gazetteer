package org.dainst.gazetteer.search;

import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.List;

import org.dainst.gazetteer.converter.JsonPlaceDeserializer;
import org.dainst.gazetteer.domain.Place;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ElasticSearchPlaceQuery {
	
	private static final Logger logger = LoggerFactory.getLogger(ElasticSearchPlaceQuery.class);
	
	private SearchRequestBuilder requestBuilder;
	private JsonPlaceDeserializer jsonPlaceDeserializer;
	private long hits = -1;

	public ElasticSearchPlaceQuery(Client client, JsonPlaceDeserializer jsonPlaceDeserializer) {
		requestBuilder = client.prepareSearch("gazetteer");
		this.jsonPlaceDeserializer = jsonPlaceDeserializer;
	}
	
	public ElasticSearchPlaceQuery metaSearch(String query) {
		if("".equals(query) || "*".equals(query)) requestBuilder.setQuery(QueryBuilders.matchAllQuery());
		else requestBuilder.setQuery(QueryBuilders.textQuery("_all", query));
		return this;
	}

	public void listAll() {
		requestBuilder.setQuery(QueryBuilders.matchAllQuery());		
	}
	
	public ElasticSearchPlaceQuery offset(int offset) {
		requestBuilder.setFrom(offset);
		return this;
	}
	
	public ElasticSearchPlaceQuery limit(int limit) {
		requestBuilder.setSize(limit);
		return this;
	}
	
	public long getHits() {
		return hits;
	}
	
	public List<Place> execute() {
		
		List<Place> result = new ArrayList<Place>();
		
		SearchResponse response = requestBuilder.execute().actionGet();
		hits = response.hits().getTotalHits();
		for (SearchHit hit : response.getHits()) {
			try {
				logger.debug("deserializing hit: " + hit.sourceAsString());
				Place place = jsonPlaceDeserializer.deserialize(new ByteArrayInputStream(hit.sourceAsString().getBytes("UTF-8")));
				result.add(place);
			} catch (Exception e) {
				logger.error("unable to deserialize json query result", e);
			}
		}
		
		return result;
		
	}

	public ElasticSearchPlaceQuery fuzzySearch(String query) {
		requestBuilder.setQuery(QueryBuilders.fuzzyQuery("_all", query));
		return this;
	}

}
