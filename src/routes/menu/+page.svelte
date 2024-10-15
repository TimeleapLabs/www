<script>
	import Icon from '@iconify/svelte';
	import { Section, Grid, Image, Card } from '@timeleap/ui';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
	<title>Timeleap | Distributed App Engine</title>
</svelte:head>

<Navbar active="none" backButton></Navbar>

<Section class="w-full max-w-[1280px] mx-auto pt-24 !gap-16 px-4 xl:px-0 flex-1">
	<Grid extraLargeScreenColumns={3} largeScreenColumns={2}>
		<Card class="!p-0 flex bg-violet-100" href="/menu/products">
			<div class="px-8 flex-1 content-center">
				<h3 class="font-serif text-2xl">Products</h3>
				<div class="text-gray-800">Timeleap products</div>
			</div>
			<Image src="/images/pattern1.svg" alt="Unchained" width="128px" height="128px"></Image>
		</Card>
	</Grid>
</Section>

<Footer></Footer>
