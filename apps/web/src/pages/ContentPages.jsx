import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, MessageCircle, Phone, Quote } from 'lucide-react';
import { LeadForm } from '@/components/site/LeadForm';
import { Reveal } from '@/components/site/Reveal';
import { Stars } from '@/components/site/Typography';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CONTACT, waLink } from '@/data/contact';
import { FAQS, REVIEWS } from '@/data/content';
import { DESTINATION_HIGHLIGHTS } from '@/data/destinations';
import {
	ABOUT_PAGE,
	BLOG_PAGE,
	CONTACT_PAGE,
	DESTINATIONS_PAGE,
	FAQ_PAGE,
	GALLERY_PAGE,
	REVIEWS_PAGE,
	TRAVEL_GUIDE_PAGE,
} from '@/data/editorial';
import { MiniReviews, Page, Prose } from './page-shell';

export function About() {
	return (
		<Page title={ABOUT_PAGE.title} subtitle={ABOUT_PAGE.subtitle} image={ABOUT_PAGE.image} crumb={ABOUT_PAGE.crumb}>
			<Prose>
				{ABOUT_PAGE.paragraphs.map((paragraph, index) => (
					<p key={paragraph} className={index === 0 ? 'text-lg text-foreground' : undefined}>{paragraph}</p>
				))}
			</Prose>
			<section className="mx-auto max-w-[90rem] px-5 pb-16 lg:px-8">
				<div className="grid gap-4 sm:grid-cols-3">
					{ABOUT_PAGE.highlights.map((item) => (
						<div key={item.caption} className="overflow-hidden rounded-2xl">
							<img src={item.image} alt={item.caption} className="aspect-[4/3] w-full object-cover" />
						</div>
					))}
				</div>
			</section>
			<MiniReviews />
		</Page>
	);
}

export function Destinations() {
	return (
		<Page title={DESTINATIONS_PAGE.title} subtitle={DESTINATIONS_PAGE.subtitle} image={DESTINATIONS_PAGE.image} crumb={DESTINATIONS_PAGE.crumb}>
			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				<div className="grid gap-6 md:grid-cols-3">
					{DESTINATION_HIGHLIGHTS.map((destination, index) => (
						<Reveal key={destination.name} delay={(index % 3) * 80} className="group relative overflow-hidden rounded-2xl">
							<img src={destination.image} alt={destination.name} className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105" />
							<div className="hero-gradient absolute inset-0" />
							<div className="absolute bottom-0 p-6 text-white">
								<h3 className="font-display text-2xl font-semibold">{destination.name}</h3>
								<p className="mt-1 text-sm text-white/80">{destination.summary}</p>
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
		<Page title={GALLERY_PAGE.title} subtitle={GALLERY_PAGE.subtitle} image={GALLERY_PAGE.image} crumb={GALLERY_PAGE.crumb}>
			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				<div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
					{GALLERY_PAGE.images.map((src, index) => (
						<img key={index} src={src} alt="Morocco gallery" className="w-full break-inside-avoid rounded-xl object-cover" loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" />
					))}
				</div>
			</section>
		</Page>
	);
}

export function Reviews() {
	return (
		<Page title={REVIEWS_PAGE.title} subtitle={REVIEWS_PAGE.subtitle} image={REVIEWS_PAGE.image} crumb={REVIEWS_PAGE.crumb}>
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
		<Page title={FAQ_PAGE.title} subtitle={FAQ_PAGE.subtitle} image={FAQ_PAGE.image} crumb={FAQ_PAGE.crumb}>
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
	return (
		<Page title={BLOG_PAGE.title} subtitle={BLOG_PAGE.subtitle} image={BLOG_PAGE.image} crumb={BLOG_PAGE.crumb}>
			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				<div className="grid gap-7 md:grid-cols-3">
					{BLOG_PAGE.posts.map((post, index) => (
						<Reveal key={post.title} delay={(index % 3) * 80} className="group overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-lg">
							<div className="aspect-[16/10] overflow-hidden">
								<img src={post.image} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
							</div>
							<div className="p-6">
								<span className="text-xs font-semibold uppercase tracking-wider text-primary">{post.category}</span>
								<h3 className="mt-2 font-display text-xl font-semibold leading-snug">{post.title}</h3>
								<p className="mt-2 text-sm text-muted-foreground">{post.summary}</p>
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
	return (
		<Page title={TRAVEL_GUIDE_PAGE.title} subtitle={TRAVEL_GUIDE_PAGE.subtitle} image={TRAVEL_GUIDE_PAGE.image} crumb={TRAVEL_GUIDE_PAGE.crumb}>
			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{TRAVEL_GUIDE_PAGE.tips.map((tip, index) => (
						<Reveal key={tip.title} delay={(index % 3) * 70} className="rounded-2xl border border-border bg-card p-7">
							<Compass className="h-8 w-8 text-primary" />
							<h3 className="mt-3 font-display text-xl font-semibold">{tip.title}</h3>
							<p className="mt-2 text-sm text-muted-foreground">{tip.description}</p>
						</Reveal>
					))}
				</div>
			</section>
		</Page>
	);
}

export function Contact() {
	return (
		<Page title={CONTACT_PAGE.title} subtitle={CONTACT_PAGE.subtitle} image={CONTACT_PAGE.image} crumb={CONTACT_PAGE.crumb}>
			<section className="mx-auto grid max-w-[90rem] gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8">
				<div>
					<h2 className="font-display text-3xl font-semibold">{CONTACT_PAGE.heading}</h2>
					<p className="mt-3 text-muted-foreground">{CONTACT_PAGE.description}</p>
					<div className="mt-8 space-y-4">
						<a href={CONTACT.phoneHref} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition hover:shadow-md">
							<Phone className="h-6 w-6 text-primary" />
							<div><div className="font-semibold">Call us</div><div className="text-sm text-muted-foreground">{CONTACT.phone}</div></div>
						</a>
						<a href={waLink()} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition hover:shadow-md">
							<MessageCircle className="h-6 w-6 text-[#25D366]" />
							<div><div className="font-semibold">WhatsApp</div><div className="text-sm text-muted-foreground">{CONTACT_PAGE.whatsAppLabel}</div></div>
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
				<LeadForm title={CONTACT_PAGE.formTitle} subtitle={CONTACT_PAGE.formSubtitle} />
			</section>
		</Page>
	);
}