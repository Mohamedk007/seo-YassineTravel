import { SEO_CONFIG, getAlternateOgLocales, getSeoDefaults } from './seo.config.js';
import { assetUrl } from './utils.js';

/**
 * Open Graph tags as `{ property, content }` descriptors.
 * `image` is absolutized here: Vite serves hashed asset paths like
 * `/assets/dune-a1b2c3.webp`, and og:image must be a fully qualified URL.
 */
export function buildOpenGraphTags({ title, description, url, image, type = 'website', lang, imageAlt } = {}) {
	const defaults = getSeoDefaults(lang);
	const resolvedImage = assetUrl(image || SEO_CONFIG.defaultImage);

	const tags = [
		{ property: 'og:site_name', content: SEO_CONFIG.siteName },
		{ property: 'og:type', content: type },
		{ property: 'og:locale', content: defaults.ogLocale },
		...getAlternateOgLocales(lang).map((locale) => ({ property: 'og:locale:alternate', content: locale })),
		{ property: 'og:title', content: title },
		{ property: 'og:description', content: description },
		{ property: 'og:url', content: url },
	];

	if (resolvedImage) {
		// Falls back to the page's own title, not the sitewide default image's
		// alt text — a page with its own `image` but no explicit `imageAlt`
		// would otherwise silently describe an unrelated stock photo (e.g.
		// every tour page claiming "Sahara desert dunes at sunset").
		tags.push(
			{ property: 'og:image', content: resolvedImage },
			{ property: 'og:image:alt', content: imageAlt || title || defaults.imageAlt }
		);
	}

	return tags.filter((tag) => Boolean(tag.content));
}
