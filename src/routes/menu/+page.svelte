<script>
	import Icon from '@iconify/svelte';
	import { Section, Grid, Image, Card } from '@timeleap/ui';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
	<title>Timeleap — Distributed App Engine</title>
</svelte:head>

<Navbar active="none" backButton></Navbar>

<Section class="w-full max-w-[1280px] mx-auto pt-24 !gap-16 px-4 xxl:px-0 flex-1 pb-12">
	<Grid extraLargeScreenColumns={3} largeScreenColumns={2}>
		<Card
			class="!p-0 flex text-white bg-zinc-900 hover:bg-zinc-800 transition-colors"
			href="/menu/products"
		>
			<div class="px-8 flex-1 content-center">
				<h3 class="font-serif text-2xl">
					Products <Icon icon="carbon:arrow-right" class="inline-block text-sm" />
				</h3>
				<div>Timeleap products</div>
			</div>
			<Image src="/images/products.jpg" alt="Products" width="128px" height="128px"></Image>
		</Card>
		<Card
			class="!p-0 flex text-white bg-zinc-900 hover:bg-zinc-800 transition-colors"
			href="/menu/products"
		>
			<div class="px-8 flex-1 content-center">
				<h3 class="font-serif text-2xl">
					Contact <Icon icon="carbon:arrow-right" class="inline-block text-sm" />
				</h3>
				<div>Talk to an expert</div>
			</div>
			<Image src="/images/mail.jpg" alt="Products" width="128px" height="128px"></Image>
		</Card>
		<Card class="!p-0 flex text-white bg-zinc-900 hover:bg-zinc-800 transition-colors" href="/docs">
			<div class="px-8 flex-1 content-center">
				<h3 class="font-serif text-2xl">
					Docs <Icon icon="carbon:arrow-right" class="inline-block text-sm" />
				</h3>
				<div>Knowledge base</div>
			</div>
			<Image src="/images/docs.jpg" alt="Products" width="128px" height="128px"></Image>
		</Card>
	</Grid>
</Section>

<Footer></Footer>
