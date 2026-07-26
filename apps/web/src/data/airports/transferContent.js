import { DEFAULT_LANGUAGE } from '@/i18n/config';
import { AIRPORT_CONTENT as EN_CONTENT } from './transferContent.en';
import { AIRPORT_CONTENT as FR_CONTENT } from './transferContent.fr';

const CONTENT_BY_LANG = { en: EN_CONTENT, fr: FR_CONTENT };

export function getAirportContent(slug, lang = DEFAULT_LANGUAGE) {
	const byLang = CONTENT_BY_LANG[lang] || CONTENT_BY_LANG[DEFAULT_LANGUAGE];
	return byLang[slug];
}
