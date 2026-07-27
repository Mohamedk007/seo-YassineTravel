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
		categoryKey: 'luxury-tours',
		title: 'Luxury Morocco Tours',
		subtitle: 'Five-star riads, private desert camps and impeccable service.',
		image: IMG.luxCamp,
		intro: 'Our most refined journeys, designed for travellers who expect the very best.',
	},
	{
		routeKey: 'privateTours',
		categoryKey: 'private-tours',
		title: 'Private Morocco Tours',
		subtitle: 'Your own vehicle, guide and pace — Morocco entirely on your terms.',
		image: IMG.fesDoor,
		intro: 'Every one of our tours is private by default. Explore intimate, flexible itineraries.',
	},
	{
		routeKey: 'desertTours',
		categoryKey: 'desert-tours',
		title: 'Sahara Desert Tours',
		subtitle: 'Golden dunes, camel treks and unforgettable luxury desert camps.',
		image: IMG.duneSunset,
		intro: 'Journey into the Sahara and sleep beneath a blanket of stars.',
	},
	{
		routeKey: 'dayTrips',
		categoryKey: 'day-trips',
		title: 'Morocco Day Trips',
		subtitle: 'Big adventures, back by evening — from the Atlas to the Atlantic.',
		image: IMG.atlas,
		intro: 'Perfect additions to your city stay, all with private transport and expert guides.',
	},
	{
		routeKey: 'excursions',
		categoryKey: 'excursions',
		title: 'Morocco Adventure Excursions',
		subtitle: 'Hot air balloons, quad bikes and zip lines above the Marrakech countryside.',
		image: IMG.hotAirBalloon,
		intro: 'Add an adrenaline rush to your trip with these guided outdoor adventures near Marrakech.',
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
