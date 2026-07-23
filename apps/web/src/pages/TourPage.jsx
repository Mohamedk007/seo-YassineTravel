import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { ArrowRight, Check, Clock, MessageCircle, Phone, Play, Star, Users, X } from 'lucide-react';
import { LeadForm } from '@/components/site/LeadForm';
import { Layout } from '@/components/site/Layout';
import { PageHero } from '@/components/site/PageHero';
import { Seo } from '@/components/site/Seo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CONTACT, waLink } from '@/data/contact';
import { getFaqs } from '@/data/content';
import { IMG } from '@/data/images';
import { getTourInternalLinks } from '@/data/internal-links';
import { useLocale } from '@/i18n/LocaleContext';
import { getPath, getRoutePaths } from '../data/route-config';
import { getExcluded, getIncluded, getTours } from '@/data/tours/catalog';
import { getRelatedTours, getTourBySlug, getToursByCategory, getTourCollectionByRouteKey, getTourTranslations } from '@/data/tours/index';
import { SITE_BRAND } from '@/data/site-config';
import { buildFaqSchema, buildItemListSchema, buildTourSchema } from '@/seo/schemas';
import { TourCard } from '../components/tours/TourCard';
import { CTA, MiniReviews } from './page-shell';

function Badge({ icon: Icon, children }) {
	return (
		<span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 font-medium">
			<Icon className="h-4 w-4 text-primary" /> {children}
		</span>
	);
}

