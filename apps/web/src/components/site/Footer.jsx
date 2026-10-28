import React from 'react';
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Star } from 'lucide-react';
import { CONTACT, waLink } from '@/data/contact';
import { getAwards } from '@/data/content';
import { getFooterSections } from '@/data/footer';
import { IMG } from '@/data/images';
import { SITE_BRAND, SOCIAL_LINKS, getSiteCopy } from '@/data/site-config';
import { useLocale } from '@/i18n/LocaleContext';
import { Newsletter } from './LeadForm';
import { RichText, SmartLink } from './RichText';

function TikTokIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
			<path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
		</svg>
	);
}

function FooterLinks({ section }) {
	return (
		<div>
			{section.title ? <h4 className="font-semibold text-white">{section.title}</h4> : null}
			<ul className="mt-4 space-y-2.5 text-sm">
				{(section.links || []).map((link, i) => (
					<li key={`${link.to}-${i}`}>
						<SmartLink href={link.to} relHint={link.rel} className="text-white/60 transition hover:text-gold">
							{link.label}
						</SmartLink>
					</li>
				))}
			</ul>
		</div>
	);
}

function FooterBrand({ section, lang }) {
	return (
		<div>
			<span className="flex items-center gap-2">
				<img src={IMG.logo} alt="" className="h-9 w-9 rounded-md object-contain" width={36} height={36} />
				<span className="font-display text-xl font-semibold text-white">
					{SITE_BRAND.namePrimary} <span className="text-gold">{SITE_BRAND.nameAccent}</span>
				</span>
			</span>
			{section.description ? <p className="mt-3 text-sm text-white/60">{section.description}</p> : null}
			{section.showRating ? (
				<div className="mt-4 flex gap-3">
					<Star className="h-5 w-5 fill-gold text-gold" strokeWidth={0} />
					<span className="text-sm text-white/70">{getSiteCopy(lang).reviewSummaryCompact}</span>
				</div>
			) : null}
			{section.showSocial ? (
				<div className="mt-4 flex gap-3">
					<a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
						<Instagram className="h-5 w-5" />
					</a>
					<a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
						<Facebook className="h-5 w-5" />
					</a>
					<a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
						<TikTokIcon className="h-5 w-5" />
					</a>
					<a href={waLink()} aria-label="WhatsApp" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
						<MessageCircle className="h-5 w-5" />
					</a>
				</div>
			) : null}
		</div>
	);
}

function FooterContact({ section, lang }) {
	return (
		<div>
			{section.title ? <h4 className="font-semibold text-white">{section.title}</h4> : null}
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
			{section.showAwards ? (
				<div className="mt-5 flex flex-wrap gap-2">
					{getAwards(lang).slice(0, 2).map((award) => (
						<span key={award} className="rounded border border-white/15 px-2 py-1 text-[11px] text-white/60">
							{award}
						</span>
					))}
				</div>
			) : null}
		</div>
	);
}

function FooterText({ section }) {
	return (
		<div>
			{section.title ? <h4 className="font-semibold text-white">{section.title}</h4> : null}
			{(section.paragraphs || []).map((paragraph, i) => (
				<p key={i} className="mt-4 text-sm text-white/60">
					<RichText text={paragraph} linkClassName="text-gold underline underline-offset-4 hover:text-gold/80" strongClassName="font-semibold text-white" />
				</p>
			))}
		</div>
	);
}

const COLUMN_COMPONENTS = { brand: FooterBrand, links: FooterLinks, contact: FooterContact, text: FooterText };
const GRID_COLUMNS = { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6' };

function NewsletterBand({ section }) {
	return (
		<div className="border-b border-white/10">
			<div className="mx-auto flex max-w-[90rem] flex-col items-center gap-6 px-5 py-12 text-center lg:flex-row lg:justify-between lg:px-8 lg:text-left">
				<div>
					{section.title ? <h3 className="font-display text-2xl font-semibold text-white">{section.title}</h3> : null}
					{section.description ? <p className="mt-1 text-sm text-white/60">{section.description}</p> : null}
				</div>
				<Newsletter />
			</div>
		</div>
	);
}

function LegalBand({ section }) {
	return (
		<div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
			© {new Date().getFullYear()} {SITE_BRAND.name}. {section.text}
		</div>
	);
}

/** Visible parts, with consecutive columns grouped into one row. */
function groupSections(sections) {
	const groups = [];
	for (const section of sections) {
		if (!section || section.hidden) continue;
		if (COLUMN_COMPONENTS[section.type]) {
			const last = groups[groups.length - 1];
			if (last?.type === 'columns') last.items.push(section);
			else groups.push({ type: 'columns', id: section.id, items: [section] });
		} else if (section.type === 'newsletter' || section.type === 'legal') {
			groups.push(section);
		}
	}
	return groups;
}

export function Footer() {
	const lang = useLocale();
	return (
		<footer className="bg-ink text-white/80">
			{groupSections(getFooterSections(lang)).map((group) => {
				if (group.type === 'newsletter') return <NewsletterBand key={group.id} section={group} />;
				if (group.type === 'legal') return <LegalBand key={group.id} section={group} />;
				return (
					<div key={group.id} className={`mx-auto grid max-w-[90rem] gap-10 px-5 py-14 lg:px-8 ${GRID_COLUMNS[Math.min(group.items.length, 6)]}`}>
						{group.items.map((section) => {
							const Column = COLUMN_COMPONENTS[section.type];
							return <Column key={section.id} section={section} lang={lang} />;
						})}
					</div>
				);
			})}
		</footer>
	);
}