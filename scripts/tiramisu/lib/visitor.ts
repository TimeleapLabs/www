import {
	ArrayItem,
	ArrayValue,
	FunctionCall,
	MixedText,
	NamedParameter,
	Paragraph,
	Parameter,
	Parameters,
	PureText,
	Tiramisu,
	type Node
} from '@timeleap/tiramisu/dist/types/nodes';

import path from 'path';
import slugify from 'slugify';

type ParamType = {
	named: { name: string; value: string | string[] }[];
	positional: (string | string[])[];
};

type GridItem = {
	href: string;
	title: string;
	author: string;
	createdAt: string;
};

export type NavEntry = { href: string; title: string; nav?: NavEntry[] };

export type ContextType = {
	[key: string]: unknown;
	page?: {
		title: string;
		description: string;
		ogImageText: string[];
		ogImageFontSize: string;
		author?: string;
		createdAt?: string;
	};
	headers?: string[];
	currentFile: string;
	templateFile: string;
	imports?: string[];
	nav?: NavEntry;
	flatNav?: NavEntry[];
};

const textSizeMap = {
	'1': 'text-4xl md:text-5xl',
	'2': 'text-3xl md:text-4xl',
	'3': 'text-2xl md:text-3xl',
	'4': 'text-xl md:text-2xl',
	'5': 'text-base',
	'6': 'text-sm'
};

const pillTexts = {
	success: 'Success',
	done: 'Done',
	progress: 'In Progress',
	pending: 'Pending'
};

const pillColors = {
	default: 'bg-gray-500',
	success: 'bg-green-500',
	done: 'bg-green-500',
	progress: 'bg-blue-500',
	pending: 'bg-gray-500'
};

export const filePathToHref = (filePath: string) =>
	filePath
		.replace(/.*src\/routes/, '')
		.replace('.tiramisu', '')
		.replace('index', '')
		.replace(/\/$/, '');

const deIndentCode = (code: string) => {
	const rawLines = code.split('\n');
	const lines = rawLines[0].match(/^\s*$/) ? rawLines.slice(1, -1) : rawLines.slice(0, -1);

	if (lines[lines.length - 1].match(/^\s*$/)) {
		lines.pop();
	}

	const indent = lines[0].match(/^\s*/)?.[0] ?? '';
	const indentRegex = new RegExp(`^${indent}`);
	const clean = lines.map((line) => line.replace(indentRegex, '')).join('\n');

	return clean.replaceAll('`', '\\`').replaceAll('${', '\\${');
};

const getParamsByName = (params: ParamType, name: string) =>
	params.named.filter((param) => param.name === name);

