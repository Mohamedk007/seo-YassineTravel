import { DEFAULT_LANGUAGE } from '@/i18n/config';
import { registerContent } from '@/content/registry';
import * as en from './en';
import * as fr from './fr';

registerContent('home.en', en.HOME_SECTIONS);
registerContent('home.fr', fr.HOME_SECTIONS);

const HOME_BY_LANG = { en, fr };

/** Ordered home page parts (hidden ones included; HomePage skips them). */
export function getHomeSections(lang = DEFAULT_LANGUAGE) {
	return (HOME_BY_LANG[lang] || HOME_BY_LANG[DEFAULT_LANGUAGE]).HOME_SECTIONS;
}
