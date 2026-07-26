import { execSync } from 'node:child_process';
import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Origin, languages and the localized route table come from src/seo/sitemap.js —
// the same module the runtime SEO layer uses. That file is deliberately
// dependency-free (no `@/` aliases, no browser APIs) so this plain Node script
// can import it directly, which removes the old "keep in sync" duplication.
import {
	DEFAULT_LANGUAGE,
	SITEMAP_FILES,
	SITEMAP_INDEX_FILE,
	SITE_ORIGIN as BASE_URL,
	SUPPORTED_LANGUAGES,
	getDetailPrefix,
	getRoutePathTable,
	getStaticRouteKeys,
	toAbsoluteUrl,
} from '../src/seo/sitemap.js';

// Only route keys that resolve to a real URL (no `:slug` placeholder).
const STATIC_ROUTE_KEYS = getStaticRouteKeys();
const STATIC_PATHS_BY_LANG = Object.fromEntries(
	SUPPORTED_LANGUAGES.map((lang) => [
		lang,
		Object.fromEntries(STATIC_ROUTE_KEYS.map((key) => [key, getRoutePathTable(lang)[key]])),
	])
);
const TOUR_DETAIL_PREFIX = Object.fromEntries(
	SUPPORTED_LANGUAGES.map((lang) => [lang, getDetailPrefix('tourDetail', lang)])
);
const AIRPORT_DETAIL_PREFIX = Object.fromEntries(
	SUPPORTED_LANGUAGES.map((lang) => [lang, getDetailPrefix('airportTransferDetail', lang)])
);

const PUBLIC_DIR = resolve(process.cwd(), 'public');

function escapeXml(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

// Real last-modified date from git history for a given source file — reflects
// when that content actually last changed, rather than a fabricated "today".
function lastmodFromGit(relativeFilePath) {
	try {
		const iso = execSync(`git log -1 --format=%aI -- "${relativeFilePath}"`, { cwd: resolve(process.cwd(), '..', '..') })
			.toString()
			.trim();
		return iso ? iso.slice(0, 10) : null;
	} catch {
		return null;
	}
}

// Parses `{ id: '...', slug: '...', ... }` object blocks out of a data file's
// source text (regex-based, since these files are plain JS literals, not JSON).
function parseBlocks(source) {
	return source.split(/\n\t\{/).slice(1);
}

async function getStaticPaths() {
	const lastmod = lastmodFromGit('apps/web/src/data/route-config.js');
	const routeKeys = Object.keys(STATIC_PATHS_BY_LANG[DEFAULT_LANGUAGE]);
	return routeKeys.map((key) => ({
		pathByLang: Object.fromEntries(SUPPORTED_LANGUAGES.map((lang) => [lang, STATIC_PATHS_BY_LANG[lang][key]])),
		lastmod,
	}));
}

// Reads id+slug pairs from an en/fr pair of data files and joins them by id
// (the stable, language-independent key) into one entry per piece of content,
// each carrying its own per-language path.
async function getLocalizedEntries({ enFile, frFile, buildPath, extraFields = () => ({}) }) {
	const enSource = await readFile(enFile, 'utf8');
	const frSource = await readFile(frFile, 'utf8');
	const enBlocks = parseBlocks(enSource);
	const frBlocks = parseBlocks(frSource);

	const frById = new Map();
	for (const block of frBlocks) {
		const id = block.match(/id:\s*'([^']+)'/)?.[1];
		const slug = block.match(/slug:\s*'([^']+)'/)?.[1];
		if (id && slug) frById.set(id, slug);
	}

	return enBlocks
		.map((block) => {
			const id = block.match(/id:\s*'([^']+)'/)?.[1];
			const enSlug = block.match(/slug:\s*'([^']+)'/)?.[1];
			const frSlug = id ? frById.get(id) : undefined;
			if (!id || !enSlug || !frSlug) return null;

			return {
				pathByLang: { en: buildPath('en', enSlug), fr: buildPath('fr', frSlug) },
				...extraFields(block),
			};
		})
		.filter(Boolean);
}

async function getTourEntries() {
	const lastmod = lastmodFromGit('apps/web/src/data/tours/catalog.en.js');
	return getLocalizedEntries({
		enFile: resolve(process.cwd(), 'src', 'data', 'tours', 'catalog.en.js'),
		frFile: resolve(process.cwd(), 'src', 'data', 'tours', 'catalog.fr.js'),
		buildPath: (lang, slug) => `${TOUR_DETAIL_PREFIX[lang]}/${slug}`,
		extraFields: (block) => ({
			lastmod,
			image: block.match(/image:\s*IMG\.([A-Za-z0-9_]+)/)?.[1],
			imageCaption: block.match(/title:\s*'([^']+)'/)?.[1],
		}),
	});
}

