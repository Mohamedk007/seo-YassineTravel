import React from 'react';
import { MessageCircle } from 'lucide-react';
import { waLink } from '@/data/contact';
import { useLocale } from '@/i18n/LocaleContext';

const LABEL = { en: 'Chat with us', fr: 'Discutez avec nous' };
const ARIA_LABEL = { en: 'Chat on WhatsApp', fr: 'Discuter sur WhatsApp' };

export function WhatsAppWidget() {
	const lang = useLocale();
	return (
		<a
			href={waLink()}
			target="_blank"
			rel="noreferrer"
			className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 font-semibold text-white shadow-2xl transition hover:scale-105 active:scale-95"
			aria-label={ARIA_LABEL[lang] || ARIA_LABEL.en}
		>
			<MessageCircle className="h-6 w-6" />
			<span className="hidden pr-1 sm:inline">{LABEL[lang] || LABEL.en}</span>
		</a>
	);
}