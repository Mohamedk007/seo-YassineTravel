import React from 'react';
import { Building2, Clock, MapPin } from 'lucide-react';

const LABELS = {
	en: { terminals: 'Terminals', distance: 'Distance', transferTime: 'Typical transfer time' },
	fr: { terminals: 'Terminaux', distance: 'Distance', transferTime: 'Durée de trajet habituelle' },
};

/**
 * The at-a-glance facts block every airport page leads with: terminal count,
 * distance to the city, and a typical transfer time range. Feeds directly
 * from the per-airport content object — no per-airport JSX.
 */
export function TransferFactsPanel({ content, lang }) {
	const t = LABELS[lang] || LABELS.en;

	return (
		<div className="grid gap-4 sm:grid-cols-3">
			<div className="rounded-2xl border border-border bg-card p-5">
				<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
					<Building2 className="h-4 w-4 text-primary" /> {t.terminals}
				</div>
				<p className="mt-2 font-display text-2xl font-semibold">{content.overview.terminalCount}</p>
			</div>
			<div className="rounded-2xl border border-border bg-card p-5">
				<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
					<MapPin className="h-4 w-4 text-primary" /> {t.distance}
				</div>
				<p className="mt-2 font-display text-2xl font-semibold">≈ {content.distanceKm} km</p>
				<p className="text-xs text-muted-foreground">{content.distanceContext}</p>
			</div>
			<div className="rounded-2xl border border-border bg-card p-5">
				<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
					<Clock className="h-4 w-4 text-primary" /> {t.transferTime}
				</div>
				<p className="mt-2 font-display text-2xl font-semibold">{content.transferTimeRange}</p>
				<p className="text-xs text-muted-foreground">{content.transferTimeContext}</p>
			</div>
		</div>
	);
}
