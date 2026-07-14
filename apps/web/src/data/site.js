export const IMG = {
  
  duneSunset: 'https://moroccotripholidays.com/wp-content/uploads/2026/07/f6acebf1-3332-4d40-8cde-404de57eaa9d.avif',
  luxCamp: 'https://moroccotripholidays.com/wp-content/uploads/2026/07/luxcamp.avif',
  fesDoor: 'https://moroccotripholidays.com/wp-content/uploads/2026/07/fesdoor.avif',
  camel: 'https://moroccotripholidays.com/wp-content/uploads/2026/07/camel.avif',
  riad: 'https://moroccotripholidays.com/wp-content/uploads/2026/07/riad.avif',
  tagine: 'https://moroccotripholidays.com/wp-content/uploads/2026/07/tagine.avif',
  chefchaouen: 'https://moroccotripholidays.com/wp-content/uploads/2026/07/chefchaouen.avif',
  marrakech: 'https://moroccotripholidays.com/wp-content/uploads/2026/07/marrakech.avif',
  couple: 'https://moroccotripholidays.com/wp-content/uploads/2026/07/couple.avif',
  guide: 'https://moroccotripholidays.com/wp-content/uploads/2026/07/guide.avif',
  kasbah: 'https://moroccotripholidays.com/wp-content/uploads/2026/07/kasbah.avif',
  atlas: 'https://moroccotripholidays.com/wp-content/uploads/2026/07/atlas.avif',
  Essaouira1:'https://moroccotripholidays.com/wp-content/uploads/2026/07/DSC02595-1920x1280-1.avif',
};

export const CONTACT = {
  phone: '+212 645-945717',
  phoneHref: 'tel:+212645945717',
  whatsapp: '212645945717',
  email: 'contact-pro@moroccotripholidays.com',
  address: '3 RES CHAMS AL MADINA IMM 7, Marrakech, Morocco',
};

