import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Everything imported below is plain data/logic — no React, no Vite `@/` alias,
// no image imports anywhere on this dependency path (see the "relative imports
// only" notes in src/seo/seo.config.js and src/seo/schema.js). That is what lets
// this script run as plain `node tools/prerender.mjs`, computing the exact same
// tags buildSeoHead() produces client-side, with zero risk of drifting from it.
import { buildSeoHead } from '../src/seo/head.js';
import { buildServiceSchema, buildTourSchema, buildTouristDestinationSchema, buildBlogPostingSchema } from '../src/seo/schema.js';
import { SUPPORTED_LANGUAGES, getRoutePathTable, getStaticRouteKeys } from '../src/seo/sitemap.js';
import {
	extractField,
	extractNamedExportBlock,
	getAirportEntries,
	getBlogEntries,
	getDestinationEntries,
	getTourEntries,
	parseBlocks,
	resolveStableImageUrl,
	WEB_ROOT,
} from './lib/content-entries.mjs';

const DIST_DIR = resolve(WEB_ROOT, '..', '..', 'dist', 'apps', 'web');
const PUBLIC_DIR = resolve(WEB_ROOT, 'public');

/**
 * This is deliberately a *metadata-only* prerender: it writes the real
 * <title>/<meta>/<link>/JSON-LD for every public URL into a static HTML file,
 * so a crawler that never executes JS still sees correct, non-generic tags.
 * The body stays the plain SPA shell (`<div id="root">`) — the actual visible
 * content still renders client-side exactly as before, and richer
 * page-specific schema (FAQPage, ItemList, Review) that only static/collection
 * pages emit is still added client-side on top of the identity graph below.
 */

// routeKey -> which single-object editorial/services export drives its
// title/subtitle/pageType, mirroring what each real page component passes to <Seo />.
const CONTENT_PAGE_DEFS = {
	about: { source: 'editorial', exportName: 'ABOUT_PAGE', pageType: 'AboutPage' },
	destinations: { source: 'editorial', exportName: 'DESTINATIONS_PAGE', pageType: 'CollectionPage' },
	gallery: { source: 'editorial', exportName: 'GALLERY_PAGE', pageType: 'CollectionPage' },
	reviews: { source: 'editorial', exportName: 'REVIEWS_PAGE', pageType: 'CollectionPage' },
	faq: { source: 'editorial', exportName: 'FAQ_PAGE', pageType: 'FAQPage' },
	blog: { source: 'editorial', exportName: 'BLOG_PAGE', pageType: 'Blog' },
	travelGuide: { source: 'editorial', exportName: 'TRAVEL_GUIDE_PAGE', pageType: 'CollectionPage' },
	contact: { source: 'editorial', exportName: 'CONTACT_PAGE', pageType: 'ContactPage' },
	customTours: { source: 'services', exportName: 'CUSTOM_TOURS_PAGE', pageType: 'Service' },
	airportTransfers: { source: 'services', exportName: 'AIRPORT_TRANSFER_PAGE', pageType: 'CollectionPage' },
	privateDrivers: { source: 'services', exportName: 'PRIVATE_DRIVER_PAGE', pageType: 'Service' },
};

const TOUR_COLLECTION_ROUTE_KEYS = ['tours', 'luxuryTours', 'privateTours', 'desertTours', 'dayTrips', 'excursions', 'guidedTours'];

// Kept in sync with the same title template in AirportTransferDetailPage.jsx
// (every airport's `name` already ends in "Airport", so "airport transfer"
// would repeat the word).
const AIRPORT_TITLE = {
	en: (airport) => `${airport.name} transfer`,
	fr: (airport) => `Transfert aéroport ${airport.name}`,
};
const AIRPORT_DESCRIPTION = {
	en: (airport) => `Book a private, fixed-price transfer from ${airport.name} (${airport.code}) in ${airport.city}. Meet-and-greet, flight tracking and 24/7 support.`,
	fr: (airport) => `Réservez un transfert privé à prix fixe depuis ${airport.name} (${airport.code}) à ${airport.city}. Accueil personnalisé, suivi des vols et assistance 24/7.`,
};

async function readNamedExport(source, lang, exportName) {
	const filePath = resolve(WEB_ROOT, 'src', 'data', source, `${lang}.js`);
	const fileSource = await readFile(filePath, 'utf8');
	const block = extractNamedExportBlock(fileSource, exportName);
	if (!block) return null;
	return {
		title: extractField(block, 'title'),
		subtitle: extractField(block, 'subtitle'),
	};
}

async function readTourCollections(lang) {
	const filePath = resolve(WEB_ROOT, 'src', 'data', 'tours', `categories.${lang}.js`);
	const source = await readFile(filePath, 'utf8');
	const blocks = parseBlocks(source);
	return new Map(
		blocks.map((block) => [
			extractField(block, 'routeKey'),
			{ title: extractField(block, 'title'), subtitle: extractField(block, 'subtitle') },
		])
	);
}

