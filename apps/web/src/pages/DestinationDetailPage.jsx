import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DESTINATION_INTERNAL_LINKS } from '@/data/internal-links';
import { getDestinationBySlug } from '@/data/destinations';
import { ROUTE_PATHS } from '@/data/route-config';
import { buildTouristDestinationSchema } from '@/seo/schemas';
import { Page } from './page-shell';

export default function DestinationDetailPage() {
	const { slug } = useParams();
	const destination = getDestinationBySlug(slug);

	if (!destination) return <Navigate to={ROUTE_PATHS.destinations} replace />;

	return (
		<Page
			title={destination.name}
			subtitle={destination.summary}
			image={destination.image}
			crumb="Destinations"
			pageType="TouristDestination"
			structuredData={buildTouristDestinationSchema(destination, `/destinations/${destination.slug}`)}
			breadcrumbItems={[
				{ name: 'Home', url: ROUTE_PATHS.home },
				{ name: 'Destinations', url: ROUTE_PATHS.destinations },
				{ name: destination.name, url: `/destinations/${destination.slug}` },
			]}
		>
			<section className="mx-auto max-w-[72rem] px-5 py-16 lg:px-8">
				<div className="overflow-hidden rounded-2xl">
					<img src={destination.image} alt={destination.name} className="w-full object-cover" loading="eager" decoding="async" sizes="100vw" />
				</div>
				<p className="mt-6 text-lg text-muted-foreground">{destination.summary}</p>
				<div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					{DESTINATION_INTERNAL_LINKS.map((entry) => (
						<Link key={entry.to} to={entry.to} className="rounded-lg border border-border px-4 py-3 text-sm font-medium transition hover:border-primary/40 hover:text-primary">
							{entry.label}
						</Link>
					))}
				</div>
				<Link to={ROUTE_PATHS.destinations} className="mt-8 inline-flex items-center gap-2 font-semibold text-primary">
					<ArrowLeft className="h-4 w-4" /> Back to destinations
				</Link>
			</section>
		</Page>
	);
}