import { absoluteUrl, getRoutePathTable, resolveLanguage } from './utils.js';

/**
 * Breadcrumb labels keyed by route key. Kept next to the trail builder (rather
 * than in the i18n bundle) because these strings are consumed by JSON-LD as
 * well as by the UI, and must stay identical in both.
 */
export const BREADCRUMB_LABELS = {
	en: {
		home: 'Home',
		about: 'About Us',
		tours: 'Tours',
		luxuryTours: 'Luxury Tours',
		privateTours: 'Private Tours',
		desertTours: 'Desert Tours',
		dayTrips: 'Day Trips',
		customTours: 'Custom Tours',
		destinations: 'Destinations',
		blog: 'Blog',
		travelGuide: 'Travel Guide',
		reviews: 'Reviews',
		gallery: 'Gallery',
		faq: 'FAQ',
		contact: 'Contact',
		airportTransfers: 'Airport Transfers',
		privateDrivers: 'Private Drivers',
		notFound: 'Page not found',
	},
	fr: {
		home: 'Accueil',
		about: 'À propos',
		tours: 'Circuits',
		luxuryTours: 'Circuits de luxe',
		privateTours: 'Circuits privés',
		desertTours: 'Circuits désert',
		dayTrips: 'Excursions à la journée',
		customTours: 'Circuits sur mesure',
		destinations: 'Destinations',
		blog: 'Blog',
		travelGuide: 'Guide de voyage',
		reviews: 'Avis',
		gallery: 'Galerie',
		faq: 'FAQ',
		contact: 'Contact',
		airportTransfers: 'Transferts aéroport',
		privateDrivers: 'Chauffeurs privés',
		notFound: 'Page introuvable',
	},
};

export function getBreadcrumbLabel(routeKey, lang) {
	const table = BREADCRUMB_LABELS[resolveLanguage(lang)];
	return table[routeKey] || BREADCRUMB_LABELS.en[routeKey] || routeKey;
}

/**
 * Builds a breadcrumb trail as `[{ name, url }]` with absolute, language-
 * prefixed URLs.
 *
 * Each item is either `{ routeKey }` (label and path resolved from the
 * localized route table) or `{ name, path }` for dynamic entries such as a tour
 * title. Explicit `name` / `path` always override the route-key defaults.
 */
export function buildBreadcrumbTrail(lang, items = []) {
	const language = resolveLanguage(lang);
	const routes = getRoutePathTable(language);

	return items
		.filter(Boolean)
		.map((item) => {
			const name = item.name || (item.routeKey ? getBreadcrumbLabel(item.routeKey, language) : null);
			const path = item.url || item.path || (item.routeKey ? routes[item.routeKey] : null);
			if (!name) return null;
			return { name, url: absoluteUrl(path || '/', language) };
		})
		.filter(Boolean);
}
