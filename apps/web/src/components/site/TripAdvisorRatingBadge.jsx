import React from 'react';
import { TRIPADVISOR } from '@/data/tripadvisor';
import { IMG, getImageAttrs } from '@/data/images';
import { useLocale } from '@/i18n/LocaleContext';

function Bubbles({ rating }) {
	return (
		<span className="inline-flex gap-0.5" aria-hidden="true">
			{Array.from({ length: 5 }).map((_, index) => (
				<span
					key={index}
					className="h-3 w-3 rounded-full"
					style={{ backgroundColor: index < Math.round(rating) ? '#34e0a1' : 'rgba(255,255,255,0.25)' }}
				/>
			))}
		</span>
	);
}

export function TripAdvisorRatingBadge({ className = '' }) {
	const lang = useLocale();
	const badgeAttrs = getImageAttrs(IMG.tripaBadge2026, lang, "TripAdvisor Travellers' Choice 2026");

	return (
		<a
			href={TRIPADVISOR.profileUrl}
			target="_blank"
			rel="noreferrer"
			className={`inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur transition hover:bg-white/15 ${className}`}
		>
			<img src={IMG.tripaBadge2026} {...badgeAttrs} width={20} height={26} className="shrink-0" loading="lazy" />
			<Bubbles rating={TRIPADVISOR.rating} />
			<span className="normal-case tracking-normal">
				{TRIPADVISOR.rating.toFixed(1)} · {TRIPADVISOR.reviewCount} reviews on TripAdvisor
			</span>
		</a>
	);
}
