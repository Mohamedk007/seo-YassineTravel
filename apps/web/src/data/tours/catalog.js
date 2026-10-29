import { DEFAULT_LANGUAGE } from '@/i18n/config';
import { registerContent } from '@/content/registry';
import { TOURS as EN_TOURS } from './catalog.en';
import { TOURS as FR_TOURS } from './catalog.fr';
import { defaultGroupPrices } from './pricing';

// Explicit per-tour group prices, so the admin panel shows (and edits) the
// real values instead of a hidden formula.
for (const [lang, tours] of [['en', EN_TOURS], ['fr', FR_TOURS]]) {
	for (const tour of tours) {
		if (!Array.isArray(tour.groupPrices)) tour.groupPrices = defaultGroupPrices(tour.price, lang);
	}
}

registerContent('tours.en', EN_TOURS);
registerContent('tours.fr', FR_TOURS);

const TOURS_BY_LANG = { en: EN_TOURS, fr: FR_TOURS };

export function getTours(lang = DEFAULT_LANGUAGE) {
	return TOURS_BY_LANG[lang] || TOURS_BY_LANG[DEFAULT_LANGUAGE];
}

// Finds the same tour (by stable, language-independent `id`) in every
// language — used for hreflang alternates and the language switcher.
export function getTourTranslations(id) {
	const result = {};
	for (const [lang, tours] of Object.entries(TOURS_BY_LANG)) {
		const match = tours.find((tour) => tour.id === id);
		if (match) result[lang] = match;
	}
	return result;
}

// Kept for call sites that haven't been made locale-aware yet; always English.
export const TOURS = EN_TOURS;
