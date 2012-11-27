var messages = angular.module('gazetteer.messages', []);

messages.factory('messages', function(){
	return {
		"ui.search.results": "Suchergebnis",
		"ui.search.hits": "Treffer",
		"place.types.continent": "Kontinent",
		"place.types.country": "Land",
		"place.types.city": "Stadt",
		"location.confidence.0": "Keine Angabe",
		"location.confidence.1": "Ungenau",
		"location.confidence.2": "Genau",
		"location.confidence.3": "Exakt",
		"languages.deu": "Deutsch",
		"languages.eng": "Englisch",
		"languages.ita": "Italienisch",
		"languages.fra": "Französisch",
		"languages.ell": "Griechisch (Modern)",
		"languages.lat": "Lateinisch",
		"languages.grc": "Altgriechisch",
		"languages.sqi": "Albanisch"
	};
});