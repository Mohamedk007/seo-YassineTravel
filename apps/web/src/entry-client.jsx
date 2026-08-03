import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { AppShell } from '@/App';
import { createI18nInstance } from '@/i18n/config';
import { defaultLanguage, resolveLang } from '@/i18n/resolveLang';
import '@/index.css';

const { lang, rest } = resolveLang(window.location.pathname);

if (!lang) {
	// Defense-in-depth only — server.js now issues the real 302 for any
	// unprefixed path. This covers stale cached HTML/service-worker edge cases.
	const restPath = rest === '/' ? '' : rest;
	const target = `/${defaultLanguage()}${restPath}${window.location.search}${window.location.hash}`;
	window.location.replace(target);
} else {
	const i18n = createI18nInstance(lang);

	ReactDOM.hydrateRoot(
		document.getElementById('root'),
		<HelmetProvider>
			<I18nextProvider i18n={i18n}>
				<BrowserRouter basename={`/${lang}`}>
					<AppShell lang={lang} />
				</BrowserRouter>
			</I18nextProvider>
		</HelmetProvider>
	);
}
