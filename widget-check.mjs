import { render, applyContentOverrides, getContentDefaults, validateContentOverride, getAllContentPaths } from './dist/ssr/entry-server.js';

const widgets = (tag) => [
	{ id: `rt-${tag}`, type: 'richText', hidden: false, background: 'light', eyebrow: '', title: `RT ${tag}`, paragraphs: ['Hello **bold** [link](/tours)'], image: '', imageAlt: '', imagePosition: 'right', ctaLabel: '', ctaLink: '' },
	{ id: `faq-${tag}`, type: 'faq', hidden: false, eyebrow: '', title: `FAQ ${tag}`, ctaLabel: '', questions: [{ question: `Q-${tag}?`, answer: 'A.' }] },
	{ id: `tc-${tag}`, type: 'tourCards', hidden: false, background: 'muted', eyebrow: '', title: `TC ${tag}`, description: '', tours: ['imperial-cities-sahara', 'nope'], ctaLabel: 'All', ctaLink: '/tours' },
	{ id: `hid-${tag}`, type: 'ctaBand', hidden: true, background: 'dark', title: `HIDDEN ${tag}`, description: '', ctaLabel: '', ctaLink: '', whatsAppLabel: '' },
];

const blog = getContentDefaults('blog.en');
blog[0].widgets = widgets('blog');
const tours = getContentDefaults('tours.en');
tours[0].widgets = widgets('tour');
const dest = getContentDefaults('destinations.en');
dest[0].widgets = widgets('dest');
const services = getContentDefaults('services.en');
services.PRIVATE_DRIVER_PAGE.widgets = widgets('svc');
const home = getContentDefaults('home.en');
home.push(widgets('home')[2]);

const overrides = { 'blog.en': blog, 'tours.en': tours, 'destinations.en': dest, 'services.en': services, 'home.en': home };
for (const [key, value] of Object.entries(overrides)) console.log('validate', key, JSON.stringify(validateContentOverride(key, value)));
applyContentOverrides(overrides);

const paths = getAllContentPaths('en').map((p) => (p.startsWith('/en') ? p : `/en${p}`));
const find = (part) => paths.find((p) => p.includes(part));
const targets = [
	['blog', find(`/${blog[0].slug}`)],
	['tour', find(`/${tours[0].slug}`)],
	['dest', find(`/${dest[0].slug}`)],
	['svc', '/en/private-drivers'],
	['home', '/en'],
];
for (const [tag, url] of targets) {
	const { html } = await render(url, 'en');
	const checks = {
		rt: html.includes(`RT ${tag}`),
		faq: html.includes(`Q-${tag}?`),
		tours: html.includes(`TC ${tag}`),
		hiddenSkipped: !html.includes(`HIDDEN ${tag}`),
		h1: (html.match(/<h1/g) || []).length,
	};
	console.log(tag, url, JSON.stringify(checks));
}
