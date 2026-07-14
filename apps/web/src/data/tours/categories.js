import { IMG } from '../images';

export const TOUR_COLLECTIONS = [
	{
		routeKey: 'tours',
		title: 'All Morocco Tours',
		subtitle: 'Handcrafted private journeys for every kind of traveller.',
		image: IMG.kasbah,
		intro: 'Browse our most-loved itineraries — every tour is fully private and tailor-made to your dates, pace and interests.',
	},
	{
		routeKey: 'luxuryTours',
		category: 'Luxury Tours',
		title: 'Luxury Morocco Tours',
		subtitle: 'Five-star riads, private desert camps and impeccable service.',
		image: IMG.luxCamp,
		intro: 'Our most refined journeys, designed for travellers who expect the very best.',
	},
	{
		routeKey: 'privateTours',
		category: 'Private Tours',
		title: 'Private Morocco Tours',
		subtitle: 'Your own vehicle, guide and pace — Morocco entirely on your terms.',
		image: IMG.fesDoor,
		intro: 'Every one of our tours is private by default. Explore intimate, flexible itineraries.',
	},
	{
		routeKey: 'desertTours',
		category: 'Desert Tours',
		title: 'Sahara Desert Tours',
		subtitle: 'Golden dunes, camel treks and unforgettable luxury desert camps.',
		image: IMG.duneSunset,
		intro: 'Journey into the Sahara and sleep beneath a blanket of stars.',
	},
	{
		routeKey: 'dayTrips',
		category: 'Day Trips',
		title: 'Morocco Day Trips',
		subtitle: 'Big adventures, back by evening — from the Atlas to the Atlantic.',
		image: IMG.atlas,
		intro: 'Perfect additions to your city stay, all with private transport and expert guides.',
	},
];