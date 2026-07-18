import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users } from 'lucide-react';
import { Reveal } from '@/components/site/Reveal';
import { IMG } from '@/data/images';

export function TourCard({ tour, delay = 0 }) {
	return (
		<Reveal delay={delay} className="group overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl">
			<Link to={`/tour/${tour.slug}`} className="block">
				<div className="relative aspect-[4/3] overflow-hidden">
					<img
						src={tour.image}
						alt={tour.title}
						className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
						loading="lazy"
						decoding="async"
						sizes="(min-width: 768px) 33vw, 100vw"
					/>
					<span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{tour.category}</span>
					<img
						src={IMG.tripaBadge2026}
						alt="TripAdvisor Travelers' Choice 2026"
						width={36}
						height={46}
						className="absolute bottom-3 left-3"
						loading="lazy"
					/>
					<span className="absolute bottom-3 right-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">from EUR{tour.price.toLocaleString()}</span>
				</div>
				<div className="p-6">
					<div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
						<span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {tour.duration}</span>
						<span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {tour.group}</span>
					</div>
					<h3 className="mt-2 font-display text-xl font-semibold leading-snug transition group-hover:text-primary">{tour.title}</h3>
					<p className="mt-2 text-sm text-muted-foreground line-clamp-2">{tour.tagline}</p>
					<span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">View details <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
				</div>
			</Link>
		</Reveal>
	);
}