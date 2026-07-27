import { IMG } from '../images';

export const TOUR_COLLECTIONS = [
	{
		routeKey: 'tours',
		title: 'Tous les circuits au Maroc',
		subtitle: 'Des voyages privés sur mesure pour chaque type de voyageur.',
		image: IMG.kasbah,
		intro: 'Parcourez nos itinéraires les plus appréciés — chaque circuit est entièrement privé et personnalisé selon vos dates, votre rythme et vos centres d\'intérêt.',
	},
	{
		routeKey: 'luxuryTours',
		categoryKey: 'luxury-tours',
		title: 'Circuits de luxe au Maroc',
		subtitle: 'Riads cinq étoiles, camps de désert privés et service irréprochable.',
		image: IMG.luxCamp,
		intro: 'Nos voyages les plus raffinés, conçus pour les voyageurs qui attendent le meilleur.',
	},
	{
		routeKey: 'privateTours',
		categoryKey: 'private-tours',
		title: 'Circuits privés au Maroc',
		subtitle: 'Votre propre véhicule, guide et rythme — le Maroc entièrement selon vos conditions.',
		image: IMG.fesDoor,
		intro: 'Chacun de nos circuits est privé par défaut. Découvrez des itinéraires intimes et flexibles.',
	},
	{
		routeKey: 'desertTours',
		categoryKey: 'desert-tours',
		title: 'Circuits désert du Sahara',
		subtitle: 'Dunes dorées, balades à dos de chameau et camps de désert de luxe inoubliables.',
		image: IMG.duneSunset,
		intro: 'Partez à l\'aventure dans le Sahara et dormez sous un ciel étoilé.',
	},
	{
		routeKey: 'dayTrips',
		categoryKey: 'day-trips',
		title: 'Excursions à la journée au Maroc',
		subtitle: 'De grandes aventures, de retour le soir même — de l\'Atlas à l\'Atlantique.',
		image: IMG.atlas,
		intro: 'Le complément idéal à votre séjour en ville, avec transport privé et guides experts inclus.',
	},
	{
		routeKey: 'excursions',
		categoryKey: 'excursions',
		title: 'Activités et excursions au Maroc',
		subtitle: 'Montgolfière, quad et tyrolienne au-dessus de la campagne de Marrakech.',
		image: IMG.hotAirBalloon,
		intro: 'Ajoutez une dose d\'adrénaline à votre séjour avec ces activités de plein air guidées près de Marrakech.',
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
