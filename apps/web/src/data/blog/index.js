import { slugify } from '@/lib/slug';
import { BLOG_PAGE_POSTS } from './posts';

export const BLOG_POSTS = BLOG_PAGE_POSTS.map((post) => ({
	...post,
	slug: slugify(post.title),
}));

export function getBlogPostBySlug(slug) {
	return BLOG_POSTS.find((post) => post.slug === slug);
}

export { BLOG_PAGE_POSTS };
