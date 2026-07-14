import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Menu, X, Phone, Mail, MapPin, Star, ChevronDown, MessageCircle,
  Instagram, Facebook, Send, Check, ArrowRight,
} from 'lucide-react';
import { NAV, CONTACT, waLink, AWARDS } from '@/data/site';
import { useToast } from '@/hooks/use-toast';

/* ---------- SEO ---------- */
export function Seo({ title, description }) {
  const full = title ? `${title} | Morocco Trip Holidays` : 'Morocco Trip Holidays — Luxury Private Morocco Tours';
  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={description || 'Bespoke luxury private tours of Morocco — Sahara desert, imperial cities, five-star riads. Trusted by travellers from the US, UK, Canada & Australia.'} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description || ''} />
    </Helmet>
  );
}

/* ---------- Scroll reveal ---------- */
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('in-view'); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} style={{ animationDelay: `${delay}ms` }} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}

/* ---------- Section heading ---------- */
export function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
      <span className="h-px w-8 bg-primary/60" />{children}
    </span>
  );
}

export function Stars({ n = 5, className = '' }) {
  return (
    <span className={`inline-flex text-gold ${className}`}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />
      ))}
    </span>
  );
}

/* ---------- Navbar ---------- */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const loc = useLocation();
  const transparent = loc.pathname === '/' && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${transparent ? 'bg-transparent py-4' : 'bg-background/95 backdrop-blur border-b border-border py-2 shadow-sm'}`}>
      <nav className="mx-auto flex max-w-[90rem] items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className={`font-display text-xl font-semibold leading-none ${transparent ? 'text-white' : 'text-foreground'}`}>
            Morocco Trip <span className="text-gold">Holidays</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <li key={item.label} className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}>
              <NavLink to={item.to}
                className={({ isActive }) => `flex items-center gap-1 rounded px-3 py-2 text-sm font-medium transition-colors ${transparent ? 'text-white/90 hover:text-white' : 'text-foreground/80 hover:text-primary'} ${isActive ? '!text-gold' : ''}`}>
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
              </NavLink>
              {item.children && openMenu === item.label && (
                <div className="absolute left-0 top-full min-w-52 rounded-lg border border-border bg-popover p-2 shadow-xl">
                  {item.children.map((c) => (
                    <Link key={c.to} to={c.to}
                      className="block rounded px-3 py-2 text-sm text-popover-foreground/80 hover:bg-secondary hover:text-primary">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={CONTACT.phoneHref} className={`text-sm font-medium ${transparent ? 'text-white/90' : 'text-foreground/80'}`}>{CONTACT.phone}</a>
          <a href={waLink()} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 active:scale-[0.98]">
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
            <span className="font-display text-lg font-semibold text-white">Morocco Trip <span className="text-gold">Holidays</span></span>
            <button onClick={() => setOpen(false)} className="text-white" aria-label="Close"><X className="h-7 w-7" /></button>
          </div>
          <ul className="flex flex-col gap-1 px-5 pt-2 overflow-y-auto max-h-[80vh]">
            {NAV.flatMap((i) => i.children ? i.children : [i]).map((c) => (
              <li key={c.to}>
                <Link to={c.to} className="block border-b border-white/10 py-3 text-lg text-white/90">{c.label}</Link>
              </li>
            ))}
          </ul>
          <div className="px-5 pt-6">
            <a href={waLink()} target="_blank" rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 font-semibold text-primary-foreground">
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- WhatsApp floating widget ---------- */
export function WhatsAppWidget() {
  return (
    <a href={waLink()} target="_blank" rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 font-semibold text-white shadow-2xl transition hover:scale-105 active:scale-95"
      aria-label="Chat on WhatsApp">
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:inline pr-1">Chat with us</span>
    </a>
  );
}

/* ---------- Lead / booking form ---------- */
export function LeadForm({ compact = false, title = 'Plan Your Morocco Trip', subtitle = 'Free, no-obligation itinerary within 24 hours.' }) {
  const { toast } = useToast();
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    toast({ title: 'Inquiry received', description: 'Our trip designers will reply within 24 hours.' });
  };
  if (sent) {
    return (
      <div className="rounded-2xl bg-card p-8 text-center shadow-xl ring-1 ring-border">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-7 w-7 text-primary" />
        </div>
        <h3 className="font-display text-2xl font-semibold">Thank you!</h3>
        <p className="mt-2 text-muted-foreground">We have received your request and will craft a personalised itinerary within 24 hours. Prefer to talk now?</p>
        <a href={waLink()} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white">
          <MessageCircle className="h-5 w-5" /> Message us on WhatsApp
        </a>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-card p-6 shadow-xl ring-1 ring-border sm:p-8">
      <h3 className="font-display text-2xl font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      <div className={`mt-5 grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <Field label="Full name" name="name" placeholder="Jane Doe" required />
        <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
        <Field label="Phone / WhatsApp" name="phone" placeholder="+1 555 000 0000" />
        <Field label="Travel dates" name="dates" placeholder="e.g. May 2025" />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Interested in</span>
          <select name="interest" className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring">
            <option>Luxury Tour</option><option>Private Tour</option><option>Desert Tour</option>
            <option>Day Trip</option><option>Airport Transfer</option><option>Custom Itinerary</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Travellers</span>
          <select name="pax" className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring">
            <option>1–2</option><option>3–4</option><option>5–6</option><option>7+</option>
          </select>
        </label>
      </div>
      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium">Tell us about your dream trip</span>
        <textarea name="message" rows={3} placeholder="Interests, budget, must-sees…" className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
      </label>
      <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 active:scale-[0.99]">
        Get My Free Itinerary <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">No spam. Your details stay private. Reply within 24h.</p>
    </form>
  );
}

