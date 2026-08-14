import React, { useEffect, useRef } from 'react';

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div', variant = 'fade' }) {
	const ref = useRef(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					element.classList.add('in-view');
					observer.disconnect();
				}
			},
			{ threshold: 0.12 }
		);

		observer.observe(element);
		return () => observer.disconnect();
	}, []);

	const revealClass = variant === 'morph' ? 'reveal-morph' : 'reveal';

	return (
		<Tag ref={ref} style={{ animationDelay: `${delay}ms` }} className={`${revealClass} ${className}`}>
			{children}
		</Tag>
	);
}