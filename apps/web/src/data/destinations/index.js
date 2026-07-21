import { DEFAULT_LANGUAGE } from '@/i18n/config';
import { DESTINATION_HIGHLIGHTS as EN_DESTINATIONS } from './en';
import { DESTINATION_HIGHLIGHTS as FR_DESTINATIONS } from './fr';

const DESTINATIONS_BY_LANG = { en: EN_DESTINATIONS, fr: FR_DESTINATIONS };

export function getDestinationHighlights(lang = DEFAULT_LANGUAGE) {
	return DESTINATIONS_BY_LANG[lang] || DESTINATIONS_BY_LANG[DEFAULT_LANGUAGE];
}

export function getDestinations(lang = DEFAULT_LANGUAGE) {
	return getDestinationHighlights(lang).map((destination) => ({ ...destination, slug: destination.id }));
}

export function getDestinationBySlug(slug, lang = DEFAULT_LANGUAGE) {
	return getDestinations(lang).find((destination) => destination.slug === slug);
}

// Kept for call sites that haven't been made locale-aware yet; always English.
export const DESTINATION_HIGHLIGHTS = EN_DESTINATIONS;
export const DESTINATIONS = getDestinations(DEFAULT_LANGUAGE);
