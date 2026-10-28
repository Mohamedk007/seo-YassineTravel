import { DEFAULT_LANGUAGE } from '@/i18n/config';
import { registerContent } from '@/content/registry';
import { TRANSFER_POLICY as EN_POLICY } from './transferPolicy.en';
import { TRANSFER_POLICY as FR_POLICY } from './transferPolicy.fr';

registerContent('transferPolicy.en', EN_POLICY);
registerContent('transferPolicy.fr', FR_POLICY);

const POLICY_BY_LANG = { en: EN_POLICY, fr: FR_POLICY };

export function getTransferPolicy(lang = DEFAULT_LANGUAGE) {
	return POLICY_BY_LANG[lang] || POLICY_BY_LANG[DEFAULT_LANGUAGE];
}
