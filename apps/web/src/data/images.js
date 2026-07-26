import { images } from '../../../../Imgs/images';
// Imported from @/seo/sitemap (not @/i18n/config) to keep this data module free
// of the i18next initialisation side effect.
import { DEFAULT_LANGUAGE } from '@/seo/sitemap';

export const IMG = {
	duneSunset: images.duneSunset,
	luxCamp: images.luxcamp,
	fesDoor: images.fesdoor,
	camel: images.camel,
	riad: images.riad,
	tagine: images.tagine,
	chefchaouen: images.chefchaouen,
	marrakech: images.marrakech,
	couple: images.couple,
	guide: images.guide,
	kasbah: images.kasbah,
	atlas: images.atlas,
	Essaouira1: images.Essaouira,
	rak: images.rak,
	TGN: images.TGN,
	AGA: images.AGA,
	CMN: images.CMN,
	FES_SAISS: images.FES_SAISS,
	RBT_SLE: images.RBT_SLE,
	Driver: images.Driver,
	tripaBadge2026: images.tripaBadge2026,
	Tripadvisor: images.Tripadvisor,
	aitBenhaddouVillage: images.aitBenhaddouVillage,
	agafayEvening: images.agafayEvening,
	ouzoud: images.ouzoud,
	ourika: images.ourika,
	imlil: images.imlil,
	casablancaDayTrip: images.casablancaDayTrip,
	agadir: images.agadir,
	ouirgane: images.ouirgane,
};

/**
 * Intrinsic dimensions and translated alt text for every bundled image.
 *
 * Dimensions are the real pixel sizes of the source files — rendering them as
 * width/height attributes reserves the right box and removes layout shift.
 * Alt text lives here (rather than at each call site) so the same photo is
 * described identically, and in the right language, everywhere it appears.
 */
