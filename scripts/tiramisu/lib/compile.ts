import { compile } from '@timeleap/tiramisu/dist';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { translate, filePathToHref } from './visitor';
import type { ContextType } from './visitor';

import path from 'path';

const generateBreadcrumbs = (header: string, templateFile: string, context: ContextType) => {
	const headers: { href: string; title: string }[] = [];
	let currentPath = path.dirname(context.currentFile);

	if (context.currentFile.endsWith('/index.tiramisu')) {
		currentPath = path.dirname(currentPath);
	}

	while (currentPath.includes('src/routes/docs') || currentPath.includes('src/routes/blog')) {
		const file = path.join(currentPath, 'index.tiramisu');
		const context: ContextType = { currentFile: file, templateFile };
		compileFile({ filePath: file, templateFile }, context);
		headers.unshift({
			href: filePathToHref(file),
			title: context.page?.title ?? context.headers?.[0] ?? ''
		});
		currentPath = path.dirname(currentPath);
	}

	headers.push({ href: '', title: header });
	return headers
		.map(
			({ href, title }) =>
				`<a href="${href}" class="hover:text-green-400 transition-colors">${title}</a>`
		)
		.join('<span class="text-zinc-600"> / </span>');
};

const contextCache: Record<string, ContextType> = {};
type CompileParams = {
	filePath: string;
	templateFile: string;
	navFilePath?: string;
};

const description = (text: string) =>
	text.replace(/\n/g, ' ').replace(/"/g, "'").replace(/ +/g, ' ').trim();

export const compileFile = (
	params: CompileParams,
	context: ContextType = { currentFile: params.filePath, templateFile: params.templateFile }
) => {
	const absolutePath = path.resolve(params.filePath);

	if (contextCache[absolutePath]) {
		Object.assign(context, contextCache[absolutePath]);
		return;
	}

	contextCache[absolutePath] = context;

	const content = readFileSync(params.filePath, 'utf-8');
	const cst = compile(content);
	const code = translate(cst, context);

	const template = readFileSync(params.templateFile, 'utf-8');
	const breadcrumbs = generateBreadcrumbs(
		context.page?.title ?? context.headers?.[0] ?? '',
		params.templateFile,
		context
	);

	const imports = context.imports
		?.map((imp) => {
			const component = imp.split('/').pop()?.replace('.svelte', '');
			return `import ${component} from '${imp}';`;
		})
		.join('\n');

	const ogImageText = context.page?.ogImageText?.map((line) => line.trim()).join('\n');

	const OG = ogImageText
		? `ogImageText={\`${ogImageText}\`}` +
			(context.page?.ogImageFontSize ? ` ogImageFontSize={${context.page.ogImageFontSize}}` : '')
		: '';

	const compiled = template
		.replace('$TITLE', (context.page?.title ?? context.headers?.[0] ?? '').trim())
		.replace('$DESCRIPTION', description(context.page?.description ?? ''))
		.replace("('$IMPORTS');", imports ?? '')
		.replace('$BREADCRUMBS', breadcrumbs)
		.replace('$CONTENT', code)
		.replace('$OG', OG)
		.replace('$AUTHOR', context.page?.author ?? '')
		.replace('$CREATED_AT', context.page?.createdAt ?? '');

	const filename = path.basename(params.filePath, '.tiramisu').replace('.tiramisu', '');
	const dirname = filename.endsWith('index')
		? path.dirname(params.filePath)
		: path.join(path.dirname(params.filePath), filename);
	const output = path.join(dirname, '+page.svelte');

	mkdirSync(dirname, { recursive: true });
	writeFileSync(output, compiled);

	if (params.navFilePath && context.nav && context.flatNav) {
		// Add root entry to flatNav
		context.flatNav.unshift({
			href: filePathToHref(params.filePath),
			title: (context.page?.title ?? context.headers?.[0] ?? '').trim()
		});

		const updatedNav = [
			`export const entries = ${JSON.stringify(context.flatNav, null, 2)};`,
			`export const fullNav = ${JSON.stringify(context.nav, null, 2)};`
		].join('\n\n');

		writeFileSync(params.navFilePath, updatedNav);
	}
};
