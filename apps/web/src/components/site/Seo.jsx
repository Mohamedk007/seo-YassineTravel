import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { IMG } from '@/data/images';
import { SITE_BRAND } from '@/data/site-config';
import { StructuredData } from '@/seo/StructuredData';
import {
	buildBreadcrumbSchema,
	buildLocalBusinessSchema,
	buildOrganizationSchema,
	buildTravelAgencySchema,
	buildWebPageSchema,
} from '@/seo/schemas';

function buildCanonicalUrl(pathname) {
	return new URL(pathname || '/', SITE_BRAND.origin).toString();
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
	const full = title ? `${title} | ${SITE_BRAND.seoTitleSuffix}` : SITE_BRAND.seoTitle;
	const metaDescription = description || SITE_BRAND.seoDescription;
	const canonicalUrl = canonical || buildCanonicalUrl(location.pathname);
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
			<Helmet prioritizeSeoTags>
				<title>{full}</title>
				{preloadImage ? <link rel="preload" as="image" href={image} /> : null}
				<meta name="description" content={metaDescription} />
				<link rel="canonical" href={canonicalUrl} />
				<meta property="og:site_name" content={SITE_BRAND.name} />
				<meta property="og:locale" content={SITE_BRAND.locale} />
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