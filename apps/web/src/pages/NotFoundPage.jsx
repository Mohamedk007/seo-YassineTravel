import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { Layout } from '@/components/site/Layout';
import { Seo } from '@/components/site/Seo';
import { getRoutePaths } from '@/data/route-config';
import { useLocale } from '@/i18n/LocaleContext';

export default function NotFoundPage() {
	const lang = useLocale();
	const ROUTE_PATHS = getRoutePaths(lang);
	return (
		<Layout>
			<Seo
				title="Page not found"
				description="The page you are looking for does not exist. Explore Morocco Trip Holidays routes instead."
				noindex
				breadcrumbItems={[
					{ name: 'Home', url: ROUTE_PATHS.home },
					{ name: '404', url: '/404' },
				]}
			/>
			<section className="mx-auto flex max-w-[56rem] flex-col items-center px-5 py-28 text-center lg:px-8">
				<div className="rounded-full bg-primary/10 p-4 text-primary">
					<Compass className="h-8 w-8" />
				</div>
				<p className="mt-6 text-sm font-semibold uppercase tracking-widest text-primary">404</p>
				<h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">Page not found</h1>
				<p className="mt-4 max-w-2xl text-muted-foreground">
					The page you requested may have moved or no longer exists. Continue browsing our private Morocco tours.
				</p>
				<Link
					to={ROUTE_PATHS.home}
					className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground"
				>
					<ArrowLeft className="h-4 w-4" /> Back to Home
				</Link>
			</section>
		</Layout>
	);
}