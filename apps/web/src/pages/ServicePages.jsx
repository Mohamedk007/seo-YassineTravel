import React from 'react';
import { Car, Check, MessageCircle, Plane } from 'lucide-react';
import { LeadForm } from '@/components/site/LeadForm';
import { waLink } from '@/data/contact';
import {
	AIRPORT_TRANSFER_FEATURES,
	AIRPORT_TRANSFER_PAGE,
	CUSTOM_TOUR_STEPS,
	CUSTOM_TOURS_PAGE,
	PRIVATE_DRIVER_FEATURES,
	PRIVATE_DRIVER_PAGE,
} from '@/data/services';
import { MiniReviews, Page } from './page-shell';

export function AirportTransfers() {
	return (
		<Page title={AIRPORT_TRANSFER_PAGE.title} subtitle={AIRPORT_TRANSFER_PAGE.subtitle} image={AIRPORT_TRANSFER_PAGE.image} crumb={AIRPORT_TRANSFER_PAGE.crumb}>
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
						<a href={waLink(AIRPORT_TRANSFER_PAGE.ctaMessage)} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground">
							<MessageCircle className="h-5 w-5" /> {AIRPORT_TRANSFER_PAGE.ctaLabel}
						</a>
					</div>
					<img src={AIRPORT_TRANSFER_PAGE.imageSecondary} alt={AIRPORT_TRANSFER_PAGE.imageAlt} className="rounded-3xl shadow-xl" />
				</div>
			</section>
		</Page>
	);
}

export function PrivateDrivers() {
	return (
		<Page title={PRIVATE_DRIVER_PAGE.title} subtitle={PRIVATE_DRIVER_PAGE.subtitle} image={PRIVATE_DRIVER_PAGE.image} crumb={PRIVATE_DRIVER_PAGE.crumb}>
			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				<div className="grid gap-10 lg:grid-cols-2 lg:items-center">
					<img src={PRIVATE_DRIVER_PAGE.imageSecondary} alt={PRIVATE_DRIVER_PAGE.imageAlt} className="order-2 rounded-3xl shadow-xl lg:order-1" />
					<div className="order-1 lg:order-2">
						<Car className="h-10 w-10 text-primary" />
						<h2 className="mt-4 font-display text-3xl font-semibold">{PRIVATE_DRIVER_PAGE.heading}</h2>
						<p className="mt-3 text-muted-foreground">{PRIVATE_DRIVER_PAGE.description}</p>
						<ul className="mt-6 grid gap-3 sm:grid-cols-2">
							{PRIVATE_DRIVER_FEATURES.map((feature) => (
								<li key={feature} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" /> {feature}</li>
							))}
						</ul>
						<a href={waLink(PRIVATE_DRIVER_PAGE.ctaMessage)} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground">
							<MessageCircle className="h-5 w-5" /> {PRIVATE_DRIVER_PAGE.ctaLabel}
						</a>
					</div>
				</div>
			</section>
		</Page>
	);
}

export function CustomTours() {
	return (
		<Page title={CUSTOM_TOURS_PAGE.title} subtitle={CUSTOM_TOURS_PAGE.subtitle} image={CUSTOM_TOURS_PAGE.image} crumb={CUSTOM_TOURS_PAGE.crumb}>
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