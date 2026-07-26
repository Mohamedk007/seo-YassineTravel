import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Phone, Plane } from 'lucide-react';
import { AirportTransferBookingForm } from '@/components/site/AirportTransferBookingForm';
import { Layout } from '@/components/site/Layout';
import { Seo } from '@/components/site/Seo';
import { WhatsAppCtaButton } from '@/components/site/WhatsAppCtaButton';
import { AirportPageSection } from '@/components/airport/AirportPageSection';
import { FeatureCard, FeatureGrid } from '@/components/airport/FeatureGrid';
import { TransferFactsPanel } from '@/components/airport/TransferFactsPanel';
import { PopularRoutesTable } from '@/components/airport/PopularRoutesTable';
import { AirportGuide } from '@/components/airport/AirportGuide';
import { AirportComparison } from '@/components/airport/AirportComparison';
import { AirportFAQ } from '@/components/airport/AirportFAQ';
import { AirportReviews } from '@/components/airport/AirportReviews';
import { AirportPricing } from '@/components/airport/AirportPricing';
import { RelatedTransfers } from '@/components/airport/RelatedTransfers';
import { NearbyHotels } from '@/components/airport/NearbyHotels';
import { NearbyDestinations } from '@/components/airport/NearbyDestinations';
import { AirportAEOAnswers, getAeoAnswerSelectors } from '@/components/airport/AirportAEOAnswers';
import { TrustSection } from '@/components/airport/TrustSection';
import { AIRPORTS, getAirportBySlug } from '@/data/airports';
import { getAirportContent } from '@/data/airports/transferContent';
import { getTransferPolicy } from '@/data/airports/transferPolicy';
import { getDestinationsForAirport } from '@/data/destinations';
import { getReviewsForAirport } from '@/data/content';
import { CONTACT, waLink } from '@/data/contact';
import { getPath, getRoutePaths } from '@/data/route-config';
import {
	buildFaqSchema,
	buildImageObjectSchema,
	buildItemListSchema,
	buildOfferCatalogSchema,
	buildReviewSchema,
	buildServiceChannelSchema,
	buildServiceSchema,
	buildSpeakableSchema,
} from '@/seo/schemas';
import { useLocale } from '@/i18n/LocaleContext';

