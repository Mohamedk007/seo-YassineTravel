import { SEO_CONFIG, getSeoDefaults } from './seo.config';
import { assetUrl } from './utils';

/**
 * Twitter Card tags as `{ name, content }` descriptors.
 * `twitter:site` / `twitter:creator` are only emitted when a handle is
 * configured, so the markup never claims an account the brand does not own.
 */
export function buildTwitterTags({ title, description, image, lang, imageAlt, card } = {}) {
	const defaults = getSeoDefaults(lang);
	const resolvedImage = assetUrl(image || SEO_CONFIG.defaultImage);

	const tags = [
		{ name: 'twitter:card', content: card || SEO_CONFIG.twitter.card },
		{ name: 'twitter:title', content: title },
		{ name: 'twitter:description', content: description },
		{ name: 'twitter:site', content: SEO_CONFIG.twitter.site },
		{ name: 'twitter:creator', content: SEO_CONFIG.twitter.creator },
	];

	if (resolvedImage) {
		tags.push(
			{ name: 'twitter:image', content: resolvedImage },
			{ name: 'twitter:image:alt', content: imageAlt || defaults.imageAlt }
		);
	}

	return tags.filter((tag) => Boolean(tag.content));
}
