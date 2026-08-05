import React from 'react';
import ScrollToTop from './components/ScrollToTop';
import { Analytics } from './components/Analytics';
import { Toaster } from '@/components/ui/toaster';
import { AppRoutes } from '@/routes';
import { LocaleProvider } from '@/i18n/LocaleContext';

// Isomorphic core: no Router (each entry supplies BrowserRouter/StaticRouter),
// no window reads, no i18n mutation — see entry-client.jsx / entry-server.jsx
// for the environment-specific wiring around this. `routes` defaults to the
// client's React.lazy()-based table; entry-server.jsx passes routes.server.jsx's
// eager-import table instead, since renderToString doesn't wait on Suspense.
export function AppShell({ lang, routes: Routes = AppRoutes }) {
	return (
		<LocaleProvider lang={lang}>
			<ScrollToTop />
			<Analytics />
			<Routes />
			<Toaster />
		</LocaleProvider>
	);
}
