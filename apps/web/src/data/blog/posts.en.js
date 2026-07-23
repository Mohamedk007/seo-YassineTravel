import { IMG } from '../images';
import { ROUTE_PATHS } from '@/data/route-config';

export const BLOG_PAGE_POSTS = [
	{
		id: 'luxury-sahara-desert-night',
		destinationId: 'merzouga-sahara',
		slug: 'the-ultimate-guide-to-a-luxury-sahara-desert-night',
		image: IMG.duneSunset,
		title: 'The ultimate guide to a luxury Sahara desert night',
		category: 'Desert',
		summary: 'Everything you need to know about staying in a five-star Moroccan desert camp.',
		datePublished: '2026-02-10',
		dateModified: '2026-07-16',
		readTime: '9 min read',
		author: {
			name: 'Youssef El Amrani',
			role: 'Desert Operations Lead, Morocco Trip Holidays',
		},
		content: [
			{
				paragraphs: [
					'There is a moment, just after the last quad bike engine falls silent and the Sahara wind drops to nothing, when the desert goes completely quiet. That silence — followed twenty minutes later by a sky so dense with stars it looks unreal — is the reason people cross the world to sleep in Morocco\'s dunes. But not every "desert camp" delivers it. Having run overnight desert stays for our guests for over a decade, this guide covers exactly what separates a forgettable night in a tent from the kind of evening people describe years later.',
				],
			},
			{
				heading: 'Merzouga or Agafay: which dunes are right for you',
				paragraphs: [
					'Morocco has two very different "desert" experiences, and mixing them up is the most common planning mistake we see.',
					'Erg Chebbi, near Merzouga, is the real Sahara — the towering, wind-sculpted dunes you picture when you close your eyes. It sits roughly 9-10 hours by road from Marrakech (or a short domestic flight to Errachidia), which makes it a 3-4 day trip at minimum, usually combined with the Atlas Mountains, Dades Valley, and Todra Gorge along the way.',
					'Agafay is a rocky, moon-like desert only 45 minutes from Marrakech. It cannot match Erg Chebbi\'s scale, but it delivers a genuine luxury desert night — dinner under the stars, a private pool at some camps, live music — without sacrificing two days of your itinerary. It is the better choice if your trip is under a week or if you want the desert experience bookended by city time in Marrakech.',
					'If the towering dunes are non-negotiable for your photos and memories, our 4-Day Marrakech to Merzouga Desert route is built exactly for that. If time is tighter, the Agafay Desert Luxury Overnight gets you 90% of the magic in a fraction of the travel time.',
				],
			},
			{
				heading: 'What "luxury" actually means in a desert camp',
				paragraphs: [
					'The word "luxury" gets overused in desert camp marketing, so it is worth being specific about what to actually look for.',
					'A genuine five-star camp means: private canvas tents with real beds (not mattresses on the floor), en-suite bathrooms with hot water and proper plumbing, generator or solar-powered electricity for charging devices, and a dedicated dining tent rather than a shared communal setup. The best camps also include a private terrace or fire-pit area attached to each tent, so you are not sharing your stargazing moment with the entire camp.',
					'Dinner should be a multi-course Moroccan meal — often a slow-cooked lamb or chicken tagine, fresh bread baked in a sand oven, and mint tea served with the traditional height-pour — followed by a live Gnawa or Berber percussion performance around the fire. Ask your operator directly whether tents have private bathrooms; this single detail is the biggest gap between "photogenic on Instagram" and actually comfortable at 2am.',
				],
			},
			{
				heading: 'Sunset, camel trek, and the sunrise you came for',
				paragraphs: [
					'The classic sequence at Erg Chebbi starts with a camel trek into the dunes timed to arrive before sunset — plan on 45-90 minutes in the saddle, which is comfortable for most travellers but worth mentioning if you have back issues, since a 4x4 transfer option usually exists as an alternative.',
					'Watching the dunes shift from gold to deep orange to violet as the sun drops is, without exaggeration, the single most photographed moment on a Morocco itinerary. After dinner and music, we always tell guests to set an alarm for the very early hours: with zero light pollution, the Milky Way is visible to the naked eye on clear nights, which is increasingly rare to experience anywhere in the world. Sunrise the next morning, best watched from the top of the nearest dune with a coffee in hand, is the quieter, equally memorable bookend.',
				],
			},
			{
				heading: 'Best time of year for a desert night',
				paragraphs: [
					'October to April is the sweet spot. Daytime temperatures are pleasant (18-28°C) and nights are cool enough to enjoy a fire but not bitterly cold. December and January nights can drop close to freezing in Merzouga specifically, so a warm layer is essential even though days feel mild.',
					'May to September should be approached carefully: daytime desert heat regularly exceeds 40°C, which is manageable for a one-night Agafay stay near Marrakech but far more demanding on the multi-day drive to Merzouga. If summer is your only option, Agafay is the more comfortable choice.',
				],
			},
			{
				heading: 'What to pack for the desert',
				paragraphs: [
					'Layers are everything: a warm layer for the evening drop in temperature (year-round, not just winter), a scarf or shesh to protect against blowing sand, sunglasses, sun protection for daytime, and closed shoes rather than sandals for the camel trek and dune walking. A headlamp or phone flashlight is genuinely useful once the camp generator winds down for the night.',
				],
			},
		],
		internalLinks: [
			{
				label: '4-Day Marrakech to Merzouga Desert',
				description: 'Our signature route to the towering dunes of Erg Chebbi, with the Atlas Mountains and Todra Gorge along the way.',
				to: `${ROUTE_PATHS.tourDetail.replace(':slug', 'marrakech-merzouga-desert')}`,
			},
			{
				label: 'Agafay Desert Luxury Overnight',
				description: 'A five-star desert night just 45 minutes from Marrakech — ideal for shorter trips.',
				to: `${ROUTE_PATHS.tourDetail.replace(':slug', 'agafay-luxury-camp')}`,
			},
			{
				label: 'All Desert Tours',
				description: 'Compare every desert itinerary we run, from one-night stays to multi-day Sahara expeditions.',
				to: ROUTE_PATHS.desertTours,
			},
			{
				label: 'Merzouga Sahara Destination Guide',
				description: 'What to see and do around Erg Chebbi beyond the camp itself.',
				to: `${ROUTE_PATHS.destinationDetail.replace(':slug', 'merzouga-sahara')}`,
			},
		],
	},
	{
		id: '3-perfect-days-in-marrakech',
		destinationId: 'marrakech',
		slug: '3-perfect-days-in-marrakech',
		image: IMG.marrakech,
		title: '3 perfect days in Marrakech',
		category: 'City Guide',
		summary: 'How to experience the Red City like an insider, from souks to rooftop dining.',
	},
	{
		id: 'food-lovers-journey-through-morocco',
		slug: 'a-food-lovers-journey-through-morocco',
		image: IMG.tagine,
		title: "A food lover's journey through Morocco",
		category: 'Food',
		summary: 'Tagines, pastilla and mint tea — the flavours that define Moroccan cuisine.',
	},
	{
		id: 'why-chefchaouen-belongs-on-your-itinerary',
		destinationId: 'chefchaouen',
		slug: 'why-chefchaouen-belongs-on-your-itinerary',
		image: IMG.chefchaouen,
		title: 'Why Chefchaouen belongs on your itinerary',
		category: 'Destinations',
		summary: "The story behind Morocco's enchanting blue city.",
	},
	{
		id: 'best-time-to-visit-morocco',
		slug: 'best-time-to-visit-morocco',
		image: IMG.atlas,
		title: 'Best time to visit Morocco',
		category: 'Planning',
		summary: 'A month-by-month guide to weather, festivals and crowds.',
	},
	{
		id: 'how-to-choose-the-perfect-riad',
		slug: 'how-to-choose-the-perfect-riad',
		image: IMG.riad,
		title: 'How to choose the perfect riad',
		category: 'Luxury',
		summary: 'What sets a truly special Moroccan riad apart.',
	},
];
