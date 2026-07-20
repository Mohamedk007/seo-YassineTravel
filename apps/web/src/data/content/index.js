import { DEFAULT_LANGUAGE } from '@/i18n/config';
import * as en from './en';
import * as fr from './fr';

const CONTENT_BY_LANG = { en, fr };

function resolve(lang) {
	return CONTENT_BY_LANG[lang] || CONTENT_BY_LANG[DEFAULT_LANGUAGE];
}

export function getReviews(lang = DEFAULT_LANGUAGE) {
	return resolve(lang).REVIEWS;
}

export function getFaqs(lang = DEFAULT_LANGUAGE) {
	return resolve(lang).FAQS;
}

export function getAwards(lang = DEFAULT_LANGUAGE) {
	return resolve(lang).AWARDS;
}

// Kept for call sites that haven't been made locale-aware yet; always English.
export const REVIEWS = en.REVIEWS;
export const FAQS = en.FAQS;
export const AWARDS = en.AWARDS;
