import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const scriptPath = resolve(process.cwd(), 'tools', 'generate-llms.js');

if (!existsSync(scriptPath)) {
	console.log('[build] Skipping optional tools/generate-llms.js');
	process.exit(0);
}

await import(scriptPath);