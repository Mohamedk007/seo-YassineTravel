export const ROUTE_PATHS = {
	home: '/',
	about: '/about',
	tours: '/tours',
	luxuryTours: '/luxury-tours',
	privateTours: '/private-tours',
	desertTours: '/desert-tours',
	dayTrips: '/day-trips',
	customTours: '/custom-tours',
	destinations: '/destinations',
	blog: '/blog',
	travelGuide: '/travel-guide',
	reviews: '/reviews',
	gallery: '/gallery',
	faq: '/faq',
	contact: '/contact',
	airportTransfers: '/airport-transfers',
	privateDrivers: '/private-drivers',
	tourDetail: '/tour/:slug',
};

export const TOUR_ROUTE_LINKS = [
	{ label: 'All Tours', to: ROUTE_PATHS.tours },
	{ label: 'Luxury Tours', to: ROUTE_PATHS.luxuryTours },
	{ label: 'Private Tours', to: ROUTE_PATHS.privateTours },
	{ label: 'Desert Tours', to: ROUTE_PATHS.desertTours },
	{ label: 'Day Trips', to: ROUTE_PATHS.dayTrips },
	{ label: 'Custom Tours', to: ROUTE_PATHS.customTours },
];

export const SERVICE_ROUTE_LINKS = [
	{ label: 'Airport Transfers', to: ROUTE_PATHS.airportTransfers },
	{ label: 'Private Drivers', to: ROUTE_PATHS.privateDrivers },
	{ label: 'Custom Itineraries', to: ROUTE_PATHS.customTours },
];

export const MORE_ROUTE_LINKS = [
	{ label: 'Blog', to: ROUTE_PATHS.blog },
	{ label: 'Travel Guide', to: ROUTE_PATHS.travelGuide },
	{ label: 'Reviews', to: ROUTE_PATHS.reviews },
	{ label: 'Gallery', to: ROUTE_PATHS.gallery },
	{ label: 'FAQ', to: ROUTE_PATHS.faq },
];

export const NAV = [
	{ label: 'Home', to: ROUTE_PATHS.home },
	{ label: 'About', to: ROUTE_PATHS.about },
	{ label: 'Tours', to: ROUTE_PATHS.tours, children: TOUR_ROUTE_LINKS },
	{ label: 'Services', to: ROUTE_PATHS.airportTransfers, children: SERVICE_ROUTE_LINKS },
	{ label: 'Destinations', to: ROUTE_PATHS.destinations },
	{ label: 'More', to: ROUTE_PATHS.blog, children: MORE_ROUTE_LINKS },
	{ label: 'Contact', to: ROUTE_PATHS.contact },
];

export const FOOTER_TOUR_LINKS = [
	['Luxury Tours', ROUTE_PATHS.luxuryTours],
	['Private Tours', ROUTE_PATHS.privateTours],
	['Desert Tours', ROUTE_PATHS.desertTours],
	['Day Trips', ROUTE_PATHS.dayTrips],
	['Custom Tours', ROUTE_PATHS.customTours],
];

export const FOOTER_COMPANY_LINKS = [
	['About Us', ROUTE_PATHS.about],
	['Destinations', ROUTE_PATHS.destinations],
	['Reviews', ROUTE_PATHS.reviews],
	['Gallery', ROUTE_PATHS.gallery],
	['Blog', ROUTE_PATHS.blog],
	['Travel Guide', ROUTE_PATHS.travelGuide],
	['FAQ', ROUTE_PATHS.faq],
];