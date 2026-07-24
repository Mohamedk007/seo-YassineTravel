import { DEFAULT_LANGUAGE } from '@/i18n/config';
import { DESTINATION_HIGHLIGHTS as EN_DESTINATIONS } from './en';
import { DESTINATION_HIGHLIGHTS as FR_DESTINATIONS } from './fr';

const DESTINATIONS_BY_LANG = { en: EN_DESTINATIONS, fr: FR_DESTINATIONS };

export function getDestinationHighlights(lang = DEFAULT_LANGUAGE) {
	return DESTINATIONS_BY_LANG[lang] || DESTINATIONS_BY_LANG[DEFAULT_LANGUAGE];
}

export function getDestinations(lang = DEFAULT_LANGUAGE) {
	return getDestinationHighlights(lang);
}

export function getDestinationBySlug(slug, lang = DEFAULT_LANGUAGE) {
	return getDestinations(lang).find((destination) => destination.slug === slug);
}

// Aggregates a gallery for a tour from the real photos of every destination it
// visits (deduped) — a tour has no dedicated photo set of its own, so this
// reuses genuine, destination-tagged images rather than repeating one shot.
export function getGalleryForDestinationIds(destinationIds = [], lang = DEFAULT_LANGUAGE) {
	const destinations = getDestinations(lang);
	const images = destinationIds.flatMap((id) => destinations.find((d) => d.id === id)?.gallery || []);
	return [...new Set(images)];
}

// Finds the same destination (by stable, language-independent `id`) in every
// language — used for hreflang alternates and the language switcher.
export function getDestinationTranslations(id) {
	const result = {};
	for (const [lang, destinations] of Object.entries(DESTINATIONS_BY_LANG)) {
		const match = destinations.find((destination) => destination.id === id);
		if (match) result[lang] = match;
	}
	return result;
}

// Kept for call sites that haven't been made locale-aware yet; always English.
export const DESTINATION_HIGHLIGHTS = EN_DESTINATIONS;
export const DESTINATIONS = getDestinations(DEFAULT_LANGUAGE);
