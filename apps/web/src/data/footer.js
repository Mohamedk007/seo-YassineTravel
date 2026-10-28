import { DEFAULT_LANGUAGE } from '@/i18n/config';
import { registerContent } from '@/content/registry';
import { getRoutePaths } from '@/data/route-config';

// The site footer, part by part. /admin can reorder, hide, delete and add
// parts. "newsletter" and "legal" are full-width bands; consecutive column
// parts ("brand", "links", "contact", "text") share one row of columns.
// Link targets are site paths without the language prefix (the router adds
// it) or full https:// URLs.

function links(lang, entries) {
	const P = getRoutePaths(lang);
	return entries.map(([label, routeKey]) => ({ label, to: P[routeKey] }));
}

export const FOOTER_SECTIONS_BY_LANG = {
	en: [
		{
			id: 'newsletter',
			type: 'newsletter',
			hidden: false,
			title: 'Get insider Morocco travel tips',
			description: 'Seasonal guides, hidden riads and members-only offers.',
		},
		{
			id: 'brand',
			type: 'brand',
			hidden: false,
			description: 'Bespoke luxury private tours crafted by local experts. Trusted by discerning travellers worldwide since 2008.',
			showRating: true,
			showSocial: true,
		},
		{
			id: 'tours',
			type: 'links',
			hidden: false,
			title: 'Tours',
			links: links('en', [
				['Luxury Tours', 'luxuryTours'],
				['Private Tours', 'privateTours'],
				['Desert Tours', 'desertTours'],
				['Day Trips', 'dayTrips'],
				['Adventure Excursions', 'excursions'],
				['Guided City Tours', 'guidedTours'],
				['Custom Tours', 'customTours'],
			]),
		},
		{
			id: 'company',
			type: 'links',
			hidden: false,
			title: 'Company',
			links: links('en', [
				['About', 'about'],
				['Destinations', 'destinations'],
				['Reviews', 'reviews'],
				['Gallery', 'gallery'],
				['Blog', 'blog'],
				['Travel Guide', 'travelGuide'],
				['FAQ', 'faq'],
			]),
		},
		{
			id: 'contact',
			type: 'contact',
			hidden: false,
			title: 'Contact',
			showAwards: true,
		},
		{
			id: 'legal',
			type: 'legal',
			hidden: false,
			text: 'All rights reserved. · Licensed Moroccan tour operator.',
		},
	],
	fr: [
		{
			id: 'newsletter',
			type: 'newsletter',
			hidden: false,
			title: 'Recevez nos conseils de voyage sur le Maroc',
			description: 'Guides saisonniers, riads secrets et offres réservées aux membres.',
		},
		{
			id: 'brand',
			type: 'brand',
			hidden: false,
			description: 'Circuits privés de luxe conçus par des experts locaux. La confiance des voyageurs exigeants du monde entier depuis 2008.',
			showRating: true,
			showSocial: true,
		},
		{
			id: 'tours',
			type: 'links',
			hidden: false,
			title: 'Circuits',
			links: links('fr', [
				['Circuits de luxe', 'luxuryTours'],
				['Circuits privés', 'privateTours'],
				['Circuits désert', 'desertTours'],
				['Excursions à la journée', 'dayTrips'],
				['Activités et excursions', 'excursions'],
				['Visites guidées', 'guidedTours'],
				['Circuits sur mesure', 'customTours'],
			]),
		},
		{
			id: 'company',
			type: 'links',
			hidden: false,
			title: 'Entreprise',
			links: links('fr', [
				['À propos', 'about'],
				['Destinations', 'destinations'],
				['Avis', 'reviews'],
				['Galerie', 'gallery'],
				['Blog', 'blog'],
				['Guide de voyage', 'travelGuide'],
				['FAQ', 'faq'],
			]),
		},
		{
			id: 'contact',
			type: 'contact',
			hidden: false,
			title: 'Contact',
			showAwards: true,
		},
		{
			id: 'legal',
			type: 'legal',
			hidden: false,
			text: 'Tous droits réservés. · Voyagiste marocain agréé.',
		},
	],
};

for (const [lang, sections] of Object.entries(FOOTER_SECTIONS_BY_LANG)) {
	registerContent(`footer.${lang}`, sections);
}

/** Ordered footer parts (hidden ones included; Footer skips them). */
export function getFooterSections(lang = DEFAULT_LANGUAGE) {
	return FOOTER_SECTIONS_BY_LANG[lang] || FOOTER_SECTIONS_BY_LANG[DEFAULT_LANGUAGE];
}
