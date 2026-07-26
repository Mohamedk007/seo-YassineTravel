import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Minimal config for the temporary SEO verification harness (no manualChunks,
// which rollup rejects for SSR builds).
export default defineConfig({
	plugins: [react()],
	resolve: { alias: { '@': path.resolve(__dirname, '../src') } },
	// Bundle deps so CJS/ESM interop is handled by rollup rather than by node.
	ssr: { noExternal: true },
	build: { ssr: true, outDir: '../../dist/seo-check', emptyOutDir: true },
});