/** Builds the list of { lang, path, seoProps } to prerender. */
async function collectPages() {
	const pages = [];

	// Home + static content/service/collection pages.
	const staticRouteKeys = getStaticRouteKeys();
	const tourCollectionsByLang = Object.fromEntries(
		await Promise.all(SUPPORTED_LANGUAGES.map(async (lang) => [lang, await readTourCollections(lang)]))
	);

	for (const routeKey of staticRouteKeys) {
		for (const lang of SUPPORTED_LANGUAGES) {
			const path = getRoutePathTable(lang)[routeKey];
			const breadcrumbItems = routeKey === 'home' ? [{ routeKey: 'home' }] : [{ routeKey: 'home' }, { routeKey }];

			if (routeKey === 'home') {
				pages.push({ lang, path, seoProps: { breadcrumbItems, pageType: 'WebPage' } });
				continue;
			}

			if (TOUR_COLLECTION_ROUTE_KEYS.includes(routeKey)) {
				const entry = tourCollectionsByLang[lang].get(routeKey);
				if (!entry) continue;
				pages.push({
					lang,
					path,
					seoProps: { title: entry.title, description: entry.subtitle, pageType: 'CollectionPage', breadcrumbItems: [{ routeKey: 'home' }, { routeKey: 'tours' }] },
				});
				continue;
			}

			const def = CONTENT_PAGE_DEFS[routeKey];
			if (!def) continue;
			const entry = await readNamedExport(def.source, lang, def.exportName);
			if (!entry) continue;
			pages.push({
				lang,
				path,
				seoProps: { title: entry.title, description: entry.subtitle, pageType: def.pageType, breadcrumbItems },
			});
		}
	}

	// Tours.
	const tourEntries = await getTourEntries();
	for (const entry of tourEntries) {
		const alternateUrls = entry.pathByLang;
		const imageUrl = await resolveStableImageUrl(entry.image, PUBLIC_DIR);
		for (const lang of SUPPORTED_LANGUAGES) {
			const title = entry.titleByLang[lang];
			const description = entry.descriptionByLang[lang];
			const path = entry.pathByLang[lang];
			pages.push({
				lang,
				path,
				seoProps: {
					title,
					description,
					image: imageUrl,
					type: 'article',
					pageType: 'TouristTrip',
					alternateUrls,
					breadcrumbItems: [{ routeKey: 'home' }, { routeKey: 'tours' }, { name: title, path }],
					structuredData: buildTourSchema({ title, tagline: description, price: entry.priceByLang[lang], image: imageUrl, slug: entry.slugByLang[lang] }, path, lang),
				},
			});
		}
	}

	// Destinations.
	const destinationEntries = await getDestinationEntries();
	for (const entry of destinationEntries) {
		const alternateUrls = entry.pathByLang;
		const imageUrl = await resolveStableImageUrl(entry.image, PUBLIC_DIR);
		for (const lang of SUPPORTED_LANGUAGES) {
			const title = entry.titleByLang[lang];
			const description = entry.descriptionByLang[lang];
			const path = entry.pathByLang[lang];
			pages.push({
				lang,
				path,
				seoProps: {
					title,
					description,
					image: imageUrl,
					pageType: 'TouristDestination',
					alternateUrls,
					breadcrumbItems: [{ routeKey: 'home' }, { routeKey: 'destinations' }, { name: title, path }],
					structuredData: buildTouristDestinationSchema({ name: title, summary: description, image: imageUrl }, path, lang),
				},
			});
		}
	}

	// Blog articles.
	const blogEntries = await getBlogEntries();
	for (const entry of blogEntries) {
		const alternateUrls = entry.pathByLang;
		const imageUrl = await resolveStableImageUrl(entry.image, PUBLIC_DIR);
		for (const lang of SUPPORTED_LANGUAGES) {
			const title = entry.titleByLang[lang];
			const description = entry.descriptionByLang[lang];
			const path = entry.pathByLang[lang];
			pages.push({
				lang,
				path,
				seoProps: {
					title,
					description,
					image: imageUrl,
					type: 'article',
					pageType: 'BlogPosting',
					alternateUrls,
					breadcrumbItems: [{ routeKey: 'home' }, { routeKey: 'blog' }, { name: title, path }],
					structuredData: buildBlogPostingSchema(
						{ title, summary: description, image: imageUrl, datePublished: entry.datePublished, dateModified: entry.dateModified },
						path,
						lang
					),
				},
			});
		}
	}

	// Airport transfers.
	const airportEntries = await getAirportEntries();
	for (const entry of airportEntries) {
		const alternateUrls = entry.pathByLang;
		const imageUrl = await resolveStableImageUrl(entry.image, PUBLIC_DIR);
		for (const lang of SUPPORTED_LANGUAGES) {
			const airport = { name: entry.name, city: entry.city, code: entry.code };
			const title = (AIRPORT_TITLE[lang] || AIRPORT_TITLE.en)(airport);
			const description = (AIRPORT_DESCRIPTION[lang] || AIRPORT_DESCRIPTION.en)(airport);
			const path = entry.pathByLang[lang];
			pages.push({
				lang,
				path,
				seoProps: {
					title,
					description,
					image: imageUrl,
					pageType: 'WebPage',
					alternateUrls,
					breadcrumbItems: [{ routeKey: 'home' }, { routeKey: 'airportTransfers' }, { name: entry.name, path }],
					structuredData: buildServiceSchema({ name: title, description, path, lang }),
				},
			});
		}
	}

	return pages;
}