const functions: {
	[key: string]: (params: ParamType, context: ContextType) => string;
} = {
	meta(params, context) {
		context.page = {
			title: (getParamsByName(params, 'title')[0]?.value as string)?.trim(),
			description: (getParamsByName(params, 'description')[0]?.value as string)?.trim() ?? '',
			ogImageText: (getParamsByName(params, 'ogImageText')[0]?.value as string[]) ?? [],
			ogImageFontSize:
				(getParamsByName(params, 'ogImageFontSize')[0]?.value as string)?.trim() ?? '32',
			author: (getParamsByName(params, 'author')[0]?.value as string)?.trim() ?? '',
			createdAt: (getParamsByName(params, 'createdAt')[0]?.value as string)?.trim() ?? ''
		};
		return '';
	},
	tep(params) {
		const author = (getParamsByName(params, 'author')[0]?.value as string)?.trim() ?? '';
		const status = (getParamsByName(params, 'status')[0]?.value as string)?.trim() ?? '';
		const type = (getParamsByName(params, 'type')[0]?.value as string)?.trim() ?? '';
		const createdAt = (getParamsByName(params, 'createdAt')[0]?.value as string)?.trim() ?? '';
		const updatedAt = (getParamsByName(params, 'updatedAt')[0]?.value as string)?.trim() ?? '';
		const discussion = (getParamsByName(params, 'discussion')[0]?.value as string)?.trim() ?? '';

		return `
			<Tep
				author="${author}"
				status="${status}"
				type="${type}"
				createdAt="${createdAt}"
				updatedAt="${updatedAt}"
				discussion="${discussion}"
			/>`;
	},
	title(params, context) {
		const size = (getParamsByName(params, 'size')[0]?.value as string)?.trim() ?? '1';
		const header = params.positional.join('');
		const id = (getParamsByName(params, 'id')[0]?.value as string)?.trim() ?? slugify(header);
		context.headers ??= [];
		context.headers.push(header);
		const textSize = textSizeMap[size];
		return `<h${size} class="docs-heading font-serif ${textSize} -mb-4 mt-8" id="${id}">${header}</h${size}>`;
	},
	link(params) {
		const href = (getParamsByName(params, 'to')[0]?.value as string) ?? '';
		const text = params.positional.join('');
		const status = (getParamsByName(params, 'status')[0]?.value as string)?.trim() ?? '';

		if (status.toLowerCase() === 'coming soon') {
			return `
				<span class="inline-flex gap-1 items-center border-b border-zinc-500 text-zinc-400 cursor-not-allowed group relative">
					<span>${text}</span>
					<div class="absolute bottom-full left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-sm bg-zinc-800 text-zinc-200 rounded-md whitespace-nowrap">
						This article exists in the future, and timeleaping is not supported yet.
					</div>
				</span>
			`;
		}

		const external = href.startsWith('http') && !href.startsWith('https://timeleap.swiss');
		const icon = external ? "<ExternalLink size={'1em'} />" : '';
		const target = external ? 'target="_blank" rel="noopener noreferrer"' : '';
		return `<a href="${href}" ${target} class="hover:text-green-400 transition-colors inline-flex gap-1 items-center border-b border-zinc-500">${text}${icon}</a>`;
	},
	list(params) {
		const type = getParamsByName(params, 'type')[0]?.value ?? 'unordered';
		const items = getParamsByName(params, 'items').map((item) => item.value);
		const listItems = items.map((item) => `<li class="mb-3">${item}</li>`).join('');
		return type === 'ordered'
			? `<ol class="list-decimal list-inside">${listItems}</ol>`
			: `<ul class="list-disc list-inside">${listItems}</ul>`;
	},
	toc(params, context) {
		const unordered = getParamsByName(params, 'unordered')[0]?.value === 'Yes';
		const variant = getParamsByName(params, 'variant')[0]?.value ?? 'list';
		const listItems: string[] = [];
		const gridItems: GridItem[] = [];

		context.flatNav ??= [];

		context.nav = {
			href: filePathToHref(context.currentFile),
			title: (context.page?.title ?? context.headers?.[0] ?? '').trim(),
			nav: []
		};

		for (const relativeFile of params.positional) {
			const currentDir = path.dirname(context.currentFile);
			const filePath = path.resolve(currentDir, (relativeFile as string).trim() + '.tiramisu');
			const nextContext: ContextType = {
				currentFile: filePath,
				templateFile: context.templateFile,
				flatNav: context.flatNav
			};

			const flatNavEntry = { href: '', title: '' };
			context.flatNav.push(flatNavEntry);

			compileFile({ filePath, templateFile: context.templateFile }, nextContext);
			const href = filePathToHref(filePath);
			const title = (nextContext.page?.title ?? nextContext.headers?.[0] ?? '').trim();
			listItems.push(
				`<li class="pl-2"><a href="${href}" class="hover:text-green-400 transition-colors">${title}</a></li>`
			);
			gridItems.push({
				href,
				title,
				author: nextContext.page?.author ?? '',
				createdAt: nextContext.page?.createdAt ?? ''
			});

			if (nextContext.nav) {
				context.nav.nav?.push(nextContext.nav);
			} else {
				context.nav.nav?.push({ href, title });
			}

			flatNavEntry.href = href;
			flatNavEntry.title = title;
		}

		if (variant === 'list') {
			const listType = unordered ? 'list-disc' : 'list-decimal';

			return `
      <div>
        <h5 class="font-serif text-2xl mt-4">Table of Contents</h5>
        <ul class="${listType} mt-4 pl-8">${listItems.join('')}</ul>
      </div>
    `;
		} else if (variant === 'grid') {
			const gridItemsHtml = gridItems
				.map(
					(item) =>
						`<TocArticle
								href="${item.href}"
								title="${item.title}"
								author="${item.author}"
								createdAt="${item.createdAt}" />`
				)
				.join('');
			return `
		<div>
		<h5 class="font-serif text-2xl mt-4">Table of Contents</h5>
			<div class="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8 mt-4">
				${gridItemsHtml}
			</div>
			</div>
		`;
		} else {
			throw new Error(`Unknown TOC variant: ${variant}`);
		}
	},
	alert(params) {
		const title = getParamsByName(params, 'title')[0]?.value ?? '';
		const type = getParamsByName(params, 'type')[0]?.value ?? '';
		const content = params.positional.join(', ');
		return `<Alert title="${title}" type="${type}"> ${content} </Alert>`;
	},
	card(params) {
		const title = getParamsByName(params, 'title')[0]?.value ?? '';
		const link = getParamsByName(params, 'link')[0]?.value ?? '';
		const width = getParamsByName(params, 'width')[0]?.value ?? '1/2';
		const pills = getParamsByName(params, 'pills')
			.map((pill) => pill.value)
			.join('');

		const content = params.positional.join(', ');
		const href = link ? `href="${link}"` : '';
		const pillsHtml = pills ? `<div class="mt-4">${pills}</div>` : '';

		// FIXME: Add support for kebab-case variables
		return `
			<TiltCard ${href} class="bg-zinc-950 border border-zinc-800 flex flex-col h-full" containerClass="snap-start min-w-full sm:min-w-[${width}] w-[${width}] max-w-full">
				<h5 class="font-serif text-2xl">${title}</h5>
				<div class="mt-4 text-zinc-500 flex-1">
					${content}
				</div>
				${pillsHtml}
			</TiltCard>`;
	},
	carousel(params) {
		const items = params.positional.join('');
		return `
			<div class="py-8">
				<Carousel class="!gap-16">${items}</Carousel>
			</div>`;
	},
	pill(params) {
		const type = (getParamsByName(params, 'type')[0]?.value as string)?.trim() ?? 'default';
		const color = pillColors[type] ?? pillColors.default;
		const text = params.positional.join('') || pillTexts[type];

		return `
			<div class="inline-block px-2 py-1 rounded-full text-xs font-semibold ${color} text-white">
				${text}
			</div>`;
	},
	small(params) {
		const text = params.positional.join('');
		return `<div class="text-sm text-zinc-400">${text}</div>`;
	},
	bold(params) {
		const text = params.positional.join('');
		return `<span class="font-semibold">${text}</span>`;
	},
	italic(params) {
		const text = params.positional.join('');
		return `<span class="italic">${text}</span>`;
	},
	svelte(params, context) {
		const fileName = params.positional[0].toString().trim();
		context.imports ??= [];
		context.imports.push(fileName);
		const component = fileName.split('/').pop()?.replace('.svelte', '') ?? '';
		return `<${component}/>`;
	},
	table(params) {
		const header = getParamsByName(params, 'header')
			.map((header) => header.value)
			.pop() as string[];

		const rows = getParamsByName(params, 'row').map((row) => row.value) as string[][];
		const headerHtml = header
			.map(
				(header) =>
					`<th class="px-4 py-2 text-left border-b border-zinc-700 bg-zinc-900">${header}</th>`
			)
			.join('');

		const trClass = (i: number) => (i < rows.length - 1 ? 'class="border-b border-zinc-700"' : '');

		const rowHtml = rows
			.map(
				(row, i) =>
					`<tr ${trClass(i)}>${row.map((cell) => `<td class="px-4 py-2">${cell}</td>`).join('')}</tr>`
			)
			.join('');

		return `
			<div class="overflow-x-auto border border-zinc-800 rounded-2xl bg-gradient-to-r from-zinc-950 to-zinc-900">
  			<table class="min-w-full border-collapse">
					<thead>
						<tr class="px-4 py-2 text-left">${headerHtml}</tr>
					</thead>
					<tbody>
						${rowHtml}
					</tbody>
				</table>
			</div>`;
	},
	code(params) {
		const language = getParamsByName(params, 'language')[0]?.value ?? 'plaintext';
		const codeIndented = getParamsByName(params, 'content')[0]?.value.toString() ?? '';
		const code = deIndentCode(codeIndented);
		return `<Code lineNumbers lang="${language}" code={\`${code}\`}></Code>`;
	},
	inlineCode(params) {
		const code = params.positional.join(', ').trim();
		return `<InlineCode>${code}</InlineCode>`;
	},
	mermaid(params) {
		const codeIndented = params.positional.join(',');
		const code = deIndentCode(codeIndented);
		return `<Mermaid code={\`${code}\`}></Mermaid>`;
	},
	image(params) {
		const src = getParamsByName(params, 'src')[0]?.value ?? '';
		const alt = getParamsByName(params, 'alt')[0]?.value ?? '';
		const caption = getParamsByName(params, 'caption')[0]?.value ?? alt;
		const tilt = (getParamsByName(params, 'tilt')[0]?.value as string)?.trim() === 'true';
		return tilt
			? `<TiltImage src="${src}" alt="${alt}" caption="${caption}" />`
			: `
			<div class="flex flex-col items-center">
				<img src="${src}" alt="${alt}" class="rounded-lg mb-4" />
				<p class="text-zinc-400 text-xs">${caption}</p>
			</div>
		`;
	},
	pullQuote(params) {
		const content = params.positional.join('');
		return `<aside class="min-h-10 flex items-center border-l-4 border-neutral-400 pl-4 italic text-neutral-300" >
      <p>“ ${content}</p>
    </aside>`;
	}
};

