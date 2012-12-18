var messages = angular.module('gazetteer.messages', []);

messages.factory('messages', function(){
	return {
		"ui.search.results": "Suchergebnis",
		"ui.search.hits": "Treffer",
		"ui.search.limit.10.tooltip": "10 Treffer pro Seite zeigen",
		"ui.search.limit.100.tooltip": "100 Treffer pro Seite zeigen",
		"ui.search.limit.1000.tooltip": "1000 Treffer pro Seite zeigen",
		"ui.search.sort.score.tooltip": "Nach Relevanz sortieren",
		"ui.search.sort.id.tooltip": "Nach ID sortieren",
		"ui.search.sort.name.tooltip": "Nach Namen sortieren",
		"ui.search.sort.thesaurus.tooltip": "Nach Thesaurus sortieren",
		"ui.place.children.search": "Orte in Suche anzeigen",
		"ui.place.save.success": "Ort erfolgreich gespeichert",
		"ui.place.save.failure": "Ort konnte nicht gespeichert werden",
		"ui.link.tooltip": "Mit aktuellem Ort verknüpfen",
		"ui.merge.tooltip": "Diesen und aktuellen Ort zusammenfassen",
		"ui.merge.success.head": "Zusammenfassen erfolgreich",
		"ui.merge.success.body": "Bitte überprüfen Sie unten die Angaben des neu angelegten Orts",
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