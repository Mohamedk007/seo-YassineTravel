import {
	DEFAULT_LANGUAGE,
	SITE_ORIGIN,
	SUPPORTED_LANGUAGES,
	getRoutePathTable,
	resolveLanguage,
	toAbsoluteUrl,
	toLocalizedPath,
} from './sitemap';

export { DEFAULT_LANGUAGE, SITE_ORIGIN, SUPPORTED_LANGUAGES, getRoutePathTable, resolveLanguage, toLocalizedPath };

export function isAbsoluteUrl(value) {
	return typeof value === 'string' && /^(https?:)?\/\//i.test(value);
}

/** Guarantees a leading slash and drops any trailing slash (except for root). */
export function normalizePath(pathname = '/') {
	if (!pathname) return '/';
	const withSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
	return withSlash.length > 1 ? withSlash.replace(/\/+$/, '') : '/';
}

/**
 * Absolute, language-prefixed URL for an in-app path.
 * Values that are already absolute are returned untouched, so callers can mix
 * pre-resolved URLs (e.g. hreflang alternates) with plain paths.
 */
export function absoluteUrl(pathOrUrl = '/', lang = DEFAULT_LANGUAGE) {
	if (isAbsoluteUrl(pathOrUrl)) return pathOrUrl;
	try {
		return toAbsoluteUrl(normalizePath(pathOrUrl), lang);
	} catch {
		return SITE_ORIGIN;
	}
}

/**
 * Absolute URL for a static asset (image, file). Assets are not language
 * scoped, so unlike `absoluteUrl` no `/en` or `/fr` segment is added.
 */
export function assetUrl(pathOrUrl) {
	if (!pathOrUrl) return null;
	if (isAbsoluteUrl(pathOrUrl)) return pathOrUrl;
	try {
		return new URL(pathOrUrl, SITE_ORIGIN).toString();
	} catch {
		return null;
	}
}

/** Trims a description to `max` characters on a word boundary. */
export function truncate(text, max) {
	if (typeof text !== 'string' || text.length <= max) return text;
	const clipped = text.slice(0, max);
	const lastSpace = clipped.lastIndexOf(' ');
	return `${(lastSpace > max * 0.6 ? clipped.slice(0, lastSpace) : clipped).trimEnd()}…`;
}

/** Flattens a value that may be a single item, an array, or nullish. */
export function toArray(value) {
	if (!value) return [];
	return (Array.isArray(value) ? value : [value]).filter(Boolean);
}