// Airport names are proper nouns, so only the surrounding copy is translated.
// Without this, every French transfer page shipped an English title and
// description — a duplicate of its English twin in Google's eyes.
const COPY = {
	en: {
		// Every airport's `name` already ends in "Airport" (e.g. "Mohammed V
		// International Airport"), so appending "airport transfer" produced an
		// awkward "Airport airport transfer" — just "transfer" reads naturally
		// and keeps the same keyword coverage.
		title: (airport) => `${airport.name} transfer`,
		description: (airport) =>
			`Book a private, fixed-price transfer from ${airport.name} (${airport.code}) in ${airport.city}. Meet-and-greet, flight tracking and 24/7 support.`,
		back: 'Back to airports',
		pickupLabel: 'Pickup airport',
		bookLabel: 'Book on WhatsApp',
		callLabel: 'Call to book',
		sections: {
			whyChooseUs: 'Why choose our transfer',
			overview: (airport) => `About ${airport.name}`,
			routes: 'Popular routes',
			vehicles: 'Vehicle options',
			service: 'Service details',
			guide: (city) => `${city} Airport travel guide`,
			pricing: 'Transfer pricing',
			comparison: 'Private transfer vs. taxi, ride-hailing & public transport',
			trust: 'Why travellers trust us',
			reviews: 'What our travellers say',
			faq: 'Frequently asked questions',
			aeo: 'Quick answers',
			nearbyHotels: (city) => `Where to stay near ${city}`,
			nearbyDestinations: 'Nearby destinations',
			related: 'Continue planning your trip',
			localTips: (city) => `Local tips for ${city} Airport`,
			bestTime: 'Best time to travel',
		},
		otherAirports: 'Other Morocco airport transfers',
		privateDriver: 'Private drivers',
		privateDriverDesc: 'Keep the same driver and vehicle for your whole trip, not just the airport leg.',
		dayTrips: 'Day trips',
		dayTripsDesc: 'Small-group and private day trips from Morocco’s main cities.',
		customTours: 'Custom tours',
		customToursDesc: 'A bespoke, multi-day itinerary built around your dates and interests.',
		popularTours: 'Popular tours',
		popularToursDesc: (destinationName) => `Private tours that include ${destinationName}.`,
	},
	fr: {
		title: (airport) => `Transfert aéroport ${airport.name}`,
		description: (airport) =>
			`Réservez un transfert privé à prix fixe depuis ${airport.name} (${airport.code}) à ${airport.city}. Accueil personnalisé, suivi des vols et assistance 24/7.`,
		back: 'Retour aux aéroports',
		pickupLabel: 'Aéroport de prise en charge',
		bookLabel: 'Réserver sur WhatsApp',
		callLabel: 'Appeler pour réserver',
		sections: {
			whyChooseUs: 'Pourquoi choisir notre transfert',
			overview: (airport) => `À propos de ${airport.name}`,
			routes: 'Trajets populaires',
			vehicles: 'Options de véhicules',
			service: 'Détails du service',
			guide: (city) => `Guide de voyage — aéroport de ${city}`,
			pricing: 'Tarifs des transferts',
			comparison: 'Transfert privé vs. taxi, VTC et transports en commun',
			trust: 'Pourquoi les voyageurs nous font confiance',
			reviews: 'Ce que disent nos voyageurs',
			faq: 'Questions fréquentes',
			aeo: 'Réponses rapides',
			nearbyHotels: (city) => `Où loger près de ${city}`,
			nearbyDestinations: 'Destinations à proximité',
			related: 'Poursuivez la préparation de votre voyage',
			localTips: (city) => `Conseils locaux pour l’aéroport de ${city}`,
			bestTime: 'Meilleure période pour voyager',
		},
		otherAirports: 'Autres transferts aéroport au Maroc',
		privateDriver: 'Chauffeurs privés',
		privateDriverDesc: 'Gardez le même chauffeur et le même véhicule pour tout votre séjour, pas seulement le trajet aéroport.',
		dayTrips: 'Excursions à la journée',
		dayTripsDesc: 'Excursions privées ou en petit groupe au départ des grandes villes du Maroc.',
		customTours: 'Circuits sur mesure',
		customToursDesc: 'Un itinéraire sur plusieurs jours conçu autour de vos dates et de vos centres d’intérêt.',
		popularTours: 'Circuits populaires',
		popularToursDesc: (destinationName) => `Des circuits privés qui incluent ${destinationName}.`,
	},
};

