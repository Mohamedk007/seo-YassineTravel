/**
 * SEO smoke test: renders <Seo /> for representative routes and asserts the head
 * tags it produces.
 *
 * This exists because the failure mode it guards against is silent — react-helmet
 * drops tags it doesn't recognise without warning, and a wrong hreflang target is
 * a valid-looking URL. Neither shows up in a build or a lint.
 *
 * Run with: npm run seo:check --prefix apps/web
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LocaleProvider } from '@/i18n/LocaleContext';
import { Seo } from '@/seo/Seo';
import { getPath } from '@/data/route-config';
import { buildTourSchema } from '@/seo/schemas';

// react-router's MemoryRouter warns about useLayoutEffect under renderToString.
// Irrelevant here — nothing is hydrated, only the head tags are inspected.
const consoleError = console.error;
console.error = (...args) => {
	if (typeof args[0] === 'string' && args[0].includes('useLayoutEffect does nothing on the server')) return;
	consoleError(...args);
};

function renderHead(lang, path, props) {
	const helmetContext = {};
	renderToString(
		<HelmetProvider context={helmetContext}>
			<LocaleProvider lang={lang}>
				<MemoryRouter initialEntries={[path]}>
					<Seo {...props} />
				</MemoryRouter>
			</LocaleProvider>
		</HelmetProvider>
	);
	const { helmet } = helmetContext;
	// prioritizeSeoTags moves canonical/hreflang/og/robots/JSON-LD into `priority`.
	return ['priority', 'title', 'meta', 'link', 'script']
		.map((key) => helmet[key]?.toString() || '')
		.join('\n');
}

const TOUR_FR = getPath('tourDetail', 'fr', { slug: 'villes-imperiales-et-sahara-de-luxe' });
const TOUR_EN = getPath('tourDetail', 'en', { slug: 'imperial-cities-sahara' });

const CASES = [
	{
		name: 'EN home',
		lang: 'en',
		path: '/',
		props: { breadcrumbItems: [{ routeKey: 'home' }] },
		expect: [
			'<title data-rh="true">Morocco Trip Holidays - Luxury Private Morocco Tours</title>',
			'rel="canonical" href="https://moroccotripholidays.com/en"',
			'hrefLang="fr" href="https://moroccotripholidays.com/fr"',
			'"@type":"BreadcrumbList"',
			'"name":"Home"',
		],
	},
	{
		name: 'FR content page with a translated slug',
		lang: 'fr',
		path: '/a-propos',
		props: { title: 'Une famille de conteurs marocains', breadcrumbItems: [{ routeKey: 'home' }, { routeKey: 'about' }] },
		expect: [
			'rel="canonical" href="https://moroccotripholidays.com/fr/a-propos"',
			// The English alternate must be /en/about, never /en/a-propos.
			'hrefLang="en" href="https://moroccotripholidays.com/en/about"',
			'hrefLang="x-default" href="https://moroccotripholidays.com/en/about"',
			'property="og:locale" content="fr_FR"',
			'"name":"Accueil"',
			'"item":"https://moroccotripholidays.com/fr/a-propos"',
		],
		reject: ['/en/a-propos'],
	},
	{
		name: 'FR tour detail with explicit alternates',
		lang: 'fr',
		path: TOUR_FR,
		props: {
			title: 'Villes impériales et Sahara',
			description: 'Un circuit privé de 10 jours.',
			pageType: 'TouristTrip',
			type: 'article',
			breadcrumbItems: [{ routeKey: 'home' }, { routeKey: 'tours' }, { name: 'Villes impériales et Sahara', path: TOUR_FR }],
			alternateUrls: { en: TOUR_EN, fr: TOUR_FR },
			structuredData: buildTourSchema(
				{ title: 'Villes impériales et Sahara', tagline: 'Un circuit privé de 10 jours.', price: 2890, slug: 'villes-imperiales-et-sahara-de-luxe' },
				TOUR_FR,
				'fr'
			),
		},
		expect: [
			`hrefLang="en" href="https://moroccotripholidays.com${'/en'}${TOUR_EN}"`,
			'property="og:type" content="article"',
			'"@type":"Offer"',
			'"item":"https://moroccotripholidays.com/fr/circuits"',
		],
	},
	{
		name: 'FR 404 (noindex)',
		lang: 'fr',
		path: '/404',
		props: { title: 'Page introuvable', noindex: true, breadcrumbItems: [{ routeKey: 'home' }, { routeKey: 'notFound', path: '/404' }] },
		expect: ['name="robots" content="noindex, follow"'],
		// A noindex URL must not be advertised through hreflang.
		reject: ['rel="alternate"'],
	},
];

let failures = 0;

for (const testCase of CASES) {
	const head = renderHead(testCase.lang, testCase.path, testCase.props);
	const missing = testCase.expect.filter((needle) => !head.includes(needle));
	const present = (testCase.reject || []).filter((needle) => head.includes(needle));

	if (missing.length === 0 && present.length === 0) {
		console.log(`  ok   ${testCase.name}`);
		continue;
	}

	failures += 1;
	console.error(`  FAIL ${testCase.name}`);
	missing.forEach((needle) => console.error(`         missing: ${needle}`));
	present.forEach((needle) => console.error(`         should not be present: ${needle}`));
}

// Every page must carry the identity graph and a canonical.
for (const required of ['"@type":"Organization"', '"@type":"WebSite"', 'rel="canonical"']) {
	const head = renderHead('en', '/', { breadcrumbItems: [{ routeKey: 'home' }] });
	if (!head.includes(required)) {
		failures += 1;
		console.error(`  FAIL baseline: missing ${required}`);
	}
}

if (failures > 0) {
	console.error(`\n[seo:check] ${failures} check(s) failed.`);
	process.exit(1);
}
console.log('\n[seo:check] all checks passed.');
