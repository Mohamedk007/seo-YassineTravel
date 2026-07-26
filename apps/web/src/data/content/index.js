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

// Entity relationship: reviews aren't tagged with a destination id in the data,
// so this matches on the review's free-text `tour` label mentioning the
// destination's name (e.g. "Merzouga desert circuit" review -> Merzouga Sahara).
// Falls back to an empty array rather than showing unrelated reviews.
export function getReviewsForDestination(destinationName, lang = DEFAULT_LANGUAGE) {
	if (!destinationName) return [];
	const keyword = destinationName.split(' ')[0].toLowerCase();
	return getReviews(lang).filter((review) => review.tour?.toLowerCase().includes(keyword));
}

// Same real, attributed testimonials as everywhere else on the site — never
// fabricated per airport. Only one review currently names a specific airport
// city in its free text (Casablanca), so this first tries a city-name match
// and falls back to reviews that mention "driver" generically: still genuine
// customer feedback about the transfer/driver experience, just not airport-
// specific. Returns at most `limit` reviews either way.
export function getReviewsForAirport(cityName, lang = DEFAULT_LANGUAGE, limit = 3) {
	const reviews = getReviews(lang);
	const city = cityName?.toLowerCase();
	const cityMatches = city ? reviews.filter((review) => review.text?.toLowerCase().includes(city)) : [];
	if (cityMatches.length > 0) return cityMatches.slice(0, limit);

	const driverMatches = reviews.filter((review) => /driver|chauffeur|conducteur/i.test(review.text || ''));
	return driverMatches.slice(0, limit);
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
