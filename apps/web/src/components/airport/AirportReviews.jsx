import React from 'react';
import { Quote } from 'lucide-react';
import { Stars } from '@/components/site/Typography';

/**
 * Real, attributed testimonials for this airport — `reviews` comes from
 * getReviewsForAirport() (data/content), the same REVIEWS array used
 * everywhere else on the site. Review/AggregateRating JSON-LD is generated
 * from this exact array at the page level (buildReviewSchema), so nothing
 * here is invented separately from what's actually displayed.
 */
export function AirportReviews({ reviews }) {
	if (!reviews || reviews.length === 0) return null;

	return (
		<div className="grid gap-5 sm:grid-cols-3">
			{reviews.map((review) => (
				<div key={`${review.name}-${review.tour}`} className="relative rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
					<Quote className="h-7 w-7 text-primary/20" />
					<Stars className="mt-2" />
					<p className="mt-3 text-sm text-foreground/90">“{review.text}”</p>
					<p className="mt-4 text-sm font-semibold">
						{review.name} · <span className="font-normal text-muted-foreground">{review.country}</span>
					</p>
				</div>
			))}
		</div>
	);
}
