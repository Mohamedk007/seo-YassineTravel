import React from 'react';
import { Star } from 'lucide-react';

export function Eyebrow({ children }) {
	return (
		<span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
			<span className="h-px w-8 bg-primary/60" />
			{children}
		</span>
	);
}

export function Stars({ n = 5, className = '' }) {
	return (
		<span className={`inline-flex text-gold ${className}`}>
			{Array.from({ length: n }).map((_, index) => (
				<Star key={index} className="h-4 w-4 fill-current" strokeWidth={0} />
			))}
		</span>
	);
}