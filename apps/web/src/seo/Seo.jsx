import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLocale } from '@/i18n/LocaleContext';
import { StructuredData } from './StructuredData';
import { stripQueryAndHash } from './canonical';
import { buildSeoHead } from './head';
import { assetUrl } from './utils';

/**
 * The single place every page's metadata is generated.
 *
 * Pages supply content (title, description, image, breadcrumbs, page-specific
 * JSON-LD); canonical, hreflang, Open Graph, Twitter Cards, robots, locale and
 * the baseline schema graph are all derived by buildSeoHead() (./head.js) so no
 * page repeats that logic — and so the build-time prerender step (which calls
 * buildSeoHead() directly, without React) produces identical tags.
 */
export function Seo(props) {
	const location = useLocation();
	const lang = useLocale();
	// react-router runs under a `/:lang` basename, so `location.pathname` here is
	// basename-relative; the language segment is re-added inside buildSeoHead.
	const path = stripQueryAndHash(location.pathname);
	const head = buildSeoHead({ ...props, lang, path });

	return (
		<>
			<Helmet prioritizeSeoTags htmlAttributes={{ lang: head.htmlLang }}>
				<title>{head.title}</title>
				<meta name="description" content={head.description} />
				<meta name="robots" content={head.robotsContent} />
				<link rel="canonical" href={head.canonicalUrl} />
				{head.hreflangLinks.map((link) => (
					<link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
				))}
				{props.preloadImage && assetUrl(head.shareImage) ? <link rel="preload" as="image" href={head.shareImage} /> : null}
				{head.openGraphTags.map((tag) => (
					<meta key={`${tag.property}:${tag.content}`} property={tag.property} content={tag.content} />
				))}
				{head.twitterTags.map((tag) => (
					<meta key={tag.name} name={tag.name} content={tag.content} />
				))}
			</Helmet>
			<StructuredData data={head.schemas} />
		</>
	);
}

export default Seo;
