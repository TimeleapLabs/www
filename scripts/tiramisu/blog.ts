import { compileFile } from './lib/compile';

compileFile({
	filePath: './src/routes/blog/index.tiramisu',
	templateFile: './src/lib/templates/blog.svelte',
	navFilePath: './src/lib/blog/nav/entries.ts'
});
