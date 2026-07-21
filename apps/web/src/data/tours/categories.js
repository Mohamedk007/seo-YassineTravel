import { DEFAULT_LANGUAGE } from '@/i18n/config';
import { TOUR_COLLECTIONS as EN_COLLECTIONS } from './categories.en';
import { TOUR_COLLECTIONS as FR_COLLECTIONS } from './categories.fr';

const COLLECTIONS_BY_LANG = { en: EN_COLLECTIONS, fr: FR_COLLECTIONS };

export function getTourCollections(lang = DEFAULT_LANGUAGE) {
	return COLLECTIONS_BY_LANG[lang] || COLLECTIONS_BY_LANG[DEFAULT_LANGUAGE];
}

export function getTourCollectionByRouteKey(routeKey, lang = DEFAULT_LANGUAGE) {
	return getTourCollections(lang).find((collection) => collection.routeKey === routeKey);
}

// Kept for call sites that haven't been made locale-aware yet; always English.
export const TOUR_COLLECTIONS = EN_COLLECTIONS;
