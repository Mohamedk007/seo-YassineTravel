import React from 'react';
import { Helmet } from 'react-helmet-async';

function normalizeStructuredData(data) {
	if (!data) return null;
	if (Array.isArray(data)) {
		return data.filter(Boolean);
	}
	return [data];
}

// `<` is escaped so a title or description inside the payload can never close
// the script tag early.
function serialize(entry) {
	return JSON.stringify(entry).replace(/</g, '\u003c');
}

export function StructuredData({ data }) {
	const entries = normalizeStructuredData(data);
	if (!entries || entries.length === 0) return null;

	return (
		<Helmet>
			{entries.map((entry, index) => (
				// The payload must be passed as a plain string child: react-helmet-async
				// keys script tags on `src`/`innerHTML` only and silently drops any
				// script carrying `dangerouslySetInnerHTML`, which left the site with
				// no JSON-LD at all.
				<script key={index} type="application/ld+json">
					{serialize(entry)}
				</script>
			))}
		</Helmet>
	);
}

export default StructuredData;
