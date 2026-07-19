import { slugify } from '@/lib/slug';
import { DEFAULT_LANGUAGE } from '@/i18n/config';
import { BLOG_PAGE_POSTS as EN_POSTS } from './posts.en';
import { BLOG_PAGE_POSTS as FR_POSTS } from './posts.fr';

const POSTS_BY_LANG = { en: EN_POSTS, fr: FR_POSTS };

function withSlug(post) {
	// `id` is the stable, language-independent identifier used in URLs
	// (so /en/blog/x and /fr/blog/x point at the same article). Older
	// entries without an id fall back to slugifying the title.
	return { ...post, slug: post.id || slugify(post.title) };
}

export function getBlogPosts(lang = DEFAULT_LANGUAGE) {
	const posts = POSTS_BY_LANG[lang] || POSTS_BY_LANG[DEFAULT_LANGUAGE];
	return posts.map(withSlug);
}

export function getBlogPostBySlug(slug, lang = DEFAULT_LANGUAGE) {
	return getBlogPosts(lang).find((post) => post.slug === slug);
}

// Kept for call sites that haven't been made locale-aware yet; always English.
export const BLOG_POSTS = getBlogPosts(DEFAULT_LANGUAGE);
export const BLOG_PAGE_POSTS = EN_POSTS;
