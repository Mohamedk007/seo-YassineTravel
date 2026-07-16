import { dayTripToEssaouiraFromMarrakech, marrakechDayTrips } from './day-trips';
import { agafayLuxuryCamp, marrakechMerzougaDesert } from './desert-tours';
import { grandTourMorocco, imperialCitiesSahara } from './luxury-tours';
import { privateFesCity } from './private-tours';
import { EXCLUDED, INCLUDED } from './shared';

export const TOURS = [
	imperialCitiesSahara,
	marrakechMerzougaDesert,
	privateFesCity,
	marrakechDayTrips,
	dayTripToEssaouiraFromMarrakech,
	grandTourMorocco,
	agafayLuxuryCamp,
];

export { EXCLUDED, INCLUDED };