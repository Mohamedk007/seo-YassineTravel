import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { AppShell } from '@/App';
import { AppRoutes as ServerAppRoutes } from '@/routes.server';
import { createI18nInstance } from '@/i18n/config';

export { defaultLanguage, resolveLang } from '@/i18n/resolveLang';
export { getRoutePaths } from '@/data/route-config';

// `url` is the full request path including the /en or /fr prefix (e.g.
// "/en/tours/imperial-cities-sahara") — unlike BrowserRouter, StaticRouter's
// `location` must already include `basename` for route matching to work.
export function render(url, lang) {
	const i18n = createI18nInstance(lang);
	const helmetContext = {};

	const html = renderToString(
		<HelmetProvider context={helmetContext}>
			<I18nextProvider i18n={i18n}>
				<StaticRouter basename={`/${lang}`} location={url}>
					<AppShell lang={lang} routes={ServerAppRoutes} />
				</StaticRouter>
			</I18nextProvider>
		</HelmetProvider>
	);

	return { html, helmet: helmetContext.helmet };
}
