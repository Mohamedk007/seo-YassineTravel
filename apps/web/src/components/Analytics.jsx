import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// gtag's own `config` call already sends one page_view for the initial
// load (index.html's inline script) — this only needs to cover the
// in-app navigations after that, since BrowserRouter never reloads the
// page. Skipping the first run avoids double-counting that initial hit.
// window.gtag is undefined during SSR and until the index.html script
// tag executes client-side, so this is a no-op there rather than an error.
export function Analytics() {
	const { pathname, search } = useLocation();
	const isFirstRun = useRef(true);

	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false;
			return;
		}
		if (typeof window.gtag !== 'function') return;
		window.gtag('event', 'page_view', {
			page_path: pathname + search,
			page_location: window.location.href,
			page_title: document.title,
		});
	}, [pathname, search]);

	return null;
}
