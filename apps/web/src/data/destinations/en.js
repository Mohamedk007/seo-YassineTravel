import { IMG } from '../images';

export const DESTINATION_HIGHLIGHTS = [
	{
		id: 'marrakech',
		gallery: [IMG.marrakech, IMG.couple, IMG.guide],
		nearestAirportSlug: 'marrakech-rak',
		nearbyDestinationIds: ['atlas-mountains', 'ait-benhaddou', 'essaouira', 'agafay'],
		thingsToDo: ['Explore Jemaa el-Fnaa and the souks', 'Visit Bahia Palace and Majorelle Garden', "Get lost in the Medina's tanneries and spice markets", 'Take a day trip into the Atlas foothills'],
		bestTimeToVisit: 'March–May and September–November, for warm days without summer heat.',
		slug: 'marrakech',
		name: 'Marrakech',
		summary: 'The Red City — palaces, souks and the electric Jemaa el-Fnaa.',
		image: IMG.marrakech,
	},
	{
		id: 'fes',
		gallery: [IMG.fesDoor, IMG.guide],
		nearestAirportSlug: 'fes-fez',
		nearbyDestinationIds: ['chefchaouen'],
		thingsToDo: ['Wander the ancient Fes el Bali medina', 'Visit the Chouara Tanneries', "See Al Quaraouiyine, one of the world's oldest universities", 'Explore the Bou Inania Madrasa'],
		bestTimeToVisit: 'March–May and September–November, avoiding the summer heat in the medina.',
		slug: 'fes',
		name: 'Fes',
		summary: "The spiritual heart, home to the world's largest living medieval medina.",
		image: IMG.fesDoor,
	},
	{
		id: 'merzouga-sahara',
		gallery: [IMG.duneSunset, IMG.camel, IMG.luxCamp],
		nearestAirportSlug: null,
		nearbyDestinationIds: ['ait-benhaddou', 'atlas-mountains'],
		thingsToDo: ['Camel trek into the Erg Chebbi dunes', 'Sleep in a luxury desert camp under the stars', 'Sandboard down the dunes at sunset', 'Visit a local Berber village'],
		bestTimeToVisit: 'October–April, for cool desert nights and comfortable days.',
		slug: 'merzouga-sahara',
		name: 'Merzouga Sahara',
		h1: 'Merzouga Luxury Desert Camps in the Sahara',
		seoTitle: 'Merzouga Luxury Desert Camps, Sahara Morocco',
		seoDescription:
			'Merzouga, Morocco: private luxury desert camps on the Erg Chebbi dunes, with butler service and en-suite tents. Distances, weather and camel treks inside.',
		summary: 'Towering Erg Chebbi dunes and unforgettable luxury desert camps.',
		overview:
			'Merzouga is a small town on the edge of the Erg Chebbi dune field in southeastern Morocco, and the main gateway to experiencing the Sahara. The dunes here rise up to 150 metres and shift from gold to deep orange at sunset — the reason most Morocco itineraries treat a night in the desert as a non-negotiable stop. What separates a good Merzouga trip from a forgettable one is the camp: shared, budget setups with shared bathrooms sit right alongside private luxury camps with proper beds, en-suite facilities and full service. Yassine Travel books the latter.',
		guideSections: [
			{
				heading: 'What Makes a Merzouga Desert Camp "Luxury"',
				body: [
					'Not every camp at Erg Chebbi is equal, and "luxury" is a specific standard, not a marketing word. On our Sahara circuits, that standard means a private butler assigned to your tent for the duration of your stay, riad-standard tents with proper beds and furnishings rather than basic canvas bedrolls, a private tented suite rather than a shared sleeping area, a sunset camel trek into the dunes on arrival and a sunrise view over Erg Chebbi the next morning — both included rather than sold as add-ons — and 24/7 on-trip concierge support.',
					'Both our 4-Day Marrakech to Merzouga Desert Tour and our 10-Day Imperial Cities & Sahara circuit include this camp standard — the shorter trip gives you one night at Erg Chebbi, the longer one gives you two.',
				],
			},
			{
				heading: 'Distance and Weather — Planning Your Merzouga Trip',
				body: [
					'From Marrakech: around 560 km, typically covered over 2 days with an overnight stop in the Dades Valley or at Ait Benhaddou — this is why every Merzouga tour on this site is a multi-day circuit, not a direct transfer. Attempting the drive in one day is possible but leaves no time for the Dades Gorges or Ait Benhaddou en route, both worth the stop.',
					'From Fes: around 470 km, roughly 7–8 hours, crossing the Middle Atlas cedar forests — this is the route used on our imperial-cities circuits that continue on to Merzouga after Fes.',
					'Weather by season: October to April brings cool, comfortable desert nights (often 5–12°C after dark, even when days are warm) and clear skies for stargazing — this is the season we recommend. May to September is hot, with daytime temperatures regularly above 38–40°C in the dunes; a desert camp stay is still doable in summer but plan for very warm days and drink more water than you think you need.',
				],
			},
		],
		faqs: [
			[
				'What makes Merzouga desert camps "luxury" compared to standard camps?',
				'Our Merzouga camps include a private butler, riad-standard tents with proper beds and en-suite facilities, and a private tented suite rather than shared sleeping quarters — the same five-star standard we use for our riad partners in Marrakech and Fes, not a basic canvas-tent setup.',
			],
			[
				'How far is Merzouga from Marrakech, and can I visit in one day?',
				'Around 560 km, usually covered over 2 days with an overnight stop in the Dades Valley or Ait Benhaddou. It’s possible to drive it in one very long day, but every Merzouga tour we run is multi-day, both for comfort and to include the Dades Gorges and Ait Benhaddou along the way.',
			],
			[
				'Is Merzouga the same as "the Sahara"?',
				'Merzouga is the gateway town to the Erg Chebbi dune field, which is the accessible edge of the wider Sahara desert that stretches across North Africa. When people say "sleeping in the Sahara" in Morocco, Erg Chebbi near Merzouga is almost always what they mean.',
			],
			[
				'What’s the best time of year to visit Merzouga?',
				'October through April, for cool desert nights and comfortable daytime temperatures — this is when we recommend booking. May to September is hot, often above 38–40°C during the day, though a night at a luxury camp is still enjoyable if you plan for the heat.',
			],
		],
		image: IMG.duneSunset,
	},
	{
		id: 'chefchaouen',
		gallery: [IMG.chefchaouen],
		nearestAirportSlug: 'tangier-tng',
		nearbyDestinationIds: ['fes'],
		thingsToDo: ['Wander the blue-washed old town', 'Photograph the iconic blue alleyways', 'Hike to the Spanish Mosque viewpoint', 'Shop for handwoven wool and leather crafts'],
		bestTimeToVisit: 'March–June and September–October, for mild mountain weather.',
		slug: 'chefchaouen',
		name: 'Chefchaouen',
		h1: "Chefchaouen, Morocco's Blue City",
		seoTitle: 'Chefchaouen: Morocco Blue City Travel Guide',
		seoDescription:
			'Plan your trip to Chefchaouen, Morocco’s blue-washed mountain town. Real distances from Marrakech, Fes & Tangier, best photo spots, and when to go.',
		summary: 'The dreamy blue-washed mountain town of the Rif.',
		overview:
			'Chefchaouen sits in the Rif Mountains of northern Morocco, roughly two hours inland from the Mediterranean coast. Its old town was whitewashed and then progressively painted in shades of blue from the 1930s onward — a tradition often linked to Jewish refugees who settled here in that period, though the exact origin is debated locally. Today the blue medina is one of the most photographed places in Morocco: steep cobbled lanes, potted geraniums against indigo walls, and a slower pace than Marrakech or Fes. It’s a mountain town, not a desert or coastal one, which is exactly why it sits so far from Morocco’s southern circuit — a detail that matters when you’re planning how to fit it into a trip.',
		guideSections: [
			{
				heading: 'How to Get to Chefchaouen',
				body: [
					'From Marrakech: Chefchaouen is roughly 580–600 km from Marrakech — a drive of 6.5 to 7.5 hours depending on the route and stops, since there’s no direct highway for the full distance and the last stretch climbs into the Rif Mountains. This is genuinely a long single-day drive each way, which is why almost no operator — us included — sells it as a Marrakech day trip. The realistic ways to see Chefchaouen from a Marrakech-based trip are: add it as a stop on a longer imperial-cities circuit that already routes through Fes, or fly or take the train one-way to Fes or Tangier and see Chefchaouen from there.',
					'From Fes: Chefchaouen is about 200 km from Fes, roughly 2.5–3 hours by private vehicle on a scenic road through the Rif foothills. This is the most common way travellers combine the two cities, and it works comfortably as a long day trip or a one-night stay in Chefchaouen before returning to Fes or continuing north.',
					'From Tangier: Chefchaouen is the closest of the three to reach, about 115 km and 1.5–2 hours by private vehicle. Tangier’s port and airport make it a practical entry point for a northern Morocco itinerary, with Chefchaouen as a natural first or second stop.',
				],
			},
			{
				heading: 'Is a Chefchaouen Day Trip from Marrakech Realistic?',
				body: [
					'Short answer: not comfortably. At 6.5–7.5 hours each way, a same-day round trip from Marrakech means roughly 13–15 hours of driving for a few hours in Chefchaouen — most travellers who try this arrive exhausted and leave immediately after golden hour photos. We don’t sell this as a day-trip product for that reason. If Chefchaouen is a priority, the better options are: build it into a multi-day route that also covers Fes and the desert (see our Imperial Cities & Sahara circuits below), or base yourself in Fes or Tangier for a few days and treat Chefchaouen as a day trip from there, where the drive is 2–3 hours each way instead of 7.',
				],
			},
		],
		faqs: [
			[
				'How far is Chefchaouen from Marrakech, and can I visit on a day trip?',
				'Chefchaouen is about 580–600 km from Marrakech, roughly 6.5–7.5 hours’ drive each way, so a same-day round trip isn’t realistic. Most travellers see it either as part of a longer multi-city circuit that also covers Fes, or by basing themselves in Fes or Tangier, where it’s a comfortable 2–3 hour day trip.',
			],
			[
				'How long does it take to get from Fes to Chefchaouen?',
				'About 2.5–3 hours by private vehicle, on a scenic road through the Rif foothills — this is the most common way travellers combine the two, either as a long day trip or with one night in Chefchaouen.',
			],
			[
				'How long is the drive from Tangier to Chefchaouen?',
				'Around 1.5–2 hours, the shortest of the main routes into Chefchaouen — Tangier’s airport and port make it a practical starting point for a northern Morocco trip.',
			],
			[
				'Is Chefchaouen worth visiting if I’m only doing a Marrakech-based trip?',
				'It’s worth it if you have the time for a proper multi-day itinerary — Chefchaouen appears on our 10-Day Imperial Cities & Sahara and 14-Day Grand Tour circuits, both of which route through Fes on the way. If your trip is Marrakech-only with limited days, the distance makes it a hard add without cutting time elsewhere.',
			],
		],
		image: IMG.chefchaouen,
	},
	{
		id: 'ait-benhaddou',
		gallery: [IMG.kasbah],
		nearestAirportSlug: 'marrakech-rak',
		nearbyDestinationIds: ['marrakech', 'atlas-mountains', 'merzouga-sahara'],
		thingsToDo: ['Explore the UNESCO-listed kasbah', 'Spot film locations from famous movies and series', 'Cross the Ounila River on foot', 'Photograph the mudbrick architecture at sunset'],
		bestTimeToVisit: 'March–May and September–November, before or after peak summer heat.',
		slug: 'ait-benhaddou',
		name: 'Ait Benhaddou',
		h1: "Ait Benhaddou, Morocco's UNESCO Kasbah",
		seoTitle: 'Ait Benhaddou: UNESCO Kasbah & Film Locations',
		seoDescription:
			'Explore Ait Benhaddou, Morocco’s UNESCO-listed mudbrick kasbah and film location for Gladiator and Lawrence of Arabia. History, distance and tours inside.',
		summary: 'The iconic UNESCO kasbah and gateway to the desert.',
		overview:
			'Ait Benhaddou is a fortified ksar — a collection of earthen buildings enclosed by defensive walls — on the former caravan route between the Sahara and Marrakech, in the valley of the Ounila River. Its ochre-red mudbrick towers and kasbahs have survived largely intact since the 17th century, making it one of the best-preserved examples of pre-Saharan earthen architecture anywhere in Morocco. A handful of families still live within the walls today, though most residents have moved to the newer village across the river, leaving the historic ksar largely preserved as a living monument rather than a purely restored museum piece.',
		guideSections: [
			{
				heading: 'History and UNESCO World Heritage Status',
				body: [
					"Ait Benhaddou was added to the UNESCO World Heritage List in 1987. UNESCO's listing recognizes it as an outstanding example of the earthen architecture (pisé, or rammed mudbrick) typical of southern Morocco, and one of the last ksour — fortified villages — of this kind to survive in something close to its original form, since most others along the same historic trade route have crumbled or been abandoned. The ksar's defensive layout — tightly packed kasbahs behind a single fortified perimeter, with a communal granary at the highest point for use during sieges — reflects a time when settlements along this caravan route needed to protect goods moving between the Sahara and Marrakech. Ongoing restoration work, partly UNESCO-supported, is what keeps the mudbrick structures standing today, since untreated pisé construction is vulnerable to erosion from Morocco's occasional heavy rains.",
				],
			},
			{
				heading: 'Film Locations at Ait Benhaddou',
				body: [
					"Ait Benhaddou's dramatic, timeless architecture has made it one of the most filmed locations in Morocco, standing in for ancient settings from Rome to the Middle East. Two well-documented productions filmed here are Gladiator (2000), which used the kasbah as a backdrop for scenes of a North African provincial town, and Lawrence of Arabia (1962), one of the earliest major international productions to film in and around the kasbah, helping establish Morocco as a filming destination for desert settings. Ait Benhaddou is also often associated with other film and TV productions shot in the wider Ouarzazate area — ask your guide on the day which exact scenes, if any, used Ait Benhaddou itself.",
				],
			},
		],
		faqs: [
			[
				'Why is Ait Benhaddou a UNESCO World Heritage Site?',
				'It was listed in 1987 as an outstanding example of southern Morocco’s earthen (mudbrick) architecture — one of the last fortified ksour of its kind to survive close to its original form, with a defensive layout built to protect the historic caravan route between the Sahara and Marrakech.',
			],
			[
				'What movies were filmed at Ait Benhaddou?',
				'Ait Benhaddou has appeared in Gladiator (2000) and Lawrence of Arabia (1962), among other productions drawn to its dramatic mudbrick architecture. Ask your guide on the day for the exact filming spots, since some productions associated with the wider area were actually filmed at nearby Ouarzazate studios rather than the kasbah itself.',
			],
			[
				'Do people still live in Ait Benhaddou?',
				'A small number of families still live within the historic ksar, though most residents relocated to the newer village across the Ounila River decades ago — the kasbah is a living site, not an abandoned ruin.',
			],
			[
				'How far is Ait Benhaddou from Marrakech, and is it a good day trip?',
				'About 2–2.5 hours each way over the Tizi n’Tichka pass, making it a comfortable full day trip from Marrakech — our dedicated Day Trip to Ait Ben Haddou tour is built around exactly this route.',
			],
		],
		image: IMG.kasbah,
	},
	{
		id: 'atlas-mountains',
		gallery: [IMG.atlas],
		nearestAirportSlug: 'marrakech-rak',
		nearbyDestinationIds: ['marrakech', 'ait-benhaddou'],
		thingsToDo: ['Hike through Berber villages and valleys', 'Visit a traditional argan oil cooperative', "Drive the dramatic Tizi n'Tichka pass", 'Enjoy mint tea with a local family'],
		bestTimeToVisit: 'April–June and September–October for hiking; snow-capped peaks December–February.',
		slug: 'atlas-mountains',
		name: 'Atlas Mountains',
		h1: 'Atlas Mountains Tours from Marrakech',
		seoTitle: 'Atlas Mountains Tours & Day Trips from Marrakech',
		seoDescription:
			'Book an Atlas Mountains day trip or tour from Marrakech: Berber villages, the Tizi n’Tichka pass, Imlil hiking and Ouirgane valley walks. Private guides.',
		summary: 'Berber villages, dramatic passes and snow-capped peaks.',
		overview:
			"The High Atlas Mountains rise directly behind Marrakech, close enough that a day trip gets you from the city's souks to Berber villages and snow-dusted peaks (in season) in under an hour's drive. This proximity is what makes the Atlas Mountains one of the easiest big-impact excursions to add to a Marrakech-based trip — no flight, no multi-day commitment, just a private vehicle and a morning departure.",
		guideSections: [
			{
				heading: 'Book an Atlas Mountains Tour',
				body: [
					'Several day trips from Marrakech cover different corners of the Atlas Mountains, and picking the right one depends on what you want out of the day. The Day Trip to Imlil from Marrakech suits travellers who want the hiking-village experience: Imlil sits at the foot of Mount Toubkal, North Africa’s highest peak, with Berber villages, mule trails and mountain markets at around 1,740m elevation — best if “hiking” or “Toubkal” is part of what you’re after. The Day Trip to Ouirgane Valley from Marrakech offers a quieter, greener Atlas experience: terraced fields, olive groves and a slower pace than the busier Imlil trailheads — best if you want mountain scenery and valley walking without the crowds. The Day Trip to Ouzoud Waterfalls from Marrakech is the pick for travellers prioritising Morocco’s tallest waterfalls over village culture, and the Marrakech Day Trips Collection lets you choose on the day between the Atlas Mountains, Essaouira coast or Agafay Desert.',
					'All of the above are private, air-conditioned vehicles with hotel pickup and drop-off in Marrakech, typically back by evening.',
				],
			},
			{
				heading: "Crossing the Tizi n'Tichka Pass",
				body: [
					"Travellers continuing beyond a simple day trip — toward Ait Benhaddou or the Sahara — will cross the Tizi n'Tichka, Morocco's highest major mountain pass at 2,260 metres. It's a well-maintained, sealed road used daily by our driver-guides, winding but not off-road, and forms the spine of every multi-day desert circuit departing Marrakech. Our Ait Benhaddou day trip and all Merzouga-bound tours cross it as a matter of course.",
				],
			},
		],
		faqs: [
			[
				'What’s the difference between the Imlil and Ouirgane day trips?',
				'Imlil sits higher in the Atlas, at the foot of Mount Toubkal, and suits travellers wanting a hiking-village atmosphere with mule trails and mountain markets. Ouirgane is a quieter valley known for terraced fields and olive groves, better suited to travellers who want Atlas scenery without the busier Imlil trailheads. Both depart Marrakech and run the same length of day.',
			],
			[
				'How far are the Atlas Mountains from Marrakech?',
				'The foothills start within about 30–45 minutes of central Marrakech, with villages like Imlil and Ouirgane roughly 1.5–2 hours away by private vehicle — close enough for a comfortable single-day round trip.',
			],
			[
				'Can I hike Mount Toubkal on a day trip?',
				'No — a day trip to Imlil visits the village and surrounding valley at Toubkal’s base, but climbing North Africa’s highest peak itself requires a dedicated multi-day trekking trip, not a single-day excursion.',
			],
			[
				'Is the Tizi n’Tichka pass safe to cross?',
				'Yes — it’s a well-maintained, sealed road used daily by our driver-guides, winding through the High Atlas but not off-road. Winter can bring snow at altitude, so ask your trip designer about conditions if you’re travelling December to February.',
			],
		],
		image: IMG.atlas,
	},
	{
		id: 'essaouira',
		gallery: [IMG.Essaouira1],
		nearestAirportSlug: 'marrakech-rak',
		nearbyDestinationIds: ['marrakech'],
		thingsToDo: [
			'Walk the Skala de la Ville ramparts overlooking the Atlantic',
			'Explore the fishing port and eat grilled fish straight off the boats',
			'Wander the UNESCO-listed medina and its craft, spice and jewelry souks',
			'Relax or try surfing and kitesurfing on the long Atlantic beach',
		],
		bestTimeToVisit: 'Pleasant nearly year-round thanks to the Atlantic breeze — spring and autumn are calmest, while summer brings the best wind for kitesurfing.',
		slug: 'essaouira',
		name: 'Essaouira',
		summary: 'A fortified Atlantic port town with a UNESCO medina, fresh seafood, and a windswept, laid-back pace.',
		image: IMG.Essaouira1,
	},
	{
		id: 'agafay',
		gallery: [IMG.luxCamp, IMG.camel],
		nearestAirportSlug: 'marrakech-rak',
		nearbyDestinationIds: ['marrakech'],
		thingsToDo: [
			'Ride a camel across the rocky, moon-like plateau',
			'Watch the sunset over the Atlas Mountains from the desert rim',
			'Try quad biking across the stone hills',
			'Enjoy a candlelit dinner with live Gnawa music in a desert camp',
		],
		bestTimeToVisit: 'Year-round — Agafay is milder than the Sahara in both summer and winter, though March–May and September–November are most comfortable for daytime activities.',
		slug: 'agafay-desert',
		name: 'Agafay Desert',
		summary: "Morocco's closest desert to Marrakech — a rocky plateau (not the Sahara) just 45 minutes from the city, known for luxury camps and sunset views.",
		image: IMG.luxCamp,
	},
];
