import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';
import HomePage from './pages/HomePage';
import {
  TourDetail, ToursListing, About, Destinations, Gallery, Reviews,
  Faq, Blog, TravelGuide, Contact, AirportTransfers, PrivateDrivers, CustomTours,
} from './pages/pages';
import { IMG } from '@/data/site';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/tours" element={<ToursListing title="All Morocco Tours" subtitle="Handcrafted private journeys for every kind of traveller." image={IMG.kasbah} intro="Browse our most-loved itineraries — every tour is fully private and tailor-made to your dates, pace and interests." />} />
        <Route path="/luxury-tours" element={<ToursListing category="Luxury Tours" title="Luxury Morocco Tours" subtitle="Five-star riads, private desert camps and impeccable service." image={IMG.luxCamp} intro="Our most refined journeys, designed for travellers who expect the very best." />} />
        <Route path="/private-tours" element={<ToursListing category="Private Tours" title="Private Morocco Tours" subtitle="Your own vehicle, guide and pace — Morocco entirely on your terms." image={IMG.fesDoor} intro="Every one of our tours is private by default. Explore intimate, flexible itineraries." />} />
        <Route path="/desert-tours" element={<ToursListing category="Desert Tours" title="Sahara Desert Tours" subtitle="Golden dunes, camel treks and unforgettable luxury desert camps." image={IMG.duneSunset} intro="Journey into the Sahara and sleep beneath a blanket of stars." />} />
        <Route path="/day-trips" element={<ToursListing category="Day Trips" title="Morocco Day Trips" subtitle="Big adventures, back by evening — from the Atlas to the Atlantic." image={IMG.atlas} intro="Perfect additions to your city stay, all with private transport and expert guides." />} />
        <Route path="/custom-tours" element={<CustomTours />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/travel-guide" element={<TravelGuide />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/airport-transfers" element={<AirportTransfers />} />
        <Route path="/private-drivers" element={<PrivateDrivers />} />
        <Route path="/tour/:slug" element={<TourDetail />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
