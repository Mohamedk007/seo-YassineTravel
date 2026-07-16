import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CalendarDays, Clock, User } from 'lucide-react';
import { getBlogPostBySlug } from '@/data/editorial';
import { ROUTE_PATHS } from '@/data/route-config';
import { buildBlogPostingSchema } from '@/seo/schemas';
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

function ArticleBody({ content }) {
	return (
		<div className="mt-10 space-y-6">
			{content.map((block, index) => (
				<div key={block.heading || index}>
					{block.heading && <h2 className="mt-10 mb-4 font-display text-2xl font-semibold md:text-3xl">{block.heading}</h2>}
					{block.paragraphs.map((paragraph, pIndex) => (
						<p key={pIndex} className="mt-4 leading-relaxed text-muted-foreground first:mt-0">
							{paragraph}
						</p>
					))}
				</div>
			))}
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
	const post = getBlogPostBySlug(slug);

	if (!post) return <Navigate to={ROUTE_PATHS.blog} replace />;

	return (
		<Page
			title={post.title}
			subtitle={post.summary}
			image={post.image}
			crumb="Blog"
			pageType="BlogPosting"
			structuredData={buildBlogPostingSchema(post, `/blog/${post.slug}`)}
			breadcrumbItems={[
				{ name: 'Home', url: ROUTE_PATHS.home },
				{ name: 'Blog', url: ROUTE_PATHS.blog },
				{ name: post.title, url: `/blog/${post.slug}` },
			]}
		>
			<article className="mx-auto max-w-[56rem] px-5 py-16 lg:px-8">
				<p className="text-xs font-semibold uppercase tracking-widest text-primary">{post.category}</p>
				<ArticleMeta post={post} />

				{post.content ? (
					<ArticleBody content={post.content} />
				) : (
					<p className="mt-8 text-lg leading-relaxed text-muted-foreground">
						This guide is part of our Morocco travel journal and is continuously refined by our local team to keep advice practical, current, and route-aware.
					</p>
				)}

				<InternalLinks links={post.internalLinks} />

				<Link to={ROUTE_PATHS.blog} className="mt-10 inline-flex items-center gap-2 font-semibold text-primary">
					<ArrowLeft className="h-4 w-4" /> Back to all articles
				</Link>
			</article>
		</Page>
	);
}
