import React from 'react';
import { Car, Check, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LeadForm } from '@/components/site/LeadForm';
import { WhatsAppCtaButton } from '@/components/site/WhatsAppCtaButton';
import { AIRPORTS } from '@/data/airports';
import { getServicesContent } from '@/data/services';
import { getPath, getRoutePaths } from '@/data/route-config';
import { buildItemListSchema, buildServiceSchema } from '@/seo/schemas';
import { useLocale } from '@/i18n/LocaleContext';
import { MiniReviews, Page } from './page-shell';

export function AirportTransfers() {
	const lang = useLocale();
	const AIRPORT_TRANSFER_PAGE = getServicesContent('AIRPORT_TRANSFER_PAGE', lang);
	const AIRPORT_TRANSFER_FEATURES = getServicesContent('AIRPORT_TRANSFER_FEATURES', lang);
	return (
		<Page
			title={AIRPORT_TRANSFER_PAGE.title}
			subtitle={AIRPORT_TRANSFER_PAGE.subtitle}
			image={AIRPORT_TRANSFER_PAGE.image}
			crumb={AIRPORT_TRANSFER_PAGE.crumb}
			pageType="CollectionPage"
			structuredData={[
				buildServiceSchema({
					name: AIRPORT_TRANSFER_PAGE.title,
					description: AIRPORT_TRANSFER_PAGE.subtitle,
					path: getRoutePaths(lang).airportTransfers,
				}),
				buildItemListSchema(
					AIRPORTS.map((airport) => ({ name: airport.name, url: getPath('airportTransferDetail', lang, { slug: airport.slug }) })),
					AIRPORT_TRANSFER_PAGE.title,
				),
			]}
		>
			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
					<div className="grid gap-10 lg:grid-cols-2 lg:items-center">
						<div>
							<Plane className="h-10 w-10 text-primary" />
							<h2 className="mt-4 font-display text-3xl font-semibold">{AIRPORT_TRANSFER_PAGE.heading}</h2>
							<p className="mt-3 text-muted-foreground">{AIRPORT_TRANSFER_PAGE.description}</p>
							<ul className="mt-6 grid gap-3 sm:grid-cols-2">
								{AIRPORT_TRANSFER_FEATURES.map((feature) => (
									<li key={feature} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" /> {feature}</li>
								))}
							</ul>
							<WhatsAppCtaButton message={AIRPORT_TRANSFER_PAGE.ctaMessage}>{AIRPORT_TRANSFER_PAGE.ctaLabel}</WhatsAppCtaButton>
						</div>
						<img src={AIRPORT_TRANSFER_PAGE.imageSecondary} alt={AIRPORT_TRANSFER_PAGE.imageAlt} width={740} height={494} className="rounded-3xl shadow-xl" loading="lazy" decoding="async" />
						</div>

					<div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{AIRPORTS.map((airport) => (
							<Link key={airport.slug} to={`/airport-transfers/${airport.slug}`} className="group overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl">
								<div className="relative aspect-[4/3] overflow-hidden">
									<img
										src={airport.image}
										alt={`${airport.city} airport transfer`}
										className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
										loading="lazy"
										decoding="async"
										sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
									/>
									<div className="hero-gradient absolute inset-0" />
									<span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{airport.code}</span>
									<span className="absolute bottom-3 right-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">Airport transfer</span>
								</div>
								<div className="p-6">
									<div className="flex items-center justify-between gap-4">
										<div>
											<h3 className="font-display text-2xl font-semibold">{airport.city}</h3>
											<p className="mt-2 text-sm text-muted-foreground">{airport.name}</p>
										</div>
										<Plane className="h-8 w-8 shrink-0 text-primary/70 transition group-hover:text-primary" />
									</div>
									<p className="mt-4 text-sm font-semibold text-primary">Book transfer</p>
								</div>
							</Link>
						))}
					</div>
			</section>
		</Page>
	);
}

export function PrivateDrivers() {
	const lang = useLocale();
	const PRIVATE_DRIVER_PAGE = getServicesContent('PRIVATE_DRIVER_PAGE', lang);
	const PRIVATE_DRIVER_FEATURES = getServicesContent('PRIVATE_DRIVER_FEATURES', lang);
	return (
		<Page
			title={PRIVATE_DRIVER_PAGE.title}
			subtitle={PRIVATE_DRIVER_PAGE.subtitle}
			image={PRIVATE_DRIVER_PAGE.image}
			crumb={PRIVATE_DRIVER_PAGE.crumb}
			pageType="Service"
			structuredData={buildServiceSchema({
				name: PRIVATE_DRIVER_PAGE.title,
				description: PRIVATE_DRIVER_PAGE.subtitle,
				path: getRoutePaths(lang).privateDrivers,
			})}
		>
			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				<div className="grid gap-10 lg:grid-cols-2 lg:items-center">
					<img src={PRIVATE_DRIVER_PAGE.imageSecondary} alt={PRIVATE_DRIVER_PAGE.imageAlt} width={1344} height={768} className="order-2 rounded-3xl shadow-xl lg:order-1" loading="lazy" decoding="async" />
					<div className="order-1 lg:order-2">
						<Car className="h-10 w-10 text-primary" />
						<h2 className="mt-4 font-display text-3xl font-semibold">{PRIVATE_DRIVER_PAGE.heading}</h2>
						<p className="mt-3 text-muted-foreground">{PRIVATE_DRIVER_PAGE.description}</p>
						<ul className="mt-6 grid gap-3 sm:grid-cols-2">
							{PRIVATE_DRIVER_FEATURES.map((feature) => (
								<li key={feature} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" /> {feature}</li>
							))}
						</ul>
							<WhatsAppCtaButton message={PRIVATE_DRIVER_PAGE.ctaMessage}>{PRIVATE_DRIVER_PAGE.ctaLabel}</WhatsAppCtaButton>
					</div>
				</div>
			</section>
		</Page>
	);
}

export function CustomTours() {
	const lang = useLocale();
	const CUSTOM_TOURS_PAGE = getServicesContent('CUSTOM_TOURS_PAGE', lang);
	const CUSTOM_TOUR_STEPS = getServicesContent('CUSTOM_TOUR_STEPS', lang);
	return (
		<Page
			title={CUSTOM_TOURS_PAGE.title}
			subtitle={CUSTOM_TOURS_PAGE.subtitle}
			image={CUSTOM_TOURS_PAGE.image}
			crumb={CUSTOM_TOURS_PAGE.crumb}
			pageType="Service"
			structuredData={buildServiceSchema({
				name: CUSTOM_TOURS_PAGE.title,
				description: CUSTOM_TOURS_PAGE.subtitle,
				path: getRoutePaths(lang).customTours,
			})}
		>
			<section className="mx-auto grid max-w-[90rem] gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8">
				<div>
					<h2 className="font-display text-3xl font-semibold">{CUSTOM_TOURS_PAGE.heading}</h2>
					<p className="mt-3 text-muted-foreground">{CUSTOM_TOURS_PAGE.description}</p>
					<div className="mt-8 space-y-4">
						{CUSTOM_TOUR_STEPS.map(([title, description], index) => (
							<div key={title} className="flex gap-4">
								<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">{index + 1}</div>
								<div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{description}</p></div>
							</div>
						))}
					</div>
				</div>
				<LeadForm title={CUSTOM_TOURS_PAGE.formTitle} subtitle={CUSTOM_TOURS_PAGE.formSubtitle} />
			</section>
			<MiniReviews />
		</Page>
	);
}