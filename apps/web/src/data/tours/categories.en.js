import { IMG } from '../images';

export const TOUR_COLLECTIONS = [
	{
		routeKey: 'tours',
		title: 'Morocco & Marrakech Tours Packages',
		subtitle:
			'Browse private Morocco tours packages, from Marrakech day trips to Sahara desert circuits. Fully tailor-made, expert local guides, free quote in 24h.',
		image: IMG.kasbah,
		intro:
			"Our Morocco tours packages are 100% private and tailor-made — no joining a bus of strangers. Whether you're planning a short Marrakech city break, a multi-day Sahara desert circuit, or the full imperial cities grand tour, every itinerary below is built around your dates, pace and interests, with a private vehicle, English-speaking driver-guide and 24/7 support throughout. Rated 5.0 on TripAdvisor by travellers from the US, UK, Canada and Australia.",
		showTripAdvisorBadge: true,
	},
	{
		routeKey: 'luxuryTours',
		categoryKey: 'luxury-tours',
		title: 'Luxury Morocco Tours',
		subtitle:
			'Luxury Morocco tours with five-star riads, private desert camps and a dedicated driver-guide throughout. Rated 5.0 on TripAdvisor. Free quote in 24h.',
		image: IMG.luxCamp,
		intro:
			'Our most refined journeys, designed for travellers who expect the very best. Rated 5.0/5 across 43 verified TripAdvisor reviews — recognition earned specifically for the standard of our luxury circuits: handpicked five-star riads in Marrakech and Fes, private desert camps with butler service at Erg Chebbi, and a dedicated driver-guide throughout every trip.',
	},
	{
		routeKey: 'privateTours',
		categoryKey: 'private-tours',
		title: 'Private Morocco Tours & Marrakech Tours',
		subtitle:
			'Private Morocco tours and private Marrakech tours with your own vehicle, driver-guide and itinerary. No strangers, no fixed schedule. Free quote in 24h.',
		image: IMG.fesDoor,
		intro:
			'Every tour on this site is private by default: your own vehicle, your own driver-guide, and an itinerary built around your dates and interests — not a shared coach with twenty strangers. Whether you’re planning a private Marrakech tour for a few days in the Red City or a longer private Morocco tour across the Sahara and imperial cities, the format is the same: total flexibility, no fixed departure times, and a pace that’s entirely yours.',
	},
	{
		routeKey: 'desertTours',
		categoryKey: 'desert-tours',
		title: 'Sahara Desert Tour Morocco from Marrakech',
		subtitle:
			'Private Sahara desert tours from Marrakech: camel treks, luxury desert camps and Erg Chebbi dunes. 2 to 4-day options, fully tailor-made. Free quote.',
		image: IMG.duneSunset,
		intro:
			'A Sahara desert tour from Marrakech takes you across the High Atlas Mountains to the dunes of Erg Chebbi, with an overnight stay in a private desert camp, sunset and sunrise camel treks, and stops at the Ait Benhaddou kasbah and Dades Gorges along the way. Our desert tours Morocco packages range from a fast-paced 3-day express version to the classic 4-day circuit with two full days at the dunes — every one is private, with your own vehicle and driver-guide throughout.',
		comparisonHeading: '2, 3 or 4 Days — Which Desert Tour Is Right for You?',
		comparisonIntro:
			'Every one of our Sahara circuits ends at the same place — the dunes of Erg Chebbi near Merzouga, Morocco\'s tallest and most photographed dune field — but how you get there and how long you stay changes the trip. Here\'s how the durations compare:',
		comparisonRows: [
			{
				duration: '2 Days / 1 Night',
				bestFor: 'Short on time, based near Marrakech',
				whatYouSee: 'The Agafay stone desert (not the Sahara) — camel ride, sunset dinner, no long driving days',
				camp: 'Private luxury tented suite with ensuite bathroom',
			},
			{
				duration: '3 Days / 2 Nights',
				bestFor: 'Travellers who want the Sahara but have limited days',
				whatYouSee: 'Ait Benhaddou, the Dades Valley, Todra Gorge, one night at Erg Chebbi — a faster pace with more driving per day',
				camp: 'Desert camp at Erg Chebbi, one night',
			},
			{
				duration: '4 Days / 3 Nights',
				bestFor: 'A more relaxed pace with time to enjoy the dunes',
				whatYouSee: 'The same route as the 3-day version, spread over an extra day, with a full day to explore the camp and dunes rather than rushing through',
				camp: 'Desert camp at Erg Chebbi, one night, less driving per day',
			},
		],
		comparisonNote:
			'Not sure which fits? The 3-day and 4-day tours follow the same route to the same dunes — the difference is pace, not destination. If back-to-back 6-8 hour driving days aren\'t for you, the 4-day version is the better fit.',
	},
	{
		routeKey: 'dayTrips',
		categoryKey: 'day-trips',
		title: 'Day Trips from Marrakech, Morocco',
		subtitle:
			'The best day trips from Marrakech: Ait Ben Haddou, Ouzoud Waterfalls, Essaouira, Atlas Mountains & more. Private transport, expert guides, back by evening.',
		image: IMG.atlas,
		intro:
			"Looking for the best day trips from Marrakech? Every excursion below departs and returns the same day, with private air-conditioned transport, hotel pickup and an expert local guide — no need to pack a bag. From the rose-gold kasbah of Ait Ben Haddou to the cascading Ouzoud Waterfalls and the Atlantic port of Essaouira, here's a quick guide to choosing the right day trip for your Marrakech stay.",
	},
	{
		routeKey: 'excursions',
		categoryKey: 'excursions',
		title: 'Marrakech Excursions & Adventure Tours',
		subtitle:
			'Marrakech excursions and adventure tours: sunrise hot air balloon flights, quad biking in the Jbilet desert, zip lines in the Atlas foothills. Book today.',
		image: IMG.hotAirBalloon,
		intro:
			'Add an adrenaline rush to your Marrakech trip with these guided adventure excursions, all departing from the city and back the same day (or the same morning). From a sunrise hot air balloon flight over the palm groves to quad biking through the Jbilet desert and zip-lining in the Atlas foothills, every excursion below is privately guided with hotel pickup included.',
	},
	{
		routeKey: 'guidedTours',
		categoryKey: 'guided-tours',
		title: 'Morocco Guided City Tours',
		subtitle: 'Half-day and evening tours led by an expert local guide, on foot in the medina.',
		image: IMG.guide,
		intro: 'A local storyteller at your side through the souks, palaces and hidden corners of the medina.',
	},
];
