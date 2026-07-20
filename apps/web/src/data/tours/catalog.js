import { DEFAULT_LANGUAGE } from '@/i18n/config';
import { EXCLUDED as EN_EXCLUDED, INCLUDED as EN_INCLUDED, TOURS as EN_TOURS } from './catalog.en';
import { EXCLUDED as FR_EXCLUDED, INCLUDED as FR_INCLUDED, TOURS as FR_TOURS } from './catalog.fr';

const TOURS_BY_LANG = { en: EN_TOURS, fr: FR_TOURS };
const INCLUDED_BY_LANG = { en: EN_INCLUDED, fr: FR_INCLUDED };
const EXCLUDED_BY_LANG = { en: EN_EXCLUDED, fr: FR_EXCLUDED };

export function getTours(lang = DEFAULT_LANGUAGE) {
	return TOURS_BY_LANG[lang] || TOURS_BY_LANG[DEFAULT_LANGUAGE];
}

export function getIncluded(lang = DEFAULT_LANGUAGE) {
	return INCLUDED_BY_LANG[lang] || INCLUDED_BY_LANG[DEFAULT_LANGUAGE];
}

export function getExcluded(lang = DEFAULT_LANGUAGE) {
	return EXCLUDED_BY_LANG[lang] || EXCLUDED_BY_LANG[DEFAULT_LANGUAGE];
}

// Kept for call sites that haven't been made locale-aware yet; always English.
export const TOURS = EN_TOURS;
export const INCLUDED = EN_INCLUDED;
export const EXCLUDED = EN_EXCLUDED;
