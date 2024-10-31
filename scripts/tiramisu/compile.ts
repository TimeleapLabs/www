import { compile } from '@timeleap/tiramisu/dist';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { translate } from './visitor';
import type { ContextType } from './visitor';

import path from 'path';

const generateBreadcrumbs = (header: string, templateFile: string, context: ContextType) => {
	const headers: { href: string; title: string }[] = [];
	let currentPath = path.dirname(context.currentFile);

	if (context.currentFile.endsWith('/index.tiramisu')) {
		currentPath = path.dirname(currentPath);
	}

	while (currentPath.includes('src/routes/docs')) {
		const file = path.join(currentPath, 'index.tiramisu');
		const context: ContextType = { currentFile: file, templateFile };
		compileFile(file, templateFile, context);
		headers.unshift({
			href: file
				.replace(/.*src\/routes/, '')
				.replace('/index.tiramisu', '')
				.replace('.tiramisu', ''),
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

export const compileFile = (
	filePath: string,
	templateFile: string,
	context: ContextType = { currentFile: filePath, templateFile }
) => {
	const absolutePath = path.resolve(filePath);

	if (contextCache[absolutePath]) {
		Object.assign(context, contextCache[absolutePath]);
		return;
	}

	contextCache[absolutePath] = context;

	const content = readFileSync(filePath, 'utf-8');
	const cst = compile(content);
	const code = translate(cst, context);

	const template = readFileSync(templateFile, 'utf-8');
	const breadcrumbs = generateBreadcrumbs(
		context.page?.title ?? context.headers?.[0] ?? '',
		templateFile,
		context
	);

	const compiled = template
		.replace('$TITLE', context.page?.title ?? context.headers?.[0] ?? '')
		.replace('$DESCRIPTION', context.page?.description ?? '')
		.replace('$NEXT_PAGE_URL', context.nextPage ?? '')
		.replace('$NEXT_PAGE_TITLE', context.nextPageTitle ?? '')
		.replace('$PREV_PAGE_URL', context.prevPage ?? '')
		.replace('$PREV_PAGE_TITLE', context.prevPageTitle ?? '')
		.replace('$BREADCRUMBS', breadcrumbs)
		.replace('$CONTENT', code);

	const filename = path.basename(filePath, '.tiramisu').replace('.tiramisu', '');
	const dirname =
		filename === 'index' ? path.dirname(filePath) : path.join(path.dirname(filePath), filename);
	const output = path.join(dirname, '+page.svelte');

	mkdirSync(dirname, { recursive: true });
	writeFileSync(output, compiled);
};
