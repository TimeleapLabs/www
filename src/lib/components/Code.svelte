<script lang="ts">
	import { codeToHtml } from 'shiki';

	export let code = `const hello = 'world'`;
	export let lang = 'typescript';

	const highlighted = codeToHtml(code, { lang, theme: 'ayu-dark' });
</script>

<div class="rounded-2xl code overflow-hidden">
	{#await highlighted then highlighted}
		{@html highlighted}
	{/await}
</div>

<style>
	.code :global(code) {
		counter-reset: step;
		counter-increment: step 0;
	}

	.code :global(code .line::before) {
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
	}
</style>
