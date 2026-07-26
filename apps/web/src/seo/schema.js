import { CONTACT } from '@/data/contact';
import { SITE_BRAND } from '@/data/site-config';
import { SEO_CONFIG, getSeoDefaults } from './seo.config';
import { DEFAULT_LANGUAGE, SITE_ORIGIN, absoluteUrl, assetUrl, resolveLanguage } from './utils';

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
		name: SITE_BRAND.name,
		url: SITE_ORIGIN,
		description: getSeoDefaults(lang).description,
		telephone: CONTACT.phone,
		email: CONTACT.email,
		aggregateRating: buildAggregateRatingSchema(),
	};
}

// Site-wide rating (4.9/5, 1,200+ reviews) is the one figure we can stand behind —
// it's not split out per tour anywhere in the data, so it is only ever attached
// to the Organization/TravelAgency, never fabricated per individual tour.
export function buildAggregateRatingSchema({ ratingValue = '4.9', reviewCount = 1200, bestRating = '5' } = {}) {
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
		name: SITE_BRAND.name,
		url: SITE_ORIGIN,
		telephone: CONTACT.phone,
		email: CONTACT.email,
		address: {
			'@type': 'PostalAddress',
			streetAddress: CONTACT.address,
			addressCountry: 'MA',
		},
	};
}

export function buildWebPageSchema({ title, description, url, image, pageType = 'WebPage', lang = DEFAULT_LANGUAGE }) {
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

	return {
		'@context': 'https://schema.org',
		'@type': 'TouristTrip',
		name: tour.title,
		description: tour.tagline,
		url: absoluteUrl(path || `/tour/${tour.slug}`, lang),
		inLanguage: resolveLanguage(lang),
		image: assetUrl(tour.image) || undefined,
		offers: {
			'@type': 'Offer',
			price: tour.price,
			priceCurrency: 'EUR',
		},
	};
}

export function buildServiceSchema({ name, description, path, lang = DEFAULT_LANGUAGE }) {
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
		areaServed: 'Morocco',
		url: absoluteUrl(path || '/', lang),
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
export function buildDefaultSchemas({ title, description, url, image, pageType, lang, breadcrumbItems, existingTypes = [] }) {
	const pageSchema = existingTypes.includes(pageType)
		? null
		: buildWebPageSchema({ title, description, url, image, pageType, lang });

	return [
		buildOrganizationSchema(lang),
		buildWebSiteSchema(lang),
		buildTravelAgencySchema(lang),
		buildLocalBusinessSchema(),
		pageSchema,
		buildBreadcrumbSchema(breadcrumbItems, lang),
	].filter(Boolean);
}
