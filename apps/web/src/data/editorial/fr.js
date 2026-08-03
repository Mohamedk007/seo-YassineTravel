import { IMG } from '../images';

export const ABOUT_PAGE = {
	title: 'Une famille de conteurs marocains',
	subtitle: 'Des experts locaux qui conçoivent des voyages extraordinaires depuis 2008.',
	image: IMG.guide,
	crumb: 'À propos',
	paragraphs: [
		"Morocco Trip Holidays a été fondée par une famille de Marocains nés et élevés au pays, avec une conviction simple : la meilleure façon de découvrir notre pays, c'est en privé, en toute authenticité et dans un confort total.",
		"Depuis plus de 18 ans, nous accueillons des voyageurs venus des États-Unis, du Royaume-Uni, du Canada, d'Australie et de toute l'Europe — en concevant des voyages sur mesure qui allient le luxe cinq étoiles à la chaleur authentique de l'hospitalité marocaine. Nos guides ne sont pas de simples chauffeurs ; ce sont des historiens, des traducteurs et des amis qui ouvrent des portes que les touristes ordinaires ne voient jamais.",
		"Des dunes dorées du Sahara aux médinas labyrinthiques de Fès et Marrakech, chaque itinéraire est conçu sur mesure rien que pour vous. Nous nous occupons de chaque détail — riads de luxe, transferts privés, guides experts et conciergerie 24/7 — pour que vous n'ayez plus qu'à tomber amoureux du Maroc.",
	],
	highlights: [
		{ image: IMG.riad, caption: 'Hébergements triés sur le volet' },
		{ image: IMG.camel, caption: 'Expériences authentiques' },
		{ image: IMG.tagine, caption: 'Cuisine locale' },
	],
};

export const DESTINATIONS_PAGE = {
	title: 'Là où le Maroc vous emmènera',
	subtitle: 'Villes emblématiques, déserts à perte de vue et retraites en montagne.',
	image: IMG.chefchaouen,
	crumb: 'Destinations',
};

export const GALLERY_PAGE = {
	title: 'Instants du Maroc',
	subtitle: 'Un aperçu des voyages qui vous attendent.',
	image: IMG.couple,
	crumb: 'Galerie',
	images: [IMG.duneSunset, IMG.luxCamp, IMG.fesDoor, IMG.camel, IMG.riad, IMG.tagine, IMG.chefchaouen, IMG.marrakech, IMG.couple, IMG.kasbah, IMG.atlas, IMG.guide],
};

export const REVIEWS_PAGE = {
	title: 'La confiance des voyageurs du monde entier',
	subtitle: '5,0/5 sur 43 avis vérifiés sur TripAdvisor.',
	image: IMG.couple,
	crumb: 'Avis',
};

export const FAQ_PAGE = {
	title: 'Questions fréquentes',
	subtitle: 'Tout ce qu\'il faut savoir avant de voyager.',
	image: IMG.fesDoor,
	crumb: 'FAQ',
};

export const BLOG_PAGE = {
	title: 'Le journal du Maroc',
	subtitle: 'Guides d\'initiés, conseils de voyage et récits de la route.',
	image: IMG.marrakech,
	crumb: 'Blog',
};

export const TRAVEL_GUIDE_PAGE = {
	title: 'Votre guide de voyage essentiel au Maroc',
	subtitle: 'Des conseils pratiques d\'initiés pour un voyage sans faux pas.',
	image: IMG.atlas,
	crumb: 'Guide de voyage',
	tips: [
		{ title: 'Meilleure période pour visiter', description: 'Le printemps (mars-mai) et l\'automne (sept-nov) offrent une météo idéale dans tout le pays.' },
		{ title: 'Se déplacer', description: 'Nous fournissons des véhicules privés climatisés avec chauffeurs-guides professionnels — zéro stress, zéro logistique.' },
		{ title: 'Que mettre dans sa valise', description: 'Des couches légères, des chaussures confortables, une protection solaire et une couche chaude pour les nuits fraîches du désert.' },
		{ title: 'Argent et pourboires', description: 'Le dirham (MAD) est la monnaie locale. Le pourboire est apprécié mais jamais obligatoire.' },
		{ title: 'Culture et savoir-vivre', description: 'Habillez-vous modestement dans les lieux religieux, saluez avec le sourire, et acceptez toujours le thé à la menthe.' },
		{ title: 'Santé et sécurité', description: 'Le Maroc est très sûr pour les touristes. Buvez de l\'eau en bouteille et voyagez avec des remèdes de base contre le soleil et les maux d\'estomac.' },
	],
};

export const CONTACT_PAGE = {
	title: 'Planifions votre aventure marocaine',
	subtitle: 'Contactez-nous à tout moment — nous répondons sous 24 heures, souvent bien plus vite.',
	image: IMG.riad,
	crumb: 'Contact',
	heading: 'Entrer en contact',
	description: 'Que vous ayez une simple question ou souhaitiez un itinéraire entièrement personnalisé, notre équipe locale est là pour vous aider.',
	whatsAppLabel: 'Discuter avec un expert local maintenant',
	formTitle: 'Envoyez-nous un message',
	formSubtitle: 'Nous concevrons votre itinéraire gratuit sous 24 heures.',
};
