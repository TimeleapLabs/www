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
	<title>Timeleap — Distributed App Engine</title>
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
					<h1 class="font-serif text-3xl md:text-6xl text-white">Unchained</h1>
					<p class="mt-12 text-gray-100 font-extralight">
						A distributed App Engine and App store to host and run resource-intensvie applications
						on-demand.
					</p>
					<div class="mt-16">
						<Button
							class="bg-green-400 text-black hover:bg-green-300 font-semibold"
							animate
							href="https://old.timeleap.swiss/docs/unchained"
							target="_blank"
						>
							Documentation<Icon icon="carbon:arrow-up-right" class="text-xl" />
						</Button>
					</div>
				</div>

				<div
					class="h-full bg-[url('/images/multiapp.jpg')] bg-cover bg-center relative col-span-1 sm:col-span-4"
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
		<Card class="p-0! w-full min-w-full bg-zinc-900 text-white">
			<div class="p-8 md:p-12 flex flex-col md:col-span-2">
				<h3 class="font-serif text-4xl">Technology-Agnostic</h3>
				<div class="flex-1 mt-8 text-gray-300">
					Unchained is built to support a wide range of programming languages and frameworks.
				</div>
			</div>
		</Card>

		<Card class="p-0! w-full min-w-full bg-zinc-900 text-white">
			<div class="p-8 md:p-12 flex flex-col md:col-span-2">
				<h3 class="font-serif text-4xl">High Performance</h3>
				<div class="flex-1 mt-8 text-gray-300">
					Unchained is designed to deliver high performance and low latency for your applications.
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
			src="/images/aichip.jpg"
			alt="Distributed Computation"
			height="720px"
			class="contrast-[1.05]"
		/>

		<Card class="col-span-1 md:col-span-2 flex flex-col">
			<h2 class="white-text text-white font-serif text-5xl">One-stop Tech Hub</h2>

			<div class="text-zinc-300 text-lg mt-24 flex-1">
				Timeleap's Unchained Network is a high-performance, decentralized platform empowering users
				and developers to run and host resource-intensive tasks on a scalable, distributed computing
				network—all without the need for heavy hardware.
			</div>

			<div class="text-zinc-300 text-lg mt-8 flex-1">
				Designed for AI (model training), cloud computing, blockchain tasks & more.
			</div>

			<div class="mt-8 flex gap-8 flex-wrap">
				<Button
					class="bg-green-400 text-black hover:bg-green-300 font-semibold"
					animate
					href="/vision"
				>
					Vision<Icon icon="carbon:arrow-right" />
				</Button>

				<Button
					class="bg-green-400 text-black hover:bg-green-300 font-semibold"
					animate
					href="https://old.timeleap.swiss/unchained/ai"
					target="_blank"
				>
					AI Demo<Icon icon="carbon:arrow-up-right" />
				</Button>

				<Button
					class="bg-green-400 text-black hover:bg-green-300 font-semibold"
					animate
					href="https://github.com/TimeleapLabs/unchained"
					target="_blank"
				>
					GitHub<Icon icon="carbon:logo-github" class="text-xl" />
				</Button>
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
		<Card class="flex flex-col col-span-1 xl:col-span-2">
			<h2 class="white-text text-white font-serif text-3xl md:text-5xl">
				Digital Signatures; With the Power of Decentralization (Beta)
			</h2>

			<div class="text-zinc-300 text-lg mt-24 flex-1">
				Unchained ID is a decentralized digital signature platform that allows you to sign documents
				and contracts with the power of decentralization. Whether publishing and verifying proofs on
				the blockchain or signing documents with your private key, Unchained ID is the ultimate
				solution for digital signatures.
			</div>

			<div class="text-zinc-300 text-lg mt-8 flex-1">
				<div class="text-zinc-300 text-sm mb-8">
					Get the Unchained ID app now;
					<a
						href="https://unchained.timeleap.swiss"
						class="text-green-400 hover:text-green-300 transition-colors"
						target="_blank"
					>
						sign our Genesis document <Icon icon="carbon:arrow-up-right" class="inline" />
					</a>
					to give it a try.
				</div>
				<a
					href="https://tlp.sh/android"
					class="text-green-400 hover:text-green-300"
					target="_blank"
				>
					<img src="/images/google-play-badge.svg" alt="Android" class="h-[64px] inline-block" />
				</a>
			</div>
		</Card>

		<Image src="/images/pen.jpg" alt="Digital Signatures" height="720px" class="contrast-[1.05]" />
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
