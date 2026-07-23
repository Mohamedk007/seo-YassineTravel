import { execSync } from 'node:child_process';
import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const BASE_URL = 'https://moroccotripholidays.com';
// Route paths and supported languages are duplicated here (rather than imported
// from src/data/route-config.js / src/i18n/config.js) so this plain Node build
// script never depends on browser-only/aliased runtime modules. Keep in sync.
const SUPPORTED_LANGUAGES = ['en', 'fr'];
const DEFAULT_LANGUAGE = 'en';

const STATIC_PATHS_BY_LANG = {
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
		blog: '/blog',
		travelGuide: '/travel-guide',
		reviews: '/reviews',
		gallery: '/gallery',
		faq: '/faq',
		contact: '/contact',
		airportTransfers: '/airport-transfers',
		privateDrivers: '/private-drivers',
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
		blog: '/blog',
		travelGuide: '/guide-de-voyage',
		reviews: '/avis',
		gallery: '/galerie',
		faq: '/faq',
		contact: '/contact',
		airportTransfers: '/transferts-aeroport',
		privateDrivers: '/chauffeurs-prives',
	},
};
const TOUR_DETAIL_PREFIX = { en: '/tour', fr: '/circuit' };
const AIRPORT_DETAIL_PREFIX = { en: '/airport-transfers', fr: '/transferts-aeroport' };

const PUBLIC_DIR = resolve(process.cwd(), 'public');

function toAbsoluteUrl(pathname, lang) {
	const cleanPath = pathname === '/' ? '' : pathname;
	return new URL(`/${lang}${cleanPath}`, BASE_URL).toString();
}

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

// Resolves an IMG.<key> reference (e.g. "duneSunset") to a stable, crawlable URL.
// The app itself imports these through Vite (which hashes filenames at build time),
// so for the sitemap we additionally copy the source file into public/images/
// under its original name — a parallel static copy solely for crawlers, added
// without touching how the app renders images.
const IMAGE_URL_CACHE = new Map();
async function resolveImageUrl(imgKey) {
	if (!imgKey) return null;
	if (IMAGE_URL_CACHE.has(imgKey)) return IMAGE_URL_CACHE.get(imgKey);

	try {
		const imagesSourcePath = resolve(process.cwd(), '..', '..', 'Imgs', 'images.js');
		const imagesSource = await readFile(imagesSourcePath, 'utf8');
		const importLine = imagesSource.match(new RegExp(`import ${imgKey} from '\\./([^']+)'`));
		const fileName = importLine?.[1];
		if (!fileName) return null;

		const sourcePath = resolve(process.cwd(), '..', '..', 'Imgs', fileName);
		const destDir = resolve(PUBLIC_DIR, 'images');
		await mkdir(destDir, { recursive: true });
		await copyFile(sourcePath, resolve(destDir, fileName));

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
${['sitemap-pages.xml', 'sitemap-tours.xml', 'sitemap-destinations.xml', 'sitemap-blog.xml', 'sitemap-reviews.xml', 'sitemap-images.xml']
	.map((file) => `  <sitemap>\n    <loc>${BASE_URL}/${file}</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>`)
	.join('\n')}
</sitemapindex>
`;
await writeFile(resolve(PUBLIC_DIR, 'sitemap-index.xml'), sitemapIndex, 'utf8');

console.log(
	`[build] Generated sitemap-index.xml (pages: ${pagesCount}, tours: ${toursCount}, destinations: ${destinationsCount}, blog: ${blogCount}, reviews: ${reviewsCount}, images: ${imagesCount})`
);
