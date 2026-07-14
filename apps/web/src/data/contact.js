export const CONTACT = {
	phone: '+212 645-945717',
	phoneHref: 'tel:+212645945717',
	whatsapp: '212645945717',
	email: 'contact-pro@moroccotripholidays.com',
	address: '3 RES CHAMS AL MADINA IMM 7, Marrakech, Morocco',
};

export const waLink = (msg = "Hello! I'd like to plan a Morocco trip.") =>
	`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;