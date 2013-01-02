'use strict';

function AppCtrl($scope, $location, $rootScope) {
	
	$scope.q = null;
	$rootScope.title = "";
	$rootScope.subtitle = "";
	
	$rootScope.activePlaces = [];
	
	$rootScope.alerts = [];
	
	$rootScope.loading = 0;
	
	$rootScope.bbox = [];
	$rootScope.zoom = 1;
	
	// search while typing
	$scope.$watch("q", function() {
		if ($scope.q != null && $scope.q.indexOf(':') == -1) {
			$scope.zoom = 1;
			console.log("AppCtrl.watch q:", $scope.q);
			$location.path('/search').search({q:$scope.q, type: "prefix"});
		}
	});
	
	$scope.submit = function() {
		$scope.zoom = 1;
		$location.path('/search').search({q:$scope.q, type: ""});
		$scope.q = null;
	};
	
	$rootScope.addAlert = function(body, head, type) {
		var alert = { body: body };
		if (head != null) alert.head = head;
		if (type != null) alert.alertClass = "alert-" + type;
		$rootScope.alerts.push(alert);
	};
	
	/*
	// needed to keep $scope.q and $location.search().q in sync
	$scope.$watch(
		function(){ 
			return $location.search().q;
		},
		function() {
			if ($location.path() == "/search"
					&& $scope.q != $location.search().q) {
				console.log("AppCtrl.location.q:", $location.search().q);
				$scope.q = $location.search().q;
			}
		}
	);
	*/
	
}

function SearchCtrl($scope, $rootScope, $location, $routeParams, Place, messages) {
	
	$rootScope.title = messages["ui.search.results"];
	$rootScope.subtitle = "";
	
	$scope.search = {
			offset: ($location.search().offset) ? parseInt($location.search().offset) : 0,
			limit: ($location.search().limit) ? parseInt($location.search().limit) : 10,
			q: ($location.search().q) ? ($location.search().q) : "",
			type: ($location.search().type) ? ($location.search().type) : "",
			sort: ($location.search().sort) ? ($location.search().sort) : "",
			order: ($location.search().order) ? ($location.search().order) : "",
			bbox: ($location.search().bbox) ? ($location.search().bbox) : ""
	};
	
	console.log("SearchCtrl init location.search.q:", $location.search().q);
	console.log("SearchCtrl init scope.search.q:", $scope.search.q);
	
	$scope.places = [];
	$scope.total = 0;
	$scope.zoom = 1;
	
	// search while zooming
	$scope.$watch(function() { return $scope.bbox.join(","); }, function() {
		if ($scope.bbox.length == 2) {
			$scope.search.bbox = $scope.bbox.join(",");
			$location.search($scope.search);
		}
	});
	
	$scope.$watch("total", function() {
		$rootScope.subtitle = $scope.total + " " + messages["ui.search.hits"];
	});
	
	$scope.$watch(("places"), function() {
		$rootScope.activePlaces = $scope.places;
	});
	
	$scope.page = function() {
		return $scope.search.offset / $scope.search.limit + 1;
	};
	
	$scope.totalPages = function() {
		return ($scope.total - ($scope.total % $scope.search.limit)) / $scope.search.limit + 1;
	};
	
	$scope.setLimit = function(limit) {
		$scope.search.limit = limit;
		$scope.search.offset = 0;
		$location.search($scope.search);
	};
	
	$scope.prevPage = function() {
		if ($scope.page() > 1) {
			$scope.search.offset = $scope.search.offset - $scope.search.limit;
			$location.search($scope.search);
		}
	};
	
	$scope.nextPage = function() {
		if ($scope.page() < $scope.totalPages()) {
			$scope.search.offset = $scope.search.offset + $scope.search.limit;
			$location.search($scope.search);
		}
	};
	
	$scope.orderBy = function(sort) {
		if ($scope.search.sort == sort) {
			$scope.search.order = ($scope.search.order == "asc") ? "desc" : "asc";
		} else {
			$scope.search.sort = sort;
			$scope.search.order = "asc";
		}
		$scope.search.offset = 0;
		$location.search($scope.search);
	};
	
	$scope.submit = function() {
		$rootScope.loading++;
		Place.query($scope.search, function(result) {
			$scope.places = result.result;
			if ($scope.total != result.total)
				$scope.total = result.total;
			$rootScope.loading--;
		});
	};
	
	// needed to keep $scope.search and $location.search() in sync
	// because reloadOnSearch is turned off for this controller
	$scope.$watch(
		function(){ 
			return $location.absUrl();
		},
		function() {
			if ($location.path() == "/search") {
				$scope.search = {
					offset: ($location.search().offset) ? parseInt($location.search().offset) : 0,
					limit: ($location.search().limit) ? parseInt($location.search().limit) : 10,
					q: ($location.search().q) ? ($location.search().q) : "",
					type: ($location.search().type) ? ($location.search().type) : "",
					sort: ($location.search().sort) ? ($location.search().sort) : "",
					order: ($location.search().order) ? ($location.search().order) : "",
					bbox: ($location.search().bbox) ? ($location.search().bbox) : ""
				};
				$scope.submit();
			}
		}
	);

}


