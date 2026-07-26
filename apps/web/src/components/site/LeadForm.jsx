import React, { useState } from 'react';
import { ArrowRight, Check, MessageCircle, Send } from 'lucide-react';
import { waLink } from '@/data/contact';
import { getLeadFormConfig } from '@/data/site-config';
import { useToast } from '@/hooks/use-toast';
import { useLocale } from '@/i18n/LocaleContext';

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

export function LeadForm({ compact = false, title, subtitle }) {
	const { toast } = useToast();
	const lang = useLocale();
	const CONFIG = getLeadFormConfig(lang);
	const [sent, setSent] = useState(false);

	const onSubmit = (event) => {
		event.preventDefault();
		setSent(true);
		toast({ title: CONFIG.toastTitle, description: CONFIG.toastDescription });
	};

	if (sent) {
		return (
			<div className="rounded-2xl bg-card p-8 text-center shadow-xl ring-1 ring-border">
				<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
					<Check className="h-7 w-7 text-primary" />
				</div>
				<h3 className="font-display text-2xl font-semibold">{CONFIG.successTitle}</h3>
				<p className="mt-2 text-muted-foreground">{CONFIG.successDescription}</p>
				<a href={waLink()} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white">
					<MessageCircle className="h-5 w-5" /> {CONFIG.successWhatsAppLabel}
				</a>
			</div>
		);
	}

	return (
		<form onSubmit={onSubmit} className="rounded-2xl bg-card p-6 shadow-xl ring-1 ring-border sm:p-8">
			<h3 className="font-display text-2xl font-semibold">{title || CONFIG.defaultTitle}</h3>
			<p className="mt-1 text-sm text-muted-foreground">{subtitle || CONFIG.defaultSubtitle}</p>
			<div className={`mt-5 grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
				<Field label={CONFIG.fieldLabels.fullName} name="name" placeholder={CONFIG.placeholders.fullName} required />
				<Field label={CONFIG.fieldLabels.email} name="email" type="email" placeholder={CONFIG.placeholders.email} required />
				<Field label={CONFIG.fieldLabels.phone} name="phone" placeholder={CONFIG.placeholders.phone} />
				<Field label={CONFIG.fieldLabels.dates} name="dates" placeholder={CONFIG.placeholders.dates} />
			</div>
			<div className="mt-4 grid gap-4 sm:grid-cols-2">
				<label className="block">
					<span className="mb-1.5 block text-sm font-medium">{CONFIG.fieldLabels.interest}</span>
					<select name="interest" className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring">
						{CONFIG.interestOptions.map((option) => (
							<option key={option}>{option}</option>
						))}
					</select>
				</label>
				<label className="block">
					<span className="mb-1.5 block text-sm font-medium">{CONFIG.fieldLabels.travellers}</span>
					<select name="pax" className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring">
						{CONFIG.travellerOptions.map((option) => (
							<option key={option}>{option}</option>
						))}
					</select>
				</label>
			</div>
			<label className="mt-4 block">
				<span className="mb-1.5 block text-sm font-medium">{CONFIG.fieldLabels.message}</span>
				<textarea name="message" rows={3} placeholder={CONFIG.placeholders.message} className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
			</label>
			<button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 active:scale-[0.99]">
				{CONFIG.submitLabel} <ArrowRight className="h-4 w-4" />
			</button>
			<p className="mt-3 text-center text-xs text-muted-foreground">{CONFIG.privacyNote}</p>
		</form>
	);
}

export function Newsletter() {
	const { toast } = useToast();
	const lang = useLocale();
	const CONFIG = getLeadFormConfig(lang);

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				event.currentTarget.reset();
				toast({ title: CONFIG.newsletterToastTitle, description: CONFIG.newsletterToastDescription });
			}}
			className="flex w-full max-w-md gap-2"
		>
			<input
				required
				type="email"
				placeholder={CONFIG.newsletterPlaceholder}
				className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:ring-2 focus:ring-gold"
			/>
			<button className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink transition hover:brightness-105 active:scale-95">
				<Send className="h-4 w-4" /> {CONFIG.newsletterSubmitLabel}
			</button>
		</form>
	);
}
