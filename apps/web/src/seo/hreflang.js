import { SEO_CONFIG } from './seo.config';
import { toAlternatePath } from './sitemap';
import { SUPPORTED_LANGUAGES, absoluteUrl, normalizePath } from './utils';

/**
 * Resolves the absolute URL of this page in every supported language.
 *
 * `alternateUrls` is an optional `{ en, fr }` map, supplied by pages whose slug
 * is itself translated (tours, destinations, blog posts). When omitted, the
 * alternate is resolved through the localized route table rather than by reusing
 * the current path — `/fr/a-propos` must point at `/en/about`, not `/en/a-propos`.
 */
export function buildAlternateUrls({ lang, path = '/', alternateUrls } = {}) {
	const cleanPath = normalizePath(path);
	return Object.fromEntries(
		SUPPORTED_LANGUAGES.map((code) => [
			code,
			absoluteUrl(alternateUrls?.[code] || toAlternatePath(cleanPath, lang, code), code),
		])
	);
}

/**
 * `<link rel="alternate">` descriptors, including the self-referencing entry
 * (required by Google) and `x-default`.
 */
export function buildHreflangLinks({ lang, path = '/', alternateUrls } = {}) {
	const resolved = buildAlternateUrls({ lang, path, alternateUrls });
	const links = SUPPORTED_LANGUAGES.map((code) => ({ hrefLang: code, href: resolved[code] }));
	const xDefault = resolved[SEO_CONFIG.xDefaultLanguage];

	return xDefault ? [...links, { hrefLang: 'x-default', href: xDefault }] : links;
}
