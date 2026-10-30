import React from 'react';
import { HOME_SECTION_COMPONENTS, getFaqItems, getSectionContext } from '@/components/home/HomeSections';
import { Layout } from '@/components/site/Layout';
import { Seo } from '@/components/site/Seo';
import { getHomeSections } from '@/data/home';
import { IMG } from '@/data/images';
import { getPath } from '@/data/route-config';
import { useLocale } from '@/i18n/LocaleContext';
import { buildFaqSchema, buildItemListSchema } from '@/seo/schemas';

// The page is the list of parts edited in /admin (data/home/{lang}.js), in order.
export default function HomePage() {
  const lang = useLocale();
  const sections = getHomeSections(lang).filter((section) => section && !section.hidden && HOME_SECTION_COMPONENTS[section.type]);
  const context = getSectionContext(lang);
  const mainHero = sections.find((section) => section.type === 'hero');
  const popular = sections.find((section) => section.type === 'popularTours');
  const faqPart = sections.find((section) => section.type === 'faq');
  const featured = popular ? context.tours.slice(0, Math.max(0, Number(popular.featuredCount) || 0)) : [];

  return (
    <Layout>
      <Seo
        image={mainHero?.image || IMG.duneSunset}
        preloadImage={Boolean(mainHero?.image)}
        breadcrumbItems={[{ routeKey: 'home' }]}
        structuredData={[
          faqPart ? buildFaqSchema(getFaqItems(faqPart, context.faqs)) : null,
          featured.length
            ? buildItemListSchema(
                featured.map((tour) => ({ name: tour.title, url: getPath('tourDetail', lang, { slug: tour.slug }) })),
                popular.title,
                lang
              )
            : null,
        ].filter(Boolean)}
      />
      {sections.map((section) => {
        const Section = HOME_SECTION_COMPONENTS[section.type];
        return <Section key={section.id} section={section} isMainHero={section === mainHero} {...context} />;
      })}
    </Layout>
  );
}

export { TourCard } from '../components/tours/TourCard';
