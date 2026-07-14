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
			{ label: 'Airport Transfers', to: '/airport-transfers' },
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