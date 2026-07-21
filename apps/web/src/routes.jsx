import React from 'react';
import { Route, Routes } from 'react-router-dom';
const Home = React.lazy(() => import('@/pages/Home'));
const AirportTransferPage = React.lazy(() => import('@/pages/AirportTransferPage'));
const AirportTransferDetailPage = React.lazy(() => import('@/pages/AirportTransferDetailPage'));
const BlogPage = React.lazy(() => import('@/pages/BlogPage'));
const BlogArticlePage = React.lazy(() => import('@/pages/BlogArticlePage'));
const DestinationPage = React.lazy(() => import('@/pages/DestinationPage'));
const DestinationDetailPage = React.lazy(() => import('@/pages/DestinationDetailPage'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage'));
import { ROUTE_PATHS } from './data/route-config';
const About = React.lazy(() => import('@/pages/ContentPages').then((mod) => ({ default: mod.About })));
const Contact = React.lazy(() => import('@/pages/ContentPages').then((mod) => ({ default: mod.Contact })));
const Faq = React.lazy(() => import('@/pages/ContentPages').then((mod) => ({ default: mod.Faq })));
const Gallery = React.lazy(() => import('@/pages/ContentPages').then((mod) => ({ default: mod.Gallery })));
const Reviews = React.lazy(() => import('@/pages/ContentPages').then((mod) => ({ default: mod.Reviews })));
const TravelGuide = React.lazy(() => import('@/pages/ContentPages').then((mod) => ({ default: mod.TravelGuide })));
const CustomTours = React.lazy(() => import('@/pages/ServicePages').then((mod) => ({ default: mod.CustomTours })));
const PrivateDrivers = React.lazy(() => import('@/pages/ServicePages').then((mod) => ({ default: mod.PrivateDrivers })));
const TourDetail = React.lazy(() => import('@/pages/TourPage').then((mod) => ({ default: mod.TourDetail })));
const ToursListing = React.lazy(() => import('@/pages/TourPage').then((mod) => ({ default: mod.ToursListing })));
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
		<React.Suspense fallback={<RouteFallback />}>
			<Routes>
				<Route path={ROUTE_PATHS.home} element={<Home />} />
				{CONTENT_PAGE_ROUTES.map((entry) => (
					<Route key={entry.routeKey} path={ROUTE_PATHS[entry.routeKey]} element={entry.element} />
				))}
				<Route path={ROUTE_PATHS.destinationDetail} element={<DestinationDetailPage />} />
				<Route path={ROUTE_PATHS.blogArticle} element={<BlogArticlePage />} />
				{TOUR_COLLECTIONS.map((collection) => (
					<Route
						key={collection.routeKey}
						path={ROUTE_PATHS[collection.routeKey]}
						element={<ToursListing routeKey={collection.routeKey} />}
					/>
				))}
				{SERVICE_PAGE_ROUTES.map((entry) => (
					<Route key={entry.routeKey} path={ROUTE_PATHS[entry.routeKey]} element={entry.element} />
				))}
				<Route path={ROUTE_PATHS.airportTransferDetail} element={<AirportTransferDetailPage />} />
				<Route path={ROUTE_PATHS.tourDetail} element={<TourDetail />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</React.Suspense>
	);
}

function RouteFallback() {
	return <div className="min-h-[60vh] animate-pulse bg-secondary/40" />;
}
