import { DEFAULT_LANGUAGE } from '@/i18n/config';
import { TOURS, getTourTranslations, getTours } from './catalog';
import { TOUR_COLLECTIONS, getTourCollectionByRouteKey, getTourCollections } from './categories';

export { TOURS, getTourTranslations, getTours };
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

// Entity relationship: which tours actually visit a given destination (by stable id).
export function getToursForDestination(destinationId, lang = DEFAULT_LANGUAGE) {
	if (!destinationId) return [];
	return getTours(lang).filter((tour) => tour.destinationIds?.includes(destinationId));
}

// Same-category tours first (e.g. viewing a day trip surfaces other day
// trips), topped up with tours from other categories only if there aren't
// enough to fill `limit`.
export function getRelatedTours(slug, lang = DEFAULT_LANGUAGE, limit = 3) {
	const tours = getTours(lang);
	const current = tours.find((entry) => entry.slug === slug);
	const others = tours.filter((entry) => entry.slug !== slug);

	if (!current) return others.slice(0, limit);

	const sameCategory = others.filter((entry) => entry.categoryKey === current.categoryKey);
	const rest = others.filter((entry) => entry.categoryKey !== current.categoryKey);
	return [...sameCategory, ...rest].slice(0, limit);
}
