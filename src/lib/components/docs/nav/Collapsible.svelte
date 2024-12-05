<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button } from '@timeleap/ui';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';

	type NavEntry = { href: string; title: string; nav?: NavEntry[] };

	export let unwind = false;
	export let nav: NavEntry;

	let open = false;
	let partialMatch = false;
	let match = false;

	const toggle = () => {
		open = !open;
	};

	$: if ($page.url.pathname.startsWith(nav.href)) {
		open = true;
		partialMatch = true;
	}

	$: match = $page.url.pathname === nav.href;
</script>

{#if !unwind}
	<div
		class="flex items-center justify-between w-full text-zinc-400 hover:text-zinc-100 transition-colors"
	>
		<a href={nav.href} class:text-green-400={match} class:text-blue-100={partialMatch && !match}>
			{nav.title}
		</a>
		{#if nav.nav}
			<Button class="px-2! py-0!" on:click={toggle}>
				<Icon icon="carbon:chevron-{open ? 'up' : 'down'}" class="w-4 h-4" />
			</Button>
		{/if}
	</div>
{:else if nav.nav}
	{#each nav.nav as item}
		<svelte:self nav={item} />
	{/each}
{/if}

{#if !unwind && nav.nav && open}
	<div transition:slide class="pl-2">
		{#each nav.nav as item}
			<svelte:self nav={item} />
		{/each}
	</div>
{/if}
