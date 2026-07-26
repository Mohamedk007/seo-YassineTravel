// Backward-compatible entry point. The implementation now lives in `schema.js`
// (the canonical module name for this patch); this shim keeps every existing
// `@/seo/schemas` import working unchanged.
export * from './schema';
