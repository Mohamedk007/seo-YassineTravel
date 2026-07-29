import React from 'react';
import { MessageCircle } from 'lucide-react';
import { waLink } from '@/data/contact';
import { useLocale } from '@/i18n/LocaleContext';

const LABEL = { en: 'Chat with us', fr: 'Discutez avec nous' };
const ARIA_LABEL = { en: 'Chat on WhatsApp', fr: 'Discuter sur WhatsApp' };

// `hiddenOnMobile`: pages that render their own fixed mobile CTA bar (e.g. the
// tour detail page) pass this so a visitor doesn't see two competing WhatsApp
// entry points stacked at the bottom of the screen. Desktop is unaffected —
// there's no bottom bar there, so this widget stays the only floating CTA.
export function WhatsAppWidget({ hiddenOnMobile = false }) {
	const lang = useLocale();
	return (
		<a
			href={waLink()}
			target="_blank"
			rel="noreferrer"
			className={`fixed bottom-5 right-5 z-40 items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 font-semibold text-white shadow-2xl transition hover:scale-105 active:scale-95 ${hiddenOnMobile ? 'hidden lg:flex' : 'flex'}`}
			aria-label={ARIA_LABEL[lang] || ARIA_LABEL.en}
		>
			<MessageCircle className="h-6 w-6" />
			<span className="hidden pr-1 sm:inline">{LABEL[lang] || LABEL.en}</span>
		</a>
	);
}