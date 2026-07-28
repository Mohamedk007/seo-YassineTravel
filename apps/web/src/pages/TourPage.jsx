import React from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { ArrowRight, Check, Clock, MapPin, MessageCircle, Phone, Star, Users, X } from 'lucide-react';
import { LeadForm } from '@/components/site/LeadForm';
import { Layout } from '@/components/site/Layout';
import { PageHero } from '@/components/site/PageHero';
import { Seo } from '@/components/site/Seo';
import { Gallery } from '@/components/site/Gallery';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CONTACT, waLink } from '@/data/contact';
import { getFaqs } from '@/data/content';
import { getTourInternalLinks } from '@/data/internal-links';
import { useLocale } from '@/i18n/LocaleContext';
import { getPath, getRoutePaths } from '../data/route-config';
import { getTours } from '@/data/tours/catalog';
import { getRelatedTours, getTourBySlug, getToursByCategory, getTourCollectionByRouteKey, getTourTranslations } from '@/data/tours/index';
import { SITE_BRAND } from '@/data/site-config';
import { buildFaqSchema, buildImageObjectSchema, buildItemListSchema, buildTourSchema } from '@/seo/schemas';
import { getBreadcrumbLabel } from '@/seo/breadcrumbs';
import { buildGoogleMapsRouteEmbedUrl, buildGoogleMapsRouteUrl } from '@/lib/maps';
import { TourCard } from '../components/tours/TourCard';
import { CTA, MiniReviews } from './page-shell';

function Badge({ icon: Icon, children }) {
	return (
		<span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 font-medium">
			<Icon className="h-4 w-4 text-primary" /> {children}
		</span>
	);
}

// Page-specific UI copy (not SEO metadata, which already goes through the
// translated route/breadcrumb/schema layer). Kept here rather than in a shared
// i18n bundle since the "Overview" paragraph is built around two page-local
// variables (duration, tagline) that don't factor cleanly into a translation key.
const COPY = {
	en: {
		verified: 'verified',
		overview: 'Overview',
		overviewText: (tour) =>
			`Discover the very best of Morocco on this ${tour.duration.toLowerCase()} private journey. ${tour.tagline} Travelling with your own driver-guide, you will move at your own pace, staying in handpicked luxury accommodation and enjoying privileged access to Morocco's most iconic sights and hidden gems.`,
		highlights: 'Highlights',
		itinerary: 'Detailed itinerary',
		googleMaps: 'Google Maps',
		openRouteInMaps: 'Open this route in Google Maps',
		gallery: 'Gallery',
		pricing: 'Pricing',
		groupSize: 'Group size',
		price: 'Price per person',
		travellers2: '2 travellers',
		travellers34: '3–4 travellers',
		travellers5plus: '5+ travellers',
		perPerson: 'per person',
		included: "What's included",
		notIncluded: 'Not included',
		tourFaqs: 'Tour FAQs',
		from: 'from',
		bookOnWhatsApp: 'Book on WhatsApp',
		callToBook: 'Call to book',
		enquireTitle: 'Enquire about this tour',
		enquireSubtitle: 'Free quote within 24 hours.',
		waMessage: (tour) => `Hi! I'm interested in the "${tour.title}" tour.`,
		relatedTours: 'Related tours',
		continuePlanning: 'Continue planning your trip',
	},
	fr: {
		verified: 'vérifié',
		overview: 'Aperçu',
		overviewText: (tour) =>
			`Découvrez le meilleur du Maroc lors de ce voyage privé de ${tour.duration.toLowerCase()}. ${tour.tagline} En voyageant avec votre propre chauffeur-guide, vous avancerez à votre rythme, logerez dans des hébergements de luxe triés sur le volet et profiterez d'un accès privilégié aux sites les plus emblématiques du Maroc comme à ses trésors cachés.`,
		highlights: 'Points forts',
		itinerary: 'Itinéraire détaillé',
		googleMaps: 'Google Maps',
		openRouteInMaps: 'Ouvrir cet itinéraire dans Google Maps',
		gallery: 'Galerie',
		pricing: 'Tarifs',
		groupSize: 'Taille du groupe',
		price: 'Prix par personne',
		travellers2: '2 voyageurs',
		travellers34: '3-4 voyageurs',
		travellers5plus: '5 voyageurs et +',
		perPerson: 'par personne',
		included: 'Ce qui est inclus',
		notIncluded: 'Non inclus',
		tourFaqs: 'Questions fréquentes sur ce circuit',
		from: 'à partir de',
		bookOnWhatsApp: 'Réserver sur WhatsApp',
		callToBook: 'Appeler pour réserver',
		enquireTitle: 'Renseignez-vous sur ce circuit',
		enquireSubtitle: 'Devis gratuit sous 24 heures.',
		waMessage: (tour) => `Bonjour ! Je suis intéressé(e) par le circuit "${tour.title}".`,
		relatedTours: 'Circuits similaires',
		continuePlanning: 'Poursuivez la préparation de votre voyage',
	},
};

