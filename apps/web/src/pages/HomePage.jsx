import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Award, HeartHandshake, Sparkles, MapPin, MessageCircle,
  Phone, ArrowRight, Check, Users, Clock, Compass, Star, Quote,
} from 'lucide-react';
import {
  Layout, Seo, Reveal, Eyebrow, Stars, LeadForm,
} from '@/components/site';
import { IMG, TOURS, REVIEWS, FAQS, AWARDS, CONTACT, waLink } from '@/data/site';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';

const BENEFITS = [
  { icon: ShieldCheck, title: '100% Private & Safe', text: 'Your own vehicle, vetted driver-guide and 24/7 concierge on every journey.' },
  { icon: Sparkles, title: 'Handpicked Luxury', text: 'Five-star riads, boutique kasbahs and premium desert camps — never mass tourism.' },
  { icon: HeartHandshake, title: 'Authentic & Local', text: 'Born-and-raised Moroccan guides who open doors ordinary tourists never see.' },
  { icon: Award, title: 'Award-Winning Service', text: "TripAdvisor Travellers' Choice, 4.9/5 across 1,200+ verified reviews." },
];

const WHY = [
  ['Tailor-made itineraries', 'Every trip is designed around your interests, pace and budget — never off-the-shelf.'],
  ['Transparent, fair pricing', 'No hidden fees. Clear quotes from €600 to €3,500+ with best-value luxury.'],
  ['Fast WhatsApp replies', 'Real humans, real answers — usually within the hour, before and during your trip.'],
  ['13+ years of expertise', 'Thousands of happy travellers from the US, UK, Canada, Australia and Europe.'],
];

const STEPS = [
  ['01', 'Share your dream', 'Tell us your dates, interests and budget via the form or WhatsApp.'],
  ['02', 'Get a custom plan', 'Receive a tailor-made itinerary and transparent quote within 24 hours.'],
  ['03', 'Refine together', 'We fine-tune every detail until your journey is exactly right.'],
  ['04', 'Travel worry-free', 'Arrive to a warm welcome and full concierge support throughout.'],
];

