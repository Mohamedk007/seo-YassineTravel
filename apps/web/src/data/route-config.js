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
	destinationDetail: '/destinations/:slug',
	blog: '/blog',
	blogArticle: '/blog/:slug',
	travelGuide: '/travel-guide',
	reviews: '/reviews',
	gallery: '/gallery',
	faq: '/faq',
	contact: '/contact',
	airportTransfers: '/airport-transfers',
	airportTransferDetail: '/airport-transfers/:slug',
	privateDrivers: '/private-drivers',
	tourDetail: '/tour/:slug',
};

// `labelKey` points into src/i18n/locales/{lang}/common.json; `label` is the
// English fallback used until every string has a matching translation key.
export const TOUR_ROUTE_LINKS = [
	{ label: 'All Tours', labelKey: 'nav.allTours', to: ROUTE_PATHS.tours },
	{ label: 'Luxury Tours', labelKey: 'nav.luxuryTours', to: ROUTE_PATHS.luxuryTours },
	{ label: 'Private Tours', labelKey: 'nav.privateTours', to: ROUTE_PATHS.privateTours },
	{ label: 'Desert Tours', labelKey: 'nav.desertTours', to: ROUTE_PATHS.desertTours },
	{ label: 'Day Trips', labelKey: 'nav.dayTrips', to: ROUTE_PATHS.dayTrips },
	{ label: 'Custom Tours', labelKey: 'nav.customTours', to: ROUTE_PATHS.customTours },
];

export const SERVICE_ROUTE_LINKS = [
	{ label: 'Airport Transfers', labelKey: 'nav.airportTransfers', to: ROUTE_PATHS.airportTransfers },
	{ label: 'Private Drivers', labelKey: 'nav.privateDrivers', to: ROUTE_PATHS.privateDrivers },
	{ label: 'Custom Itineraries', labelKey: 'nav.customItineraries', to: ROUTE_PATHS.customTours },
];

export const MORE_ROUTE_LINKS = [
	{ label: 'Blog', labelKey: 'nav.blog', to: ROUTE_PATHS.blog },
	{ label: 'Travel Guide', labelKey: 'nav.travelGuide', to: ROUTE_PATHS.travelGuide },
	{ label: 'Reviews', labelKey: 'nav.reviews', to: ROUTE_PATHS.reviews },
	{ label: 'Gallery', labelKey: 'nav.gallery', to: ROUTE_PATHS.gallery },
	{ label: 'FAQ', labelKey: 'nav.faq', to: ROUTE_PATHS.faq },
];

export const NAV = [
	{ label: 'Home', labelKey: 'nav.home', to: ROUTE_PATHS.home },
	{ label: 'About', labelKey: 'nav.about', to: ROUTE_PATHS.about },
	{ label: 'Tours', labelKey: 'nav.tours', to: ROUTE_PATHS.tours, children: TOUR_ROUTE_LINKS },
	{ label: 'Services', labelKey: 'nav.services', to: ROUTE_PATHS.airportTransfers, children: SERVICE_ROUTE_LINKS },
	{ label: 'Destinations', labelKey: 'nav.destinations', to: ROUTE_PATHS.destinations },
	{ label: 'More', labelKey: 'nav.more', to: ROUTE_PATHS.blog, children: MORE_ROUTE_LINKS },
	{ label: 'Contact', labelKey: 'nav.contact', to: ROUTE_PATHS.contact },
];

export const FOOTER_TOUR_LINKS = [
	['Luxury Tours', ROUTE_PATHS.luxuryTours, 'nav.luxuryTours'],
	['Private Tours', ROUTE_PATHS.privateTours, 'nav.privateTours'],
	['Desert Tours', ROUTE_PATHS.desertTours, 'nav.desertTours'],
	['Day Trips', ROUTE_PATHS.dayTrips, 'nav.dayTrips'],
	['Custom Tours', ROUTE_PATHS.customTours, 'nav.customTours'],
];

export const FOOTER_COMPANY_LINKS = [
	['About Us', ROUTE_PATHS.about, 'nav.about'],
	['Destinations', ROUTE_PATHS.destinations, 'nav.destinations'],
	['Reviews', ROUTE_PATHS.reviews, 'nav.reviews'],
	['Gallery', ROUTE_PATHS.gallery, 'nav.gallery'],
	['Blog', ROUTE_PATHS.blog, 'nav.blog'],
	['Travel Guide', ROUTE_PATHS.travelGuide, 'nav.travelGuide'],
	['FAQ', ROUTE_PATHS.faq, 'nav.faq'],
];
