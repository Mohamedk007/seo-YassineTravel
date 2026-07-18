import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/common.json';
import fr from './locales/fr/common.json';

export const SUPPORTED_LANGUAGES = ['en', 'fr'];
export const DEFAULT_LANGUAGE = 'en';

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
