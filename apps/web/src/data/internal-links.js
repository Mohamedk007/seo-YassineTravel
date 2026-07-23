import { DEFAULT_LANGUAGE } from '@/i18n/config';
import { getRoutePaths } from './route-config';

export function getTourInternalLinks(lang = DEFAULT_LANGUAGE) {
	const P = getRoutePaths(lang);
	const isFr = lang === 'fr';
	return [
		{ label: isFr ? 'Destinations liées' : 'Related destinations', to: P.destinations },
		{ label: isFr ? "Transferts aéroport" : 'Airport transfers', to: P.airportTransfers },
		{ label: isFr ? 'Guides de voyage' : 'Travel guides', to: P.travelGuide },
		{ label: isFr ? 'Articles du blog' : 'Blog articles', to: P.blog },
	];
}

export function getDestinationInternalLinks(lang = DEFAULT_LANGUAGE) {
	const P = getRoutePaths(lang);
	const isFr = lang === 'fr';
	return [
		{ label: isFr ? 'Voir les circuits' : 'Browse tours', to: P.tours },
		{ label: isFr ? "Transferts aéroport" : 'Airport transfers', to: P.airportTransfers },
		{ label: isFr ? 'Guides de voyage' : 'Travel guides', to: P.travelGuide },
		{ label: isFr ? 'Articles du blog' : 'Blog articles', to: P.blog },
	];
}

// Kept for call sites that haven't been made locale-aware yet; always English.
export const TOUR_INTERNAL_LINKS = getTourInternalLinks(DEFAULT_LANGUAGE);
export const DESTINATION_INTERNAL_LINKS = getDestinationInternalLinks(DEFAULT_LANGUAGE);
