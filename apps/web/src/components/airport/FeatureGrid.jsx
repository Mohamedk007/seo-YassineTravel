import React from 'react';
import {
	Accessibility,
	Award,
	Baby,
	Banknote,
	Car,
	Check,
	Clock,
	CreditCard,
	HeartHandshake,
	Languages,
	MessageCircle,
	ShieldCheck,
	Star,
	Users,
	XCircle,
} from 'lucide-react';

// String -> icon component. Data files reference icons by name (plain data,
// no JSX), so this is the one place that maps a name to the actual component —
// every FeatureGrid-powered section (Why Choose Us, Vehicle Options, Trust
// section, and every single-item policy card below) reuses this same lookup.
const ICONS = {
	ShieldCheck,
	Clock,
	Users,
	MessageCircle,
	Car,
	Star,
	Award,
	HeartHandshake,
	Baby,
	Accessibility,
	Banknote,
	CreditCard,
	Languages,
	Check,
	XCircle,
};

function FeatureIcon({ name, className = 'h-6 w-6' }) {
	const Icon = ICONS[name] || Check;
	return <Icon className={className} />;
}

/**
 * Renders a responsive grid of {icon, title, body} cards. This single
 * component is what powers Why Choose Us, Vehicle Options, Trust/E-E-A-T, and
 * every other "several short feature blurbs" section on an airport page —
 * one reusable primitive instead of a dozen near-identical components.
 */
export function FeatureGrid({ items, columns = 2 }) {
	if (!items || items.length === 0) return null;
	const colsClass = columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2';

	return (
		<div className={`grid gap-5 ${colsClass}`}>
			{items.map((item) => (
				<div key={item.title} className="rounded-2xl border border-border bg-card p-5">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
						<FeatureIcon name={item.icon} className="h-5 w-5" />
					</div>
					<h3 className="mt-3 font-display text-lg font-semibold">{item.title}</h3>
					<p className="mt-1.5 text-sm text-muted-foreground">{item.body}</p>
				</div>
			))}
		</div>
	);
}

/**
 * A single title+body card without an icon grid — used for the policy
 * sections that are one idea each (Meet & Greet, Flight Monitoring, Waiting
 * Time, Cancellation Policy, etc.) rather than a list of several items.
 */
export function FeatureCard({ title, body, icon }) {
	return (
		<div className="rounded-2xl border border-border bg-card p-6">
			{icon && (
				<div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
					<FeatureIcon name={icon} className="h-5 w-5" />
				</div>
			)}
			<h3 className="font-display text-lg font-semibold">{title}</h3>
			<p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
		</div>
	);
}

export { ICONS as FEATURE_ICON_MAP };
