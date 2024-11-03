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

type ParamType = {
	named: { name: string; value: string | string[] }[];
	positional: (string | string[])[];
};

export type ContextType = {
	[key: string]: unknown;
	page?: {
		title: string;
		description: string;
	};
	headers?: string[];
	nextPage?: string;
	nextPageTitle?: string;
	prevPage?: string;
	prevPageTitle?: string;
	currentFile: string;
	templateFile: string;
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

const getParamsByName = (params: ParamType, name: string) =>
	params.named.filter((param) => param.name === name);

const functions: {
	[key: string]: (params: ParamType, context: ContextType) => string;
} = {
	meta(params, context) {
		context.page = {
			title: getParamsByName(params, 'title')[0]?.value as string,
			description: (getParamsByName(params, 'description')[0]?.value as string) ?? ''
		};
		if (params.named.some((param) => param.name === 'next')) {
			const currentDir = path.dirname(context.currentFile);
			const next = getParamsByName(params, 'next')[0]?.value ?? '';
			const filePath = path.resolve(currentDir, (next as string).trim() + '.tiramisu');
			const nextContext: ContextType = {
				currentFile: filePath,
				templateFile: context.templateFile
			};
			compileFile(filePath, context.templateFile, nextContext);
			context.nextPage = filePath
				.replace(/.*src\/routes/, '')
				.replace('index.tiramisu', '')
				.replace('.tiramisu', '');
			context.nextPageTitle = nextContext.page?.title ?? nextContext.headers?.[0] ?? '';
		}
		if (params.named.some((param) => param.name === 'prev')) {
			const currentDir = path.dirname(context.currentFile);
			const prev = getParamsByName(params, 'prev')[0]?.value ?? '';
			const filePath = path.resolve(currentDir, (prev as string).trim() + '.tiramisu');
			const prevContext: ContextType = {
				currentFile: filePath,
				templateFile: context.templateFile
			};
			compileFile(filePath, context.templateFile, prevContext);
			context.prevPage = filePath
				.replace(/.*src\/routes/, '')
				.replace('index.tiramisu', '')
				.replace('.tiramisu', '');
			context.prevPageTitle = prevContext.page?.title ?? prevContext.headers?.[0] ?? '';
		}
		return '';
	},
	title(params, context) {
		const size = (getParamsByName(params, 'size')[0]?.value as string)?.trim() ?? '1';
		const header = params.positional.join('');
		context.headers ??= [];
		context.headers.push(header);
		const textSize = textSizeMap[size];
		return `<h${size} class="font-serif ${textSize} mb-4 mt-8">${header}</h${size}>`;
	},
	link(params) {
		const href = (getParamsByName(params, 'to')[0]?.value as string) ?? '';
		const text = params.positional.join('');
		const external = href.startsWith('http') && !href.startsWith('https://timeleap.swiss');
		const icon = external ? '<Icon icon="carbon:launch" class="inline" />' : '';
		return `<a href="${href}" class="hover:text-green-400 transition-colors">${text}${icon}</a>`;
	},
	list(params) {
		const type = getParamsByName(params, 'type')[0]?.value ?? 'unordered';
		const items = getParamsByName(params, 'items').map((item) => item.value);
		const listItems = items.map((item) => `<li>${item}</li>`).join('');
		return type === 'ordered' ? `<ol>${listItems}</ol>` : `<ul>${listItems}</ul>`;
	},
	toc(params, context) {
		const items: string[] = [];
		for (const relativeFile of params.positional) {
			const currentDir = path.dirname(context.currentFile);
			const filePath = path.resolve(currentDir, (relativeFile as string).trim() + '.tiramisu');
			const nextContext: ContextType = {
				currentFile: filePath,
				templateFile: context.templateFile
			};
			compileFile(filePath, context.templateFile, nextContext);
			const href = filePath.replace(/.*src\/routes/, '').replace('.tiramisu', '');
			const title = nextContext.page?.title ?? nextContext.headers?.[0] ?? '';
			items.push(
				`<li class="pl-2"><a href="${href}" class="hover:text-green-400 transition-colors">${title}</a></li>`
			);
		}
		return `
      <div>
        <h5 class="font-serif text-2xl mt-4">Table of Contents</h5>
        <ul class="list-decimal mt-4 pl-8">${items.join('')}</ul>
      </div>
    `;
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
			<Card ${href} class="bg-zinc-900 snap-start min-w-full sm:min-w-[${width}] w-[${width}] max-w-full flex flex-col">
				<h5 class="font-serif text-2xl">${title}</h5>
				<div class="mt-4 text-zinc-500 flex-1">
					${content}
				</div>
				${pillsHtml}
			</Card>`;
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
			.map((child) => (child.trimStart().startsWith('<') ? child : `<p>${child}</p>`))
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
