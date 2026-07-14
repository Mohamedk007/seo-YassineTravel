import { TOURS } from './catalog';

export { EXCLUDED, INCLUDED, TOURS } from './catalog';
export { TOUR_COLLECTIONS } from './categories';

export function getTourBySlug(slug) {
	return slug ? TOURS.find((entry) => entry.slug === slug) : undefined;
}

export function getToursByCategory(category) {
	return category ? TOURS.filter((entry) => entry.category === category) : TOURS;
}

export function getRelatedTours(slug, limit = 3) {
	return TOURS.filter((entry) => entry.slug !== slug).slice(0, limit);
}