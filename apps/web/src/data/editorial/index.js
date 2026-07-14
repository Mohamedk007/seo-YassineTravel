import { IMG } from '../images';

export const ABOUT_PAGE = {
	title: 'A family of Moroccan storytellers',
	subtitle: 'Local experts crafting extraordinary journeys since 2011.',
	image: IMG.guide,
	crumb: 'About Us',
	paragraphs: [
		'Morocco Trip Holidays was founded by a family of born-and-raised Moroccans with a simple belief: that the finest way to experience our country is privately, authentically, and in complete comfort.',
		'For over thirteen years we have welcomed travellers from the United States, United Kingdom, Canada, Australia and across Europe — designing bespoke journeys that blend five-star luxury with the genuine warmth of Moroccan hospitality. Our guides are not just drivers; they are historians, translators and friends who open doors ordinary tourists never see.',
		'From the golden dunes of the Sahara to the labyrinthine medinas of Fes and Marrakech, every itinerary is handcrafted around you. We handle every detail — luxury riads, private transfers, expert guides and 24/7 concierge support — so all you have to do is fall in love with Morocco.',
	],
	highlights: [
		{ image: IMG.riad, caption: 'Handpicked stays' },
		{ image: IMG.camel, caption: 'Authentic experiences' },
		{ image: IMG.tagine, caption: 'Local cuisine' },
	],
};

export const DESTINATIONS_PAGE = {
	title: 'Where Morocco will take you',
	subtitle: 'Iconic cities, sweeping deserts and mountain hideaways.',
	image: IMG.chefchaouen,
	crumb: 'Destinations',
};

export const GALLERY_PAGE = {
	title: 'Moments from Morocco',
	subtitle: 'A glimpse of the journeys that await you.',
	image: IMG.couple,
	crumb: 'Gallery',
	images: [IMG.duneSunset, IMG.luxCamp, IMG.fesDoor, IMG.camel, IMG.riad, IMG.tagine, IMG.chefchaouen, IMG.marrakech, IMG.couple, IMG.kasbah, IMG.atlas, IMG.guide],
};

export const REVIEWS_PAGE = {
	title: 'Trusted by travellers worldwide',
	subtitle: '4.9/5 from 1,200+ verified reviews across Google & TripAdvisor.',
	image: IMG.couple,
	crumb: 'Reviews',
};

export const FAQ_PAGE = {
	title: 'Frequently asked questions',
	subtitle: 'Everything you need to know before you travel.',
	image: IMG.fesDoor,
	crumb: 'FAQ',
};

export const BLOG_PAGE = {
	title: 'The Morocco journal',
	subtitle: 'Insider guides, travel tips and stories from the road.',
	image: IMG.marrakech,
	crumb: 'Blog',
	posts: [
		{
			image: IMG.duneSunset,
			title: 'The ultimate guide to a luxury Sahara desert night',
			category: 'Desert',
			summary: 'Everything you need to know about staying in a five-star Moroccan desert camp.',
		},
		{
			image: IMG.marrakech,
			title: '3 perfect days in Marrakech',
			category: 'City Guide',
			summary: 'How to experience the Red City like an insider, from souks to rooftop dining.',
		},
		{
			image: IMG.tagine,
			title: "A food lover's journey through Morocco",
			category: 'Food',
			summary: 'Tagines, pastilla and mint tea — the flavours that define Moroccan cuisine.',
		},
		{
			image: IMG.chefchaouen,
			title: 'Why Chefchaouen belongs on your itinerary',
			category: 'Destinations',
			summary: "The story behind Morocco's enchanting blue city.",
		},
		{
			image: IMG.atlas,
			title: 'Best time to visit Morocco',
			category: 'Planning',
			summary: 'A month-by-month guide to weather, festivals and crowds.',
		},
		{
			image: IMG.riad,
			title: 'How to choose the perfect riad',
			category: 'Luxury',
			summary: 'What sets a truly special Moroccan riad apart.',
		},
	],
};

export const TRAVEL_GUIDE_PAGE = {
	title: 'Your essential Morocco travel guide',
	subtitle: 'Practical, insider know-how for a flawless trip.',
	image: IMG.atlas,
	crumb: 'Travel Guide',
	tips: [
		{ title: 'Best time to visit', description: 'Spring (Mar–May) and autumn (Sep–Nov) offer ideal weather across the country.' },
		{ title: 'Getting around', description: 'We provide private air-conditioned vehicles with professional driver-guides — no stress, no logistics.' },
		{ title: 'What to pack', description: 'Light layers, comfortable shoes, sun protection and a warm layer for chilly desert nights.' },
		{ title: 'Money & tipping', description: 'The dirham (MAD) is the local currency. Tipping is appreciated but never obligatory.' },
		{ title: 'Culture & etiquette', description: 'Dress modestly at religious sites, greet with a smile, and always accept the mint tea.' },
		{ title: 'Health & safety', description: 'Morocco is very safe for tourists. Drink bottled water and travel with basic sun and stomach remedies.' },
	],
};

export const CONTACT_PAGE = {
	title: "Let's plan your Morocco adventure",
	subtitle: 'Reach out any time — we reply within 24 hours, usually much sooner.',
	image: IMG.riad,
	crumb: 'Contact',
	heading: 'Get in touch',
	description: 'Whether you have a quick question or want a full custom itinerary, our local team is here to help.',
	whatsAppLabel: 'Chat with a local expert now',
	formTitle: 'Send us a message',
	formSubtitle: "We'll craft your free itinerary within 24 hours.",
};