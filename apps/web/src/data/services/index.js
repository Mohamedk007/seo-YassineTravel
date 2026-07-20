import { DEFAULT_LANGUAGE } from '@/i18n/config';
import * as en from './en';
import * as fr from './fr';

const SERVICES_BY_LANG = { en, fr };

function resolve(lang) {
	return SERVICES_BY_LANG[lang] || SERVICES_BY_LANG[DEFAULT_LANGUAGE];
}

export function getServicesContent(key, lang = DEFAULT_LANGUAGE) {
	return resolve(lang)[key];
}

// Kept for call sites that haven't been made locale-aware yet; always English.
export const AIRPORT_TRANSFER_FEATURES = en.AIRPORT_TRANSFER_FEATURES;
export const PRIVATE_DRIVER_FEATURES = en.PRIVATE_DRIVER_FEATURES;
export const CUSTOM_TOUR_STEPS = en.CUSTOM_TOUR_STEPS;
export const AIRPORT_TRANSFER_PAGE = en.AIRPORT_TRANSFER_PAGE;
export const PRIVATE_DRIVER_PAGE = en.PRIVATE_DRIVER_PAGE;
export const CUSTOM_TOURS_PAGE = en.CUSTOM_TOURS_PAGE;
