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
		quickAnswer: 'A luxury Sahara desert night means a private tent with a real bed and en-suite bathroom, a multi-course Moroccan dinner, and a camel trek at sunset — either at Erg Chebbi near Merzouga (the towering dunes, 9-10 hours from Marrakech) or Agafay (a rocky desert just 45 minutes from Marrakech, best if time is short).',
		datePublished: '2026-02-10',
		dateModified: '2026-07-16',
		readTime: '9 min read',
		author: {
			name: 'Youssef El Amrani',
			role: 'Desert Operations Lead, Yassine Travel',
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
				table: {
					headers: ['', 'Merzouga (Erg Chebbi)', 'Agafay'],
					rows: [
						['Distance from Marrakech', '9-10 hours by road', '45 minutes'],
						['Dune scale', 'Towering, classic Sahara dunes', 'Rocky, moon-like desert'],
						['Minimum trip length', '3-4 days', '1 night'],
						['Best for', 'Bucket-list Sahara photos', 'Short trips, easy add-on to Marrakech'],
					],
				},
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
		quickAnswer: 'Three days in Marrakech is enough to cover the essentials: day one in the medina (Jemaa el-Fnaa, the souks, Bahia Palace), day two in the gardens and newer city (Majorelle Garden, Gueliz), and day three as a half-day trip into the Atlas foothills or the Agafay desert before flying out.',
		datePublished: '2026-03-02',
		dateModified: '2026-07-16',
		readTime: '7 min read',
		author: {
			name: 'Sofia Bennani',
			role: 'Marrakech Destination Specialist, Yassine Travel',
		},
		content: [
			{
				paragraphs: [
					"Marrakech rewards a slower pace than most first-time visitors give it. Three full days is the sweet spot: enough time to see the medina's essentials without rushing, and enough room left over for at least one thing outside the city walls. Here is how we route it for our guests.",
				],
			},
			{
				heading: 'Day 1: The medina, properly',
				paragraphs: [
					"Start early at Jemaa el-Fnaa before the square fills up, then slip into the souks while the light is still soft — the spice market, the dyers' souk, and the lantern makers are all within a few minutes of each other. Bahia Palace and the Saadian Tombs are worth the entry fee for the tilework alone; both get crowded by midday, so aim to visit before 11am.",
					'End the day on a rooftop overlooking the square. The call to prayer at sunset, with swifts circling over the square below, is one of those moments that photos never quite capture.',
				],
			},
			{
				heading: 'Day 2: Gardens, design, and the new city',
				paragraphs: [
					'Majorelle Garden is popular for a reason — the cobalt-blue villa against the cacti and bamboo is genuinely striking, and the small Berber Museum inside is worth the extra ticket. Book your slot online in advance; it sells out most mornings.',
					"Spend the afternoon in Gueliz, Marrakech's newer district, for concept stores, contemporary art galleries, and a change of pace from the medina's intensity. It is also where you will find some of the city's best modern Moroccan restaurants, if you want a break from tagine.",
				],
			},
			{
				heading: 'Day 3: Escape the city for a few hours',
				paragraphs: [
					"This is the day most itineraries get wrong — either skipping it entirely or trying to cram in a full desert trip that leaves you exhausted for departure. A half-day into the Atlas foothills or the Agafay desert is the better call: close enough to be back in the city by mid-afternoon, different enough to feel like a real change of scenery.",
					'If you have a late flight, this also works well as a morning trip before heading to the airport.',
				],
			},
			{
				heading: 'A few practical notes',
				paragraphs: [
					'Riads book up faster than hotels in high season (March-May, September-November), so reserve at least six weeks out if you have specific dates. Cash is still preferred in the souks for small purchases, and haggling is expected — start at roughly half the first price quoted.',
				],
			},
		],
		internalLinks: [
			{
				label: 'Marrakech Day Trips Collection',
				description: 'Atlas Mountains, Agafay Desert, or the Atlantic coast — all back in the city by evening.',
				to: ROUTE_PATHS.dayTrips,
			},
			{
				label: 'Agafay Desert Luxury Overnight',
				description: 'Turn your third day into an overnight if you want more than a half-day escape.',
				to: `${ROUTE_PATHS.tourDetail.replace(':slug', 'agafay-luxury-camp')}`,
			},
			{
				label: 'Marrakech Destination Guide',
				description: 'Everything else to see and do in the Red City.',
				to: `${ROUTE_PATHS.destinationDetail.replace(':slug', 'marrakech')}`,
			},
			{
				label: 'Private Drivers in Morocco',
				description: 'Skip the taxi negotiations with a private driver-guide for your Marrakech days.',
				to: ROUTE_PATHS.privateDrivers,
			},
		],
	},
	{
		id: 'food-lovers-journey-through-morocco',
		slug: 'a-food-lovers-journey-through-morocco',
		image: IMG.tagine,
		title: "A food lover's journey through Morocco",
		category: 'Food',
		summary: 'Tagines, pastilla and mint tea — the flavours that define Moroccan cuisine.',
		quickAnswer: "Moroccan cuisine centres on slow-cooked tagines (lamb, chicken, or vegetable, simmered with preserved lemon and olives), couscous on Fridays, pastilla (a sweet-savoury pigeon or chicken pie), and mint tea poured from height as a mark of hospitality. Regional specialities vary — Fes is known for pastilla, Essaouira for grilled sardines, Marrakech for tanjia.",
		datePublished: '2026-03-18',
		dateModified: '2026-07-16',
		readTime: '6 min read',
		author: {
			name: 'Youssef El Amrani',
			role: 'Desert Operations Lead, Yassine Travel',
		},
		content: [
			{
				paragraphs: [
					'Ask any Moroccan about food and the conversation will run long — cuisine here is regional, seasonal, and deeply tied to hospitality. A few dishes show up everywhere, but the best versions of each tend to belong to a specific city or even a specific grandmother.',
				],
			},
			{
				heading: 'The tagine, done right',
				paragraphs: [
					'A tagine is both the clay cooking vessel and the dish itself — meat or vegetables slow-cooked with a specific balance of spices, usually preserved lemon, olives, or dried fruit depending on the region. The conical lid traps steam and returns it to the pot, which is why a good tagine needs almost no added liquid. Chicken with preserved lemon and olives is the classic; lamb with prunes and almonds is the celebratory version served at weddings.',
				],
			},
			{
				heading: 'Beyond the tagine: what to look for by city',
				paragraphs: [
					"Fes is the place for pastilla — a delicate pastry pie traditionally filled with pigeon, now more often chicken, layered with almonds, cinnamon, and sugar in a sweet-savoury combination that surprises most first-time visitors. In Marrakech, look for tanjia: beef or lamb slow-cooked for hours in a sealed urn, traditionally in the embers of a hammam furnace. Along the coast in Essaouira, it is all about the grill — sardines and the day's catch, simply prepared with charmoula.",
					"Couscous is traditionally a Friday dish, served with seven vegetables and a rich broth. If you're travelling with a private guide, ask where locals actually eat — the best couscous is rarely at the restaurant with the nicest terrace.",
				],
			},
			{
				heading: 'Mint tea is not an afterthought',
				paragraphs: [
					'Called "Moroccan whisky" half-jokingly, mint tea is poured from a height to aerate it and create a light foam on top — a small piece of showmanship that also signals hospitality. Refusing a glass when offered is considered impolite; expect at least three rounds if you are a guest in someone\'s home, following the local saying about the three glasses each tasting different.',
				],
			},
		],
		internalLinks: [
			{
				label: 'Custom Tours',
				description: 'Build a trip around food markets, cooking classes, and regional specialities.',
				to: ROUTE_PATHS.customTours,
			},
			{
				label: 'A food lover\'s journey continues in Fes',
				description: 'Pair this guide with our private Fes cultural discovery tour.',
				to: `${ROUTE_PATHS.tourDetail.replace(':slug', 'private-fes-city')}`,
			},
			{
				label: 'All Tours',
				description: 'Every itinerary we run, from day trips to two-week luxury circuits.',
				to: ROUTE_PATHS.tours,
			},
		],
	},
	{
		id: 'why-chefchaouen-belongs-on-your-itinerary',
		destinationId: 'chefchaouen',
		slug: 'why-chefchaouen-belongs-on-your-itinerary',
		image: IMG.chefchaouen,
		title: 'Why Chefchaouen belongs on your itinerary',
		category: 'Destinations',
		summary: "The story behind Morocco's enchanting blue city.",
		quickAnswer: "Chefchaouen is a mountain town in the Rif, famous for its blue-washed old town — a tradition often linked to Jewish refugees in the 1930s, though its exact origins are debated. It's a 4-5 hour drive from Fes or Tangier, best visited as a 1-2 day add-on rather than a rushed day trip.",
		datePublished: '2026-04-05',
		dateModified: '2026-07-16',
		readTime: '6 min read',
		author: {
			name: 'Sofia Bennani',
			role: 'Marrakech Destination Specialist, Yassine Travel',
		},
		content: [
			{
				paragraphs: [
					"Photos of Chefchaouen circulate so widely online that it is easy to assume the blue is a tourist gimmick. It is not — the tradition runs back generations, and walking the alleys in person feels different from any photograph, with the blue shifting shade depending on the angle of the light and the time of day.",
				],
			},
			{
				heading: 'Where the blue comes from',
				paragraphs: [
					"The most common explanation ties the tradition to Jewish refugees who settled in Chefchaouen in the 1930s, for whom blue held religious significance as a reminder of the sky and of God. Other theories link it to keeping mosquitoes away or simply to an aesthetic that stuck. Locals will often give you a different answer depending on who you ask — which is part of the town's charm.",
				],
			},
			{
				heading: 'What to actually do there',
				paragraphs: [
					'The old town itself is the main event: wandering without a fixed plan is the best way to see it, since the best alleys are rarely the ones marked on a map. The Spanish Mosque, a 20-30 minute walk uphill from the medina, gives a wide view over the blue rooftops and is worth timing for sunset.',
					'Chefchaouen is also a good base for buying handwoven wool and leather goods directly from the people who make them, generally at fairer prices and better quality than in the bigger city souks.',
				],
			},
			{
				heading: 'How to fit it into a longer trip',
				paragraphs: [
					"Chefchaouen sits awkwardly for a single day trip from most starting points — it works far better as a 1-2 night stop between Fes and Tangier, or as part of a longer circuit that also covers the imperial cities and the Sahara. Rushing it in and out on the same day from Fes means roughly 8 hours of driving for a few hours in town, which we don't recommend.",
				],
			},
		],
		internalLinks: [
			{
				label: 'Chefchaouen Destination Guide',
				description: 'Practical details on visiting the blue city.',
				to: `${ROUTE_PATHS.destinationDetail.replace(':slug', 'chefchaouen')}`,
			},
			{
				label: '10-Day Imperial Cities & Sahara Luxury',
				description: 'Our circuit that includes a stop in Chefchaouen alongside Fes and the desert.',
				to: `${ROUTE_PATHS.tourDetail.replace(':slug', 'imperial-cities-sahara')}`,
			},
			{
				label: '14-Day Grand Tour of Morocco',
				description: 'A longer circuit that gives Chefchaouen the time it deserves.',
				to: `${ROUTE_PATHS.tourDetail.replace(':slug', 'grand-tour-morocco')}`,
			},
		],
	},
	{
		id: 'best-time-to-visit-morocco',
		slug: 'best-time-to-visit-morocco',
		image: IMG.atlas,
		title: 'Best time to visit Morocco',
		category: 'Planning',
		summary: 'A month-by-month guide to weather, festivals and crowds.',
		quickAnswer: 'The best time to visit Morocco overall is March-May or September-November, when temperatures are mild across the country. Summer (June-August) suits the coast and mountains but is very hot in the Sahara and imperial cities; winter (December-February) is pleasant in the south but cold at night in the desert and mountains.',
		datePublished: '2026-04-20',
		dateModified: '2026-07-16',
		readTime: '7 min read',
		author: {
			name: 'Youssef El Amrani',
			role: 'Desert Operations Lead, Yassine Travel',
		},
		content: [
			{
				paragraphs: [
					"Morocco's geography makes this a genuinely regional question — the coast, the Sahara, and the Atlas Mountains rarely share the same weather at the same time of year. The short answer is spring and autumn for most itineraries, but the right month depends heavily on where you are actually going.",
				],
				table: {
					headers: ['Season', 'Best for', 'Watch out for'],
					rows: [
						['March-May', 'Marrakech, Fes, Atlas hiking, whole-country itineraries', 'Occasional rain in the north early spring'],
						['June-August', 'Coastal towns (Essaouira, Tangier), mountain retreats', 'Extreme heat in the Sahara and imperial cities, 40°C+'],
						['September-November', 'Whole-country itineraries, desert nights', 'Booking early — this is peak season'],
						['December-February', 'Marrakech (mild days), Sahara stargazing', 'Cold desert and mountain nights, near freezing'],
					],
				},
			},
			{
				heading: 'For a desert-focused trip',
				paragraphs: [
					'October to April is the window for a comfortable Sahara night — daytime heat is manageable and evenings are cool enough to enjoy a fire without being unbearable. Peak summer in the desert regularly exceeds 40°C during the day, which makes multi-day driving between Marrakech and Merzouga genuinely demanding.',
				],
			},
			{
				heading: 'For the imperial cities (Marrakech, Fes, Meknes)',
				paragraphs: [
					'Spring and autumn again win here — summer afternoons in the medinas can be exhausting for walking tours, while winter is mild during the day but the riads (built around open courtyards) can feel cold at night without proper heating. Ask specifically about heating when booking a riad for a December-February stay.',
				],
			},
			{
				heading: 'Festivals worth planning around',
				paragraphs: [
					"Ramadan's dates shift each year on the Gregorian calendar; restaurant hours and daytime dining change significantly during this month, which is worth checking before booking if food experiences are a priority. Outside of that, regional moussems (traditional festivals) happen throughout the year in different towns — your trip designer can flag any that align with your dates.",
				],
			},
		],
		internalLinks: [
			{
				label: 'The ultimate guide to a luxury Sahara desert night',
				description: 'Timing your desert night around the best months.',
				to: `${ROUTE_PATHS.blogArticle.replace(':slug', 'the-ultimate-guide-to-a-luxury-sahara-desert-night')}`,
			},
			{
				label: 'Custom Tours',
				description: 'Tell us your travel dates and we\'ll design the itinerary around the best regions for that season.',
				to: ROUTE_PATHS.customTours,
			},
			{
				label: 'All Tours',
				description: 'Browse itineraries by season and region.',
				to: ROUTE_PATHS.tours,
			},
		],
	},
	{
		id: 'how-to-choose-the-perfect-riad',
		destinationId: 'marrakech',
		slug: 'how-to-choose-the-perfect-riad',
		image: IMG.riad,
		title: 'How to choose the perfect riad',
		category: 'Luxury',
		summary: 'What sets a truly special Moroccan riad apart.',
		quickAnswer: 'A great riad comes down to four things: a genuinely quiet location just off (not on) a busy alley, natural light in the courtyard, honest recent reviews mentioning noise and service, and confirmation of what\'s actually included (breakfast, airport transfer, rooftop access) before booking.',
		datePublished: '2026-05-08',
		dateModified: '2026-07-16',
		readTime: '6 min read',
		author: {
			name: 'Sofia Bennani',
			role: 'Marrakech Destination Specialist, Yassine Travel',
		},
		content: [
			{
				paragraphs: [
					"A riad is a traditional Moroccan house built around an interior courtyard or garden, and the format itself has become synonymous with a certain kind of intimate, design-led stay. But the word alone tells you very little — we have seen riads that are extraordinary and others that are a converted house with a nice Instagram feed. Here is what actually separates the two.",
				],
			},
			{
				heading: 'Location matters more than photos',
				paragraphs: [
					"The single biggest factor in guest satisfaction is noise, not decor. A riad directly on a busy alley in the medina can mean early-morning delivery carts and evening foot traffic right outside your window; one tucked two turns off the main path, even by 30 metres, is often dramatically quieter. Ask specifically about the riad's exact position relative to the nearest souk or square before booking, not just the general neighbourhood.",
				],
			},
			{
				heading: 'Natural light in the courtyard',
				paragraphs: [
					'Riads are built inward, which means some courtyards get very little direct sunlight depending on the height of the surrounding walls and the time of year. A courtyard that stays bright through the day makes a real difference to how the whole stay feels, especially if you plan to spend downtime there rather than out sightseeing.',
				],
			},
			{
				heading: 'Read the recent reviews, not just the rating',
				paragraphs: [
					"A 4.8-star average can hide a lot. Read the most recent 10-15 reviews specifically for mentions of noise, air conditioning reliability, and staff responsiveness — these are the details that vary most between an average riad and an exceptional one, and they rarely show up in professional photography.",
				],
			},
			{
				heading: 'Confirm what is actually included',
				paragraphs: [
					'Breakfast, airport transfer, and rooftop or pool access are sometimes included and sometimes charged separately, even among riads at a similar price point. It is worth confirming directly, especially for stays during peak season when smaller inclusions can otherwise become unexpected extra costs.',
				],
			},
		],
		internalLinks: [
			{
				label: 'Marrakech Destination Guide',
				description: 'Where the best riad neighbourhoods actually are.',
				to: `${ROUTE_PATHS.destinationDetail.replace(':slug', 'marrakech')}`,
			},
			{
				label: '3 Perfect Days in Marrakech',
				description: 'Plan your medina days around your riad\'s location.',
				to: `${ROUTE_PATHS.blogArticle.replace(':slug', '3-perfect-days-in-marrakech')}`,
			},
			{
				label: 'Custom Tours',
				description: 'We hand-pick riads as part of every custom itinerary we design.',
				to: ROUTE_PATHS.customTours,
			},
		],
	},
	{
		id: 'terres-amanar-zipline-marrakech-guide',
		destinationId: 'atlas-mountains',
		slug: 'terres-amanar-marrakech-zipline-activities-guide',
		image: IMG.zipline,
		title: "Terres d'Amanar near Marrakech: zipline, activities and what to expect",
		category: 'Adventure',
		summary: "What to know before a day trip to Terres d'Amanar — the zipline park in the Atlas foothills near Marrakech.",
		quickAnswer: "Terres d'Amanar is an adventure park in the Atlas Mountains foothills, about 30-45 minutes from Marrakech near the village of Tahnaout. It's known for one of the longest zipline courses in Africa, plus tree-climbing (accrobranche), mountain biking, horse riding and suspension bridges — usually done as a day trip with lunch included, though overnight stays are possible too.",
		datePublished: '2026-06-02',
		dateModified: '2026-07-29',
		readTime: '6 min read',
		author: {
			name: 'Youssef El Amrani',
			role: 'Desert Operations Lead, Yassine Travel',
		},
		content: [
			{
				paragraphs: [
					"Most first-time visitors to Marrakech don't realise the Atlas Mountains start barely half an hour outside the city. Terres d'Amanar sits right at that edge — a working adventure park built into the pine forests and red-earth canyons of the foothills, and one of the most popular half-day escapes for anyone who wants something more active than a souk stroll.",
				],
			},
			{
				heading: "What is Terres d'Amanar",
				paragraphs: [
					"Terres d'Amanar is a 120-hectare adventure estate near the village of Tahnaout, bordering Toubkal National Park at around 1,200 metres of altitude. It was built around one of the largest aerial zipline courses in Africa — several lines strung across a canyon, with the longest run stretching several hundred metres — plus a wider park of tree-to-tree courses, suspension bridges and mountain trails.",
					"It's privately run as an eco-tourism estate rather than a public attraction, which is why it books through tour operators and guides rather than a walk-up ticket counter.",
				],
			},
			{
				heading: "Zipline and activities",
				paragraphs: [
					"The zipline course is the headline draw: multiple lines of varying length and height, glided in a harness with a certified instructor managing each launch and landing. It suits a wide range of confidence levels — nervous first-timers get the shorter, lower lines, while the longest run is a genuine adrenaline moment with the canyon opening up beneath you.",
					"Beyond the zipline, the estate runs an accrobranche (tree-climbing) course at several difficulty levels, mountain biking trails through the pine forest, horse and mule rides, archery, and a suspension rope bridge crossing. Most day visits combine two or three of these rather than trying to do everything in one trip.",
				],
			},
			{
				heading: 'Getting there and what to expect',
				paragraphs: [
					"From Marrakech, it's roughly a 30-45 minute drive into the foothills near Tahnaout — the road narrows toward the end, which is one reason most visitors come with a driver rather than a rental car. A typical day trip includes a safety briefing on arrival, 2-3 hours across the zipline and tree-climbing courses, and a Moroccan lunch on site — often a tagine with salad and fresh bread, eaten with a panoramic view over the valley.",
					"Some itineraries add a stop at a local Argan oil cooperative on the way, where Berber women demonstrate the traditional extraction process — a good complement to the physical activity, and a common pairing on tours from Marrakech.",
				],
			},
			{
				heading: 'Who it suits, and when to go',
				paragraphs: [
					"Terres d'Amanar works well for families (children's courses are lower and shorter), couples wanting an active day out, and small groups. It runs year-round, though spring and autumn give the most comfortable temperatures for a few hours outdoors; summer afternoons in the canyon can get warm despite the altitude.",
					"It's also possible to stay overnight at the estate's eco-lodge rather than doing it as a single day trip from Marrakech, if you'd rather spend a full two days in the mountains without the return drive each day.",
				],
			},
		],
		internalLinks: [
			{
				label: "Zip Line Adventure at Les Terres d'Amanar",
				description: "Our private day trip covering the zipline course, lunch on site, and a stop in Imlil village.",
				to: `${ROUTE_PATHS.tourDetail.replace(':slug', 'zipline-adventure-terres-damanar')}`,
			},
			{
				label: 'Atlas Mountains Destination Guide',
				description: 'Other ways to spend a day in the Atlas foothills near Marrakech.',
				to: `${ROUTE_PATHS.destinationDetail.replace(':slug', 'atlas-mountains')}`,
			},
			{
				label: 'Marrakech Day Trips Collection',
				description: 'Compare every half-day and full-day option from Marrakech.',
				to: ROUTE_PATHS.dayTrips,
			},
		],
	},
];
