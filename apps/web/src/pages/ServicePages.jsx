import React from 'react';
import { Car, Check, MessageCircle, Plane } from 'lucide-react';
import { LeadForm } from '@/components/site';
import { IMG, waLink } from '@/data/site';
import { MiniReviews, Page } from './page-shell';

export function AirportTransfers() {
	return (
		<Page title="Private airport transfers across Morocco" subtitle="Fixed-price, meet-and-greet transfers in comfort and safety." image={IMG.atlas} crumb="Services">
			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				<div className="grid gap-10 lg:grid-cols-2 lg:items-center">
					<div>
						<Plane className="h-10 w-10 text-primary" />
						<h2 className="mt-4 font-display text-3xl font-semibold">Arrive relaxed, not stressed</h2>
						<p className="mt-3 text-muted-foreground">Skip the taxi queues and haggling. Your professional driver will be waiting at arrivals with a name board, ready to whisk you to your riad or hotel in a spotless, air-conditioned vehicle.</p>
						<ul className="mt-6 grid gap-3 sm:grid-cols-2">
							{['Meet & greet at arrivals', 'Fixed, transparent pricing', 'All Moroccan airports covered', 'Child seats on request', 'Flight tracking included', '24/7 availability'].map((feature) => (
								<li key={feature} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" /> {feature}</li>
							))}
						</ul>
						<a href={waLink('Hi! I need an airport transfer in Morocco.')} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground">
							<MessageCircle className="h-5 w-5" /> Book a transfer
						</a>
					</div>
					<img src={IMG.guide} alt="Private driver in Morocco" className="rounded-3xl shadow-xl" />
				</div>
			</section>
		</Page>
	);
}

export function PrivateDrivers() {
	return (
		<Page title="Your personal driver-guide in Morocco" subtitle="Explore at your own pace with a trusted local at the wheel." image={IMG.guide} crumb="Services">
			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				<div className="grid gap-10 lg:grid-cols-2 lg:items-center">
					<img src={IMG.kasbah} alt="Private driver tour Morocco" className="order-2 rounded-3xl shadow-xl lg:order-1" />
					<div className="order-1 lg:order-2">
						<Car className="h-10 w-10 text-primary" />
						<h2 className="mt-4 font-display text-3xl font-semibold">More than a driver — a local friend</h2>
						<p className="mt-3 text-muted-foreground">Our English-speaking driver-guides know every road, every viewpoint and every hidden gem. Enjoy total flexibility: stop where you like, linger where you love, and travel with complete peace of mind.</p>
						<ul className="mt-6 grid gap-3 sm:grid-cols-2">
							{['Fluent English-speaking guides', 'Modern, comfortable vehicles', 'Flexible daily itineraries', 'Local insight & recommendations', 'Multi-day availability', 'Fully licensed & insured'].map((feature) => (
								<li key={feature} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" /> {feature}</li>
							))}
						</ul>
						<a href={waLink('Hi! I would like to hire a private driver in Morocco.')} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground">
							<MessageCircle className="h-5 w-5" /> Hire a driver
						</a>
					</div>
				</div>
			</section>
		</Page>
	);
}

export function CustomTours() {
	return (
		<Page title="Your Morocco, tailor-made" subtitle="Tell us your dream and we'll design a bespoke itinerary around it." image={IMG.duneSunset} crumb="Custom Tours">
			<section className="mx-auto grid max-w-[90rem] gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8">
				<div>
					<h2 className="font-display text-3xl font-semibold">No two travellers are the same</h2>
					<p className="mt-3 text-muted-foreground">Whether it's a romantic honeymoon, a multi-generational family adventure or a photography-focused expedition, our trip designers build every journey from scratch — matched to your interests, pace and budget (from €600 to €3,500+).</p>
					<div className="mt-8 space-y-4">
						{[['Share your vision', 'Dates, interests, travel style and budget.'], ['Receive your custom plan', 'A detailed itinerary and transparent quote within 24 hours.'], ['Refine & confirm', "We adjust until it's perfect, then secure your dates."], ['Travel worry-free', 'Full concierge support before and throughout your trip.']].map(([title, description], index) => (
							<div key={title} className="flex gap-4">
								<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">{index + 1}</div>
								<div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{description}</p></div>
							</div>
						))}
					</div>
				</div>
				<LeadForm title="Design my custom trip" subtitle="Free, no-obligation itinerary in 24 hours." />
			</section>
			<MiniReviews />
		</Page>
	);
}