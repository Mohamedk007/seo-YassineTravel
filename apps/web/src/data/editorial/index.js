import { DEFAULT_LANGUAGE } from '@/i18n/config';
import { BLOG_POSTS, getBlogPostBySlug, getBlogPosts } from '@/data/blog';
import * as en from './en';
import * as fr from './fr';

const EDITORIAL_BY_LANG = { en, fr };

function resolve(lang) {
	return EDITORIAL_BY_LANG[lang] || EDITORIAL_BY_LANG[DEFAULT_LANGUAGE];
}

export function getEditorialPage(pageName, lang = DEFAULT_LANGUAGE) {
	return resolve(lang)[pageName];
}

// Kept for call sites that haven't been made locale-aware yet; always English.
export const ABOUT_PAGE = en.ABOUT_PAGE;
export const DESTINATIONS_PAGE = en.DESTINATIONS_PAGE;
export const GALLERY_PAGE = en.GALLERY_PAGE;
export const REVIEWS_PAGE = en.REVIEWS_PAGE;
export const FAQ_PAGE = en.FAQ_PAGE;
export const BLOG_PAGE = en.BLOG_PAGE;
export const TRAVEL_GUIDE_PAGE = en.TRAVEL_GUIDE_PAGE;
export const CONTACT_PAGE = en.CONTACT_PAGE;

export { BLOG_POSTS, getBlogPostBySlug, getBlogPosts };
