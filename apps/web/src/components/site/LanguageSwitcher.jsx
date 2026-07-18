import React from 'react';
import { useLocation } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '@/i18n/config';
import { useLocale } from '@/i18n/LocaleContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const LANGUAGE_NAMES = { en: 'English', fr: 'Français' };

export function LanguageSwitcher({ className = '' }) {
	const lang = useLocale();
	// useLocation() here is basename-relative (e.g. "/blog/some-post"), which is
	// exactly the part we need to keep when switching the leading /en or /fr segment.
	const location = useLocation();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className={`inline-flex items-center gap-1.5 rounded-full border border-current/20 px-3 py-1.5 text-sm font-medium transition hover:bg-current/10 ${className}`}
			>
				<Globe className="h-4 w-4" />
				{lang.toUpperCase()}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{SUPPORTED_LANGUAGES.map((code) => (
					<DropdownMenuItem key={code} asChild>
						<a
							href={`/${code}${location.pathname}${location.search}`}
							aria-current={code === lang ? 'true' : undefined}
							className={code === lang ? 'font-semibold text-primary' : ''}
						>
							{LANGUAGE_NAMES[code] || code.toUpperCase()}
						</a>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
