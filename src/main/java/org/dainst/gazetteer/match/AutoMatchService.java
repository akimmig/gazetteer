package org.dainst.gazetteer.match;

import java.util.List;

import org.dainst.gazetteer.dao.PlaceRepository;
import org.dainst.gazetteer.domain.Place;
import org.dainst.gazetteer.helpers.Merger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class AutoMatchService {
	
	Logger logger = LoggerFactory.getLogger(AutoMatchService.class);
	
	@Async
	public void runAutoMatch(PlaceRepository placeDao, Merger merger) {
		EntityIdentifier entityIdentifier = new SimpleNameAndIdBasedEntityIdentifier();
		entityIdentifier.setPlaceRepository(placeDao);
		
		List<Place> places = placeDao.findByNeedsReview(true);
		for (Place placeInReview : places) {
			logger.debug("checking place in review: {}", placeInReview);
			// refresh place in review in case db has changed through merging after calling findByNeedsReview()
			Place place = placeDao.findOne(placeInReview.getId());
			List<Candidate> candidates = entityIdentifier.getCandidates(place);
			if (!candidates.isEmpty()) {
				if (candidates.get(0).getScore() == 1) {
					Place mergedPlace = merger.merge(candidates.get(0).getCandidate(), candidates.get(0).getPlace());
					logger.debug("merging place in review {} with candidate {}",
							candidates.get(0).getPlace(), candidates.get(0).getCandidate());
					placeDao.save(mergedPlace);
					placeDao.delete(place);
				} else {
					// TODO store uncertain candidates for manual check
				}
			// places with no matches are probably new and need no further review
			} else {
				logger.debug("no match for place in review");
				place.setNeedsReview(false);
				placeDao.save(place);
			}
		}
	}

}
