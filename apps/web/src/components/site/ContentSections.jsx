import React from 'react';
import { RichText } from '@/components/site/RichText';
import { TourCard } from '@/components/tours/TourCard';
import { getImageAttrs } from '@/data/images';
import { getTours } from '@/data/tours/catalog';

// Editable content sections ({ heading, headingLevel, paragraphs, image,
// imageAlt, imageCaption, table, html, tours }) shared by blog articles and
// service pages.

function SectionHeading({ block }) {
	if (!block.heading) return null;
	if (block.headingLevel === 'h3') {
		return <h3 className="mt-8 mb-3 font-display text-xl font-semibold md:text-2xl">{block.heading}</h3>;
	}
	return <h2 className="mt-10 mb-4 font-display text-2xl font-semibold md:text-3xl">{block.heading}</h2>;
}

function SectionImage({ block, lang }) {
	if (!block.image) return null;
	const attrs = getImageAttrs(block.image, lang, block.imageAlt || block.heading || '');
	return (
		<figure className="my-6">
			<img
				src={block.image}
				{...attrs}
				alt={block.imageAlt || attrs.alt}
				className="w-full rounded-xl object-cover"
				loading="lazy"
				decoding="async"
			/>
			{block.imageCaption ? <figcaption className="mt-2 text-center text-sm text-muted-foreground">{block.imageCaption}</figcaption> : null}
		</figure>
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

function SectionTours({ ids, lang }) {
	if (!Array.isArray(ids) || !ids.length) return null;
	const tours = getTours(lang);
	const picked = ids.map((id) => tours.find((tour) => tour.id === id)).filter(Boolean);
	if (!picked.length) return null;
	return (
		<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{picked.map((tour, index) => (
				<TourCard key={tour.id} tour={tour} delay={index * 0.05} />
			))}
		</div>
	);
}

export function ContentSections({ content, lang, className = 'mt-10 space-y-6' }) {
	if (!Array.isArray(content) || !content.length) return null;
	return (
		<div className={className}>
			{content.map((block, index) => (
				<div key={index}>
					<SectionHeading block={block} />
					<SectionImage block={block} lang={lang} />
					{block.paragraphs?.map((paragraph, pIndex) =>
						paragraph ? (
							<p key={pIndex} className="mt-4 leading-relaxed text-muted-foreground first:mt-0">
								<RichText text={paragraph} />
							</p>
						) : null
					)}
					{block.table && <ComparisonTable table={block.table} />}
					{/* Sanitized by the admin server when saved (admin-server.js sanitizeHtmlFields). */}
					{block.html ? <div className="custom-html mt-6" dangerouslySetInnerHTML={{ __html: block.html }} /> : null}
					<SectionTours ids={block.tours} lang={lang} />
				</div>
			))}
		</div>
	);
}
