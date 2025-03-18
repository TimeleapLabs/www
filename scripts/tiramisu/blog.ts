import { compileFile } from './lib/compile';
import { ContextType } from './lib/visitor';

const shouldIndex: boolean = process.argv.includes('--search-index');

const context: ContextType = {
	currentFile: './src/routes/blog/index.tiramisu',
	templateFile: './src/lib/templates/blog.svelte',
	indexInMeilisearch: {
		enabled: shouldIndex,
		source: 'blogs'
	}
};

compileFile({
	filePath: context.currentFile,
	templateFile: context.templateFile,
	navFilePath: './src/lib/blog/nav/entries.ts',
}, context);
