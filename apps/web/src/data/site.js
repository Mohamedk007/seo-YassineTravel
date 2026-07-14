import { CONTACT } from './contact';

export { CONTACT } from './contact';
export { REVIEWS, FAQS, AWARDS } from './content';
export { IMG } from './images';
export { NAV } from './navigation';
export { TOURS, INCLUDED, EXCLUDED } from './tours';

export const waLink = (msg = "Hello! I'd like to plan a Morocco trip.") =>
	`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
