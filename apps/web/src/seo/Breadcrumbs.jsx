import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function titleFromSlug(slug) {
	return slug
		.replace(/[-_]+/g, ' ')
		.replace(/\b\w/g, (ch) => ch.toUpperCase());
}

function buildCrumbs(pathname) {
	const parts = (pathname || '/')
		.split('/')
		.filter(Boolean);

	if (parts.length === 0) {
		return [{ label: 'Home', to: '/' }];
	}

	const crumbs = [{ label: 'Home', to: '/' }];
	let current = '';
	parts.forEach((part, index) => {
		current += `/${part}`;
		crumbs.push({
			label: titleFromSlug(part),
			to: index === parts.length - 1 ? null : current,
		});
	});
	return crumbs;
}

export function Breadcrumbs({ items, className = '' }) {
	const location = useLocation();
	const crumbs = items && items.length ? items : buildCrumbs(location.pathname);

	return (
		<nav aria-label="Breadcrumb" className={className}>
			<ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
				{crumbs.map((crumb, index) => {
					const isLast = index === crumbs.length - 1;
					return (
						<li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
							{crumb.to && !isLast ? (
								<Link to={crumb.to} className="hover:text-foreground transition-colors">
									{crumb.label}
								</Link>
							) : (
								<span aria-current={isLast ? 'page' : undefined} className={isLast ? 'text-foreground' : undefined}>
									{crumb.label}
								</span>
							)}
							{!isLast ? <span aria-hidden="true">/</span> : null}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}

export default Breadcrumbs;
