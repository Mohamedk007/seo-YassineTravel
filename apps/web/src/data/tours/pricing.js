// Per-person price by group size, shown in the "Pricing" table of a tour page
// and editable per tour in the admin panel (`groupPrices`). Tours without
// their own list use the original rule: 2 travellers = the "from" price,
// 3-4 travellers = -15%, 5+ travellers = -28%.
const GROUP_TIERS = [
	{ ratio: 1, label: { en: '2 travellers', fr: '2 voyageurs' } },
	{ ratio: 0.85, label: { en: '3–4 travellers', fr: '3-4 voyageurs' } },
	{ ratio: 0.72, label: { en: '5+ travellers', fr: '5 voyageurs et +' } },
];

export function defaultGroupPrices(price, lang = 'en') {
	const base = Number(price) || 0;
	return GROUP_TIERS.map((tier) => ({
		travellers: tier.label[lang] || tier.label.en,
		price: Math.round(base * tier.ratio),
	}));
}

export function getGroupPrices(tour, lang = 'en') {
	const rows = Array.isArray(tour?.groupPrices) ? tour.groupPrices.filter((row) => row && String(row.travellers || '').trim()) : [];
	return rows.length ? rows : defaultGroupPrices(tour?.price, lang);
}
