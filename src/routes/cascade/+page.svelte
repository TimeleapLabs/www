<script>
	import Icon from '@iconify/svelte';
	import { Section, Grid, Image, Button, Card } from '@timeleap/ui';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import Subscribe from '$lib/components/Subscribe.svelte';

	import X from '$lib/components/candy/X.svelte';
</script>

<svelte:head>
	<title>Timeleap — Cascade: Blockchain-as-a-Service</title>
</svelte:head>

<Navbar active="products"></Navbar>

<Section class="w-full max-w-[1280px] mx-auto pt-24 gap-16! px-4 xxl:px-0">
	<div class="gap-16! pt-10 md:pt-24 w-full max-w-full box-border h-[640px]">
		<Card class="p-0! overflow-hidden border border-zinc-900 h-full">
			<Grid
				extraLargeScreenColumns={5}
				largeScreenColumns={5}
				mediumScreenColumns={5}
				class="h-full gap-0!"
			>
				<div
					class="top-0 border-box bottom-0 left-0 flex flex-col justify-end h-full p-6 md:p-12 col-span-1 bg-linear-to-tr from-zinc-950 to-zinc-900"
				>
					<h1 class="font-serif text-3xl md:text-6xl text-white">Cascade</h1>
					<p class="mt-12 text-gray-100 font-extralight">
						A Blockchain-as-a-Service platform that allows you to deploy and manage your own
						blockchain network.
					</p>
					<div class="mt-16">
						<Button
							class="bg-green-400 text-black hover:bg-green-300 font-semibold"
							animate
							href="https://devnet.timeleap.swiss"
							target="_blank"
						>
							Devnet<Icon icon="carbon:arrow-up-right" class="text-xl" />
						</Button>
					</div>
				</div>

				<div
					class="h-full bg-[url('/images/cascade.jpg')] bg-cover bg-center relative col-span-1 sm:col-span-4"
				>
					<div class="absolute inset-0 opacity-5 z-0 x">
						<X />
					</div>
				</div>
			</Grid>
		</Card>
	</div>
</Section>

<Section class="w-full max-w-[1280px] mx-auto pt-32 gap-16! px-4 xxl:px-0">
	<Grid extraLargeScreenColumns={2} largeScreenColumns={2} mediumScreenColumns={2} class="gap-16!">
		<Card class="p-0! w-full min-w-full bg-zinc-950 text-white">
			<div class="p-8 md:p-12 flex flex-col md:col-span-2">
				<h3 class="font-serif text-4xl">+12,500 TPS</h3>
				<div class="flex-1 mt-8 text-gray-300">
					Cascade is designed to handle over 12,500 transactions per second.
				</div>
			</div>
		</Card>

		<Card class="p-0! w-full min-w-full bg-zinc-950 text-white">
			<div class="p-8 md:p-12 flex flex-col md:col-span-2">
				<h3 class="font-serif text-4xl">~0.2s Block Time</h3>
				<div class="flex-1 mt-8 text-gray-300">
					Blocks are generated every 0.2 seconds on the Cascade network.
				</div>
			</div>
		</Card>

		<Card class="p-0! w-full min-w-full bg-zinc-950 text-white">
			<div class="p-8 md:p-12 flex flex-col md:col-span-2">
				<h3 class="font-serif text-4xl">~0.38s Time to Finality</h3>
				<div class="flex-1 mt-8 text-gray-300">
					Transactions are finalized within 0.38 seconds on the Cascade network.
				</div>
			</div>
		</Card>

		<Card class="p-0! w-full min-w-full bg-zinc-950 text-white">
			<div class="p-8 md:p-12 flex flex-col md:col-span-2">
				<h3 class="font-serif text-4xl">WASM + EVM</h3>
				<div class="flex-1 mt-8 text-gray-300">
					Cascade supports both WebAssembly and Ethereum Virtual Machine smart contracts.
				</div>
			</div>
		</Card>
	</Grid>
</Section>

<Section class="w-full max-w-[1280px] mx-auto pt-32 gap-16! px-4 xxl:px-0">
	<Grid
		extraLargeScreenColumns={3}
		largeScreenColumns={3}
		mediumScreenColumns={2}
		smallScreenColumns={1}
	>
		<Image
			src="/images/block.jpg"
			alt="Distributed Computation"
			height="720px"
			class="contrast-[1.05]"
		/>

		<Card class="col-span-1 md:col-span-2 flex flex-col">
			<h2 class="white-text text-white font-serif text-5xl">Blockchain as a Service</h2>

			<div class="text-zinc-300 text-lg mt-16">
				A chain of possibilities, turning ideas into reality – a whitelabel solution for businesses
				to deploy their own blockchain.
			</div>

			<div class="text-zinc-300 text-lg flex-1 mt-8">
				<b>Fully managed by our expert team</b> — from setup to maintenance: From launching a dApp to
				creating a private network, Cascade brings your vision to life on a flexible, high-performance
				foundation. We handle the heavy lifting so you can focus on scaling your impact in Web3.
			</div>

			<div class="mt-8 flex gap-8 flex-wrap">
				<Button
					class="bg-green-400 text-black hover:bg-green-300 font-semibold"
					animate
					href="/contact"
				>
					Contact Us<Icon icon="carbon:arrow-right" />
				</Button>
			</div>
		</Card>
	</Grid>
</Section>

<Section class="w-full max-w-[1280px] mx-auto pt-20 gap-16! pb-24 px-4 xxl:px-0">
	<Subscribe class="mt-16"></Subscribe>
</Section>

<Footer></Footer>

<style>
	.x {
		mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
	}
</style>
