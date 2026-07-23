import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plane } from 'lucide-react';
import { AirportTransferBookingForm } from '@/components/site/AirportTransferBookingForm';
import { Layout } from '@/components/site/Layout';
import { Seo } from '@/components/site/Seo';
import { getAirportBySlug } from '@/data/airports';
import { getPath, getRoutePaths } from '@/data/route-config';
import { buildWebPageSchema } from '@/seo/schemas';
import { useLocale } from '@/i18n/LocaleContext';

export default function AirportTransferDetailPage() {
	const { slug } = useParams();
	const lang = useLocale();
	const airport = getAirportBySlug(slug);
	const P = getRoutePaths(lang);

	if (!airport) return <Navigate to={P.airportTransfers} replace />;

	const airportPath = getPath('airportTransferDetail', lang, { slug: airport.slug });

	return (
		<Layout>
			<Seo
				title={`${airport.name} airport transfer`}
				description={`Book a private transfer from ${airport.name} in ${airport.city}.`}
				breadcrumbItems={[
					{ name: 'Home', url: P.home },
					{ name: 'Airport Transfers', url: P.airportTransfers },
					{ name: airport.name, url: airportPath },
				]}
				pageType="WebPage"
				structuredData={buildWebPageSchema({
					title: `${airport.name} airport transfer`,
					description: `Book a private transfer from ${airport.name} in ${airport.city}.`,
					url: airportPath,
				})}
			/>
			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				<Link to={P.airportTransfers} className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
					<ArrowLeft className="h-4 w-4" /> Back to airports
				</Link>
				<div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
					<div>
						<Plane className="h-10 w-10 text-primary" />
						<p className="mt-3 text-sm font-semibold uppercase tracking-widest text-primary">{airport.code}</p>
						<h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">{airport.name}</h1>
						<p className="mt-4 max-w-2xl text-lg text-muted-foreground">Book a private airport transfer from {airport.city}. Share the essentials below and we’ll confirm your ride.</p>
						<div className="mt-8 rounded-2xl border border-border bg-card p-6">
							<p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Pickup airport</p>
							<p className="mt-2 font-display text-2xl font-semibold">{airport.name}</p>
							<p className="mt-1 text-sm text-muted-foreground">{airport.city} · {airport.code}</p>
						</div>
					</div>
					<AirportTransferBookingForm airportName={airport.name} airportCode={airport.code} />
				</div>
			</section>
		</Layout>
	);
}
