// Side-effect imports of every module that registers editable content, so the
// SSR bundle (and therefore the admin API) always knows every dataset even if
// no page happens to import one of them eagerly.
import '@/data/images';
import '@/data/site-config';
import '@/data/contact';
import '@/data/tripadvisor';
import '@/seo/seo.config';
import '@/i18n/config';
import '@/data/home';
import '@/data/footer';
import '@/data/tours/catalog';
import '@/data/tours/categories';
import '@/data/blog';
import '@/data/destinations';
import '@/data/airports';
import '@/data/airports/transferContent';
import '@/data/airports/transferPolicy';
import '@/data/services';
import '@/data/editorial';
import '@/data/content';
