var gazIds = ["2043081","2281831","2119635","2281791","2281581","2281566","2281834","2281639","2281702","2280330","2281709","2043093","2280321","2281824","2281678","2102210","2281519","2281762","2280221","2281663","2281530","2280349","2281501","2281524","2280211","2281789","2281557","2281778","2281529","2043147","2281818","2281816","2119645","2281708","2281594","2281761","2281851","2281783","2281747","2118943","2043124","2285511","2281874","2280218","2281591","2281788","2281773","2281777","2281774","2281784","2281785","2281782","2281786","2281847","2281744","2281879","2043178","2281885","2280356","2043161","2280212","2280210","2118631","2281846","2281739","2281740","2281787","2281775","2281776","2281886","2086499","2281799","2281543","2281820","2281658","2281849","2281538","2281906","2281521","2118904","2281907","2281715","2280350","2281523","2281609","2281804","2281682","2281547","2281539","2281542","2043120","2281662","2281545","2281556","2280359","2281548","2280353","2281661","2281844","2281520","2281528","2281537","2281540","2281908","2043179","2043142","2281567","2281830","2281672","2281673","2280355","2281578","2281570","2118895","2281575","2281811","2095811","2281532","2096192","2281571","2111695","2281572","2281829","2281884","2281665","2281511","2092699","2281651","2281560","2281667","2281573","2043154","2281754","2281679","2118837","2281675","2281562","2105741","2281676","2281685","2116105","2042600","2043125","2281577","2281725","2281686","2281680","2281668","2281569","2281504","2281664","2043077","2281576","2281666","2281669","2281659","2043139","2281677","2281555","2281568","2043151","2281559","2281681","2281790","2281671","2043140","2281894","2281792","2281554","2101663","2281536","2043086","2281654","2280347","2043153","2043169","2043083","2281643","2281689","2281828","2281660","2281826","2119009","2103165","2043088","2105153","2105164","2043114","2281843","2281848","2281845","2281694","2111701","2281718","2043116","2282909","2282906","2282915","2043136","2043119","2282914","2282911","2043104","2281771","2281624","2280357","2101258","2281638","2087069","2181404","2117818","2102512","2281513","2043557","2282908","2281512","2043105","2043131","2181605","2280220","2118610","2282901","2282919","2103495","2043864","2220396","2281793","2281514","2282920","2122832","2118919","2280310","2086370","2280312","2102197","2104408","2124864","2043631","2282921","2282929","2282928","2282926","2122831","2086578","2276854","2281527","2043148","2101633","2281796","2086674","2118825","2282925","2282913","2118694","2111780","2111833","2281602","2181405","2282905","2282923","2043226","2118967","2087502","2281644","2111698","2280219","2280233","2180537","2044633","2281586","2096378","2088585","2282918","2282902","2281564","2281717","2111832","2281584","2093155","2281752","2096184","2120668","2282727","2281603","2198954","2281627","2281629","2281628","2281588","2281630","2281632","2281634","2281636","2281637","2281607","2281653","2281701","2281703","2281707","2281595","2281719","2281626","2281587","2281728","2282709","2102417","2118731","2260740","2043616","2281598","2043182"];

function tagPlaces() {
	var places = db.place.find({ _id: { $in: gazIds }});
	places.forEach(function(place) {
		db.place.update({_id: place._id}, { $addToSet: { tags: "syrher" } });
	});	
}