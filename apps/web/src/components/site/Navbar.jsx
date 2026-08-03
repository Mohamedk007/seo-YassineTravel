import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Menu, MessageCircle, X } from 'lucide-react';
import { CONTACT, waLink } from '@/data/contact';
import { IMG } from '@/data/images';
import { getNav } from '@/data/route-config';
import { SITE_BRAND, getNavbarConfig } from '@/data/site-config';
import { useLocale } from '@/i18n/LocaleContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
	const { t } = useTranslation();
	const lang = useLocale();
	const NAV = getNav(lang);
	const NAVBAR_CONFIG = getNavbarConfig(lang);
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [openMenu, setOpenMenu] = useState(null);
	const location = useLocation();
	const transparent = location.pathname === '/' && !scrolled;

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		onScroll();
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		setOpen(false);
	}, [location.pathname]);

	return (
		<>
		<header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${transparent ? 'bg-transparent py-4' : 'bg-background/95 border-b border-border py-2 shadow-sm backdrop-blur'}`}>
			<nav className="mx-auto flex max-w-[90rem] items-center justify-between px-5 lg:px-8" aria-label="Main navigation">
				<Link to="/" className="flex shrink-0 items-center gap-2">
					<img src={IMG.logo} alt="" className="h-9 w-9 rounded-md object-contain" width={36} height={36} />
					<span className={`font-display text-xl font-semibold leading-none ${transparent ? 'text-white' : 'text-foreground'}`}>
						{SITE_BRAND.namePrimary} <span className="text-gold">{SITE_BRAND.nameAccent}</span>
					</span>
				</Link>

				<ul className="hidden items-center gap-1 lg:flex">
					{NAV.map((item) => (
						<li
							key={item.label}
							className="relative"
							onMouseEnter={() => setOpenMenu(item.label)}
							onMouseLeave={() => setOpenMenu(null)}
							onFocus={() => item.children && setOpenMenu(item.label)}
							onBlur={(e) => {
								if (!e.currentTarget.contains(e.relatedTarget)) setOpenMenu(null);
							}}
						>
							<NavLink
								to={item.to}
								aria-haspopup={item.children ? 'true' : undefined}
								aria-expanded={item.children ? openMenu === item.label : undefined}
								className={({ isActive }) => `flex items-center gap-1 rounded px-3 py-2 text-sm font-medium transition-colors ${transparent ? 'text-white/90 hover:text-white' : 'text-foreground/80 hover:text-primary'} ${isActive ? '!text-gold' : ''}`}
							>
								{t(item.labelKey, item.label)}
								{item.children && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
							</NavLink>
							{item.children && openMenu === item.label && (
								<div className="absolute left-0 top-full min-w-52 rounded-lg border border-border bg-popover p-2 shadow-xl">
									{item.children.map((child) => (
										<Link
											key={child.to}
											to={child.to}
											className="block rounded px-3 py-2 text-sm text-popover-foreground/80 hover:bg-secondary hover:text-primary"
										>
											{t(child.labelKey, child.label)}
										</Link>
									))}
								</div>
							)}
						</li>
					))}
				</ul>

				<div className="hidden items-center gap-3 lg:flex">
					<LanguageSwitcher className={transparent ? 'text-white/90' : 'text-foreground/80'} />
					<a href={CONTACT.phoneHref} className={`text-sm font-medium ${transparent ? 'text-white/90' : 'text-foreground/80'}`}>
						{CONTACT.phone}
					</a>
					<a
						href={waLink()}
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 active:scale-[0.98]"
					>
						<MessageCircle className="h-4 w-4" /> {NAVBAR_CONFIG.desktopCtaLabel}
					</a>
				</div>

				<button
					type="button"
					className={`inline-flex h-12 w-12 items-center justify-center rounded-full lg:hidden ${
						transparent ? 'bg-black/25 text-white backdrop-blur-sm' : 'bg-secondary text-foreground'
					}`}
					onClick={() => setOpen(true)}
					aria-label="Open menu"
					aria-expanded={open}
					aria-controls="mobile-nav-drawer"
				>
					<Menu className="h-6 w-6" />
				</button>
			</nav>
		</header>

		{/* Rendered as a sibling of <header>, not a child: <header> gets
		    `backdrop-blur` when not transparent, and per the CSS Filter Effects
		    spec, backdrop-filter on an ancestor creates a new containing block
		    for `position: fixed` descendants. Nested inside <header>, this
		    drawer's `fixed inset-0` was sizing against the header's own ~56px
		    box instead of the viewport, so only a thin strip had the dark
		    background and the rest of the menu rendered with no background at
		    all, right over the page content. */}
		{open && (
			<div id="mobile-nav-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation" className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-sm lg:hidden">
				<div className="flex items-center justify-between px-5 py-5">
					<span className="flex items-center gap-2">
						<img src={IMG.logo} alt="" className="h-8 w-8 rounded-md object-contain" width={32} height={32} />
						<span className="font-display text-lg font-semibold text-white">
							{SITE_BRAND.namePrimary} <span className="text-gold">{SITE_BRAND.nameAccent}</span>
						</span>
					</span>
					<button type="button" onClick={() => setOpen(false)} className="text-white" aria-label="Close menu">
						<X className="h-7 w-7" />
					</button>
				</div>
				<ul className="max-h-[80vh] overflow-y-auto px-5 pt-2">
					{NAV.flatMap((item) => (item.children ? item.children : [item])).map((child) => (
						<li key={child.to}>
							<Link to={child.to} className="block border-b border-white/10 py-3 text-lg text-white/90">
								{t(child.labelKey, child.label)}
							</Link>
						</li>
					))}
				</ul>
				<div className="px-5 pt-6">
					<LanguageSwitcher className="mb-4 justify-center text-white/80" />
					<a
						href={waLink()}
						target="_blank"
						rel="noreferrer"
						className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 font-semibold text-primary-foreground"
					>
						<MessageCircle className="h-5 w-5" /> {NAVBAR_CONFIG.mobileCtaLabel}
					</a>
				</div>
			</div>
		)}
		</>
	);
}