const translateParam = (param: Node, context: ContextType) => {
	if (param instanceof ArrayValue) {
		return param.values.map((value) => translate(value, context));
	}

	return translate(param, context);
};

const parseFunctionParameters = (node: Parameters, context: ContextType): ParamType => {
	const positional = node.parameters
		.filter((param) => !(param instanceof NamedParameter))
		.map((param) => translateParam(param as Parameter, context));

	const named = node.parameters
		.filter((param) => param instanceof NamedParameter)
		.map((param) => ({
			name: param.name,
			value: Array.isArray(param.value)
				? param.value.map((child) => translateParam(child, context)).join('')
				: translateParam(param.value, context)
		}));

	return { named, positional };
};

export const translate = (node: Node, context: ContextType): string => {
	if (typeof node === 'string') {
		return node;
	}

	if (node instanceof Tiramisu) {
		return node.children
			.map((child) => translate(child, context))
			.filter((child) => child.match(/\S/))
			.map((child) =>
				child.trimStart().startsWith('<') ? child : `<p class="text-zinc-300">${child}</p>`
			)
			.join('');
	}

	if (node instanceof Paragraph) {
		return node.children.map((child) => translate(child, context)).join('');
	}

	if (node instanceof MixedText) {
		return node.shards.map((shard) => translate(shard, context)).join('');
	}

	if (node instanceof PureText) {
		return node.toString();
	}

	if (node instanceof FunctionCall) {
		const name = node.functionName;
		const parameters = parseFunctionParameters(node.parameters, context);

		if (functions[name]) {
			return functions[name](parameters, context);
		}

		throw new Error(`Unknown function name: ${name}`);
	}

	if (node instanceof ArrayItem) {
		return node.value.map((child) => translate(child, context)).join('');
	}

	if (node instanceof Parameter) {
		return Array.isArray(node.value)
			? node.value.map((child) => translate(child, context)).join('')
			: translate(node.value, context);
	}

	throw new Error(`Unknown node type: ${node.constructor.name}`);
};

import { compileFile } from './compile';