async function getBlogEntries() {
	const gitLastmod = lastmodFromGit('apps/web/src/data/blog/posts.en.js');
	return getLocalizedEntries({
		enFile: resolve(process.cwd(), 'src', 'data', 'blog', 'posts.en.js'),
		frFile: resolve(process.cwd(), 'src', 'data', 'blog', 'posts.fr.js'),
		buildPath: (lang, slug) => `${STATIC_PATHS_BY_LANG[lang].blog}/${slug}`,
		extraFields: (block) => ({
			lastmod: block.match(/dateModified:\s*'([^']+)'/)?.[1] || gitLastmod,
			image: block.match(/image:\s*IMG\.([A-Za-z0-9_]+)/)?.[1],
			imageCaption: block.match(/title:\s*'([^']+)'/)?.[1],
		}),
	});
}

async function getDestinationEntries() {
	const lastmod = lastmodFromGit('apps/web/src/data/destinations/en.js');
	return getLocalizedEntries({
		enFile: resolve(process.cwd(), 'src', 'data', 'destinations', 'en.js'),
		frFile: resolve(process.cwd(), 'src', 'data', 'destinations', 'fr.js'),
		buildPath: (lang, slug) => `${STATIC_PATHS_BY_LANG[lang].destinations}/${slug}`,
		extraFields: (block) => ({
			lastmod,
			image: block.match(/image:\s*IMG\.([A-Za-z0-9_]+)/)?.[1],
			imageCaption: block.match(/name:\s*'([^']+)'/)?.[1],
		}),
	});
}

// Airport content itself isn't translated (mostly proper nouns), but the
// /airport-transfers vs /transferts-aeroport prefix still needs to change per language.
async function getAirportEntries() {
	const airportsDir = resolve(process.cwd(), 'src', 'data', 'airports');
	const files = await readdir(airportsDir);
	const airportFiles = files.filter((file) => file.endsWith('.js') && file !== 'index.js');
	const entries = [];

	for (const file of airportFiles) {
		const source = await readFile(resolve(airportsDir, file), 'utf8');
		const slug = source.match(/slug:\s*'([^']+)'/)?.[1];
		const lastmod = lastmodFromGit(`apps/web/src/data/airports/${file}`);
		if (slug) {
			entries.push({
				pathByLang: Object.fromEntries(SUPPORTED_LANGUAGES.map((lang) => [lang, `${AIRPORT_DETAIL_PREFIX[lang]}/${slug}`])),
				lastmod,
			});
		}
	}

	return entries;
}

// Resolves an IMG.<key> reference (e.g. "luxCamp") to a stable, crawlable URL.
// The app imports these through Vite (which hashes filenames at build time), so
// for the sitemap the source file is additionally copied into public/images/
// under its descriptive name — a parallel static copy solely for crawlers.
//
// Two hops are needed because the IMG key and the underlying import identifier
// don't always match (IMG.luxCamp -> `luxcamp` -> luxury-desert-camp-morocco.webp).
// Resolving only the first hop previously dropped those images from the sitemap.
const IMGS_DIR = resolve(process.cwd(), '..', '..', 'Imgs');
let FILENAME_BY_IMG_KEY = null;

async function loadImageFilenameMap() {
	if (FILENAME_BY_IMG_KEY) return FILENAME_BY_IMG_KEY;

	const imagesSource = await readFile(resolve(IMGS_DIR, 'images.js'), 'utf8');
	const dataSource = await readFile(resolve(process.cwd(), 'src', 'data', 'images.js'), 'utf8');

	// `import luxcamp from './luxury-desert-camp-morocco.webp'`
	const fileByIdentifier = new Map(
		[...imagesSource.matchAll(/import\s+([A-Za-z0-9_$]+)\s+from\s+'\.\/([^']+)'/g)].map((m) => [m[1], m[2]])
	);
	// `luxCamp: images.luxcamp,`
	FILENAME_BY_IMG_KEY = new Map(
		[...dataSource.matchAll(/^\t([A-Za-z0-9_$]+):\s*images\.([A-Za-z0-9_$]+),/gm)]
			.map(([, imgKey, identifier]) => [imgKey, fileByIdentifier.get(identifier)])
			.filter(([, fileName]) => Boolean(fileName))
	);

	return FILENAME_BY_IMG_KEY;
}

const IMAGE_URL_CACHE = new Map();
async function resolveImageUrl(imgKey) {
	if (!imgKey) return null;
	if (IMAGE_URL_CACHE.has(imgKey)) return IMAGE_URL_CACHE.get(imgKey);

	try {
		const fileName = (await loadImageFilenameMap()).get(imgKey);
		if (!fileName) return null;

		const destDir = resolve(PUBLIC_DIR, 'images');
		await mkdir(destDir, { recursive: true });
		await copyFile(resolve(IMGS_DIR, fileName), resolve(destDir, fileName));

		const url = `/images/${fileName}`;
		IMAGE_URL_CACHE.set(imgKey, url);
		return url;
	} catch {
		return null;
	}
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
		const imageUrl = await resolveImageUrl(entry.image);
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
