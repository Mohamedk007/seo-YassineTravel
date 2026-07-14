import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { IMG } from '@/data/site';

const SITE_ORIGIN = 'https://moroccotripholidays.com';
const DEFAULT_TITLE = 'Morocco Trip Holidays — Luxury Private Morocco Tours';
const DEFAULT_DESCRIPTION = 'Bespoke luxury private tours of Morocco — Sahara desert, imperial cities, five-star riads. Trusted by travellers from the US, UK, Canada & Australia.';

function buildCanonicalUrl(pathname) {
	return new URL(pathname || '/', SITE_ORIGIN).toString();
}

export function Seo({ title, description, canonical, image = IMG.duneSunset, type = 'website', noindex = false }) {
	const location = useLocation();
	const full = title ? `${title} | Morocco Trip Holidays` : DEFAULT_TITLE;
	const metaDescription = description || DEFAULT_DESCRIPTION;
	const canonicalUrl = canonical || buildCanonicalUrl(location.pathname);

	return (
		<Helmet prioritizeSeoTags>
			<title>{full}</title>
			<meta name="description" content={metaDescription} />
			<link rel="canonical" href={canonicalUrl} />
			<meta property="og:site_name" content="Morocco Trip Holidays" />
			<meta property="og:locale" content="en_US" />
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
	);
}