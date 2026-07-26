import React from 'react';

const LABELS = {
	en: { destination: 'Destination', duration: 'Duration', vehicle: 'Vehicle', passengers: 'Passengers', price: 'From' },
	fr: { destination: 'Destination', duration: 'Durée', vehicle: 'Véhicule', passengers: 'Passagers', price: 'À partir de' },
};

/**
 * Indicative starting prices per route. Figures come from each airport's
 * `pricing` data and are clearly labelled as a starting/"from" rate — confirm
 * current rates before treating these as fixed, quotable prices.
 */
export function AirportPricing({ rows, lang }) {
	if (!rows || rows.length === 0) return null;
	const t = LABELS[lang] || LABELS.en;

	return (
		<div className="overflow-x-auto rounded-2xl border border-border">
			<table className="w-full min-w-[560px] text-sm">
				<thead className="bg-secondary text-left">
					<tr>
						<th className="p-4 font-semibold">{t.destination}</th>
						<th className="p-4 font-semibold">{t.duration}</th>
						<th className="p-4 font-semibold">{t.vehicle}</th>
						<th className="p-4 font-semibold">{t.passengers}</th>
						<th className="p-4 font-semibold">{t.price}</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row, index) => (
						<tr key={`${row.destination}-${row.vehicle}-${index}`} className="border-t border-border">
							<td className="p-4 font-medium">{row.destination}</td>
							<td className="p-4 text-muted-foreground">{row.duration}</td>
							<td className="p-4 text-muted-foreground">{row.vehicle}</td>
							<td className="p-4 text-muted-foreground">{row.passengers}</td>
							<td className="p-4 font-semibold text-primary">€{row.price}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
