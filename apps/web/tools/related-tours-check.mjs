/**
 * Guards against a defect found 2026-07-27: getRelatedTours() ignored
 * category entirely, so a day-trip page's "Related tours" section could
 * surface something like a 14-day luxury circuit — confusing for a visitor
 * comparing similar trips. Fixed to prioritize same-category tours first.
 *
 * Bundled via Vite (not plain Node) because the tour catalog transitively
 * imports real image assets. Run with: npm run related-tours:check
 */
import { getRelatedTours, getTours } from '@/data/tours';

function checkLang(lang) {
	const tours = getTours(lang);
	let failures = 0;

	for (const tour of tours) {
		const related = getRelatedTours(tour.slug, lang, 3);
		const sameCategoryAvailable = tours.filter((t) => t.slug !== tour.slug && t.categoryKey === tour.categoryKey).length;
		const sameCategoryReturned = related.filter((t) => t.categoryKey === tour.categoryKey).length;
		const expected = Math.min(3, sameCategoryAvailable);

		if (sameCategoryReturned < expected) {
			failures += 1;
			console.log(`  FAIL  [${lang}] "${tour.title}" (${tour.categoryKey}) — expected ${expected} same-category related tours, got ${sameCategoryReturned}`);
		}
	}

	return failures;
}

function main() {
	const failures = checkLang('en') + checkLang('fr');

	if (failures > 0) {
		console.log(`\n[related-tours-check] ${failures} FAILURE(s) — fix before committing.`);
		process.exitCode = 1;
		return;
	}

	console.log('[related-tours-check] all tours surface same-category related tours first.');
}

main();
