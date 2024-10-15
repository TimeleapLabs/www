<script>
	import Icon from '@iconify/svelte';
	import { Section, Grid, Image, Button, Card, Input } from '@timeleap/ui';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
</script>

<svelte:head>
	<title>Timeleap | Distributed App Engine</title>
</svelte:head>

<Navbar active="home"></Navbar>

<Section class="w-full max-w-[1280px] mx-auto pt-12 !gap-16 px-4 xl:px-0">
	<Grid extraLargeScreenColumns={1} largeScreenColumns={1} class="!gap-16 pt-24">
		<Card class="!p-0 relative">
			<Image
				src="/images/apps-full.png"
				alt="Distributed Computation"
				height="min(640px, 100vw)"
				class="contrast-[1.05]"
			/>
			<div
				class="absolute top-0 border-box bottom-0 left-0 w-full h-full inset-0 bg-gradient-to-r from-[rgba(0,0,0,.6)] to-transparent flex flex-col justify-end h-full p-6 md:p-12"
			>
				<h1 class="font-serif text-5xl md:text-6xl text-white">A Decentralized OS</h1>
				<p class="mt-12 text-white w-1/2">
					Apps that are only one click away!
					<span class="hidden md:inline-block"
						>Our vision is to create a decentralized operating system that empowers users to take
						control of their data.</span
					>
				</p>
				<div class="mt-16">
					<Button class="bg-green-400 text-black hover:bg-green-300 font-normal" animate>
						See Our Vision<Icon icon="carbon:arrow-right" />
					</Button>
				</div>
			</div>
		</Card>
	</Grid>

	<h2 class="white-text text-white font-serif text-5xl mt-8 mb-8">Discover.</h2>
</Section>

<Section class="w-full pt-20 pb-20 md:px-12 px-4">
	<Carousel>
		<Card
			class="!p-0 grid w-full min-w-full grid-cols-1 md:grid-cols-2 bg-zinc-900 text-white group md:min-w-[640px] md:w-[640px]"
		>
			<div class="p-8 md:p-12 flex flex-col">
				<h3 class="font-serif text-4xl">Unchained</h3>
				<div class="flex-1 mt-8 text-gray-300">Distributed App Engine</div>
				<div>
					<Button href="/unchained" class="!p-0 hover:text-green-300 !transition-colors">
						Discover<Icon icon="carbon:arrow-right" />
					</Button>
				</div>
			</div>
			<Image
				src="/images/unchained.jpg"
				alt="Unchained"
				width="100%"
				height="100%"
				class="max-w-full "
			></Image>
		</Card>

		<Card
			class="!p-0 grid w-full min-w-full grid-cols-1 md:grid-cols-2 bg-zinc-900 text-white group md:min-w-[640px] md:w-[640px]"
		>
			<div class="p-12 flex flex-col">
				<h3 class="font-serif text-4xl">Cascade</h3>
				<div class="flex-1 mt-8 text-gray-300">Blockchain as a Service</div>
				<div>
					<Button href="/unchained" class="!p-0 hover:text-green-300 !transition-colors">
						Discover<Icon icon="carbon:arrow-right" />
					</Button>
				</div>
			</div>
			<Image src="/images/baas.jpg" alt="Unchained" width="100%" height="100%" class="max-w-full"
			></Image>
		</Card>

		<Card
			class="!p-0 grid w-full min-w-full grid-cols-1 md:grid-cols-2 bg-zinc-900 text-white group md:min-w-[640px] md:w-[640px]"
		>
			<div class="p-12 flex flex-col">
				<h3 class="font-serif text-4xl">GhostFS</h3>
				<div class="flex-1 mt-8 text-gray-300">Remote File Storage</div>
				<div>
					<Button href="/unchained" class="!p-0 hover:text-green-300 !transition-colors">
						Discover<Icon icon="carbon:arrow-right" />
					</Button>
				</div>
			</div>
			<Image src="/images/ghostfs.jpg" alt="Unchained" width="100%" height="100%" class="max-w-full"
			></Image>
		</Card>

		<Card
			class="!p-0 grid w-full min-w-full grid-cols-1 md:grid-cols-2 bg-zinc-900 text-white group md:min-w-[640px] md:w-[640px]"
		>
			<div class="p-12 flex flex-col">
				<h3 class="font-serif text-4xl">Flare</h3>
				<div class="flex-1 mt-8 text-gray-300">Decentralized Social Network</div>
				<div>
					<Button href="/unchained" class="!p-0 hover:text-green-300 !transition-colors">
						Discover<Icon icon="carbon:arrow-right" />
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
	<Grid
		extraLargeScreenColumns={1}
		largeScreenColumns={1}
		mediumScreenColumns={1}
		smallScreenColumns={1}
		class="mt-8 !auto-rows-auto"
	>
		<Image src="/images/bangkok.jpg" alt="Bangkok DevCon" height="640px" />
		<Card class="text-white flex flex-col mt-12 !p-0">
			<h2 class="white-text text-white font-serif text-5xl">Devcon 2024: Bangkok, Thailand.</h2>
			<p class="mt-12 text-lg font-light flex-1">
				Join us at Devcon 2024 in Bangkok, Thailand, where we will be hosting a series of workshops
				and talks on the future of blockchain technology.
			</p>
			<div class="button mt-24">
				<Button class="bg-green-400 text-black hover:bg-green-300 font-normal" animate>
					Book a Ticket<Icon icon="carbon:arrow-right" />
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
				<Button class="bg-green-400 text-black hover:bg-green-300 font-normal" animate>
					Learn More<Icon icon="carbon:arrow-right" />
				</Button>
			</div>
		</Card>
	</Grid>
	<h2 class="white-text text-white font-serif text-5xl mt-16">Contact Us.</h2>
	<Card class="bg-zinc-900 text-white flex flex-col gap-8">
		<Grid extraLargeScreenColumns={2} largeScreenColumns={2}>
			<Input
				type="text"
				label="Name"
				id="name"
				class="bg-zinc-800 focus:bg-zinc-700 transition-colors"
				placeholder="John Doe"
			>
				<span class="text-gray-400 font-light"> Please enter your full name. </span>
			</Input>
			<Input
				type="email"
				label="Email"
				id="email"
				class="bg-zinc-800 focus:bg-zinc-700 transition-colors"
				placeholder="john@doe.com"
			>
				<span class="text-gray-400 font-light"> Please enter a valid email address. </span>
			</Input>
		</Grid>
		<Input
			label="Message"
			class="bg-zinc-800 focus:bg-zinc-700 transition-colors"
			id="message"
			placeholder="Hello there!"
		/>
		<Button class="bg-green-400 hover:bg-green-300 text-black font-normal self-start">
			Submit
		</Button>
	</Card>
</Section>

<Footer></Footer>
