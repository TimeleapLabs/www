<script>
	import Icon from '@iconify/svelte';
	import { Section, Grid, Image, Button, Card } from '@timeleap/ui';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Subscribe from '$lib/components/Subscribe.svelte';
</script>

<svelte:head>
	<title>Timeleap — Distributed App Engine</title>
</svelte:head>

<Navbar active="home"></Navbar>

<Section class="w-full max-w-[1920px] mx-auto pt-12 gap-16! px-4 md:px-16 xxl:px-0">
	<Grid
		extraLargeScreenColumns={1}
		largeScreenColumns={1}
		mediumScreenColumns={1}
		class="gap-16! pt-10 md:pt-24 max-w-full box-border"
	>
		<Card
			class="p-0! relative h-[440px] md:h-[640px] overflow-hidden bg-linear-to-tr from-blue-800 to-blue-700 border border-zinc-900 col-span-2"
		>
			<div
				class="absolute top-0 border-box bottom-0 left-0 w-full flex flex-col justify-end h-full p-6 md:p-12 z-10"
			>
				<h1 class="font-serif text-3xl md:text-6xl text-white">A Decentralized OS</h1>
				<p class="mt-12 text-zinc-100 font-light w-full md:w-3/4 xl:w-2/3 xxl:w-1/2">
					Timeleap's vision is to revolutionize computing by offering a fully decentralized
					operating system that brings the power of supercomputing and distributed resources to
					everyone's fingertips.
					<span class="hidden md:inline">
						Imagine a world where all you need is a screen—no expensive hardware, no endless
						updates, and no compromises.
					</span>
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
			<div class="bg masked absolute top-0 right-0 h-full">
				<Image
					src="/images/apps-full.jpg"
					alt="Distributed Computation"
					height="100%"
					class="contrast-[1.05] scale-105 object-cover"
				></Image>
			</div>
		</Card>
	</Grid>

	<Card class="bg-gradient-to-r from-zinc-950 to-zinc-900 border border-zinc-800 relative">
		<Grid
			extraLargeScreenColumns={2}
			largeScreenColumns={2}
			mediumScreenColumns={2}
			smallScreenColumns={1}
			class="gap-8! md:gap-16! text-white relative z-10"
		>
			<h2 class="text-3xl leading-snug font-serif">
				Timeleap:<br /> A Distributed Computation Company.
			</h2>
			<p class="text-zinc-300">
				We are building the future of computing by creating a decentralized operating system that
				leverages the power of distributed computing. Our platform allows developers to run their
				applications on thousands of devices worldwide, making it faster and more efficient than
				ever before.
			</p>
		</Grid>
	</Card>

	<Card class="p-0! relative overflow-hidden h-[85vh]">
		<video
			src="/videos/game.webm"
			muted
			autoplay
			loop
			class="object-cover h-full w-full absolute left-0 right-0 top-0 bottom-0"
		>
			<track kind="captions" />
		</video>
		<div class="inset-0 flex flex-col justify-end p-6 md:p-12 absolute left-0 top-0 h-full w-full">
			<h2 class="font-serif text-3xl md:text-4xl xl:text-5xl xxl:text-6xl text-white">
				From note taking to AI,<br />3D rendering, and<br />AAA games.
			</h2>
			<p class="mt-20 text-white w-full xl:w-1/2">
				Imagine every app, at every level of performance—accessible anywhere without hardware
				requirements. Our decentralized distributed computing network provides the tools to power
				the most demanding applications. Run anything, pay as you go, and scale seamlessly
			</p>
		</div>
	</Card>

	<Card>
		<h2 class="font-serif text-4xl md:text-6xl text-white">Discover all of Timeleap.</h2>
	</Card>

	<Grid
		extraLargeScreenColumns={2}
		largeScreenColumns={2}
		mediumScreenColumns={1}
		smallScreenColumns={1}
		class="gap-16! grid-rows-[auto]"
	>
		<Card
			class="text-white bg-linear-to-tr from-blue-600 to-blue-900 border border-zinc-800 relative overflow-hidden"
		>
			<div class="relative z-10 flex flex-col h-full">
				<h2 class="font-serif text-3xl md:text-5xl leading-snug">
					Distributed computing<br /> for everyone.
				</h2>
				<p class="mt-8 flex-1 text-zinc-100 xl:w-5/6 xxl:w-2/3">
					<b class="font-bold">Unchained</b> is a distributed computing platform that allows you to run
					your applications on thousands of devices worldwide. Harness the power of distributed computing
					to run your applications faster and more efficiently.
				</p>
				<div class="mt-16">
					<Button
						class="bg-green-400 text-black hover:bg-green-300 font-semibold"
						animate
						href="/unchained"
					>
						Learn More<Icon icon="carbon:arrow-right" />
					</Button>
				</div>
			</div>
			<div class="absolute top-0 right-0 bottom-0 left-0 bg masked-full w-full z-0">
				<video class="w-full object-cover h-full" autoplay muted loop>
					<source src="/videos/binary.webm" type="video/mp4" />
					<track kind="captions" />
					Your browser does not support the video tag.
				</video>
			</div>
		</Card>
		<Card
			class="text-white bg-linear-to-tr from-cyan-600 to-cyan-900 border border-zinc-800 relative overflow-hidden"
		>
			<div class="relative z-10 flex flex-col h-full">
				<h2 class="font-serif text-3xl md:text-5xl leading-snug">
					A White-label<br />Blockchain-as-a-Service
				</h2>
				<p class="mt-8 flex-1 text-zinc-100 xl:w-5/6 xxl:w-2/3">
					A chain of possibilities, turning ideas into reality. <b class="font-bold">Cascade</b> is a
					bespoke solution for businesses to deploy their own blockchain effortlessly. Cascade brings
					your vision to life on a flexible, high-performance foundation. We handle the heavy lifting,
					allowing you to focus on scaling your impact in Web3.
				</p>
				<div class="mt-16">
					<Button
						class="bg-green-400 text-black hover:bg-green-300 font-semibold"
						animate
						href="/cascade"
					>
						Learn More<Icon icon="carbon:arrow-right" />
					</Button>
				</div>
			</div>
			<div class="absolute top-0 right-0 bottom-0 bg masked-full z-0">
				<img
					class="w-full object-cover h-full"
					src="/images/cascade-cover.jpg"
					alt="Blockchain-as-a-Service"
				/>
			</div>
		</Card>
	</Grid>

	<Grid
		class="gap-16!"
		extraLargeScreenColumns={3}
		largeScreenColumns={2}
		mediumScreenColumns={1}
		smallScreenColumns={1}
	>
		<Card
			class="relative text-white  bg-linear-to-tr from-cyan-600 to-cyan-900 border border-zinc-800 overflow-hidden"
		>
			<div class="flex flex-col relative z-10 h-full">
				<h2 class="font-serif text-3xl md:text-5xl leading-snug">
					World's fastest<br /> serialization library.
				</h2>
				<p class="mt-8 flex-1 text-zinc-100">
					Made specifically for remote procedure calls and inter-process communication.
					<b class="font-bold"> Sia</b> is four times faster and two times smaller than JSON, delivering
					a massive performance boost to RPC calls.
				</p>

				<div class="mt-16">
					<Button
						class="bg-green-400 text-black hover:bg-green-300 font-semibold"
						animate
						href="https://github.com/pouya-eghbali/sia"
						target="_blank"
					>
						Learn More<Icon icon="carbon:arrow-up-right" />
					</Button>
				</div>
			</div>
			<div class="masked-top-down absolute left-0 right-0 bottom-0 z-0 top-0">
				<Image
					src="/images/sia.jpg"
					alt="Sia"
					height="100%"
					width="100%"
					class="contrast-[1.05] object-cover rounded-none!"
				></Image>
			</div>
		</Card>

		<Card
			class="relative text-white bg-linear-to-tr from-emerald-600 to-emerald-900 border border-zinc-800 overflow-hidden"
		>
			<div class="flex flex-col relative z-10 h-full">
				<h2 class="font-serif text-3xl md:text-5xl leading-snug">
					Remote storage<br /> for distributed apps.
				</h2>
				<p class="mt-8 flex-1 text-zinc-100">
					<b class="font-bold">GhostFS</b> is a container-ready remote file storage with streaming capabilities.
					Allowing your distributed apps to store and retrieve user files remotely just like a local
					file system.
				</p>

				<div class="mt-16">
					<Button
						class="bg-green-400 text-black hover:bg-green-300 font-semibold"
						animate
						href="https://github.com/timeleaplabs/ghostfs"
						target="_blank"
					>
						Learn More<Icon icon="carbon:arrow-up-right" />
					</Button>
				</div>
			</div>
			<div class="absolute top-0 right-0 bottom-0 masked-top-down z-0 w-full">
				<Image
					src="/images/ghosts.jpg"
					alt="Remote Storage"
					height="100%"
					width="100%"
					class="contrast-[1.05] object-cover rounded-none!"
				></Image>
			</div>
		</Card>

		<Card
			class="text-white flex flex-col bg-linear-to-tr from-indigo-600 to-indigo-900 border border-zinc-800 relative overflow-hidden"
		>
			<div class="relative z-10">
				<h2 class="font-serif text-3xl md:text-5xl leading-snug">
					A delightful language<br /> for documentation.
				</h2>
				<p class="mt-8 flex-1 text-zinc-100">
					<b class="font-bold">Tiramisu</b> is a delightful language for writing documentation. It's
					simple, fast, and efficient—just like the dessert. With Tiramisu, you can write beautiful documentation
					that looks great on any device.
				</p>
				<div class="mt-16">
					<Button
						class="bg-green-400 text-black hover:bg-green-300 font-semibold"
						animate
						href="https://github.com/timeleaplabs/tiramisu"
						target="_blank"
					>
						Learn More<Icon icon="carbon:arrow-up-right" />
					</Button>
				</div>
			</div>
			<div class="absolute top-0 right-0 bottom-0 bg masked-top-down z-0">
				<img class="w-full object-cover h-full" src="/images/tiramisu.jpg" alt="Tiramisu" />
			</div>
		</Card>
	</Grid>
</Section>

<Section class="w-full max-w-[1920px] mx-auto pt-20 gap-16! pb-24 px-4 md:px-16 xxl:px-0">
	<Subscribe class="mt-16"></Subscribe>
</Section>

<Footer></Footer>

<style>
	.masked {
		mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 30%);
	}
	.masked-full {
		mask-image: linear-gradient(to right, rgba(0, 0, 0, 0.05) 30%, rgba(0, 0, 0, 1));
	}

	.masked-top-down {
		mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 1));
	}
</style>
