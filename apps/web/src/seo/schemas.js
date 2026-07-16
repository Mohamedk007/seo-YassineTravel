import { CONTACT } from '@/data/contact';
import { SITE_BRAND } from '@/data/site-config';

function toAbsoluteUrl(urlOrPath = '/') {
	try {
		return new URL(urlOrPath, SITE_BRAND.origin).toString();
	} catch {
		return SITE_BRAND.origin;
	}
}

export function buildOrganizationSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: SITE_BRAND.name,
		url: SITE_BRAND.origin,
		email: CONTACT.email,
		telephone: CONTACT.phone,
	};
}

export function buildTravelAgencySchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'TravelAgency',
		name: SITE_BRAND.name,
		url: SITE_BRAND.origin,
		description: SITE_BRAND.seoDescription,
		telephone: CONTACT.phone,
		email: CONTACT.email,
	};
}

export function buildLocalBusinessSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: SITE_BRAND.name,
		url: SITE_BRAND.origin,
		telephone: CONTACT.phone,
		email: CONTACT.email,
		address: {
			'@type': 'PostalAddress',
			streetAddress: CONTACT.address,
			addressCountry: 'MA',
		},
	};
}

export function buildWebPageSchema({ title, description, url, image, pageType = 'WebPage' }) {
	return {
		'@context': 'https://schema.org',
		'@type': pageType,
		name: title,
		description,
		url: toAbsoluteUrl(url),
		image,
	};
}

export function buildBreadcrumbSchema(items) {
	if (!items || items.length === 0) return null;

	const itemListElement = items
		.filter((item) => item?.name)
		.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: toAbsoluteUrl(item.url || '/'),
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

export function buildTourSchema(tour, path) {
	if (!tour) return null;

	return {
		'@context': 'https://schema.org',
		'@type': 'TouristTrip',
		name: tour.title,
		description: tour.tagline,
		url: toAbsoluteUrl(path || `/tour/${tour.slug}`),
		image: tour.image,
		offers: {
			'@type': 'Offer',
			price: tour.price,
			priceCurrency: 'EUR',
		},
	};
}

export function buildServiceSchema({ name, description, path }) {
	if (!name) return null;

	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name,
		description,
		provider: {
			'@type': 'TravelAgency',
			name: SITE_BRAND.name,
			url: SITE_BRAND.origin,
		},
		areaServed: 'Morocco',
		url: toAbsoluteUrl(path || '/'),
	};
}

export function buildItemListSchema(items, listName) {
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
				url: toAbsoluteUrl(item.url),
			})),
	};
}

export function buildBlogPostingSchema(post, path) {
	if (!post) return null;

	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.summary,
		articleSection: post.category,
		image: post.image,
		url: toAbsoluteUrl(path || '/blog'),
		publisher: {
			'@type': 'Organization',
			name: SITE_BRAND.name,
			url: SITE_BRAND.origin,
		},
	};
}

export function buildTouristDestinationSchema(destination, path) {
	if (!destination) return null;

	return {
		'@context': 'https://schema.org',
		'@type': 'TouristDestination',
		name: destination.name,
		description: destination.summary,
		image: destination.image,
		url: toAbsoluteUrl(path || '/destinations'),
	};
}