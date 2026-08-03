import { IMG } from '../images';
import { getRoutePaths } from '@/data/route-config';

const ROUTE_PATHS = getRoutePaths('fr');

export const BLOG_PAGE_POSTS = [
	{
		id: 'luxury-sahara-desert-night',
		destinationId: 'merzouga-sahara',
		slug: 'guide-ultime-nuit-de-luxe-desert-sahara',
		image: IMG.duneSunset,
		title: 'Le guide ultime d\'une nuit de luxe dans le désert du Sahara',
		category: 'Désert',
		summary: 'Tout ce qu\'il faut savoir pour séjourner dans un camp de désert marocain cinq étoiles.',
		quickAnswer: 'Une nuit de luxe dans le Sahara, c\'est une tente privée avec un vrai lit et une salle de bain attenante, un dîner marocain à plusieurs services, et une balade à dos de chameau au coucher du soleil — soit à l\'Erg Chebbi près de Merzouga (les dunes majestueuses, 9-10h depuis Marrakech), soit à Agafay (un désert rocailleux à seulement 45 minutes de Marrakech, idéal si le temps manque).',
		datePublished: '2026-02-10',
		dateModified: '2026-07-16',
		readTime: 'Lecture 9 min',
		author: {
			name: 'Youssef El Amrani',
			role: 'Responsable des opérations désert, Yassine Travel',
		},
		content: [
			{
				paragraphs: [
					'Il y a un instant, juste après que le dernier moteur de quad se soit tu et que le vent du Sahara soit tombé, où le désert devient complètement silencieux. Ce silence — suivi vingt minutes plus tard par un ciel si dense d\'étoiles qu\'il en paraît irréel — est la raison pour laquelle on traverse le monde pour dormir dans les dunes du Maroc. Mais tous les "camps de désert" ne tiennent pas cette promesse. Après avoir organisé des nuits dans le désert pour nos clients pendant plus d\'une décennie, ce guide couvre exactement ce qui distingue une nuit sous tente oubliable de celles qu\'on raconte encore des années après.',
				],
			},
			{
				heading: 'Merzouga ou Agafay : quelles dunes choisir',
				paragraphs: [
					'Le Maroc offre deux expériences "désert" très différentes, et les confondre est l\'erreur de planification la plus fréquente que nous constatons.',
					'L\'Erg Chebbi, près de Merzouga, c\'est le vrai Sahara — ces dunes immenses sculptées par le vent que l\'on imagine les yeux fermés. Il se trouve à environ 9-10 heures de route de Marrakech (ou un court vol intérieur jusqu\'à Errachidia), ce qui en fait un voyage de 3-4 jours minimum, généralement combiné avec l\'Atlas, la vallée du Dadès et les gorges du Todra en chemin.',
					'Agafay est un désert rocailleux, presque lunaire, à seulement 45 minutes de Marrakech. Il n\'a pas l\'ampleur de l\'Erg Chebbi, mais offre une véritable nuit de luxe dans le désert — dîner sous les étoiles, piscine privée dans certains camps, musique live — sans sacrifier deux jours de votre itinéraire. C\'est le meilleur choix si votre séjour dure moins d\'une semaine ou si vous voulez encadrer l\'expérience désert de temps passé à Marrakech.',
					'Si les dunes majestueuses sont non négociables pour vos photos et vos souvenirs, notre circuit de 4 jours Marrakech-Merzouga est fait pour ça. Si le temps manque, la nuit de luxe à Agafay vous offre 90% de la magie en une fraction du temps de trajet.',
				],
				table: {
					headers: ['', 'Merzouga (Erg Chebbi)', 'Agafay'],
					rows: [
						['Distance depuis Marrakech', '9-10 heures de route', '45 minutes'],
						['Ampleur des dunes', 'Dunes majestueuses, Sahara classique', 'Désert rocailleux, paysage lunaire'],
						['Durée minimale du séjour', '3-4 jours', '1 nuit'],
						['Idéal pour', 'Photos de Sahara incontournables', 'Séjours courts, complément facile à Marrakech'],
					],
				},
			},
			{
				heading: 'Ce que "luxe" signifie vraiment dans un camp de désert',
				paragraphs: [
					'Le mot "luxe" est galvaudé dans le marketing des camps de désert, il vaut donc la peine d\'être précis sur ce qu\'il faut réellement rechercher.',
					'Un véritable camp cinq étoiles propose : des tentes privées en toile avec de vrais lits (pas des matelas au sol), des salles de bain privatives avec eau chaude et plomberie fonctionnelle, une alimentation électrique par générateur ou solaire pour recharger vos appareils, et une tente de restauration dédiée plutôt qu\'un espace communal partagé. Les meilleurs camps incluent aussi une terrasse privée ou un coin feu attenant à chaque tente, pour profiter du ciel étoilé sans le partager avec tout le camp.',
					'Le dîner doit être un repas marocain à plusieurs services — souvent un tajine d\'agneau ou de poulet mijoté lentement, du pain frais cuit au four à sable, et un thé à la menthe versé selon la tradition — suivi d\'un spectacle live de percussions gnawa ou berbères autour du feu. Demandez directement à votre organisateur si les tentes ont une salle de bain privée ; ce détail à lui seul fait toute la différence entre "joli sur Instagram" et réellement confortable à 2h du matin.',
				],
			},
			{
				heading: 'Coucher de soleil, balade à dos de chameau, et le lever de soleil que vous êtes venu voir',
				paragraphs: [
					'La séquence classique à l\'Erg Chebbi commence par une balade à dos de chameau dans les dunes, calculée pour arriver avant le coucher du soleil — comptez 45 à 90 minutes en selle, confortable pour la plupart des voyageurs, mais à mentionner si vous avez des problèmes de dos, une option de transfert en 4x4 existant généralement en alternative.',
					'Voir les dunes passer de l\'or à l\'orange profond puis au violet à mesure que le soleil descend est, sans exagération, le moment le plus photographié d\'un itinéraire marocain. Après le dîner et la musique, nous conseillons toujours à nos clients de mettre un réveil pour les toutes premières heures : sans aucune pollution lumineuse, la Voie lactée est visible à l\'œil nu par nuit claire, une expérience de plus en plus rare partout dans le monde. Le lever de soleil du lendemain, à admirer depuis le sommet de la dune la plus proche avec un café à la main, est le bouquet final, plus calme mais tout aussi mémorable.',
				],
			},
			{
				heading: 'Meilleure période pour une nuit dans le désert',
				paragraphs: [
					'D\'octobre à avril, c\'est la période idéale. Les températures de jour sont agréables (18-28°C) et les nuits assez fraîches pour profiter d\'un feu sans être glaciales. Les nuits de décembre et janvier peuvent approcher de zéro degré à Merzouga en particulier, une couche chaude est donc indispensable même si les journées semblent douces.',
					'De mai à septembre, il faut être prudent : la chaleur du désert dépasse régulièrement 40°C en journée, ce qui reste gérable pour une nuit à Agafay près de Marrakech mais bien plus éprouvant sur la route de plusieurs jours vers Merzouga. Si l\'été est votre seule option, Agafay est le choix le plus confortable.',
				],
			},
			{
				heading: 'Que prendre pour le désert',
				paragraphs: [
					'Les couches de vêtements sont essentielles : une couche chaude pour la baisse de température le soir (toute l\'année, pas seulement en hiver), un foulard ou chèche pour se protéger du sable soufflé par le vent, des lunettes de soleil, une protection solaire pour la journée, et des chaussures fermées plutôt que des sandales pour la balade à dos de chameau et la marche dans les dunes. Une lampe frontale ou la lampe torche du téléphone est vraiment utile une fois que le générateur du camp s\'éteint pour la nuit.',
				],
			},
		],
		internalLinks: [
			{
				label: 'Marrakech-Merzouga en 4 jours',
				description: 'Notre circuit phare vers les dunes majestueuses de l\'Erg Chebbi, avec l\'Atlas et les gorges du Todra en chemin.',
				to: `${ROUTE_PATHS.tourDetail.replace(':slug', 'marrakech-merzouga-4-jours-desert')}`,
			},
			{
				label: 'Nuit de luxe dans le désert d\'Agafay',
				description: 'Une nuit de luxe dans le désert à seulement 45 minutes de Marrakech — idéal pour les séjours courts.',
				to: `${ROUTE_PATHS.tourDetail.replace(':slug', 'nuit-de-luxe-desert-agafay')}`,
			},
			{
				label: 'Tous les circuits désert',
				description: 'Comparez tous nos itinéraires désert, d\'une nuit à plusieurs jours d\'expédition dans le Sahara.',
				to: ROUTE_PATHS.desertTours,
			},
			{
				label: 'Guide de la destination Merzouga Sahara',
				description: 'Que voir et faire autour de l\'Erg Chebbi au-delà du camp lui-même.',
				to: `${ROUTE_PATHS.destinationDetail.replace(':slug', 'merzouga-sahara')}`,
			},
		],
	},
	{
		id: '3-perfect-days-in-marrakech',
		destinationId: 'marrakech',
		slug: '3-jours-parfaits-a-marrakech',
		image: IMG.marrakech,
		title: '3 jours parfaits à Marrakech',
		category: 'Guide de ville',
		summary: 'Comment vivre la Ville Rouge comme un habitué, des souks aux dîners sur les toits.',
		quickAnswer: 'Trois jours suffisent pour l\'essentiel de Marrakech : jour 1 dans la médina (Jemaa el-Fna, les souks, le palais de la Bahia), jour 2 dans les jardins et la ville nouvelle (jardin Majorelle, Guéliz), et jour 3 en excursion d\'une demi-journée dans les contreforts de l\'Atlas ou le désert d\'Agafay avant le départ.',
		datePublished: '2026-03-02',
		dateModified: '2026-07-16',
		readTime: 'Lecture 7 min',
		author: {
			name: 'Sofia Bennani',
			role: 'Spécialiste destination Marrakech, Yassine Travel',
		},
		content: [
			{
				paragraphs: [
					'Marrakech récompense un rythme plus lent que celui adopté par la plupart des visiteurs de passage. Trois jours pleins, c\'est le juste équilibre : assez de temps pour voir l\'essentiel de la médina sans se presser, et assez de marge pour au moins une sortie hors des remparts. Voici comment nous organisons ces trois jours pour nos clients.',
				],
			},
			{
				heading: 'Jour 1 : la médina, comme il se doit',
				paragraphs: [
					'Commencez tôt sur Jemaa el-Fna avant que la place ne se remplisse, puis glissez-vous dans les souks pendant que la lumière est encore douce — le marché aux épices, le souk des teinturiers et les fabricants de lanternes se trouvent tous à quelques minutes les uns des autres. Le palais de la Bahia et les tombeaux saadiens valent le prix d\'entrée rien que pour les zelliges ; les deux sont bondés dès midi, visez donc avant 11h.',
					'Terminez la journée sur un toit-terrasse surplombant la place. L\'appel à la prière au coucher du soleil, avec les martinets tournoyant au-dessus de la place, est un de ces instants que les photos ne captent jamais vraiment.',
				],
			},
			{
				heading: 'Jour 2 : jardins, design et ville nouvelle',
				paragraphs: [
					'Le jardin Majorelle est populaire à juste titre — la villa bleu cobalt au milieu des cactus et des bambous est réellement saisissante, et le petit musée berbère à l\'intérieur mérite le billet supplémentaire. Réservez votre créneau en ligne à l\'avance ; il est complet la plupart des matins.',
					'Passez l\'après-midi à Guéliz, le quartier plus récent de Marrakech, pour des concept stores, des galeries d\'art contemporain, et un changement de rythme après l\'intensité de la médina. C\'est aussi là que se trouvent certains des meilleurs restaurants marocains modernes de la ville, si vous voulez une pause tajine.',
				],
			},
			{
				heading: 'Jour 3 : s\'échapper de la ville quelques heures',
				paragraphs: [
					'C\'est le jour que la plupart des itinéraires ratent — soit ils le suppriment complètement, soit ils tentent d\'y caser un voyage complet dans le désert qui épuise avant le départ. Une demi-journée dans les contreforts de l\'Atlas ou le désert d\'Agafay est le meilleur choix : assez proche pour être de retour en ville en milieu d\'après-midi, assez différent pour ressentir un vrai changement de décor.',
					'Si votre vol est tardif, cela fonctionne aussi très bien comme excursion du matin avant de rejoindre l\'aéroport.',
				],
			},
			{
				heading: 'Quelques notes pratiques',
				paragraphs: [
					'Les riads se réservent plus vite que les hôtels en haute saison (mars-mai, septembre-novembre), réservez donc au moins six semaines à l\'avance si vous avez des dates précises. L\'argent liquide reste préféré dans les souks pour les petits achats, et le marchandage est attendu — commencez à environ la moitié du premier prix annoncé.',
				],
			},
		],
		internalLinks: [
			{
				label: 'Collection d\'excursions à la journée depuis Marrakech',
				description: 'Montagnes de l\'Atlas, désert d\'Agafay, ou côte atlantique — de retour en ville le soir même.',
				to: ROUTE_PATHS.dayTrips,
			},
			{
				label: 'Nuit de luxe dans le désert d\'Agafay',
				description: 'Transformez votre troisième jour en escapade d\'une nuit si vous voulez plus qu\'une demi-journée.',
				to: `${ROUTE_PATHS.tourDetail.replace(':slug', 'nuit-de-luxe-desert-agafay')}`,
			},
			{
				label: 'Guide de la destination Marrakech',
				description: 'Tout le reste à voir et à faire dans la Ville Rouge.',
				to: `${ROUTE_PATHS.destinationDetail.replace(':slug', 'marrakech')}`,
			},
			{
				label: 'Chauffeurs privés au Maroc',
				description: 'Évitez les négociations de taxi avec un chauffeur-guide privé pour vos journées à Marrakech.',
				to: ROUTE_PATHS.privateDrivers,
			},
		],
	},
	{
		id: 'food-lovers-journey-through-morocco',
		slug: 'voyage-gourmand-a-travers-le-maroc',
		image: IMG.tagine,
		title: 'Un voyage gourmand à travers le Maroc',
		category: 'Gastronomie',
		summary: 'Tajines, pastilla et thé à la menthe — les saveurs qui définissent la cuisine marocaine.',
		quickAnswer: 'La cuisine marocaine repose sur les tajines mijotés lentement (agneau, poulet ou légumes, avec citron confit et olives), le couscous du vendredi, la pastilla (une tourte sucrée-salée au pigeon ou au poulet), et le thé à la menthe versé de haut en signe d\'hospitalité. Les spécialités varient selon les régions — Fès pour la pastilla, Essaouira pour les sardines grillées, Marrakech pour la tanjia.',
		datePublished: '2026-03-18',
		dateModified: '2026-07-16',
		readTime: 'Lecture 6 min',
		author: {
			name: 'Youssef El Amrani',
			role: 'Responsable des opérations désert, Yassine Travel',
		},
		content: [
			{
				paragraphs: [
					'Demandez à n\'importe quel Marocain de parler de nourriture et la conversation durera longtemps — la cuisine ici est régionale, saisonnière, et profondément liée à l\'hospitalité. Quelques plats se retrouvent partout, mais les meilleures versions de chacun appartiennent souvent à une ville précise, voire à une grand-mère précise.',
				],
			},
			{
				heading: 'Le tajine, comme il se doit',
				paragraphs: [
					'Un tajine désigne à la fois le plat en terre cuite et le mets lui-même — viande ou légumes mijotés lentement avec un équilibre d\'épices précis, généralement du citron confit, des olives, ou des fruits secs selon la région. Le couvercle conique piège la vapeur et la renvoie dans le plat, ce qui explique qu\'un bon tajine ne nécessite presque aucun liquide ajouté. Le poulet au citron confit et aux olives est le grand classique ; l\'agneau aux pruneaux et amandes est la version festive servie aux mariages.',
				],
			},
			{
				heading: 'Au-delà du tajine : que chercher selon la ville',
				paragraphs: [
					'Fès est l\'endroit pour la pastilla — une tourte délicate traditionnellement fourrée au pigeon, plus souvent au poulet aujourd\'hui, superposée d\'amandes, de cannelle et de sucre dans une combinaison sucrée-salée qui surprend la plupart des primo-visiteurs. À Marrakech, cherchez la tanjia : bœuf ou agneau mijoté pendant des heures dans une urne scellée, traditionnellement dans les braises d\'un four de hammam. Sur la côte à Essaouira, tout tourne autour du grill — sardines et pêche du jour, simplement préparées à la chermoula.',
					'Le couscous est traditionnellement un plat du vendredi, servi avec sept légumes et un bouillon riche. Si vous voyagez avec un guide privé, demandez où les locaux mangent réellement — le meilleur couscous se trouve rarement dans le restaurant à la plus belle terrasse.',
				],
			},
			{
				heading: 'Le thé à la menthe n\'est pas un détail',
				paragraphs: [
					'Surnommé à moitié en plaisantant le "whisky marocain", le thé à la menthe est versé de haut pour l\'aérer et créer une légère mousse — une petite mise en scène qui signale aussi l\'hospitalité. Refuser un verre lorsqu\'il est proposé est considéré comme impoli ; attendez-vous à au moins trois tournées si vous êtes invité chez quelqu\'un, selon le dicton local sur les trois verres, chacun ayant un goût différent.',
				],
			},
		],
		internalLinks: [
			{
				label: 'Circuits sur mesure',
				description: 'Construisez un voyage autour des marchés, cours de cuisine et spécialités régionales.',
				to: ROUTE_PATHS.customTours,
			},
			{
				label: 'Le voyage gourmand continue à Fès',
				description: 'Associez ce guide à notre circuit privé de découverte culturelle de Fès.',
				to: `${ROUTE_PATHS.tourDetail.replace(':slug', 'decouverte-culturelle-privee-de-fes')}`,
			},
			{
				label: 'Tous les circuits',
				description: 'Tous les itinéraires que nous proposons, des excursions à la journée aux circuits de luxe de deux semaines.',
				to: ROUTE_PATHS.tours,
			},
		],
	},
	{
		id: 'why-chefchaouen-belongs-on-your-itinerary',
		destinationId: 'chefchaouen',
		slug: 'pourquoi-chefchaouen-a-sa-place-dans-votre-itineraire',
		image: IMG.chefchaouen,
		title: 'Pourquoi Chefchaouen a sa place dans votre itinéraire',
		category: 'Destinations',
		summary: "L'histoire derrière la ville bleue enchanteresse du Maroc.",
		quickAnswer: 'Chefchaouen est une ville de montagne dans le Rif, célèbre pour sa vieille ville aux murs bleus — une tradition souvent associée aux réfugiés juifs des années 1930, bien que ses origines exactes soient débattues. Elle se trouve à 4-5h de route de Fès ou Tanger, mieux vécue en escale d\'1-2 jours plutôt qu\'en excursion précipitée à la journée.',
		datePublished: '2026-04-05',
		dateModified: '2026-07-16',
		readTime: 'Lecture 6 min',
		author: {
			name: 'Sofia Bennani',
			role: 'Spécialiste destination Marrakech, Yassine Travel',
		},
		content: [
			{
				paragraphs: [
					'Les photos de Chefchaouen circulent tellement en ligne qu\'il est facile de croire que le bleu n\'est qu\'un argument touristique. Ce n\'est pas le cas — la tradition remonte à plusieurs générations, et parcourir les ruelles en personne procure une sensation différente de n\'importe quelle photo, le bleu changeant de teinte selon l\'angle de la lumière et l\'heure de la journée.',
				],
			},
			{
				heading: 'D\'où vient ce bleu',
				paragraphs: [
					'L\'explication la plus répandue relie cette tradition aux réfugiés juifs installés à Chefchaouen dans les années 1930, pour qui le bleu avait une signification religieuse, rappelant le ciel et Dieu. D\'autres théories l\'associent à un moyen d\'éloigner les moustiques, ou simplement à une esthétique qui s\'est imposée avec le temps. Les habitants donnent souvent une réponse différente selon la personne interrogée — ce qui fait partie du charme de la ville.',
				],
			},
			{
				heading: 'Que faire vraiment sur place',
				paragraphs: [
					'La vieille ville elle-même est l\'attraction principale : s\'y promener sans plan fixe est la meilleure façon de la découvrir, car les plus belles ruelles sont rarement celles indiquées sur une carte. La mosquée espagnole, à 20-30 minutes de marche en montée depuis la médina, offre une vue large sur les toits bleus et vaut le coup d\'être visitée au coucher du soleil.',
					'Chefchaouen est aussi un bon endroit pour acheter de la laine tissée à la main et des articles en cuir directement auprès de ceux qui les fabriquent, généralement à des prix plus justes et une meilleure qualité que dans les souks des grandes villes.',
				],
			},
			{
				heading: 'Comment l\'intégrer dans un voyage plus long',
				paragraphs: [
					'Chefchaouen se prête mal à une excursion d\'une seule journée depuis la plupart des points de départ — elle fonctionne bien mieux comme étape d\'1-2 nuits entre Fès et Tanger, ou dans le cadre d\'un circuit plus long incluant aussi les villes impériales et le Sahara. La visiter dans la journée depuis Fès signifie environ 8 heures de route pour quelques heures sur place, ce que nous ne recommandons pas.',
				],
			},
		],
		internalLinks: [
			{
				label: 'Guide de la destination Chefchaouen',
				description: 'Les informations pratiques pour visiter la ville bleue.',
				to: `${ROUTE_PATHS.destinationDetail.replace(':slug', 'chefchaouen')}`,
			},
			{
				label: 'Villes impériales & Sahara de luxe en 10 jours',
				description: 'Notre circuit qui inclut une étape à Chefchaouen, aux côtés de Fès et du désert.',
				to: `${ROUTE_PATHS.tourDetail.replace(':slug', 'villes-imperiales-et-sahara-de-luxe')}`,
			},
			{
				label: 'Grand tour du Maroc en 14 jours',
				description: 'Un circuit plus long qui accorde à Chefchaouen le temps qu\'elle mérite.',
				to: `${ROUTE_PATHS.tourDetail.replace(':slug', 'grand-tour-du-maroc-14-jours')}`,
			},
		],
	},
	{
		id: 'best-time-to-visit-morocco',
		slug: 'meilleure-periode-pour-visiter-le-maroc',
		image: IMG.atlas,
		title: 'Meilleure période pour visiter le Maroc',
		category: 'Préparer son voyage',
		summary: 'Un guide mois par mois de la météo, des festivals et de l\'affluence.',
		quickAnswer: 'La meilleure période pour visiter le Maroc dans l\'ensemble est mars-mai ou septembre-novembre, quand les températures sont douces dans tout le pays. L\'été (juin-août) convient à la côte et aux montagnes mais est très chaud dans le Sahara et les villes impériales ; l\'hiver (décembre-février) est agréable dans le sud mais froid la nuit dans le désert et les montagnes.',
		datePublished: '2026-04-20',
		dateModified: '2026-07-16',
		readTime: 'Lecture 7 min',
		author: {
			name: 'Youssef El Amrani',
			role: 'Responsable des opérations désert, Yassine Travel',
		},
		content: [
			{
				paragraphs: [
					'La géographie du Maroc fait de cette question une vraie question régionale — la côte, le Sahara et les montagnes de l\'Atlas partagent rarement la même météo à la même période de l\'année. La réponse courte est le printemps et l\'automne pour la plupart des itinéraires, mais le bon mois dépend fortement de votre destination réelle.',
				],
				table: {
					headers: ['Saison', 'Idéal pour', 'À surveiller'],
					rows: [
						['Mars-mai', 'Marrakech, Fès, randonnée dans l\'Atlas, circuits complets', 'Pluies occasionnelles au nord en début de printemps'],
						['Juin-août', 'Villes côtières (Essaouira, Tanger), retraites en montagne', 'Chaleur extrême dans le Sahara et les villes impériales, 40°C+'],
						['Septembre-novembre', 'Circuits complets, nuits dans le désert', 'Réserver tôt — c\'est la haute saison'],
						['Décembre-février', 'Marrakech (journées douces), observation des étoiles au Sahara', 'Nuits froides dans le désert et les montagnes, proches de zéro'],
					],
				},
			},
			{
				heading: 'Pour un voyage axé sur le désert',
				paragraphs: [
					'D\'octobre à avril, c\'est la période idéale pour une nuit confortable dans le Sahara — la chaleur diurne reste gérable et les soirées sont assez fraîches pour profiter d\'un feu sans que ce soit insupportable. En plein été, la chaleur du désert dépasse régulièrement 40°C en journée, ce qui rend la route de plusieurs jours entre Marrakech et Merzouga réellement éprouvante.',
				],
			},
			{
				heading: 'Pour les villes impériales (Marrakech, Fès, Meknès)',
				paragraphs: [
					'Le printemps et l\'automne l\'emportent encore ici — les après-midis d\'été dans les médinas peuvent être épuisants pour les visites à pied, tandis que l\'hiver reste doux en journée mais les riads (construits autour de cours ouvertes) peuvent sembler froids la nuit sans chauffage adapté. Demandez spécifiquement le chauffage lors de la réservation d\'un riad pour un séjour de décembre à février.',
				],
			},
			{
				heading: 'Festivals à prendre en compte',
				paragraphs: [
					'Les dates du Ramadan changent chaque année dans le calendrier grégorien ; les horaires des restaurants et la restauration en journée changent significativement pendant ce mois, ce qui vaut la peine d\'être vérifié avant de réserver si les expériences culinaires sont une priorité. En dehors de cela, des moussems régionaux (festivals traditionnels) ont lieu toute l\'année dans différentes villes — votre concepteur de voyage peut signaler ceux qui coïncident avec vos dates.',
				],
			},
		],
		internalLinks: [
			{
				label: 'Le guide ultime d\'une nuit de luxe dans le désert du Sahara',
				description: 'Programmez votre nuit dans le désert selon les meilleurs mois.',
				to: `${ROUTE_PATHS.blogArticle.replace(':slug', 'guide-ultime-nuit-de-luxe-desert-sahara')}`,
			},
			{
				label: 'Circuits sur mesure',
				description: 'Indiquez-nous vos dates de voyage et nous concevrons l\'itinéraire autour des meilleures régions pour cette saison.',
				to: ROUTE_PATHS.customTours,
			},
			{
				label: 'Tous les circuits',
				description: 'Parcourez les itinéraires par saison et par région.',
				to: ROUTE_PATHS.tours,
			},
		],
	},
	{
		id: 'how-to-choose-the-perfect-riad',
		destinationId: 'marrakech',
		slug: 'comment-choisir-le-riad-parfait',
		image: IMG.riad,
		title: 'Comment choisir le riad parfait',
		category: 'Luxe',
		summary: 'Ce qui distingue un riad marocain vraiment exceptionnel.',
		quickAnswer: 'Un excellent riad se résume à quatre choses : un emplacement réellement calme, juste à côté (pas sur) d\'une ruelle animée, de la lumière naturelle dans le patio, des avis récents honnêtes mentionnant le bruit et le service, et la confirmation de ce qui est réellement inclus (petit-déjeuner, transfert aéroport, accès au toit-terrasse) avant de réserver.',
		datePublished: '2026-05-08',
		dateModified: '2026-07-16',
		readTime: 'Lecture 6 min',
		author: {
			name: 'Sofia Bennani',
			role: 'Spécialiste destination Marrakech, Yassine Travel',
		},
		content: [
			{
				paragraphs: [
					'Un riad est une maison marocaine traditionnelle construite autour d\'un patio ou jardin intérieur, et ce format est devenu synonyme d\'un certain genre de séjour intime et design. Mais le mot seul en dit très peu — nous avons vu des riads extraordinaires et d\'autres qui ne sont qu\'une maison rénovée avec un joli compte Instagram. Voici ce qui distingue réellement les deux.',
				],
			},
			{
				heading: 'L\'emplacement compte plus que les photos',
				paragraphs: [
					'Le facteur le plus important pour la satisfaction des clients est le bruit, pas la décoration. Un riad directement sur une ruelle animée de la médina peut signifier des charrettes de livraison tôt le matin et un passage piéton important le soir devant votre fenêtre ; un riad niché à deux virages du chemin principal, même à 30 mètres seulement, est souvent nettement plus calme. Demandez précisément la position exacte du riad par rapport au souk ou à la place la plus proche avant de réserver, pas seulement le quartier général.',
				],
			},
			{
				heading: 'La lumière naturelle dans le patio',
				paragraphs: [
					'Les riads sont construits vers l\'intérieur, ce qui signifie que certains patios reçoivent très peu de lumière directe selon la hauteur des murs environnants et la période de l\'année. Un patio qui reste lumineux toute la journée change réellement la perception de tout le séjour, surtout si vous prévoyez d\'y passer du temps libre plutôt que d\'être en visite à l\'extérieur.',
				],
			},
			{
				heading: 'Lisez les avis récents, pas seulement la note',
				paragraphs: [
					'Une moyenne de 4,8 étoiles peut cacher beaucoup de choses. Lisez les 10 à 15 avis les plus récents en cherchant spécifiquement les mentions de bruit, de fiabilité de la climatisation, et de réactivité du personnel — ce sont les détails qui varient le plus entre un riad moyen et un riad exceptionnel, et ils apparaissent rarement dans les photos professionnelles.',
				],
			},
			{
				heading: 'Confirmez ce qui est réellement inclus',
				paragraphs: [
					'Le petit-déjeuner, le transfert aéroport, et l\'accès au toit-terrasse ou à la piscine sont parfois inclus et parfois facturés séparément, même parmi des riads à un prix similaire. Cela vaut la peine d\'être confirmé directement, surtout pour des séjours en haute saison où de petites exclusions peuvent autrement devenir des coûts supplémentaires inattendus.',
				],
			},
		],
		internalLinks: [
			{
				label: 'Guide de la destination Marrakech',
				description: 'Où se trouvent réellement les meilleurs quartiers de riads.',
				to: `${ROUTE_PATHS.destinationDetail.replace(':slug', 'marrakech')}`,
			},
			{
				label: '3 jours parfaits à Marrakech',
				description: 'Planifiez vos journées dans la médina autour de l\'emplacement de votre riad.',
				to: `${ROUTE_PATHS.blogArticle.replace(':slug', '3-jours-parfaits-a-marrakech')}`,
			},
			{
				label: 'Circuits sur mesure',
				description: 'Nous sélectionnons les riads à la main dans chaque itinéraire sur mesure que nous concevons.',
				to: ROUTE_PATHS.customTours,
			},
		],
	},
	{
		id: 'terres-amanar-zipline-marrakech-guide',
		destinationId: 'atlas-mountains',
		slug: 'tyrolienne-marrakech-terres-amanar-guide',
		image: IMG.zipline,
		title: "Tyrolienne à Marrakech : le guide des Terres d'Amanar",
		category: 'Aventure',
		summary: "Ce qu'il faut savoir avant une excursion aux Terres d'Amanar — le parc d'aventure dans les contreforts de l'Atlas près de Marrakech.",
		quickAnswer: "Les Terres d'Amanar est un parc d'aventure dans les contreforts de l'Atlas, à 30-45 minutes de Marrakech près du village de Tahnaout. Le domaine est connu pour l'un des plus grands parcours de tyrolienne d'Afrique, avec aussi de l'accrobranche, du VTT, de l'équitation et des ponts suspendus — généralement en excursion à la journée avec déjeuner inclus, même si un séjour sur place est aussi possible.",
		datePublished: '2026-06-02',
		dateModified: '2026-07-29',
		readTime: 'Lecture 6 min',
		author: {
			name: 'Youssef El Amrani',
			role: 'Responsable des opérations désert, Yassine Travel',
		},
		content: [
			{
				paragraphs: [
					"La plupart des visiteurs de Marrakech ne réalisent pas que les montagnes de l'Atlas commencent à peine une demi-heure hors de la ville. Les Terres d'Amanar se trouvent exactement à cette limite — un parc d'aventure construit dans les forêts de pins et les canyons de terre rouge des contreforts, et l'une des escapades d'une demi-journée les plus populaires pour qui veut quelque chose de plus actif qu'une balade dans les souks.",
				],
			},
			{
				heading: "Que sont les Terres d'Amanar",
				paragraphs: [
					"Les Terres d'Amanar est un domaine d'aventure de 120 hectares près du village de Tahnaout, en bordure du parc national du Toubkal, à environ 1 200 mètres d'altitude. Le domaine s'est construit autour de l'un des plus grands parcours de tyroliennes aériennes d'Afrique — plusieurs lignes tendues au-dessus d'un canyon, la plus longue s'étirant sur plusieurs centaines de mètres — complété par un parcours accrobranche, des ponts suspendus et des sentiers de randonnée.",
					"C'est un domaine privé géré comme un site d'écotourisme plutôt qu'une attraction publique, ce qui explique qu'on y accède via des opérateurs et guides plutôt qu'un guichet classique.",
				],
			},
			{
				heading: 'Tyrolienne et activités',
				paragraphs: [
					"Le parcours de tyrolienne est l'attraction phare : plusieurs lignes de longueur et hauteur variables, en harnais, avec un instructeur certifié qui gère chaque départ et chaque arrivée. Le parcours convient à des niveaux de confiance très différents — les plus hésitants ont des lignes courtes et basses, tandis que la plus longue offre un vrai moment d'adrénaline avec le canyon qui s'ouvre sous les pieds.",
					"Au-delà de la tyrolienne, le domaine propose un parcours accrobranche à plusieurs niveaux de difficulté, des sentiers de VTT dans la forêt de pins, des balades à cheval ou à dos de mulet, du tir à l'arc, et une traversée de pont suspendu. La plupart des visites à la journée combinent deux ou trois de ces activités plutôt que de vouloir tout faire en une fois.",
				],
			},
			{
				heading: "Y accéder et à quoi s'attendre",
				paragraphs: [
					"Depuis Marrakech, comptez environ 30-45 minutes de route vers les contreforts près de Tahnaout — la route se rétrécit sur la fin, ce qui explique pourquoi la plupart des visiteurs viennent avec un chauffeur plutôt qu'une voiture de location. Une journée type comprend un briefing sécurité à l'arrivée, 2-3 heures entre tyrolienne et accrobranche, et un déjeuner marocain sur place — souvent un tajine avec salade et pain frais, avec vue panoramique sur la vallée.",
					"Certains itinéraires ajoutent un arrêt dans une coopérative d'huile d'argan en chemin, où des femmes berbères font la démonstration du procédé d'extraction traditionnel — un bon complément à l'activité physique, souvent associé aux circuits au départ de Marrakech.",
				],
			},
			{
				heading: 'À qui ça convient, et quand y aller',
				paragraphs: [
					"Les Terres d'Amanar conviennent bien aux familles (les parcours enfants sont plus bas et plus courts), aux couples en quête d'une journée active, et aux petits groupes. Le domaine est ouvert toute l'année, même si le printemps et l'automne offrent les températures les plus confortables pour plusieurs heures en extérieur ; les après-midis d'été dans le canyon peuvent être chauds malgré l'altitude.",
					"Il est aussi possible de passer la nuit dans l'éco-lodge du domaine plutôt que de faire ça en excursion à la journée depuis Marrakech, si vous préférez passer deux jours complets en montagne sans le trajet retour quotidien.",
				],
			},
		],
		internalLinks: [
			{
				label: "Tyrolienne aux Terres d'Amanar",
				description: 'Notre excursion privée à la journée avec le parcours de tyrolienne, le déjeuner sur place, et un arrêt au village d\'Imlil.',
				to: `${ROUTE_PATHS.tourDetail.replace(':slug', 'tyrolienne-terres-d-amanar')}`,
			},
			{
				label: "Guide de la destination Montagnes de l'Atlas",
				description: "D'autres façons de passer une journée dans les contreforts de l'Atlas près de Marrakech.",
				to: `${ROUTE_PATHS.destinationDetail.replace(':slug', 'montagnes-atlas')}`,
			},
			{
				label: 'Collection d\'excursions à la journée depuis Marrakech',
				description: 'Comparez toutes les options d\'une demi-journée ou d\'une journée complète au départ de Marrakech.',
				to: ROUTE_PATHS.dayTrips,
			},
		],
	},
];
