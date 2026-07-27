import React from 'react';
import { getImageAttrs } from '@/data/images';
import { useLocale } from '@/i18n/LocaleContext';

export function Gallery({ images, altPrefix = 'Photo' }) {
	const lang = useLocale();
	if (!images || images.length === 0) return null;

	return (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
			{images.map((src, index) => (
				<div key={src} className="aspect-[4/3] overflow-hidden rounded-xl">
					<img
						src={src}
						width={400}
						height={300}
						{...getImageAttrs(src, lang, `${altPrefix} ${index + 1}`)}
						className="h-full w-full object-cover transition duration-500 hover:scale-105"
						loading="lazy"
						decoding="async"
					/>
				</div>
			))}
		</div>
	);
}
