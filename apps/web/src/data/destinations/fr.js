import { IMG } from '../images';

export const DESTINATION_HIGHLIGHTS = [
	{
		id: 'marrakech',
		gallery: [IMG.marrakech, IMG.couple, IMG.guide],
		nearestAirportSlug: 'marrakech-rak',
		nearbyDestinationIds: ['atlas-mountains', 'ait-benhaddou', 'essaouira', 'agafay'],
		thingsToDo: ['Explorer Jemaa el-Fna et les souks', 'Visiter le palais de la Bahia et le jardin Majorelle', 'Se perdre dans les tanneries et marchés d\'épices de la médina', 'Faire une excursion dans les contreforts de l\'Atlas'],
		bestTimeToVisit: 'Mars-mai et septembre-novembre, pour des journées douces sans la chaleur de l\'été.',
		slug: 'marrakech',
		name: 'Marrakech',
		seoTitle: 'Marrakech : Guide de Voyage de la Ville Rouge, Maroc',
		summary: 'La Ville Rouge — palais, souks et la trépidante Jemaa el-Fna.',
		image: IMG.marrakech,
	},
	{
		id: 'fes',
		gallery: [IMG.fesDoor, IMG.guide],
		nearestAirportSlug: 'fes-fez',
		nearbyDestinationIds: ['chefchaouen'],
		thingsToDo: ['Se promener dans l\'ancienne médina de Fès el-Bali', 'Visiter les tanneries Chouara', 'Découvrir Al Quaraouiyine, l\'une des plus anciennes universités au monde', 'Explorer la médersa Bou Inania'],
		bestTimeToVisit: 'Mars-mai et septembre-novembre, en évitant la chaleur estivale de la médina.',
		slug: 'fes',
		name: 'Fès',
		summary: "Le cœur spirituel du Maroc, abritant la plus grande médina médiévale vivante au monde.",
		image: IMG.fesDoor,
	},
	{
		id: 'merzouga-sahara',
		gallery: [IMG.duneSunset, IMG.camel, IMG.luxCamp],
		nearestAirportSlug: null,
		nearbyDestinationIds: ['ait-benhaddou', 'atlas-mountains'],
		thingsToDo: ['Balade à dos de chameau dans les dunes de l\'Erg Chebbi', 'Dormir dans un camp de désert de luxe sous les étoiles', 'Glisser sur les dunes au coucher du soleil', 'Visiter un village berbère local'],
		bestTimeToVisit: 'Octobre-avril, pour des nuits fraîches et des journées agréables dans le désert.',
		slug: 'merzouga-sahara',
		name: 'Merzouga Sahara',
		h1: 'Camps de Désert de Luxe à Merzouga, Sahara',
		seoTitle: 'Merzouga : Camps de Désert de Luxe, Sahara Maroc',
		seoDescription:
			'Merzouga, Maroc : camps de désert de luxe privés sur les dunes de l\'Erg Chebbi, avec majordome et tentes avec salle de bain. Distances, météo et balades à dos de chameau.',
		summary: 'Les dunes majestueuses de l\'Erg Chebbi et des camps de désert de luxe inoubliables.',
		overview:
			'Merzouga est une petite ville à la lisière du champ de dunes de l\'Erg Chebbi, dans le sud-est du Maroc, et la principale porte d\'entrée pour découvrir le Sahara. Les dunes ici s\'élèvent jusqu\'à 150 mètres et passent de l\'or à l\'orange profond au coucher du soleil — la raison pour laquelle la plupart des itinéraires marocains considèrent une nuit dans le désert comme une étape incontournable. Ce qui distingue un bon séjour à Merzouga d\'un séjour oubliable, c\'est le camp : des installations partagées et économiques avec sanitaires communs côtoient des camps de luxe privés avec de vrais lits, des installations privatives et un service complet. Yassine Travel réserve ces derniers.',
		guideSections: [
			{
				heading: 'Ce qui Rend un Camp de Désert à Merzouga "de Luxe"',
				body: [
					'Tous les camps de l\'Erg Chebbi ne se valent pas, et « luxe » est un standard précis, pas un simple argument marketing. Sur nos circuits sahariens, ce standard signifie : un majordome privé attitré à votre tente pendant tout votre séjour, des tentes au standard des riads avec de vrais lits et un mobilier soigné plutôt que de simples matelas de toile, une suite de tente privée plutôt qu\'un espace de couchage partagé, une balade à dos de chameau au coucher du soleil à l\'arrivée et un lever de soleil sur l\'Erg Chebbi le lendemain matin — tous deux inclus plutôt que vendus en option — et une assistance conciergerie 24/7 pendant le voyage.',
					'Notre Circuit Désert 4 Jours Marrakech - Merzouga et notre circuit Villes impériales & Sahara de luxe en 10 jours incluent tous deux ce standard de camp — le circuit le plus court offre une nuit à Erg Chebbi, le plus long en offre deux.',
				],
			},
			{
				heading: 'Distance et Météo — Planifier votre Voyage à Merzouga',
				body: [
					'Depuis Marrakech : environ 560 km, généralement parcourus sur 2 jours avec une halte nocturne dans la vallée du Dadès ou à Aït Benhaddou — c\'est pourquoi chaque circuit vers Merzouga sur ce site est un itinéraire de plusieurs jours, pas un simple transfert direct. Faire le trajet en une journée est possible mais ne laisse aucun temps pour les gorges du Dadès ou Aït Benhaddou en chemin, deux étapes qui valent le détour.',
					'Depuis Fès : environ 470 km, soit 7 à 8 heures, en traversant les forêts de cèdres du Moyen Atlas — c\'est l\'itinéraire utilisé sur nos circuits villes impériales qui se poursuivent vers Merzouga après Fès.',
					'Météo par saison : d\'octobre à avril, les nuits du désert sont fraîches et agréables (souvent 5-12°C une fois la nuit tombée, même quand les journées sont chaudes) avec un ciel dégagé idéal pour observer les étoiles — c\'est la saison que nous recommandons. De mai à septembre, il fait chaud, avec des températures diurnes dépassant régulièrement les 38-40°C dans les dunes ; une nuit en camp de luxe reste agréable en été à condition de prévoir la chaleur.',
				],
			},
		],
		faqs: [
			[
				'Qu\'est-ce qui rend les camps de désert de Merzouga "de luxe" par rapport aux camps standards ?',
				'Nos camps à Merzouga incluent un majordome privé, des tentes au standard des riads avec de vrais lits et salle de bain attenante, ainsi qu\'une suite de tente privée plutôt qu\'un espace de couchage partagé — le même standard cinq étoiles que nos riads partenaires à Marrakech et Fès, pas une simple installation en toile basique.',
			],
			[
				'À quelle distance se trouve Merzouga de Marrakech, et peut-on la visiter en une journée ?',
				'Environ 560 km, généralement parcourus sur 2 jours avec une halte nocturne dans la vallée du Dadès ou à Aït Benhaddou. Il est possible de faire le trajet en une très longue journée, mais tous nos circuits vers Merzouga sont sur plusieurs jours, à la fois pour le confort et pour inclure les gorges du Dadès et Aït Benhaddou en chemin.',
			],
			[
				'Merzouga, est-ce la même chose que "le Sahara" ?',
				'Merzouga est la ville porte d\'entrée du champ de dunes de l\'Erg Chebbi, qui constitue la bordure accessible du vaste désert du Sahara s\'étendant à travers l\'Afrique du Nord. Quand on parle de "dormir dans le Sahara" au Maroc, c\'est presque toujours d\'Erg Chebbi près de Merzouga qu\'il s\'agit.',
			],
			[
				'Quelle est la meilleure période pour visiter Merzouga ?',
				'D\'octobre à avril, pour des nuits de désert fraîches et des températures diurnes agréables — c\'est la période que nous recommandons pour réserver. De mai à septembre, il fait chaud, souvent au-dessus de 38-40°C en journée, même si une nuit en camp de luxe reste appréciable en prévoyant la chaleur.',
			],
		],
		image: IMG.duneSunset,
	},
	{
		id: 'chefchaouen',
		gallery: [IMG.chefchaouen],
		nearestAirportSlug: 'tangier-tng',
		nearbyDestinationIds: ['fes'],
		thingsToDo: ['Se promener dans la vieille ville aux murs bleus', 'Photographier les emblématiques ruelles bleues', 'Randonner jusqu\'au belvédère de la mosquée espagnole', 'Acheter de la laine tissée et des articles en cuir'],
		bestTimeToVisit: 'Mars-juin et septembre-octobre, pour une météo de montagne douce.',
		slug: 'chefchaouen',
		name: 'Chefchaouen',
		h1: 'Chefchaouen, la Ville Bleue du Maroc',
		seoTitle: 'Chefchaouen : Guide de Voyage Ville Bleue Maroc',
		seoDescription:
			'Préparez votre voyage à Chefchaouen, la ville bleue du Maroc. Distances réelles depuis Marrakech, Fès et Tanger, meilleurs spots photo, période idéale.',
		summary: 'La ville bleue de rêve, nichée dans les montagnes du Rif.',
		overview:
			'Chefchaouen se situe dans les montagnes du Rif, dans le nord du Maroc, à environ deux heures des côtes méditerranéennes. Sa vieille ville a d\'abord été chaulée en blanc puis progressivement peinte en différentes nuances de bleu à partir des années 1930 — une tradition souvent associée aux réfugiés juifs installés dans la région à cette époque, bien que l\'origine exacte reste débattue localement. Aujourd\'hui, la médina bleue est l\'un des lieux les plus photographiés du Maroc : ruelles pavées escarpées, géraniums en pots contre des murs indigo, et un rythme plus lent qu\'à Marrakech ou Fès. C\'est une ville de montagne, pas du désert ni du littoral — ce qui explique pourquoi elle est si éloignée du circuit sud du Maroc, un détail important lorsqu\'on planifie comment l\'intégrer à un voyage.',
		guideSections: [
			{
				heading: 'Comment Aller à Chefchaouen',
				body: [
					'Depuis Marrakech : Chefchaouen se trouve à environ 580-600 km de Marrakech — un trajet de 6h30 à 7h30 selon l\'itinéraire et les arrêts, car il n\'existe pas d\'autoroute directe sur toute la distance et le dernier tronçon grimpe dans les montagnes du Rif. C\'est un trajet réellement long en aller-retour dans la journée, c\'est pourquoi presque aucun voyagiste — nous y compris — ne le propose comme excursion à la journée depuis Marrakech. Les façons réalistes de découvrir Chefchaouen depuis un voyage basé à Marrakech sont : l\'ajouter comme étape d\'un circuit plus long passant déjà par Fès, ou prendre l\'avion ou le train jusqu\'à Fès ou Tanger pour découvrir Chefchaouen depuis là-bas.',
					'Depuis Fès : Chefchaouen est à environ 200 km de Fès, soit 2h30 à 3h en véhicule privé sur une route panoramique à travers les contreforts du Rif. C\'est la façon la plus courante de combiner les deux villes, et cela fonctionne bien comme longue excursion à la journée ou avec une nuit à Chefchaouen avant de revenir à Fès ou de continuer vers le nord.',
					'Depuis Tanger : Chefchaouen est la plus proche des trois, à environ 115 km et 1h30 à 2h en véhicule privé. Le port et l\'aéroport de Tanger en font un point d\'entrée pratique pour un itinéraire dans le nord du Maroc, avec Chefchaouen comme première ou deuxième étape naturelle.',
				],
			},
			{
				heading: 'Une Excursion à Chefchaouen depuis Marrakech est-elle Réaliste ?',
				body: [
					'Réponse courte : pas confortablement. À 6h30-7h30 de route dans chaque sens, un aller-retour dans la journée depuis Marrakech représente environ 13 à 15 heures de route pour quelques heures sur place — la plupart des voyageurs qui tentent l\'expérience arrivent épuisés et repartent aussitôt après les photos de fin d\'après-midi. Nous ne proposons pas cette excursion à la journée pour cette raison. Si Chefchaouen est une priorité, les meilleures options sont : l\'intégrer à un itinéraire de plusieurs jours qui couvre aussi Fès et le désert (voir nos circuits Villes impériales & Sahara ci-dessous), ou vous installer à Fès ou Tanger pendant quelques jours et faire de Chefchaouen une excursion à la journée depuis là-bas, où le trajet est de 2 à 3 heures au lieu de 7.',
				],
			},
		],
		faqs: [
			[
				'À quelle distance se trouve Chefchaouen de Marrakech, et peut-on la visiter en excursion à la journée ?',
				'Chefchaouen est à environ 580-600 km de Marrakech, soit 6h30 à 7h30 de route dans chaque sens — un aller-retour dans la journée n\'est donc pas réaliste. La plupart des voyageurs la découvrent soit dans le cadre d\'un circuit de plusieurs jours couvrant aussi Fès, soit en s\'installant à Fès ou Tanger, d\'où elle devient une excursion confortable de 2 à 3 heures.',
			],
			[
				'Combien de temps faut-il pour aller de Fès à Chefchaouen ?',
				'Environ 2h30 à 3h en véhicule privé, sur une route panoramique à travers les contreforts du Rif — c\'est la façon la plus courante de combiner les deux villes, soit en longue excursion à la journée, soit avec une nuit à Chefchaouen.',
			],
			[
				'Combien de temps dure le trajet entre Tanger et Chefchaouen ?',
				'Environ 1h30 à 2h, le plus court des trajets principaux vers Chefchaouen — l\'aéroport et le port de Tanger en font un point de départ pratique pour un voyage dans le nord du Maroc.',
			],
			[
				'Chefchaouen vaut-elle le détour si mon voyage est centré sur Marrakech ?',
				'Cela vaut le détour si vous avez le temps pour un véritable itinéraire de plusieurs jours — Chefchaouen figure sur nos circuits Villes impériales & Sahara de luxe en 10 jours et Grand tour du Maroc en 14 jours, tous deux passant par Fès en chemin. Si votre voyage se limite à Marrakech avec peu de jours disponibles, la distance rend l\'ajout difficile sans sacrifier du temps ailleurs.',
			],
		],
		image: IMG.chefchaouen,
	},
	{
		id: 'ait-benhaddou',
		gallery: [IMG.kasbah],
		nearestAirportSlug: 'marrakech-rak',
		nearbyDestinationIds: ['marrakech', 'atlas-mountains', 'merzouga-sahara'],
		thingsToDo: ['Explorer le ksar classé à l\'UNESCO', 'Repérer les lieux de tournage de films et séries célèbres', 'Traverser la rivière Ounila à pied', 'Photographier l\'architecture en pisé au coucher du soleil'],
		bestTimeToVisit: 'Mars-mai et septembre-novembre, avant ou après le pic de chaleur estivale.',
		slug: 'ait-benhaddou',
		name: 'Aït Benhaddou',
		h1: 'Aït Benhaddou, le Ksar Classé UNESCO du Maroc',
		seoTitle: 'Aït Benhaddou : Ksar UNESCO & Lieux de Tournage',
		seoDescription:
			'Découvrez Aït Benhaddou, le ksar en pisé classé UNESCO du Maroc, lieu de tournage de Gladiator et Lawrence d\'Arabie. Histoire, distance et circuits.',
		summary: "L'emblématique ksar classé à l'UNESCO, porte d'entrée vers le désert.",
		overview:
			'Aït Benhaddou est un ksar fortifié — un ensemble de bâtiments en terre entourés de murs défensifs — situé sur l\'ancienne route caravanière entre le Sahara et Marrakech, dans la vallée de la rivière Ounila. Ses tours et kasbahs ocre-rouge en pisé ont largement survécu intactes depuis le 17e siècle, ce qui en fait l\'un des meilleurs exemples préservés d\'architecture en terre présaharienne au Maroc. Une poignée de familles vivent encore à l\'intérieur des murs aujourd\'hui, bien que la plupart des habitants aient déménagé vers le nouveau village de l\'autre côté de la rivière, laissant le ksar historique largement préservé comme un monument vivant plutôt qu\'une pièce de musée purement restaurée.',
		guideSections: [
			{
				heading: 'Histoire et Statut de Patrimoine Mondial UNESCO',
				body: [
					'Aït Benhaddou a été inscrit sur la Liste du patrimoine mondial de l\'UNESCO en 1987. Le classement de l\'UNESCO reconnaît le site comme un exemple exceptionnel de l\'architecture en terre (pisé, ou terre battue) typique du sud du Maroc, et l\'un des derniers ksour — villages fortifiés — de ce type à avoir survécu dans une forme proche de l\'originale, la plupart des autres le long de la même route commerciale historique s\'étant effondrés ou ayant été abandonnés. La disposition défensive du ksar — des kasbahs densément regroupées derrière un seul périmètre fortifié, avec un grenier communal au point le plus haut pour être utilisé en cas de siège — reflète une époque où les établissements le long de cette route caravanière devaient protéger les marchandises circulant entre le Sahara et Marrakech. Les travaux de restauration continus, en partie soutenus par l\'UNESCO, sont ce qui maintient les structures en pisé debout aujourd\'hui, car la construction en pisé non traitée est vulnérable à l\'érosion causée par les pluies parfois abondantes du Maroc.',
				],
			},
			{
				heading: 'Lieux de Tournage à Aït Benhaddou',
				body: [
					'L\'architecture spectaculaire et intemporelle d\'Aït Benhaddou en a fait l\'un des lieux de tournage les plus utilisés au Maroc, servant de décor pour des scènes allant de la Rome antique à l\'Égypte biblique. Deux productions bien documentées y ont été tournées : Gladiator (2000), qui a utilisé la kasbah comme décor pour des scènes d\'une ville de province nord-africaine, et Lawrence d\'Arabie (1962), l\'une des premières grandes productions internationales à avoir tourné dans et autour de la kasbah, contribuant à établir le Maroc comme destination de tournage pour les décors désertiques. Aït Benhaddou est également souvent associé à d\'autres productions de cinéma et de télévision tournées dans la région plus large d\'Ouarzazate — demandez à votre guide sur place quelles scènes précises, le cas échéant, ont été tournées à Aït Benhaddou même.',
				],
			},
		],
		faqs: [
			[
				'Pourquoi Aït Benhaddou est-il classé au patrimoine mondial de l\'UNESCO ?',
				'Le site a été inscrit en 1987 comme exemple exceptionnel de l\'architecture en terre (pisé) du sud du Maroc — l\'un des derniers ksour fortifiés de ce type à avoir survécu proche de sa forme originale, avec une disposition défensive construite pour protéger l\'ancienne route caravanière entre le Sahara et Marrakech.',
			],
			[
				'Quels films ont été tournés à Aït Benhaddou ?',
				'Aït Benhaddou a figuré dans Gladiator (2000) et Lawrence d\'Arabie (1962), parmi d\'autres productions attirées par son architecture spectaculaire en pisé. Demandez à votre guide sur place les emplacements exacts de tournage, car certaines productions associées à la région plus large ont en réalité été tournées dans les studios voisins d\'Ouarzazate plutôt qu\'à la kasbah elle-même.',
			],
			[
				'Des habitants vivent-ils encore à Aït Benhaddou ?',
				'Un petit nombre de familles vivent encore dans le ksar historique, bien que la plupart des habitants aient déménagé vers le nouveau village de l\'autre côté de la rivière Ounila il y a des décennies — la kasbah est un site vivant, pas une ruine abandonnée.',
			],
			[
				'À quelle distance se trouve Aït Benhaddou de Marrakech, et est-ce une bonne excursion à la journée ?',
				'Environ 2 à 2h30 dans chaque sens en passant par le col du Tizi n\'Tichka, ce qui en fait une excursion confortable sur une journée complète depuis Marrakech — notre Excursion à Aït Ben Haddou depuis Marrakech est construite précisément autour de cet itinéraire.',
			],
		],
		image: IMG.kasbah,
	},
	{
		id: 'atlas-mountains',
		gallery: [IMG.atlas],
		nearestAirportSlug: 'marrakech-rak',
		nearbyDestinationIds: ['marrakech', 'ait-benhaddou'],
		thingsToDo: ['Randonner à travers villages et vallées berbères', 'Visiter une coopérative traditionnelle d\'huile d\'argan', 'Parcourir le col spectaculaire du Tizi n\'Tichka', 'Partager un thé à la menthe avec une famille locale'],
		bestTimeToVisit: 'Avril-juin et septembre-octobre pour la randonnée ; sommets enneigés décembre-février.',
		slug: 'montagnes-atlas',
		name: 'Montagnes de l\'Atlas',
		h1: 'Circuits Montagnes de l\'Atlas depuis Marrakech',
		seoTitle: 'Montagnes Atlas Maroc : Circuits & Excursions',
		seoDescription:
			'Réservez une excursion ou un circuit dans les montagnes de l\'Atlas depuis Marrakech : villages berbères, col du Tizi n\'Tichka, randonnée à Imlil et vallée d\'Ouirgane.',
		summary: 'Villages berbères, cols spectaculaires et sommets enneigés.',
		overview:
			'Le Haut Atlas s\'élève juste derrière Marrakech, assez proche pour qu\'une excursion à la journée vous emmène des souks de la ville aux villages berbères et aux sommets enneigés (en saison) en moins d\'une heure de route. Cette proximité fait des montagnes de l\'Atlas l\'une des excursions à fort impact les plus faciles à ajouter à un séjour basé à Marrakech — pas de vol, pas d\'engagement sur plusieurs jours, juste un véhicule privé et un départ matinal.',
		guideSections: [
			{
				heading: 'Réserver un Circuit dans les Montagnes de l\'Atlas',
				body: [
					'Plusieurs excursions à la journée depuis Marrakech couvrent différents coins des montagnes de l\'Atlas, et le bon choix dépend de ce que vous recherchez. L\'Excursion à Imlil depuis Marrakech convient aux voyageurs qui veulent l\'expérience du village de randonnée : Imlil se trouve au pied du mont Toubkal, le plus haut sommet d\'Afrique du Nord, avec des villages berbères, des sentiers muletiers et des marchés de montagne à environ 1 740 m d\'altitude — idéal si « randonnée » ou « Toubkal » fait partie de vos attentes. L\'Excursion à la vallée d\'Ouirgane depuis Marrakech offre une expérience de l\'Atlas plus calme et plus verte : champs en terrasses, oliveraies et un rythme plus détendu que les sentiers plus fréquentés d\'Imlil — idéal pour profiter des paysages de l\'Atlas sans la foule. L\'Excursion aux cascades d\'Ouzoud depuis Marrakech est le choix pour les voyageurs qui privilégient les plus hautes chutes d\'eau du Maroc à la culture villageoise, et la Collection d\'excursions à la journée depuis Marrakech permet de choisir le jour même entre les montagnes de l\'Atlas, la côte d\'Essaouira ou le désert d\'Agafay.',
					'Toutes ces excursions se font en véhicule privé climatisé avec prise en charge et retour à l\'hôtel à Marrakech, généralement de retour en soirée.',
				],
			},
			{
				heading: 'Traverser le Col du Tizi n\'Tichka',
				body: [
					'Les voyageurs qui poursuivent au-delà d\'une simple excursion à la journée — vers Aït Benhaddou ou le Sahara — traverseront le Tizi n\'Tichka, le plus haut col routier majeur du Maroc à 2 260 mètres. C\'est une route goudronnée bien entretenue, empruntée quotidiennement par nos chauffeurs-guides, sinueuse mais non hors piste, et qui constitue l\'épine dorsale de chaque circuit désert de plusieurs jours au départ de Marrakech. Notre excursion à Aït Benhaddou et tous les circuits vers Merzouga le traversent naturellement.',
				],
			},
		],
		faqs: [
			[
				'Quelle est la différence entre les excursions à Imlil et à Ouirgane ?',
				'Imlil se trouve plus haut dans l\'Atlas, au pied du mont Toubkal, et convient aux voyageurs recherchant une ambiance de village de randonnée avec sentiers muletiers et marchés de montagne. Ouirgane est une vallée plus calme connue pour ses champs en terrasses et ses oliveraies, mieux adaptée aux voyageurs qui veulent des paysages de l\'Atlas sans la foule des sentiers d\'Imlil. Les deux excursions partent de Marrakech et durent la même journée.',
			],
			[
				'À quelle distance se trouvent les montagnes de l\'Atlas de Marrakech ?',
				'Les contreforts commencent à environ 30-45 minutes du centre de Marrakech, avec des villages comme Imlil et Ouirgane à environ 1h30-2h en véhicule privé — assez proche pour un aller-retour confortable dans la journée.',
			],
			[
				'Peut-on gravir le mont Toubkal en excursion à la journée ?',
				'Non — une excursion à Imlil permet de visiter le village et la vallée environnante au pied du Toubkal, mais l\'ascension du plus haut sommet d\'Afrique du Nord nécessite un trek dédié de plusieurs jours, pas une excursion d\'une seule journée.',
			],
			[
				'Le col du Tizi n\'Tichka est-il sûr à traverser ?',
				'Oui — c\'est une route goudronnée bien entretenue, empruntée quotidiennement par nos chauffeurs-guides, sinueuse à travers le Haut Atlas mais non hors piste. L\'hiver peut apporter de la neige en altitude, demandez donc à votre concepteur de voyage les conditions si vous voyagez de décembre à février.',
			],
		],
		image: IMG.atlas,
	},
	{
		id: 'essaouira',
		gallery: [IMG.Essaouira1],
		nearestAirportSlug: 'marrakech-rak',
		nearbyDestinationIds: ['marrakech'],
		thingsToDo: [
			"Marcher sur les remparts de la Skala de la Ville face à l'Atlantique",
			'Explorer le port de pêche et manger du poisson grillé sur le quai',
			"Se promener dans la médina classée UNESCO et ses souks d'artisanat, d'épices et de bijoux",
			"Se détendre ou s'initier au surf et au kitesurf sur la longue plage atlantique",
		],
		bestTimeToVisit: "Agréable presque toute l'année grâce à la brise atlantique — le printemps et l'automne sont les plus calmes, l'été offre le meilleur vent pour le kitesurf.",
		slug: 'essaouira',
		name: 'Essaouira',
		seoTitle: 'Essaouira : Côte Atlantique & Médina UNESCO, Maroc',
		summary: 'Une ville portuaire fortifiée sur l\'Atlantique, avec une médina classée UNESCO, des fruits de mer frais et une ambiance décontractée balayée par le vent.',
		image: IMG.Essaouira1,
	},
	{
		id: 'agafay',
		gallery: [IMG.luxCamp, IMG.camel],
		nearestAirportSlug: 'marrakech-rak',
		nearbyDestinationIds: ['marrakech'],
		thingsToDo: [
			'Balade à dos de chameau sur le plateau rocailleux et lunaire',
			"Admirer le coucher de soleil sur l'Atlas depuis la crête du désert",
			'Essayer le quad sur les collines de pierre',
			'Dîner aux chandelles avec musique gnaoua live dans un camp du désert',
		],
		bestTimeToVisit: "Toute l'année — Agafay est plus doux que le Sahara été comme hiver, même si mars-mai et septembre-novembre restent les périodes les plus confortables en journée.",
		slug: 'desert-agafay',
		name: "Désert d'Agafay",
		summary: "Le désert le plus proche de Marrakech — un plateau rocailleux (et non le Sahara) à seulement 45 minutes de la ville, connu pour ses camps de luxe et ses couchers de soleil.",
		image: IMG.luxCamp,
	},
];
