// Relative import (not the `@/` alias) — this file is on buildSeoHead()'s
// dependency path (via seo.config.js), which tools/prerender.mjs runs directly
// under plain Node without a bundler to resolve `@/`.
import { DEFAULT_LANGUAGE } from '../seo/sitemap.js';
import { registerContent } from '../content/registry.js';
import { TRIPADVISOR } from './tripadvisor.js';

// Brand identity: name, origin, locale. These are not translated — a brand
// name stays the same across languages, and seoTitle/seoDescription here are
// only the English defaults consumed by src/seo/seo.config.js.
export const SITE_BRAND = {
	name: 'Yassine Travel',
	namePrimary: 'Yassine',
	nameAccent: 'Travel',
	origin: 'https://yassinetravel.com',
	seoTitle: 'Yassine Travel - Luxury Private Morocco Tours',
	seoDescription:
		'Bespoke luxury private tours of Morocco - Sahara desert, imperial cities, five-star riads. Trusted by travellers from the US, UK, Canada & Australia.',
	seoTitleSuffix: 'Yassine Travel',
	locale: 'en_US',
};

// Everything below is marketing copy that's actually visible in the UI, so it
// varies per language. Each dict is `{ en: {...}, fr: {...} }`; the flat
// exports at the bottom (English) are kept for any call site not yet updated
// to pass `lang`.

function resolve(dict, lang) {
	return dict[lang] || dict[DEFAULT_LANGUAGE];
}

// Computed on every call (not frozen into the dict at module load) so an
// admin edit to the TripAdvisor rating/count shows up immediately.
function formatReviewSummary(lang) {
	const rating = Number(TRIPADVISOR.rating).toFixed(1);
	return lang === 'fr'
		? `${rating.replace('.', ',')}/5 · ${TRIPADVISOR.reviewCount} avis`
		: `${rating}/5 · ${TRIPADVISOR.reviewCount} reviews`;
}

const NAVBAR_CONFIG_BY_LANG = {
	en: { desktopCtaLabel: 'Book Now', mobileCtaLabel: 'Chat on WhatsApp' },
	fr: { desktopCtaLabel: 'Réserver', mobileCtaLabel: 'Discuter sur WhatsApp' },
};

const PAGE_SHELL_CONFIG_BY_LANG = {
	en: {
		ctaTitle: 'Ready to experience Morocco in luxury?',
		ctaDescription: 'Get a free, tailor-made itinerary within 24 hours - or chat with a local expert right now.',
		ctaWhatsAppLabel: 'WhatsApp Us',
		ctaQuoteLabel: 'Get a Free Quote',
		miniReviewsTitle: 'What our travellers say',
	},
	fr: {
		ctaTitle: 'Prêt à vivre le Maroc dans le luxe ?',
		ctaDescription: 'Recevez un itinéraire gratuit et sur mesure sous 24 heures - ou discutez dès maintenant avec un expert local.',
		ctaWhatsAppLabel: 'WhatsApp',
		ctaQuoteLabel: 'Devis gratuit',
		miniReviewsTitle: 'Ce que disent nos voyageurs',
	},
};

export const SOCIAL_LINKS = {
	instagram: 'https://www.instagram.com/travel.yassine',
	facebook: 'https://www.facebook.com/share/18yb3wER35/?mibextid=wwXIfr',
	tiktok: 'https://www.tiktok.com/@yasine.travel',
};

// Footer texts, columns and links live in data/footer.js.