export function TourDetail() {
	const lang = useLocale();
	const FAQS = getFaqs(lang);

	const { slug } = useParams();
	const tour = getTourBySlug(slug, lang);
	const P = getRoutePaths(lang);
	const copy = COPY[lang] || COPY.en;

	if (!tour) return <Navigate to={P.tours} replace />;

	const related = getRelatedTours(slug, lang);
	const INCLUDED = tour.included || [];
	const EXCLUDED = tour.excluded || [];
	const tourPath = getPath('tourDetail', lang, { slug: tour.slug });
	const TOUR_INTERNAL_LINKS = getTourInternalLinks(lang);
	const tourTranslations = getTourTranslations(tour.id);
	const alternateUrls = Object.fromEntries(
		Object.entries(tourTranslations).map(([code, translated]) => {
			const path = getPath('tourDetail', code, { slug: translated.slug });
			return [code, `${SITE_BRAND.origin}/${code}${path}`];
		})
	);
	const routeMapUrl = buildGoogleMapsRouteUrl(tour.mapStops);
	const routeEmbedUrl = buildGoogleMapsRouteEmbedUrl(tour.mapStops);
	const tourGallery = tour.gallery || [];
	const priceRows = [
		[copy.travellers2, `€${tour.price.toLocaleString()}`],
		[copy.travellers34, `€${Math.round(tour.price * 0.85).toLocaleString()}`],
		[copy.travellers5plus, `€${Math.round(tour.price * 0.72).toLocaleString()}`],
	];

	return (
		<Layout>
			<Seo
				title={tour.title}
				description={tour.tagline}
				image={tour.image}
				imageAlt={tour.title}
				type="article"
				pageType="TouristTrip"
				preloadImage
				breadcrumbItems={[
					{ routeKey: 'home' },
					{ routeKey: 'tours' },
					{ name: tour.title, path: tourPath },
				]}
				structuredData={[
					buildTourSchema(tour, tourPath, lang),
					buildFaqSchema(FAQS.slice(0, 4)),
					buildImageObjectSchema({ url: tour.image, caption: tour.title }),
				]}
				alternateUrls={alternateUrls}
			/>
			<PageHero title={tour.title} subtitle={tour.tagline} image={tour.image} crumb={tour.category} imageAlt={tour.title} />

			{/* WhatsApp CTA — placed right after the hero so it's reachable in one
			    click before anyone has to scroll through the full page. */}
			<div className="border-b border-border bg-secondary/40">
				<div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-4 px-5 py-5 lg:px-8">
					<div className="flex flex-wrap items-center gap-4 text-sm">
						<Badge icon={Clock}>{tour.duration}</Badge>
						<Badge icon={Users}>{tour.group}</Badge>
						<Badge icon={Star}>4.9 ({copy.verified})</Badge>
					</div>
					<a
						href={waLink(copy.waMessage(tour))}
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white"
					>
						<MessageCircle className="h-5 w-5" /> {copy.bookOnWhatsApp}
					</a>
				</div>
			</div>

			<section className="mx-auto max-w-[70rem] px-5 py-16 lg:px-8">
				<h2 className="font-display text-3xl font-semibold">{copy.highlights}</h2>
				<ul className="mt-4 grid gap-3 sm:grid-cols-2">
					{tour.highlights.map((highlight) => (
						<li key={highlight} className="flex gap-2 text-sm">
							<Star className="mt-0.5 h-4 w-4 shrink-0 fill-gold text-gold" strokeWidth={0} /> {highlight}
						</li>
					))}
				</ul>
			</section>

			<MiniReviews />

			<section className="mx-auto max-w-[70rem] px-5 py-16 lg:px-8">
				<h2 className="font-display text-3xl font-semibold">{copy.overview}</h2>
				<p className="mt-3 text-muted-foreground">{copy.overviewText(tour)}</p>

				<h2 className="mt-10 font-display text-3xl font-semibold">{copy.itinerary}</h2>
				<div className="mt-5 space-y-4">
					{tour.itinerary.map(([day, title, description]) => (
						<div key={day} className="flex gap-4">
							<div className="flex h-fit shrink-0 items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{day}</div>
							<div>
								<h3 className="font-semibold">{title}</h3>
								<p className="mt-1 text-sm text-muted-foreground">{description}</p>
							</div>
						</div>
					))}
				</div>

				{routeEmbedUrl ? (
					<>
						<h2 className="mt-10 font-display text-3xl font-semibold">{copy.googleMaps}</h2>
						<div className="mt-4 overflow-hidden rounded-2xl border border-border">
							<iframe
								src={routeEmbedUrl}
								title={`Route map for ${tour.title}`}
								width="100%"
								height="360"
								loading="lazy"
								style={{ border: 0 }}
								referrerPolicy="no-referrer-when-downgrade"
							/>
						</div>
					</>
				) : null}

				{routeMapUrl && (
					<a
						href={routeMapUrl}
						target="_blank"
						rel="noreferrer"
						className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary"
					>
						{copy.openRouteInMaps}
					</a>
				)}

				{tourGallery.length > 0 && (
					<>
						<h2 className="mt-10 font-display text-3xl font-semibold">{copy.gallery}</h2>
						<div className="mt-5">
							<Gallery images={tourGallery} altPrefix={tour.title} />
						</div>
					</>
				)}

				<h2 className="mt-10 font-display text-3xl font-semibold">{copy.tourFaqs}</h2>
				<Accordion type="single" collapsible className="mt-4">
					{FAQS.slice(0, 4).map(([question, answer], index) => (
						<AccordionItem key={index} value={`t${index}`} className="border-b border-border">
							<AccordionTrigger className="text-left font-medium">{question}</AccordionTrigger>
							<AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</section>

			{/* Pricing & inclusions, then the booking form as its own step right after. */}
			<section className="mx-auto max-w-[70rem] px-5 py-16 lg:px-8">
				<h2 className="font-display text-3xl font-semibold">{copy.pricing}</h2>
				<div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
					<table className="w-full text-sm">
						<thead className="bg-secondary text-left">
							<tr>
								<th className="p-4 font-semibold">{copy.groupSize}</th>
								<th className="p-4 font-semibold">{copy.price}</th>
							</tr>
						</thead>
						<tbody>
							{priceRows.map((row) => (
								<tr key={row[0]} className="border-t border-border">
									<td className="p-4">{row[0]}</td>
									<td className="p-4 font-semibold text-primary">{row[1]}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="mt-6 grid gap-6 sm:grid-cols-2">
					<div className="rounded-xl border border-border bg-card p-6">
						<h3 className="font-display text-xl font-semibold text-primary">{copy.included}</h3>
						<ul className="mt-4 space-y-2">
							{INCLUDED.map((item) => (
								<li key={item} className="flex gap-2 text-sm">
									<Check className="h-4 w-4 shrink-0 text-primary" /> {item}
								</li>
							))}
						</ul>
					</div>
					<div className="rounded-xl border border-border bg-card p-6">
						<h3 className="font-display text-xl font-semibold text-muted-foreground">{copy.notIncluded}</h3>
						<ul className="mt-4 space-y-2">
							{EXCLUDED.map((item) => (
								<li key={item} className="flex gap-2 text-sm text-muted-foreground">
									<X className="h-4 w-4 shrink-0" /> {item}
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			<section className="bg-secondary/40 py-16">
				<div className="mx-auto max-w-[40rem] px-5 lg:px-8">
					<div className="rounded-2xl bg-card p-6 shadow-lg ring-1 ring-border">
						<div className="flex items-baseline gap-2">
							<span className="text-sm text-muted-foreground">{copy.from}</span>
							<span className="font-display text-4xl font-semibold text-primary">€{tour.price.toLocaleString()}</span>
						</div>
						<p className="text-sm text-muted-foreground">{copy.perPerson} · {tour.duration}</p>
						<a href={waLink(copy.waMessage(tour))} target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 font-semibold text-white">
							<MessageCircle className="h-5 w-5" /> {copy.bookOnWhatsApp}
						</a>
						<a href={CONTACT.phoneHref} className="mt-3 flex items-center justify-center gap-2 rounded-full border border-border py-3.5 font-semibold">
							<Phone className="h-5 w-5" /> {copy.callToBook}
						</a>
					</div>
					<div className="mt-6">
						<LeadForm compact title={copy.enquireTitle} subtitle={copy.enquireSubtitle} />
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				<h2 className="font-display text-3xl font-semibold md:text-4xl">{copy.relatedTours}</h2>
				<div className="mt-8 grid gap-7 md:grid-cols-3">
					{related.map((entry, index) => (
						<TourCard key={entry.slug} tour={entry} delay={index * 80} />
					))}
				</div>
			</section>

			<section className="mx-auto max-w-[90rem] px-5 pb-16 lg:px-8">
				<h2 className="font-display text-2xl font-semibold md:text-3xl">{copy.continuePlanning}</h2>
				<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{TOUR_INTERNAL_LINKS.map((entry) => (
						<Link
							key={entry.to}
							to={entry.to}
							className="rounded-xl border border-border bg-card px-5 py-4 text-sm font-medium transition hover:border-primary/40 hover:text-primary"
						>
							{entry.label}
						</Link>
					))}
				</div>
			</section>
			<CTA />
		</Layout>
	);
}

export function ToursListing({ routeKey }) {
	const location = useLocation();
	const lang = useLocale();
	const collection = getTourCollectionByRouteKey(routeKey, lang) || {};
	const { title, subtitle, image, intro, categoryKey } = collection;
	const list = getToursByCategory(categoryKey, lang);
	const shown = list.length ? list : getTours(lang);

	return (
		<Layout>
			<Seo
				title={title}
				description={subtitle}
				image={image}
				pageType="CollectionPage"
				preloadImage
				breadcrumbItems={
					// A collection that *is* /tours shouldn't list itself twice.
					routeKey === 'tours'
						? [{ routeKey: 'home' }, { routeKey: 'tours' }]
						: [{ routeKey: 'home' }, { routeKey: 'tours' }, { name: title, path: location.pathname }]
				}
				structuredData={buildItemListSchema(
					shown.map((entry) => ({ name: entry.title, url: getPath('tourDetail', lang, { slug: entry.slug }) })),
					title,
					lang
				)}
			/>
			<PageHero title={title} subtitle={subtitle} image={image} crumb={getBreadcrumbLabel('tours', lang)} />
			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				{intro && <p className="mx-auto mb-10 max-w-3xl text-center text-lg text-muted-foreground">{intro}</p>}
				<div className="grid gap-7 md:grid-cols-3">
					{shown.map((entry, index) => (
						<TourCard key={entry.slug} tour={entry} delay={(index % 3) * 80} />
					))}
				</div>
			</section>
			<MiniReviews />
			<CTA />
		</Layout>
	);
}