import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Award, HeartHandshake, Sparkles, MapPin, MessageCircle, Phone, ArrowRight, Check,
  Users, Clock, Compass, Quote, Star, Car, Plane, Camera, Mountain, Sun, Gem, Tent, Heart,
} from 'lucide-react';
import { LeadForm } from '@/components/site/LeadForm';
import { Reveal } from '@/components/site/Reveal';
import { RichText, SmartLink } from '@/components/site/RichText';
import { Eyebrow, Stars } from '@/components/site/Typography';
import { TripAdvisorRatingBadge } from '@/components/site/TripAdvisorRatingBadge';
import { TourCard } from '@/components/tours/TourCard';
import { CONTACT, waLink } from '@/data/contact';
import { getImageAttrs } from '@/data/images';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';

// Icon names selectable in /admin (keep in sync with admin/catalog.js).
const ICONS = {
  ShieldCheck, Sparkles, HeartHandshake, Award, Compass, MapPin, Users, Clock,
  Star, Car, Plane, Camera, Mountain, Sun, Gem, Tent, Heart, Check, MessageCircle,
};

const BACKGROUNDS = {
  light: '',
  muted: 'bg-secondary/60',
  dark: 'bg-ink text-white',
};

const GRID_COLUMNS = { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' };

const list = (value) => (Array.isArray(value) ? value : []);
const count = (value) => Math.max(0, Number(value) || 0);

function SectionImage({ src, alt, lang, ...props }) {
  if (!src) return null;
  const attrs = getImageAttrs(src, lang);
  return <img src={src} {...attrs} alt={alt || attrs.alt || ''} {...props} />;
}

function Heading({ section, className = 'mt-3 font-display text-4xl font-semibold md:text-5xl' }) {
  return (
    <>
      {section.eyebrow ? <Reveal><Eyebrow>{section.eyebrow}</Eyebrow></Reveal> : null}
      {section.title ? <Reveal delay={60}><h2 className={className}>{section.title}</h2></Reveal> : null}
    </>
  );
}

function HeroSection({ section: s, lang, routes, isMainHero }) {
  const Title = isMainHero ? 'h1' : 'h2';
  const title = String(s.title || '');
  const at = s.highlight ? title.indexOf(s.highlight) : -1;
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-ink">
      <SectionImage
        src={s.image}
        alt={s.imageAlt}
        lang={lang}
        className="absolute inset-0 h-full w-full object-cover"
        loading={isMainHero ? 'eager' : 'lazy'}
        fetchPriority={isMainHero ? 'high' : undefined}
        decoding="async"
        sizes="100vw"
      />
      <div className="absolute inset-0 hero-gradient" />
      <div className={`relative mx-auto grid w-full max-w-[90rem] gap-10 px-5 pt-28 pb-16 lg:items-center lg:px-8 ${s.showLeadForm ? 'lg:grid-cols-[1.2fr_0.8fr]' : ''}`}>
        <div>
          <Reveal><TripAdvisorRatingBadge /></Reveal>
          <Reveal delay={80}>
            <Title className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.02] text-white text-balance sm:text-6xl md:text-7xl">
              {at >= 0 ? (
                <>
                  {title.slice(0, at)}<span className="text-gold">{s.highlight}</span>{title.slice(at + s.highlight.length)}
                </>
              ) : title}
            </Title>
          </Reveal>
          {s.description ? (
            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-lg text-white/85 md:text-xl">{s.description}</p>
            </Reveal>
          ) : null}
          <Reveal delay={240} className="mt-8 flex flex-wrap gap-3">
            {s.primaryCtaLabel ? (
              <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-xl transition hover:bg-primary/90 active:scale-[0.98]">
                <MessageCircle className="h-5 w-5" /> {s.primaryCtaLabel}
              </a>
            ) : null}
            {s.secondaryCtaLabel ? (
              <Link to={routes.tours} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/15">
                {s.secondaryCtaLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </Reveal>
          <Reveal delay={320} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
            {list(s.trustPoints).map((point) => (
              <span key={point} className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> {point}</span>
            ))}
          </Reveal>
        </div>
        {s.showLeadForm ? (
          <Reveal delay={200} className="hidden lg:block">
            <LeadForm compact title={s.leadFormTitle} subtitle={s.leadFormSubtitle} />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

function AwardsStripSection({ awards }) {
  return (
    <section className="border-y border-border bg-secondary/60 py-4">
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee gap-12 pr-12">
          {[...awards, ...awards, ...awards].map((a, i) => (
            <span key={i} className="flex items-center gap-2 whitespace-nowrap text-sm font-medium uppercase tracking-wider text-muted-foreground">
              <Award className="h-4 w-4 text-primary" /> {a}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSummarySection({ section: s, awards }) {
  return (
    <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
      <div className="grid items-center gap-8 rounded-3xl bg-card p-8 shadow-sm ring-1 ring-border md:grid-cols-[auto_1fr] md:p-12">
        <div className="flex flex-col items-center text-center md:h-full md:justify-center md:border-r md:border-border md:pr-12">
          <div className="font-display text-6xl font-semibold text-primary">{s.rating}</div>
          <Stars className="mt-1 justify-center" />
          <p className="mt-2 text-sm text-muted-foreground">{s.description}<br />{s.subdescription}</p>
        </div>
        <div className="space-y-6">
          {s.showAwards ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {awards.map((a) => (
                <div key={a} className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                  <Award className="h-8 w-8 shrink-0 text-gold" />
                  <span className="text-sm font-medium">{a}</span>
                </div>
              ))}
            </div>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {list(s.benefits).map((benefit, i) => {
              const Icon = ICONS[benefit.icon] || Check;
              return (
                <Reveal key={`${benefit.title}-${i}`} delay={i * 150} variant="morph" className="rounded-xl border border-border bg-background p-5 transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
                  <h3 className="mt-3 font-display text-lg font-semibold">{benefit.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{benefit.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function PopularToursSection({ section: s, tours, routes }) {
  return (
    <section className="bg-zellige py-20">
      <div className="mx-auto max-w-[90rem] px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div><Heading section={s} /></div>
          {s.ctaLabel ? (
            <Link to={routes.tours} className="inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all">{s.ctaLabel} <ArrowRight className="h-4 w-4" /></Link>
          ) : null}
        </div>
        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {tours.slice(0, count(s.featuredCount)).map((t, i) => <TourCard key={t.slug} tour={t} delay={i * 90} />)}
        </div>
      </div>
    </section>
  );
}

function LuxurySection({ section: s, lang, routes }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="mx-auto grid max-w-[90rem] gap-0 lg:grid-cols-2">
        <div className="relative min-h-[380px]">
          <SectionImage
            src={s.image}
            alt={s.imageAlt}
            lang={lang}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div className="px-6 py-16 lg:px-14 lg:py-24">
          <Heading section={s} className="mt-4 font-display text-4xl font-semibold md:text-5xl" />
          {s.description ? <Reveal delay={120}><p className="mt-5 text-white/70">{s.description}</p></Reveal> : null}
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {list(s.features).map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-white/85"><Check className="h-4 w-4 text-gold" /> {f}</li>
            ))}
          </ul>
          {s.ctaLabel ? (
            <Link to={routes.luxuryTours} className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-semibold text-ink transition hover:brightness-105 active:scale-95">
              {s.ctaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsSection({ section: s, lang }) {
  return (
    <section className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Heading section={s} />
          {s.description ? <Reveal delay={120}><p className="mt-4 text-muted-foreground">{s.description}</p></Reveal> : null}
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {list(s.reasons).map((point, i) => (
              <Reveal key={`${point.title}-${i}`} delay={i * 70} className="flex gap-3">
                <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div><h3 className="font-semibold">{point.title}</h3><p className="mt-1 text-sm text-muted-foreground">{point.text}</p></div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex gap-6">
            {list(s.stats).map((stat, i) => (
              <div key={`${stat.label}-${i}`}><div className="font-display text-4xl font-semibold text-primary">{stat.value}</div><div className="text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</div></div>
            ))}
          </div>
        </div>
        <Reveal delay={100} className="relative">
          <SectionImage src={s.image} alt={s.imageAlt} lang={lang} className="rounded-3xl shadow-2xl" loading="lazy" decoding="async" />
          {s.quoteText ? (
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-card p-5 shadow-xl ring-1 ring-border sm:block">
              <Stars />
              <p className="mt-2 max-w-[14rem] text-sm font-medium">“{s.quoteText}”</p>
              {s.quoteAuthor ? <p className="text-xs text-muted-foreground">- {s.quoteAuthor}</p> : null}
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

function TestimonialsSection({ section: s, reviews }) {
  return (
    <section className="bg-secondary/60 py-20">
      <div className="mx-auto max-w-[90rem] px-5 lg:px-8">
        <div className="text-center"><Heading section={s} /></div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.slice(0, count(s.featuredCount)).map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 90} className="rounded-2xl bg-card p-7 shadow-sm ring-1 ring-border">
              <Quote className="h-8 w-8 text-primary/20" />
              <Stars className="mt-2" />
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">“{r.text}”</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">{r.name[0]}</div>
                <div><div className="text-sm font-semibold">{r.name}</div><div className="text-xs text-muted-foreground">{r.country} · {r.tour}</div></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingProcessSection({ section: s }) {
  return (
    <section className="bg-ink py-20 text-white">
      <div className="mx-auto max-w-[90rem] px-5 lg:px-8">
        <div className="text-center"><Heading section={s} /></div>
        <div className="mt-14 grid gap-8 md:grid-cols-4">
          {list(s.steps).map((step, i) => (
            <Reveal key={`${step.number}-${i}`} delay={i * 90} className="relative">
              <div className="font-display text-5xl font-semibold text-gold/40">{step.number}</div>
              <h3 className="mt-3 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-white/60">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactBannerSection({ section: s }) {
  return (
    <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
      <div className={`grid gap-8 ${s.showMap ? 'lg:grid-cols-2' : ''}`}>
        {s.showMap ? (
          <Reveal className="overflow-hidden rounded-3xl shadow-sm ring-1 ring-border">
            <iframe
              title="Yassine Travel on Google Maps"
              className="h-full min-h-[320px] w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              src={CONTACT.mapEmbedUrl}
            />
          </Reveal>
        ) : null}
        <Reveal delay={80} className="flex flex-col justify-center rounded-3xl bg-[#128C7E] p-10 text-white">
          <MessageCircle className="h-12 w-12" />
          <h3 className="mt-4 font-display text-3xl font-semibold">{s.title}</h3>
          <p className="mt-3 text-white/85">{s.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-[#128C7E]"><MessageCircle className="h-5 w-5" /> {s.primaryCtaLabel}</a>
            <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3.5 font-semibold text-white"><Phone className="h-5 w-5" /> {CONTACT.phone}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LeadCaptureSection({ section: s, lang }) {
  return (
    <section className="relative overflow-hidden bg-ink py-20">
      <SectionImage
        src={s.image}
        alt={s.imageAlt}
        lang={lang}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/80" />
      <div className="relative mx-auto grid max-w-[90rem] items-center gap-10 px-5 lg:grid-cols-2 lg:px-8">
        <div className="text-white">
          {s.eyebrow ? <Eyebrow>{s.eyebrow}</Eyebrow> : null}
          {s.title ? <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">{s.title}</h2> : null}
          {s.description ? <p className="mt-4 max-w-lg text-white/80">{s.description}</p> : null}
          <ul className="mt-6 space-y-2">
            {list(s.points).map((point) => (
              <li key={point} className="flex items-center gap-2 text-white/85"><Check className="h-5 w-5 text-gold" /> {point}</li>
            ))}
          </ul>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}

function FaqSection({ section: s, faqs, routes }) {
  return (
    <section className="mx-auto max-w-[56rem] px-5 py-20 lg:px-8">
      <div className="text-center">
        {s.eyebrow ? <Eyebrow>{s.eyebrow}</Eyebrow> : null}
        {s.title ? <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">{s.title}</h2> : null}
      </div>
      <Accordion type="single" collapsible className="mt-10">
        {faqs.map(([q, a], i) => (
          <AccordionItem key={i} value={`f${i}`} className="border-b border-border">
            <AccordionTrigger className="text-left font-display text-lg font-medium">{q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {s.ctaLabel ? (
        <div className="mt-8 text-center">
          <Link to={routes.faq} className="inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all">{s.ctaLabel} <ArrowRight className="h-4 w-4" /></Link>
        </div>
      ) : null}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Free-form parts that can be added from /admin
// ---------------------------------------------------------------------------

function richTextClasses(dark) {
  return dark
    ? { linkClassName: 'font-medium text-gold underline underline-offset-4 hover:text-gold/80', strongClassName: 'font-semibold text-white' }
    : {};
}

function CtaButton({ label, link, dark }) {
  if (!label || !link) return null;
  return (
    <SmartLink
      href={link}
      className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold transition active:scale-95 ${dark ? 'bg-gold text-ink hover:brightness-105' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
    >
      {label} <ArrowRight className="h-4 w-4" />
    </SmartLink>
  );
}

function RichTextSection({ section: s, lang }) {
  const dark = s.background === 'dark';
  const hasImage = Boolean(s.image);
  return (
    <section className={`py-20 ${BACKGROUNDS[s.background] ?? ''}`}>
      <div className={`mx-auto grid gap-12 px-5 lg:px-8 ${hasImage ? 'max-w-[90rem] lg:grid-cols-2 lg:items-center' : 'max-w-[56rem]'}`}>
        <div>
          <Heading section={s} />
          {list(s.paragraphs).map((paragraph, i) => (
            <p key={i} className={`mt-4 leading-relaxed ${dark ? 'text-white/75' : 'text-muted-foreground'}`}>
              <RichText text={paragraph} {...richTextClasses(dark)} />
            </p>
          ))}
          {s.ctaLabel && s.ctaLink ? (
            <div className="mt-8"><CtaButton label={s.ctaLabel} link={s.ctaLink} dark={dark} /></div>
          ) : null}
        </div>
        {hasImage ? (
          <Reveal delay={100} className={s.imagePosition === 'left' ? 'lg:order-first' : ''}>
            <SectionImage src={s.image} alt={s.imageAlt} lang={lang} className="w-full rounded-3xl object-cover shadow-2xl" loading="lazy" decoding="async" />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

function CardsSection({ section: s }) {
  const dark = s.background === 'dark';
  const items = list(s.items);
  const columns = GRID_COLUMNS[Math.min(Math.max(items.length, 2), 4)];
  return (
    <section className={`py-20 ${BACKGROUNDS[s.background] ?? ''}`}>
      <div className="mx-auto max-w-[90rem] px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Heading section={s} />
          {s.description ? <p className={`mt-4 ${dark ? 'text-white/70' : 'text-muted-foreground'}`}>{s.description}</p> : null}
        </div>
        <div className={`mt-12 grid gap-6 sm:grid-cols-2 ${columns}`}>
          {items.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal key={`${item.title}-${i}`} delay={i * 90} className={`rounded-2xl p-7 ring-1 ${dark ? 'bg-white/5 ring-white/10' : 'bg-card shadow-sm ring-border'}`}>
                {Icon ? <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div> : null}
                {item.title ? <h3 className="mt-3 font-display text-xl font-semibold">{item.title}</h3> : null}
                {item.text ? (
                  <p className={`mt-2 text-sm ${dark ? 'text-white/70' : 'text-muted-foreground'}`}>
                    <RichText text={item.text} {...richTextClasses(dark)} />
                  </p>
                ) : null}
                {item.linkLabel && item.link ? (
                  <SmartLink href={item.link} className={`mt-4 inline-flex items-center gap-2 font-semibold ${dark ? 'text-gold' : 'text-primary'}`}>
                    {item.linkLabel} <ArrowRight className="h-4 w-4" />
                  </SmartLink>
                ) : null}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CtaBandSection({ section: s }) {
  const dark = s.background !== 'light' && s.background !== 'muted';
  return (
    <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
      <div className={`flex flex-col items-start gap-6 rounded-3xl p-10 md:flex-row md:items-center md:justify-between ${dark ? 'bg-ink text-white' : `${BACKGROUNDS[s.background] || ''} ring-1 ring-border`}`}>
        <div>
          {s.title ? <h2 className="font-display text-3xl font-semibold md:text-4xl">{s.title}</h2> : null}
          {s.description ? <p className={`mt-3 max-w-2xl ${dark ? 'text-white/75' : 'text-muted-foreground'}`}>{s.description}</p> : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <CtaButton label={s.ctaLabel} link={s.ctaLink} dark={dark} />
          {s.whatsAppLabel ? (
            <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#128C7E] px-7 py-3.5 font-semibold text-white">
              <MessageCircle className="h-5 w-5" /> {s.whatsAppLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** `type` -> component. Parts with an unknown type are skipped. */
export const HOME_SECTION_COMPONENTS = {
  hero: HeroSection,
  awardsStrip: AwardsStripSection,
  trustSummary: TrustSummarySection,
  popularTours: PopularToursSection,
  luxury: LuxurySection,
  whyChooseUs: WhyChooseUsSection,
  testimonials: TestimonialsSection,
  bookingProcess: BookingProcessSection,
  contactBanner: ContactBannerSection,
  leadCapture: LeadCaptureSection,
  faq: FaqSection,
  richText: RichTextSection,
  cards: CardsSection,
  ctaBand: CtaBandSection,
};
