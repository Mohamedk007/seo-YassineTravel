import React, { useEffect, useRef } from 'react';

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
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

	return (
		<Tag ref={ref} style={{ animationDelay: `${delay}ms` }} className={`reveal ${className}`}>
			{children}
		</Tag>
	);
}