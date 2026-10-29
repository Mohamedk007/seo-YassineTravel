// Human-friendly structure of the editable datasets registered in
// src/content/registry.js. Keys containing `{lang}` exist once per language.
//
// Optional `fields`: per-field hints keyed by path pattern ("*" = any list
// index). A hint can set { label, help, default, item, options, type, image,
// rich, multiline, maxLength }. Fields with a `default` are shown even when an
// entry doesn't have them yet (a function default receives the parent object);
// `item` is the template used by "+ Add". `fields` can also be a function of
// the language.
// Optional `newItem()`: the complete blank entry created by "+ New".

import { defaultGroupPrices } from '../src/data/tours/pricing.js';

const BLOG_SECTION = { heading: '', headingLevel: 'h2', paragraphs: [''], image: '', imageAlt: '', imageCaption: '', html: '' };

const BLOG_FIELDS = {
	'*.id': { label: 'ID (same in EN and FR)', help: 'Links the English and French versions of the article. Lowercase letters, numbers and dashes.' },
	'*.slug': { label: 'URL slug', help: 'The page address: /blog/<slug>. Lowercase letters, numbers and dashes only.' },
	'*.title': { label: 'H1 heading', help: 'The main heading of the article (the page\'s only H1). Also used as the Google title when "Meta title" is empty.' },
	'*.seoTitle': { label: 'Meta title (SEO)', default: '', maxLength: 60, help: 'Title shown in Google results and the browser tab. Leave empty to reuse the H1.' },
	'*.metaDescription': { label: 'Meta description (SEO)', default: '', maxLength: 160, multiline: true, help: 'Snippet shown under the title in Google (aim for 140-160 characters). Leave empty to reuse the intro.' },
	'*.summary': { label: 'Intro (under the H1)', help: 'Short introduction shown under the H1 and on the blog list card.' },
	'*.image': { label: 'Cover image', image: true },
	'*.imageAlt': { label: 'Cover image alt text', default: '', help: 'Describe what the image shows (used by Google Images and screen readers).' },
	'*.category': { label: 'Category' },
	'*.destinationId': { label: 'Related destination id', help: 'Optional, e.g. "marrakech" or "merzouga-sahara": shows the article on that destination page.' },
	'*.quickAnswer': { label: 'Quick answer ("In short" box)', default: '', rich: true, help: 'Optional 1-3 sentence answer shown at the top of the article.' },
	'*.datePublished': { label: 'Published date', type: 'date' },
	'*.dateModified': { label: 'Last updated date', type: 'date' },
	'*.readTime': { label: 'Read time', help: 'e.g. "7 min read".' },
	'*.author': { label: 'Author' },
	'*.content': {
		label: 'Article sections (H2 / H3)',
		item: BLOG_SECTION,
		itemName: 'section',
		help: 'Each section is one H2 (or H3) heading followed by its paragraphs, with an optional image. Add as many sections as you need; a section without heading continues the previous one.',
	},
	'*.content.*.heading': { label: 'Section heading', help: 'Leave empty for an intro section without heading.' },
	'*.content.*.headingLevel': {
		label: 'Heading level',
		default: 'h2',
		options: [
			{ value: 'h2', label: 'H2 - main section' },
			{ value: 'h3', label: 'H3 - sub-section' },
		],
	},
	'*.content.*.image': { label: 'Section image (optional)', default: '', image: true, help: 'Shown under the section heading.' },
	'*.content.*.imageAlt': { label: 'Section image alt text', default: '' },
	'*.content.*.imageCaption': { label: 'Section image caption', default: '' },
	'*.content.*.paragraphs': { label: 'Paragraphs', item: '', itemName: 'paragraph' },
	'*.content.*.paragraphs.*': { rich: true },
	'*.content.*.html': {
		label: 'Custom HTML (optional)',
		default: '',
		html: true,
		help: 'Shown after the paragraphs of this section. Scripts, event handlers (onclick...) and forms are removed when saving; iframes are allowed from YouTube, Vimeo, Google Maps, TripAdvisor, Instagram, Facebook and Spotify.',
	},
	'*.internalLinks': { label: 'Related links box', item: { label: '', description: '', to: '' }, itemName: 'link' },
	'*.internalLinks.*.to': { label: 'Link', help: 'A site path such as /tour/marrakech-merzouga-desert or /destinations/marrakech.' },
};

