import { agadirAirport } from './agadir';
import { casablancaAirport } from './casablanca';
import { fesAirport } from './fes';
import { marrakechAirport } from './marrakech';
import { rabatAirport } from './rabat';
import { tangierAirport } from './tangier';

export const AIRPORTS = [
	casablancaAirport,
	marrakechAirport,
	fesAirport,
	rabatAirport,
	tangierAirport,
	agadirAirport,
];

export function getAirportByCode(code) {
	return code ? AIRPORTS.find((airport) => airport.code === code) : undefined;
}

export function getAirportBySlug(slug) {
	return slug ? AIRPORTS.find((airport) => airport.slug === slug) : undefined;
}

export {
	AIRPORT_TRANSFER_FEATURES,
	AIRPORT_TRANSFER_PAGE,
	CUSTOM_TOUR_STEPS,
	CUSTOM_TOURS_PAGE,
	PRIVATE_DRIVER_FEATURES,
	PRIVATE_DRIVER_PAGE,
} from '../services';

export {
	agadirAirport,
	casablancaAirport,
	fesAirport,
	marrakechAirport,
	rabatAirport,
	tangierAirport,
};