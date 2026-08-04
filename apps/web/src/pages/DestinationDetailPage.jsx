import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Plane } from 'lucide-react';
import { getDestinationInternalLinks } from '@/data/internal-links';
import { getDestinationBySlug, getDestinationTranslations, getDestinations } from '@/data/destinations';
import { getBlogPostsForDestination } from '@/data/blog';
import { getFaqs, getReviewsForDestination } from '@/data/content';
import { getAirportBySlug } from '@/data/airports';
import { getToursForDestination } from '@/data/tours/index';
import { getPath, getRoutePaths } from '@/data/route-config';
import { SITE_BRAND } from '@/data/site-config';
import { buildFaqSchema, buildImageObjectSchema, buildTouristDestinationSchema } from '@/seo/schemas';
import { getBreadcrumbLabel } from '@/seo/breadcrumbs';
import { useLocale } from '@/i18n/LocaleContext';
import { Stars } from '@/components/site/Typography';
import { Gallery } from '@/components/site/Gallery';
import { TourCard } from '@/components/tours/TourCard';
import { buildGoogleMapsEmbedUrl } from '@/lib/maps';
import { Page } from './page-shell';

const COPY = {
	en: {
		thingsToDo: (name) => `Things to do in ${name}`,
		inPictures: (name) => `${name} in pictures`,
		whereIs: (name) => `Where is ${name}?`,
		bestToursTo: (name) => `Best tours to ${name}`,
		bestTimeToVisit: 'Best time to visit',
		airportTransferFrom: (name) => `Airport transfer from ${name}`,
		bookPrivateDriverFor: (name) => `Book a private driver for ${name}`,
		whatTravellersSay: 'What travellers say',
		readMoreAbout: (name) => `Read more about ${name}`,
		faqHeading: 'Frequently asked questions',
		nearbyDestinations: 'Nearby destinations',
		backToDestinations: 'Back to destinations',
	},
	fr: {
		thingsToDo: (name) => `Que faire à ${name}`,
		inPictures: (name) => `${name} en images`,
		whereIs: (name) => `Où se trouve ${name} ?`,
		bestToursTo: (name) => `Meilleurs circuits vers ${name}`,
		bestTimeToVisit: 'Meilleure période pour visiter',
		airportTransferFrom: (name) => `Transfert aéroport depuis ${name}`,
		bookPrivateDriverFor: (name) => `Réserver un chauffeur privé pour ${name}`,
		whatTravellersSay: 'Ce que disent les voyageurs',
		readMoreAbout: (name) => `En savoir plus sur ${name}`,
		faqHeading: 'Questions fréquentes',
		nearbyDestinations: 'Destinations à proximité',
		backToDestinations: 'Retour aux destinations',
	},
};

