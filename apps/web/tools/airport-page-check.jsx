/**
 * Verification harness for the expanded airport transfer pages: renders each
 * one via renderToString (like seo-check.jsx) and checks word count, heading
 * hierarchy, and JSON-LD (validity + no duplicate @type nodes).
 *
 * Not part of the app build — run manually with:
 *   npx vite build --ssr tools/airport-page-check.jsx -c tools/seo-check.vite.config.js --logLevel error && node ../../dist/seo-check/airport-page-check.js
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LocaleProvider } from '@/i18n/LocaleContext';
import { AIRPORTS } from '@/data/airports';
import { getPath } from '@/data/route-config';
import AirportTransferDetailPage from '@/pages/AirportTransferDetailPage';

const consoleError = console.error;
console.error = (...args) => {
	if (typeof args[0] === 'string' && args[0].includes('useLayoutEffect does nothing on the server')) return;
	consoleError(...args);
};

function renderAirportPage(lang, slug) {
	const helmetContext = {};
	const path = getPath('airportTransferDetail', lang, { slug });
	const html = renderToString(
		<HelmetProvider context={helmetContext}>
			<LocaleProvider lang={lang}>
				<MemoryRouter initialEntries={[path]}>
					<Routes>
						<Route path={path.replace(slug, ':slug')} element={<AirportTransferDetailPage />} />
					</Routes>
				</MemoryRouter>
			</LocaleProvider>
		</HelmetProvider>
	);
	// prioritizeSeoTags (set by <Seo>) moves canonical/OG/robots/JSON-LD into
	// `helmet.priority`, not `helmet.script` — same gotcha as in seo-check.jsx.
	const scripts = helmetContext.helmet.priority.toString() + helmetContext.helmet.script.toString();
	return { html, scripts };
}

function countWords(html) {
	const text = html
		.replace(/<script[\s\S]*?<\/script>/g, ' ')
		.replace(/<style[\s\S]*?<\/style>/g, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/&[a-z]+;/gi, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	return text.length === 0 ? 0 : text.split(' ').length;
}

function countH1(html) {
	return (html.match(/<h1[\s>]/g) || []).length;
}

let failures = 0;

for (const lang of ['en', 'fr']) {
	for (const airport of AIRPORTS) {
		const { html, scripts } = renderAirportPage(lang, airport.slug);
		const words = countWords(html);
		const h1Count = countH1(html);

		const scriptMatches = [...scripts.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/g)];
		const parsed = scriptMatches.map((m) => JSON.parse(m[1]));
		const types = parsed.map((entry) => entry['@type']);
		// Several distinct nodes legitimately share one @type (multiple Review
		// entries, multiple ListItem entries inside one ItemList) — that's not a
		// duplicate. A real duplicate is the exact same node (by content) twice.
		const contentCounts = new Map();
		parsed.forEach((entry) => {
			const key = JSON.stringify(entry);
			contentCounts.set(key, (contentCounts.get(key) || 0) + 1);
		});
		const duplicateContent = [...contentCounts.entries()].filter(([, count]) => count > 1);
		// A page describing itself once is fine; the same @type used for the page's
		// OWN entity twice (e.g. two "WebPage" or two "Service" nodes both
		// describing this URL) would be a genuine duplicate-schema bug, distinct
		// from a legitimate list of several same-typed child entities.
		const singletonTypes = ['WebPage', 'Service', 'AboutPage', 'ContactPage', 'CollectionPage', 'FAQPage', 'BlogPosting', 'TouristTrip', 'TouristDestination'];
		const typeCounts = types.reduce((acc, t) => ({ ...acc, [t]: (acc[t] || 0) + 1 }), {});
		const duplicateSingletons = Object.entries(typeCounts).filter(([t, count]) => singletonTypes.includes(t) && count > 1);

		const issues = [];
		if (words < 2500) issues.push(`only ${words} words (target 2500-3500)`);
		if (h1Count !== 1) issues.push(`${h1Count} H1 tags (expected exactly 1)`);
		if (duplicateContent.length > 0) issues.push(`identical schema node repeated: ${duplicateContent.map(([, c]) => `x${c}`).join(', ')}`);
		if (duplicateSingletons.length > 0) issues.push(`duplicate singleton schema: ${duplicateSingletons.map(([t, c]) => `${t}x${c}`).join(', ')}`);

		const serviceNode = parsed.find((entry) => entry['@type'] === 'Service');
		const nested = serviceNode
			? `hasOfferCatalog=${Boolean(serviceNode.hasOfferCatalog)} availableChannel=${Boolean(serviceNode.availableChannel)}`
			: 'no Service node';
		const speakableNode = parsed.find((entry) => entry.speakable);

		const label = `${lang}/${airport.slug}`.padEnd(20);
		if (issues.length === 0) {
			console.log(`  ok   ${label} words=${words} h1=${h1Count} schemas=${parsed.length} | ${nested} speakable=${Boolean(speakableNode)}`);
		} else {
			failures += 1;
			console.error(`  FAIL ${label} ${issues.join('; ')}`);
		}
	}
}

if (failures > 0) {
	console.error(`\n[airport-page-check] ${failures} check(s) failed.`);
	process.exit(1);
}
console.log('\n[airport-page-check] all checks passed.');
