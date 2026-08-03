// Contenu de politique de transfert commun à toute l'entreprise — rédigé une
// seule fois puis réutilisé sur chaque page aéroport. C'est le même service,
// les mêmes chauffeurs, la même assurance et le même processus de réservation
// quel que soit l'aéroport, donc le répéter à l'identique sur chaque page est
// cohérent (comme un pied de page) plutôt que du « contenu dupliqué » au sens
// pénalisé par les moteurs de recherche — ce qui doit rester unique par page
// se trouve dans transferContent.fr.js, avec lequel ce fichier est associé.
export const TRANSFER_POLICY = {
	whyChooseUs: [
		{
			icon: 'ShieldCheck',
			title: 'Agréé et entièrement assuré',
			body: 'Chaque transfert est assuré par un voyagiste marocain agréé disposant d’une assurance passagers commerciale, pour être couvert dès que vous montez dans le véhicule.',
		},
		{
			icon: 'Clock',
			title: 'Prise en charge avec suivi de vol',
			body: 'Nous suivons votre numéro de vol en temps réel, afin qu’un atterrissage retardé ou anticipé ne signifie jamais une prise en charge manquée ou des frais supplémentaires.',
		},
		{
			icon: 'Users',
			title: 'Privé, porte-à-porte',
			body: 'Pas de navette partagée ni d’autres passagers — votre chauffeur vous conduit directement du hall d’arrivée jusqu’à votre riad ou hôtel.',
		},
		{
			icon: 'MessageCircle',
			title: 'Assistance humaine 24/7',
			body: 'Une vraie personne vous répond sur WhatsApp ou par téléphone à toute heure, avant et pendant votre voyage, en français comme en anglais.',
		},
	],
	vehicleOptions: [
		{
			icon: 'Car',
			title: 'Berline',
			body: 'Berlines climatisées et confortables pour 3 passagers avec bagages — le choix le plus courant pour les voyageurs seuls et les couples.',
		},
		{
			icon: 'Users',
			title: 'SUV',
			body: 'Espace et garde au sol supplémentaires pour 4 passagers, un choix apprécié des familles et des voyageurs aux valises volumineuses.',
		},
		{
			icon: 'Car',
			title: 'Van / minibus',
			body: '5 à 8 places avec un grand espace bagages — le choix standard pour les groupes et les familles sur plusieurs générations.',
		},
		{
			icon: 'Star',
			title: 'Véhicule de luxe',
			body: 'Berlines et SUV haut de gamme avec chauffeur en tenue, pour les voyageurs qui souhaitent une première et une dernière impression du Maroc à la hauteur de leur séjour.',
		},
	],
	meetAndGreet: {
		title: 'Accueil personnalisé à l’arrivée',
		body: 'Votre chauffeur vous attend à l’intérieur du hall d’arrivée avec une pancarte à votre nom clairement indiquée, juste à la sortie des douanes — vous n’aurez pas à chercher un parking ou une zone de prise en charge à l’extérieur du terminal.',
	},
	flightMonitoring: {
		title: 'Suivi de vol en temps réel',
		body: 'Nous suivons votre numéro de vol du décollage à l’atterrissage. En cas de retard, de déroutement ou d’arrivée anticipée, votre heure de prise en charge s’ajuste automatiquement — inutile d’appeler pour signaler un changement d’horaire.',
	},
	waitingTimePolicy: {
		title: 'Politique de temps d’attente',
		body: 'Les vols internationaux incluent 60 minutes d’attente gratuite après l’atterrissage pour passer l’immigration, récupérer les bagages et la douane ; les vols intérieurs incluent 30 minutes. Ce délai est calculé depuis votre heure d’atterrissage réelle, pas l’heure prévue.',
	},
	childSeats: {
		title: 'Sièges enfant et bébé',
		body: 'Sièges bébé dos à la route, sièges enfant face à la route et rehausseurs sont tous disponibles sur demande, sans frais supplémentaires — indiquez-nous simplement l’âge de vos enfants au moment de la réservation.',
	},
	accessibility: {
		title: 'Accessibilité',
		body: 'Signalez-nous à l’avance tout besoin de mobilité réduite, fauteuil roulant ou assistance supplémentaire, et nous vous proposerons un véhicule adapté ainsi qu’un chauffeur briefé pour vous aider au dépose-minute et avec les bagages.',
	},
	hotelPickup: {
		title: 'Prise en charge à l’hôtel ou au riad',
		body: 'Les transferts retour sont pris en charge directement dans le hall de votre riad ou hôtel. Pour les adresses de la médina inaccessibles en voiture, la prise en charge se fait au point praticable le plus proche, et votre chauffeur appelle à l’avance pour organiser les derniers mètres à pied si nécessaire.',
	},
	hotelDropoff: {
		title: 'Dépose à l’hôtel ou au riad',
		body: 'À l’arrivée, votre chauffeur vous conduit jusqu’à la porte de votre hébergement partout où un véhicule peut accéder. Pour les riads au cœur d’une médina piétonne, nous coordonnons avec l’établissement pour qu’un membre du personnel vous accueille au point d’accès le plus proche.',
	},
	businessTravel: {
		title: 'Voyages d’affaires',
		body: 'Des transferts ponctuels et professionnels pour vos conférences et réunions, avec un suivi de vol qui protège les emplois du temps serrés, une facturation sur demande, et des chauffeurs qui gardent le trajet calme et sans distraction quand vous devez travailler.',
	},
	familyTravel: {
		title: 'Voyages en famille',
		body: 'Des véhicules spacieux, des sièges enfant gratuits, et des chauffeurs habitués aux jeunes enfants et aux voyageurs fatigués après un long vol — nous prévoyons toujours un peu de marge pour que personne ne se sente pressé.',
	},
	luxuryTransfers: {
		title: 'Transferts de luxe',
		body: 'Véhicules haut de gamme, chauffeur en tenue, eau fraîche à bord et un accueil personnalisé pensé pour les voyageurs qui souhaitent que leur séjour soit à la hauteur dès la première minute.',
	},
	safety: {
		title: 'La sécurité à chaque trajet',
		body: 'Tous les véhicules sont régulièrement inspectés et entretenus, les chauffeurs respectent des consignes de vitesse et de repos sur les longs trajets, et chaque réservation est suivie en interne de la prise en charge jusqu’à la dépose.',
	},
	licensedDrivers: {
		title: 'Chauffeurs agréés et expérimentés',
		body: 'Chaque chauffeur détient un permis de conduire professionnel marocain, est sélectionné avant de rejoindre notre équipe, et connaît bien les prises en charge à l’aéroport, la circulation urbaine et, le cas échéant, les routes de montagne ou du désert.',
	},
	insurance: {
		title: 'Assurance passagers commerciale',
		body: 'Tous les transferts sont couverts par une assurance responsabilité civile passagers commerciale, en plus de l’assurance véhicule standard — une couverture qu’un taxi privé non agréé n’offre généralement pas.',
	},
	bookingProcess: [
		{ step: 1, title: 'Partagez vos informations', body: 'Envoyez votre numéro de vol, la date d’arrivée et le nombre de passagers via WhatsApp ou le formulaire de réservation.' },
		{ step: 2, title: 'Recevez une confirmation immédiate', body: 'Nous confirmons votre chauffeur, votre véhicule et le point de prise en charge, généralement en quelques heures.' },
		{ step: 3, title: 'Rencontrez votre chauffeur', body: 'Votre chauffeur vous attend à l’arrivée avec une pancarte à votre nom, en suivant votre vol en temps réel.' },
		{ step: 4, title: 'Voyagez en tout confort', body: 'Installez-vous pour le trajet privé, porte-à-porte, jusqu’à votre riad ou hôtel.' },
	],
	cancellationPolicy: {
		title: 'Annulation flexible',
		body: 'Annulez ou reportez gratuitement jusqu’à 24 heures avant la prise en charge. Les changements dans les 24 heures sont étudiés au cas par cas — écrivez-nous dès que vos plans changent et nous ferons notre possible pour nous adapter.',
	},
	paymentMethods: {
		title: 'Moyens de paiement',
		body: 'Payez en espèces (dirhams marocains ou euros) directement à votre chauffeur, ou réglez par virement bancaire sécurisé ou par carte en ligne à l’avance — selon ce qui vous convient le mieux.',
	},
	availableLanguages: {
		title: 'Langues parlées',
		body: 'Nos chauffeurs et notre équipe d’assistance communiquent aisément en français, en anglais et en arabe, avec l’espagnol disponible sur demande pour certains chauffeurs.',
	},
	trust: [
		{ icon: 'ShieldCheck', title: 'Entreprise touristique agréée', body: 'Un voyagiste marocain enregistré, pas un arrangement de taxi informel.' },
		{ icon: 'Award', title: 'Depuis 2008', body: 'Plus de 18 ans à organiser des transferts privés et des circuits à travers le Maroc.' },
		{ icon: 'Users', title: 'Équipe locale, familiale', body: 'Des fondateurs marocains nés et élevés au pays, qui connaissent personnellement ces routes et ces aéroports.' },
		{ icon: 'HeartHandshake', title: 'Assurance commerciale', body: 'Une couverture responsabilité passagers sur chaque réservation, au-delà de l’assurance véhicule standard.' },
		{ icon: 'Clock', title: 'Assistance 24/7', body: 'Une vraie personne joignable à toute heure, avant, pendant et après votre transfert.' },
		{ icon: 'Star', title: 'Avis clients vérifiés', body: 'De vrais retours attribués à nos anciens clients — consultez les avis ci-dessous.' },
	],
	comparison: {
		criteria: ['price', 'comfort', 'safety', 'waitingTime', 'luggage', 'nightAvailability', 'language', 'doorToDoor', 'familySuitability', 'accessibility'],
		modes: {
			privateTransfer: {
				label: 'Transfert privé',
				price: 'Fixe, convenu à l’avance',
				comfort: 'Élevé — véhicule privé, sans arrêt',
				safety: 'Chauffeur agréé, assurance commerciale',
				waitingTime: 'Aucune — le chauffeur vous attend',
				luggage: 'Espace illimité selon la taille du véhicule',
				nightAvailability: 'Oui, 24h/24',
				language: 'Français, anglais, arabe',
				doorToDoor: 'Oui',
				familySuitability: 'Excellent — sièges enfant inclus',
				accessibility: 'Véhicule adapté à vos besoins',
			},
			taxi: {
				label: 'Taxi aéroport',
				price: 'Souvent négocié sur place',
				comfort: 'Variable, véhicules anciens fréquents',
				safety: 'Agréé mais sans assurance passagers commerciale',
				waitingTime: 'File d’attente à la station de taxis',
				luggage: 'Limité, selon le véhicule',
				nightAvailability: 'Disponibilité réduite tard le soir',
				language: 'Arabe et français le plus souvent',
				doorToDoor: 'Généralement oui',
				familySuitability: 'Limité — sièges enfant rarement disponibles',
				accessibility: 'Non garantie',
			},
			rideHailing: {
				label: 'Application VTC',
				price: 'Peut augmenter aux heures d’affluence',
				comfort: 'Dépend de la note du chauffeur',
				safety: 'Identité du chauffeur vérifiée dans l’application',
				waitingTime: 'Dépend des chauffeurs disponibles à proximité',
				luggage: 'Coffre de voiture standard',
				nightAvailability: 'Couverture encore limitée hors grandes villes',
				language: 'Non garantie',
				doorToDoor: 'Oui',
				familySuitability: 'Aucun siège enfant fourni',
				accessibility: 'Non garantie',
			},
			publicTransport: {
				label: 'Bus / train + taxi',
				price: 'Option la moins chère',
				comfort: 'Faible avec des bagages',
				safety: 'Généralement sûr, trajets non accompagnés',
				waitingTime: 'Horaires fixes, attentes parfois longues',
				luggage: 'Peu pratique dans les bus et sur les quais',
				nightAvailability: 'Très limité après la soirée',
				language: 'Arabe et français, peu d’anglais',
				doorToDoor: 'Non — un taxi supplémentaire est généralement nécessaire',
				familySuitability: 'Difficile avec de jeunes enfants',
				accessibility: 'Rarement accessible',
			},
		},
	},
};
