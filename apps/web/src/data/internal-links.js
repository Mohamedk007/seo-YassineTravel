import { ROUTE_PATHS } from './route-config';

export const TOUR_INTERNAL_LINKS = [
	{ label: 'Related destinations', to: ROUTE_PATHS.destinations },
	{ label: 'Airport transfers', to: ROUTE_PATHS.airportTransfers },
	{ label: 'Travel guides', to: ROUTE_PATHS.travelGuide },
	{ label: 'Blog articles', to: ROUTE_PATHS.blog },
];

export const DESTINATION_INTERNAL_LINKS = [
	{ label: 'Browse tours', to: ROUTE_PATHS.tours },
	{ label: 'Airport transfers', to: ROUTE_PATHS.airportTransfers },
	{ label: 'Travel guides', to: ROUTE_PATHS.travelGuide },
	{ label: 'Blog articles', to: ROUTE_PATHS.blog },
];