function escapeHtmlAttr(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('"', '&quot;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;');
}

function escapeHtmlText(value) {
	return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

// `<` is escaped so a title/description inside the JSON-LD payload can never
// close the script tag early — matches src/seo/StructuredData.jsx.
function serializeJsonLd(entry) {
	return JSON.stringify(entry).replaceAll('<', '\\u003c');
}

// Every tag below except <title> is stamped with data-rh="true" — the same
// marker react-helmet-async's own SSR output would carry. Client-side, Helmet
// only ever looks at existing meta/link/script tags that already have this
// marker (see node_modules/react-helmet-async/lib/index.js's updateTags) to
// decide what to replace on the first render/navigation. Without it, these
// statically-prerendered tags are invisible to Helmet, which just appends its
// own correct copies on top instead of replacing them — leaving stale
// canonical/hreflang/OG/twitter/JSON-LD tags from whichever page a user's
// session first loaded, duplicated indefinitely across every client-side
// navigation. <title> needs no marker: Helmet always sets document.title
// directly regardless of any existing markup.
function renderHeadTags(head) {
	const lines = [
		`<title>${escapeHtmlText(head.title)}</title>`,
		`<meta name="description" content="${escapeHtmlAttr(head.description)}" data-rh="true" />`,
		`<meta name="robots" content="${escapeHtmlAttr(head.robotsContent)}" data-rh="true" />`,
		`<link rel="canonical" href="${escapeHtmlAttr(head.canonicalUrl)}" data-rh="true" />`,
		...head.hreflangLinks.map((link) => `<link rel="alternate" hreflang="${link.hrefLang}" href="${escapeHtmlAttr(link.href)}" data-rh="true" />`),
		...head.openGraphTags.map((tag) => `<meta property="${tag.property}" content="${escapeHtmlAttr(tag.content)}" data-rh="true" />`),
		...head.twitterTags.map((tag) => `<meta name="${tag.name}" content="${escapeHtmlAttr(tag.content)}" data-rh="true" />`),
		...head.schemas.map((schema) => `<script type="application/ld+json" data-rh="true">${serializeJsonLd(schema)}</script>`),
	];
	return lines.join('\n\t\t');
}

function injectIntoTemplate(template, head) {
	return template
		// Strip HTML comments first — index.html's dev-facing comment mentions
		// "<title>" in prose, which a naive <title>...</title> regex would
		// otherwise match into, swallowing everything up to the real </title>.
		.replace(/<!--[\s\S]*?-->\s*/g, '')
		.replace(/<html lang="[^"]*"/, `<html lang="${head.htmlLang}"`)
		.replace(/<title>[\s\S]*?<\/title>\s*/, '')
		.replace(/<meta\s+name="description"[\s\S]*?\/>\s*/, '')
		.replace(/<meta\s+name="robots"[\s\S]*?\/>\s*/, '')
		.replace('</head>', `\t\t${renderHeadTags(head)}\n\t</head>`);
}

function outputPathFor(lang, path) {
	const cleanPath = !path || path === '/' ? '' : path;
	return resolve(DIST_DIR, lang, ...cleanPath.split('/').filter(Boolean), 'index.html');
}

async function main() {
	const template = await readFile(resolve(DIST_DIR, 'index.html'), 'utf8');
	const pages = await collectPages();

	let written = 0;
	for (const { lang, path, seoProps } of pages) {
		const head = buildSeoHead({ ...seoProps, lang, path });
		const html = injectIntoTemplate(template, head);
		const outPath = outputPathFor(lang, path);
		await mkdir(resolve(outPath, '..'), { recursive: true });
		await writeFile(outPath, html, 'utf8');
		written += 1;
	}

	console.log(`[build] Prerendered <head> metadata for ${written} URLs.`);
}

await main();
