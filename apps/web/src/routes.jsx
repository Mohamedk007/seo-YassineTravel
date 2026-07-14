import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import AirportTransferPage from '@/pages/AirportTransferPage';
import BlogPage from '@/pages/BlogPage';
import DestinationPage from '@/pages/DestinationPage';
import { ROUTE_PATHS } from './data/route-config';
import { About, Contact, Faq, Gallery, Reviews, TravelGuide } from '@/pages/ContentPages';
import { CustomTours, PrivateDrivers } from '@/pages/ServicePages';
import { TourDetail, ToursListing } from '@/pages/TourPage';
import { TOUR_COLLECTIONS } from '@/data/tours/categories';

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
	return (
		<Routes>
			<Route path={ROUTE_PATHS.home} element={<Home />} />
			{CONTENT_PAGE_ROUTES.map((entry) => (
				<Route key={entry.routeKey} path={ROUTE_PATHS[entry.routeKey]} element={entry.element} />
			))}
			{TOUR_COLLECTIONS.map((collection) => (
				<Route
					key={collection.routeKey}
					path={ROUTE_PATHS[collection.routeKey]}
					element={<ToursListing {...collection} />}
				/>
			))}
			{SERVICE_PAGE_ROUTES.map((entry) => (
				<Route key={entry.routeKey} path={ROUTE_PATHS[entry.routeKey]} element={entry.element} />
			))}
			<Route path={ROUTE_PATHS.tourDetail} element={<TourDetail />} />
			<Route path="*" element={<Home />} />
		</Routes>
	);
}
