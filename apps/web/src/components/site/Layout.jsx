import React from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { WhatsAppWidget } from './WhatsAppWidget';

export function Layout({ children, hideWhatsAppOnMobile = false }) {
	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			<main className="flex-1">{children}</main>
			<Footer />
			<WhatsAppWidget hiddenOnMobile={hideWhatsAppOnMobile} />
		</div>
	);
}