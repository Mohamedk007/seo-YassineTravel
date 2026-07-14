import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, MessageCircle, Phone, Quote } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LeadForm, Reveal, Stars } from '@/components/site';
import { CONTACT, FAQS, IMG, REVIEWS, waLink } from '@/data/site';
import { MiniReviews, Page, Prose } from './page-shell';

const GALLERY = [IMG.duneSunset, IMG.luxCamp, IMG.fesDoor, IMG.camel, IMG.riad, IMG.tagine, IMG.chefchaouen, IMG.marrakech, IMG.couple, IMG.kasbah, IMG.atlas, IMG.guide];

export function About() {
	return (
		<Page title="A family of Moroccan storytellers" subtitle="Local experts crafting extraordinary journeys since 2011." image={IMG.guide} crumb="About Us">
			<Prose>
				<p className="text-lg text-foreground">Morocco Trip Holidays was founded by a family of born-and-raised Moroccans with a simple belief: that the finest way to experience our country is privately, authentically, and in complete comfort.</p>
				<p>For over thirteen years we have welcomed travellers from the United States, United Kingdom, Canada, Australia and across Europe — designing bespoke journeys that blend five-star luxury with the genuine warmth of Moroccan hospitality. Our guides are not just drivers; they are historians, translators and friends who open doors ordinary tourists never see.</p>
				<p>From the golden dunes of the Sahara to the labyrinthine medinas of Fes and Marrakech, every itinerary is handcrafted around you. We handle every detail — luxury riads, private transfers, expert guides and 24/7 concierge support — so all you have to do is fall in love with Morocco.</p>
			</Prose>
			<section className="mx-auto max-w-[90rem] px-5 pb-16 lg:px-8">
				<div className="grid gap-4 sm:grid-cols-3">
					{[[IMG.riad, 'Handpicked stays'], [IMG.camel, 'Authentic experiences'], [IMG.tagine, 'Local cuisine']].map(([src, caption]) => (
						<div key={caption} className="overflow-hidden rounded-2xl">
							<img src={src} alt={caption} className="aspect-[4/3] w-full object-cover" />
						</div>
					))}
				</div>
			</section>
			<MiniReviews />
		</Page>
	);
}

export function Destinations() {
	const destinations = [
		[IMG.marrakech, 'Marrakech', 'The Red City — palaces, souks and the electric Jemaa el-Fnaa.'],
		[IMG.fesDoor, 'Fes', "The spiritual heart, home to the world's largest living medieval medina."],
		[IMG.duneSunset, 'Merzouga Sahara', 'Towering Erg Chebbi dunes and unforgettable luxury desert camps.'],
		[IMG.chefchaouen, 'Chefchaouen', 'The dreamy blue-washed mountain town of the Rif.'],
		[IMG.kasbah, 'Ait Benhaddou', 'The iconic UNESCO kasbah and gateway to the desert.'],
		[IMG.atlas, 'Atlas Mountains', 'Berber villages, dramatic passes and snow-capped peaks.'],
	];

	return (
		<Page title="Where Morocco will take you" subtitle="Iconic cities, sweeping deserts and mountain hideaways." image={IMG.chefchaouen} crumb="Destinations">
			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				<div className="grid gap-6 md:grid-cols-3">
					{destinations.map(([src, name, text], index) => (
						<Reveal key={name} delay={(index % 3) * 80} className="group relative overflow-hidden rounded-2xl">
							<img src={src} alt={name} className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105" />
							<div className="hero-gradient absolute inset-0" />
							<div className="absolute bottom-0 p-6 text-white">
								<h3 className="font-display text-2xl font-semibold">{name}</h3>
								<p className="mt-1 text-sm text-white/80">{text}</p>
							</div>
						</Reveal>
					))}
				</div>
			</section>
		</Page>
	);
}

export function Gallery() {
	return (
		<Page title="Moments from Morocco" subtitle="A glimpse of the journeys that await you." image={IMG.couple} crumb="Gallery">
			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				<div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
					{GALLERY.map((src, index) => (
						<img key={index} src={src} alt="Morocco gallery" className="w-full break-inside-avoid rounded-xl object-cover" loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" />
					))}
				</div>
			</section>
		</Page>
	);
}

export function Reviews() {
	return (
		<Page title="Trusted by travellers worldwide" subtitle="4.9/5 from 1,200+ verified reviews across Google & TripAdvisor." image={IMG.couple} crumb="Reviews">
			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{[...REVIEWS, ...REVIEWS].map((review, index) => (
						<Reveal key={index} delay={(index % 3) * 70} className="rounded-2xl bg-card p-7 shadow-sm ring-1 ring-border">
							<Quote className="h-8 w-8 text-primary/20" />
							<Stars className="mt-2" />
							<p className="mt-3 text-sm text-foreground/90">“{review.text}”</p>
							<p className="mt-4 text-sm font-semibold">{review.name} · <span className="font-normal text-muted-foreground">{review.country}</span></p>
							<p className="text-xs text-muted-foreground">{review.tour}</p>
						</Reveal>
					))}
				</div>
			</section>
		</Page>
	);
}

