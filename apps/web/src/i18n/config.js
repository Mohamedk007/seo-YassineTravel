import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@/seo/sitemap';
import en from './locales/en/common.json';
import fr from './locales/fr/common.json';

// Re-exported from @/seo/sitemap so the runtime and the build-time sitemap
// generator agree on one language list.
export { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES };

i18next.use(initReactI18next).init({
	resources: {
		en: { translation: en },
		fr: { translation: fr },
	},
	lng: DEFAULT_LANGUAGE,
	fallbackLng: DEFAULT_LANGUAGE,
	interpolation: { escapeValue: false },
	// Resources are bundled at build time (small site), so no Suspense/loading state is needed.
	react: { useSuspense: false },
});

export default i18next;
