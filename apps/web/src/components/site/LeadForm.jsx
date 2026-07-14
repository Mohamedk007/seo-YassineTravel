import React, { useState } from 'react';
import { ArrowRight, Check, MessageCircle, Send } from 'lucide-react';
import { waLink } from '@/data/site';
import { useToast } from '@/hooks/use-toast';

function Field({ label, name, type = 'text', placeholder, required }) {
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

export function LeadForm({ compact = false, title = 'Plan Your Morocco Trip', subtitle = 'Free, no-obligation itinerary within 24 hours.' }) {
	const { toast } = useToast();
	const [sent, setSent] = useState(false);

	const onSubmit = (event) => {
		event.preventDefault();
		setSent(true);
		toast({ title: 'Inquiry received', description: 'Our trip designers will reply within 24 hours.' });
	};

	if (sent) {
		return (
			<div className="rounded-2xl bg-card p-8 text-center shadow-xl ring-1 ring-border">
				<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
					<Check className="h-7 w-7 text-primary" />
				</div>
				<h3 className="font-display text-2xl font-semibold">Thank you!</h3>
				<p className="mt-2 text-muted-foreground">We have received your request and will craft a personalised itinerary within 24 hours. Prefer to talk now?</p>
				<a href={waLink()} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white">
					<MessageCircle className="h-5 w-5" /> Message us on WhatsApp
				</a>
			</div>
		);
	}

	return (
		<form onSubmit={onSubmit} className="rounded-2xl bg-card p-6 shadow-xl ring-1 ring-border sm:p-8">
			<h3 className="font-display text-2xl font-semibold">{title}</h3>
			<p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
			<div className={`mt-5 grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
				<Field label="Full name" name="name" placeholder="Jane Doe" required />
				<Field label="Email" name="email" type="email" placeholder="you@email.com" required />
				<Field label="Phone / WhatsApp" name="phone" placeholder="+1 555 000 0000" />
				<Field label="Travel dates" name="dates" placeholder="e.g. May 2025" />
			</div>
			<div className="mt-4 grid gap-4 sm:grid-cols-2">
				<label className="block">
					<span className="mb-1.5 block text-sm font-medium">Interested in</span>
					<select name="interest" className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring">
						<option>Luxury Tour</option>
						<option>Private Tour</option>
						<option>Desert Tour</option>
						<option>Day Trip</option>
						<option>Airport Transfer</option>
						<option>Custom Itinerary</option>
					</select>
				</label>
				<label className="block">
					<span className="mb-1.5 block text-sm font-medium">Travellers</span>
					<select name="pax" className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring">
						<option>1–2</option>
						<option>3–4</option>
						<option>5–6</option>
						<option>7+</option>
					</select>
				</label>
			</div>
			<label className="mt-4 block">
				<span className="mb-1.5 block text-sm font-medium">Tell us about your dream trip</span>
				<textarea name="message" rows={3} placeholder="Interests, budget, must-sees…" className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
			</label>
			<button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 active:scale-[0.99]">
				Get My Free Itinerary <ArrowRight className="h-4 w-4" />
			</button>
			<p className="mt-3 text-center text-xs text-muted-foreground">No spam. Your details stay private. Reply within 24h.</p>
		</form>
	);
}

export function Newsletter() {
	const { toast } = useToast();

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				event.currentTarget.reset();
				toast({ title: 'Subscribed!', description: 'Watch your inbox for insider Morocco travel tips.' });
			}}
			className="flex w-full max-w-md gap-2"
		>
			<input
				required
				type="email"
				placeholder="Your email address"
				className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:ring-2 focus:ring-gold"
			/>
			<button className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink transition hover:brightness-105 active:scale-95">
				<Send className="h-4 w-4" /> Join
			</button>
		</form>
	);
}