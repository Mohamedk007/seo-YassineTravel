export const CONTACT = {
	phone: '+212 645-945717',
	phoneHref: 'tel:+212645945717',
	whatsapp: '212645945717',
	email: 'contact@yassinetravel.com',
	address: '3 RES CHAMS AL MADINA IMM 7, Marrakech, Morocco',
	// Split out for structured data (schema.org PostalAddress expects
	// street/city as separate fields, not one crammed string).
	streetAddress: '3 RES CHAMS AL MADINA IMM 7',
	city: 'Marrakech',
	// From the verified Google Business Profile map pin embedded on the
	// Contact/Home pages (see GOOGLE_BUSINESS_MAP_EMBED_URL below) — not an
	// approximate city-centre lookup.
	geo: { latitude: 32.58048444451917, longitude: -9.093250888068443 },
};

export const waLink = (msg = "Hello! I'd like to plan a Morocco trip.") =>
	`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;

// The real Google Business Profile listing embed (from Maps' own "Share ->
// Embed a map" panel), not a generic place/query search — pins the exact
// verified business location rather than an arbitrary "Marrakech, Morocco"
// query. Reused on both the Contact and Home pages.
export const GOOGLE_BUSINESS_MAP_EMBED_URL =
	'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1338061.6281279377!2d-9.093250888068443!3d32.58048444451917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafed633b8695c5%3A0xd54179df4b5e5df0!2sMorocco%20Trip%20Holidays!5e1!3m2!1sfr!2sma!4v1785088749589!5m2!1sfr!2sma';