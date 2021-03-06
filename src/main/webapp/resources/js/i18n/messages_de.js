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
		"ui.search.sort.type.tooltip": "Nach Art sortieren",
		"ui.search.sort.thesaurus.tooltip": "Nach Thesaurus sortieren",
		"ui.search.filter": "Filter",
		"ui.search.filter.coordinates": "Mit Koordinaten",
		"ui.search.filter.no-coordinates": "Ohne Koordinaten",
		"ui.search.filter.polygon": "Mit Polygon",
		"ui.search.filter.no-polygon": "Ohne Polygon",
		"ui.place.names.more": "mehr",
		"ui.place.names.less": "weniger",
		"ui.place.children.search": "Orte in Suche anzeigen",
		"ui.place.save.success": "Ort erfolgreich gespeichert",
		"ui.place.save.failure": "Ort konnte nicht gespeichert werden",
		"ui.place.save.failure.parentError": "Ein Ort darf nicht sein eigener untergeordneter Ort oder derjenige eines Ortes sein, den er enthält.",
		"ui.place.save.failure.accessDeniedError": "Sie verfügen nicht über die nötige Berechtigung, um diesen Ort zu bearbeiten.",
		"ui.place.remove.success": "Ort erfolgreich gelöscht",
		"ui.place.remove.failure": "Ort konnte nicht gelöscht werden",
		"ui.place.protected-site-info": "Bitte loggen Sie sich ein, um Zugriff auf die exakten Koordinaten zu erhalten.",
		"ui.place.user-group-info": "Wenn eine Datensatzgruppe festgelegt wird, ist der Ort nur für Mitglieder dieser Gruppe sichtbar. Diese Einstellung kann zu einem späteren Zeitpunkt nicht mehr geändert werden.",
		"ui.thesaurus": "Thesaurus",
		"ui.create": "Ort anlegen",
		"ui.link.tooltip": "Mit aktuellem Ort verknüpfen",
		"ui.place.deleted": "Dieser Ort wurde gelöscht",
		"ui.place.hiddenPlace": "Versteckter Ort",
		"ui.place.provenance-info": "Dieses Objekt enthält Daten aus den angegebenen Quellen.",
		"ui.merge.tooltip": "Diesen und aktuellen Ort zusammenfassen",
		"ui.merge.success.head": "Zusammenfassen erfolgreich",
		"ui.merge.success.body": "Bitte überprüfen Sie unten die Angaben des neu angelegten Orts",
		"ui.extendedSearch": "Erweiterte Suche",
		"ui.change-history.change-type.create": "Erstellt",
		"ui.change-history.change-type.edit": "Editiert",
		"ui.change-history.change-type.delete": "Gelöscht",
		"ui.change-history.change-type.merge": "Zusammengeführt",
		"ui.change-history.change-type.replace": "Ersetzt",
		"ui.change-history.change-type.unknown": "Unbekannt",
		"place.name.ancient": "Antik",
		"place.name.transliterated": "Transliteriert",
		"place.types.archaeological-site": "Archäologischer Ort",
		"place.types.archaeological-area": "Archäologischer Bereich",
		"place.types.continent": "Kontinent",
		"place.types.administrative-unit": "Verwaltungseinheit",
		"place.types.populated-place": "Bewohnter Ort",
		"place.types.museum": "Gebäude/Institution",
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
		"place.types.description.island": "Vollständig von Wasser umgebene Landmasse (kleiner als Kontinente)",
		"place.types.description.hydrography": "Alle größeren (stehenden wie fließenden) Ansammlungen von Wasser",
		"place.types.description.landcover": "Physische und biologische Bedeckung der Erdoberfläche",
		"place.types.groups.physical-geographic": "Physiogeographische Einheiten",
		"place.types.groups.human-geographic": "Humangeographische Einheiten",
		"place.types.groups.archaeological": "Archäologisch-kulturhistorische Einheiten",
		"place.types.groups.building": "Gebäude",
		"location.confidence.0": "Keine Angabe",
		"location.confidence.1": "Ungenau",
		"location.confidence.2": "Genau",
		"location.confidence.3": "Exakt",
		"location.confidence.4": "Falsch",
		"location.public": "Öffentliche Koordinaten",
		"domain.place.parent": "Liegt in",
		"domain.place.types": "Art",
		"domain.place.tags": "Tags"
	};
});