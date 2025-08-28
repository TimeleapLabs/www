<script lang="ts">
	import { Card } from '@timeleap/ui';
	import Author from './Author.svelte';

	export let href: string;
	export let title: string;
	export let author: string;
	export let createdAt: string;
</script>

<Card
	class="text-white border border-zinc-800 overflow-hidden flex flex-col bg-black hover:bg-zinc-900 transition-all! duration-300"
	{href}
>
	<h2 class="text-3xl w-[80%] font-serif flex-1 mb-8 docs-heading leading-10">{title}</h2>
	<Author {author} {createdAt} />
</Card>
