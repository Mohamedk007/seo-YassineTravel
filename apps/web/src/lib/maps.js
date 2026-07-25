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

// Embeds a multi-stop route (not just a single point) using Google's legacy
// saddr/daddr + "to:" waypoint syntax, still supported with output=embed —
// no API key needed, unlike the newer Directions/Embed APIs.
export function buildGoogleMapsRouteEmbedUrl(stops = []) {
	if (!stops || stops.length < 2) return null;
	const [start, ...rest] = stops;
	const destination = rest.map((stop) => encodeURIComponent(stop)).join('+to:');
	return `https://www.google.com/maps?saddr=${encodeURIComponent(start)}&daddr=${destination}&output=embed`;
}
