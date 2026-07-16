import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const sitemapScriptPath = resolve(process.cwd(), 'tools', 'generate-sitemap.mjs');
const scriptPath = resolve(process.cwd(), 'tools', 'generate-llms.js');

if (existsSync(sitemapScriptPath)) {
	await import(pathToFileURL(sitemapScriptPath).href);
} else {
	console.log('[build] Skipping missing tools/generate-sitemap.mjs');
}

if (!existsSync(scriptPath)) {
	console.log('[build] Skipping optional tools/generate-llms.js');
	process.exit(0);
}

await import(pathToFileURL(scriptPath).href);