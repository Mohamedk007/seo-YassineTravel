/**
 * Manual IndexNow submission — NOT run automatically by `npm run build`.
 * Notifies Bing/Yandex of every URL in the sitemap after a real production
 * deploy, so they don't have to wait for their own recrawl schedule.
 *
 * Requires the sitemap XML files to already exist (run `npm run build` or
 * `node tools/generate-sitemap.mjs` first) and public/<key>.txt to be live
 * at https://yassinetravel.com/<key>.txt — IndexNow verifies the key file
 * over HTTP before accepting a submission, so this only works after deploy,
 * not against a local build.
 *
 * Run with: node tools/submit-indexnow.js
 */
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { SITE_ORIGIN } from '../src/seo/sitemap.js';

const INDEXNOW_KEY = 'cd704209b753448281a444561376a493';
const PUBLIC_DIR = resolve(process.cwd(), 'public');

async function collectSitemapUrls() {
	const files = (await readdir(PUBLIC_DIR)).filter((file) => file.startsWith('sitemap-') && file.endsWith('.xml'));
	const urls = new Set();

	for (const file of files) {
		const xml = await readFile(resolve(PUBLIC_DIR, file), 'utf8');
		for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
			urls.add(match[1]);
		}
	}

	return [...urls];
}

const urlList = await collectSitemapUrls();
if (urlList.length === 0) {
	console.error('[indexnow] No sitemap URLs found — run `node tools/generate-sitemap.mjs` first.');
	process.exit(1);
}

const host = new URL(SITE_ORIGIN).host;
const response = await fetch('https://api.indexnow.org/indexnow', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json; charset=utf-8' },
	body: JSON.stringify({
		host,
		key: INDEXNOW_KEY,
		keyLocation: `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`,
		urlList,
	}),
});

if (!response.ok) {
	console.error(`[indexnow] Submission failed: ${response.status} ${response.statusText}`);
	process.exit(1);
}

console.log(`[indexnow] Submitted ${urlList.length} URLs (status ${response.status}).`);