function newBlogPost() {
	const suffix = Math.random().toString(36).slice(2, 6);
	const today = new Date().toISOString().slice(0, 10);
	return {
		id: `new-article-${suffix}`,
		slug: `new-article-${suffix}`,
		title: '',
		seoTitle: '',
		metaDescription: '',
		summary: '',
		image: '',
		imageAlt: '',
		category: '',
		destinationId: '',
		quickAnswer: '',
		datePublished: today,
		dateModified: today,
		readTime: '',
		author: { name: '', role: '' },
		content: [structuredClone(BLOG_SECTION)],
		internalLinks: [],
	};
}

// ---- Page parts (home page and footer) ----------------------------------
// Each part is { id, type, hidden, ...fields }. `type` picks the component in
// src/components/home/HomeSections.jsx or src/components/site/Footer.jsx.

// Keep in sync with ICONS in src/components/home/HomeSections.jsx.
const ICON_NAMES = ['Check', 'ShieldCheck', 'Sparkles', 'HeartHandshake', 'Award', 'Compass', 'MapPin', 'Users', 'Clock', 'Star', 'Car', 'Plane', 'Camera', 'Mountain', 'Sun', 'Gem', 'Tent', 'Heart', 'MessageCircle'];
const ICON_OPTIONS = ICON_NAMES.map((name) => ({ value: name, label: name }));
const BACKGROUND_OPTIONS = [
	{ value: 'light', label: 'Light (white)' },
	{ value: 'muted', label: 'Soft beige' },
	{ value: 'dark', label: 'Dark' },
];
const LINK_HELP = 'A site path without language prefix (e.g. /tours, /blog) or a full https:// URL. Leave empty to hide.';

function partTypes(definitions) {
	return definitions.map(([value, label, fields]) => ({
		value,
		label,
		create: () => ({
			id: `${value.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}-${Math.random().toString(36).slice(2, 6)}`,
			type: value,
			hidden: false,
			...structuredClone(fields),
		}),
	}));
}

function partTitle(types) {
	return (part, index) => {
		const type = types.find((entry) => entry.value === part?.type);
		const name = part?.title || part?.description || part?.text || '';
		const short = name.length > 40 ? `${name.slice(0, 40)}…` : name;
		return `${index + 1}. ${type ? type.label.split(' (')[0] : part?.type || 'Part'}${short ? `: ${short}` : ''}`;
	};
}

const HOME_PART_TYPES = partTypes([
	['hero', 'Hero banner (H1 when first)', { title: '', highlight: '', description: '', primaryCtaLabel: '', secondaryCtaLabel: '', trustPoints: [], showLeadForm: false, leadFormTitle: '', leadFormSubtitle: '', image: '', imageAlt: '' }],
	['awardsStrip', 'Awards strip', {}],
	['trustSummary', 'Rating & benefits', { rating: '5.0', description: '', subdescription: '', showAwards: true, benefits: [] }],
	['popularTours', 'Popular tours', { eyebrow: '', title: '', ctaLabel: '', featuredCount: 3 }],
	['luxury', 'Luxury highlight (image + list)', { eyebrow: '', title: '', description: '', features: [], ctaLabel: '', image: '', imageAlt: '' }],
	['whyChooseUs', 'Why choose us (reasons + stats)', { eyebrow: '', title: '', description: '', reasons: [], stats: [], quoteText: '', quoteAuthor: '', image: '', imageAlt: '' }],
	['testimonials', 'Testimonials', { eyebrow: '', title: '', featuredCount: 3 }],
	['bookingProcess', 'Booking steps', { eyebrow: '', title: '', steps: [] }],
	['contactBanner', 'Map & WhatsApp banner', { title: '', description: '', primaryCtaLabel: '', showMap: true }],
	['leadCapture', 'Quote form with image', { eyebrow: '', title: '', description: '', points: [], image: '', imageAlt: '' }],
	['faq', 'FAQ', { eyebrow: '', title: '', ctaLabel: '' }],
	['richText', 'Text block (paragraphs, image, button)', { background: 'light', eyebrow: '', title: '', paragraphs: [''], image: '', imageAlt: '', imagePosition: 'right', ctaLabel: '', ctaLink: '' }],
	['cards', 'Cards grid', { background: 'light', eyebrow: '', title: '', description: '', items: [{ icon: '', title: '', text: '', linkLabel: '', link: '' }] }],
	['ctaBand', 'Call-to-action band', { background: 'dark', title: '', description: '', ctaLabel: '', ctaLink: '', whatsAppLabel: '' }],
]);

