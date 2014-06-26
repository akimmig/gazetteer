var messages = angular.module('gazetteer.messages', []);

messages.factory('messages', function(){
	return {
		"ui.error": "Fehler",
		"ui.contactAdmin": "Wenden Sie sich bitte an arachne@uni-koeln.de, falls das Problem länger besteht.",
		"ui.search.results": "Suchergebnis",
		"ui.search.hits": "Treffer",
		"ui.search.limit.10.tooltip": "10 Treffer pro Seite zeigen",
		"ui.search.limit.50.tooltip": "50 Treffer pro Seite zeigen",
		"ui.search.limit.100.tooltip": "100 Treffer pro Seite zeigen",
		"ui.search.limit.1000.tooltip": "1000 Treffer pro Seite zeigen",
		"ui.search.sort.score.tooltip": "Nach Relevanz sortieren",
		"ui.search.sort.id.tooltip": "Nach ID sortieren",
		"ui.search.sort.name.tooltip": "Nach Namen sortieren",
		"ui.search.sort.thesaurus.tooltip": "Nach Thesaurus sortieren",
		"ui.place.children.search": "Orte in Suche anzeigen",
		"ui.place.save.success": "Ort erfolgreich gespeichert",
		"ui.place.save.failure": "Ort konnte nicht gespeichert werden",
		"ui.place.save.failure.parentError": "Ein Ort darf nicht sein eigener untergeordneter Ort oder derjenige eines Ortes sein, den er enthält",
		"ui.place.remove.success": "Ort erfolgreich gelöscht",
		"ui.place.remove.failure": "Ort konnte nicht gelöscht werden",
		"ui.thesaurus": "Thesaurus",
		"ui.link.tooltip": "Mit aktuellem Ort verknüpfen",
		"ui.place.deleted": "Dieser Ort wurde gelöscht",
		"ui.merge.tooltip": "Diesen und aktuellen Ort zusammenfassen",
		"ui.merge.success.head": "Zusammenfassen erfolgreich",
		"ui.merge.success.body": "Bitte überprüfen Sie unten die Angaben des neu angelegten Orts",
		"ui.extendedSearch": "Erweiterte Suche",
		"ui.change-history.change-type.create": "Erstellt",
		"ui.change-history.change-type.edit": "Editiert",
		"ui.change-history.change-type.delete": "Gelöscht",
		"ui.change-history.change-type.unknown": "Unbekannt",
		"place.name.ancient": "Antik",
		"place.name.transliterated": "Transliteriert",
		"place.types.archaeological-site": "Archäologischer Ort",
		"place.types.archaeological-area": "Archäologischer Bereich",
		"place.types.continent": "Kontinent",
		"place.types.administrative-unit": "Verwaltungseinheit",
		"place.types.populated-place": "Bewohnter Ort",
		"place.types.museum": "Museum",
		"place.types.landform": "Landform",
		"place.types.island": "Insel",
		"place.types.hydrography": "Hydrographie",
		"place.types.landcover": "Landbedeckung",
		"place.types.description.archaeological-site": "Ort mit archäologisch relevanten Strukturen",
		"place.types.description.archaeological-area": "Archäologisch definierter Kulturraum und historische Verwaltungseinheiten",
		"place.types.description.continent": "Durch natürliche oder historische Grenzen getrennte Festlandmassen",
		"place.types.description.administrative-unit": "Politisch administrativ definierte Verwaltungseinheiten",
		"place.types.description.populated-place": "Von Menschen bewohnter Ort",
		"place.types.description.museum": "Standort von Museen und anderen Institutionen",
		"place.types.description.landform": "Geomorphologisches Geländemerkmal",
		"place.types.description.island": "Vollständig von Wasser umgegebene Landmasse (kleiner als Kontinente)",
		"place.types.description.hydrography": "Alle größeren (stehenden wie fließenden) Ansammlungen von Wasser",
		"place.types.description.landcover": "Physische und biologische Bedeckung der Erdoberfläche",
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
		"languages.sqi": "Albanisch",
		"languages.pol": "Polnisch",
		"languages.tur": "Türkisch",
		"languages.ara": "Arabisch",
		"languages.spa": "Spanisch",
		"languages.por": "Portugiesisch",
		"languages.zho": "Chinesisch",
		"languages.rus": "Russisch",
		"languages.vie": "Vietnamesisch",
		"domain.place.parent": "Liegt in",
		"domain.place.type": "Art",
		"domain.place.tags": "Tags"
	};
});