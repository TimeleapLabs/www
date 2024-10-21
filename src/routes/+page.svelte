<script>
	import Icon from '@iconify/svelte';
	import { Section, Grid, Image, Button, Card } from '@timeleap/ui';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import Subscribe from '$lib/components/Subscribe.svelte';
</script>

<svelte:head>
	<title>Timeleap | Distributed App Engine</title>
</svelte:head>

<Navbar active="home"></Navbar>

<Section class="w-full max-w-[1280px] mx-auto pt-12 !gap-16 px-4 xl:px-0">
	<Grid extraLargeScreenColumns={1} largeScreenColumns={1} class="!gap-16 pt-10 md:pt-24">
		<Card class="!p-0 relative h-[640px]">
			<Image
				src="/images/apps-full.jpg"
				alt="Distributed Computation"
				height="100%"
				class="contrast-[1.05] object-cover scale-105"
			/>
			<div
				class="absolute top-0 border-box bottom-0 left-0 w-full flex flex-col justify-end h-full p-6 md:p-12"
			>
				<h1 class="font-serif text-5xl md:text-6xl text-white">A Decentralized OS</h1>
				<p class="mt-12 text-gray-100 md:w-1/2 text-2xl">
					No installation required. No updates. No downloads. No waiting. No limits. No compromises.
				</p>
				<div class="mt-16">
					<Button
						class="bg-green-400 text-black hover:bg-green-300 font-semibold"
						animate
						href="/vision"
					>
						See Our Vision<Icon icon="carbon:arrow-right" />
					</Button>
				</div>
			</div>
		</Card>
	</Grid>

	<h2 class="white-text text-white font-serif text-5xl mt-8 mb-8">Discover.</h2>
</Section>

<Section class="w-full pt-12 md:pt-20 pb-20 md:px-12 px-4">
	<Carousel>
		<Card
			class="!p-0 grid w-full min-w-full grid-cols-1 md:grid-cols-2 bg-zinc-900 text-white group md:min-w-[640px] md:w-[640px] snap-start"
		>
			<div class="p-8 md:p-12 flex flex-col">
				<h3 class="font-serif text-4xl">Unchained</h3>
				<div class="flex-1 mt-8 text-gray-300">
					Sovereign network built specifically for decentralized applications.
				</div>
				<div>
					<Button
						href="https://github.com/TimeleapLabs/unchained"
						class="!p-0 hover:text-green-300 !transition-colors"
						target="_blank"
					>
						Discover<Icon icon="carbon:arrow-up-right" />
					</Button>
				</div>
			</div>
			<Image
				src="/images/unchained.jpg"
				alt="Unchained"
				width="100%"
				height="100%"
				class="max-w-full"
			></Image>
		</Card>

		<Card
			class="!p-0 grid w-full min-w-full grid-cols-1 md:grid-cols-2 bg-zinc-900 text-white group md:min-w-[640px] md:w-[640px] snap-start"
		>
			<div class="p-12 flex flex-col">
				<h3 class="font-serif text-4xl">Cascade</h3>
				<div class="flex-1 mt-8 text-gray-300">
					Whitelabel solution for businesses to deploy their own blockchain.
				</div>
				<div>
					<Button
						href="https://old.timeleap.swiss/blockchain"
						class="!p-0 hover:text-green-300 !transition-colors"
						target="_blank"
					>
						Discover<Icon icon="carbon:arrow-up-right" />
					</Button>
				</div>
			</div>
			<Image src="/images/baas.jpg" alt="Unchained" width="100%" height="100%" class="max-w-full"
			></Image>
		</Card>

		<Card
			class="!p-0 grid w-full min-w-full grid-cols-1 md:grid-cols-2 bg-zinc-900 text-white group md:min-w-[640px] md:w-[640px] snap-start"
		>
			<div class="p-12 flex flex-col">
				<h3 class="font-serif text-4xl">GhostFS</h3>
				<div class="flex-1 mt-8 text-gray-300">
					Container-ready remote file storage with streaming capabilities.
				</div>
				<div>
					<Button
						href="https://github.com/TimeleapLabs/ghostfs"
						class="!p-0 hover:text-green-300 !transition-colors"
						target="_blank"
					>
						Discover<Icon icon="carbon:arrow-up-right" />
					</Button>
				</div>
			</div>
			<Image src="/images/ghostfs.jpg" alt="Unchained" width="100%" height="100%" class="max-w-full"
			></Image>
		</Card>

		<Card
			class="!p-0 grid w-full min-w-full grid-cols-1 md:grid-cols-2 bg-zinc-900 text-white group md:min-w-[640px] md:w-[640px] snap-start"
		>
			<div class="p-12 flex flex-col">
				<h3 class="font-serif text-4xl">Flare</h3>
				<div class="flex-1 mt-8 text-gray-300">
					A blockchain-based bio link platform with physical smart cards.
				</div>
				<div>
					<Button
						href="https://flare.cards"
						target="_blank"
						class="!p-0 hover:text-green-300 !transition-colors"
					>
						Discover<Icon icon="carbon:arrow-up-right" />
					</Button>
				</div>
			</div>
			<Image
				src="/images/flare-cards.jpg"
				alt="Unchained"
				width="100%"
				height="100%"
				class="max-w-full"
			></Image>
		</Card>
	</Carousel>
