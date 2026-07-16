import React, { useState } from 'react';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { waLink } from '@/data/contact';
import { useToast } from '@/hooks/use-toast';

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
	const [sent, setSent] = useState(false);

	const onSubmit = (event) => {
		event.preventDefault();
		setSent(true);
		toast({
			title: 'Transfer request received',
			description: 'We will confirm your airport transfer within 24 hours.',
		});
	};

	if (sent) {
		return (
			<div className="rounded-2xl bg-card p-8 text-center shadow-xl ring-1 ring-border">
				<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
					<Check className="h-7 w-7 text-primary" />
				</div>
				<h3 className="font-display text-2xl font-semibold">Thank you!</h3>
				<p className="mt-2 text-muted-foreground">Your transfer request for {airportName} has been received.</p>
				<a href={waLink(`Hi! I need an airport transfer from ${airportName}.`)} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white">
					<MessageCircle className="h-5 w-5" /> Message us on WhatsApp
				</a>
			</div>
		);
	}

	return (
		<form onSubmit={onSubmit} className="rounded-2xl bg-card p-6 shadow-xl ring-1 ring-border sm:p-8">
			<h3 className="font-display text-2xl font-semibold">Book your transfer</h3>
			<p className="mt-1 text-sm text-muted-foreground">Tell us the essentials and we’ll confirm the transfer quickly.</p>
			<div className="mt-5 grid gap-4 sm:grid-cols-2">
				<Field label="Full name" name="name" placeholder="Jane Doe" />
				<Field label="Phone / WhatsApp" name="phone" placeholder="+1 555 000 0000" />
				<Field label="Email" name="email" type="email" placeholder="you@email.com" required={false} />
				<Field label="Arrival date" name="arrivalDate" type="date" />
				<Field label="Arrival time" name="arrivalTime" type="time" />
				<Field label="Flight number" name="flightNumber" placeholder="AT123" />
				<Field label="Passengers" name="passengers" type="number" placeholder="2" />
				<Field label="Drop-off location" name="dropoff" placeholder="Hotel / riad name" />
			</div>
			<label className="mt-4 block">
				<span className="mb-1.5 block text-sm font-medium">Notes</span>
				<textarea name="notes" rows={3} placeholder={`Any extra details for your ${airportCode} transfer…`} className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
			</label>
			<button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 active:scale-[0.99]">
				Request transfer <ArrowRight className="h-4 w-4" />
			</button>
			<p className="mt-3 text-center text-xs text-muted-foreground">No spam. Your details stay private. Reply within 24h.</p>
		</form>
	);
}