export function Faq() {
	return (
		<Page title="Frequently asked questions" subtitle="Everything you need to know before you travel." image={IMG.fesDoor} crumb="FAQ">
			<section className="mx-auto max-w-[56rem] px-5 py-16 lg:px-8">
				<Accordion type="single" collapsible>
					{FAQS.map(([question, answer], index) => (
						<AccordionItem key={index} value={`q${index}`} className="border-b border-border">
							<AccordionTrigger className="text-left font-display text-lg font-medium">{question}</AccordionTrigger>
							<AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</section>
		</Page>
	);
}

export function Blog() {
	const posts = [
		[IMG.duneSunset, 'The ultimate guide to a luxury Sahara desert night', 'Desert', 'Everything you need to know about staying in a five-star Moroccan desert camp.'],
		[IMG.marrakech, '3 perfect days in Marrakech', 'City Guide', 'How to experience the Red City like an insider, from souks to rooftop dining.'],
		[IMG.tagine, "A food lover's journey through Morocco", 'Food', 'Tagines, pastilla and mint tea — the flavours that define Moroccan cuisine.'],
		[IMG.chefchaouen, 'Why Chefchaouen belongs on your itinerary', 'Destinations', "The story behind Morocco's enchanting blue city."],
		[IMG.atlas, 'Best time to visit Morocco', 'Planning', 'A month-by-month guide to weather, festivals and crowds.'],
		[IMG.riad, 'How to choose the perfect riad', 'Luxury', 'What sets a truly special Moroccan riad apart.'],
	];

	return (
		<Page title="The Morocco journal" subtitle="Insider guides, travel tips and stories from the road." image={IMG.marrakech} crumb="Blog">
			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				<div className="grid gap-7 md:grid-cols-3">
					{posts.map(([src, title, category, text], index) => (
						<Reveal key={title} delay={(index % 3) * 80} className="group overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-lg">
							<div className="aspect-[16/10] overflow-hidden">
								<img src={src} alt={title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
							</div>
							<div className="p-6">
								<span className="text-xs font-semibold uppercase tracking-wider text-primary">{category}</span>
								<h3 className="mt-2 font-display text-xl font-semibold leading-snug">{title}</h3>
								<p className="mt-2 text-sm text-muted-foreground">{text}</p>
								<span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Read more <ArrowRight className="h-4 w-4" /></span>
							</div>
						</Reveal>
					))}
				</div>
			</section>
		</Page>
	);
}

export function TravelGuide() {
	const tips = [
		['Best time to visit', 'Spring (Mar–May) and autumn (Sep–Nov) offer ideal weather across the country.'],
		['Getting around', 'We provide private air-conditioned vehicles with professional driver-guides — no stress, no logistics.'],
		['What to pack', 'Light layers, comfortable shoes, sun protection and a warm layer for chilly desert nights.'],
		['Money & tipping', 'The dirham (MAD) is the local currency. Tipping is appreciated but never obligatory.'],
		['Culture & etiquette', 'Dress modestly at religious sites, greet with a smile, and always accept the mint tea.'],
		['Health & safety', 'Morocco is very safe for tourists. Drink bottled water and travel with basic sun and stomach remedies.'],
	];

	return (
		<Page title="Your essential Morocco travel guide" subtitle="Practical, insider know-how for a flawless trip." image={IMG.atlas} crumb="Travel Guide">
			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{tips.map(([title, description], index) => (
						<Reveal key={title} delay={(index % 3) * 70} className="rounded-2xl border border-border bg-card p-7">
							<Compass className="h-8 w-8 text-primary" />
							<h3 className="mt-3 font-display text-xl font-semibold">{title}</h3>
							<p className="mt-2 text-sm text-muted-foreground">{description}</p>
						</Reveal>
					))}
				</div>
			</section>
		</Page>
	);
}

export function Contact() {
	return (
		<Page title="Let's plan your Morocco adventure" subtitle="Reach out any time — we reply within 24 hours, usually much sooner." image={IMG.riad} crumb="Contact">
			<section className="mx-auto grid max-w-[90rem] gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8">
				<div>
					<h2 className="font-display text-3xl font-semibold">Get in touch</h2>
					<p className="mt-3 text-muted-foreground">Whether you have a quick question or want a full custom itinerary, our local team is here to help.</p>
					<div className="mt-8 space-y-4">
						<a href={CONTACT.phoneHref} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition hover:shadow-md">
							<Phone className="h-6 w-6 text-primary" />
							<div><div className="font-semibold">Call us</div><div className="text-sm text-muted-foreground">{CONTACT.phone}</div></div>
						</a>
						<a href={waLink()} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition hover:shadow-md">
							<MessageCircle className="h-6 w-6 text-[#25D366]" />
							<div><div className="font-semibold">WhatsApp</div><div className="text-sm text-muted-foreground">Chat with a local expert now</div></div>
						</a>
						<a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition hover:shadow-md">
							<Compass className="h-6 w-6 text-primary" />
							<div><div className="font-semibold">Visit / write</div><div className="text-sm text-muted-foreground">{CONTACT.address}</div></div>
						</a>
					</div>
					<div className="mt-6 overflow-hidden rounded-2xl border border-border">
						<iframe title="Office map" className="h-64 w-full" loading="lazy" src="https://www.google.com/maps?q=Marrakech,Morocco&output=embed" />
					</div>
				</div>
				<LeadForm title="Send us a message" subtitle="We'll craft your free itinerary within 24 hours." />
			</section>
		</Page>
	);
}