function Field({ label, name, type = 'text', placeholder, required }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}{required && <span className="text-primary"> *</span>}</span>
      <input type={type} name={name} placeholder={placeholder} required={required}
        className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-ring" />
    </label>
  );
}

/* ---------- Newsletter ---------- */
export function Newsletter() {
  const { toast } = useToast();
  return (
    <form onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); toast({ title: 'Subscribed!', description: 'Watch your inbox for insider Morocco travel tips.' }); }}
      className="flex w-full max-w-md gap-2">
      <input required type="email" placeholder="Your email address"
        className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-gold" />
      <button className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink transition hover:brightness-105 active:scale-95">
        <Send className="h-4 w-4" /> Join
      </button>
    </form>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[90rem] flex-col items-center gap-6 px-5 py-12 text-center lg:flex-row lg:justify-between lg:text-left lg:px-8">
          <div>
            <h3 className="font-display text-2xl font-semibold text-white">Get insider Morocco travel tips</h3>
            <p className="mt-1 text-sm text-white/60">Seasonal guides, hidden riads and members-only offers.</p>
          </div>
          <Newsletter />
        </div>
      </div>
      <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-14 lg:grid-cols-4 lg:px-8">
        <div>
          <span className="font-display text-xl font-semibold text-white">Morocco Trip <span className="text-gold">Holidays</span></span>
          <p className="mt-3 text-sm text-white/60">Bespoke luxury private tours crafted by local experts. Trusted by discerning travellers worldwide since 2011.</p>
          <div className="mt-4 flex gap-3">
            <Star className="h-5 w-5 fill-gold text-gold" strokeWidth={0} />
            <span className="text-sm text-white/70">4.9/5 · 1,200+ reviews</span>
          </div>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Instagram" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Facebook className="h-5 w-5" /></a>
            <a href={waLink()} aria-label="WhatsApp" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><MessageCircle className="h-5 w-5" /></a>
          </div>
        </div>
        <FooterCol title="Tours" links={[['Luxury Tours','/luxury-tours'],['Private Tours','/private-tours'],['Desert Tours','/desert-tours'],['Day Trips','/day-trips'],['Custom Tours','/custom-tours']]} />
        <FooterCol title="Company" links={[['About Us','/about'],['Destinations','/destinations'],['Reviews','/reviews'],['Gallery','/gallery'],['Blog','/blog'],['Travel Guide','/travel-guide'],['FAQ','/faq']]} />
        <div>
          <h4 className="font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-gold" />{CONTACT.address}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-gold" /><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-gold" /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {AWARDS.slice(0, 2).map((a) => (
              <span key={a} className="rounded border border-white/15 px-2 py-1 text-[11px] text-white/60">{a}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Morocco Trip Holidays. All rights reserved. · Licensed Moroccan tour operator.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="font-semibold text-white">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map(([label, to]) => (
          <li key={to}><Link to={to} className="text-white/60 transition hover:text-gold">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Page layout wrapper ---------- */
export function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

/* ---------- Simple page hero ---------- */
export function PageHero({ title, subtitle, image, crumb }) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden pt-24">
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 hero-gradient" />
      <div className="relative mx-auto w-full max-w-[72rem] px-5 pb-12 lg:px-8">
        {crumb && <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gold">{crumb}</p>}
        <h1 className="max-w-3xl font-display text-4xl font-semibold text-white text-balance sm:text-5xl md:text-6xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-white/85">{subtitle}</p>}
      </div>
    </section>
  );
}
