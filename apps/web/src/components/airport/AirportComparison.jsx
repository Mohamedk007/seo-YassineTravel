import React from 'react';
import { Check } from 'lucide-react';

const CRITERIA_LABELS = {
	en: {
		price: 'Price',
		comfort: 'Comfort',
		safety: 'Safety',
		waitingTime: 'Waiting time',
		luggage: 'Luggage space',
		nightAvailability: 'Night availability',
		language: 'Language',
		doorToDoor: 'Door-to-door',
		familySuitability: 'Family suitability',
		accessibility: 'Accessibility',
	},
	fr: {
		price: 'Prix',
		comfort: 'Confort',
		safety: 'Sécurité',
		waitingTime: 'Temps d’attente',
		luggage: 'Espace bagages',
		nightAvailability: 'Disponibilité de nuit',
		language: 'Langue',
		doorToDoor: 'Porte-à-porte',
		familySuitability: 'Adapté aux familles',
		accessibility: 'Accessibilité',
	},
};

/**
 * How a private transfer compares to a taxi, a ride-hailing app and public
 * transport. The comparison criteria are genuinely the same regardless of
 * which airport you land at, so this renders the one shared comparison
 * dataset (transferPolicy.*.js) on every airport page rather than inventing
 * a different table per city.
 */
export function AirportComparison({ comparison, lang }) {
	if (!comparison) return null;
	const labels = CRITERIA_LABELS[lang] || CRITERIA_LABELS.en;
	const modeKeys = Object.keys(comparison.modes);

	return (
		<div className="overflow-x-auto">
			<table className="w-full min-w-[720px] border-collapse text-sm">
				<thead>
					<tr>
						<th className="border-b border-border p-3 text-left font-semibold text-muted-foreground"> </th>
						{modeKeys.map((key) => (
							<th key={key} className="border-b border-border p-3 text-left font-semibold">
								<span className={key === 'privateTransfer' ? 'inline-flex items-center gap-1.5 text-primary' : ''}>
									{key === 'privateTransfer' && <Check className="h-4 w-4" />}
									{comparison.modes[key].label}
								</span>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{comparison.criteria.map((criterion) => (
						<tr key={criterion} className="border-b border-border/60">
							<td className="p-3 font-medium text-muted-foreground">{labels[criterion] || criterion}</td>
							{modeKeys.map((key) => (
								<td key={key} className={`p-3 ${key === 'privateTransfer' ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
									{comparison.modes[key][criterion]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
