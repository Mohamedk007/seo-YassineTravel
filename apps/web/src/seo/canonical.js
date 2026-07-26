import { absoluteUrl, normalizePath } from './utils.js';

/**
 * Canonical URL for the current page.
 *
 * `path` is basename-relative (react-router runs under a `/:lang` basename), so
 * the language segment is re-added here — that is what makes the canonical the
 * real, publicly reachable URL rather than a localhost- or basename-relative one.
 * An explicit `canonical` (absolute or path) always wins.
 */
export function buildCanonicalUrl({ lang, path = '/', canonical } = {}) {
	return absoluteUrl(canonical || normalizePath(path), lang);
}

/**
 * Canonical for a page reachable under several paths (query strings, tracking
 * params, pagination): always points back at the clean, parameterless URL.
 */
export function stripQueryAndHash(pathname = '/') {
	return normalizePath(pathname.split('#')[0].split('?')[0]);
}
