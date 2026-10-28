import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { AppShell } from '@/App';
import { AppRoutes as ServerAppRoutes } from '@/routes.server';
import { createI18nInstance } from '@/i18n/config';
import '@/content/all';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, getDetailPrefix, getStaticRouteKeys, toAbsoluteUrl } from '@/seo/sitemap';
import { getRoutePaths } from '@/data/route-config';
import { getTours } from '@/data/tours/catalog';
import { getBlogPosts } from '@/data/blog';
import { getDestinations } from '@/data/destinations';
import { AIRPORTS } from '@/data/airports';

export { defaultLanguage, resolveLang } from '@/i18n/resolveLang';
export { getRoutePaths };
export {
	applyContentOverrides,
	getContentDefaults,
	getContentKeys,
	getImageLibrary,
	validateContentOverride,
} from '@/content/registry';
export { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, toAbsoluteUrl };

function detailPath(routeKey, lang, slug) {
	return `${getDetailPrefix(routeKey, lang)}/${slug}`;
}

// Sitemap-shaped entries built from the *live* (possibly admin-edited) data,
// grouped per sitemap file. Content is joined across languages by its stable
// `id`, mirroring tools/lib/content-entries.mjs.
export function getSitemapEntries() {
	const joinById = (getList, routeKey, lastmodOf = () => null) => {
		const [primary, ...others] = SUPPORTED_LANGUAGES;
		return getList(primary)
			.map((item) => {
				const pathByLang = { [primary]: detailPath(routeKey, primary, item.slug) };
				for (const lang of others) {
					const match = getList(lang).find((candidate) => candidate.id === item.id);
					if (!match?.slug) return null;
					pathByLang[lang] = detailPath(routeKey, lang, match.slug);
				}
				return { pathByLang, lastmod: lastmodOf(item) };
			})
			.filter(Boolean);
	};

	const staticEntries = getStaticRouteKeys().map((key) => ({
		pathByLang: Object.fromEntries(SUPPORTED_LANGUAGES.map((lang) => [lang, getRoutePaths(lang)[key]])),
		lastmod: null,
	}));
	const airportEntries = AIRPORTS.filter((airport) => airport.slug).map((airport) => ({
		pathByLang: Object.fromEntries(SUPPORTED_LANGUAGES.map((lang) => [lang, detailPath('airportTransferDetail', lang, airport.slug)])),
		lastmod: null,
	}));

	return {
		'sitemap-pages.xml': [...staticEntries, ...airportEntries],
		'sitemap-tours.xml': joinById(getTours, 'tourDetail'),
		'sitemap-destinations.xml': joinById(getDestinations, 'destinationDetail'),
		'sitemap-blog.xml': joinById(getBlogPosts, 'blogArticle', (post) => post.dateModified || post.datePublished || null),
	};
}

// Every URL that must still render after an admin edit: all static pages plus
// every tour/blog/destination/airport detail page, in the given language.
export function getAllContentPaths(lang = DEFAULT_LANGUAGE) {
	const paths = new Set(getStaticRouteKeys().map((key) => getRoutePaths(lang)[key]));
	for (const tour of getTours(lang)) if (tour.slug) paths.add(detailPath('tourDetail', lang, tour.slug));
	for (const post of getBlogPosts(lang)) if (post.slug) paths.add(detailPath('blogArticle', lang, post.slug));
	for (const destination of getDestinations(lang)) if (destination.slug) paths.add(detailPath('destinationDetail', lang, destination.slug));
	for (const airport of AIRPORTS) if (airport.slug) paths.add(detailPath('airportTransferDetail', lang, airport.slug));
	return [...paths];
}

// `url` is the full request path including the /en or /fr prefix (e.g.
// "/en/tours/imperial-cities-sahara") — unlike BrowserRouter, StaticRouter's
// `location` must already include `basename` for route matching to work.
export function render(url, lang) {
	const i18n = createI18nInstance(lang);
	const helmetContext = {};

	const html = renderToString(
		<HelmetProvider context={helmetContext}>
			<I18nextProvider i18n={i18n}>
				<StaticRouter basename={`/${lang}`} location={url}>
					<AppShell lang={lang} routes={ServerAppRoutes} />
				</StaticRouter>
			</I18nextProvider>
		</HelmetProvider>
	);

	return { html, helmet: helmetContext.helmet };
}
