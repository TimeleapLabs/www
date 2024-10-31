<script lang="ts">
	import { Button, Section } from '@timeleap/ui';
	import Icon from '@iconify/svelte';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Alert from '$lib/components/Alert.svelte';

	const nextPageUrl = '$NEXT_PAGE_URL';
	const nextPageTitle = '$NEXT_PAGE_TITLE';
	const prevPageUrl = '$PREV_PAGE_URL';
	const prevPageTitle = '$PREV_PAGE_TITLE';
</script>

<svelte:head>
	<title>Timeleap — $TITLE</title>
	<meta name="description" content="$DESCRIPTION" />
</svelte:head>

<Navbar active="docs"></Navbar>

<Section class="w-full max-w-[1280px] mx-auto pt-20 md:pt-36 !gap-8 px-4 xl:px-0 text-white flex-1">
	<div class="flex gap-2 -mb-8">$BREADCRUMBS</div>

	$CONTENT

	{#if nextPageUrl || prevPageUrl}
		<div class="mt-8 mb-16 flex gap-4">
			{#if prevPageUrl}
				<Button
					class="bg-green-400 text-black hover:bg-green-300 font-semibold"
					animate
					href={prevPageUrl}
				>
					<Icon icon="carbon:arrow-left" />{prevPageTitle}
				</Button>
			{/if}
			{#if nextPageUrl}
				<Button
					class="bg-green-400 text-black hover:bg-green-300 font-semibold"
					animate
					href={nextPageUrl}
				>
					{nextPageTitle}<Icon icon="carbon:arrow-right" />
				</Button>
			{/if}
		</div>
	{/if}
</Section>

<Footer></Footer>
