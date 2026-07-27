/**
 * Guards against a defect found 2026-07-27: several newly-added day-trip
 * tours had taglines (which double as the page's <meta description>, via
 * <Seo description={tour.tagline}/>) that never named the tour's own
 * destination and, worse, were near-identical to each other's — e.g. Imlil,
 * Ourika and Ouirgane all shipped "High Atlas ... Berber villages" phrasing
 * that could describe any of the three. Google can flag near-duplicate
 * descriptions across pages of the same site, and a description that could
 * belong to several different pages defeats the point of having one.
 *
 * Two checks, run per language:
 *  1. HARD FAIL — no two different tours may have near-duplicate taglines
 *     (word-set Jaccard similarity above SIMILARITY_THRESHOLD). This is the
 *     objective, no-false-positives version of the rule.
 *  2. WARNING ONLY — a tagline should contain at least one distinctive word
 *     from its own title. Printed for review rather than failing the build,
 *     since a few existing tours legitimately use a well-known synonym
 *     instead of repeating the name (e.g. "Red City" for Marrakech).
 *
 * Run with: npm run tours:check --prefix apps/web
 */
import { SUPPORTED_LANGUAGES } from '../src/seo/sitemap.js';
import { getTourEntries } from './lib/content-entries.mjs';

const SIMILARITY_THRESHOLD = 0.5;

const STOPWORDS = new Set([
	'a', 'an', 'the', 'and', 'or', 'of', 'in', 'on', 'at', 'to', 'from', 'for', 'with', 'your', 'you',
	'is', 'are', 'this', 'that', 'just', 'day', 'days', 'trip', 'tour', 'tours', 'morocco',
	'marrakech', 'private', 'le', 'la', 'les', 'de', 'des', 'du', 'un', 'une', 'et', 'ou', 'dans', 'sur',
	'au', 'aux', 'depuis', 'pour', 'avec', 'votre', 'vous', 'est', 'ce', 'cette', 'jour', 'jours',
	'excursion', 'circuit', 'privé', 'privée',
]);

function tokenize(text) {
	return new Set(
		String(text || '')
			.toLowerCase()
			.replace(/['’]/g, ' ')
			.split(/[^a-zàâäéèêëïîôöùûüç0-9]+/i)
			.filter((word) => word.length >= 4 && !STOPWORDS.has(word))
	);
}

function jaccard(a, b) {
	if (a.size === 0 || b.size === 0) return 0;
	let intersection = 0;
	for (const word of a) if (b.has(word)) intersection += 1;
	const union = a.size + b.size - intersection;
	return intersection / union;
}

async function checkLang(lang, entries) {
	let failures = 0;
	let warnings = 0;

	const withTokens = entries.map((entry) => ({
		id: entry.id,
		title: entry.titleByLang[lang],
		description: entry.descriptionByLang[lang],
		titleWords: tokenize(entry.titleByLang[lang]),
		descriptionWords: tokenize(entry.descriptionByLang[lang]),
	}));

	for (let i = 0; i < withTokens.length; i += 1) {
		const a = withTokens[i];
		let hasOwnWord = false;
		for (const word of a.titleWords) {
			if (a.descriptionWords.has(word)) {
				hasOwnWord = true;
				break;
			}
		}
		if (!hasOwnWord) {
			warnings += 1;
			console.log(`  warn  [${lang}] "${a.title}" — description doesn't repeat any distinctive word from the title`);
			console.log(`          description: "${a.description}"`);
		}

		for (let j = i + 1; j < withTokens.length; j += 1) {
			const b = withTokens[j];
			const similarity = jaccard(a.descriptionWords, b.descriptionWords);
			if (similarity > SIMILARITY_THRESHOLD) {
				failures += 1;
				console.log(`  FAIL  [${lang}] near-duplicate descriptions (similarity ${similarity.toFixed(2)}):`);
				console.log(`          "${a.title}" — "${a.description}"`);
				console.log(`          "${b.title}" — "${b.description}"`);
			}
		}
	}

	return { failures, warnings };
}

async function main() {
	const entries = await getTourEntries();
	let totalFailures = 0;
	let totalWarnings = 0;

	for (const lang of SUPPORTED_LANGUAGES) {
		const { failures, warnings } = await checkLang(lang, entries);
		totalFailures += failures;
		totalWarnings += warnings;
	}

	if (totalWarnings > 0) {
		console.log(`\n[tours:check] ${totalWarnings} warning(s) — review before committing, but not build-blocking.`);
	}

	if (totalFailures > 0) {
		console.log(`\n[tours:check] ${totalFailures} FAILURE(s) — fix before committing.`);
		process.exitCode = 1;
		return;
	}

	console.log(`\n[tours:check] all ${entries.length} tours passed the duplicate-description check.`);
}

await main();
