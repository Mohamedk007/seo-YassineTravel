// Relative imports only — see the note in seo.config.js; this file is also on
// buildSeoHead()'s dependency path, run directly under plain Node.
import { CONTACT } from '../data/contact.js';
import { SITE_BRAND } from '../data/site-config.js';
import { TRIPADVISOR } from '../data/tripadvisor.js';
import { SEO_CONFIG, getSeoDefaults } from './seo.config.js';
import { DEFAULT_LANGUAGE, SITE_ORIGIN, absoluteUrl, assetUrl, resolveLanguage } from './utils.js';

/**
 * JSON-LD builders. Every builder that takes an in-app `path` also takes the
 * current `lang`, because public URLs are language-prefixed (`/en/tours`) —
 * emitting the bare path would point structured data at a URL that only exists
 * as a redirect.
 */

export function buildOrganizationSchema(lang = DEFAULT_LANGUAGE) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': `${SITE_ORIGIN}/#organization`,
		name: SITE_BRAND.name,
		url: SITE_ORIGIN,
		email: CONTACT.email,
		telephone: CONTACT.phone,
		description: getSeoDefaults(lang).description,
		logo: assetUrl(SEO_CONFIG.defaultImage),
	};
}

export function buildWebSiteSchema(lang = DEFAULT_LANGUAGE) {
	const language = resolveLanguage(lang);
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${SITE_ORIGIN}/#website`,
		name: SITE_BRAND.name,
		url: absoluteUrl('/', language),
		inLanguage: language,
		description: getSeoDefaults(language).description,
		publisher: { '@id': `${SITE_ORIGIN}/#organization` },
	};
}

export function buildTravelAgencySchema(lang = DEFAULT_LANGUAGE) {
	return {
		'@context': 'https://schema.org',
		'@type': 'TravelAgency',
		'@id': `${SITE_ORIGIN}/#localbusiness`,
		name: SITE_BRAND.name,
		url: SITE_ORIGIN,
		description: getSeoDefaults(lang).description,
		telephone: CONTACT.phone,
		email: CONTACT.email,
		aggregateRating: buildAggregateRatingSchema(),
	};
}

// Sourced from the real TripAdvisor listing (see data/tripadvisor.js) — not
// split out per tour anywhere in the data, so it is only ever attached to the
// Organization/TravelAgency, never fabricated per individual tour.
export function buildAggregateRatingSchema({
	ratingValue = String(TRIPADVISOR.rating),
	reviewCount = TRIPADVISOR.reviewCount,
	bestRating = '5',
} = {}) {
	return {
		'@type': 'AggregateRating',
		ratingValue,
		reviewCount,
		bestRating,
	};
}

// `reviews` is the REVIEWS array from data/content (real, attributed TripAdvisor
// testimonials). `itemReviewedName` defaults to the agency itself since reviews
// aren't tied to a specific tour in the data.
export function buildReviewSchema(reviews, itemReviewedName = SITE_BRAND.name) {
	if (!reviews || reviews.length === 0) return null;

	return reviews.map((review) => ({
		'@context': 'https://schema.org',
		'@type': 'Review',
		itemReviewed: {
			'@type': 'TravelAgency',
			name: itemReviewedName,
		},
		author: {
			'@type': 'Person',
			name: review.name,
		},
		reviewBody: review.text,
		publisher: {
			'@type': 'Organization',
			name: review.country,
		},
	}));
}

export function buildImageObjectSchema({ url, caption, width, height }) {
	const contentUrl = assetUrl(url);
	if (!contentUrl) return null;

	return {
		'@context': 'https://schema.org',
		'@type': 'ImageObject',
		contentUrl,
		...(caption ? { caption } : {}),
		...(width ? { width } : {}),
		...(height ? { height } : {}),
	};
}

export function buildLocalBusinessSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		'@id': `${SITE_ORIGIN}/#localbusiness`,
		name: SITE_BRAND.name,
		url: SITE_ORIGIN,
		telephone: CONTACT.phone,
		email: CONTACT.email,
		address: {
			'@type': 'PostalAddress',
			streetAddress: CONTACT.streetAddress,
			addressLocality: CONTACT.city,
			addressCountry: 'MA',
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: CONTACT.geo.latitude,
			longitude: CONTACT.geo.longitude,
		},
	};
}

