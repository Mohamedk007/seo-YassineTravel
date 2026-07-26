import React from 'react';
import { Banknote, Bus, Car, ExternalLink, PlaneLanding, PlaneTakeoff, Smartphone, SquareParking, Wifi } from 'lucide-react';

const LABELS = {
	en: {
		arrival: 'Arrival process',
		departure: 'Departure process',
		currency: 'Currency exchange & ATMs',
		simCards: 'SIM cards',
		parking: 'Parking',
		wifi: 'WiFi',
		carRental: 'Car rental',
		publicTransport: 'Bus & train options',
		officialSite: 'Official airport website',
	},
	fr: {
		arrival: 'Processus d’arrivée',
		departure: 'Processus de départ',
		currency: 'Change & distributeurs',
		simCards: 'Cartes SIM',
		parking: 'Parking',
		wifi: 'WiFi',
		carRental: 'Location de voiture',
		publicTransport: 'Bus & train',
		officialSite: 'Site officiel de l’aéroport',
	},
};

const ROW_ICONS = {
	arrival: PlaneLanding,
	departure: PlaneTakeoff,
	currency: Banknote,
	simCards: Smartphone,
	parking: SquareParking,
	wifi: Wifi,
	carRental: Car,
	publicTransport: Bus,
};

/**
 * Practical airport-guide facts (arrival/departure process, currency, SIM
 * cards, parking, WiFi, car rental, public transport, official site). One
 * component, fed entirely by each airport's `guide` data object.
 */
export function AirportGuide({ guide, lang }) {
	if (!guide) return null;
	const t = LABELS[lang] || LABELS.en;
	const rows = ['arrival', 'departure', 'currency', 'simCards', 'parking', 'wifi', 'carRental', 'publicTransport'].filter((key) => guide[key]);

	return (
		<div className="grid gap-4 sm:grid-cols-2">
			{rows.map((key) => {
				const Icon = ROW_ICONS[key];
				return (
					<div key={key} className="rounded-2xl border border-border bg-card p-5">
						<div className="flex items-center gap-2 text-sm font-semibold">
							<Icon className="h-4 w-4 text-primary" /> {t[key]}
						</div>
						<p className="mt-2 text-sm text-muted-foreground">{guide[key]}</p>
					</div>
				);
			})}
			{guide.officialWebsite && (
				<a
					href={guide.officialWebsite}
					target="_blank"
					rel="noreferrer"
					className="sm:col-span-2 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-border p-4 text-sm font-semibold text-primary transition hover:border-primary/40"
				>
					{t.officialSite} <ExternalLink className="h-3.5 w-3.5" />
				</a>
			)}
		</div>
	);
}
