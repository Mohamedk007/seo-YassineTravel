import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Award, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Star } from 'lucide-react';
import { CONTACT, waLink } from '@/data/contact';
import { getAwards } from '@/data/content';
import { IMG } from '@/data/images';
import { getFooterCompanyLinks, getFooterTourLinks } from '@/data/route-config';
import { SITE_BRAND, getFooterConfig, getSiteCopy } from '@/data/site-config';
import { useLocale } from '@/i18n/LocaleContext';
import { Newsletter } from './LeadForm';

function FooterCol({ title, links, t }) {
	return (
		<div>
			<h4 className="font-semibold text-white">{title}</h4>
			<ul className="mt-4 space-y-2.5 text-sm">
				{links.map(([label, to, labelKey]) => (
					<li key={to}>
						<Link to={to} className="text-white/60 transition hover:text-gold">
							{t(labelKey, label)}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export function Footer() {
	const { t } = useTranslation();
	const lang = useLocale();
	const AWARDS = getAwards(lang);
	const FOOTER_TOUR_LINKS = getFooterTourLinks(lang);
	const FOOTER_COMPANY_LINKS = getFooterCompanyLinks(lang);
	const FOOTER_CONFIG = getFooterConfig(lang);
	const SITE_COPY = getSiteCopy(lang);
	return (
		<footer className="bg-ink text-white/80">
			<div className="border-b border-white/10">
				<div className="mx-auto flex max-w-[90rem] flex-col items-center gap-6 px-5 py-12 text-center lg:flex-row lg:justify-between lg:px-8 lg:text-left">
					<div>
						<h3 className="font-display text-2xl font-semibold text-white">{FOOTER_CONFIG.newsletterTitle}</h3>
						<p className="mt-1 text-sm text-white/60">{FOOTER_CONFIG.newsletterDescription}</p>
					</div>
					<Newsletter />
				</div>
			</div>
			<div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-14 lg:grid-cols-4 lg:px-8">
				<div>
					<span className="flex items-center gap-2">
						<img src={IMG.logo} alt="" className="h-9 w-9 rounded-md object-contain" width={36} height={36} />
						<span className="font-display text-xl font-semibold text-white">
							{SITE_BRAND.namePrimary} <span className="text-gold">{SITE_BRAND.nameAccent}</span>
						</span>
					</span>
					<p className="mt-3 text-sm text-white/60">{SITE_COPY.footerDescription}</p>
					<div className="mt-4 flex gap-3">
						<Star className="h-5 w-5 fill-gold text-gold" strokeWidth={0} />
						<span className="text-sm text-white/70">{SITE_COPY.reviewSummaryCompact}</span>
					</div>
					<div className="mt-4 flex gap-3">
						<a href={FOOTER_CONFIG.socialLinks.instagram} aria-label="Instagram" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
							<Instagram className="h-5 w-5" />
						</a>
						<a href={FOOTER_CONFIG.socialLinks.facebook} aria-label="Facebook" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
							<Facebook className="h-5 w-5" />
						</a>
						<a href={waLink()} aria-label="WhatsApp" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
							<MessageCircle className="h-5 w-5" />
						</a>
					</div>
				</div>
				<FooterCol title={t('footer.toursHeading', 'Tours')} links={FOOTER_TOUR_LINKS} t={t} />
				<FooterCol title={t('footer.companyHeading', 'Company')} links={FOOTER_COMPANY_LINKS} t={t} />
				<div>
					<h4 className="font-semibold text-white">Contact</h4>
					<ul className="mt-4 space-y-3 text-sm">
						<li className="flex gap-2">
							<MapPin className="h-4 w-4 shrink-0 text-gold" />
							{CONTACT.address}
						</li>
						<li className="flex gap-2">
							<Phone className="h-4 w-4 shrink-0 text-gold" />
							<a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
						</li>
						<li className="flex gap-2">
							<Mail className="h-4 w-4 shrink-0 text-gold" />
							<a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
						</li>
					</ul>
					<div className="mt-5 flex flex-wrap gap-2">
						{AWARDS.slice(0, 2).map((award) => (
							<span key={award} className="rounded border border-white/15 px-2 py-1 text-[11px] text-white/60">
								{award}
							</span>
						))}
					</div>
				</div>
			</div>
			<div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
				© {new Date().getFullYear()} {SITE_BRAND.name}. {SITE_BRAND.footerLegal}
			</div>
		</footer>
	);
}