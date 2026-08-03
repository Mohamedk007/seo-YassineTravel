import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import AirportTransferPage from '@/pages/AirportTransferPage';
import AirportTransferDetailPage from '@/pages/AirportTransferDetailPage';
import BlogPage from '@/pages/BlogPage';
import BlogArticlePage from '@/pages/BlogArticlePage';
import DestinationPage from '@/pages/DestinationPage';
import DestinationDetailPage from '@/pages/DestinationDetailPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { getRoutePaths } from './data/route-config';
import { useLocale } from '@/i18n/LocaleContext';
import { About, Contact, Faq, Gallery, Reviews, TravelGuide } from '@/pages/ContentPages';
import { CustomTours, PrivateDrivers } from '@/pages/ServicePages';
import { TourDetail, ToursListing } from '@/pages/TourPage';
import { TOUR_COLLECTIONS } from '@/data/tours/categories';

// Server-only mirror of routes.jsx: plain eager imports instead of
// React.lazy(), because renderToString does not wait on Suspense boundaries
// (confirmed empirically — it serializes the fallback skeleton instead of
// real content, which would defeat the entire point of this SSR migration).
// The client keeps the lazy version for its code-splitting benefit on
// subsequent in-app navigations; only the initial SSR response needs this.

const CONTENT_PAGE_ROUTES = [
	{ routeKey: 'about', element: <About /> },
	{ routeKey: 'destinations', element: <DestinationPage /> },
	{ routeKey: 'blog', element: <BlogPage /> },
	{ routeKey: 'travelGuide', element: <TravelGuide /> },
	{ routeKey: 'reviews', element: <Reviews /> },
	{ routeKey: 'gallery', element: <Gallery /> },
	{ routeKey: 'faq', element: <Faq /> },
	{ routeKey: 'contact', element: <Contact /> },
];

const SERVICE_PAGE_ROUTES = [
	{ routeKey: 'customTours', element: <CustomTours /> },
	{ routeKey: 'airportTransfers', element: <AirportTransferPage /> },
	{ routeKey: 'privateDrivers', element: <PrivateDrivers /> },
];

export function AppRoutes() {
	const lang = useLocale();
	const P = getRoutePaths(lang);
	return (
		<Routes>
			<Route path={P.home} element={<Home />} />
			{CONTENT_PAGE_ROUTES.map((entry) => (
				<Route key={entry.routeKey} path={P[entry.routeKey]} element={entry.element} />
			))}
			<Route path={P.destinationDetail} element={<DestinationDetailPage />} />
			<Route path={P.blogArticle} element={<BlogArticlePage />} />
			{TOUR_COLLECTIONS.map((collection) => (
				<Route
					key={collection.routeKey}
					path={P[collection.routeKey]}
					element={<ToursListing routeKey={collection.routeKey} />}
				/>
			))}
			{SERVICE_PAGE_ROUTES.map((entry) => (
				<Route key={entry.routeKey} path={P[entry.routeKey]} element={entry.element} />
			))}
			<Route path={P.airportTransferDetail} element={<AirportTransferDetailPage />} />
			<Route path={P.tourDetail} element={<TourDetail />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}
