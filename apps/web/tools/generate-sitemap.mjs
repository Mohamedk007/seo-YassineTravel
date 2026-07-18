import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { ROUTE_PATHS } from '../src/data/route-config.js';

const BASE_URL = 'https://moroccotripholidays.com';
// Kept as a local constant (rather than importing src/i18n/config.js) so this
// Node build script doesn't depend on browser-only runtime modules.
// Keep in sync with SUPPORTED_LANGUAGES in src/i18n/config.js.
const SUPPORTED_LANGUAGES = ['en', 'fr'];
const DEFAULT_LANGUAGE = 'en';

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

function getStaticPaths() {
	return Object.values(ROUTE_PATHS).filter((path) => !path.includes(':'));
}

async function getTourPaths() {
	const catalogPath = resolve(process.cwd(), 'src', 'data', 'tours', 'catalog.js');
	const source = await readFile(catalogPath, 'utf8');
	const slugs = [...source.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
	return slugs.map((slug) => `/tour/${slug}`);
}

function slugify(input = '') {
	return String(input)
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}

async function getBlogPaths() {
	const blogPostsPath = resolve(process.cwd(), 'src', 'data', 'blog', 'posts.js');
	const source = await readFile(blogPostsPath, 'utf8');
	// Titles containing an apostrophe are written with double quotes in source
	// (e.g. "A food lover's journey through Morocco"), so both quote styles must be matched.
	const blogTitles = [...source.matchAll(/title:\s*(['"])((?:(?!\1).)+)\1/g)].map((match) => match[2]);
	return blogTitles.map((title) => `/blog/${slugify(title)}`);
}

async function getDestinationPaths() {
	const destinationPath = resolve(process.cwd(), 'src', 'data', 'destinations', 'index.js');
	const source = await readFile(destinationPath, 'utf8');
	const names = [...source.matchAll(/name:\s*'([^']+)'/g)].map((match) => match[1]);
	return names.map((name) => `/destinations/${slugify(name)}`);
}

async function getAirportPaths() {
	const airportsDir = resolve(process.cwd(), 'src', 'data', 'airports');
	const files = await readdir(airportsDir);
	const airportFiles = files.filter((file) => file.endsWith('.js') && file !== 'index.js');
	const slugs = [];

	for (const file of airportFiles) {
		const source = await readFile(resolve(airportsDir, file), 'utf8');
		const matches = [...source.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
		slugs.push(...matches);
	}

	return slugs.map((slug) => `/airport-transfers/${slug}`);
}

function buildSitemapXml(paths) {
	const uniquePaths = [...new Set(paths)];
	const urls = uniquePaths
		.flatMap((path) =>
			SUPPORTED_LANGUAGES.map((lang) => {
				const alternates = SUPPORTED_LANGUAGES.map(
					(altLang) => `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${escapeXml(toAbsoluteUrl(path, altLang))}" />`
				).join('\n');
				const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(toAbsoluteUrl(path, DEFAULT_LANGUAGE))}" />`;
				return `  <url>\n    <loc>${escapeXml(toAbsoluteUrl(path, lang))}</loc>\n${alternates}\n${xDefault}\n  </url>`;
			})
		)
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
}

const outputPath = resolve(process.cwd(), 'public', 'sitemap.xml');
const tourPaths = await getTourPaths();
const blogPaths = await getBlogPaths();
const destinationPaths = await getDestinationPaths();
const airportPaths = await getAirportPaths();
const sitemapXml = buildSitemapXml([...getStaticPaths(), ...tourPaths, ...blogPaths, ...destinationPaths, ...airportPaths]);

await mkdir(resolve(process.cwd(), 'public'), { recursive: true });
await writeFile(outputPath, sitemapXml, 'utf8');

console.log(`[build] Generated sitemap at ${outputPath}`);