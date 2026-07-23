import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getDestinationInternalLinks } from '@/data/internal-links';
import { getDestinationBySlug, getDestinationTranslations } from '@/data/destinations';
import { getPath, getRoutePaths } from '@/data/route-config';
import { SITE_BRAND } from '@/data/site-config';
import { buildTouristDestinationSchema } from '@/seo/schemas';
import { useLocale } from '@/i18n/LocaleContext';
import { Page } from './page-shell';

export default function DestinationDetailPage() {
	const { slug } = useParams();
	const lang = useLocale();
	const destination = getDestinationBySlug(slug, lang);
	const P = getRoutePaths(lang);

	if (!destination) return <Navigate to={P.destinations} replace />;

	const destinationPath = getPath('destinationDetail', lang, { slug: destination.slug });
	const DESTINATION_INTERNAL_LINKS = getDestinationInternalLinks(lang);
	const translations = getDestinationTranslations(destination.id);
	const alternateUrls = Object.fromEntries(
		Object.entries(translations).map(([code, translated]) => {
			const path = getPath('destinationDetail', code, { slug: translated.slug });
			return [code, `${SITE_BRAND.origin}/${code}${path}`];
		})
	);

	return (
		<Page
			title={destination.name}
			subtitle={destination.summary}
			image={destination.image}
			crumb="Destinations"
			pageType="TouristDestination"
			structuredData={buildTouristDestinationSchema(destination, destinationPath)}
			alternateUrls={alternateUrls}
			breadcrumbItems={[
				{ name: 'Home', url: P.home },
				{ name: 'Destinations', url: P.destinations },
				{ name: destination.name, url: destinationPath },
			]}
		>
			<section className="mx-auto max-w-[72rem] px-5 py-16 lg:px-8">
				<p className="text-lg text-muted-foreground">{destination.summary}</p>
				<div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					{DESTINATION_INTERNAL_LINKS.map((entry) => (
						<Link key={entry.to} to={entry.to} className="rounded-lg border border-border px-4 py-3 text-sm font-medium transition hover:border-primary/40 hover:text-primary">
							{entry.label}
						</Link>
					))}
				</div>
				<Link to={P.destinations} className="mt-8 inline-flex items-center gap-2 font-semibold text-primary">
					<ArrowLeft className="h-4 w-4" /> Back to destinations
				</Link>
			</section>
		</Page>
	);
}