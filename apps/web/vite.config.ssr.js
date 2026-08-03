import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Server bundle for entry-server.jsx (see server.js at the repo root).
// Mirrors tools/seo-check.vite.config.js's conventions: no manualChunks
// (rollup rejects it for SSR builds), deps bundled so Node doesn't need to
// resolve CJS/ESM interop itself.
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	ssr: {
		noExternal: true,
	},
	build: {
		ssr: 'src/entry-server.jsx',
		outDir: '../../dist/ssr',
		emptyOutDir: true,
	},
});
