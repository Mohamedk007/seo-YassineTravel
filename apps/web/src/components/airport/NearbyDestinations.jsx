import React from 'react';
import { LinkRow } from './PopularRoutesTable';

/**
 * Links to the real destination pages this airport actually serves (via the
 * existing `nearestAirportSlug` relationship — see getDestinationsForAirport),
 * plus a fallback link to the full destinations index for airports without a
 * directly linked destination yet. No fabricated place list.
 */
export function NearbyDestinations({ destinations, destinationsIndexPath, destinationsIndexLabel, getDestinationPath }) {
	if (!destinations || destinations.length === 0) {
		return (
			<LinkRow to={destinationsIndexPath} label={destinationsIndexLabel} />
		);
	}

	return (
		<div className="grid gap-4 sm:grid-cols-2">
			{destinations.map((destination) => (
				<LinkRow
					key={destination.slug}
					to={getDestinationPath(destination.slug)}
					label={destination.name}
					description={destination.summary}
				/>
			))}
			<LinkRow to={destinationsIndexPath} label={destinationsIndexLabel} />
		</div>
	);
}
