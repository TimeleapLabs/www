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

<Section class="w-full max-w-[1280px] mx-auto pt-32 !gap-16 px-4 xl:px-0 flex-1 pb-12">
	<Grid extraLargeScreenColumns={3} largeScreenColumns={2}>
		<Card
			class="!p-0 flex bg-zinc-900 hover:bg-zinc-800 transition-colors text-white"
			href="https://github.com/TimeleapLabs/unchained"
			target="_blank"
		>
			<div class="px-8 flex-1 content-center">
				<h3 class="font-serif text-2xl">
					Unchained <Icon icon="carbon:arrow-up-right" class="inline-block text-sm" />
				</h3>
				<div>Distributed App Engine</div>
			</div>
			<Image src="/images/unchained.jpg" alt="Unchained" width="128px" height="128px"></Image>
		</Card>
		<Card
			class="!p-0 flex bg-zinc-900 hover:bg-zinc-800 transition-colors text-white"
			href="https://github.com/TimeleapLabs/ghostfs"
			target="_blank"
		>
			<div class="px-8 flex-1 content-center">
				<h3 class="font-serif text-2xl">
					GhostFS <Icon icon="carbon:arrow-up-right" class="inline-block text-sm" />
				</h3>
				<div>Remote File Storage</div>
			</div>
			<Image src="/images/ghostfs.jpg" alt="Unchained" width="128px" height="128px"></Image>
		</Card>
		<Card
			class="!p-0 flex bg-zinc-900 hover:bg-zinc-800 transition-colors text-white"
			href="https://old.timeleap.swiss/blockchain"
			target="_blank"
		>
			<div class="px-8 flex-1 content-center">
				<h3 class="font-serif text-2xl">
					Cascade <Icon icon="carbon:arrow-up-right" class="inline-block text-sm" />
				</h3>
				<div>Blockchain as a Service</div>
			</div>
			<Image src="/images/baas.jpg" alt="Unchained" width="128px" height="128px"></Image>
		</Card>
		<Card
			class="!p-0 flex bg-zinc-900 hover:bg-zinc-800 transition-colors text-white"
			href="https://flare.cards"
			target="_blank"
		>
			<div class="px-8 flex-1 content-center">
				<h3 class="font-serif text-2xl">
					Flare <Icon icon="carbon:arrow-up-right" class="inline-block text-sm" />
				</h3>
				<div>Bio Link Platform</div>
			</div>
			<Image src="/images/flare-cards.jpg" alt="Unchained" width="128px" height="128px"></Image>
		</Card>
	</Grid>
</Section>

<Footer></Footer>