export const waLink = (msg = "Hello! I'd like to plan a Morocco trip.") =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Tours', to: '/tours',
    children: [
      { label: 'All Tours', to: '/tours' },
      { label: 'Luxury Tours', to: '/luxury-tours' },
      { label: 'Private Tours', to: '/private-tours' },
      { label: 'Desert Tours', to: '/desert-tours' },
      { label: 'Day Trips', to: '/day-trips' },
      { label: 'Custom Tours', to: '/custom-tours' },
    ],
  },
  {
    label: 'Services', to: '/airport-transfers',
    children: [
      { label: 'Airport Transfers', to: '/marrakech-airport-transfer' },
      { label: 'Private Drivers', to: '/private-drivers' },
      { label: 'Custom Itineraries', to: '/custom-tours' },
    ],
  },
  { label: 'Destinations', to: '/destinations' },
  {
    label: 'More', to: '/blog',
    children: [
      { label: 'Blog', to: '/blog' },
      { label: 'Travel Guide', to: '/travel-guide' },
      { label: 'Reviews', to: '/reviews' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  { label: 'Contact', to: '/contact' },
];

export const TOURS = [
  {
    slug: 'imperial-cities-sahara',
    title: '10-Day Imperial Cities & Sahara Luxury',
    category: 'Luxury Tours',
    duration: '10 Days / 9 Nights',
    group: 'Private, up to 6',
    price: 2890,
    image: IMG.duneSunset,
    tagline: 'Marrakech, Fes, the Sahara & Atlas Mountains — five-star riads throughout.',
    highlights: [
      'Two nights in a luxury Sahara desert camp with private butler',
      'Handpicked five-star riads in Marrakech and Fes',
      'Private 4x4 with expert English-speaking driver-guide',
      'Sunset camel trek across the Erg Chebbi dunes',
      'Skip-the-line access to palaces, medinas and UNESCO sites',
    ],
    itinerary: [
      ['Day 1', 'Arrival Marrakech', 'Airport meet & greet, transfer to your luxury riad, welcome dinner on a rooftop terrace.'],
      ['Day 2', 'Marrakech Highlights', 'Private tour of Bahia Palace, Majorelle Garden, the souks and Jemaa el-Fnaa.'],
      ['Day 3', 'Atlas Mountains', 'Cross the Tizi n\'Tichka pass to Ait Benhaddou kasbah, overnight in Ouarzazate.'],
      ['Day 4', 'Into the Sahara', 'Scenic drive through the Dades Valley to Merzouga, sunset camel trek.'],
      ['Day 5', 'Desert Camp', 'Sunrise over the dunes, 4x4 desert exploration, second night under the stars.'],
      ['Day 6', 'To Fes', 'Cross the Middle Atlas cedar forests and Berber villages to Fes.'],
      ['Day 7', 'Fes Medina', 'Full-day guided tour of the ancient medina, tanneries and artisan workshops.'],
      ['Day 8', 'Chefchaouen', 'Day excursion to the blue city, return to Fes.'],
      ['Day 9', 'Return to Marrakech', 'Scenic transfer, farewell dinner, final night in your riad.'],
      ['Day 10', 'Departure', 'Private transfer to the airport at your leisure.'],
    ],
  },
  {
    slug: 'marrakech-merzouga-desert',
    title: '4-Day Marrakech to Merzouga Desert',
    category: 'Desert Tours',
    duration: '4 Days / 3 Nights',
    group: 'Private, up to 8',
    price: 890,
    image: IMG.camel,
    tagline: 'The classic Sahara adventure with a luxury desert camp finale.',
    highlights: [
      'Overnight in a premium desert camp at Erg Chebbi',
      'Camel trek at sunset and sunrise',
      'Ait Benhaddou and the Dades Gorges',
      'Private vehicle and local guide throughout',
    ],
    itinerary: [
      ['Day 1', 'Marrakech → Ouarzazate', 'Atlas crossing, Ait Benhaddou kasbah, overnight Dades Valley.'],
      ['Day 2', 'Dades → Merzouga', 'Todra Gorge, camel trek into the dunes, luxury desert camp.'],
      ['Day 3', 'Merzouga → Fes or return', 'Sunrise dunes, drive through the valleys.'],
      ['Day 4', 'Return to Marrakech', 'Scenic return transfer.'],
    ],
  },
  {
    slug: 'private-fes-city',
    title: 'Private Fes Cultural Discovery',
    category: 'Private Tours',
    duration: '3 Days / 2 Nights',
    group: 'Private, up to 6',
    price: 740,
    image: IMG.fesDoor,
    tagline: 'Immerse in the world\'s largest living medieval medina with a private historian.',
    highlights: [
      'Private historian guide through the Fes medina',
      'Artisan workshops: leather, ceramics, brass',
      'Boutique riad with rooftop dining',
      'Day trip to Volubilis Roman ruins & Meknes',
    ],
    itinerary: [
      ['Day 1', 'Arrival Fes', 'Riad check-in, evening medina walk and dinner.'],
      ['Day 2', 'Medina Deep Dive', 'Full-day private tour of madrasas, tanneries, souks.'],
      ['Day 3', 'Volubilis & Meknes', 'UNESCO Roman ruins and imperial Meknes, departure.'],
    ],
  },
  {
    slug: 'marrakech-day-trips',
    title: 'Marrakech Day Trips Collection',
    category: 'Day Trips',
    duration: '1 Day',
    group: 'Private or small group',
    price: 120,
    image: IMG.atlas,
    tagline: 'Atlas Mountains, Ouzoud Waterfalls, Essaouira & Agafay Desert — back by evening.',
    highlights: [
      'Choice of Atlas Mountains, Essaouira coast, or Agafay Desert',
      'Hotel pickup and drop-off included',
      'Air-conditioned private vehicle',
      'Licensed local guide',
    ],
    itinerary: [
      ['Morning', 'Pickup & Drive', 'Depart Marrakech, scenic route to your chosen destination.'],
      ['Midday', 'Guided Experience', 'Lunch, walking tour, and free time.'],
      ['Evening', 'Return', 'Comfortable transfer back to your hotel.'],
    ],
  },
  {
    slug: 'day-Trip-to-Essaouira-from-Marrakech',
    title: 'Day Trip to Essaouira from Marrakech',
    category: 'Day Trips',
    duration: '1 Day',
    group: 'Private or small group',
    price: 80,
    image: IMG.Essaouira1,
    tagline: 'Take a Day Trip to Essaouira from Marrakech',
    highlights: [
      'Scenic drive through argan tree groves and spotting tree-climbing goats',
      'Explore the charming Medina of Essaouira (UNESCO World Heritage site)',
      'Visit the historic Skala du Port for panoramic ocean views',
      'Stroll along the beautiful Atlantic coastline and beaches',
      'Discover the vibrant fishing harbor and enjoy fresh seafood',
      'Browse art galleries, local craft shops, and souks',
      'Free Camel or Horse Ride',
      'Experience Essaouiras unique blue and white architecture',
    ],
    itinerary: [
      ['Morning', 'Pickup & Drive', 'Depart Marrakech, scenic route to your chosen destination.'],
      ['Midday', 'Guided Experience', 'Lunch, walking tour, and free time.'],
      ['Evening', 'Return', 'Comfortable transfer back to your hotel.'],
    ],
  },


  {
    slug: 'grand-tour-morocco',
    title: '14-Day Grand Tour of Morocco',
    category: 'Luxury Tours',
    duration: '14 Days / 13 Nights',
    group: 'Private, up to 6',
    price: 3450,
    image: IMG.kasbah,
    tagline: 'The definitive luxury circuit — imperial cities, coast, desert and mountains.',
    highlights: [
      'Marrakech, Fes, Chefchaouen, Essaouira & the Sahara',
      'Five-star riads and boutique kasbahs throughout',
      'Private driver-guide and dedicated trip designer',
      'Cooking class, spa hammam and desert glamping',
    ],
    itinerary: [
      ['Day 1-3', 'Marrakech', 'Arrival, medina, gardens, Atlas foothills.'],
      ['Day 4-6', 'Sahara', 'Ait Benhaddou, dunes, luxury camp.'],
      ['Day 7-9', 'Fes', 'Medina, artisans, Volubilis.'],
      ['Day 10-11', 'Chefchaouen', 'The blue city and Rif mountains.'],
      ['Day 12-14', 'Essaouira & departure', 'Atlantic coast, return to Marrakech.'],
    ],
  },
  {
    slug: 'agafay-luxury-camp',
    title: 'Agafay Desert Luxury Overnight',
    category: 'Desert Tours',
    duration: '2 Days / 1 Night',
    group: 'Private, up to 10',
    price: 420,
    image: IMG.luxCamp,
    tagline: 'A stone-desert luxury camp just 40 minutes from Marrakech.',
    highlights: [
      'Private luxury tented suite with ensuite bathroom',
      'Sunset dinner with live Gnaoua music',
      'Camel ride and quad biking options',
      'Infinity pool with Atlas views',
    ],
    itinerary: [
      ['Day 1', 'Marrakech → Agafay', 'Afternoon transfer, camel ride, sunset dinner.'],
      ['Day 2', 'Sunrise & return', 'Breakfast, pool time, return to Marrakech.'],
    ],
  },
];

export const INCLUDED = [
  'Private air-conditioned vehicle & fuel',
  'Professional English-speaking driver-guide',
  'Accommodation as specified (luxury riads & camps)',
  'Daily breakfast and select dinners',
  'Camel trek and desert camp experience',
  'All entrance fees to monuments listed',
  'Bottled water throughout the journey',
  '24/7 on-trip concierge support',
];

export const EXCLUDED = [
  'International flights',
  'Travel insurance',
  'Lunches and drinks not specified',
  'Personal expenses and gratuities',
  'Optional activities (quad, hot-air balloon)',
];

export const REVIEWS = [
  { name: 'Passenger65802', country: 'TripAdvisor', text: 'It was one of the best tours we ever had. We saw so many things from Tangier to Fes, Sahara and Marrakesh and it was amazing. Our tour guide Yassine was very helpful, kind and very knowledgeable. He was the first person we met in Morocco and now the beauty of this country will always be associated with him. Yassine is the best person to represent Morocco.', tour: 'Grand Tour of Morocco' },
  { name: 'Kate M', country: 'TripAdvisor', text: 'The trip was great right from the airport in Casablanca to the end on the Agafay desert. Yassine drove us expertly for the entire holiday and acted as a guide and a strong support resource in our interactions with the lovely Moroccan people. He shared great local information like where to eat, see interesting things and to shop.', tour: 'Private Morocco Tour' },
  { name: 'Dcurca', country: 'TripAdvisor', text: 'Impeccable service from the airport pickup to every single recommendation for local stuff, security and care — as far as a trip to the Sahara desert and back to Casablanca, all with the utmost care for his passengers. Yassine just kept over delivering. We will visit Morocco again just because having this guy in our corner made our trip a great memory.', tour: 'Sahara Desert Tour' },
  { name: 'Tracy S', country: 'TripAdvisor', text: 'An amazing experience! Yassine was amazing. He was obliging of all of our whims and flexible to any changes we wanted to make to our plans. He is very knowledgeable about all the places he took us to. I would highly recommend him as a driver and tour guide in Morocco.', tour: 'Custom Morocco Tour' },
];

export const FAQS = [
  ['Is Morocco safe for tourists?', 'Absolutely. Morocco is one of the safest and most welcoming destinations in North Africa. All our tours are private with vetted, licensed guides and 24/7 support throughout your journey.'],
  ['What is the best time to visit Morocco?', 'Spring (March–May) and autumn (September–November) offer the most pleasant weather. The desert is best avoided at midday in high summer, though evenings are always magical.'],
  ['Are your tours fully private?', 'Yes. Unless you choose a small-group day trip, every tour is fully private — your own vehicle, driver-guide and a bespoke pace tailored to you.'],
  ['How do I book and pay?', 'Send us an inquiry or message us on WhatsApp. We confirm your itinerary, take a small deposit to secure dates, and you settle the balance on arrival or via secure transfer.'],
  ['Can you customise an itinerary?', 'Every trip is tailor-made. Tell us your dates, interests and budget (€600–€3500+) and our trip designers will craft a bespoke journey just for you.'],
  ['Do you arrange airport transfers?', 'Yes — private, fixed-price transfers from all Moroccan airports, plus dedicated private drivers for the length of your stay.'],
];

export const AWARDS = [
  "TripAdvisor Travellers' Choice 2024",
  'Certified Local Tour Operator',
  'Luxury Travel Guide — Morocco 2023',
  'Sustainable Tourism Member',
];
