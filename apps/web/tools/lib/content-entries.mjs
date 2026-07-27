import { execSync } from 'node:child_process';
import { copyFile, mkdir, readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { SUPPORTED_LANGUAGES, getDetailPrefix, getRoutePathTable, getStaticRouteKeys } from '../../src/seo/sitemap.js';

/**
 * Shared, plain-Node (no bundler) data extraction for content that lives in
 * src/data/**. Used by both tools/generate-sitemap.mjs (sitemap XML) and
 * tools/prerender.mjs (prerendered <head> tags), so there is one place that
 * knows how to read id/slug/title/description/image out of these files.
 *
 * Regex-based on purpose: these are plain JS object literals, not JSON, and
 * they import IMG.<key> / images.js, which only a bundler (Vite) can resolve —
 * reading the source as text sidesteps that entirely, which is what lets both
 * scripts run as plain `node tools/foo.mjs` with no build step of their own.
 *
 * This module has no top-level side effects (no file writes, no console
 * output) — only generate-sitemap.mjs's own script body does that, so
 * prerender.mjs can import the entry getters below without re-running it.
 */

const WEB_ROOT = resolve(process.cwd());
const IMGS_DIR = resolve(WEB_ROOT, '..', '..', 'Imgs');

const STATIC_ROUTE_KEYS = getStaticRouteKeys();
const STATIC_PATHS_BY_LANG = Object.fromEntries(
	SUPPORTED_LANGUAGES.map((lang) => [
		lang,
		Object.fromEntries(STATIC_ROUTE_KEYS.map((key) => [key, getRoutePathTable(lang)[key]])),
	])
);
const TOUR_DETAIL_PREFIX = Object.fromEntries(SUPPORTED_LANGUAGES.map((lang) => [lang, getDetailPrefix('tourDetail', lang)]));
const AIRPORT_DETAIL_PREFIX = Object.fromEntries(
	SUPPORTED_LANGUAGES.map((lang) => [lang, getDetailPrefix('airportTransferDetail', lang)])
);

export function getStaticPathsByLang() {
	return STATIC_PATHS_BY_LANG;
}

export function lastmodFromGit(relativeFilePath) {
	try {
		const iso = execSync(`git log -1 --format=%aI -- "${relativeFilePath}"`, { cwd: resolve(WEB_ROOT, '..', '..') })
			.toString()
			.trim();
		return iso ? iso.slice(0, 10) : null;
	} catch {
		return null;
	}
}

// Parses `{ id: '...', slug: '...', ... }` object blocks out of a data file's
// source text.
export function parseBlocks(source) {
	return source.split(/\n\t\{/).slice(1);
}

// Handles both quote styles a field can be written with — e.g. tagline copy
// containing an apostrophe (Morocco's, the Valley's) is written double-quoted
// rather than escaped, and this previously only matched single-quoted values,
// silently returning undefined for those fields.
export function extractField(block, name) {
	const singleQuoted = block.match(new RegExp(`${name}:\\s*'((?:[^'\\\\]|\\\\.)*)'`));
	if (singleQuoted) return singleQuoted[1].replace(/\\'/g, "'");
	const doubleQuoted = block.match(new RegExp(`${name}:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
	if (doubleQuoted) return doubleQuoted[1].replace(/\\"/g, '"');
	return undefined;
}

export function extractImgKey(block) {
	return block.match(/image:\s*IMG\.([A-Za-z0-9_]+)/)?.[1];
}

// Reads id+slug (+ extra fields) pairs from an en/fr pair of data files and
// joins them by id (the stable, language-independent key) into one entry per
// piece of content, each carrying its own per-language path and text fields.
async function getLocalizedEntries({ enFile, frFile, buildPath, extraFields = () => ({}) }) {
	const enSource = await readFile(enFile, 'utf8');
	const frSource = await readFile(frFile, 'utf8');
	const enBlocks = parseBlocks(enSource);
	const frBlocks = parseBlocks(frSource);

	const frById = new Map();
	for (const block of frBlocks) {
		const id = extractField(block, 'id');
		if (id) frById.set(id, block);
	}

	return enBlocks
		.map((enBlock) => {
			const id = extractField(enBlock, 'id');
			const enSlug = extractField(enBlock, 'slug');
			const frBlock = id ? frById.get(id) : undefined;
			const frSlug = frBlock ? extractField(frBlock, 'slug') : undefined;
			if (!id || !enSlug || !frSlug) return null;

			return {
				id,
				pathByLang: { en: buildPath('en', enSlug), fr: buildPath('fr', frSlug) },
				slugByLang: { en: enSlug, fr: frSlug },
				...extraFields({ en: enBlock, fr: frBlock }),
			};
		})
		.filter(Boolean);
}

export async function getTourEntries() {
	const lastmod = lastmodFromGit('apps/web/src/data/tours/catalog.en.js');
	return getLocalizedEntries({
		enFile: resolve(WEB_ROOT, 'src', 'data', 'tours', 'catalog.en.js'),
		frFile: resolve(WEB_ROOT, 'src', 'data', 'tours', 'catalog.fr.js'),
		buildPath: (lang, slug) => `${TOUR_DETAIL_PREFIX[lang]}/${slug}`,
		extraFields: ({ en, fr }) => ({
			lastmod,
			image: extractImgKey(en),
			imageCaption: extractField(en, 'title'),
			titleByLang: { en: extractField(en, 'title'), fr: extractField(fr, 'title') },
			descriptionByLang: { en: extractField(en, 'tagline'), fr: extractField(fr, 'tagline') },
			priceByLang: { en: Number(en.match(/price:\s*(\d+)/)?.[1]), fr: Number(fr.match(/price:\s*(\d+)/)?.[1]) },
		}),
	});
}

export async function getBlogEntries() {
	const gitLastmod = lastmodFromGit('apps/web/src/data/blog/posts.en.js');
	return getLocalizedEntries({
		enFile: resolve(WEB_ROOT, 'src', 'data', 'blog', 'posts.en.js'),
		frFile: resolve(WEB_ROOT, 'src', 'data', 'blog', 'posts.fr.js'),
		buildPath: (lang, slug) => `${STATIC_PATHS_BY_LANG[lang].blog}/${slug}`,
		extraFields: ({ en, fr }) => ({
			lastmod: extractField(en, 'dateModified') || gitLastmod,
			image: extractImgKey(en),
			imageCaption: extractField(en, 'title'),
			titleByLang: { en: extractField(en, 'title'), fr: extractField(fr, 'title') },
			descriptionByLang: { en: extractField(en, 'summary'), fr: extractField(fr, 'summary') },
			datePublished: extractField(en, 'datePublished'),
			dateModified: extractField(en, 'dateModified'),
		}),
	});
}

export async function getDestinationEntries() {
	const lastmod = lastmodFromGit('apps/web/src/data/destinations/en.js');
	return getLocalizedEntries({
		enFile: resolve(WEB_ROOT, 'src', 'data', 'destinations', 'en.js'),
		frFile: resolve(WEB_ROOT, 'src', 'data', 'destinations', 'fr.js'),
		buildPath: (lang, slug) => `${STATIC_PATHS_BY_LANG[lang].destinations}/${slug}`,
		extraFields: ({ en, fr }) => ({
			lastmod,
			image: extractImgKey(en),
			imageCaption: extractField(en, 'name'),
			titleByLang: { en: extractField(en, 'name'), fr: extractField(fr, 'name') },
			descriptionByLang: { en: extractField(en, 'summary'), fr: extractField(fr, 'summary') },
		}),
	});
}

// Airport content itself isn't translated (mostly proper nouns), but the
// /airport-transfers vs /transferts-aeroport prefix still needs to change per language.
export async function getAirportEntries() {
	const airportsDir = resolve(WEB_ROOT, 'src', 'data', 'airports');
	const files = await readdir(airportsDir);
	const airportFiles = files.filter((file) => file.endsWith('.js') && file !== 'index.js');
	const entries = [];

	for (const file of airportFiles) {
		const source = await readFile(resolve(airportsDir, file), 'utf8');
		const slug = extractField(source, 'slug');
		const lastmod = lastmodFromGit(`apps/web/src/data/airports/${file}`);
		if (slug) {
			entries.push({
				pathByLang: Object.fromEntries(SUPPORTED_LANGUAGES.map((lang) => [lang, `${AIRPORT_DETAIL_PREFIX[lang]}/${slug}`])),
				lastmod,
				slug,
				name: extractField(source, 'name'),
				city: extractField(source, 'city'),
				code: extractField(source, 'code'),
				image: extractImgKey(source),
			});
		}
	}

	return entries;
}

// Resolves an IMG.<key> reference (e.g. "luxCamp") to a stable, crawlable URL,
// copying the source file into public/images/ under its descriptive name (a
// parallel static copy solely for crawlers — the app itself renders the
// Vite-hashed build asset, not this one).
//
// Two hops are needed because the IMG key and the underlying import identifier
// don't always match (IMG.luxCamp -> `luxcamp` -> luxury-desert-camp-morocco.webp).
let filenameByImgKeyPromise = null;

async function loadImageFilenameMap() {
	if (!filenameByImgKeyPromise) {
		filenameByImgKeyPromise = (async () => {
			const imagesSource = await readFile(resolve(IMGS_DIR, 'images.js'), 'utf8');
			const dataSource = await readFile(resolve(WEB_ROOT, 'src', 'data', 'images.js'), 'utf8');

			// `import luxcamp from './luxury-desert-camp-morocco.webp'`
			const fileByIdentifier = new Map(
				[...imagesSource.matchAll(/import\s+([A-Za-z0-9_$]+)\s+from\s+'\.\/([^']+)'/g)].map((m) => [m[1], m[2]])
			);
			// `luxCamp: images.luxcamp,`
			return new Map(
				[...dataSource.matchAll(/^\t([A-Za-z0-9_$]+):\s*images\.([A-Za-z0-9_$]+),/gm)]
					.map(([, imgKey, identifier]) => [imgKey, fileByIdentifier.get(identifier)])
					.filter(([, fileName]) => Boolean(fileName))
			);
		})();
	}
	return filenameByImgKeyPromise;
}

const publicImageUrlCache = new Map();

export async function resolveStableImageUrl(imgKey, publicDir) {
	if (!imgKey) return null;
	const cacheKey = `${publicDir}::${imgKey}`;
	if (publicImageUrlCache.has(cacheKey)) return publicImageUrlCache.get(cacheKey);

	try {
		const fileName = (await loadImageFilenameMap()).get(imgKey);
		if (!fileName) return null;

		const destDir = resolve(publicDir, 'images');
		await mkdir(destDir, { recursive: true });
		await copyFile(resolve(IMGS_DIR, fileName), resolve(destDir, fileName));

		const url = `/images/${fileName}`;
		publicImageUrlCache.set(cacheKey, url);
		return url;
	} catch {
		return null;
	}
}

// Extracts an `export const NAME = { ... };` single-object block from an
// editorial/services/categories source file (as opposed to parseBlocks, which
// is for an array of `{ ... }` entries).
export function extractNamedExportBlock(source, exportName) {
	const match = source.match(new RegExp(`export const ${exportName} = (\\{[\\s\\S]*?\\n\\});`));
	return match?.[1] || null;
}

export { AIRPORT_DETAIL_PREFIX, IMGS_DIR, STATIC_PATHS_BY_LANG, TOUR_DETAIL_PREFIX, WEB_ROOT };
