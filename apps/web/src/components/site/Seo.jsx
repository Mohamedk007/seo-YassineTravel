import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { IMG } from '@/data/images';
import { SITE_BRAND } from '@/data/site-config';
import { StructuredData } from '@/seo/StructuredData';
import { SUPPORTED_LANGUAGES } from '@/i18n/config';
import { useLocale } from '@/i18n/LocaleContext';
import {
	buildBreadcrumbSchema,
	buildLocalBusinessSchema,
	buildOrganizationSchema,
	buildTravelAgencySchema,
	buildWebPageSchema,
} from '@/seo/schemas';

const OG_LOCALES = { en: 'en_US', fr: 'fr_FR' };

function buildLocalizedUrl(lang, pathname) {
	// pathname here is basename-relative (e.g. "/blog/some-post"), so the
	// language segment must be re-added to get the real, publicly reachable URL.
	const cleanPath = pathname === '/' ? '' : pathname;
	return new URL(`/${lang}${cleanPath}`, SITE_BRAND.origin).toString();
}

export function Seo({
	title,
	description,
	canonical,
	image = IMG.duneSunset,
	type = 'website',
	noindex = false,
	breadcrumbItems,
	structuredData,
	pageType = 'WebPage',
	preloadImage = false,
}) {
	const location = useLocation();
	const lang = useLocale();
	const full = title ? `${title} | ${SITE_BRAND.seoTitleSuffix}` : SITE_BRAND.seoTitle;
	const metaDescription = description || SITE_BRAND.seoDescription;
	const canonicalUrl = canonical || buildLocalizedUrl(lang, location.pathname);
	const defaultSchemas = [
		buildOrganizationSchema(),
		buildTravelAgencySchema(),
		buildLocalBusinessSchema(),
		buildWebPageSchema({
			title: full,
			description: metaDescription,
			url: canonicalUrl,
			image,
			pageType,
		}),
		buildBreadcrumbSchema(breadcrumbItems),
	].filter(Boolean);
	const extraSchemas = structuredData
		? Array.isArray(structuredData)
			? structuredData.filter(Boolean)
			: [structuredData].filter(Boolean)
		: [];
	const allSchemas = [...defaultSchemas, ...extraSchemas];

	return (
		<>
			<Helmet prioritizeSeoTags htmlAttributes={{ lang }}>
				<title>{full}</title>
				{preloadImage ? <link rel="preload" as="image" href={image} /> : null}
				<meta name="description" content={metaDescription} />
				<link rel="canonical" href={canonicalUrl} />
				{SUPPORTED_LANGUAGES.map((code) => (
					<link key={code} rel="alternate" hrefLang={code} href={buildLocalizedUrl(code, location.pathname)} />
				))}
				<link rel="alternate" hrefLang="x-default" href={buildLocalizedUrl(SUPPORTED_LANGUAGES[0], location.pathname)} />
				<meta property="og:site_name" content={SITE_BRAND.name} />
				<meta property="og:locale" content={OG_LOCALES[lang] || SITE_BRAND.locale} />
				<meta property="og:type" content={type} />
				<meta property="og:url" content={canonicalUrl} />
				<meta property="og:title" content={full} />
				<meta property="og:description" content={metaDescription} />
				<meta property="og:image" content={image} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={full} />
				<meta name="twitter:description" content={metaDescription} />
				<meta name="twitter:image" content={image} />
				{noindex ? <meta name="robots" content="noindex,nofollow" /> : null}
			</Helmet>
			<StructuredData data={allSchemas} />
		</>
	);
}