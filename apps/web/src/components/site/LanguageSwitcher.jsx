import React from 'react';
import { useLocation } from 'react-router-dom';
import { SUPPORTED_LANGUAGES } from '@/i18n/config';
import { useLocale } from '@/i18n/LocaleContext';

const LANGUAGE_LABELS = { en: 'EN', fr: 'FR' };

export function LanguageSwitcher({ className = '' }) {
	const lang = useLocale();
	// useLocation() here is basename-relative (e.g. "/blog/some-post"), which is
	// exactly the part we need to keep when switching the leading /en or /fr segment.
	const location = useLocation();

	return (
		<div className={`flex items-center gap-1 text-sm font-medium ${className}`}>
			{SUPPORTED_LANGUAGES.map((code, index) => (
				<React.Fragment key={code}>
					{index > 0 && <span className="opacity-40">/</span>}
					<a
						href={`/${code}${location.pathname}${location.search}`}
						aria-current={code === lang ? 'true' : undefined}
						className={code === lang ? 'text-gold' : 'opacity-70 hover:opacity-100'}
					>
						{LANGUAGE_LABELS[code] || code.toUpperCase()}
					</a>
				</React.Fragment>
			))}
		</div>
	);
}
