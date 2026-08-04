import { IMG } from '../images';

export const AIRPORT_TRANSFER_FEATURES = [
	"Accueil personnalisé à l'arrivée",
	'Tarifs fixes et transparents',
	'Tous les aéroports marocains couverts',
	'Sièges enfant sur demande',
	'Suivi de vol inclus',
	'Disponible 24/7',
];

export const PRIVATE_DRIVER_FEATURES = [
	'Guides parlant couramment anglais',
	'Véhicules modernes et confortables',
	'Itinéraires quotidiens flexibles',
	'Conseils et recommandations locales',
	'Disponibilité sur plusieurs jours',
	'Entièrement agréé et assuré',
];

export const CUSTOM_TOUR_STEPS = [
	['Partagez votre vision', 'Dates, centres d\'intérêt, style de voyage et budget.'],
	['Recevez votre plan personnalisé', 'Un itinéraire détaillé et un devis transparent sous 24 heures.'],
	['Affinez et confirmez', 'Nous ajustons jusqu\'à la perfection, puis bloquons vos dates.'],
	['Voyagez l\'esprit tranquille', 'Assistance conciergerie complète avant et pendant votre voyage.'],
];

export const AIRPORT_TRANSFER_PAGE = {
	title: 'Transferts aéroport privés dans tout le Maroc',
	subtitle: 'Transferts à prix fixe avec accueil personnalisé, en tout confort et sécurité.',
	image: IMG.RBT_SLE,
	crumb: 'Services',
	heading: 'Arrivez détendu, pas stressé',
	description: "Oubliez les files de taxis et le marchandage. Votre chauffeur professionnel vous attendra à l'arrivée avec un panneau à votre nom, prêt à vous conduire à votre riad ou hôtel dans un véhicule climatisé impeccable.",
	imageSecondary: IMG.Driver,
	imageAlt: 'Chauffeur privé au Maroc',
	ctaLabel: 'Réserver un transfert',
	ctaMessage: "Bonjour ! J'ai besoin d'un transfert aéroport au Maroc.",
};

export const PRIVATE_DRIVER_PAGE = {
	title: 'Chauffeur Privé au Maroc',
	subtitle:
		'Engagez un chauffeur privé au Maroc avec un guide anglophone. Location flexible à la journée, véhicules climatisés modernes, tarifs fixes. Devis gratuit sous 24h.',
	image: IMG.guide,
	crumb: 'Services',
	heading: "Pourquoi engager un chauffeur privé au Maroc plutôt qu'un taxi ou un bus",
	description:
		"Un chauffeur privé au Maroc n'est pas qu'un simple transport — c'est un expert local qui gère la navigation, la langue, la négociation et la logistique à votre place. Contrairement à un taxi, votre chauffeur est réservé pour la journée entière (ou tout votre séjour) à un tarif fixe convenu à l'avance, sans compteur ni détour surprise. Contrairement à un circuit de groupe en bus, il n'y a pas d'horaire de départ fixe, pas d'attente pour les autres passagers, et pas de script générique — les arrêts sont choisis selon votre rythme et vos centres d'intérêt. Tous nos chauffeurs privés au Maroc sont entièrement agréés, assurés et parlent couramment anglais, avec une connaissance approfondie des routes entre Marrakech, l'Atlas, le Sahara et les villes impériales.",
	imageSecondary: IMG.kasbah,
	imageAlt: 'Circuit avec chauffeur privé au Maroc',
	ctaLabel: 'Engager un chauffeur',
	ctaMessage: "Bonjour ! Je souhaiterais engager un chauffeur privé au Maroc.",
};

export const CUSTOM_TOURS_PAGE = {
	title: 'Votre Maroc, sur mesure',
	subtitle: 'Racontez-nous votre rêve, nous concevrons un itinéraire personnalisé autour de lui.',
	image: IMG.duneSunset,
	crumb: 'Circuits sur mesure',
	heading: 'Aucun voyageur ne se ressemble',
	description: "Qu'il s'agisse d'une lune de miel romantique, d'une aventure familiale multigénérationnelle ou d'une expédition photo, nos concepteurs de voyage créent chaque itinéraire à partir de zéro — adapté à vos centres d'intérêt, votre rythme et votre budget (de 600€ à 3 500€+).",
	formTitle: 'Concevoir mon voyage sur mesure',
	formSubtitle: 'Itinéraire gratuit et sans engagement sous 24 heures.',
};
