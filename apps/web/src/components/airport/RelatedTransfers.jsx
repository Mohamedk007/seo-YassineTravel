import React from 'react';
import { LinkRow } from './PopularRoutesTable';

/**
 * Cross-links to the other services that naturally follow an airport
 * transfer: other airport pages, private drivers, day trips and tours.
 * `links` is `[{ to, label, description }]`, built by the page from real
 * route-config paths — no invented URLs.
 */
export function RelatedTransfers({ links }) {
	if (!links || links.length === 0) return null;

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{links.map((link) => (
				<LinkRow key={link.to} to={link.to} label={link.label} description={link.description} />
			))}
		</div>
	);
}