const LEAD_FORM_CONFIG_BY_LANG = {
	en: {
		defaultTitle: 'Plan Your Morocco Trip',
		defaultSubtitle: 'Free, no-obligation itinerary within 24 hours.',
		toastTitle: 'Inquiry received',
		toastDescription: 'Our trip designers will reply within 24 hours.',
		successTitle: 'Thank you!',
		successDescription: 'We have received your request and will craft a personalised itinerary within 24 hours. Prefer to talk now?',
		successWhatsAppLabel: 'Message us on WhatsApp',
		submitLabel: 'Get My Free Itinerary',
		privacyNote: 'No spam. Your details stay private. Reply within 24h.',
		newsletterToastTitle: 'Subscribed!',
		newsletterToastDescription: 'Watch your inbox for insider Morocco travel tips.',
		newsletterPlaceholder: 'Your email address',
		newsletterSubmitLabel: 'Join',
		fieldLabels: {
			fullName: 'Name',
			email: 'Email',
			phone: 'WhatsApp',
			dates: 'Travel Date',
			message: 'Message',
		},
		placeholders: {
			fullName: 'Jane Doe',
			email: 'you@email.com',
			phone: '+1 555 000 0000',
			dates: 'e.g. May 2025',
			message: 'Interests, budget, must-sees…',
		},
	},
	fr: {
		defaultTitle: 'Planifiez votre voyage au Maroc',
		defaultSubtitle: 'Itinéraire gratuit et sans engagement sous 24 heures.',
		toastTitle: 'Demande reçue',
		toastDescription: 'Nos concepteurs de voyage vous répondront sous 24 heures.',
		successTitle: 'Merci !',
		successDescription: 'Nous avons bien reçu votre demande et vous préparerons un itinéraire personnalisé sous 24 heures. Vous préférez en parler tout de suite ?',
		successWhatsAppLabel: 'Écrivez-nous sur WhatsApp',
		submitLabel: 'Recevoir mon itinéraire gratuit',
		privacyNote: 'Pas de spam. Vos données restent privées. Réponse sous 24h.',
		newsletterToastTitle: 'Inscription confirmée !',
		newsletterToastDescription: 'Surveillez votre boîte mail pour nos conseils de voyage exclusifs.',
		newsletterPlaceholder: 'Votre adresse e-mail',
		newsletterSubmitLabel: 'Je m’inscris',
		fieldLabels: {
			fullName: 'Nom',
			email: 'E-mail',
			phone: 'WhatsApp',
			dates: 'Date de voyage',
			message: 'Message',
		},
		placeholders: {
			fullName: 'Jeanne Dupont',
			email: 'vous@email.com',
			phone: '+212 6 00 00 00 00',
			dates: 'ex. mai 2025',
			message: 'Centres d’intérêt, budget, incontournables…',
		},
	},
};

export function getSiteCopy(lang = DEFAULT_LANGUAGE) {
	const reviewSummary = formatReviewSummary(lang);
	return { reviewSummary, reviewSummaryCompact: reviewSummary };
}

export function getNavbarConfig(lang = DEFAULT_LANGUAGE) {
	return resolve(NAVBAR_CONFIG_BY_LANG, lang);
}

export function getPageShellConfig(lang = DEFAULT_LANGUAGE) {
	return resolve(PAGE_SHELL_CONFIG_BY_LANG, lang);
}

export function getLeadFormConfig(lang = DEFAULT_LANGUAGE) {
	return resolve(LEAD_FORM_CONFIG_BY_LANG, lang);
}

registerContent('site.brand', SITE_BRAND);
registerContent('site.social', SOCIAL_LINKS);
registerContent('site.copy', {
	navbar: NAVBAR_CONFIG_BY_LANG,
	pageShell: PAGE_SHELL_CONFIG_BY_LANG,
	leadForm: LEAD_FORM_CONFIG_BY_LANG,
});

// Kept for call sites that haven't been made locale-aware yet; always English.
export const NAVBAR_CONFIG = NAVBAR_CONFIG_BY_LANG[DEFAULT_LANGUAGE];
export const PAGE_SHELL_CONFIG = PAGE_SHELL_CONFIG_BY_LANG[DEFAULT_LANGUAGE];
export const LEAD_FORM_CONFIG = LEAD_FORM_CONFIG_BY_LANG[DEFAULT_LANGUAGE];
