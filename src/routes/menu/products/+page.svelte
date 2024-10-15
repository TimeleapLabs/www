<script>
	import Icon from '@iconify/svelte';
	import { Section, Grid, Image, Card } from '@timeleap/ui';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
	<title>Timeleap | Distributed App Engine</title>
</svelte:head>

<Navbar active="products" backButton></Navbar>

<Section class="w-full max-w-[1280px] mx-auto pt-32 !gap-16 px-4 xl:px-0 flex-1">
	<Grid extraLargeScreenColumns={3} largeScreenColumns={2}>
		<Card class="!p-0 flex bg-violet-100">
			<div class="px-8 flex-1 content-center">
				<h3 class="font-serif text-2xl">Unchained</h3>
				<div class="text-gray-800">Distributed App Engine</div>
			</div>
			<Image src="/images/pattern1.svg" alt="Unchained" width="128px" height="128px"></Image>
		</Card>
		<Card class="!p-0 flex bg-red-100">
			<div class="px-8 flex-1 content-center">
				<h3 class="font-serif text-2xl">GhostFS</h3>
				<div class="text-gray-800">Remote File Storage</div>
			</div>
			<Image src="/images/pattern2.png" alt="Unchained" width="128px" height="128px"></Image>
		</Card>
		<Card class="!p-0 flex bg-green-100">
			<div class="px-8 flex-1 content-center">
				<h3 class="font-serif text-2xl">Cascade</h3>
				<div class="text-gray-800">Blockchain as a Service</div>
			</div>
			<Image src="/images/pattern3.svg" alt="Unchained" width="128px" height="128px"></Image>
		</Card>
	</Grid>
</Section>

<Footer></Footer>
