import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLocale } from '@/i18n/LocaleContext';
import { StructuredData } from './StructuredData';
import { buildCanonicalUrl, stripQueryAndHash } from './canonical';
import { buildHreflangLinks } from './hreflang';
import { buildOpenGraphTags } from './openGraph';
import { buildTwitterTags } from './twitter';
import { buildRobotsContent } from './robots';
import { buildBreadcrumbTrail } from './breadcrumbs';
import { buildDefaultSchemas } from './schema';
import { SEO_CONFIG, getSeoDefaults } from './seo.config';
import { assetUrl, toArray, truncate } from './utils';

/**
 * Builds the final `<title>`: a page title is suffixed with the brand, and a
 * page with no title of its own falls back to the localized site title.
 */
function resolveTitle(title, defaults) {
	const full = title ? `${title} | ${defaults.titleSuffix}` : defaults.title;
	return truncate(full, SEO_CONFIG.titleMaxLength);
}

/**
 * The single place every page's metadata is generated.
 *
 * Pages supply content (title, description, image, breadcrumbs, page-specific
 * JSON-LD); canonical, hreflang, Open Graph, Twitter Cards, robots, locale and
 * the baseline schema graph are all derived here so no page repeats that logic.
 */
export function Seo({
	title,
	description,
	canonical,
	image,
	type = 'website',
	noindex = false,
	nofollow = false,
	// `[{ routeKey }]` or `[{ name, path }]` — resolved to localized labels and
	// absolute URLs. Legacy `{ name, url }` items still work unchanged.
	breadcrumbItems,
	structuredData,
	pageType = 'WebPage',
	preloadImage = false,
	imageAlt,
	// Optional `{ en: '<url>', fr: '<url>' }` map for pages where each language
	// uses a different slug (blog / tour / destination detail pages). When
	// omitted, alternates are derived from the current path.
	alternateUrls,
}) {
	const location = useLocation();
	const lang = useLocale();
	const defaults = getSeoDefaults(lang);

	// react-router runs under a `/:lang` basename, so `location.pathname` here is
	// basename-relative; the language segment is re-added downstream.
	const path = stripQueryAndHash(location.pathname);

	const fullTitle = resolveTitle(title, defaults);
	const metaDescription = truncate(description || defaults.description, SEO_CONFIG.descriptionMaxLength);
	const canonicalUrl = buildCanonicalUrl({ lang, path, canonical });
	// Listing a noindex URL in hreflang only earns "no-index page in hreflang"
	// warnings in Search Console, so the alternates are dropped for those pages.
	const hreflangLinks = noindex ? [] : buildHreflangLinks({ lang, path, alternateUrls });
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

	return (
		<>
			<Helmet prioritizeSeoTags htmlAttributes={{ lang: defaults.htmlLang }}>
				<title>{fullTitle}</title>
				<meta name="description" content={metaDescription} />
				<meta name="robots" content={buildRobotsContent({ noindex, nofollow })} />
				<link rel="canonical" href={canonicalUrl} />
				{hreflangLinks.map((link) => (
					<link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
				))}
				{preloadImage && assetUrl(shareImage) ? <link rel="preload" as="image" href={shareImage} /> : null}
				{openGraphTags.map((tag) => (
					<meta key={`${tag.property}:${tag.content}`} property={tag.property} content={tag.content} />
				))}
				{twitterTags.map((tag) => (
					<meta key={tag.name} name={tag.name} content={tag.content} />
				))}
			</Helmet>
			<StructuredData data={schemas} />
		</>
	);
}

export default Seo;
