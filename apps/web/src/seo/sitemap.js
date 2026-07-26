/**
 * Single source of truth for the data both the runtime SEO layer and the
 * build-time sitemap generator need: origin, languages and the localized
 * route table.
 *
 * This module must stay dependency-free (no `@/` aliases, no browser APIs) so
 * `tools/generate-sitemap.mjs` can import it directly under plain Node.
 */

export const SITE_ORIGIN = 'https://moroccotripholidays.com';

export const SUPPORTED_LANGUAGES = ['en', 'fr'];
export const DEFAULT_LANGUAGE = 'en';

export const ROUTE_PATHS_BY_LANG = {
	en: {
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
	},
	fr: {
		home: '/',
		about: '/a-propos',
		tours: '/circuits',
		luxuryTours: '/circuits-de-luxe',
		privateTours: '/circuits-prives',
		desertTours: '/circuits-desert',
		dayTrips: '/excursions-a-la-journee',
		customTours: '/circuits-sur-mesure',
		destinations: '/destinations',
		destinationDetail: '/destinations/:slug',
		blog: '/blog',
		blogArticle: '/blog/:slug',
		travelGuide: '/guide-de-voyage',
		reviews: '/avis',
		gallery: '/galerie',
		faq: '/faq',
		contact: '/contact',
		airportTransfers: '/transferts-aeroport',
		airportTransferDetail: '/transferts-aeroport/:slug',
		privateDrivers: '/chauffeurs-prives',
		tourDetail: '/circuit/:slug',
	},
};

// Children of sitemap-index.xml. Names are kept stable because they are already
// submitted to Search Console and referenced from robots.txt.
export const SITEMAP_FILES = [
	'sitemap-pages.xml',
	'sitemap-tours.xml',
	'sitemap-destinations.xml',
	'sitemap-blog.xml',
	'sitemap-reviews.xml',
	'sitemap-images.xml',
];

export const SITEMAP_INDEX_FILE = 'sitemap-index.xml';

export function resolveLanguage(lang) {
	return SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;
}

export function getRoutePathTable(lang) {
	return ROUTE_PATHS_BY_LANG[resolveLanguage(lang)];
}

/** Route keys that map to a real, crawlable URL (i.e. no `:slug` placeholder). */
export function getStaticRouteKeys() {
	return Object.entries(ROUTE_PATHS_BY_LANG[DEFAULT_LANGUAGE])
		.filter(([, pattern]) => !pattern.includes(':'))
		.map(([key]) => key);
}

/** `/tour/:slug` -> `/tour` — the localized prefix used to build detail URLs. */
export function getDetailPrefix(routeKey, lang) {
	const pattern = getRoutePathTable(lang)[routeKey] || '';
	return pattern.replace(/\/:.*$/, '');
}

/**
 * Reverse lookup: `/a-propos` in French -> the `about` route key.
 * Returns null for paths that don't correspond to a static route.
 */
export function findRouteKeyByPath(pathname, lang) {
	const table = getRoutePathTable(lang);
	return Object.keys(table).find((key) => table[key] === pathname) || null;
}

/**
 * Same page, expressed in `targetLang`.
 *
 * Most routes use a different slug per language (`/about` vs `/a-propos`), so
 * reusing the current path for the alternate — as a naive implementation does —
 * produces URLs like `/en/a-propos` that don't exist. This resolves the route
 * key first and rebuilds the path from the target language's table.
 *
 * For `:slug` detail routes only the localized prefix can be translated here
 * (`/circuit/x` -> `/tour/x`); pages whose slug is also translated pass an
 * explicit `alternateUrls` map instead.
 */
export function toAlternatePath(pathname = '/', lang = DEFAULT_LANGUAGE, targetLang = DEFAULT_LANGUAGE) {
	if (lang === targetLang) return pathname;

	const routeKey = findRouteKeyByPath(pathname, lang);
	if (routeKey) return getRoutePathTable(targetLang)[routeKey];

	const sourceTable = getRoutePathTable(lang);
	const detailKey = Object.keys(sourceTable).find((key) => {
		const prefix = getDetailPrefix(key, lang);
		return sourceTable[key].includes(':') && prefix && pathname.startsWith(`${prefix}/`);
	});
	if (detailKey) {
		const rest = pathname.slice(getDetailPrefix(detailKey, lang).length);
		return `${getDetailPrefix(detailKey, targetLang)}${rest}`;
	}

	return pathname;
}

/** `/about` -> `/en/about`; the language segment is part of every public URL. */
export function toLocalizedPath(pathname = '/', lang = DEFAULT_LANGUAGE) {
	const cleanPath = !pathname || pathname === '/' ? '' : pathname;
	return `/${resolveLanguage(lang)}${cleanPath}`;
}

export function toAbsoluteUrl(pathname = '/', lang = DEFAULT_LANGUAGE) {
	return new URL(toLocalizedPath(pathname, lang), SITE_ORIGIN).toString();
}
