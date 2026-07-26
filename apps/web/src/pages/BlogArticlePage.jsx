import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CalendarDays, Clock, User } from 'lucide-react';
import { getBlogPostBySlug, getBlogPostTranslations, getBlogPostsForDestination } from '@/data/editorial';
import { getDestinations } from '@/data/destinations';
import { SITE_BRAND } from '@/data/site-config';
import { useLocale } from '@/i18n/LocaleContext';
import { getPath, getRoutePaths } from '@/data/route-config';
import { buildBlogPostingSchema, buildImageObjectSchema } from '@/seo/schemas';
import { getBreadcrumbLabel } from '@/seo/breadcrumbs';
import { Page } from './page-shell';

function formatDate(isoDate) {
	if (!isoDate) return null;
	return new Date(isoDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function ArticleMeta({ post }) {
	const published = formatDate(post.datePublished);
	const updated = formatDate(post.dateModified);
	if (!published && !post.author && !post.readTime) return null;

	return (
		<div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
			{post.author?.name && (
				<span className="inline-flex items-center gap-1.5">
					<User className="h-4 w-4" />
					<span>
						{post.author.name}
						{post.author.role ? <span className="text-muted-foreground/70"> · {post.author.role}</span> : null}
					</span>
				</span>
			)}
			{published && (
				<span className="inline-flex items-center gap-1.5">
					<CalendarDays className="h-4 w-4" />
					<span>
						Published {published}
						{updated && updated !== published ? ` · Updated ${updated}` : ''}
					</span>
				</span>
			)}
			{post.readTime && (
				<span className="inline-flex items-center gap-1.5">
					<Clock className="h-4 w-4" />
					{post.readTime}
				</span>
			)}
		</div>
	);
}

function ComparisonTable({ table }) {
	return (
		<div className="mt-6 overflow-x-auto rounded-xl border border-border">
			<table className="w-full text-left text-sm">
				<thead className="bg-secondary">
					<tr>
						{table.headers.map((header) => (
							<th key={header} className="p-3 font-semibold">
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{table.rows.map((row) => (
						<tr key={row[0]} className="border-t border-border">
							{row.map((cell, cellIndex) => (
								<td key={cellIndex} className="p-3 text-muted-foreground">
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function QuickAnswer({ text }) {
	if (!text) return null;
	return (
		<div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5">
			<p className="text-sm font-semibold uppercase tracking-wide text-primary">In short</p>
			<p className="mt-1.5 text-base leading-relaxed">{text}</p>
		</div>
	);
}

function ArticleBody({ content }) {
	return (
		<div className="mt-10 space-y-6">
			{content.map((block, index) => (
				<div key={block.heading || index}>
					{block.heading && <h2 className="mt-10 mb-4 font-display text-2xl font-semibold md:text-3xl">{block.heading}</h2>}
					{block.paragraphs?.map((paragraph, pIndex) => (
						<p key={pIndex} className="mt-4 leading-relaxed text-muted-foreground first:mt-0">
							{paragraph}
						</p>
					))}
					{block.table && <ComparisonTable table={block.table} />}
				</div>
			))}
		</div>
	);
}

function TopicCluster({ posts, destinationName, lang }) {
	if (!posts || posts.length === 0) return null;

	return (
		<div className="mt-10 rounded-2xl border border-border p-6 md:p-8">
			<p className="text-xs font-semibold uppercase tracking-widest text-primary">More about {destinationName}</p>
			<div className="mt-4 space-y-3">
				{posts.map((related) => (
					<Link
						key={related.slug}
						to={getPath('blogArticle', lang, { slug: related.slug })}
						className="group flex items-center justify-between rounded-lg border border-border px-4 py-3 transition hover:border-primary/40"
					>
						<span className="font-medium">{related.title}</span>
						<ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-0.5" />
					</Link>
				))}
			</div>
		</div>
	);
}

function InternalLinks({ links }) {
	if (!links || links.length === 0) return null;

	return (
		<div className="mt-14 rounded-2xl border border-border bg-secondary/40 p-6 md:p-8">
			<p className="text-xs font-semibold uppercase tracking-widest text-primary">Plan your own trip</p>
			<h2 className="mt-2 font-display text-2xl font-semibold">Turn this guide into an itinerary</h2>
			<div className="mt-6 grid gap-4 sm:grid-cols-2">
				{links.map((link) => (
					<Link
						key={link.to}
						to={link.to}
						className="group flex flex-col justify-between rounded-xl bg-card p-5 shadow-sm ring-1 ring-border transition hover:ring-primary"
					>
						<div>
							<p className="font-semibold">{link.label}</p>
							<p className="mt-1.5 text-sm text-muted-foreground">{link.description}</p>
						</div>
						<span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
							Explore <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
						</span>
					</Link>
				))}
			</div>
		</div>
	);
}

export default function BlogArticlePage() {
	const { slug } = useParams();
	const lang = useLocale();
	const post = getBlogPostBySlug(slug, lang);
	const P = getRoutePaths(lang);

	if (!post) return <Navigate to={P.blog} replace />;

	const postPath = getPath('blogArticle', lang, { slug: post.slug });
	const translations = getBlogPostTranslations(post.id);
	const alternateUrls = Object.fromEntries(
		Object.entries(translations).map(([code, translatedPost]) => {
			const path = getPath('blogArticle', code, { slug: translatedPost.slug });
			return [code, `${SITE_BRAND.origin}/${code}${path}`];
		})
	);
	const clusterPosts = post.destinationId
		? getBlogPostsForDestination(post.destinationId, lang).filter((p) => p.slug !== post.slug)
		: [];
	const clusterDestination = post.destinationId ? getDestinations(lang).find((d) => d.id === post.destinationId) : null;

	return (
		<Page
			title={post.title}
			subtitle={post.summary}
			image={post.image}
			imageAlt={post.title}
			crumb={getBreadcrumbLabel('blog', lang)}
			pageType="BlogPosting"
			structuredData={[
				buildBlogPostingSchema(post, postPath, lang),
				buildImageObjectSchema({ url: post.image, caption: post.title }),
			]}
			alternateUrls={alternateUrls}
			breadcrumbItems={[
				{ routeKey: 'home' },
				{ routeKey: 'blog' },
				{ name: post.title, path: postPath },
			]}
		>
			<article className="mx-auto max-w-[56rem] px-5 py-16 lg:px-8">
				<p className="text-xs font-semibold uppercase tracking-widest text-primary">{post.category}</p>
				<ArticleMeta post={post} />
				<QuickAnswer text={post.quickAnswer} />

				{post.content ? (
					<ArticleBody content={post.content} />
				) : (
					<p className="mt-8 text-lg leading-relaxed text-muted-foreground">
						This guide is part of our Morocco travel journal and is continuously refined by our local team to keep advice practical, current, and route-aware.
					</p>
				)}

				<TopicCluster posts={clusterPosts} destinationName={clusterDestination?.name} lang={lang} />
				<InternalLinks links={post.internalLinks} />

				<Link to={P.blog} className="mt-10 inline-flex items-center gap-2 font-semibold text-primary">
					<ArrowLeft className="h-4 w-4" /> Back to all articles
				</Link>
			</article>
		</Page>
	);
}
