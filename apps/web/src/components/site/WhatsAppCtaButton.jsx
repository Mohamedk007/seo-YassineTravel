import React from 'react';
import { MessageCircle } from 'lucide-react';
import { waLink } from '@/data/contact';

export function WhatsAppCtaButton({ message, children }) {
	return (
		<a href={waLink(message)} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground">
			<MessageCircle className="h-5 w-5" /> {children}
		</a>
	);
}
