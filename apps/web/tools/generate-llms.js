import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Same real content sources as generate-sitemap.mjs — no separate/duplicated
// data entry, and no invented copy: every line here is a real title/summary
// already in src/data/**, just reformatted per the llms.txt convention
// (llmstxt.org): H1 site name, a blockquote summary, then H2-grouped links.
import { toAbsoluteUrl } from '../src/seo/sitemap.js';
import { SITE_BRAND } from '../src/data/site-config.js';
import { getAirportEntries, getBlogEntries, getDestinationEntries, getTourEntries } from './lib/content-entries.mjs';

const PUBLIC_DIR = resolve(process.cwd(), 'public');

function linkLine(title, path) {
	return `- [${title}](${toAbsoluteUrl(path, 'en')})`;
}

function section(heading, lines) {
	if (lines.length === 0) return '';
	return `## ${heading}\n\n${lines.join('\n')}\n`;
}

const tourEntries = await getTourEntries();
const destinationEntries = await getDestinationEntries();
const blogEntries = await getBlogEntries();
const airportEntries = await getAirportEntries();

const tourLines = tourEntries.map((entry) => linkLine(entry.titleByLang.en, entry.pathByLang.en));
const destinationLines = destinationEntries.map((entry) => linkLine(entry.titleByLang.en, entry.pathByLang.en));
const blogLines = blogEntries.map((entry) => linkLine(entry.titleByLang.en, entry.pathByLang.en));
const airportLines = airportEntries.map((entry) => linkLine(`${entry.name} transfer`, entry.pathByLang.en));

const sections = [
	section('Tours', tourLines),
	section('Destinations', destinationLines),
	section('Airport Transfers', airportLines),
	section('Blog', blogLines),
].filter(Boolean);

const content = `# ${SITE_BRAND.name}

> ${SITE_BRAND.seoDescription}

Bilingual site (English/French) — French versions of every page below are linked from the page itself via the language switcher, at the equivalent /fr/ path.

${sections.join('\n')}
`;

await mkdir(PUBLIC_DIR, { recursive: true });
await writeFile(resolve(PUBLIC_DIR, 'llms.txt'), content, 'utf8');

console.log(
	`[build] Wrote llms.txt (${tourEntries.length} tours, ${destinationEntries.length} destinations, ${airportEntries.length} airports, ${blogEntries.length} blog posts).`
);
