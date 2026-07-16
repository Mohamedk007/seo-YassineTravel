import { slugify } from '@/lib/slug';
import { aitBenhaddouDestination } from './ait-benhaddou';
import { atlasMountainsDestination } from './atlas-mountains';
import { chefchaouenDestination } from './chefchaouen';
import { fesDestination } from './fes';
import { marrakechDestination } from './marrakech';
import { merzougaSaharaDestination } from './merzouga-sahara';

export const DESTINATION_HIGHLIGHTS = [
	marrakechDestination,
	fesDestination,
	merzougaSaharaDestination,
	chefchaouenDestination,
	aitBenhaddouDestination,
	atlasMountainsDestination,
];

export const DESTINATIONS = DESTINATION_HIGHLIGHTS.map((destination) => ({
	...destination,
	slug: slugify(destination.name),
}));

export function getDestinationBySlug(slug) {
	return DESTINATIONS.find((destination) => destination.slug === slug);
}

export {
	aitBenhaddouDestination,
	atlasMountainsDestination,
	chefchaouenDestination,
	fesDestination,
	marrakechDestination,
	merzougaSaharaDestination,
};