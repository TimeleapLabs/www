<script lang="ts">
	import { createHighlighter, type Highlighter, type LanguageRegistration } from 'shiki';
	import tiramisu from '@timeleap/tiramisu/vscode-tiramisu/syntaxes/tiramisu.tmLanguage.json';
	import sia from '$lib/languages/sia.tmLanguage.json';
	import { onMount } from 'svelte';

	tiramisu.name = 'tiramisu';
	sia.name = 'sia';

	export let code = `const hello = 'world'`;
	export let lang = 'typescript';
	export let lineNumbers = false;

	const getLang = (lang: string): string | LanguageRegistration => {
		switch (lang) {
			case 'tiramisu':
				return tiramisu;
			case 'sia':
				return sia as LanguageRegistration;
			default:
				return lang;
		}
	};

	const highlighter = createHighlighter({
		langs: [getLang(lang)],
		themes: ['ayu-dark']
	});

	const highlight = (highlighter: Highlighter) =>
		highlighter.codeToHtml(code, { lang, theme: 'ayu-dark' });

	onMount(() => {
		return () => {
			highlighter.then((highlighter) => highlighter.dispose());
		};
	});
</script>

<div
	class="rounded-2xl code overflow-hidden max-w-full max-h-[400px]"
	class:line-numbers={lineNumbers}
>
	{#await highlighter then highlighter}
		{@html highlight(highlighter)}
	{/await}
</div>

<style>
	.code.line-numbers :global(code) {
		counter-reset: step;
		counter-increment: step 0;
	}

	.code.line-numbers :global(code .line::before) {
		content: counter(step);
		counter-increment: step;
		width: 1rem;
		margin-right: 1.5rem;
		display: inline-block;
		text-align: right;
		color: rgba(115, 138, 148, 0.4);
	}

	.code :global(pre) {
		padding: 1rem;
		overflow-x: auto;
		height: 100%;
		max-width: 100%;
	}
</style>
