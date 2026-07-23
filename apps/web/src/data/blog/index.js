import { DEFAULT_LANGUAGE } from '@/i18n/config';
import { BLOG_PAGE_POSTS as EN_POSTS } from './posts.en';
import { BLOG_PAGE_POSTS as FR_POSTS } from './posts.fr';

const POSTS_BY_LANG = { en: EN_POSTS, fr: FR_POSTS };

export function getBlogPosts(lang = DEFAULT_LANGUAGE) {
	return POSTS_BY_LANG[lang] || POSTS_BY_LANG[DEFAULT_LANGUAGE];
}

export function getBlogPostBySlug(slug, lang = DEFAULT_LANGUAGE) {
	return getBlogPosts(lang).find((post) => post.slug === slug);
}

// Entity relationship: which articles are tagged as relevant to a given destination.
export function getBlogPostsForDestination(destinationId, lang = DEFAULT_LANGUAGE) {
	if (!destinationId) return [];
	return getBlogPosts(lang).filter((post) => post.destinationId === destinationId);
}

// Finds the same article (by stable, language-independent `id`) in every
// language, keyed by lang — used to build hreflang alternate URLs and the
// language switcher on article detail pages, since each language has its own slug.
export function getBlogPostTranslations(id) {
	const result = {};
	for (const [lang, posts] of Object.entries(POSTS_BY_LANG)) {
		const match = posts.find((post) => post.id === id);
		if (match) result[lang] = match;
	}
	return result;
}

// Kept for call sites that haven't been made locale-aware yet; always English.
export const BLOG_POSTS = getBlogPosts(DEFAULT_LANGUAGE);
export const BLOG_PAGE_POSTS = EN_POSTS;