const PART_COMMON_FIELDS = {
	'*.id': { label: 'Part ID', help: 'Unique name of this part (lowercase letters, numbers, dashes).' },
	'*.hidden': { label: 'Hide this part', help: 'Keeps the part here but removes it from the live site.' },
};

const HOME_FIELDS = {
	...PART_COMMON_FIELDS,
	'*.type': { label: 'Part type', readOnly: true, options: HOME_PART_TYPES },
	'*.background': { label: 'Background', options: BACKGROUND_OPTIONS },
	'*.eyebrow': { label: 'Small label above the heading' },
	'*.title': { label: 'Heading', help: 'H1 for the first hero part of the page, H2 for every other part.' },
	'*.highlight': { label: 'Highlighted words (gold)', help: 'Must match a part of the heading exactly. Leave empty for none.' },
	'*.description': { label: 'Text', multiline: true },
	'*.subdescription': { label: 'Second line' },
	'*.image': { label: 'Image', image: true },
	'*.imageAlt': { label: 'Image alt text', help: 'Leave empty to use the alt text from the image library.' },
	'*.imagePosition': { label: 'Image position', options: [{ value: 'right', label: 'Right' }, { value: 'left', label: 'Left' }] },
	'*.primaryCtaLabel': { label: 'WhatsApp button label' },
	'*.secondaryCtaLabel': { label: 'Tours button label' },
	'*.ctaLabel': { label: 'Button label', help: 'Leave empty to hide the button.' },
	'*.ctaLink': { label: 'Button link', help: LINK_HELP },
	'*.whatsAppLabel': { label: 'WhatsApp button label', help: 'Leave empty to hide.' },
	'*.trustPoints': { label: 'Trust points', item: '', itemName: 'point' },
	'*.showLeadForm': { label: 'Show the quote form' },
	'*.featuredCount': { label: 'Number of items shown' },
	'*.features': { label: 'Features', item: '', itemName: 'feature' },
	'*.points': { label: 'Bullet points', item: '', itemName: 'point' },
	'*.reasons': { label: 'Reasons', item: { title: '', text: '' }, itemName: 'reason' },
	'*.stats': { label: 'Stats', item: { value: '', label: '' }, itemName: 'stat' },
	'*.steps': { label: 'Steps', item: { number: '', title: '', text: '' }, itemName: 'step' },
	'*.benefits': { label: 'Benefits', item: { icon: 'Check', title: '', text: '' }, itemName: 'benefit' },
	'*.benefits.*.icon': { label: 'Icon', options: ICON_OPTIONS },
	'*.items': { label: 'Cards', item: { icon: '', title: '', text: '', linkLabel: '', link: '' }, itemName: 'card' },
	'*.items.*.icon': { label: 'Icon', options: [{ value: '', label: '(none)' }, ...ICON_OPTIONS] },
	'*.items.*.text': { rich: true },
	'*.items.*.link': { label: 'Link', help: LINK_HELP },
	'*.paragraphs': { label: 'Paragraphs', item: '', itemName: 'paragraph' },
	'*.paragraphs.*': { rich: true },
	'*.showMap': { label: 'Show the map' },
	'*.showAwards': { label: 'Show the awards' },
	'*.quoteText': { label: 'Quote', multiline: true },
	'*.quoteAuthor': { label: 'Quote author' },
};

const FOOTER_PART_TYPES = partTypes([
	['newsletter', 'Newsletter band (top)', { title: '', description: '' }],
	['brand', 'Logo & description column', { description: '', showRating: true, showSocial: true }],
	['links', 'Links column', { title: '', links: [{ label: '', to: '' }] }],
	['contact', 'Contact column', { title: '', showAwards: true }],
	['text', 'Text column', { title: '', paragraphs: [''] }],
	['legal', 'Legal band (bottom)', { text: '' }],
]);

