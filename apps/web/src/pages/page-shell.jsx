import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Layout } from '@/components/site/Layout';
import { PageHero } from '@/components/site/PageHero';
import { Seo } from '@/components/site/Seo';
import { Stars } from '@/components/site/Typography';
import { getReviews } from '@/data/content';
import { IMG } from '@/data/images';
import { waLink } from '@/data/contact';
import { getRoutePaths } from '@/data/route-config';
import { PAGE_SHELL_CONFIG } from '@/data/site-config';
import { useLocale } from '@/i18n/LocaleContext';

export function CTA() {
	const lang = useLocale();
	const ROUTE_PATHS = getRoutePaths(lang);
	return (
		<section className="bg-primary py-16 text-primary-foreground">
			<div className="mx-auto max-w-[72rem] px-5 text-center lg:px-8">
				<h2 className="font-display text-3xl font-semibold md:text-4xl">{PAGE_SHELL_CONFIG.ctaTitle}</h2>
				<p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">{PAGE_SHELL_CONFIG.ctaDescription}</p>
				<div className="mt-7 flex flex-wrap justify-center gap-3">
					<a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-primary">
						<MessageCircle className="h-5 w-5" /> {PAGE_SHELL_CONFIG.ctaWhatsAppLabel}
					</a>
					<Link to={ROUTE_PATHS.contact} className="inline-flex items-center gap-2 rounded-full border border-white/50 px-7 py-3.5 font-semibold text-white">
						{PAGE_SHELL_CONFIG.ctaQuoteLabel} <ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			</div>
		</section>
	);
}

export function MiniReviews() {
	const lang = useLocale();
	const REVIEWS = getReviews(lang);
	return (
		<section className="bg-secondary/60 py-16">
			<div className="mx-auto max-w-[90rem] px-5 lg:px-8">
				<h2 className="text-center font-display text-3xl font-semibold md:text-4xl">{PAGE_SHELL_CONFIG.miniReviewsTitle}</h2>
				<div className="mt-10 grid gap-6 md:grid-cols-3">
					{REVIEWS.slice(0, 3).map((review) => (
						<div key={review.name} className="relative rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
							<Stars />
							<p className="mt-3 text-sm text-foreground/90">“{review.text}”</p>
							<p className="mt-4 text-sm font-semibold">
								{review.name} · <span className="font-normal text-muted-foreground">{review.country}</span>
							</p>
							<img
								src={IMG.Tripadvisor}
								alt="Best travel agency in Morocco on TripAdvisor"
								width={80}
								height={50}
								className="absolute bottom-3 right-3"
								loading="lazy"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export function Page({ title, subtitle, image, crumb, children, structuredData, pageType = 'WebPage', breadcrumbItems, alternateUrls }) {
	const location = useLocation();
	const lang = useLocale();
	const ROUTE_PATHS = getRoutePaths(lang);
	const resolvedBreadcrumbItems = breadcrumbItems || [
		{ name: 'Home', url: ROUTE_PATHS.home },
		{ name: crumb || title, url: location.pathname },
	];

	return (
		<Layout>
			<Seo
				title={title}
				description={subtitle}
				structuredData={structuredData}
				pageType={pageType}
				breadcrumbItems={resolvedBreadcrumbItems}
				alternateUrls={alternateUrls}
				preloadImage
			/>
			<PageHero title={title} subtitle={subtitle} image={image} crumb={crumb} />
			{children}
			<CTA />
		</Layout>
	);
}

export function Prose({ children }) {
	return <div className="mx-auto max-w-[56rem] space-y-5 px-5 py-16 leading-relaxed text-muted-foreground lg:px-8">{children}</div>;
}