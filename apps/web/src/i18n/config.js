import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@/seo/sitemap';
import en from './locales/en/common.json';
import fr from './locales/fr/common.json';

// Re-exported from @/seo/sitemap so the runtime and the build-time sitemap
// generator agree on one language list.
export { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES };

const RESOURCES = {
	en: { translation: en },
	fr: { translation: fr },
};

// A fresh instance per render (one per request on the server, one per page
// load on the client) — a shared module-level singleton mutated via
// `changeLanguage()` would race across concurrent SSR requests for different
// languages. Resources are already-bundled JSON, so init is synchronous.
export function createI18nInstance(lang = DEFAULT_LANGUAGE) {
	const instance = i18next.createInstance();
	instance.use(initReactI18next).init({
		resources: RESOURCES,
		lng: lang,
		fallbackLng: DEFAULT_LANGUAGE,
		interpolation: { escapeValue: false },
		react: { useSuspense: false },
	});
	return instance;
}
