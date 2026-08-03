// Company-wide airport transfer policy content — written once, reused on every
// airport page via FeatureGrid-style components. This is the same service,
// same drivers, same insurance and same booking process regardless of which
// airport a traveller lands at, so repeating it verbatim across pages is
// correct (consistent policy info, like a footer) rather than "thin/duplicate
// content" in the SEO-penalty sense — what must stay unique per page is the
// location-specific content in transferContent.en.js, which this pairs with.
export const TRANSFER_POLICY = {
	whyChooseUs: [
		{
			icon: 'ShieldCheck',
			title: 'Licensed & fully insured',
			body: 'Every transfer is operated by a licensed Moroccan tour operator with commercial passenger insurance, so you are covered from the moment you get in the car.',
		},
		{
			icon: 'Clock',
			title: 'Flight-tracked pickups',
			body: 'We monitor your flight number in real time, so a delayed or early landing never means a missed pickup or an extra fee.',
		},
		{
			icon: 'Users',
			title: 'Private, door-to-door',
			body: 'No shared shuttles and no other passengers — your driver takes you directly from the arrivals hall to your riad or hotel.',
		},
		{
			icon: 'MessageCircle',
			title: '24/7 human support',
			body: 'A real person answers on WhatsApp or by phone at any hour, before and during your trip, in English and French.',
		},
	],
	vehicleOptions: [
		{
			icon: 'Car',
			title: 'Sedan',
			body: 'Comfortable, air-conditioned sedans for up to 3 passengers with luggage — the most common choice for solo travellers and couples.',
		},
		{
			icon: 'Users',
			title: 'SUV',
			body: 'Extra space and ground clearance for up to 4 passengers, popular for families and anyone with larger suitcases.',
		},
		{
			icon: 'Car',
			title: 'Van / minibus',
			body: 'Seats 5–8 passengers with generous luggage space — the standard choice for groups and multi-generation families.',
		},
		{
			icon: 'Star',
			title: 'Luxury vehicle',
			body: 'Premium sedans and SUVs with a uniformed driver for travellers who want an elevated first and last impression of Morocco.',
		},
	],
	meetAndGreet: {
		title: 'Meet & greet at arrivals',
		body: 'Your driver waits inside the arrivals hall holding a name board with your name clearly printed, right where passengers exit customs — you will not be asked to find a car park or a pickup zone outside the terminal.',
	},
	flightMonitoring: {
		title: 'Live flight monitoring',
		body: 'We track your flight number from departure to landing. If your flight is delayed, re-routed or arrives early, your pickup time adjusts automatically — you never need to call and explain a schedule change.',
	},
	waitingTimePolicy: {
		title: 'Waiting time policy',
		body: 'International arrivals include 60 minutes of free waiting time after landing to clear immigration, baggage and customs; domestic arrivals include 30 minutes. This is tracked from your actual landing time, not your scheduled time.',
	},
	childSeats: {
		title: 'Child & infant seats',
		body: 'Rear-facing infant seats, forward-facing child seats and booster seats are all available on request at no extra charge — just tell us your children’s ages when you book.',
	},
	accessibility: {
		title: 'Accessibility',
		body: 'Tell us in advance about any mobility needs, wheelchairs or additional assistance required, and we will match you with a suitable vehicle and a driver briefed to help at the curb and with luggage.',
	},
	hotelPickup: {
		title: 'Hotel & riad pickup',
		body: 'Return transfers are collected directly from your riad or hotel lobby. Medina addresses without car access are met at the nearest reachable point, and your driver calls ahead to arrange the last few hundred metres on foot if needed.',
	},
	hotelDropoff: {
		title: 'Hotel & riad drop-off',
		body: 'On arrival, your driver takes you to your accommodation’s door wherever a vehicle can reach it. For riads deep inside a pedestrian medina, we coordinate with the property so a porter or staff member meets you at the nearest access point.',
	},
	businessTravel: {
		title: 'Business travel',
		body: 'Punctual, professional transfers for conferences and meetings, with flight tracking that protects tight schedules, invoicing on request, and drivers who keep the journey quiet and distraction-free when you need to work.',
	},
	familyTravel: {
		title: 'Family travel',
		body: 'Spacious vehicles, free child seats, and drivers experienced with young children and tired travellers after a long flight — we build in a little extra time so nobody feels rushed.',
	},
	luxuryTransfers: {
		title: 'Luxury transfers',
		body: 'Premium vehicles, a uniformed driver, chilled water on board and a meet-and-greet experience designed for travellers who want their trip to feel elevated from the very first minute.',
	},
	safety: {
		title: 'Safety on every journey',
		body: 'All vehicles are regularly inspected and maintained, drivers follow speed and rest guidelines on longer routes, and every booking is tracked internally from pickup to drop-off.',
	},
	licensedDrivers: {
		title: 'Licensed, experienced drivers',
		body: 'Every driver holds a professional Moroccan driving licence, is vetted before joining our team, and is experienced with airport pickups, city traffic and, where relevant, mountain or desert roads.',
	},
	insurance: {
		title: 'Commercial passenger insurance',
		body: 'All transfers are covered by commercial passenger liability insurance, on top of standard vehicle insurance — the coverage a private, unlicensed taxi typically will not offer.',
	},
	bookingProcess: [
		{ step: 1, title: 'Share your details', body: 'Send your flight number, arrival date and passenger count via WhatsApp or the booking form.' },
		{ step: 2, title: 'Get instant confirmation', body: 'We confirm your driver, vehicle and pickup point, usually within a few hours.' },
		{ step: 3, title: 'Meet your driver', body: 'Your driver waits at arrivals with a name board, tracking your flight in real time.' },
		{ step: 4, title: 'Travel in comfort', body: 'Sit back for the private, door-to-door drive to your riad or hotel.' },
	],
	cancellationPolicy: {
		title: 'Flexible cancellation',
		body: 'Cancel or reschedule free of charge up to 24 hours before pickup. Changes inside 24 hours are handled case by case — message us as soon as your plans change and we will do what we can to accommodate it.',
	},
	paymentMethods: {
		title: 'Payment methods',
		body: 'Pay in cash (Moroccan dirham or euros) directly to your driver, or settle by secure bank transfer or card online in advance — whichever is easiest for you.',
	},
	availableLanguages: {
		title: 'Languages spoken',
		body: 'Our drivers and support team communicate comfortably in English, French and Arabic, with Spanish available on request for some drivers.',
	},
	trust: [
		{ icon: 'ShieldCheck', title: 'Licensed tourism company', body: 'A registered Moroccan tour operator, not an informal taxi arrangement.' },
		{ icon: 'Award', title: 'Since 2008', body: 'Over 18 years organising private transfers and tours across Morocco.' },
		{ icon: 'Users', title: 'Local, family-run team', body: 'Born-and-raised Moroccan founders who know these roads and airports personally.' },
		{ icon: 'HeartHandshake', title: 'Commercial insurance', body: 'Passenger liability cover on every booking, not just standard vehicle insurance.' },
		{ icon: 'Clock', title: '24/7 support', body: 'A real person reachable at any hour before, during and after your transfer.' },
		{ icon: 'Star', title: 'Verified traveller reviews', body: 'Real, attributed feedback from past clients — see the reviews below.' },
	],
	comparison: {
		criteria: ['price', 'comfort', 'safety', 'waitingTime', 'luggage', 'nightAvailability', 'language', 'doorToDoor', 'familySuitability', 'accessibility'],
		modes: {
			privateTransfer: {
				label: 'Private transfer',
				price: 'Fixed, agreed in advance',
				comfort: 'High — private vehicle, no stops',
				safety: 'Licensed driver, commercial insurance',
				waitingTime: 'None — driver waits for you',
				luggage: 'Unlimited space for your vehicle size',
				nightAvailability: 'Yes, 24/7',
				language: 'English, French, Arabic',
				doorToDoor: 'Yes',
				familySuitability: 'Excellent — child seats included',
				accessibility: 'Vehicle matched to your needs',
			},
			taxi: {
				label: 'Airport taxi',
				price: 'Often negotiated on the spot',
				comfort: 'Variable, older vehicles common',
				safety: 'Licensed but no commercial passenger insurance',
				waitingTime: 'Queue at the taxi rank',
				luggage: 'Limited, depends on the car',
				nightAvailability: 'Reduced availability late at night',
				language: 'Arabic and French most common',
				doorToDoor: 'Usually yes',
				familySuitability: 'Limited — child seats rarely available',
				accessibility: 'Not guaranteed',
			},
			rideHailing: {
				label: 'Ride-hailing app',
				price: 'Can surge at peak arrival times',
				comfort: 'Depends on driver rating',
				safety: 'Driver identity verified in-app',
				waitingTime: 'Depends on driver availability nearby',
				luggage: 'Standard car boot space',
				nightAvailability: 'Coverage still limited outside major cities',
				language: 'Not guaranteed',
				doorToDoor: 'Yes',
				familySuitability: 'No child seats provided',
				accessibility: 'Not guaranteed',
			},
			publicTransport: {
				label: 'Bus / train + taxi',
				price: 'Cheapest option',
				comfort: 'Low with luggage',
				safety: 'Generally safe, unattended transfers',
				waitingTime: 'Fixed timetables, possible long waits',
				luggage: 'Awkward on buses and platforms',
				nightAvailability: 'Very limited after early evening',
				language: 'Arabic and French, little English',
				doorToDoor: 'No — a further taxi is usually needed',
				familySuitability: 'Difficult with young children',
				accessibility: 'Rarely accessible',
			},
		},
	},
};
