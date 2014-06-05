'use strict';

// Declare app level module which depends on filters, and services
angular.module('gazetteer', ['gazetteer.filters', 'gazetteer.services', 'gazetteer.directives', 'ui']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/search', { templateUrl: 'partials/search.html', reloadOnSearch: false, controller: SearchCtrl});
    $routeProvider.when('/extended-search', { templateUrl: 'partials/extendedSearch.html', controller: ExtendedSearchCtrl});
    $routeProvider.when('/thesaurus', { templateUrl: 'partials/thesaurus.html', controller: ThesaurusCtrl});
    $routeProvider.when('/show/:id', { templateUrl: 'partials/show.html', controller: PlaceCtrl});
    $routeProvider.when('/edit/:id', { templateUrl: 'partials/edit.html', controller: PlaceCtrl});
    $routeProvider.when('/merge/:id', { templateUrl: 'partials/merge.html', controller: MergeCtrl});
    $routeProvider.when('/change-history/:id', { templateUrl: 'partials/changeHistory.html', controller: PlaceCtrl});
    $routeProvider.otherwise({ redirectTo: '/search'});
  }]).
  config(['$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('!');
  }]);
