import React from 'react';
import { useEffect, useRef, useState } from "react";
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  Check, X, Clock, Users, MapPin, ArrowRight, MessageCircle, Phone,
  Plane, Car, Compass, Star, Quote, Play, Calendar, ShieldCheck, Camera,
} from 'lucide-react';
import {
  Layout, Seo, Reveal, Eyebrow, Stars, LeadForm, PageHero,
} from '@/components/site';
import { TourCard } from './HomePage';
import {
  IMG, TOURS, REVIEWS, FAQS, INCLUDED, EXCLUDED, CONTACT, waLink,
} from '@/data/site';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';

const GALLERY = [IMG.duneSunset, IMG.luxCamp, IMG.fesDoor, IMG.camel, IMG.riad, IMG.tagine, IMG.chefchaouen, IMG.marrakech, IMG.couple, IMG.kasbah, IMG.atlas, IMG.guide];

function CTA() {
  return (
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="mx-auto max-w-[72rem] px-5 text-center lg:px-8">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">Ready to experience Morocco in luxury?</h2>
        <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">Get a free, tailor-made itinerary within 24 hours — or chat with a local expert right now.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-primary"><MessageCircle className="h-5 w-5" /> WhatsApp Us</a>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/50 px-7 py-3.5 font-semibold text-white">Get a Free Quote <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}

function MiniReviews() {
  return (
    <section className="bg-secondary/60 py-16">
      <div className="mx-auto max-w-[90rem] px-5 lg:px-8">
        <h2 className="text-center font-display text-3xl font-semibold md:text-4xl">What our travellers say</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {REVIEWS.slice(0, 3).map((r) => (
            <div key={r.name} className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
              <Stars />
              <p className="mt-3 text-sm text-foreground/90">“{r.text}”</p>
              <p className="mt-4 text-sm font-semibold">{r.name} · <span className="font-normal text-muted-foreground">{r.country}</span></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TOUR DETAIL ---------------- */
export function TourDetail() {
  const [showGallery, setShowGallery] = useState(false);
  const galleryRef = useRef(null);
  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShowGallery(true);
        observer.disconnect(); // only trigger once
      }
    },
    {
      rootMargin: "200px", // start loading before it appears
    }
  );

  if (galleryRef.current) {
    observer.observe(galleryRef.current);
  }

  return () => observer.disconnect();
  }, []);

  const { slug } = useParams();
  const tour = TOURS.find((t) => t.slug === slug);
  if (!tour) return <Navigate to="/tours" replace />;
  const related = TOURS.filter((t) => t.slug !== slug).slice(0, 3);
  const priceRows = [
    ['2 travellers', `€${tour.price.toLocaleString()}`, 'per person'],
    ['3–4 travellers', `€${Math.round(tour.price * 0.85).toLocaleString()}`, 'per person'],
    ['5+ travellers', `€${Math.round(tour.price * 0.72).toLocaleString()}`, 'per person'],
  ];
  return (
    <Layout>
      <Seo title={tour.title} description={tour.tagline} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'TouristTrip', name: tour.title,
        description: tour.tagline, offers: { '@type': 'Offer', price: tour.price, priceCurrency: 'EUR' },
      }) }} />
      <PageHero title={tour.title} subtitle={tour.tagline} image={tour.image} crumb={tour.category} />

      <section className="mx-auto grid max-w-[90rem] gap-12 px-5 py-16 lg:grid-cols-[1.6fr_1fr] lg:px-8">
        <div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Badge icon={Clock}>{tour.duration}</Badge>
            <Badge icon={Users}>{tour.group}</Badge>
            <Badge icon={Star}>4.9 (verified)</Badge>
          </div>

          <h2 className="mt-8 font-display text-3xl font-semibold">Overview</h2>
          <p className="mt-3 text-muted-foreground">Discover the very best of Morocco on this {tour.duration.toLowerCase()} private journey. {tour.tagline} Travelling with your own driver-guide, you will move at your own pace, staying in handpicked luxury accommodation and enjoying privileged access to Morocco's most iconic sights and hidden gems.</p>

          <h2 className="mt-10 font-display text-3xl font-semibold">Highlights</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {tour.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-sm"><Star className="mt-0.5 h-4 w-4 shrink-0 fill-gold text-gold" strokeWidth={0} /> {h}</li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-3xl font-semibold">Detailed itinerary</h2>
          <div className="mt-5 space-y-4">
            {tour.itinerary.map(([d, t, desc]) => (
              <div key={d} className="flex gap-4">
                <div className="flex h-fit shrink-0 items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{d}</div>
                <div><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{desc}</p></div>
              </div>
            ))}
          </div>

          {/* PRICE TABLE */}
          <h2 className="mt-10 font-display text-3xl font-semibold">Pricing</h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left"><tr><th className="p-4 font-semibold">Group size</th><th className="p-4 font-semibold">Price</th><th className="p-4 font-semibold"></th></tr></thead>
              <tbody>
                {priceRows.map((r) => (
                  <tr key={r[0]} className="border-t border-border"><td className="p-4">{r[0]}</td><td className="p-4 font-semibold text-primary">{r[1]}</td><td className="p-4 text-muted-foreground">{r[2]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* INCLUDED / EXCLUDED */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display text-xl font-semibold text-primary">What's included</h3>
              <ul className="mt-4 space-y-2">{INCLUDED.map((i) => <li key={i} className="flex gap-2 text-sm"><Check className="h-4 w-4 shrink-0 text-primary" /> {i}</li>)}</ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display text-xl font-semibold text-muted-foreground">Not included</h3>
              <ul className="mt-4 space-y-2">{EXCLUDED.map((i) => <li key={i} className="flex gap-2 text-sm text-muted-foreground"><X className="h-4 w-4 shrink-0" /> {i}</li>)}</ul>
            </div>
          </div>

          {/* GALLERY */}
          <section ref={galleryRef}>
            <h2>Gallery</h2>

            {showGallery ? (

              <div className="grid grid-cols-3 gap-3">
                {[tour.image, IMG.riad, IMG.tagine, IMG.camel, IMG.kasbah, IMG.chefchaouen].map((g, i) => (
                  <img
                    key={i}
                    src={g}
                    alt={`${tour.title} ${i + 1}`}
                    className="aspect-square w-full rounded-xl object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>

            ) : (

              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl bg-gray-200 animate-pulse"
                  />
                ))}
              </div>

            )}
          </section>

          {/* VIDEO */}
          <h2 className="mt-10 font-display text-3xl font-semibold">Video</h2>
          <div className="mt-4 relative flex aspect-video items-center justify-center overflow-hidden rounded-xl">
            <img src={IMG.duneSunset} alt="Tour video" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async"/>
            <div className="absolute inset-0 bg-ink/40" />
            <button className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-xl transition hover:scale-105"><Play className="h-7 w-7 fill-current" /></button>
          </div>

          {/* MAP */}
          <h2 className="mt-10 font-display text-3xl font-semibold">Where you'll travel</h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <iframe title="Tour map" className="h-72 w-full" loading="lazy" src="https://www.google.com/maps?q=Morocco&output=embed"  />
          </div>

          {/* FAQ */}
          <h2 className="mt-10 font-display text-3xl font-semibold">Tour FAQs</h2>
          <Accordion type="single" collapsible className="mt-4">
            {FAQS.slice(0, 4).map(([q, a], i) => (
              <AccordionItem key={i} value={`t${i}`} className="border-b border-border">
                <AccordionTrigger className="text-left font-medium">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* STICKY BOOKING */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-card p-6 shadow-lg ring-1 ring-border">
            <div className="flex items-baseline gap-2"><span className="text-sm text-muted-foreground">from</span><span className="font-display text-4xl font-semibold text-primary">€{tour.price.toLocaleString()}</span></div>
            <p className="text-sm text-muted-foreground">per person · {tour.duration}</p>
            <a href={waLink(`Hi! I'm interested in the "${tour.title}" tour.`)} target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 font-semibold text-white"><MessageCircle className="h-5 w-5" /> Book on WhatsApp</a>
            <a href={CONTACT.phoneHref} className="mt-3 flex items-center justify-center gap-2 rounded-full border border-border py-3.5 font-semibold"><Phone className="h-5 w-5" /> Call to book</a>
          </div>
          <div className="mt-6"><LeadForm compact title="Enquire about this tour" subtitle="Free quote within 24 hours." /></div>
        </aside>
      </section>

      <MiniReviews />

      <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">Related tours</h2>
        <div className="mt-8 grid gap-7 md:grid-cols-3">{related.map((t, i) => <TourCard key={t.slug} tour={t} delay={i * 80} />)}</div>
      </section>
      <CTA />
    </Layout>
  );
}

function Badge({ icon: Icon, children }) {
  return <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 font-medium"><Icon className="h-4 w-4 text-primary" /> {children}</span>;
}

/* ---------------- TOUR LISTING (category pages) ---------------- */
export function ToursListing({ category, title, subtitle, image, intro }) {
  const list = category ? TOURS.filter((t) => t.category === category) : TOURS;
  const shown = list.length ? list : TOURS;
  return (
    <Layout>
      <Seo title={title} description={subtitle} />
      <PageHero title={title} subtitle={subtitle} image={image} crumb="Morocco Tours" />
      <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
        {intro && <p className="mx-auto mb-10 max-w-3xl text-center text-lg text-muted-foreground">{intro}</p>}
        <div className="grid gap-7 md:grid-cols-3">{shown.map((t, i) => <TourCard key={t.slug} tour={t} delay={(i % 3) * 80} />)}</div>
      </section>
      <MiniReviews />
      <CTA />
    </Layout>
  );
}

/* ---------------- SIMPLE CONTENT PAGE SHELL ---------------- */
function Page({ title, subtitle, image, crumb, children }) {
  return (
    <Layout>
      <Seo title={title} description={subtitle} />
      <PageHero title={title} subtitle={subtitle} image={image} crumb={crumb} />
      {children}
      <CTA />
    </Layout>
  );
}

const Prose = ({ children }) => <div className="mx-auto max-w-[56rem] px-5 py-16 lg:px-8 space-y-5 text-muted-foreground leading-relaxed">{children}</div>;

/* ---------------- ABOUT ---------------- */
export function About() {
  return (
    <Page title="A family of Moroccan storytellers" subtitle="Local experts crafting extraordinary journeys since 2011." image={IMG.guide} crumb="About Us">
      <Prose>
        <p className="text-lg text-foreground">Morocco Trip Holidays was founded by a family of born-and-raised Moroccans with a simple belief: that the finest way to experience our country is privately, authentically, and in complete comfort.</p>
        <p>For over thirteen years we have welcomed travellers from the United States, United Kingdom, Canada, Australia and across Europe — designing bespoke journeys that blend five-star luxury with the genuine warmth of Moroccan hospitality. Our guides are not just drivers; they are historians, translators and friends who open doors ordinary tourists never see.</p>
        <p>From the golden dunes of the Sahara to the labyrinthine medinas of Fes and Marrakech, every itinerary is handcrafted around you. We handle every detail — luxury riads, private transfers, expert guides and 24/7 concierge support — so all you have to do is fall in love with Morocco.</p>
      </Prose>
      <section className="mx-auto max-w-[90rem] px-5 pb-16 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[[IMG.riad, 'Handpicked stays'], [IMG.camel, 'Authentic experiences'], [IMG.tagine, 'Local cuisine']].map(([src, cap]) => (
            <div key={cap} className="overflow-hidden rounded-2xl"><img src={src} alt={cap} className="aspect-[4/3] w-full object-cover" /></div>
          ))}
        </div>
      </section>
      <MiniReviews />
    </Page>
  );
}

/* ---------------- DESTINATIONS ---------------- */
export function Destinations() {
  const dest = [
    [IMG.marrakech, 'Marrakech', 'The Red City — palaces, souks and the electric Jemaa el-Fnaa.'],
    [IMG.fesDoor, 'Fes', 'The spiritual heart, home to the world\'s largest living medieval medina.'],
    [IMG.duneSunset, 'Merzouga Sahara', 'Towering Erg Chebbi dunes and unforgettable luxury desert camps.'],
    [IMG.chefchaouen, 'Chefchaouen', 'The dreamy blue-washed mountain town of the Rif.'],
    [IMG.kasbah, 'Ait Benhaddou', 'The iconic UNESCO kasbah and gateway to the desert.'],
    [IMG.atlas, 'Atlas Mountains', 'Berber villages, dramatic passes and snow-capped peaks.'],
  ];
  return (
    <Page title="Where Morocco will take you" subtitle="Iconic cities, sweeping deserts and mountain hideaways." image={IMG.chefchaouen} crumb="Destinations">
      <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {dest.map(([src, name, text], i) => (
            <Reveal key={name} delay={(i % 3) * 80} className="group relative overflow-hidden rounded-2xl">
              <img src={src} alt={name} className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 hero-gradient" />
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="font-display text-2xl font-semibold">{name}</h3>
                <p className="mt-1 text-sm text-white/80">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Page>
  );
}

/* ---------------- GALLERY ---------------- */
export function Gallery() {
  return (
    <Page title="Moments from Morocco" subtitle="A glimpse of the journeys that await you." image={IMG.couple} crumb="Gallery">
      <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {GALLERY.map((src, i) => (
            <img key={i} src={src} alt="Morocco gallery" className="w-full break-inside-avoid rounded-xl object-cover" loading={i === 0 ? "eager" : "lazy"}
  fetchPriority={i === 0 ? "high" : "auto"}
  decoding="async" />
          ))}
        </div>
      </section>
    </Page>
  );
}

/* ---------------- REVIEWS ---------------- */
export function Reviews() {
  return (
    <Page title="Trusted by travellers worldwide" subtitle="4.9/5 from 1,200+ verified reviews across Google & TripAdvisor." image={IMG.couple} crumb="Reviews">
      <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <Reveal key={i} delay={(i % 3) * 70} className="rounded-2xl bg-card p-7 shadow-sm ring-1 ring-border">
              <Quote className="h-8 w-8 text-primary/20" />
              <Stars className="mt-2" />
              <p className="mt-3 text-sm text-foreground/90">“{r.text}”</p>
              <p className="mt-4 text-sm font-semibold">{r.name} · <span className="font-normal text-muted-foreground">{r.country}</span></p>
              <p className="text-xs text-muted-foreground">{r.tour}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </Page>
  );
}

/* ---------------- FAQ ---------------- */
export function Faq() {
  return (
    <Page title="Frequently asked questions" subtitle="Everything you need to know before you travel." image={IMG.fesDoor} crumb="FAQ">
      <section className="mx-auto max-w-[56rem] px-5 py-16 lg:px-8">
        <Accordion type="single" collapsible>
          {FAQS.map(([q, a], i) => (
            <AccordionItem key={i} value={`q${i}`} className="border-b border-border">
              <AccordionTrigger className="text-left font-display text-lg font-medium">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </Page>
  );
}

/* ---------------- BLOG ---------------- */
export function Blog() {
  const posts = [
    [IMG.duneSunset, 'The ultimate guide to a luxury Sahara desert night', 'Desert', 'Everything you need to know about staying in a five-star Moroccan desert camp.'],
    [IMG.marrakech, '3 perfect days in Marrakech', 'City Guide', 'How to experience the Red City like an insider, from souks to rooftop dining.'],
    [IMG.tagine, 'A food lover\'s journey through Morocco', 'Food', 'Tagines, pastilla and mint tea — the flavours that define Moroccan cuisine.'],
    [IMG.chefchaouen, 'Why Chefchaouen belongs on your itinerary', 'Destinations', 'The story behind Morocco\'s enchanting blue city.'],
    [IMG.atlas, 'Best time to visit Morocco', 'Planning', 'A month-by-month guide to weather, festivals and crowds.'],
    [IMG.riad, 'How to choose the perfect riad', 'Luxury', 'What sets a truly special Moroccan riad apart.'],
  ];
  return (
    <Page title="The Morocco journal" subtitle="Insider guides, travel tips and stories from the road." image={IMG.marrakech} crumb="Blog">
      <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
        <div className="grid gap-7 md:grid-cols-3">
          {posts.map(([src, title, cat, text], i) => (
            <Reveal key={title} delay={(i % 3) * 80} className="group overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-lg">
              <div className="aspect-[16/10] overflow-hidden"><img src={src} alt={title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">{cat}</span>
                <h3 className="mt-2 font-display text-xl font-semibold leading-snug">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Read more <ArrowRight className="h-4 w-4" /></span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Page>
  );
}

/* ---------------- TRAVEL GUIDE ---------------- */
export function TravelGuide() {
  const tips = [
    ['Best time to visit', 'Spring (Mar–May) and autumn (Sep–Nov) offer ideal weather across the country.'],
    ['Getting around', 'We provide private air-conditioned vehicles with professional driver-guides — no stress, no logistics.'],
    ['What to pack', 'Light layers, comfortable shoes, sun protection and a warm layer for chilly desert nights.'],
    ['Money & tipping', 'The dirham (MAD) is the local currency. Tipping is appreciated but never obligatory.'],
    ['Culture & etiquette', 'Dress modestly at religious sites, greet with a smile, and always accept the mint tea.'],
    ['Health & safety', 'Morocco is very safe for tourists. Drink bottled water and travel with basic sun and stomach remedies.'],
  ];
  return (
    <Page title="Your essential Morocco travel guide" subtitle="Practical, insider know-how for a flawless trip." image={IMG.atlas} crumb="Travel Guide">
      <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tips.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 70} className="rounded-2xl border border-border bg-card p-7">
              <Compass className="h-8 w-8 text-primary" />
              <h3 className="mt-3 font-display text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </Page>
  );
}

/* ---------------- CONTACT ---------------- */
export function Contact() {
  return (
    <Page title="Let's plan your Morocco adventure" subtitle="Reach out any time — we reply within 24 hours, usually much sooner." image={IMG.riad} crumb="Contact">
      <section className="mx-auto grid max-w-[90rem] gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-semibold">Get in touch</h2>
          <p className="mt-3 text-muted-foreground">Whether you have a quick question or want a full custom itinerary, our local team is here to help.</p>
          <div className="mt-8 space-y-4">
            <a href={CONTACT.phoneHref} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition hover:shadow-md"><Phone className="h-6 w-6 text-primary" /><div><div className="font-semibold">Call us</div><div className="text-sm text-muted-foreground">{CONTACT.phone}</div></div></a>
            <a href={waLink()} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition hover:shadow-md"><MessageCircle className="h-6 w-6 text-[#25D366]" /><div><div className="font-semibold">WhatsApp</div><div className="text-sm text-muted-foreground">Chat with a local expert now</div></div></a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition hover:shadow-md"><MapPin className="h-6 w-6 text-primary" /><div><div className="font-semibold">Visit / write</div><div className="text-sm text-muted-foreground">{CONTACT.address}</div></div></a>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border">
            <iframe title="Office map" className="h-64 w-full" loading="lazy" src="https://www.google.com/maps?q=Marrakech,Morocco&output=embed" />
          </div>
        </div>
        <LeadForm title="Send us a message" subtitle="We'll craft your free itinerary within 24 hours." />
      </section>
    </Page>
  );
}

/* ---------------- AIRPORT TRANSFERS ---------------- */
export function AirportTransfers() {
  return (
    <Page title="Private airport transfers across Morocco" subtitle="Fixed-price, meet-and-greet transfers in comfort and safety." image={IMG.atlas} crumb="Services">
      <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Plane className="h-10 w-10 text-primary" />
            <h2 className="mt-4 font-display text-3xl font-semibold">Arrive relaxed, not stressed</h2>
            <p className="mt-3 text-muted-foreground">Skip the taxi queues and haggling. Your professional driver will be waiting at arrivals with a name board, ready to whisk you to your riad or hotel in a spotless, air-conditioned vehicle.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {['Meet & greet at arrivals', 'Fixed, transparent pricing', 'All Moroccan airports covered', 'Child seats on request', 'Flight tracking included', '24/7 availability'].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" /> {f}</li>
              ))}
            </ul>
            <a href={waLink('Hi! I need an airport transfer in Morocco.')} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground"><MessageCircle className="h-5 w-5" /> Book a transfer</a>
          </div>
          <img src={IMG.guide} alt="Private driver in Morocco" className="rounded-3xl shadow-xl" />
        </div>
      </section>
    </Page>
  );
}

/* ---------------- PRIVATE DRIVERS ---------------- */
export function PrivateDrivers() {
  return (
    <Page title="Your personal driver-guide in Morocco" subtitle="Explore at your own pace with a trusted local at the wheel." image={IMG.guide} crumb="Services">
      <section className="mx-auto max-w-[90rem] px-5 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <img src={IMG.kasbah} alt="Private driver tour Morocco" className="order-2 rounded-3xl shadow-xl lg:order-1" />
          <div className="order-1 lg:order-2">
            <Car className="h-10 w-10 text-primary" />
            <h2 className="mt-4 font-display text-3xl font-semibold">More than a driver — a local friend</h2>
            <p className="mt-3 text-muted-foreground">Our English-speaking driver-guides know every road, every viewpoint and every hidden gem. Enjoy total flexibility: stop where you like, linger where you love, and travel with complete peace of mind.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {['Fluent English-speaking guides', 'Modern, comfortable vehicles', 'Flexible daily itineraries', 'Local insight & recommendations', 'Multi-day availability', 'Fully licensed & insured'].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" /> {f}</li>
              ))}
            </ul>
            <a href={waLink('Hi! I would like to hire a private driver in Morocco.')} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground"><MessageCircle className="h-5 w-5" /> Hire a driver</a>
          </div>
        </div>
      </section>
    </Page>
  );
}

/* ---------------- CUSTOM TOURS ---------------- */
export function CustomTours() {
  return (
    <Page title="Your Morocco, tailor-made" subtitle="Tell us your dream and we'll design a bespoke itinerary around it." image={IMG.duneSunset} crumb="Custom Tours">
      <section className="mx-auto grid max-w-[90rem] gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-semibold">No two travellers are the same</h2>
          <p className="mt-3 text-muted-foreground">Whether it's a romantic honeymoon, a multi-generational family adventure or a photography-focused expedition, our trip designers build every journey from scratch — matched to your interests, pace and budget (from €600 to €3,500+).</p>
          <div className="mt-8 space-y-4">
            {[['Share your vision', 'Dates, interests, travel style and budget.'], ['Receive your custom plan', 'A detailed itinerary and transparent quote within 24 hours.'], ['Refine & confirm', 'We adjust until it\'s perfect, then secure your dates.'], ['Travel worry-free', 'Full concierge support before and throughout your trip.']].map(([t, d], i) => (
              <div key={t} className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">{i + 1}</div>
                <div><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>
              </div>
            ))}
          </div>
        </div>
        <LeadForm title="Design my custom trip" subtitle="Free, no-obligation itinerary in 24 hours." />
      </section>
      <MiniReviews />
    </Page>
  );
}