export function buildWebPageSchema({ title, description, url, image, pageType = 'WebPage', lang = DEFAULT_LANGUAGE, speakable }) {
	const language = resolveLanguage(lang);
	return {
		'@context': 'https://schema.org',
		'@type': pageType,
		name: title,
		description,
		url: absoluteUrl(url, language),
		inLanguage: language,
		image: assetUrl(image) || undefined,
		isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
		...(speakable ? { speakable } : {}),
	};
}

export function buildBreadcrumbSchema(items, lang = DEFAULT_LANGUAGE) {
	if (!items || items.length === 0) return null;

	const itemListElement = items
		.filter((item) => item?.name)
		.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: absoluteUrl(item.url || item.path || '/', lang),
		}));

	if (itemListElement.length === 0) return null;

	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement,
	};
}

export function buildFaqSchema(faqPairs) {
	if (!faqPairs || faqPairs.length === 0) return null;

	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqPairs
			.filter((entry) => Array.isArray(entry) && entry.length >= 2)
			.map(([question, answer]) => ({
				'@type': 'Question',
				name: question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: answer,
				},
			})),
	};
}

export function buildTourSchema(tour, path, lang = DEFAULT_LANGUAGE) {
	if (!tour) return null;

	const tourUrl = absoluteUrl(path || `/tour/${tour.slug}`, lang);

	return {
		'@context': 'https://schema.org',
		'@type': 'TouristTrip',
		name: tour.title,
		description: tour.tagline,
		url: tourUrl,
		inLanguage: resolveLanguage(lang),
		image: assetUrl(tour.image) || undefined,
		offers: {
			'@type': 'Offer',
			price: tour.price,
			priceCurrency: 'EUR',
			url: tourUrl,
			// Made-to-order private tours have no fixed inventory/booking
			// calendar to report a real stock state from — InStock is the
			// standard, honest default for this business model (every date is
			// available until a specific inquiry says otherwise). No
			// priceValidUntil: there's no real pricing-review cadence to cite,
			// and inventing one would be the same kind of fabrication already
			// avoided elsewhere (see the review-count fix).
			availability: 'https://schema.org/InStock',
			provider: { '@id': `${SITE_ORIGIN}/#localbusiness` },
		},
	};
}

export function buildServiceSchema({
	name,
	description,
	path,
	lang = DEFAULT_LANGUAGE,
	areaServed = 'Morocco',
	availableChannel,
	hasOfferCatalog,
	aggregateRating,
}) {
	if (!name) return null;

	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name,
		description,
		provider: {
			'@type': 'TravelAgency',
			name: SITE_BRAND.name,
			url: SITE_ORIGIN,
		},
		areaServed,
		url: absoluteUrl(path || '/', lang),
		...(availableChannel ? { availableChannel } : {}),
		...(hasOfferCatalog ? { hasOfferCatalog } : {}),
		...(aggregateRating ? { aggregateRating } : {}),
	};
}

/**
 * How a booking channel can be reached (phone / WhatsApp). Attached to a
 * Service's `availableChannel` — lets Google/AI systems surface the exact
 * contact method rather than just a generic "Service" node.
 */
export function buildServiceChannelSchema({ phone, whatsappUrl, availableLanguage } = {}) {
	return {
		'@type': 'ServiceChannel',
		...(whatsappUrl ? { serviceUrl: whatsappUrl } : {}),
		...(phone ? { servicePhone: phone } : {}),
		...(availableLanguage ? { availableLanguage } : {}),
	};
}

/**
 * A single priced line item (e.g. "Airport → Medina, sedan, from €25").
 * `price` is a starting/"from" figure, so `minPrice` is set rather than a
 * fixed `price` — this must reflect real, currently-charged rates before
 * shipping to production; placeholder figures should never carry this schema.
 */
export function buildPriceSpecificationSchema({ price, priceCurrency = 'EUR' } = {}) {
	if (price === undefined || price === null || Number.isNaN(Number(price))) return null;

	return {
		'@type': 'PriceSpecification',
		minPrice: Number(price),
		priceCurrency,
	};
}

