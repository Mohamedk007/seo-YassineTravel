import React from 'react';

/**
 * Short, self-contained question/answer pairs optimised for featured
 * snippets and AI answer engines (Google AI Overviews, ChatGPT, Gemini,
 * Perplexity, Claude) — each answer is a single, quotable sentence rather
 * than a paragraph that needs the surrounding page to make sense.
 *
 * Each answer gets a stable `id`; the page passes the matching `#id` list to
 * <Seo speakable={...}> so the same DOM elements are marked up as
 * SpeakableSpecification, one content source powering both the visible
 * section and the schema.
 */
export function AirportAEOAnswers({ answers, idPrefix }) {
	if (!answers || answers.length === 0) return null;

	return (
		<dl className="grid gap-4 sm:grid-cols-2">
			{answers.map((entry, index) => (
				<div key={entry.question} id={`${idPrefix}-${index}`} className="rounded-xl border border-border bg-secondary/40 p-4">
					<dt className="text-sm font-semibold">{entry.question}</dt>
					<dd className="mt-1.5 text-sm text-muted-foreground">{entry.answer}</dd>
				</div>
			))}
		</dl>
	);
}

/** `#id` selectors for every AEO answer — passed straight to buildSpeakableSchema. */
export function getAeoAnswerSelectors(answers, idPrefix) {
	return (answers || []).map((_, index) => `#${idPrefix}-${index}`);
}
