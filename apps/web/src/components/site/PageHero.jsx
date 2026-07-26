import React from 'react';
import { getImageAttrs } from '@/data/images';
import { useLocale } from '@/i18n/LocaleContext';

export function PageHero({ title, subtitle, image, crumb, imageAlt }) {
	const lang = useLocale();
	// Falls back to the page title only when the image isn't one of the shared,
	// individually described assets.
	const { alt, width, height } = getImageAttrs(image, lang, imageAlt || title);

	return (
		<section className="relative flex min-h-[52vh] items-end overflow-hidden pt-24">
			<img
				src={image}
				alt={alt}
				width={width}
				height={height}
				className="absolute inset-0 h-full w-full object-cover"
				loading="eager"
				fetchPriority="high"
				decoding="async"
				sizes="100vw"
			/>
			<div className="absolute inset-0 hero-gradient" />
			<div className="relative mx-auto w-full max-w-[72rem] px-5 pb-12 lg:px-8">
				{crumb && <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gold">{crumb}</p>}
				<h1 className="max-w-3xl font-display text-4xl font-semibold text-white text-balance sm:text-5xl md:text-6xl">{title}</h1>
				{subtitle && <p className="mt-4 max-w-2xl text-lg text-white/85">{subtitle}</p>}
			</div>
		</section>
	);
}
