import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Award, HeartHandshake, Sparkles, MapPin, MessageCircle,
  Phone, ArrowRight, Check, Users, Clock, Compass, Quote,
} from 'lucide-react';
import { LeadForm } from '@/components/site/LeadForm';
import { Layout } from '@/components/site/Layout';
import { Reveal } from '@/components/site/Reveal';
import { Seo } from '@/components/site/Seo';
import { Eyebrow, Stars } from '@/components/site/Typography';
import { TripAdvisorRatingBadge } from '@/components/site/TripAdvisorRatingBadge';
import { CONTACT, GOOGLE_BUSINESS_MAP_EMBED_URL, waLink } from '@/data/contact';
import { getAwards, getFaqs, getReviews } from '@/data/content';
import { getHomeBenefits, getHomeBookingSteps, getHomePage, getHomeWhyPoints } from '@/data/home';
import { IMG, getImageAttrs } from '@/data/images';
import { getPath, getRoutePaths } from '@/data/route-config';
import { getTours } from '@/data/tours/catalog';
import { useLocale } from '@/i18n/LocaleContext';
import { buildFaqSchema, buildItemListSchema } from '@/seo/schemas';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import { TourCard } from '../components/tours/TourCard';

const HOME_BENEFIT_ICONS = {
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Award,
};