export const IMG_META = {
	duneSunset: {
		width: 1344,
		height: 768,
		alt: {
			en: 'Sahara desert dunes at sunset on a private Morocco tour',
			fr: 'Dunes du Sahara au coucher du soleil lors d’un circuit privé au Maroc',
		},
	},
	luxCamp: {
		width: 1216,
		height: 896,
		alt: {
			en: 'Luxury desert camp under the stars in the Moroccan Sahara',
			fr: 'Campement de luxe sous les étoiles dans le Sahara marocain',
		},
	},
	fesDoor: {
		width: 896,
		height: 1216,
		alt: {
			en: 'Ornate carved door in the medina of Fes, Morocco',
			fr: 'Porte sculptée ornée dans la médina de Fès, au Maroc',
		},
	},
	camel: {
		width: 1216,
		height: 896,
		alt: {
			en: 'Camel caravan crossing the Erg Chebbi dunes in Morocco',
			fr: 'Caravane de dromadaires traversant les dunes de l’Erg Chebbi au Maroc',
		},
	},
	riad: {
		width: 1216,
		height: 896,
		alt: {
			en: 'Courtyard of a luxury riad in Marrakech',
			fr: 'Patio d’un riad de luxe à Marrakech',
		},
	},
	tagine: {
		width: 1216,
		height: 896,
		alt: {
			en: 'Traditional Moroccan tagine served on a local table',
			fr: 'Tajine marocain traditionnel servi sur une table locale',
		},
	},
	chefchaouen: {
		width: 896,
		height: 1216,
		alt: {
			en: 'Blue-washed streets of Chefchaouen in the Rif mountains',
			fr: 'Ruelles bleues de Chefchaouen dans les montagnes du Rif',
		},
	},
	marrakech: {
		width: 896,
		height: 1216,
		alt: {
			en: 'Rooftops and minaret of the Marrakech medina',
			fr: 'Toits et minaret de la médina de Marrakech',
		},
	},
	couple: {
		width: 1600,
		height: 1068,
		alt: {
			en: 'Couple travelling together on a private Morocco tour',
			fr: 'Couple en voyage lors d’un circuit privé au Maroc',
		},
	},
	guide: {
		width: 1024,
		height: 1024,
		alt: {
			en: 'Local Moroccan driver-guide welcoming travellers',
			fr: 'Chauffeur-guide marocain accueillant des voyageurs',
		},
	},
	kasbah: {
		width: 1344,
		height: 768,
		alt: {
			en: 'Ait Ben Haddou kasbah in southern Morocco',
			fr: 'Kasbah d’Aït Ben Haddou dans le sud du Maroc',
		},
	},
	atlas: {
		width: 1216,
		height: 896,
		alt: {
			en: 'Atlas Mountains landscape in Morocco',
			fr: 'Paysage des montagnes de l’Atlas au Maroc',
		},
	},
	Essaouira1: {
		width: 1920,
		height: 1280,
		alt: {
			en: 'Fishing harbour and ramparts of Essaouira',
			fr: 'Port de pêche et remparts d’Essaouira',
		},
	},
	rak: {
		width: 700,
		height: 500,
		alt: {
			en: 'Marrakech Menara Airport terminal',
			fr: 'Terminal de l’aéroport Marrakech-Ménara',
		},
	},
	TGN: {
		width: 960,
		height: 720,
		alt: {
			en: 'Tangier Ibn Battouta Airport terminal',
			fr: 'Terminal de l’aéroport Tanger Ibn Battouta',
		},
	},
	AGA: {
		width: 2178,
		height: 1605,
		alt: {
			en: 'Agadir Al Massira Airport terminal',
			fr: 'Terminal de l’aéroport Agadir Al Massira',
		},
	},
	CMN: {
		width: 860,
		height: 573,
		alt: {
			en: 'Casablanca Mohammed V Airport terminal',
			fr: 'Terminal de l’aéroport Mohammed V de Casablanca',
		},
	},
	FES_SAISS: {
		width: 1280,
		height: 960,
		alt: {
			en: 'Fes-Saiss Airport terminal',
			fr: 'Terminal de l’aéroport de Fès-Saïss',
		},
	},
	RBT_SLE: {
		width: 500,
		height: 333,
		alt: {
			en: 'Rabat-Sale Airport terminal',
			fr: 'Terminal de l’aéroport de Rabat-Salé',
		},
	},
	Driver: {
		width: 740,
		height: 494,
		alt: {
			en: 'Private driver helping travellers with their luggage in Morocco',
			fr: 'Chauffeur privé aidant des voyageurs avec leurs bagages au Maroc',
		},
	},
	tripaBadge2026: {
		width: 395,
		height: 500,
		alt: {
			en: 'TripAdvisor Travellers’ Choice 2026 award badge',
			fr: 'Badge TripAdvisor Travellers’ Choice 2026',
		},
	},
	Tripadvisor: {
		width: 120,
		height: 120,
		alt: {
			en: 'Morocco Trip Holidays reviews on TripAdvisor',
			fr: 'Avis sur Morocco Trip Holidays sur TripAdvisor',
		},
	},
	aitBenhaddouVillage: {
		width: 900,
		height: 600,
		alt: {
			en: 'Ait Ben Haddou kasbah village on a Marrakech day trip',
			fr: 'Village-kasbah d’Aït Ben Haddou lors d’une excursion depuis Marrakech',
		},
	},
	agafayEvening: {
		width: 1280,
		height: 703,
		alt: {
			en: 'Sunset camel ride and desert camp in the Agafay Desert',
			fr: 'Balade à dos de dromadaire au coucher du soleil dans le désert d’Agafay',
		},
	},
	ouzoud: {
		width: 960,
		height: 640,
		alt: {
			en: 'Ouzoud Waterfalls cascading through the Moroccan countryside',
			fr: 'Cascades d’Ouzoud dans la campagne marocaine',
		},
	},
	ourika: {
		width: 1600,
		height: 1068,
		alt: {
			en: 'Ourika Valley in the High Atlas Mountains',
			fr: 'Vallée de l’Ourika dans le Haut Atlas',
		},
	},
	imlil: {
		width: 870,
		height: 555,
		alt: {
			en: 'Imlil village in the High Atlas Mountains',
			fr: 'Village d’Imlil dans le Haut Atlas',
		},
	},
	casablancaDayTrip: {
		width: 910,
		height: 607,
		alt: {
			en: 'Hassan II Mosque on the Casablanca coastline',
			fr: 'Mosquée Hassan II sur le littoral de Casablanca',
		},
	},
	agadir: {
		width: 1280,
		height: 677,
		alt: {
			en: 'Agadir beach and coastline in southern Morocco',
			fr: 'Plage et littoral d’Agadir dans le sud du Maroc',
		},
	},
	ouirgane: {
		width: 1043,
		height: 756,
		alt: {
			en: 'Ouirgane Valley in the foothills of the Atlas Mountains',
			fr: 'Vallée d’Ouirgane au pied des montagnes de l’Atlas',
		},
	},
};

// Vite resolves each IMG value to a hashed asset URL at build time, so the
// reverse map is built from the resolved URLs rather than from filenames.
const META_BY_SRC = new Map(
	Object.entries(IMG)
		.map(([key, src]) => [src, IMG_META[key]])
		.filter(([, meta]) => Boolean(meta))
);

/**
 * Renderable `<img>` attributes for a bundled image: translated alt plus real
 * intrinsic dimensions. `fallbackAlt` covers content images (tour photos,
 * destination galleries) that aren't part of the shared IMG set.
 */
export function getImageAttrs(src, lang = DEFAULT_LANGUAGE, fallbackAlt = '') {
	const meta = META_BY_SRC.get(src);
	if (!meta) return { alt: fallbackAlt };

	return {
		alt: meta.alt[lang] || meta.alt[DEFAULT_LANGUAGE] || fallbackAlt,
		width: meta.width,
		height: meta.height,
	};
}

export function getImageAlt(src, lang = DEFAULT_LANGUAGE, fallbackAlt = '') {
	return getImageAttrs(src, lang, fallbackAlt).alt;
}
