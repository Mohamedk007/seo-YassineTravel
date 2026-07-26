import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Origin, languages and the localized route table come from src/seo/sitemap.js —
// the same module the runtime SEO layer uses. That file is deliberately
// dependency-free (no `@/` aliases, no browser APIs) so this plain Node script
// can import it directly, which removes the old "keep in sync" duplication.
import { DEFAULT_LANGUAGE, SITEMAP_FILES, SITEMAP_INDEX_FILE, SITE_ORIGIN as BASE_URL, SUPPORTED_LANGUAGES, toAbsoluteUrl } from '../src/seo/sitemap.js';
import {
	getAirportEntries,
	getBlogEntries,
	getDestinationEntries,
	getStaticPathsByLang,
	getTourEntries,
	lastmodFromGit,
	resolveStableImageUrl,
} from './lib/content-entries.mjs';

const STATIC_PATHS_BY_LANG = getStaticPathsByLang();
const PUBLIC_DIR = resolve(process.cwd(), 'public');

function escapeXml(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

async function getStaticPaths() {
	const lastmod = lastmodFromGit('apps/web/src/data/route-config.js');
	const routeKeys = Object.keys(STATIC_PATHS_BY_LANG[DEFAULT_LANGUAGE]);
	return routeKeys.map((key) => ({
		pathByLang: Object.fromEntries(SUPPORTED_LANGUAGES.map((lang) => [lang, STATIC_PATHS_BY_LANG[lang][key]])),
		lastmod,
	}));
}

function urlBlock({ pathByLang, lastmod, imageCaption, imageUrl }) {
	return SUPPORTED_LANGUAGES.map((lang) => {
		const alternates = SUPPORTED_LANGUAGES.map(
			(altLang) => `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${escapeXml(toAbsoluteUrl(pathByLang[altLang], altLang))}" />`
		).join('\n');
		const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(toAbsoluteUrl(pathByLang[DEFAULT_LANGUAGE], DEFAULT_LANGUAGE))}" />`;
		const lastmodTag = lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '';
		const imageTag = imageUrl
			? `    <image:image>\n      <image:loc>${escapeXml(new URL(imageUrl, BASE_URL).toString())}</image:loc>\n      <image:caption>${escapeXml(imageCaption || '')}</image:caption>\n    </image:image>\n`
			: '';
		return `  <url>\n    <loc>${escapeXml(toAbsoluteUrl(pathByLang[lang], lang))}</loc>\n${lastmodTag}${alternates}\n${xDefault}\n${imageTag}  </url>`;
	}).join('\n');
}

function wrapUrlset(urlBlocks, { withImageNamespace = false } = {}) {
	const imageNs = withImageNamespace ? ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' : '';
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"${imageNs}>\n${urlBlocks.join('\n')}\n</urlset>\n`;
}

// Newest <lastmod> written into each child sitemap, so the index reports when a
// child's content actually changed rather than "the day the build ran".
const LASTMOD_BY_FILE = new Map();

async function writeSitemap(filename, entries, options) {
	const seen = new Set();
	const uniqueEntries = entries.filter((entry) => {
		const key = entry.pathByLang[DEFAULT_LANGUAGE];
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
	const blocks = uniqueEntries.map((entry) => urlBlock(entry));
	const xml = wrapUrlset(blocks, options);
	await writeFile(resolve(PUBLIC_DIR, filename), xml, 'utf8');

	const newest = uniqueEntries
		.map((entry) => entry.lastmod)
		.filter(Boolean)
		.sort()
		.at(-1);
	if (newest) LASTMOD_BY_FILE.set(filename, newest);

	return uniqueEntries.length;
}

async function writeImageSitemap(entriesWithImages) {
	const withImages = [];
	for (const entry of entriesWithImages) {
		const imageUrl = await resolveStableImageUrl(entry.image, PUBLIC_DIR);
		if (imageUrl) withImages.push({ ...entry, imageUrl });
	}
	return writeSitemap('sitemap-images.xml', withImages, { withImageNamespace: true });
}

await mkdir(PUBLIC_DIR, { recursive: true });

const staticEntries = await getStaticPaths();
const tourEntries = await getTourEntries();
const blogEntries = await getBlogEntries();
const destinationEntries = await getDestinationEntries();
const airportEntries = await getAirportEntries();
// No individual review URLs exist (reviews live on one /reviews page, not one
// page per review), so the "reviews" sitemap covers that single collection page.
const reviewEntries = [
	{
		pathByLang: Object.fromEntries(SUPPORTED_LANGUAGES.map((lang) => [lang, STATIC_PATHS_BY_LANG[lang].reviews])),
		lastmod: staticEntries[0]?.lastmod,
	},
];

const pagesCount = await writeSitemap('sitemap-pages.xml', [...staticEntries, ...airportEntries]);
const toursCount = await writeSitemap('sitemap-tours.xml', tourEntries);
const destinationsCount = await writeSitemap('sitemap-destinations.xml', destinationEntries);
const blogCount = await writeSitemap('sitemap-blog.xml', blogEntries);
const reviewsCount = await writeSitemap('sitemap-reviews.xml', reviewEntries);
const imagesCount = await writeImageSitemap([...tourEntries, ...destinationEntries, ...blogEntries]);
// No videos exist on the site yet — skipped per the "only when videos exist" rule.
// Add a sitemap-videos.xml here (VideoObject entries) if/when video content is added.

const today = new Date().toISOString().slice(0, 10);
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_FILES.map(
	(file) =>
		`  <sitemap>\n    <loc>${BASE_URL}/${file}</loc>\n    <lastmod>${LASTMOD_BY_FILE.get(file) || today}</lastmod>\n  </sitemap>`
).join('\n')}
</sitemapindex>
`;
await writeFile(resolve(PUBLIC_DIR, SITEMAP_INDEX_FILE), sitemapIndex, 'utf8');

console.log(
	`[build] Generated sitemap-index.xml (pages: ${pagesCount}, tours: ${toursCount}, destinations: ${destinationsCount}, blog: ${blogCount}, reviews: ${reviewsCount}, images: ${imagesCount})`
);
