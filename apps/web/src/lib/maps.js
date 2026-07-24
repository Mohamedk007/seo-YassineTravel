// Both helpers use Google's public, key-free URL formats — no Maps API key
// or billing account needed. `output=embed` and `/maps/dir/` are documented,
// stable URL patterns rather than the paid JS/Embed APIs.

export function buildGoogleMapsRouteUrl(stops = []) {
	if (!stops || stops.length === 0) return null;
	const path = stops.map((stop) => encodeURIComponent(stop)).join('/');
	return `https://www.google.com/maps/dir/${path}`;
}

export function buildGoogleMapsEmbedUrl(query) {
	if (!query) return null;
	return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
