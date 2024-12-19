import { compileFile } from './lib/compile';

compileFile({
	filePath: './src/routes/docs/index.tiramisu',
	templateFile: './src/lib/templates/docs.svelte',
	navFilePath: './src/lib/docs/nav/entries.ts'
});