export default function HomePage() {
  const lang = useLocale();
  const AWARDS = getAwards(lang);
  const FAQS = getFaqs(lang);
  const REVIEWS = getReviews(lang);
  const HOME_PAGE = getHomePage(lang);
  const HOME_BENEFITS = getHomeBenefits(lang);
  const HOME_WHY_POINTS = getHomeWhyPoints(lang);
  const HOME_BOOKING_STEPS = getHomeBookingSteps(lang);
  const ROUTE_PATHS = getRoutePaths(lang);
  const featured = getTours(lang).slice(0, HOME_PAGE.popularTours.featuredCount);
  return (
    <Layout>
      <Seo
        image={IMG.duneSunset}
        preloadImage
        breadcrumbItems={[{ routeKey: 'home' }]}
        structuredData={[
          buildFaqSchema(FAQS),
          buildItemListSchema(
            featured.map((tour) => ({ name: tour.title, url: getPath('tourDetail', lang, { slug: tour.slug }) })),
            HOME_PAGE.popularTours.title,
            lang
          ),
        ]}
      />

      {/* HERO */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
        <img
          src={IMG.duneSunset}
          {...getImageAttrs(IMG.duneSunset, lang)}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative mx-auto grid w-full max-w-[90rem] gap-10 px-5 pt-28 pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
          <div>
            <Reveal><TripAdvisorRatingBadge /></Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.02] text-white text-balance sm:text-6xl md:text-7xl">
                {HOME_PAGE.hero.title.split(HOME_PAGE.hero.highlight)[0]}<span className="text-gold">{HOME_PAGE.hero.highlight}</span>{HOME_PAGE.hero.title.split(HOME_PAGE.hero.highlight)[1]}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-lg text-white/85 md:text-xl">
                {HOME_PAGE.hero.description}
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-8 flex flex-wrap gap-3">
              <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-xl transition hover:bg-primary/90 active:scale-[0.98]">
                <MessageCircle className="h-5 w-5" /> {HOME_PAGE.hero.primaryCtaLabel}
              </a>
              <Link to={ROUTE_PATHS.tours} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/15">
                {HOME_PAGE.hero.secondaryCtaLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <Reveal delay={320} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
              {HOME_PAGE.hero.trustPoints.map((t) => (
                <span key={t} className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> {t}</span>
              ))}
            </Reveal>
          </div>
          <Reveal delay={200} className="hidden lg:block">
            <LeadForm compact title={HOME_PAGE.hero.leadFormTitle} subtitle={HOME_PAGE.hero.leadFormSubtitle} />
          </Reveal>
        </div>
      </section>

      {/* TRUST STRIP / MARQUEE */}
      <section className="border-y border-border bg-secondary/60 py-4">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee gap-12 pr-12">
            {[...AWARDS, ...AWARDS, ...AWARDS].map((a, i) => (
              <span key={i} className="flex items-center gap-2 whitespace-nowrap text-sm font-medium uppercase tracking-wider text-muted-foreground">
                <Award className="h-4 w-4 text-primary" /> {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS + TRUST BADGES + BENEFITS */}
      <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
        <div className="grid items-center gap-8 rounded-3xl bg-card p-8 shadow-sm ring-1 ring-border md:grid-cols-[auto_1fr] md:p-12">
          <div className="flex flex-col items-center text-center md:h-full md:justify-center md:border-r md:border-border md:pr-12">
            <div className="font-display text-6xl font-semibold text-primary">{HOME_PAGE.trustSummary.rating}</div>
            <Stars className="mt-1 justify-center" />
            <p className="mt-2 text-sm text-muted-foreground">{HOME_PAGE.trustSummary.description}<br />{HOME_PAGE.trustSummary.subdescription}</p>
          </div>
          <div className="space-y-6">
            {/* Row 1: award badges */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {AWARDS.map((a) => (
                <div key={a} className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                  <Award className="h-8 w-8 shrink-0 text-gold" />
                  <span className="text-sm font-medium">{a}</span>
                </div>
              ))}
            </div>
            {/* Row 2: benefits */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {HOME_BENEFITS.map((benefit, i) => {
                const Icon = HOME_BENEFIT_ICONS[benefit.icon];
                return (
                <Reveal key={benefit.title} delay={i * 150} variant="morph" className="rounded-xl border border-border bg-background p-5 transition hover:-translate-y-1 hover:shadow-lg">
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

      {/* POPULAR TOURS */}
      <section className="bg-zellige py-20">
        <div className="mx-auto max-w-[90rem] px-5 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Reveal><Eyebrow>{HOME_PAGE.popularTours.eyebrow}</Eyebrow></Reveal>
              <Reveal delay={60}><h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">{HOME_PAGE.popularTours.title}</h2></Reveal>
            </div>
            <Link to={ROUTE_PATHS.tours} className="inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all">{HOME_PAGE.popularTours.ctaLabel} <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {featured.map((t, i) => <TourCard key={t.slug} tour={t} delay={i * 90} />)}
          </div>
        </div>
      </section>

      {/* LUXURY SECTION */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="mx-auto grid max-w-[90rem] gap-0 lg:grid-cols-2">
          <div className="relative min-h-[380px]">
            <img
              src={IMG.luxCamp}
              {...getImageAttrs(IMG.luxCamp, lang)}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="px-6 py-16 lg:px-14 lg:py-24">
            <Reveal><Eyebrow>{HOME_PAGE.luxury.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">{HOME_PAGE.luxury.title}</h2></Reveal>
            <Reveal delay={120}><p className="mt-5 text-white/70">{HOME_PAGE.luxury.description}</p></Reveal>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {HOME_PAGE.luxury.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/85"><Check className="h-4 w-4 text-gold" /> {f}</li>
              ))}
            </ul>
            <Link to={ROUTE_PATHS.luxuryTours} className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-semibold text-ink transition hover:brightness-105 active:scale-95">
              {HOME_PAGE.luxury.ctaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
              <Reveal><Eyebrow>{HOME_PAGE.whyChooseUs.eyebrow}</Eyebrow></Reveal>
              <Reveal delay={60}><h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">{HOME_PAGE.whyChooseUs.title}</h2></Reveal>
              <Reveal delay={120}><p className="mt-4 text-muted-foreground">{HOME_PAGE.whyChooseUs.description}</p></Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {HOME_WHY_POINTS.map((w, i) => (
                <Reveal key={w[0]} delay={i * 70} className="flex gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div><h3 className="font-semibold">{w[0]}</h3><p className="mt-1 text-sm text-muted-foreground">{w[1]}</p></div>
                </Reveal>
              ))}
            </div>
            <div className="mt-8 flex gap-6">
                {HOME_PAGE.whyChooseUs.stats.map(([n, l]) => (
                <div key={l}><div className="font-display text-4xl font-semibold text-primary">{n}</div><div className="text-xs uppercase tracking-wider text-muted-foreground">{l}</div></div>
              ))}
            </div>
          </div>
          <Reveal delay={100} className="relative">
            <img
              src={IMG.guide}
              {...getImageAttrs(IMG.guide, lang)}
              className="rounded-3xl shadow-2xl"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-card p-5 shadow-xl ring-1 ring-border sm:block">
              <Stars />
              <p className="mt-2 max-w-[14rem] text-sm font-medium">“{HOME_PAGE.whyChooseUs.quote.text}”</p>
              <p className="text-xs text-muted-foreground">- {HOME_PAGE.whyChooseUs.quote.author}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-[90rem] px-5 lg:px-8">
          <div className="text-center">
              <Reveal><Eyebrow>{HOME_PAGE.testimonials.eyebrow}</Eyebrow></Reveal>
              <Reveal delay={60}><h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">{HOME_PAGE.testimonials.title}</h2></Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
              {REVIEWS.slice(0, HOME_PAGE.testimonials.featuredCount).map((r, i) => (
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

      {/* BOOKING PROCESS */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-[90rem] px-5 lg:px-8">
          <div className="text-center">
              <Reveal><Eyebrow>{HOME_PAGE.bookingProcess.eyebrow}</Eyebrow></Reveal>
              <Reveal delay={60}><h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">{HOME_PAGE.bookingProcess.title}</h2></Reveal>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
              {HOME_BOOKING_STEPS.map((s, i) => (
              <Reveal key={s[0]} delay={i * 90} className="relative">
                <div className="font-display text-5xl font-semibold text-gold/40">{s[0]}</div>
                <h3 className="mt-3 font-display text-xl font-semibold">{s[1]}</h3>
                <p className="mt-2 text-sm text-white/60">{s[2]}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MAP + WHATSAPP BANNER */}
      <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal className="overflow-hidden rounded-3xl shadow-sm ring-1 ring-border">
            <iframe
              title="Yassine Travel on Google Maps"
              className="h-full min-h-[320px] w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              src={GOOGLE_BUSINESS_MAP_EMBED_URL}
            />
          </Reveal>
          <Reveal delay={80} className="flex flex-col justify-center rounded-3xl bg-[#128C7E] p-10 text-white">
            <MessageCircle className="h-12 w-12" />
            <h3 className="mt-4 font-display text-3xl font-semibold">{HOME_PAGE.whatsAppBanner.title}</h3>
            <p className="mt-3 text-white/85">{HOME_PAGE.whatsAppBanner.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-[#128C7E]"><MessageCircle className="h-5 w-5" /> {HOME_PAGE.whatsAppBanner.primaryCtaLabel}</a>
              <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3.5 font-semibold text-white"><Phone className="h-5 w-5" /> {CONTACT.phone}</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LEAD CAPTURE */}
      <section className="relative overflow-hidden py-20">
        <img
          src={IMG.riad}
          {...getImageAttrs(IMG.riad, lang)}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="relative mx-auto grid max-w-[90rem] items-center gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <div className="text-white">
            <Eyebrow>{HOME_PAGE.leadCapture.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">{HOME_PAGE.leadCapture.title}</h2>
            <p className="mt-4 max-w-lg text-white/80">{HOME_PAGE.leadCapture.description}</p>
            <ul className="mt-6 space-y-2">
              {HOME_PAGE.leadCapture.points.map((t) => (
                <li key={t} className="flex items-center gap-2 text-white/85"><Check className="h-5 w-5 text-gold" /> {t}</li>
              ))}
            </ul>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[56rem] px-5 py-20 lg:px-8">
        <div className="text-center">
          <Eyebrow>{HOME_PAGE.faq.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">{HOME_PAGE.faq.title}</h2>
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {FAQS.map(([q, a], i) => (
            <AccordionItem key={i} value={`f${i}`} className="border-b border-border">
              <AccordionTrigger className="text-left font-display text-lg font-medium">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-8 text-center">
          <Link to={ROUTE_PATHS.faq} className="inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all">{HOME_PAGE.faq.ctaLabel} <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </Layout>
  );
}

export { TourCard } from '../components/tours/TourCard';
