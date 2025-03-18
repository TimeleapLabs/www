import { compileFile } from './lib/compile';
import { ContextType } from './lib/visitor';

const shouldIndex: boolean = process.argv.includes('--search-index');

const context: ContextType = {
	currentFile: './src/routes/docs/index.tiramisu',
	templateFile: './src/lib/templates/docs.svelte',
	indexInMeilisearch: {
		enabled: shouldIndex,
		source: 'docs'
	}
};
compileFile({
	filePath: context.currentFile,
	templateFile: context.templateFile,
	navFilePath: './src/lib/docs/nav/entries.ts'
}, context);
