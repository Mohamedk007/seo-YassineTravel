import React, { useState } from 'react';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { waLink } from '@/data/contact';
import { useToast } from '@/hooks/use-toast';
import { useLocale } from '@/i18n/LocaleContext';

const COPY = {
	en: {
		toastTitle: 'Transfer request received',
		toastDescription: 'We will confirm your airport transfer within 24 hours.',
		thankYou: 'Thank you!',
		received: (airportName) => `Your transfer request for ${airportName} has been received.`,
		messageOnWhatsApp: 'Message us on WhatsApp',
		waMessage: (airportName) => `Hi! I need an airport transfer from ${airportName}.`,
		bookTransfer: 'Book your transfer',
		intro: 'Tell us the essentials and we’ll confirm the transfer quickly.',
		fields: {
			fullName: 'Full name',
			phone: 'Phone / WhatsApp',
			email: 'Email',
			arrivalDate: 'Arrival date',
			arrivalTime: 'Arrival time',
			flightNumber: 'Flight number',
			passengers: 'Passengers',
			dropoff: 'Drop-off location',
			notes: 'Notes',
		},
		placeholders: {
			fullName: 'Jane Doe',
			phone: '+1 555 000 0000',
			email: 'you@email.com',
			flightNumber: 'AT123',
			passengers: '2',
			dropoff: 'Hotel / riad name',
			notes: (airportCode) => `Any extra details for your ${airportCode} transfer…`,
		},
		submitLabel: 'Request transfer',
		privacyNote: 'No spam. Your details stay private. Reply within 24h.',
	},
	fr: {
		toastTitle: 'Demande de transfert reçue',
		toastDescription: 'Nous confirmerons votre transfert aéroport sous 24 heures.',
		thankYou: 'Merci !',
		received: (airportName) => `Votre demande de transfert depuis ${airportName} a bien été reçue.`,
		messageOnWhatsApp: 'Écrivez-nous sur WhatsApp',
		waMessage: (airportName) => `Bonjour ! J’ai besoin d’un transfert aéroport depuis ${airportName}.`,
		bookTransfer: 'Réservez votre transfert',
		intro: 'Indiquez-nous l’essentiel et nous confirmerons rapidement le transfert.',
		fields: {
			fullName: 'Nom complet',
			phone: 'Téléphone / WhatsApp',
			email: 'E-mail',
			arrivalDate: 'Date d’arrivée',
			arrivalTime: 'Heure d’arrivée',
			flightNumber: 'Numéro de vol',
			passengers: 'Passagers',
			dropoff: 'Lieu de dépose',
			notes: 'Notes',
		},
		placeholders: {
			fullName: 'Jeanne Dupont',
			phone: '+212 6 00 00 00 00',
			email: 'vous@email.com',
			flightNumber: 'AT123',
			passengers: '2',
			dropoff: 'Nom de l’hôtel / du riad',
			notes: (airportCode) => `Précisions utiles pour votre transfert ${airportCode}…`,
		},
		submitLabel: 'Demander le transfert',
		privacyNote: 'Pas de spam. Vos données restent privées. Réponse sous 24h.',
	},
};

function Field({ label, name, type = 'text', placeholder, required = true }) {
	return (
		<label className="block">
			<span className="mb-1.5 block text-sm font-medium">
				{label}
				{required && <span className="text-primary"> *</span>}
			</span>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				required={required}
				className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-ring"
			/>
		</label>
	);
}

export function AirportTransferBookingForm({ airportName, airportCode }) {
	const { toast } = useToast();
	const lang = useLocale();
	const copy = COPY[lang] || COPY.en;
	const [sent, setSent] = useState(false);

	const onSubmit = (event) => {
		event.preventDefault();
		setSent(true);
		toast({ title: copy.toastTitle, description: copy.toastDescription });
	};

	if (sent) {
		return (
			<div className="rounded-2xl bg-card p-8 text-center shadow-xl ring-1 ring-border">
				<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
					<Check className="h-7 w-7 text-primary" />
				</div>
				<h3 className="font-display text-2xl font-semibold">{copy.thankYou}</h3>
				<p className="mt-2 text-muted-foreground">{copy.received(airportName)}</p>
				<a href={waLink(copy.waMessage(airportName))} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white">
					<MessageCircle className="h-5 w-5" /> {copy.messageOnWhatsApp}
				</a>
			</div>
		);
	}

	return (
		<form onSubmit={onSubmit} className="rounded-2xl bg-card p-6 shadow-xl ring-1 ring-border sm:p-8">
			<h3 className="font-display text-2xl font-semibold">{copy.bookTransfer}</h3>
			<p className="mt-1 text-sm text-muted-foreground">{copy.intro}</p>
			<div className="mt-5 grid gap-4 sm:grid-cols-2">
				<Field label={copy.fields.fullName} name="name" placeholder={copy.placeholders.fullName} />
				<Field label={copy.fields.phone} name="phone" placeholder={copy.placeholders.phone} />
				<Field label={copy.fields.email} name="email" type="email" placeholder={copy.placeholders.email} required={false} />
				<Field label={copy.fields.arrivalDate} name="arrivalDate" type="date" />
				<Field label={copy.fields.arrivalTime} name="arrivalTime" type="time" />
				<Field label={copy.fields.flightNumber} name="flightNumber" placeholder={copy.placeholders.flightNumber} />
				<Field label={copy.fields.passengers} name="passengers" type="number" placeholder={copy.placeholders.passengers} />
				<Field label={copy.fields.dropoff} name="dropoff" placeholder={copy.placeholders.dropoff} />
			</div>
			<label className="mt-4 block">
				<span className="mb-1.5 block text-sm font-medium">{copy.fields.notes}</span>
				<textarea name="notes" rows={3} placeholder={copy.placeholders.notes(airportCode)} className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
			</label>
			<button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 active:scale-[0.99]">
				{copy.submitLabel} <ArrowRight className="h-4 w-4" />
			</button>
			<p className="mt-3 text-center text-xs text-muted-foreground">{copy.privacyNote}</p>
		</form>
	);
}