export function TourDetail() {
	const lang = useLocale();
	const FAQS = getFaqs(lang);
	const [showGallery, setShowGallery] = useState(false);
	const galleryRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setShowGallery(true);
					observer.disconnect();
				}
			},
			{ rootMargin: '200px' }
		);

		if (galleryRef.current) {
			observer.observe(galleryRef.current);
		}

		return () => observer.disconnect();
	}, []);

	const { slug } = useParams();
	const tour = getTourBySlug(slug, lang);
	const P = getRoutePaths(lang);

	if (!tour) return <Navigate to={P.tours} replace />;

	const related = getRelatedTours(slug, lang);
	const INCLUDED = getIncluded(lang);
	const EXCLUDED = getExcluded(lang);
	const tourPath = getPath('tourDetail', lang, { slug: tour.slug });
	const TOUR_INTERNAL_LINKS = getTourInternalLinks(lang);
	const tourTranslations = getTourTranslations(tour.id);
	const alternateUrls = Object.fromEntries(
		Object.entries(tourTranslations).map(([code, translated]) => {
			const path = getPath('tourDetail', code, { slug: translated.slug });
			return [code, `${SITE_BRAND.origin}/${code}${path}`];
		})
	);
	const priceRows = [
		['2 travellers', `€${tour.price.toLocaleString()}`, 'per person'],
		['3–4 travellers', `€${Math.round(tour.price * 0.85).toLocaleString()}`, 'per person'],
		['5+ travellers', `€${Math.round(tour.price * 0.72).toLocaleString()}`, 'per person'],
	];

	return (
		<Layout>
			<Seo
				title={tour.title}
				description={tour.tagline}
				pageType="TouristTrip"
				breadcrumbItems={[
					{ name: 'Home', url: P.home },
					{ name: 'Tours', url: P.tours },
					{ name: tour.title, url: tourPath },
				]}
				structuredData={[
					buildTourSchema(tour, tourPath),
					buildFaqSchema(FAQS.slice(0, 4)),
				]}
				alternateUrls={alternateUrls}
			/>
			<PageHero title={tour.title} subtitle={tour.tagline} image={tour.image} crumb={tour.category} />

			<section className="mx-auto grid max-w-[90rem] gap-12 px-5 py-16 lg:grid-cols-[1.6fr_1fr] lg:px-8">
				<div>
					<div className="flex flex-wrap gap-4 text-sm">
						<Badge icon={Clock}>{tour.duration}</Badge>
						<Badge icon={Users}>{tour.group}</Badge>
						<Badge icon={Star}>4.9 (verified)</Badge>
					</div>

					<h2 className="mt-8 font-display text-3xl font-semibold">Overview</h2>
					<p className="mt-3 text-muted-foreground">Discover the very best of Morocco on this {tour.duration.toLowerCase()} private journey. {tour.tagline} Travelling with your own driver-guide, you will move at your own pace, staying in handpicked luxury accommodation and enjoying privileged access to Morocco&apos;s most iconic sights and hidden gems.</p>

					<h2 className="mt-10 font-display text-3xl font-semibold">Highlights</h2>
					<ul className="mt-4 grid gap-3 sm:grid-cols-2">
						{tour.highlights.map((highlight) => (
							<li key={highlight} className="flex gap-2 text-sm">
								<Star className="mt-0.5 h-4 w-4 shrink-0 fill-gold text-gold" strokeWidth={0} /> {highlight}
							</li>
						))}
					</ul>

					<h2 className="mt-10 font-display text-3xl font-semibold">Detailed itinerary</h2>
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

					<h2 className="mt-10 font-display text-3xl font-semibold">Pricing</h2>
					<div className="mt-4 overflow-hidden rounded-xl border border-border">
						<table className="w-full text-sm">
							<thead className="bg-secondary text-left">
								<tr>
									<th className="p-4 font-semibold">Group size</th>
									<th className="p-4 font-semibold">Price</th>
									<th className="p-4 font-semibold"></th>
								</tr>
							</thead>
							<tbody>
								{priceRows.map((row) => (
									<tr key={row[0]} className="border-t border-border">
										<td className="p-4">{row[0]}</td>
										<td className="p-4 font-semibold text-primary">{row[1]}</td>
										<td className="p-4 text-muted-foreground">{row[2]}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className="mt-10 grid gap-6 sm:grid-cols-2">
						<div className="rounded-xl border border-border bg-card p-6">
							<h3 className="font-display text-xl font-semibold text-primary">What&apos;s included</h3>
							<ul className="mt-4 space-y-2">
								{INCLUDED.map((item) => (
									<li key={item} className="flex gap-2 text-sm">
										<Check className="h-4 w-4 shrink-0 text-primary" /> {item}
									</li>
								))}
							</ul>
						</div>
						<div className="rounded-xl border border-border bg-card p-6">
							<h3 className="font-display text-xl font-semibold text-muted-foreground">Not included</h3>
							<ul className="mt-4 space-y-2">
								{EXCLUDED.map((item) => (
									<li key={item} className="flex gap-2 text-sm text-muted-foreground">
										<X className="h-4 w-4 shrink-0" /> {item}
									</li>
								))}
							</ul>
						</div>
					</div>

					<section ref={galleryRef}>
						<h2>Gallery</h2>
						{showGallery ? (
							<div className="grid grid-cols-3 gap-3">
								{[tour.image, IMG.riad, IMG.tagine, IMG.camel, IMG.kasbah, IMG.chefchaouen].map((image, index) => (
									<img key={index} src={image} alt={`${tour.title} ${index + 1}`} className="aspect-square w-full rounded-xl object-cover" loading="lazy" decoding="async" />
								))}
							</div>
						) : (
							<div className="grid grid-cols-3 gap-3">
								{Array.from({ length: 6 }).map((_, index) => (
									<div key={index} className="aspect-square animate-pulse rounded-xl bg-gray-200" />
								))}
							</div>
						)}
					</section>

					<h2 className="mt-10 font-display text-3xl font-semibold">Video</h2>
					<div className="relative mt-4 flex aspect-video items-center justify-center overflow-hidden rounded-xl">
						<img src={IMG.duneSunset} alt="Tour video" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
						<div className="absolute inset-0 bg-ink/40" />
						<button className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-xl transition hover:scale-105">
							<Play className="h-7 w-7 fill-current" />
						</button>
					</div>

					<h2 className="mt-10 font-display text-3xl font-semibold">Where you&apos;ll travel</h2>
					<div className="mt-4 overflow-hidden rounded-xl border border-border">
						<iframe title="Tour map" className="h-72 w-full" loading="lazy" src="https://www.google.com/maps?q=Morocco&output=embed" />
					</div>

					<h2 className="mt-10 font-display text-3xl font-semibold">Tour FAQs</h2>
					<Accordion type="single" collapsible className="mt-4">
						{FAQS.slice(0, 4).map(([question, answer], index) => (
							<AccordionItem key={index} value={`t${index}`} className="border-b border-border">
								<AccordionTrigger className="text-left font-medium">{question}</AccordionTrigger>
								<AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>

				<aside className="lg:sticky lg:top-24 lg:self-start">
					<div className="rounded-2xl bg-card p-6 shadow-lg ring-1 ring-border">
						<div className="flex items-baseline gap-2">
							<span className="text-sm text-muted-foreground">from</span>
							<span className="font-display text-4xl font-semibold text-primary">€{tour.price.toLocaleString()}</span>
						</div>
						<p className="text-sm text-muted-foreground">per person · {tour.duration}</p>
						<a href={waLink(`Hi! I'm interested in the "${tour.title}" tour.`)} target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 font-semibold text-white">
							<MessageCircle className="h-5 w-5" /> Book on WhatsApp
						</a>
						<a href={CONTACT.phoneHref} className="mt-3 flex items-center justify-center gap-2 rounded-full border border-border py-3.5 font-semibold">
							<Phone className="h-5 w-5" /> Call to book
						</a>
					</div>
					<div className="mt-6">
						<LeadForm compact title="Enquire about this tour" subtitle="Free quote within 24 hours." />
					</div>
				</aside>
			</section>

			<MiniReviews />

			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				<h2 className="font-display text-3xl font-semibold md:text-4xl">Related tours</h2>
				<div className="mt-8 grid gap-7 md:grid-cols-3">
					{related.map((entry, index) => (
						<TourCard key={entry.slug} tour={entry} delay={index * 80} />
					))}
				</div>
			</section>

			<section className="mx-auto max-w-[90rem] px-5 pb-16 lg:px-8">
				<h2 className="font-display text-2xl font-semibold md:text-3xl">Continue planning your trip</h2>
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
	const P = getRoutePaths(lang);
	const collection = getTourCollectionByRouteKey(routeKey, lang) || {};
	const { title, subtitle, image, intro, categoryKey } = collection;
	const list = getToursByCategory(categoryKey, lang);
	const shown = list.length ? list : getTours(lang);

	return (
		<Layout>
			<Seo
				title={title}
				description={subtitle}
				pageType="CollectionPage"
				breadcrumbItems={[
					{ name: 'Home', url: P.home },
					{ name: 'Tours', url: P.tours },
					{ name: title, url: location.pathname },
				]}
				structuredData={buildItemListSchema(
					shown.map((entry) => ({ name: entry.title, url: getPath('tourDetail', lang, { slug: entry.slug }) })),
					title
				)}
			/>
			<PageHero title={title} subtitle={subtitle} image={image} crumb="Morocco Tours" />
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