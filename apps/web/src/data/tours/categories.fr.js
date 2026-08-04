import { IMG } from '../images';

export const TOUR_COLLECTIONS = [
	{
		routeKey: 'tours',
		title: 'Circuits Maroc & Circuits Marrakech',
		subtitle:
			'Circuits privés au Maroc, de Marrakech au désert du Sahara. Sur mesure, guides locaux experts, devis gratuit sous 24h.',
		image: IMG.kasbah,
		intro:
			'Nos circuits au Maroc sont 100% privés et sur mesure — pas de bus partagé avec des inconnus. Que vous prépariez un court circuit Marrakech ou un circuit désert de plusieurs jours vers le Sahara, chaque itinéraire ci-dessous est construit autour de vos dates, votre rythme et vos centres d\'intérêt, avec véhicule privé, chauffeur-guide anglophone et assistance 24/7. Noté 5,0 sur TripAdvisor par des voyageurs venus des États-Unis, du Royaume-Uni, du Canada et d\'Australie.',
		showTripAdvisorBadge: true,
	},
	{
		routeKey: 'luxuryTours',
		categoryKey: 'luxury-tours',
		title: 'Circuits de Luxe au Maroc',
		subtitle:
			'Voyage Maroc luxe avec riads cinq étoiles, camps de désert privés et chauffeur-guide dédié. Noté 5,0 sur TripAdvisor. Devis gratuit sous 24h.',
		image: IMG.luxCamp,
		intro:
			'Nos voyages les plus raffinés, conçus pour les voyageurs qui attendent le meilleur. Noté 5,0/5 sur 43 avis vérifiés TripAdvisor — une reconnaissance gagnée précisément pour le niveau de nos circuits de luxe : riads cinq étoiles soigneusement sélectionnés à Marrakech et Fès, camps de désert privés avec service de majordome à Erg Chebbi, et chauffeur-guide dédié tout au long du voyage.',
	},
	{
		routeKey: 'privateTours',
		categoryKey: 'private-tours',
		title: 'Circuits Privés au Maroc',
		subtitle:
			'Circuit privé Maroc et chauffeur privé Marrakech avec votre propre véhicule, guide et itinéraire. Pas d\'inconnus, pas d\'horaire fixe. Devis gratuit sous 24h.',
		image: IMG.fesDoor,
		intro:
			'Chaque circuit sur ce site est privé par défaut : votre propre véhicule, votre propre chauffeur-guide, et un itinéraire construit autour de vos dates et centres d\'intérêt — pas un bus partagé avec vingt inconnus. Que vous prépariez un circuit privé de quelques jours à Marrakech ou un circuit privé Maroc plus long à travers le Sahara et les villes impériales, le format reste le même : flexibilité totale, aucun horaire de départ fixe, et un rythme entièrement à vous.',
	},
	{
		routeKey: 'desertTours',
		categoryKey: 'desert-tours',
		title: 'Circuit Maroc Désert du Sahara',
		subtitle:
			'Circuits désert du Sahara privés depuis Marrakech : balades à dos de chameau, camps de désert de luxe et dunes de l\'Erg Chebbi à Merzouga. Devis gratuit.',
		image: IMG.duneSunset,
		intro:
			'Un circuit désert du Sahara depuis Marrakech vous emmène à travers le Haut Atlas jusqu\'aux dunes de l\'Erg Chebbi près de Merzouga, avec une nuit dans un camp de désert privé, des balades à dos de chameau au coucher et au lever du soleil, et des arrêts au ksar d\'Aït Benhaddou et dans les gorges du Dadès en chemin. Nos circuits désert Maroc vont d\'une version express de 3 jours au circuit classique de 4 jours avec deux journées complètes aux dunes — chacun entièrement privé, avec votre propre véhicule et chauffeur-guide.',
	},
	{
		routeKey: 'dayTrips',
		categoryKey: 'day-trips',
		title: 'Excursions à la Journée depuis Marrakech',
		subtitle:
			'Les meilleures excursions à la journée depuis Marrakech : Aït Ben Haddou, cascades d\'Ouzoud, Essaouira, montagnes de l\'Atlas et plus. Transport privé, guides experts.',
		image: IMG.atlas,
		intro:
			'À la recherche des meilleures excursions à la journée depuis Marrakech ? Chaque excursion ci-dessous part et revient le jour même, avec transport privé climatisé, prise en charge à l\'hôtel et un guide local expert — pas besoin de faire vos valises. Du ksar doré d\'Aït Ben Haddou aux cascades d\'Ouzoud et au port atlantique d\'Essaouira, voici un guide rapide pour choisir la bonne excursion pour votre séjour à Marrakech.',
	},
	{
		routeKey: 'excursions',
		categoryKey: 'excursions',
		title: 'Excursions Marrakech & Montgolfière',
		subtitle:
			'Excursions et activités d\'aventure à Marrakech : vol en montgolfière au lever du soleil, quad dans le désert de Jbilet, tyrolienne dans les contreforts de l\'Atlas.',
		image: IMG.hotAirBalloon,
		intro:
			'Ajoutez une dose d\'adrénaline à votre séjour à Marrakech avec ces excursions d\'aventure guidées, toutes au départ de la ville et de retour le jour même (ou la matinée même). D\'un vol en montgolfière au lever du soleil au-dessus des palmeraies à une balade en quad dans le désert de Jbilet et une tyrolienne dans les contreforts de l\'Atlas, chaque excursion ci-dessous est encadrée par un guide privé avec prise en charge à l\'hôtel incluse.',
	},
	{
		routeKey: 'guidedTours',
		categoryKey: 'guided-tours',
		title: 'Visites guidées au Maroc',
		subtitle: 'Visites d\'une demi-journée ou en soirée menées à pied par un guide local expert dans la médina.',
		image: IMG.guide,
		intro: 'Un conteur local à vos côtés à travers les souks, palais et recoins cachés de la médina.',
	},
];
