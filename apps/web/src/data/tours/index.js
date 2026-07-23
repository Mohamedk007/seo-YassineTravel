import { DEFAULT_LANGUAGE } from '@/i18n/config';
import { EXCLUDED, INCLUDED, TOURS, getExcluded, getIncluded, getTourTranslations, getTours } from './catalog';
import { TOUR_COLLECTIONS, getTourCollectionByRouteKey, getTourCollections } from './categories';

export { EXCLUDED, INCLUDED, TOURS, getExcluded, getIncluded, getTourTranslations, getTours };
export { TOUR_COLLECTIONS, getTourCollectionByRouteKey, getTourCollections };

export function getTourBySlug(slug, lang = DEFAULT_LANGUAGE) {
	return slug ? getTours(lang).find((entry) => entry.slug === slug) : undefined;
}

// `categoryKey` is the stable, language-independent identifier (e.g. 'desert-tours');
// falls back to matching the old translatable `category` label for any caller still using it.
export function getToursByCategory(categoryKey, lang = DEFAULT_LANGUAGE) {
	const tours = getTours(lang);
	if (!categoryKey) return tours;
	return tours.filter((entry) => entry.categoryKey === categoryKey || entry.category === categoryKey);
}

export function getRelatedTours(slug, lang = DEFAULT_LANGUAGE, limit = 3) {
	return getTours(lang)
		.filter((entry) => entry.slug !== slug)
		.slice(0, limit);
}