export default function AirportTransferDetailPage() {
	const { slug } = useParams();
	const lang = useLocale();
	const airport = getAirportBySlug(slug);
	const P = getRoutePaths(lang);
	const copy = COPY[lang] || COPY.en;

	if (!airport) return <Navigate to={P.airportTransfers} replace />;

	const content = getAirportContent(airport.slug, lang);
	const policy = getTransferPolicy(lang);
	const reviews = getReviewsForAirport(airport.city, lang);
	const linkedDestinations = getDestinationsForAirport(airport.slug, lang);

	const airportPath = getPath('airportTransferDetail', lang, { slug: airport.slug });
	const title = copy.title(airport);
	const description = copy.description(airport);
	// The slug is identical in both languages; only the route prefix differs
	// (/airport-transfers vs /transferts-aeroport), so the hreflang alternates
	// fall straight out of the localized route table.
	const alternateUrls = {
		en: getPath('airportTransferDetail', 'en', { slug: airport.slug }),
		fr: getPath('airportTransferDetail', 'fr', { slug: airport.slug }),
	};

	const aeoIdPrefix = `aeo-${airport.slug}`;
	const speakable = buildSpeakableSchema(getAeoAnswerSelectors(content.aeoAnswers, aeoIdPrefix));

	const offerCatalog = buildOfferCatalogSchema(
		content.pricing.map((row) => ({
			name: `${airport.name} → ${row.destination}`,
			description: `${row.vehicle} · ${row.duration}`,
			price: row.price,
			priceCurrency: 'EUR',
		})),
		`${airport.name} transfer pricing`,
		lang
	);
	const serviceChannel = buildServiceChannelSchema({
		phone: CONTACT.phone,
		whatsappUrl: waLink(`Hi! I need an airport transfer from ${airport.name}.`),
		availableLanguage: ['en', 'fr', 'ar'],
	});

	const otherAirports = AIRPORTS.filter((entry) => entry.slug !== airport.slug);
	const relatedLinks = [
		{ to: P.privateDrivers, label: copy.privateDriver, description: copy.privateDriverDesc },
		{ to: P.dayTrips, label: copy.dayTrips, description: copy.dayTripsDesc },
		{ to: P.customTours, label: copy.customTours, description: copy.customToursDesc },
		...otherAirports.map((entry) => ({
			to: getPath('airportTransferDetail', lang, { slug: entry.slug }),
			label: entry.name,
			description: `${copy.otherAirports} — ${entry.city}`,
		})),
	];

	return (
		<Layout>
			<Seo
				title={title}
				description={description}
				image={airport.image}
				imageAlt={`${airport.name} terminal`}
				alternateUrls={alternateUrls}
				breadcrumbItems={[
					{ routeKey: 'home' },
					{ routeKey: 'airportTransfers' },
					{ name: airport.name, path: airportPath },
				]}
				// Deliberately left as the default 'WebPage' (not 'Service'): this
				// page's Service node carries offer/channel data a generic WebPage
				// doesn't, so the two coexist as different facets of the same URL
				// rather than a redundant pair — and Google's Speakable feature
				// specifically requires the `speakable` property on a WebPage node.
				speakable={speakable}
				structuredData={[
					buildServiceSchema({
						name: title,
						description,
						path: airportPath,
						lang,
						availableChannel: serviceChannel,
						hasOfferCatalog: offerCatalog,
					}),
					buildFaqSchema(content.faqs),
					...(buildReviewSchema(reviews) || []),
					buildImageObjectSchema({ url: airport.image, caption: `${airport.name} terminal` }),
					buildItemListSchema(
						relatedLinks.map((link) => ({ name: link.label, url: link.to })),
						copy.sections.related,
						lang
					),
				]}
			/>

			{/* HERO */}
			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				<Link to={P.airportTransfers} className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
					<ArrowLeft className="h-4 w-4" /> {copy.back}
				</Link>
				<div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
					<div>
						<Plane className="h-10 w-10 text-primary" />
						<p className="mt-3 text-sm font-semibold uppercase tracking-widest text-primary">{airport.code}</p>
						<h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">{airport.name}</h1>
						<p className="mt-4 max-w-2xl text-lg text-muted-foreground">{content.intro}</p>
						<div className="mt-6 flex flex-wrap items-center gap-3 [&>a]:mt-0">
							<WhatsAppCtaButton message={`Hi! I need an airport transfer from ${airport.name}.`}>{copy.bookLabel}</WhatsAppCtaButton>
							<a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold transition hover:border-primary/40">
								<Phone className="h-4 w-4" /> {copy.callLabel}
							</a>
						</div>
						<div className="mt-8">
							<TransferFactsPanel content={content} lang={lang} />
						</div>
					</div>
					<AirportTransferBookingForm airportName={airport.name} airportCode={airport.code} />
				</div>
			</section>

			{/* WHY CHOOSE US */}
			<AirportPageSection title={copy.sections.whyChooseUs}>
				<FeatureGrid items={policy.whyChooseUs} columns={4} />
			</AirportPageSection>

			{/* AIRPORT OVERVIEW */}
			<AirportPageSection title={copy.sections.overview(airport)} className="bg-secondary/40 rounded-2xl border border-border p-6">
				<p className="text-muted-foreground">{content.overview.description}</p>
			</AirportPageSection>

			{/* POPULAR ROUTES */}
			<AirportPageSection title={copy.sections.routes}>
				<PopularRoutesTable routes={content.popularRoutes} />
			</AirportPageSection>

			{/* VEHICLE OPTIONS */}
			<AirportPageSection title={copy.sections.vehicles}>
				<FeatureGrid items={policy.vehicleOptions} columns={4} />
			</AirportPageSection>

			{/* SERVICE DETAILS: meet & greet, flight monitoring, waiting time, child
			    seats, accessibility, hotel pickup/dropoff, business/family/luxury,
			    safety, licensed drivers, insurance, cancellation, payment, languages */}
			<AirportPageSection title={copy.sections.service}>
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					<FeatureCard icon="Users" {...policy.meetAndGreet} />
					<FeatureCard icon="Clock" {...policy.flightMonitoring} />
					<FeatureCard icon="Clock" {...policy.waitingTimePolicy} />
					<FeatureCard icon="Baby" {...policy.childSeats} />
					<FeatureCard icon="Accessibility" {...policy.accessibility} />
					<FeatureCard icon="Car" {...policy.hotelPickup} />
					<FeatureCard icon="Car" {...policy.hotelDropoff} />
					<FeatureCard icon="Users" {...policy.businessTravel} />
					<FeatureCard icon="Users" {...policy.familyTravel} />
					<FeatureCard icon="Star" {...policy.luxuryTransfers} />
					<FeatureCard icon="ShieldCheck" {...policy.safety} />
					<FeatureCard icon="ShieldCheck" {...policy.licensedDrivers} />
					<FeatureCard icon="HeartHandshake" {...policy.insurance} />
					<FeatureCard icon="XCircle" {...policy.cancellationPolicy} />
					<FeatureCard icon="Banknote" {...policy.paymentMethods} />
					<FeatureCard icon="Languages" {...policy.availableLanguages} />
				</div>
			</AirportPageSection>

			{/* BOOKING PROCESS */}
			<AirportPageSection>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{policy.bookingProcess.map((step) => (
						<div key={step.step} className="relative">
							<div className="font-display text-4xl font-semibold text-primary/30">{step.step}</div>
							<h3 className="mt-2 font-display text-lg font-semibold">{step.title}</h3>
							<p className="mt-1.5 text-sm text-muted-foreground">{step.body}</p>
						</div>
					))}
				</div>
			</AirportPageSection>

			{/* LOCAL TIPS + BEST TIME TO TRAVEL */}
			<AirportPageSection title={copy.sections.localTips(airport.city)}>
				<ul className="grid gap-3 sm:grid-cols-2">
					{content.localTips.map((tip) => (
						<li key={tip} className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
							{tip}
						</li>
					))}
				</ul>
				<div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-5">
					<h3 className="font-semibold">{copy.sections.bestTime}</h3>
					<p className="mt-1.5 text-sm text-muted-foreground">{content.bestTimeToTravel}</p>
				</div>
			</AirportPageSection>

			{/* AIRPORT GUIDE */}
			<AirportPageSection title={copy.sections.guide(airport.city)}>
				<AirportGuide guide={content.guide} lang={lang} />
			</AirportPageSection>

			{/* PRICING */}
			<AirportPageSection id={`${airport.slug}-pricing`} title={copy.sections.pricing}>
				<AirportPricing rows={content.pricing} lang={lang} />
			</AirportPageSection>

			{/* COMPARISON */}
			<AirportPageSection title={copy.sections.comparison}>
				<AirportComparison comparison={policy.comparison} lang={lang} />
			</AirportPageSection>

			{/* TRUST / E-E-A-T */}
			<AirportPageSection title={copy.sections.trust}>
				<TrustSection items={policy.trust} />
			</AirportPageSection>

			{/* REVIEWS */}
			{reviews.length > 0 && (
				<AirportPageSection title={copy.sections.reviews} className="bg-secondary/40 rounded-2xl border border-border p-6">
					<AirportReviews reviews={reviews} />
				</AirportPageSection>
			)}

			{/* NEARBY HOTELS */}
			<AirportPageSection title={copy.sections.nearbyHotels(airport.city)}>
				<NearbyHotels blurb={content.nearbyHotels.blurb} categories={content.nearbyHotels.categories} />
			</AirportPageSection>

			{/* NEARBY DESTINATIONS */}
			<AirportPageSection title={copy.sections.nearbyDestinations}>
				<NearbyDestinations
					destinations={linkedDestinations}
					destinationsIndexPath={P.destinations}
					destinationsIndexLabel={copy.sections.nearbyDestinations}
					getDestinationPath={(destSlug) => getPath('destinationDetail', lang, { slug: destSlug })}
				/>
			</AirportPageSection>

			{/* AEO ANSWERS */}
			<AirportPageSection id="aeo-answers" title={copy.sections.aeo}>
				<AirportAEOAnswers answers={content.aeoAnswers} idPrefix={aeoIdPrefix} />
			</AirportPageSection>

			{/* FAQ */}
			<AirportPageSection title={copy.sections.faq}>
				<AirportFAQ faqs={content.faqs} />
			</AirportPageSection>

			{/* RELATED TRANSFERS */}
			<AirportPageSection title={copy.sections.related}>
				<RelatedTransfers links={relatedLinks} />
			</AirportPageSection>
		</Layout>
	);
}
