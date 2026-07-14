import React from 'react';
import { MessageCircle } from 'lucide-react';
import { waLink } from '@/data/site';

export function WhatsAppWidget() {
	return (
		<a
			href={waLink()}
			target="_blank"
			rel="noreferrer"
			className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 font-semibold text-white shadow-2xl transition hover:scale-105 active:scale-95"
			aria-label="Chat on WhatsApp"
		>
			<MessageCircle className="h-6 w-6" />
			<span className="hidden pr-1 sm:inline">Chat with us</span>
		</a>
	);
}