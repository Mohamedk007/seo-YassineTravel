import React from 'react';
import { Hotel } from 'lucide-react';

/**
 * Hotel *categories* near this airport's city (luxury / business / boutique /
 * budget), not individual named properties with fabricated addresses or
 * ratings — we don't operate a hotel booking product, so this stays purely
 * informational rather than asserting structured facts about third-party
 * businesses we can't verify. No schema is emitted for this section.
 */
export function NearbyHotels({ blurb, categories }) {
	if (!categories || categories.length === 0) return null;

	return (
		<div>
			{blurb && <p className="mb-5 max-w-3xl text-muted-foreground">{blurb}</p>}
			<div className="grid gap-4 sm:grid-cols-2">
				{categories.map((category) => (
					<div key={category.label} className="rounded-2xl border border-border bg-card p-5">
						<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
							<Hotel className="h-4 w-4" />
						</div>
						<h3 className="mt-3 font-semibold">{category.label}</h3>
						<p className="mt-1.5 text-sm text-muted-foreground">{category.body}</p>
					</div>
				))}
			</div>
		</div>
	);
}
