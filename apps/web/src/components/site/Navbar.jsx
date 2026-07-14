import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, MessageCircle, X } from 'lucide-react';
import { CONTACT, NAV, waLink } from '@/data/site';

export function Navbar() {
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
		<header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${transparent ? 'bg-transparent py-4' : 'bg-background/95 border-b border-border py-2 shadow-sm backdrop-blur'}`}>
			<nav className="mx-auto flex max-w-[90rem] items-center justify-between px-5 lg:px-8">
				<Link to="/" className="flex shrink-0 items-center gap-2">
					<span className={`font-display text-xl font-semibold leading-none ${transparent ? 'text-white' : 'text-foreground'}`}>
						Morocco Trip <span className="text-gold">Holidays</span>
					</span>
				</Link>

				<ul className="hidden items-center gap-1 lg:flex">
					{NAV.map((item) => (
						<li
							key={item.label}
							className="relative"
							onMouseEnter={() => setOpenMenu(item.label)}
							onMouseLeave={() => setOpenMenu(null)}
						>
							<NavLink
								to={item.to}
								className={({ isActive }) => `flex items-center gap-1 rounded px-3 py-2 text-sm font-medium transition-colors ${transparent ? 'text-white/90 hover:text-white' : 'text-foreground/80 hover:text-primary'} ${isActive ? '!text-gold' : ''}`}
							>
								{item.label}
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
											{child.label}
										</Link>
									))}
								</div>
							)}
						</li>
					))}
				</ul>

				<div className="hidden items-center gap-3 lg:flex">
					<a href={CONTACT.phoneHref} className={`text-sm font-medium ${transparent ? 'text-white/90' : 'text-foreground/80'}`}>
						{CONTACT.phone}
					</a>
					<a
						href={waLink()}
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 active:scale-[0.98]"
					>
						<MessageCircle className="h-4 w-4" /> Book Now
					</a>
				</div>

				<button className={`lg:hidden ${transparent ? 'text-white' : 'text-foreground'}`} onClick={() => setOpen(true)} aria-label="Menu">
					<Menu className="h-7 w-7" />
				</button>
			</nav>

			{open && (
				<div className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-sm lg:hidden">
					<div className="flex items-center justify-between px-5 py-5">
						<span className="font-display text-lg font-semibold text-white">
							Morocco Trip <span className="text-gold">Holidays</span>
						</span>
						<button onClick={() => setOpen(false)} className="text-white" aria-label="Close">
							<X className="h-7 w-7" />
						</button>
					</div>
					<ul className="max-h-[80vh] overflow-y-auto px-5 pt-2">
						{NAV.flatMap((item) => (item.children ? item.children : [item])).map((child) => (
							<li key={child.to}>
								<Link to={child.to} className="block border-b border-white/10 py-3 text-lg text-white/90">
									{child.label}
								</Link>
							</li>
						))}
					</ul>
					<div className="px-5 pt-6">
						<a
							href={waLink()}
							target="_blank"
							rel="noreferrer"
							className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 font-semibold text-primary-foreground"
						>
							<MessageCircle className="h-5 w-5" /> Chat on WhatsApp
						</a>
					</div>
				</div>
			)}
		</header>
	);
}