export default function HomePage() {
  const featured = TOURS.slice(0, 3);
  return (
    <Layout>
      <Seo />

      {/* HERO */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
        <img src={IMG.duneSunset} alt="Sahara desert at sunset in Morocco" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative mx-auto grid w-full max-w-[90rem] gap-10 px-5 pt-28 pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
          <div>
            <Reveal><span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold backdrop-blur"><Star className="h-3.5 w-3.5 fill-current" strokeWidth={0} /> 4.9/5 · 1,200+ Reviews</span></Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.02] text-white text-balance sm:text-6xl md:text-7xl">
                Morocco, <span className="text-gold">reimagined</span> in pure luxury
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-lg text-white/85 md:text-xl">
                Bespoke private tours across the Sahara, imperial cities and Atlas Mountains — crafted by local experts, delivered with five-star care.
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-8 flex flex-wrap gap-3">
              <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-xl transition hover:bg-primary/90 active:scale-[0.98]">
                <MessageCircle className="h-5 w-5" /> Book on WhatsApp
              </a>
              <Link to="/tours" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/15">
                Explore Tours <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <Reveal delay={320} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
              {['Fully private tours', 'No-obligation quote', 'Free cancellation options'].map((t) => (
                <span key={t} className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> {t}</span>
              ))}
            </Reveal>
          </div>
          <Reveal delay={200} className="hidden lg:block">
            <LeadForm compact title="Free Trip Quote" subtitle="Personalised itinerary in 24 hours." />
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

      {/* BENEFITS */}
      <section className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 80} className="rounded-2xl border border-border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><b.icon className="h-6 w-6" /></div>
              <h3 className="mt-4 font-display text-xl font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* POPULAR TOURS */}
      <section className="bg-zellige py-20">
        <div className="mx-auto max-w-[90rem] px-5 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Reveal><Eyebrow>Most Loved Journeys</Eyebrow></Reveal>
              <Reveal delay={60}><h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Popular Morocco tours</h2></Reveal>
            </div>
            <Link to="/tours" className="inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all">View all tours <ArrowRight className="h-4 w-4" /></Link>
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
            <img src={IMG.luxCamp} alt="Luxury desert camp in Morocco" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="px-6 py-16 lg:px-14 lg:py-24">
            <Reveal><Eyebrow>The Luxury Difference</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Sleep under a Saharan sky, wrapped in five-star comfort</h2></Reveal>
            <Reveal delay={120}><p className="mt-5 text-white/70">From private butler-served desert camps to hand-selected riads with rooftop dining, every stay is chosen for atmosphere, authenticity and impeccable service.</p></Reveal>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {['Private luxury desert camps', 'Five-star riads & kasbahs', 'Personal driver-guide', 'Spa hammams & fine dining', 'Hot-air balloon add-ons', 'Dedicated trip designer'].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/85"><Check className="h-4 w-4 text-gold" /> {f}</li>
              ))}
            </ul>
            <Link to="/luxury-tours" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-semibold text-ink transition hover:brightness-105 active:scale-95">
              Discover Luxury Tours <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-[90rem] px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal><Eyebrow>Why Travellers Choose Us</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Local roots. World-class standards.</h2></Reveal>
            <Reveal delay={120}><p className="mt-4 text-muted-foreground">We are a family-run Moroccan company with over a decade of experience turning first-time visitors into lifelong friends and repeat travellers.</p></Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {WHY.map((w, i) => (
                <Reveal key={w[0]} delay={i * 70} className="flex gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div><h3 className="font-semibold">{w[0]}</h3><p className="mt-1 text-sm text-muted-foreground">{w[1]}</p></div>
                </Reveal>
              ))}
            </div>
            <div className="mt-8 flex gap-6">
              {[['13+', 'Years experience'], ['12k+', 'Happy travellers'], ['4.9', 'Average rating']].map(([n, l]) => (
                <div key={l}><div className="font-display text-4xl font-semibold text-primary">{n}</div><div className="text-xs uppercase tracking-wider text-muted-foreground">{l}</div></div>
              ))}
            </div>
          </div>
          <Reveal delay={100} className="relative">
            <img src={IMG.guide} alt="Local Moroccan tour guide" className="rounded-3xl shadow-2xl" />
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-card p-5 shadow-xl ring-1 ring-border sm:block">
              <Stars />
              <p className="mt-2 max-w-[14rem] text-sm font-medium">“Felt like family by day two.”</p>
              <p className="text-xs text-muted-foreground">— Sarah, United States</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-[90rem] px-5 lg:px-8">
          <div className="text-center">
            <Reveal><Eyebrow>Real Traveller Stories</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Loved by travellers worldwide</h2></Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {REVIEWS.slice(0, 6).map((r, i) => (
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

      {/* GOOGLE REVIEWS + TRUST BADGES */}
      <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
        <div className="grid items-center gap-8 rounded-3xl bg-card p-8 shadow-sm ring-1 ring-border md:grid-cols-[auto_1fr] md:p-12">
          <div className="text-center md:border-r md:border-border md:pr-12">
            <div className="font-display text-6xl font-semibold text-primary">4.9</div>
            <Stars className="mt-1 justify-center" />
            <p className="mt-2 text-sm text-muted-foreground">Google & TripAdvisor<br />1,200+ verified reviews</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AWARDS.map((a) => (
              <div key={a} className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                <Award className="h-8 w-8 shrink-0 text-gold" />
                <span className="text-sm font-medium">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING PROCESS */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-[90rem] px-5 lg:px-8">
          <div className="text-center">
            <Reveal><Eyebrow>How It Works</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Booking made effortless</h2></Reveal>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {STEPS.map((s, i) => (
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
            <iframe title="Morocco map" className="h-full min-h-[320px] w-full" loading="lazy"
              src="https://www.google.com/maps?q=Marrakech,Morocco&output=embed" />
          </Reveal>
          <Reveal delay={80} className="flex flex-col justify-center rounded-3xl bg-[#128C7E] p-10 text-white">
            <MessageCircle className="h-12 w-12" />
            <h3 className="mt-4 font-display text-3xl font-semibold">Talk to a real Morocco expert now</h3>
            <p className="mt-3 text-white/85">Have a question or want to lock in your dates? Message us on WhatsApp — we usually reply within the hour, seven days a week.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-[#128C7E]"><MessageCircle className="h-5 w-5" /> Chat on WhatsApp</a>
              <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3.5 font-semibold text-white"><Phone className="h-5 w-5" /> {CONTACT.phone}</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LEAD CAPTURE */}
      <section className="relative overflow-hidden py-20">
        <img src={IMG.riad} alt="Luxury riad courtyard" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="relative mx-auto grid max-w-[90rem] items-center gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <div className="text-white">
            <Eyebrow>Start Planning</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Your bespoke Morocco journey begins here</h2>
            <p className="mt-4 max-w-lg text-white/80">Tell us a little about your dream trip and our local designers will craft a personalised, no-obligation itinerary — completely free.</p>
            <ul className="mt-6 space-y-2">
              {['Response within 24 hours', 'Transparent, all-in pricing', 'Flexible dates & full support'].map((t) => (
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
          <Eyebrow>Good To Know</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Frequently asked questions</h2>
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
          <Link to="/faq" className="inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all">See all FAQs <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </Layout>
  );
}

export function TourCard({ tour, delay = 0 }) {
  return (
    <Reveal delay={delay} className="group overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/tour/${tour.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={tour.image} alt={tour.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{tour.category}</span>
          <span className="absolute bottom-3 right-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">from €{tour.price.toLocaleString()}</span>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {tour.duration}</span>
            <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {tour.group}</span>
          </div>
          <h3 className="mt-2 font-display text-xl font-semibold leading-snug transition group-hover:text-primary">{tour.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{tour.tagline}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">View details <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
        </div>
      </Link>
    </Reveal>
  );
}
