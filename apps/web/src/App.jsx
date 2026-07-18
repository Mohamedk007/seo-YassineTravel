import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';
import { AppRoutes } from '@/routes';
import '@/i18n/config';
import i18n from '@/i18n/config';
import { defaultLanguage, resolveLang } from '@/i18n/resolveLang';
import { LocaleProvider } from '@/i18n/LocaleContext';

function App() {
	const { lang, rest } = resolveLang(window.location.pathname);

	if (!lang) {
		// No (valid) language segment in the URL — redirect once to the default language,
		// preserving the rest of the path, query string, and hash.
		const restPath = rest === '/' ? '' : rest;
		const target = `/${defaultLanguage()}${restPath}${window.location.search}${window.location.hash}`;
		window.location.replace(target);
		return null;
	}

	if (i18n.language !== lang) {
		i18n.changeLanguage(lang);
	}

	return (
		<LocaleProvider lang={lang}>
			<Router basename={`/${lang}`}>
				<ScrollToTop />
				<AppRoutes />
				<Toaster />
			</Router>
		</LocaleProvider>
	);
}

export default App;
