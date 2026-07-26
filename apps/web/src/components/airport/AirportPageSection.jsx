import React from 'react';

// Generic section wrapper used by every airport-page section below — keeps
// heading level (h2), spacing and max-width consistent without each section
// re-implementing its own <section> shell.
export function AirportPageSection({ id, eyebrow, title, subtitle, children, className = '', containerClassName = '' }) {
	return (
		<section id={id} className={`mx-auto max-w-[72rem] px-5 py-12 lg:px-8 ${containerClassName}`}>
			{eyebrow && <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>}
			{title && <h2 className={`font-display text-2xl font-semibold md:text-3xl ${eyebrow ? 'mt-2' : ''}`}>{title}</h2>}
			{subtitle && <p className="mt-2 max-w-3xl text-muted-foreground">{subtitle}</p>}
			<div className={`${title ? 'mt-6' : ''} ${className}`}>{children}</div>
		</section>
	);
}
