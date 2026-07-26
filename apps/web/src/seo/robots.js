/**
 * Robots meta directives.
 *
 * Indexable pages get an explicit positive directive rather than no tag at all:
 * `max-image-preview:large` unlocks large thumbnails in Discover, and the
 * uncapped snippet/preview values matter for AI answer engines that quote pages.
 */
export const ROBOTS_INDEXABLE = ['index', 'follow', 'max-image-preview:large', 'max-snippet:-1', 'max-video-preview:-1'];
export const ROBOTS_BLOCKED = ['noindex', 'nofollow'];

export function buildRobotsContent({ noindex = false, nofollow = false, directives } = {}) {
	if (directives?.length) return directives.join(', ');
	if (noindex) return ['noindex', nofollow ? 'nofollow' : 'follow'].join(', ');
	if (nofollow) return ['index', 'nofollow'].join(', ');
	return ROBOTS_INDEXABLE.join(', ');
}

export function isIndexable({ noindex = false } = {}) {
	return !noindex;
}