const FOOTER_FIELDS = {
	...PART_COMMON_FIELDS,
	'*.type': { label: 'Part type', readOnly: true, options: FOOTER_PART_TYPES },
	'*.description': { multiline: true },
	'*.links': { label: 'Links', item: { label: '', to: '' }, itemName: 'link' },
	'*.links.*.to': { label: 'Link', help: LINK_HELP },
	'*.links.*.rel': { label: 'Link type', options: [{ value: '', label: 'Do-follow' }, { value: 'nofollow', label: 'Nofollow' }] },
	'*.paragraphs': { label: 'Paragraphs', item: '', itemName: 'paragraph' },
	'*.paragraphs.*': { rich: true },
	'*.text': { multiline: true },
};

// Built per language so a tour that has no group prices yet starts from the
// same values the live page shows (labels in the right language).
const TOUR_FIELDS_BY_LANG = {};
function tourFields(lang) {
	TOUR_FIELDS_BY_LANG[lang] ||= {
		'*.id': { label: 'ID (same in EN and FR)' },
		'*.slug': { label: 'URL slug' },
		'*.title': { label: 'Title (H1)' },
		'*.price': {
			label: 'From price (€ per person)',
			help: 'The "from €…" price on tour cards, the booking box and in Google results. EN and FR are edited separately: change both.',
		},
		'*.groupPrices': {
			label: 'Group pricing (price per person)',
			default: (tour) => defaultGroupPrices(tour?.price, lang),
			item: { travellers: '', price: 0 },
			itemName: 'group size',
			help: 'Rows of the "Pricing" table on the tour page. Add, remove or reorder rows freely. Remove every row to go back to the automatic prices (from price, -15% for 3-4, -28% for 5+).',
		},
		'*.groupPrices.*.travellers': { label: 'Group size', help: 'e.g. "2 travellers", "3–4 travellers", "Solo traveller".' },
		'*.groupPrices.*.price': { label: 'Price per person (€)' },
	};
	return TOUR_FIELDS_BY_LANG[lang];
}

export const SECTIONS = [
	{
		id: 'site',
		title: 'Site settings & SEO',
		items: [
			{ key: 'site.brand', label: 'Brand & default SEO', help: 'Brand name, site origin and the default English title/description.' },
			{ key: 'site.copy', label: 'Header & forms', help: 'Navbar buttons, page call-to-action band and the lead form, per language.' },
			{
				key: 'footer.{lang}',
				label: 'Footer',
				help: 'The footer parts in page order. Use Up/Down to reorder, "Hide this part" to remove one temporarily, Delete to remove it, and "Add part" to insert a new column or band after the selected part. Consecutive columns share one row.',
				entityLabel: 'part',
				fields: FOOTER_FIELDS,
				itemTypes: FOOTER_PART_TYPES,
				itemTitle: partTitle(FOOTER_PART_TYPES),
			},
			{ key: 'site.social', label: 'Social links' },
			{ key: 'contact', label: 'Contact details', help: 'Phone, WhatsApp, email, address, map pin and Google Maps embed.' },
			{ key: 'tripadvisor', label: 'TripAdvisor rating', help: 'Rating and review count shown across the site (badges, footer, schema).' },
			{ key: 'seo.defaults', label: 'SEO defaults', help: 'Fallback title, description and social image per language.' },
		],
	},
	{
		id: 'home',
		title: 'Home page',
		items: [
			{
				key: 'home.{lang}',
				label: 'Home page',
				help: 'The home page parts in page order. Use Up/Down to reorder, Duplicate to copy, "Hide this part" to remove one temporarily, Delete to remove it, and "Add part" to insert a new part (including free text blocks, cards and call-to-action bands) after the selected one. Items inside a part (benefits, steps, stats…) can be added, removed and reordered too.',
				entityLabel: 'part',
				fields: HOME_FIELDS,
				itemTypes: HOME_PART_TYPES,
				itemTitle: partTitle(HOME_PART_TYPES),
			},
		],
	},
	{
		id: 'tours',
		title: 'Tours',
		items: [
			{
				key: 'tours.{lang}',
				label: 'Tours',
				help: 'Every tour: title, from price, group pricing, itinerary, images, inclusions. Keep the same "id" in EN and FR so both versions link together.',
				preview: 'tourDetail',
				fields: tourFields,
			},
			{ key: 'tourCategories.{lang}', label: 'Tour collections', help: 'The collection pages (luxury, desert, day trips...) and the tours they list.' },
		],
	},
	{
		id: 'blog',
		title: 'Blog',
		items: [
			{
				key: 'blog.{lang}',
				label: 'Blog articles',
				help: 'Keep the same "id" in EN and FR so translations link together. In paragraphs, use "Insert link" for do-follow links (written as [anchor text](/path or https://...)) and "Bold" for **bold text**.',
				preview: 'blogArticle',
				fields: BLOG_FIELDS,
				newItem: newBlogPost,
			},
		],
	},
	{
		id: 'destinations',
		title: 'Destinations',
		items: [{ key: 'destinations.{lang}', label: 'Destinations', preview: 'destinationDetail' }],
	},
	{
		id: 'services',
		title: 'Transfers & services',
		items: [
			{ key: 'airports', label: 'Airports', help: 'Airport transfer pages (shared by both languages).', preview: 'airportTransferDetail' },
			{ key: 'airportContent.{lang}', label: 'Airport page texts' },
			{ key: 'transferPolicy.{lang}', label: 'Transfer policy' },
			{ key: 'services.{lang}', label: 'Services pages', help: 'Airport transfers, private drivers and custom tours pages.' },
		],
	},
	{
		id: 'pages',
		title: 'Other pages',
		items: [
			{ key: 'editorial.{lang}', label: 'About, contact, FAQ, gallery...', help: 'Headings and texts of the editorial pages.' },
			{ key: 'content.{lang}', label: 'Reviews, FAQs & awards' },
		],
	},
	{
		id: 'images',
		title: 'Images',
		items: [{ key: 'images.meta', label: 'Image alt texts & sizes', help: 'Alternative text (SEO/accessibility) and dimensions of the shared site images.' }],
	},
	{
		id: 'i18n',
		title: 'Interface translations',
		items: [{ key: 'i18n.{lang}', label: 'Buttons, menus & labels', help: 'Every short interface string (menus, buttons, labels).' }],
	},
];

