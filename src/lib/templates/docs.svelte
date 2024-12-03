<script lang="ts">
	import { Button, Section, Card } from '@timeleap/ui';
	import Icon from '@iconify/svelte';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import Code from '$lib/components/Code.svelte';
	import Mermaid from '$lib/components/Mermaid.svelte';
	import Collapsible from '$lib/components/docs/nav/Collapsible.svelte';

	import { getNavForPage, fullNav } from '$lib/docs/nav';
	import { page } from '$app/stores';

	const nav = getNavForPage($page.url.pathname);

	('$IMPORTS');
</script>

<svelte:head>
	<title>Timeleap — $TITLE</title>
	<meta name="description" content="$DESCRIPTION" />
</svelte:head>

<Navbar active="docs"></Navbar>

<Section
	class="w-full max-w-[1920px] mx-auto pt-20 md:pt-36 gap-8! px-4 md:px-16 xxl:px-0 text-white flex-1"
>
	<div class="md:grid grid-cols-[240px_1fr]">
		<div class="relative hidden md:block">
			<div class="sticky top-24">
				<h4 class="font-serif mb-4">Table of Contents</h4>
				<Collapsible unwind nav={fullNav} />
			</div>
		</div>

		<div class="flex flex-col gap-8 md:px-16">
			<div class="flex gap-2 -mb-8 flex-wrap">$BREADCRUMBS</div>

			$CONTENT

			{#if nav.next || nav.prev}
				<div class="mt-8 mb-16 flex gap-4 justify-between w-full">
					{#if nav.prev}
						<Button
							class="bg-green-400 text-black hover:bg-green-300 font-semibold"
							animate
							href={nav.prev.href}
						>
							<Icon icon="carbon:arrow-left" />{nav.prev.title}
						</Button>
					{/if}
					{#if nav.next}
						<Button
							class="bg-green-400 text-black hover:bg-green-300 font-semibold"
							animate
							href={nav.next.href}
						>
							{nav.next.title}<Icon icon="carbon:arrow-right" />
						</Button>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</Section>

<Footer></Footer>
