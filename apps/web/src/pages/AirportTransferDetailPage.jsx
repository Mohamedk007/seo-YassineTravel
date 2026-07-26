import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plane } from 'lucide-react';
import { AirportTransferBookingForm } from '@/components/site/AirportTransferBookingForm';
import { Layout } from '@/components/site/Layout';
import { Seo } from '@/components/site/Seo';
import { getAirportBySlug } from '@/data/airports';
import { getPath, getRoutePaths } from '@/data/route-config';
import { buildServiceSchema } from '@/seo/schemas';
import { useLocale } from '@/i18n/LocaleContext';

// Airport names are proper nouns, so only the surrounding copy is translated.
// Without this, every French transfer page shipped an English title and
// description — a duplicate of its English twin in Google's eyes.
const COPY = {
	en: {
		title: (airport) => `${airport.name} airport transfer`,
		description: (airport) =>
			`Book a private, fixed-price transfer from ${airport.name} (${airport.code}) in ${airport.city}. Meet-and-greet, flight tracking and 24/7 support.`,
		back: 'Back to airports',
		intro: (airport) =>
			`Book a private airport transfer from ${airport.city}. Share the essentials below and we’ll confirm your ride.`,
		pickupLabel: 'Pickup airport',
	},
	fr: {
		title: (airport) => `Transfert aéroport ${airport.name}`,
		description: (airport) =>
			`Réservez un transfert privé à prix fixe depuis ${airport.name} (${airport.code}) à ${airport.city}. Accueil personnalisé, suivi des vols et assistance 24/7.`,
		back: 'Retour aux aéroports',
		intro: (airport) =>
			`Réservez un transfert privé depuis ${airport.city}. Indiquez les informations ci-dessous et nous confirmerons votre trajet.`,
		pickupLabel: 'Aéroport de prise en charge',
	},
};

export default function AirportTransferDetailPage() {
	const { slug } = useParams();
	const lang = useLocale();
	const airport = getAirportBySlug(slug);
	const P = getRoutePaths(lang);
	const copy = COPY[lang] || COPY.en;

	if (!airport) return <Navigate to={P.airportTransfers} replace />;

	const airportPath = getPath('airportTransferDetail', lang, { slug: airport.slug });
	const title = copy.title(airport);
	const description = copy.description(airport);
	// The slug is identical in both languages; only the route prefix differs
	// (/airport-transfers vs /transferts-aeroport), so the hreflang alternates
	// fall straight out of the localized route table.
	const alternateUrls = {
		en: getPath('airportTransferDetail', 'en', { slug: airport.slug }),
		fr: getPath('airportTransferDetail', 'fr', { slug: airport.slug }),
	};

	return (
		<Layout>
			<Seo
				title={title}
				description={description}
				image={airport.image}
				alternateUrls={alternateUrls}
				breadcrumbItems={[
					{ routeKey: 'home' },
					{ routeKey: 'airportTransfers' },
					{ name: airport.name, path: airportPath },
				]}
				pageType="WebPage"
				structuredData={buildServiceSchema({
					name: title,
					description,
					path: airportPath,
					lang,
				})}
			/>
			<section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
				<Link to={P.airportTransfers} className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
					<ArrowLeft className="h-4 w-4" /> {copy.back}
				</Link>
				<div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
					<div>
						<Plane className="h-10 w-10 text-primary" />
						<p className="mt-3 text-sm font-semibold uppercase tracking-widest text-primary">{airport.code}</p>
						<h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">{airport.name}</h1>
						<p className="mt-4 max-w-2xl text-lg text-muted-foreground">{copy.intro(airport)}</p>
						<div className="mt-8 rounded-2xl border border-border bg-card p-6">
							<p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{copy.pickupLabel}</p>
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
