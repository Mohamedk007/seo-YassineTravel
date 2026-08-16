// Relative imports only (no `@/` alias, no image imports) — this file sits on
// the dependency path of buildSeoHead() in ./head.js, which tools/prerender.mjs
// runs directly under plain Node, without a bundler to resolve `@/` or assets.
import { SITE_BRAND } from '../data/site-config.js';
import { DEFAULT_LANGUAGE, SITE_ORIGIN, SUPPORTED_LANGUAGES, resolveLanguage } from './sitemap.js';

/**
 * Per-language SEO defaults. Every page falls back to these, so a page that
 * supplies nothing still gets a correct, localized title/description pair.
 */
export const SEO_DEFAULTS_BY_LANG = {
	en: {
		htmlLang: 'en',
		ogLocale: 'en_US',
		title: SITE_BRAND.seoTitle,
		titleSuffix: SITE_BRAND.seoTitleSuffix,
		description: SITE_BRAND.seoDescription,
		imageAlt: 'Sahara desert dunes at sunset on a private Morocco tour',
	},
	fr: {
		htmlLang: 'fr',
		ogLocale: 'fr_FR',
		title: `${SITE_BRAND.name} - Circuits privés de luxe au Maroc`,
		titleSuffix: SITE_BRAND.seoTitleSuffix,
		description:
			'Circuits privés de luxe sur mesure au Maroc - désert du Sahara, villes impériales, riads cinq étoiles. La confiance des voyageurs francophones depuis 2008.',
		imageAlt: 'Dunes du Sahara au coucher du soleil lors d’un circuit privé au Maroc',
	},
};

export const SEO_CONFIG = {
	origin: SITE_ORIGIN,
	siteName: SITE_BRAND.name,
	defaultLanguage: DEFAULT_LANGUAGE,
	supportedLanguages: SUPPORTED_LANGUAGES,
	// Language used for the `x-default` alternate.
	xDefaultLanguage: DEFAULT_LANGUAGE,
	// A stable, non-hashed copy under /public/images (produced by
	// tools/generate-sitemap.mjs), not the Vite-hashed IMG.duneSunset import.
	// og:image/twitter:image get cached by crawlers for a long time; pointing at
	// a hashed client asset would 404 the moment that hash changes on a rebuild.
	defaultImage: '/images/sahara-desert-dunes-sunset-morocco.webp',
	// The brand mark itself (not a share photo) — used for Organization.logo in
	// JSON-LD, which Google surfaces in the Knowledge Panel and search result
	// branding. A stable, non-hashed copy under /public/images, same reasoning
	// as defaultImage above.
	logoImage: '/images/yassine-travel-logo.jpg',
	// Google truncates well before these; they exist to catch outliers, not to
	// clip every title.
	titleMaxLength: 65,
	descriptionMaxLength: 165,
	twitter: {
		card: 'summary_large_image',
		// No verified brand handle yet — the tags are simply omitted rather than
		// pointing at an account we do not own.
		site: null,
		creator: null,
	},
};

/** OG locale codes for the *other* languages, emitted as og:locale:alternate. */
export function getAlternateOgLocales(lang) {
	const current = resolveLanguage(lang);
	return SUPPORTED_LANGUAGES.filter((code) => code !== current).map(
		(code) => SEO_DEFAULTS_BY_LANG[code]?.ogLocale
	).filter(Boolean);
}

export function getSeoDefaults(lang) {
	return SEO_DEFAULTS_BY_LANG[resolveLanguage(lang)];
}

export default SEO_CONFIG;
