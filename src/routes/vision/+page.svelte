<script>
	import Icon from '@iconify/svelte';
	import { Section, Grid, Image, Button, Card } from '@timeleap/ui';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Subscribe from '$lib/components/Subscribe.svelte';
</script>

<svelte:head>
	<title>Timeleap | Distributed App Engine</title>
</svelte:head>

<Navbar active="vision"></Navbar>

<Section class="w-full max-w-[1280px] mx-auto pt-12 !gap-16 px-4 xl:px-0">
	<Grid extraLargeScreenColumns={2} largeScreenColumns={2} class="!gap-16 pt-24">
		<div class="w-full inset-0 flex flex-col justify-end h-full p-6 md:p-12">
			<h1 class="font-serif text-5xl md:text-6xl text-white">
				The Entire World Under Your Fingertips.
			</h1>
			<p class="mt-20 text-white md:w-1/2">All you need is a screen.</p>
		</div>
		<Card class="!p-0 relative">
			<Image
				src="/images/screen.jpg"
				alt="Distributed Computation"
				height="min(640px, 100vw)"
				class="contrast-[1.05]"
			/>
		</Card>
	</Grid>
</Section>

<Section class="w-full max-w-[1280px] mx-auto !gap-16 px-4 xl:px-0 pt-24">
	<Grid extraLargeScreenColumns={1} largeScreenColumns={1} class="!gap-16 pt-24">
		<Card class="!p-0 relative overflow-hidden min-h-[640px]">
			<video src="/videos/game.webm" muted autoplay loop class="object-cover h-full w-full">
				<track kind="captions" />
			</video>
			<div
				class="inset-0 flex flex-col justify-end p-6 md:p-12 absolute left-0 top-0 h-full w-full"
			>
				<h2 class="font-serif text-5xl md:text-6xl text-white">
					From note taking to AI, 3D rendering, and AAA games.
				</h2>
				<p class="mt-20 text-white md:w-1/2">No need for expensive hardware or yearly upgrades.</p>
			</div>
		</Card>
	</Grid>
</Section>

<Section class="w-full max-w-[1280px] mx-auto pt-24 !gap-16 px-4 xl:px-0 pb-32">
	<Grid extraLargeScreenColumns={2} largeScreenColumns={2} class="!gap-16 pt-24">
		<Card class="!p-0 relative">
			<Image
				src="/images/brain.jpg"
				alt="Distributed Computation"
				height="min(640px, 100vw)"
				class="contrast-[1.05]"
			/>
		</Card>
		<div class="w-full h-full inset-0 flex flex-col justify-end p-6 md:p-12">
			<h2 class="font-serif text-5xl md:text-6xl text-white">A Vision Based on Realities.</h2>
			<p class="mt-20 text-white">
				The Human Brain Project uses Timeleap technology to allow researchers to simulate the human
				brain remotely on a supercomputer.
			</p>
		</div>
	</Grid>

	<h2 class="font-serif text-5xl md:text-6xl text-white w-2/3 md:w-1/2 mt-16 px-4">
		A Decentralized Operating System for Everyone!
	</h2>

	<Grid
		extraLargeScreenColumns={3}
		largeScreenColumns={3}
		mediumScreenColumns={2}
		smallScreenColumns={1}
		class="!gap-16 pt-24"
	>
		<Card class="!p-0 relative">
			<Image
				src="/images/ai.jpg"
				alt="Distributed Computation"
				height="100%"
				class="contrast-[1.05]"
			/>
			<div
				class="inset-0 flex flex-col justify-end p-6 md:p-12 absolute left-0 top-0 h-full w-full"
			>
				<h2 class="font-serif text-5xl md:text-6xl text-white">AI.</h2>
			</div>
		</Card>
		<Card class="!p-0 relative md:col-span-2">
			<Image
				src="/images/games.jpg"
				alt="Distributed Computation"
				height="100%"
				class="contrast-[1.05]"
			/>
			<div
				class="inset-0 flex flex-col justify-end p-6 md:p-12 absolute left-0 top-0 h-full w-full"
			>
				<h2 class="font-serif text-5xl md:text-6xl text-white">Video Games.</h2>
			</div>
		</Card>
		<Card class="!p-0 relative md:col-span-2">
			<Image
				src="/images/productivity.jpg"
				alt="Distributed Computation"
				height="100%"
				class="contrast-[1.05]"
			/>
			<div
				class="inset-0 flex flex-col justify-end p-6 md:p-12 absolute left-0 top-0 h-full w-full"
			>
				<h2 class="font-serif text-5xl md:text-6xl text-white">Productivity.</h2>
			</div>
		</Card>
		<Card class="!p-0 relative">
			<Image
				src="/images/music.jpg"
				alt="Distributed Computation"
				height="100%"
				class="contrast-[1.05]"
			/>
			<div
				class="inset-0 flex flex-col justify-end p-6 md:p-12 absolute left-0 top-0 h-full w-full"
			>
				<h2 class="font-serif text-5xl md:text-6xl text-white">Music.</h2>
			</div>
		</Card>
		<Card class="!p-0 relative md:col-span-3">
			<Image
				src="/images/movies.jpg"
				alt="Distributed Computation"
				height="100%"
				class="contrast-[1.05]"
			/>
			<div
				class="inset-0 flex flex-col justify-end p-6 md:p-12 absolute left-0 top-0 h-full w-full"
			>
				<h2 class="font-serif text-5xl md:text-6xl text-white">Movies.</h2>
			</div>
		</Card>
	</Grid>

	<Grid
		extraLargeScreenColumns={1}
		largeScreenColumns={1}
		class="!gap-16 pt-24 relative mb-20 h-[720px] md:h-[640px]"
	>
		<div class="flex justify-end flex-col absolute left-0 top-0 h-full w-full z-20 p-8 md:p-16">
			<h2 class="font-serif text-5xl md:text-6xl text-white">All within your reach.</h2>
			<div class="text-gray-100 mt-8 text-2xl md:w-1/2">
				<p>
					No installation required. No updates. No downloads. No waiting. No limits. No compromises.
				</p>
			</div>
			<Button
				class="bg-green-400 text-black hover:bg-green-300 mt-16 self-start font-semibold"
				animate
				href="/vision"
			>
				Read More on Our Blog
				<Icon icon="carbon:arrow-right" />
			</Button>
		</div>
		<Image
			src="/images/apps-full.jpg"
			alt="Distributed Computation"
			height="100%"
			class="contrast-[1.05]"
		/>
	</Grid>

	<Subscribe></Subscribe>
</Section>

<Footer></Footer>
