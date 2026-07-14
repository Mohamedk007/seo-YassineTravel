import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import {
	About,
	AirportTransfers,
	Blog,
	Contact,
	CustomTours,
	Destinations,
	Faq,
	Gallery,
	PrivateDrivers,
	Reviews,
	TourDetail,
	ToursListing,
	TravelGuide,
} from '@/pages/pages';
import { IMG } from '@/data/site';

export const ROUTE_PATHS = {
	home: '/',
	about: '/about',
	tours: '/tours',
	luxuryTours: '/luxury-tours',
	privateTours: '/private-tours',
	desertTours: '/desert-tours',
	dayTrips: '/day-trips',
	customTours: '/custom-tours',
	destinations: '/destinations',
	blog: '/blog',
	travelGuide: '/travel-guide',
	reviews: '/reviews',
	gallery: '/gallery',
	faq: '/faq',
	contact: '/contact',
	airportTransfers: '/airport-transfers',
	privateDrivers: '/private-drivers',
	tourDetail: '/tour/:slug',
};

export function AppRoutes() {
	return (
		<Routes>
			<Route path={ROUTE_PATHS.home} element={<HomePage />} />
			<Route path={ROUTE_PATHS.about} element={<About />} />
			<Route
				path={ROUTE_PATHS.tours}
				element={
					<ToursListing
						title="All Morocco Tours"
						subtitle="Handcrafted private journeys for every kind of traveller."
						image={IMG.kasbah}
						intro="Browse our most-loved itineraries — every tour is fully private and tailor-made to your dates, pace and interests."
					/>
				}
			/>
			<Route
				path={ROUTE_PATHS.luxuryTours}
				element={
					<ToursListing
						category="Luxury Tours"
						title="Luxury Morocco Tours"
						subtitle="Five-star riads, private desert camps and impeccable service."
						image={IMG.luxCamp}
						intro="Our most refined journeys, designed for travellers who expect the very best."
					/>
				}
			/>
			<Route
				path={ROUTE_PATHS.privateTours}
				element={
					<ToursListing
						category="Private Tours"
						title="Private Morocco Tours"
						subtitle="Your own vehicle, guide and pace — Morocco entirely on your terms."
						image={IMG.fesDoor}
						intro="Every one of our tours is private by default. Explore intimate, flexible itineraries."
					/>
				}
			/>
			<Route
				path={ROUTE_PATHS.desertTours}
				element={
					<ToursListing
						category="Desert Tours"
						title="Sahara Desert Tours"
						subtitle="Golden dunes, camel treks and unforgettable luxury desert camps."
						image={IMG.duneSunset}
						intro="Journey into the Sahara and sleep beneath a blanket of stars."
					/>
				}
			/>
			<Route
				path={ROUTE_PATHS.dayTrips}
				element={
					<ToursListing
						category="Day Trips"
						title="Morocco Day Trips"
						subtitle="Big adventures, back by evening — from the Atlas to the Atlantic."
						image={IMG.atlas}
						intro="Perfect additions to your city stay, all with private transport and expert guides."
					/>
				}
			/>
			<Route path={ROUTE_PATHS.customTours} element={<CustomTours />} />
			<Route path={ROUTE_PATHS.destinations} element={<Destinations />} />
			<Route path={ROUTE_PATHS.blog} element={<Blog />} />
			<Route path={ROUTE_PATHS.travelGuide} element={<TravelGuide />} />
			<Route path={ROUTE_PATHS.reviews} element={<Reviews />} />
			<Route path={ROUTE_PATHS.gallery} element={<Gallery />} />
			<Route path={ROUTE_PATHS.faq} element={<Faq />} />
			<Route path={ROUTE_PATHS.contact} element={<Contact />} />
			<Route path={ROUTE_PATHS.airportTransfers} element={<AirportTransfers />} />
			<Route path={ROUTE_PATHS.privateDrivers} element={<PrivateDrivers />} />
			<Route path={ROUTE_PATHS.tourDetail} element={<TourDetail />} />
			<Route path="*" element={<HomePage />} />
		</Routes>
	);
}
