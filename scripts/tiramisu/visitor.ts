import {
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
	named: { name: string; value: string }[];
	positional: string[];
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
};

const textSizeMap = {
	'1': 'text-5xl',
	'2': 'text-5xl',
	'3': 'text-3xl',
	'4': 'text-lg',
	'5': 'text-base',
	'6': 'text-sm'
};

const getParamsByName = (params: ParamType, name: string) =>
	params.named.filter((param) => param.name === name);

const functions: {
	[key: string]: (params: ParamType, context: ContextType) => string;
} = {
	meta(params, context) {
		context.page = {
			title: getParamsByName(params, 'title')[0]?.value,
			description: getParamsByName(params, 'description')[0]?.value ?? ''
		};
		if (params.named.some((param) => param.name === 'next')) {
			const currentDir = path.dirname(context.currentFile);
			const next = getParamsByName(params, 'next')[0]?.value ?? '';
			const filePath = path.resolve(currentDir, next.trim() + '.tiramisu');
			const nextContext: ContextType = { currentFile: filePath };
			compileFile(filePath, nextContext);
			context.nextPage = filePath
				.replace(/.*src\/routes/, '')
				.replace('index.tiramisu', '')
				.replace('.tiramisu', '');
			context.nextPageTitle = nextContext.page?.title ?? nextContext.headers?.[0] ?? '';
		}
		if (params.named.some((param) => param.name === 'prev')) {
			const currentDir = path.dirname(context.currentFile);
			const prev = getParamsByName(params, 'prev')[0]?.value ?? '';
			const filePath = path.resolve(currentDir, prev.trim() + '.tiramisu');
			const prevContext: ContextType = { currentFile: filePath };
			compileFile(filePath, prevContext);
			context.prevPage = filePath
				.replace(/.*src\/routes/, '')
				.replace('index.tiramisu', '')
				.replace('.tiramisu', '');
			context.prevPageTitle = prevContext.page?.title ?? prevContext.headers?.[0] ?? '';
		}
		return '';
	},
	title(params, context) {
		const size = getParamsByName(params, 'size')[0]?.value ?? '1';
		const header = params.positional.join('');
		context.headers ??= [];
		context.headers.push(header);
		const textSize = textSizeMap[size];
		return `<h${size} class="font-serif ${textSize}">${header}</h${size}>`;
	},
	link(params) {
		const href = getParamsByName(params, 'to')[0]?.value ?? '';
		const text = params.positional.join('');
		return `<a href="${href}" class="hover:text-green-400 transition-colors">${text}</a>`;
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
			const filePath = path.resolve(currentDir, relativeFile.trim() + '.tiramisu');
			const nextContext: ContextType = { currentFile: filePath };
			compileFile(filePath, nextContext);
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
	}
};

const parseFunctionParameters = (node: Parameters, context: ContextType): ParamType => {
	const positional = node.parameters
		.filter((param) => !(param instanceof NamedParameter))
		.map((param) => translate(param, context));

	const named = node.parameters
		.filter((param) => param instanceof NamedParameter)
		.map((param) => ({
			name: param.name,
			value: Array.isArray(param.value)
				? param.value.map((child) => translate(child, context)).join('')
				: translate(param.value, context)
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

	if (node instanceof Parameter) {
		return Array.isArray(node.value)
			? node.value.map((child) => translate(child, context)).join('')
			: translate(node.value, context);
	}

	throw new Error(`Unknown node type: ${node.constructor.name}`);
};

import { compileFile } from './compile';
