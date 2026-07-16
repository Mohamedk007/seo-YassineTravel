import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getBlogPostBySlug } from '@/data/editorial';
import { ROUTE_PATHS } from '@/data/route-config';
import { buildBlogPostingSchema } from '@/seo/schemas';
import { Page } from './page-shell';

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
			<section className="mx-auto max-w-[56rem] px-5 py-16 lg:px-8">
				<p className="text-xs font-semibold uppercase tracking-widest text-primary">{post.category}</p>
				<h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">{post.title}</h2>
				<p className="mt-5 text-lg text-muted-foreground">{post.summary}</p>
				<div className="mt-8 overflow-hidden rounded-2xl">
					<img src={post.image} alt={post.title} className="w-full object-cover" loading="eager" decoding="async" sizes="100vw" />
				</div>
				<p className="mt-8 text-muted-foreground">
					This guide is part of our Morocco travel journal and is continuously refined by our local team to keep advice practical, current, and route-aware.
				</p>
				<Link to={ROUTE_PATHS.blog} className="mt-8 inline-flex items-center gap-2 font-semibold text-primary">
					<ArrowLeft className="h-4 w-4" /> Back to all articles
				</Link>
			</section>
		</Page>
	);
}