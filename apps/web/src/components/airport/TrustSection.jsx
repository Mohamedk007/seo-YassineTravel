import React from 'react';
import { FeatureGrid } from './FeatureGrid';

/**
 * E-E-A-T trust signals (licensed operator, years of experience, insurance,
 * 24/7 support, verified reviews) — built on the same FeatureGrid primitive
 * as every other icon+title+body section, fed by the shared trust dataset in
 * transferPolicy.*.js so the claims stay identical (and identically true)
 * across every airport page.
 */
export function TrustSection({ items }) {
	return <FeatureGrid items={items} columns={3} />;
}
