import { buildCanonicalUrl, stripQueryAndHash } from './canonical.js';
import { buildHreflangLinks } from './hreflang.js';
import { buildOpenGraphTags } from './openGraph.js';
import { buildTwitterTags } from './twitter.js';
import { buildRobotsContent } from './robots.js';
import { buildBreadcrumbTrail } from './breadcrumbs.js';
import { buildDefaultSchemas } from './schema.js';
import { SEO_CONFIG, getSeoDefaults } from './seo.config.js';
import { toArray, truncate } from './utils.js';

/**
 * Builds the final `<title>`: a page title is suffixed with the brand, and a
 * page with no title of its own falls back to the localized site title.
 */
function resolveTitle(title, defaults) {
	const full = title ? `${title} | ${defaults.titleSuffix}` : defaults.title;
	return truncate(full, SEO_CONFIG.titleMaxLength);
}

/**
 * Computes every tag <Seo /> renders, as plain data — no React, no Vite alias
 * or asset imports anywhere on this function's dependency path (see the
 * "relative imports only" notes in seo.config.js/schema.js/data/site-config.js).
 *
 * That constraint exists so tools/prerender.mjs can call this exact function
 * under plain Node at build time and get byte-for-byte the same tags the
 * client renders, instead of a second, drifting implementation.
 */
export function buildSeoHead({
	lang,
	path = '/',
	title,
	description,
	canonical,
	image,
	type = 'website',
	noindex = false,
	nofollow = false,
	breadcrumbItems,
	structuredData,
	pageType = 'WebPage',
	imageAlt,
	alternateUrls,
	// Optional SpeakableSpecification (see buildSpeakableSchema in schema.js) —
	// attached to the page's primary WebPage node for voice/AI-answer engines.
	speakable,
} = {}) {
	const defaults = getSeoDefaults(lang);
	const cleanPath = stripQueryAndHash(path);

	const fullTitle = resolveTitle(title, defaults);
	const metaDescription = truncate(description || defaults.description, SEO_CONFIG.descriptionMaxLength);
	const canonicalUrl = buildCanonicalUrl({ lang, path: cleanPath, canonical });
	// Listing a noindex URL in hreflang only earns "no-index page in hreflang"
	// warnings in Search Console, so the alternates are dropped for those pages.
	const hreflangLinks = noindex ? [] : buildHreflangLinks({ lang, path: cleanPath, alternateUrls });
	const shareImage = image || SEO_CONFIG.defaultImage;

	const trail = buildBreadcrumbTrail(lang, breadcrumbItems || []);
	const pageSchemas = toArray(structuredData);
	const schemas = [
		...buildDefaultSchemas({
			title: fullTitle,
			description: metaDescription,
			url: canonicalUrl,
			image: shareImage,
			pageType,
			lang,
			breadcrumbItems: trail,
			existingTypes: pageSchemas.map((schema) => schema?.['@type']).filter(Boolean),
			speakable,
		}),
		...pageSchemas,
	];

	const openGraphTags = buildOpenGraphTags({
		title: fullTitle,
		description: metaDescription,
		url: canonicalUrl,
		image: shareImage,
		type,
		lang,
		imageAlt,
	});
	const twitterTags = buildTwitterTags({
		title: fullTitle,
		description: metaDescription,
		image: shareImage,
		lang,
		imageAlt,
	});
	const robotsContent = buildRobotsContent({ noindex, nofollow });

	return {
		htmlLang: defaults.htmlLang,
		title: fullTitle,
		description: metaDescription,
		canonicalUrl,
		hreflangLinks,
		shareImage,
		openGraphTags,
		twitterTags,
		robotsContent,
		schemas,
	};
}
