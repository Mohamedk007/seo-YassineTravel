import { DEFAULT_LANGUAGE } from '@/i18n/config';
// The localized route table lives in @/seo/sitemap because the build-time
// sitemap generator needs it too, and it must stay dependency-free for Node.
import { ROUTE_PATHS_BY_LANG, getRoutePathTable } from '@/seo/sitemap';

export function getRoutePaths(lang = DEFAULT_LANGUAGE) {
	return getRoutePathTable(lang);
}

// Builds a path for `routeKey` in `lang`, substituting `:slug` with params.slug
// when present (the localized slug for that piece of content).
export function getPath(routeKey, lang = DEFAULT_LANGUAGE, params = {}) {
	const pattern = getRoutePaths(lang)[routeKey];
	if (!pattern) return '/';
	return params.slug ? pattern.replace(':slug', params.slug) : pattern;
}

// Kept for call sites that haven't been made locale-aware yet; always English.
export const ROUTE_PATHS = ROUTE_PATHS_BY_LANG[DEFAULT_LANGUAGE];

// `labelKey` points into src/i18n/locales/{lang}/common.json; `label` is the
// English fallback used until every string has a matching translation key.
export function getTourRouteLinks(lang = DEFAULT_LANGUAGE) {
	const P = getRoutePaths(lang);
	return [
		{ label: 'All Tours', labelKey: 'nav.allTours', to: P.tours },
		{ label: 'Luxury Tours', labelKey: 'nav.luxuryTours', to: P.luxuryTours },
		{ label: 'Private Tours', labelKey: 'nav.privateTours', to: P.privateTours },
		{ label: 'Desert Tours', labelKey: 'nav.desertTours', to: P.desertTours },
		{ label: 'Day Trips', labelKey: 'nav.dayTrips', to: P.dayTrips },
		{ label: 'Custom Tours', labelKey: 'nav.customTours', to: P.customTours },
	];
}

export function getServiceRouteLinks(lang = DEFAULT_LANGUAGE) {
	const P = getRoutePaths(lang);
	return [
		{ label: 'Airport Transfers', labelKey: 'nav.airportTransfers', to: P.airportTransfers },
		{ label: 'Private Drivers', labelKey: 'nav.privateDrivers', to: P.privateDrivers },
		{ label: 'Custom Itineraries', labelKey: 'nav.customItineraries', to: P.customTours },
	];
}

export function getMoreRouteLinks(lang = DEFAULT_LANGUAGE) {
	const P = getRoutePaths(lang);
	return [
		{ label: 'Blog', labelKey: 'nav.blog', to: P.blog },
		{ label: 'Travel Guide', labelKey: 'nav.travelGuide', to: P.travelGuide },
		{ label: 'Reviews', labelKey: 'nav.reviews', to: P.reviews },
		{ label: 'Gallery', labelKey: 'nav.gallery', to: P.gallery },
		{ label: 'FAQ', labelKey: 'nav.faq', to: P.faq },
	];
}

export function getNav(lang = DEFAULT_LANGUAGE) {
	const P = getRoutePaths(lang);
	return [
		{ label: 'Home', labelKey: 'nav.home', to: P.home },
		{ label: 'About', labelKey: 'nav.about', to: P.about },
		{ label: 'Tours', labelKey: 'nav.tours', to: P.tours, children: getTourRouteLinks(lang) },
		{ label: 'Services', labelKey: 'nav.services', to: P.airportTransfers, children: getServiceRouteLinks(lang) },
		{ label: 'Destinations', labelKey: 'nav.destinations', to: P.destinations },
		{ label: 'More', labelKey: 'nav.more', to: P.blog, children: getMoreRouteLinks(lang) },
		{ label: 'Contact', labelKey: 'nav.contact', to: P.contact },
	];
}

export function getFooterTourLinks(lang = DEFAULT_LANGUAGE) {
	const P = getRoutePaths(lang);
	return [
		['Luxury Tours', P.luxuryTours, 'nav.luxuryTours'],
		['Private Tours', P.privateTours, 'nav.privateTours'],
		['Desert Tours', P.desertTours, 'nav.desertTours'],
		['Day Trips', P.dayTrips, 'nav.dayTrips'],
		['Custom Tours', P.customTours, 'nav.customTours'],
	];
}

export function getFooterCompanyLinks(lang = DEFAULT_LANGUAGE) {
	const P = getRoutePaths(lang);
	return [
		['About Us', P.about, 'nav.about'],
		['Destinations', P.destinations, 'nav.destinations'],
		['Reviews', P.reviews, 'nav.reviews'],
		['Gallery', P.gallery, 'nav.gallery'],
		['Blog', P.blog, 'nav.blog'],
		['Travel Guide', P.travelGuide, 'nav.travelGuide'],
		['FAQ', P.faq, 'nav.faq'],
	];
}

// Kept for call sites that haven't been made locale-aware yet; always English.
export const NAV = getNav(DEFAULT_LANGUAGE);
export const TOUR_ROUTE_LINKS = getTourRouteLinks(DEFAULT_LANGUAGE);
export const SERVICE_ROUTE_LINKS = getServiceRouteLinks(DEFAULT_LANGUAGE);
export const MORE_ROUTE_LINKS = getMoreRouteLinks(DEFAULT_LANGUAGE);
export const FOOTER_TOUR_LINKS = getFooterTourLinks(DEFAULT_LANGUAGE);
export const FOOTER_COMPANY_LINKS = getFooterCompanyLinks(DEFAULT_LANGUAGE);