function PlaceCtrl($scope, $rootScope, $routeParams, Place, Thesaurus, $http, messages) {
	
	$scope.location = { confidence: 0 };
	$scope.link = { predicate: "owl:sameAs" };
	
	$scope.thesauri = Thesaurus.query();
	
	if ($routeParams.id) {
		$rootScope.loading++;
		$scope.place = Place.get({
			id: $routeParams.id
		}, function(result) {
			if (result.parent) {
				$rootScope.loading++;
				$http.get(result.parent).success(function(result) {
					$scope.parent = result;
				});
				$rootScope.loading--;
			}
			$rootScope.loading++;
			Place.query({q: "relatedPlaces:" + $scope.place.gazId}, function(result) {
				$scope.relatedPlaces = result.result;
				$rootScope.loading--;
			});
			$rootScope.loading++;
			Place.query({q: "parent:" + $scope.place.gazId, sort:"prefName.title.sort"}, function(result) {
				$scope.totalChildren = result.total;
				$scope.children = result.result;
				$scope.offsetChildren = 0;
				$rootScope.loading--;
			});
			$rootScope.title = result.prefName.title,
			$rootScope.subtitle = result["@id"]	+ '<a data-toggle="modal" href="#copyUriModal"><i class="icon-share" style="font-size:0.7em"></i></a>';
			$rootScope.activePlaces = [ result ];
			$rootScope.loading--;
		});
	}
	
	// show live changes of title
	$scope.$watch("place.prefName.title", function() {
		if ($scope.place && $scope.place.prefName)
			$rootScope.title = $scope.place.prefName.title;
	});
	
	// show live changes of location
	$scope.$watch("place.prefLocation.coordinates", function() {
		if ($scope.place && $scope.place.prefLocation)
			$rootScope.activePlaces = [$scope.place];
	});
	
	$scope.prevChildren = function() {
		$scope.offsetChildren -= 10;
		$rootScope.loading++;
		Place.query({q: "parent:" + $scope.place.gazId, sort:"prefName.title.sort", offset:$scope.offsetChildren }, function(result) {
			$scope.children = result.result;
			$rootScope.loading--;
		});
	};
	
	$scope.nextChildren = function() {
		$scope.offsetChildren += 10;
		$rootScope.loading++;
		Place.query({q: "parent:" + $scope.place.gazId, sort:"prefName.title.sort", offset:$scope.offsetChildren }, function(result) {
			$scope.children = result.result;
			$rootScope.loading--;
		});
	};
	
	$scope.save = function() {
		$rootScope.loading++;
		Place.save(
			$scope.place,
			function(data) {
				if (data.gazId) {
					$scope.place = data;
				}
				$rootScope.addAlert(messages["ui.place.save.success"], null, "success");
				window.scrollTo(0,0);
				$rootScope.loading--;
			},
			function(result) {
				$scope.failure = result.data.message; 
				$rootScope.addAlert(messages["ui.place.save.failure"], null, "error");
				window.scrollTo(0,0);
				$rootScope.loading--;
			}
		);
	};
	
	$scope.addThesaurus = function() {
		if (!$scope.thesaurus.key) return;
		if ($scope.place.thesauri == undefined)
			$scope.place.thesauri = [];
		$scope.place.thesauri.push($scope.thesaurus.key);
		$scope.thesaurus = {};
	};
	
	$scope.getThesaurusForKey = function(key) {
		for (var i=0; i < $scope.thesauri.length; i++) {
			if ($scope.thesauri[i].key == key)
				return $scope.thesauri[i];
		}
	};
	
	$scope.addComment = function() {
		if (!$scope.comment.text || !$scope.comment.language) return;
		if ($scope.place.comments == undefined)
			$scope.place.comments = [];
		$scope.place.comments.push($scope.comment);
		$scope.comment = {};
	};
	
	$scope.addName = function() {
		if (!$scope.name.title) return;
		if ($scope.place.names == undefined)
			$scope.place.names = [];
		$scope.place.names.push($scope.name);
		$scope.name = {};
	};
	
	$scope.addLocation = function() {
		if (!$scope.location.coordinates) return;
		if ($scope.place.locations == undefined)
			$scope.place.locations = [];
		$scope.place.locations.push($scope.location);
		$scope.location = { confidence: 0 };
	};
	
	$scope.addIdentifier = function() {
		if (!$scope.identifier.value || !$scope.identifier.context) return;
		if ($scope.place.identifiers == undefined)
			$scope.place.identifiers = [];
		$scope.place.identifiers.push($scope.identifier);
		$scope.identifier = { };
	};
	
	$scope.addLink = function() {
		if (!$scope.link.object || !$scope.link.predicate) return;
		if ($scope.place.links == undefined)
			$scope.place.links = [];
		$scope.place.links.push($scope.link);
		$scope.link = { predicate: "owl:sameAs" };
	};
	
	$scope.addRelatedPlace = function() {
		if (!$scope.relatedPlace['@id']) return;
		var relatedPlaces = $scope.relatedPlaces;
		if (relatedPlaces == undefined)
			relatedPlaces = [];
		relatedPlaces.push($scope.relatedPlace);
		$scope.relatedPlace = { "@id" : null };
		$scope.relatedPlaces = relatedPlaces;
	};
	
	// update relatedPlaces attribute of place when relatedPlaces in scope changes
	$scope.$watch("relatedPlaces.length", function() {
		$scope.place.relatedPlaces = [];
		for (var i in $scope.relatedPlaces)
			$scope.place.relatedPlaces.push($scope.relatedPlaces[i]["@id"]);
	});

}

