import { IMG } from '@/data/images';
import { SITE_BRAND } from '@/data/site-config';
import { DEFAULT_LANGUAGE, SITE_ORIGIN, SUPPORTED_LANGUAGES, resolveLanguage } from './sitemap';

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
		title: 'Morocco Trip Holidays - Circuits privés de luxe au Maroc',
		titleSuffix: SITE_BRAND.seoTitleSuffix,
		description:
			'Circuits privés de luxe sur mesure au Maroc - désert du Sahara, villes impériales, riads cinq étoiles. La confiance des voyageurs francophones depuis 2011.',
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
	defaultImage: IMG.duneSunset,
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
