import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

/**
 * The list of common onward destinations from a given airport, each with a
 * duration and a short description. Purely data-driven — the same component
 * renders every airport's (entirely different) list of routes.
 */
export function PopularRoutesTable({ routes }) {
	if (!routes || routes.length === 0) return null;

	return (
		<div className="grid gap-4 sm:grid-cols-2">
			{routes.map((route) => (
				<div key={route.destination} className="rounded-2xl border border-border bg-card p-5">
					<div className="flex items-start justify-between gap-3">
						<h3 className="font-display text-lg font-semibold leading-snug">{route.destination}</h3>
						<span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
							<Clock className="h-3.5 w-3.5" /> {route.duration}
						</span>
					</div>
					<p className="mt-2 text-sm text-muted-foreground">{route.description}</p>
				</div>
			))}
		</div>
	);
}

/** A single "destination -> path" link row, used by RelatedTransfers/NearbyDestinations. */
export function LinkRow({ to, label, description }) {
	return (
		<Link
			to={to}
			className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 transition hover:border-primary/40"
		>
			<div>
				<p className="font-semibold">{label}</p>
				{description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
			</div>
			<ArrowRight className="h-4 w-4 shrink-0 text-primary transition group-hover:translate-x-0.5" />
		</Link>
	);
}