function MergeCtrl($scope, $rootScope, $routeParams, $location, Place, $http, messages) {
	
	if ($routeParams.id) {
		$rootScope.loading++;
		$scope.place = Place.get({
			id: $routeParams.id
		}, function(result) {
			$rootScope.title = result.prefName.title,
			$rootScope.subtitle = result["@id"]	+ '<a data-toggle="modal" href="#copyUriModal"><i class="icon-share" style="font-size:0.7em"></i></a>';
			$scope.getCandidatesByName();
			$rootScope.loading--;
		});
	}
	
	$scope.getCandidatesByName = function() {
		var query = "(\"" + $scope.place.prefName.title + "\"~0.5";
		for(var i in $scope.place.names) {
			query += " OR \"" + $scope.place.names[i].title + "\"~0.5";
		}
		query += ") AND NOT _id:" + $scope.place.gazId;
		$rootScope.loading++;
		Place.query({q: query, type: 'queryString'}, function(result) {
			$scope.candidatePlaces = result.result;
			$rootScope.loading--;
		});
	};
	
	$scope.getCandidatesByLocation = function() {
		$rootScope.loading++;
		Place.distance({
			lon: $scope.place.prefLocation.coordinates[0],
			lat: $scope.place.prefLocation.coordinates[1],
			distance: 50,
			filter: "type:"+ $scope.place.type + " AND NOT _id:" + $scope.place.gazId
		}, function(result) {
			$scope.candidatePlaces = result.result;
			$rootScope.loading--;
		});
	};
	
	$scope.$watch("candidatePlaces", function() {
		var activePlaces = [];
		if ($scope.candidatePlaces)
			activePlaces = activePlaces.concat($scope.candidatePlaces);
		activePlaces.push($scope.place);
		$rootScope.activePlaces = activePlaces;
	});
	
	$scope.link = function(place1, place2) {
		if (place1.relatedPlaces == undefined)
			place1.relatedPlaces = [];
		place1.relatedPlaces.push(place2["@id"]);
		$rootScope.loading++;
		Place.save(place1, function(result) {
			$rootScope.addAlert(messages["ui.place.save.success"], place1.prefName.title, "success");
			$rootScope.loading--;
		}, function(result) {
			$rootScope.addAlert(messages["ui.place.save.failure"], place1.prefName.title, "error");
			$rootScope.loading--;
		});
		if (place2.relatedPlaces == undefined)
			place2.relatedPlaces = [];
		place2.relatedPlaces.push(place1["@id"]);
		$rootScope.loading++;
		Place.save(place2, function(result) {
			$rootScope.addAlert(messages["ui.place.save.success"], place2.prefName.title, "success");
			$rootScope.loading--;
		}, function(result) {
			$rootScope.addAlert(messages["ui.place.save.failure"], place2.prefName.title, "error");
			$rootScope.loading--;
		});
	};
	
	$scope.merge = function(place1, place2) {
		$rootScope.loading++;
		place1.$merge({id2: place2.gazId }, function(result) {
			$rootScope.addAlert(messages["ui.merge.success.body"],
					messages["ui.merge.success.head"], "success");
			$location.path("/edit/" + result.gazId);
			$rootScope.loading--;
		});
	};
	
}
