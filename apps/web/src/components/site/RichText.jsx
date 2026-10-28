import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_BRAND } from '@/data/site-config';
import { SUPPORTED_LANGUAGES } from '@/i18n/config';
import { useLocale } from '@/i18n/LocaleContext';

// Inline markup for text edited in /admin:
//   [anchor text](/tour/some-tour)              internal link (followed)
//   [anchor text](https://example.com)          external link (followed)
//   [anchor text](https://example.com "nofollow")  also "sponsored" / "ugc"
//   **bold text**
// Everything else is rendered as plain text, so no HTML can be injected.
const TOKEN_PATTERN = /\[([^\]\n]+)\]\(\s*([^\s()]+)(?:\s+"([a-z ]+)")?\s*\)|\*\*([^*\n]+)\*\*/gi;
const SAFE_URL_PATTERN = /^(?:https?:\/\/|mailto:|tel:|#|\/(?!\/))/i;
const REL_FLAGS = new Set(['nofollow', 'sponsored', 'ugc']);
const LANG_PREFIX_PATTERN = new RegExp(`^/(${SUPPORTED_LANGUAGES.join('|')})(?=/|$|\\?|#)`);
const LINK_CLASS = 'font-medium text-primary underline underline-offset-4 transition hover:text-primary/80';

const bareHost = (host) => host.replace(/^www\./, '');

/** Site-relative path for internal links (relative paths and same-site absolute URLs). */
function toSitePath(url) {
	if (url.startsWith('/')) return url;
	if (!/^https?:\/\//i.test(url)) return null;
	try {
		const target = new URL(url);
		if (bareHost(target.hostname) !== bareHost(new URL(SITE_BRAND.origin).hostname)) return null;
		return `${target.pathname}${target.search}${target.hash}`;
	} catch {
		return null;
	}
}

/**
 * Link for a URL typed in /admin: site paths navigate client-side, external
 * URLs open in a new tab, anything unsafe (javascript:, data:...) renders as
 * plain text. Links are followed unless `relHint` says nofollow/sponsored/ugc.
 */
export function SmartLink({ href, relHint, className = LINK_CLASS, children }) {
	const lang = useLocale();
	const url = typeof href === 'string' ? href.trim() : '';
	if (!SAFE_URL_PATTERN.test(url)) return <>{children}</>;
	const flags = String(relHint || '')
		.toLowerCase()
		.split(/\s+/)
		.filter((flag) => REL_FLAGS.has(flag));
	const rel = flags.length ? flags.join(' ') : undefined;

	const sitePath = toSitePath(url);
	if (sitePath !== null) {
		const prefix = sitePath.match(LANG_PREFIX_PATTERN);
		// The router is mounted under /{lang}: paths without a language prefix
		// (and paths in the current language) navigate client-side.
		if (!prefix || prefix[1] === lang) {
			const to = prefix ? sitePath.slice(prefix[0].length) || '/' : sitePath;
			return (
				<Link to={to} rel={rel} className={className}>
					{children}
				</Link>
			);
		}
		return (
			<a href={sitePath} rel={rel} className={className}>
				{children}
			</a>
		);
	}

	const isWeb = /^https?:\/\//i.test(url);
	return (
		<a
			href={url}
			className={className}
			{...(isWeb ? { target: '_blank', rel: ['noopener', ...flags].join(' ') } : { rel })}
		>
			{children}
		</a>
	);
}

export function RichText({ text, linkClassName = LINK_CLASS, strongClassName = 'font-semibold text-foreground' }) {
	if (typeof text !== 'string' || !text) return null;

	const parts = [];
	let lastIndex = 0;
	for (const match of text.matchAll(TOKEN_PATTERN)) {
		if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
		const key = match.index;
		if (match[4] !== undefined) {
			parts.push(<strong key={key} className={strongClassName}>{match[4]}</strong>);
		} else {
			parts.push(
				<SmartLink key={key} href={match[2]} relHint={match[3]} className={linkClassName}>
					{match[1]}
				</SmartLink>
			);
		}
		lastIndex = match.index + match[0].length;
	}
	if (lastIndex < text.length) parts.push(text.slice(lastIndex));
	return <>{parts}</>;
}