const LANG_TOKEN = '{lang}';

/** Expands the catalog against the keys the server actually knows about. */
export function buildNavigation(serverKeys, languages) {
	const known = new Map(serverKeys.map((entry) => [entry.key, entry]));
	const used = new Set();

	const sections = SECTIONS.map((section) => ({
		...section,
		items: section.items
			.map((item) => {
				if (!item.key.includes(LANG_TOKEN)) {
					if (!known.has(item.key)) return null;
					used.add(item.key);
					return { ...item, variants: [{ key: item.key, lang: null, ...known.get(item.key) }] };
				}
				const variants = languages
					.map((lang) => item.key.replace(LANG_TOKEN, lang))
					.filter((key) => known.has(key))
					.map((key) => {
						used.add(key);
						return { key, lang: key.split('.').pop(), ...known.get(key) };
					});
				return variants.length ? { ...item, variants } : null;
			})
			.filter(Boolean),
	})).filter((section) => section.items.length);

	const leftovers = serverKeys.filter((entry) => !used.has(entry.key));
	if (leftovers.length) {
		sections.push({
			id: 'other',
			title: 'Other data',
			items: leftovers.map((entry) => ({ key: entry.key, label: entry.key, variants: [{ ...entry, lang: null }] })),
		});
	}
	return sections;
}

export function findCatalogItem(key) {
	for (const section of SECTIONS) {
		for (const item of section.items) {
			if (item.key === key) return { item, lang: null };
			const pattern = item.key.split(LANG_TOKEN);
			if (pattern.length === 2 && key.startsWith(pattern[0]) && key.endsWith(pattern[1])) {
				return { item, lang: key.slice(pattern[0].length, key.length - pattern[1].length) };
			}
		}
	}
	return { item: { key, label: key }, lang: null };
}

export function humanize(name) {
	if (typeof name === 'number') return `#${name + 1}`;
	const text = String(name)
		.replace(/_/g, ' ')
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.trim()
		.toLowerCase();
	return text.charAt(0).toUpperCase() + text.slice(1);
}

const LABEL_FIELDS = ['title', 'name', 'question', 'q', 'label', 'heading', 'author', 'city', 'term', 'text', 'slug', 'id', 'code'];

export function itemLabel(item, index) {
	if (item === null || item === undefined) return `Item ${index + 1}`;
	if (typeof item !== 'object') return String(item).slice(0, 80) || `Item ${index + 1}`;
	for (const field of LABEL_FIELDS) {
		if (typeof item[field] === 'string' && item[field].trim()) return item[field].slice(0, 90);
	}
	return `Item ${index + 1}`;
}