export default function DestinationDetailPage() {
	const { slug } = useParams();
	const lang = useLocale();
	const destination = getDestinationBySlug(slug, lang);
	const P = getRoutePaths(lang);
	const copy = COPY[lang] || COPY.en;

	if (!destination) return <Navigate to={P.destinations} replace />;

	const destinationPath = getPath('destinationDetail', lang, { slug: destination.slug });
	const DESTINATION_INTERNAL_LINKS = getDestinationInternalLinks(lang);
	const translations = getDestinationTranslations(destination.id);
	const alternateUrls = Object.fromEntries(
		Object.entries(translations).map(([code, translated]) => {
			const path = getPath('destinationDetail', code, { slug: translated.slug });
			return [code, `${SITE_BRAND.origin}/${code}${path}`];
		})
	);

	// Entity relationships that actually power this hub, instead of a lone summary paragraph.
	const relatedTours = getToursForDestination(destination.id, lang);
	const relatedArticles = getBlogPostsForDestination(destination.id, lang);
	const relatedReviews = getReviewsForDestination(destination.name, lang).slice(0, 3);
	// Prefer the destination's own FAQs when it has them (real, keyword-targeted
	// Q&A written for that specific place) — fall back to the generic sitewide
	// set for destinations that haven't been given their own yet, so nothing
	// breaks for the ones not covered by this pass.
	const destinationFaqs = destination.faqs && destination.faqs.length > 0 ? destination.faqs : getFaqs(lang).slice(0, 4);
	const nearestAirport = destination.nearestAirportSlug ? getAirportBySlug(destination.nearestAirportSlug) : null;
	const nearbyDestinations = (destination.nearbyDestinationIds || [])
		.map((id) => getDestinations(lang).find((entry) => entry.id === id))
		.filter(Boolean);
	const mapEmbedUrl = buildGoogleMapsEmbedUrl(`${destination.name}, Morocco`);

	return (
		<Page
			title={destination.h1 || destination.name}
			seoTitle={destination.seoTitle}
			subtitle={destination.summary}
			seoDescription={destination.seoDescription}
			image={destination.image}
			imageAlt={destination.name}
			crumb={getBreadcrumbLabel('destinations', lang)}
			pageType="TouristDestination"
			structuredData={[
				buildTouristDestinationSchema(destination, destinationPath, lang),
				buildFaqSchema(destinationFaqs),
				buildImageObjectSchema({ url: destination.image, caption: destination.name }),
			]}
			alternateUrls={alternateUrls}
			breadcrumbItems={[
				{ routeKey: 'home' },
				{ routeKey: 'destinations' },
				{ name: destination.name, path: destinationPath },
			]}
			preconnectMaps
		>
			<section className="mx-auto max-w-[72rem] px-5 py-16 lg:px-8">
				{/* Overview — a longer, keyword-complete lead paragraph when a
				    destination has one; otherwise the short summary already used in
				    the hero, so this section never renders empty. */}
				<p className="text-lg text-muted-foreground">{destination.overview || destination.summary}</p>

				{/* Long-form guide sections (e.g. "How to Get Here", "What Makes It
				    Luxury", history/UNESCO context) — optional, only present on
				    destinations that have been given dedicated SEO content. */}
				{destination.guideSections && destination.guideSections.length > 0 && (
					<div className="mt-10 space-y-8">
						{destination.guideSections.map((section) => (
							<div key={section.heading}>
								<h2 className="font-display text-2xl font-semibold">{section.heading}</h2>
								<div className="prose-slate mt-3 max-w-none space-y-3 text-muted-foreground">
									{section.body.map((paragraph, index) => (
										<p key={index}>{paragraph}</p>
									))}
								</div>
							</div>
						))}
					</div>
				)}

				{/* Things to do */}
				{destination.thingsToDo && (
					<div className="mt-10">
						<h2 className="font-display text-2xl font-semibold">{copy.thingsToDo(destination.name)}</h2>
						<ul className="mt-4 grid gap-3 sm:grid-cols-2">
							{destination.thingsToDo.map((item) => (
								<li key={item} className="flex items-start gap-2 rounded-lg border border-border px-4 py-3 text-sm">
									<MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
									{item}
								</li>
							))}
						</ul>
					</div>
				)}

				{/* Gallery */}
				{destination.gallery && destination.gallery.length > 0 && (
					<div className="mt-14">
						<h2 className="font-display text-2xl font-semibold">{copy.inPictures(destination.name)}</h2>
						<div className="mt-5">
							<Gallery images={destination.gallery} altPrefix={destination.name} />
						</div>
					</div>
				)}

				{/* Compact map */}
				{mapEmbedUrl && (
					<div className="mt-14">
						<h2 className="font-display text-2xl font-semibold">{copy.whereIs(destination.name)}</h2>
						<div className="mt-5 overflow-hidden rounded-2xl border border-border">
							<iframe
								src={mapEmbedUrl}
								title={`Map of ${destination.name}`}
								width="100%"
								height="320"
								loading="lazy"
								style={{ border: 0 }}
								referrerPolicy="no-referrer-when-downgrade"
							/>
						</div>
					</div>
				)}

				{/* Best tours here */}
				{relatedTours.length > 0 && (
					<div className="mt-14">
						<h2 className="font-display text-2xl font-semibold">{copy.bestToursTo(destination.name)}</h2>
						<div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{relatedTours.slice(0, 3).map((tour, index) => (
								<TourCard key={tour.slug} tour={tour} delay={index * 60} />
							))}
						</div>
					</div>
				)}

				{/* Best time to visit / weather */}
				{destination.bestTimeToVisit && (
					<div className="mt-14 rounded-2xl border border-border bg-secondary/40 p-6">
						<p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
							<Calendar className="h-4 w-4" /> {copy.bestTimeToVisit}
						</p>
						<p className="mt-2 text-muted-foreground">{destination.bestTimeToVisit}</p>
					</div>
				)}

				{/* Travel practicalities: airport transfer + private driver */}
				<div className="mt-10 grid gap-4 sm:grid-cols-2">
					{nearestAirport && (
						<Link
							to={getPath('airportTransferDetail', lang, { slug: nearestAirport.slug })}
							className="group flex items-center justify-between rounded-xl border border-border p-5 transition hover:border-primary/40"
						>
							<span className="inline-flex items-center gap-2 font-medium">
								<Plane className="h-4 w-4 text-primary" /> {copy.airportTransferFrom(nearestAirport.name)}
							</span>
							<ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-0.5" />
						</Link>
					)}
					<Link
						to={P.privateDrivers}
						className="group flex items-center justify-between rounded-xl border border-border p-5 transition hover:border-primary/40"
					>
						<span className="font-medium">{copy.bookPrivateDriverFor(destination.name)}</span>
						<ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-0.5" />
					</Link>
				</div>

				{/* Reviews specific to this destination, when we have them */}
				{relatedReviews.length > 0 && (
					<div className="mt-14">
						<h2 className="font-display text-2xl font-semibold">{copy.whatTravellersSay}</h2>
						<div className="mt-5 grid gap-5 sm:grid-cols-3">
							{relatedReviews.map((review) => (
								<div key={review.name} className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
									<Stars />
									<p className="mt-3 text-sm text-foreground/90">“{review.text}”</p>
									<p className="mt-3 text-sm font-semibold">{review.name}</p>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Related articles */}
				{relatedArticles.length > 0 && (
					<div className="mt-14">
						<h2 className="font-display text-2xl font-semibold">{copy.readMoreAbout(destination.name)}</h2>
						<div className="mt-5 grid gap-4 sm:grid-cols-2">
							{relatedArticles.map((post) => (
								<Link
									key={post.slug}
									to={getPath('blogArticle', lang, { slug: post.slug })}
									className="group flex items-center justify-between rounded-xl border border-border p-5 transition hover:border-primary/40"
								>
									<span className="font-medium">{post.title}</span>
									<ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-0.5" />
								</Link>
							))}
						</div>
					</div>
				)}

				{/* FAQ */}
				<div className="mt-14">
					<h2 className="font-display text-2xl font-semibold">{copy.faqHeading}</h2>
					<div className="mt-5 space-y-4">
						{destinationFaqs.map(([question, answer]) => (
							<div key={question} className="rounded-xl border border-border p-5">
								<p className="font-semibold">{question}</p>
								<p className="mt-1.5 text-sm text-muted-foreground">{answer}</p>
							</div>
						))}
					</div>
				</div>

				{/* Nearby attractions */}
				{nearbyDestinations.length > 0 && (
					<div className="mt-14">
						<h2 className="font-display text-2xl font-semibold">{copy.nearbyDestinations}</h2>
						<div className="mt-5 grid gap-4 sm:grid-cols-2">
							{nearbyDestinations.map((nearby) => (
								<Link
									key={nearby.slug}
									to={getPath('destinationDetail', lang, { slug: nearby.slug })}
									className="group flex items-center justify-between rounded-xl border border-border p-5 transition hover:border-primary/40"
								>
									<span className="font-medium">{nearby.name}</span>
									<ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-0.5" />
								</Link>
							))}
						</div>
					</div>
				)}

				{/* Generic internal links (gallery, blog, tours, airport transfers index) */}
				<div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					{DESTINATION_INTERNAL_LINKS.map((entry) => (
						<Link key={entry.to} to={entry.to} className="rounded-lg border border-border px-4 py-3 text-sm font-medium transition hover:border-primary/40 hover:text-primary">
							{entry.label}
						</Link>
					))}
				</div>

				<Link to={P.destinations} className="mt-8 inline-flex items-center gap-2 font-semibold text-primary">
					<ArrowLeft className="h-4 w-4" /> {copy.backToDestinations}
				</Link>
			</section>
		</Page>
	);
}
