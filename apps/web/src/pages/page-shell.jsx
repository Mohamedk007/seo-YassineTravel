import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Layout, PageHero, Seo, Stars } from '@/components/site';
import { REVIEWS, waLink } from '@/data/site';

export function CTA() {
	return (
		<section className="bg-primary py-16 text-primary-foreground">
			<div className="mx-auto max-w-[72rem] px-5 text-center lg:px-8">
				<h2 className="font-display text-3xl font-semibold md:text-4xl">Ready to experience Morocco in luxury?</h2>
				<p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">Get a free, tailor-made itinerary within 24 hours — or chat with a local expert right now.</p>
				<div className="mt-7 flex flex-wrap justify-center gap-3">
					<a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-primary">
						<MessageCircle className="h-5 w-5" /> WhatsApp Us
					</a>
					<Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/50 px-7 py-3.5 font-semibold text-white">
						Get a Free Quote <ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			</div>
		</section>
	);
}

export function MiniReviews() {
	return (
		<section className="bg-secondary/60 py-16">
			<div className="mx-auto max-w-[90rem] px-5 lg:px-8">
				<h2 className="text-center font-display text-3xl font-semibold md:text-4xl">What our travellers say</h2>
				<div className="mt-10 grid gap-6 md:grid-cols-3">
					{REVIEWS.slice(0, 3).map((review) => (
						<div key={review.name} className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
							<Stars />
							<p className="mt-3 text-sm text-foreground/90">“{review.text}”</p>
							<p className="mt-4 text-sm font-semibold">
								{review.name} · <span className="font-normal text-muted-foreground">{review.country}</span>
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export function Page({ title, subtitle, image, crumb, children }) {
	return (
		<Layout>
			<Seo title={title} description={subtitle} />
			<PageHero title={title} subtitle={subtitle} image={image} crumb={crumb} />
			{children}
			<CTA />
		</Layout>
	);
}

export function Prose({ children }) {
	return <div className="mx-auto max-w-[56rem] space-y-5 px-5 py-16 leading-relaxed text-muted-foreground lg:px-8">{children}</div>;
}