/**
 * A priced catalog of routes/services (e.g. every destination reachable from
 * one airport). Each `rows` entry is `{ name, description, price, priceCurrency }`.
 */
export function buildOfferCatalogSchema(rows, catalogName, lang = DEFAULT_LANGUAGE) {
	if (!rows || rows.length === 0) return null;

	const itemListElement = rows
		.filter((row) => row?.name)
		.map((row) => ({
			'@type': 'Offer',
			itemOffered: {
				'@type': 'Service',
				name: row.name,
				...(row.description ? { description: row.description } : {}),
			},
			...(row.price !== undefined && row.price !== null
				? { priceSpecification: buildPriceSpecificationSchema({ price: row.price, priceCurrency: row.priceCurrency }) }
				: {}),
			areaServed: 'Morocco',
		}));

	return {
		'@type': 'OfferCatalog',
		name: catalogName,
		itemListElement,
	};
}

/**
 * Marks which on-page sections are optimised for voice assistants and AI
 * answer engines to quote directly (Google Assistant "speakable", and by
 * extension the same short, self-contained-answer style AI Overviews /
 * ChatGPT / Perplexity favour). `cssSelectors` are `#id` selectors on the
 * actual DOM elements holding the concise answers (see AirportAEOAnswers).
 */
export function buildSpeakableSchema(cssSelectors) {
	if (!cssSelectors || cssSelectors.length === 0) return null;

	return {
		'@type': 'SpeakableSpecification',
		cssSelector: cssSelectors,
	};
}

export function buildItemListSchema(items, listName, lang = DEFAULT_LANGUAGE) {
	if (!items || items.length === 0) return null;

	return {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: listName,
		itemListElement: items
			.filter((item) => item?.name && item?.url)
			.map((item, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: item.name,
				url: absoluteUrl(item.url, lang),
			})),
	};
}

export function buildBlogPostingSchema(post, path, lang = DEFAULT_LANGUAGE) {
	if (!post) return null;

	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.summary,
		articleSection: post.category,
		image: assetUrl(post.image) || undefined,
		url: absoluteUrl(path || '/blog', lang),
		inLanguage: resolveLanguage(lang),
		...(post.datePublished ? { datePublished: post.datePublished } : {}),
		...(post.dateModified ? { dateModified: post.dateModified } : {}),
		...(post.author?.name
			? {
					author: {
						'@type': 'Person',
						name: post.author.name,
						...(post.author.role ? { jobTitle: post.author.role } : {}),
					},
				}
			: {}),
		publisher: {
			'@type': 'Organization',
			name: SITE_BRAND.name,
			url: SITE_ORIGIN,
		},
	};
}

export function buildTouristDestinationSchema(destination, path, lang = DEFAULT_LANGUAGE) {
	if (!destination) return null;

	return {
		'@context': 'https://schema.org',
		'@type': 'TouristDestination',
		name: destination.name,
		description: destination.summary,
		image: assetUrl(destination.image) || undefined,
		url: absoluteUrl(path || '/destinations', lang),
		inLanguage: resolveLanguage(lang),
	};
}

/**
 * The schema set every page emits: identity (Organization, WebSite, agency,
 * local business), the page itself, and its breadcrumb trail. Page-specific
 * schemas are appended by <Seo /> on top of these.
 *
 * `existingTypes` are the @types the page already supplies. When a page passes
 * its own primary entity (a TouristTrip on a tour page, say) the generic page
 * node is skipped, so one URL never describes two nodes of the same type.
 */
export function buildDefaultSchemas({ title, description, url, image, pageType, lang, breadcrumbItems, existingTypes = [], speakable }) {
	const pageSchema = existingTypes.includes(pageType)
		? null
		: buildWebPageSchema({ title, description, url, image, pageType, lang, speakable });

	return [
		buildOrganizationSchema(lang),
		buildWebSiteSchema(lang),
		buildTravelAgencySchema(lang),
		buildLocalBusinessSchema(),
		pageSchema,
		buildBreadcrumbSchema(breadcrumbItems, lang),
	].filter(Boolean);
}
