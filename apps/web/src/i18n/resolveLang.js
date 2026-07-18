import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './config';

/**
 * Splits "/fr/blog/some-post" into { lang: 'fr', rest: '/blog/some-post' }.
 * Returns lang: null when the first segment isn't a supported language code,
 * so the caller can redirect to a language-prefixed URL.
 */
export function resolveLang(pathname) {
	const segments = pathname.split('/').filter(Boolean);
	const candidate = segments[0];

	if (SUPPORTED_LANGUAGES.includes(candidate)) {
		return { lang: candidate, rest: '/' + segments.slice(1).join('/') };
	}

	return { lang: null, rest: pathname };
}

export function defaultLanguage() {
	return DEFAULT_LANGUAGE;
}