</Section>

<Section class="w-full max-w-[1280px] mx-auto pt-12 !gap-16 px-4 xl:px-0">
	<Card class="text-white bg-zinc-900 p-12">
		<p class="text-2xl font-serif">
			Update in Progress
			<Icon icon="carbon:information-filled" class="inline-block" />
		</p>
		<p class="mt-4">
			We are currently updating our website to provide you with the best experience. You can access
			the old website
			<a
				href="https://old.timeleap.swiss"
				class="text-green-400 hover:text-green-300 transition-colors"
			>
				here <Icon icon="carbon:arrow-up-right" class="inline-block" />
			</a>
			while we work on the new one.
		</p>
	</Card>
</Section>

<Section class="w-full max-w-[1280px] mx-auto pt-12 !gap-16 px-4 xl:px-0">
	<Grid
		extraLargeScreenColumns={1}
		largeScreenColumns={1}
		mediumScreenColumns={1}
		smallScreenColumns={1}
		class="mt-8 !auto-rows-auto"
	>
		<Image src="/images/bangkok.jpg" alt="Bangkok DevCon" height="640px" class="contrast-[1.05]" />
		<Card class="text-white flex flex-col mt-12 !p-0">
			<h2 class="white-text text-white font-serif text-5xl">Devcon 2024: Bangkok, Thailand.</h2>
			<p class="mt-12 text-lg font-light flex-1">
				Join us at Devcon 2024 in Bangkok, Thailand, where we will be hosting a series of workshops
				and talks on the future of blockchain technology.
			</p>
			<div class="button mt-24">
				<Button
					class="bg-green-400 text-black hover:bg-green-300 font-semibold"
					animate
					href="https://lu.ma/sw27vr8w"
					target="_blank"
				>
					Book a Ticket<Icon icon="carbon:arrow-up-right" />
				</Button>
			</div>
		</Card>
	</Grid>
</Section>

<Section class="w-full max-w-[1280px] mx-auto pt-20 !gap-16 pb-24 px-4 xl:px-0">
	<Grid extraLargeScreenColumns={5} largeScreenColumns={5} class="mt-8">
		<Image
			src="/images/matterhorn.jpg"
			alt="Mattherhorn"
			height="640px"
			class="col-span-1 md:col-span-2"
		/>
		<Card
			class="text-white flex flex-col col-span-1 md:col-span-3 bg-gradient-to-tr from-zinc-950 to-zinc-900 border border-zinc-800"
		>
			<h2 class="white-text text-white font-serif text-4xl md:text-5xl">
				Headquartered in the heart of Switzerland.
			</h2>
			<p class="mt-12 text-lg font-light">
				Founded in December 2021, Kenshi is a pioneering blockchain technology company headquartered
				in the heart of Switzerland, with a commitment to innovation and excellence.
			</p>
			<p class="flex-1 mt-6 text-lg font-light">
				As of April 2024, Kenshi has rebranded and registered as Timeleap SA, a company dedicated to
				providing cutting-edge blockchain solutions for businesses and enterprises.
			</p>
			<div class="button">
				<Button
					class="bg-green-400 text-black hover:bg-green-300 font-normal font-semibold"
					animate
				>
					Learn More<Icon icon="carbon:arrow-right" />
				</Button>
			</div>
		</Card>
	</Grid>

	<Subscribe class="mt-16"></Subscribe>
</Section>

<Footer></Footer>
