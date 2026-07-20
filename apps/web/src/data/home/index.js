import { DEFAULT_LANGUAGE } from '@/i18n/config';
import * as en from './en';
import * as fr from './fr';

const HOME_BY_LANG = { en, fr };

function resolve(lang) {
	return HOME_BY_LANG[lang] || HOME_BY_LANG[DEFAULT_LANGUAGE];
}

export function getHomePage(lang = DEFAULT_LANGUAGE) {
	return resolve(lang).HOME_PAGE;
}

export function getHomeBenefits(lang = DEFAULT_LANGUAGE) {
	return resolve(lang).HOME_BENEFITS;
}

export function getHomeWhyPoints(lang = DEFAULT_LANGUAGE) {
	return resolve(lang).HOME_WHY_POINTS;
}

export function getHomeBookingSteps(lang = DEFAULT_LANGUAGE) {
	return resolve(lang).HOME_BOOKING_STEPS;
}

// Kept for call sites that haven't been made locale-aware yet; always English.
export const HOME_PAGE = en.HOME_PAGE;
export const HOME_BENEFITS = en.HOME_BENEFITS;
export const HOME_WHY_POINTS = en.HOME_WHY_POINTS;
export const HOME_BOOKING_STEPS = en.HOME_BOOKING_STEPS;
