import React from 'react';
import { Helmet } from 'react-helmet-async';

function normalizeStructuredData(data) {
	if (!data) return null;
	if (Array.isArray(data)) {
		return data.filter(Boolean);
	}
	return [data];
}

export function StructuredData({ data }) {
	const entries = normalizeStructuredData(data);
	if (!entries || entries.length === 0) return null;

	return (
		<Helmet>
			{entries.map((entry, index) => (
				<script
					key={index}
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
				/>
			))}
		</Helmet>
	);
}

export default StructuredData;
