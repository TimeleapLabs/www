<script>
	import Icon from '@iconify/svelte';
	import { Section, Grid, Button, Card } from '@timeleap/ui';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Subscribe from '$lib/components/Subscribe.svelte';
	import X from '$lib/components/candy/X.svelte';

	import Benchmark from '$lib/components/products/sia/Benchmark.svelte';
	import CodeCarousel from '$lib/components/home/CodeCarousel.svelte';
	import TiltCard from '$lib/components/TiltCard.svelte';

	import MetaTags from '$lib/components/seo/MetaTags.svelte';
</script>

<MetaTags />

<Navbar active="home"></Navbar>

<Section class="w-full max-w-[1920px] mx-auto pt-12 gap-32! px-4 md:px-16 xxl:px-0">
	<Grid
		extraLargeScreenColumns={1}
		largeScreenColumns={1}
		mediumScreenColumns={1}
		class="gap-16! pt-10 md:pt-24 max-w-full box-border"
	>
		<Card class="relative h-[440px] md:h-[640px] overflow-hidden">
			<div class="w-full flex flex-col justify-end h-full z-10 relative">
				<h1 class="font-serif text-3xl md:text-6xl text-white">
					Your Distributed<br />
					App Engine.
				</h1>
				<p class="mt-12 text-zinc-100 font-light w-full md:w-3/4 xl:w-2/3 xxl:w-1/2">
					Timeleap provides you with all the tools you need to build high-performance, distributed
					applications.
				</p>
				<div class="mt-16">
					<Button
						class="bg-green-400 text-black hover:bg-green-300 font-semibold"
						animate
						href="/docs"
					>
						Read the Docs<Icon icon="carbon:arrow-right" />
					</Button>
				</div>
			</div>
			<div class="bg x-masked absolute top-0 right-0 left-0 bottom-0 h-full z-0 opacity-50">
				<X></X>
			</div>
		</Card>
	</Grid>

	<Grid
		extraLargeScreenColumns={3}
		largeScreenColumns={3}
		mediumScreenColumns={1}
		smallScreenColumns={1}
		class="gap-32! grid-rows-[auto]"
	>
		<Card class="text-white">
			<div class="relative z-10 flex flex-col h-full">
				<h2 class="font-serif text-3xl md:text-5xl leading-snug">
					Distributed Computation:<br /> Unchained.
				</h2>
				<p class="mt-8 flex-1 text-zinc-300 hover:text-zinc-100 transition-colors">
					<b class="font-bold">Unchained</b> is a distributed computing platform that allows you to run
					your applications on thousands of devices worldwide. Harness the power of distributed computing
					to run your applications faster and more efficiently.
				</p>
				<div class="mt-16">
					<Button
						class="bg-green-400 text-black hover:bg-green-300 font-semibold"
						animate
						href="/docs/products/unchained"
					>
						Learn More<Icon icon="carbon:arrow-right" />
					</Button>
				</div>
			</div>
		</Card>

		<div class="md:col-span-2 max-w-full">
			<CodeCarousel></CodeCarousel>
		</div>
	</Grid>

	<Grid
		extraLargeScreenColumns={2}
		largeScreenColumns={2}
		mediumScreenColumns={1}
		smallScreenColumns={1}
		class="gap-32! grid-rows-[auto]"
	>
		<Card class="text-white flex flex-col">
			<h2 class="font-serif text-3xl md:text-5xl leading-snug">
				Supercharge your dApp <br />with Sia.
			</h2>

			<p class="mt-8 text-zinc-300 hover:text-zinc-100 transition-colors xl:w-5/6 xxl:w-2/3 flex-1">
				<b class="font-bold">Sia</b> is a high-performance serialization library that allows you to serialize
				and deserialize your data at lightning speed. With Sia, you can build faster and more efficient
				applications.
			</p>

			<div class="max-w-[640px] mt-16">
				<TiltCard class="p-0!">
					<Benchmark></Benchmark>
				</TiltCard>
			</div>

			<div class="mt-16">
				<Button
					class="bg-green-400 text-black hover:bg-green-300 font-semibold"
					animate
					href="/docs/products/sia"
				>
					Learn More<Icon icon="carbon:arrow-right" />
				</Button>
			</div>
		</Card>

		<div class="flex flex-col justify-between">
			<Card class="text-white">
				<h2 class="font-serif text-xl md:text-3xl leading-snug">
					Write beautiful documentation <br />with Tiramisu.
				</h2>
				<p class="mt-8 xl:w-5/6 xxl:w-2/3 text-zinc-300 hover:text-zinc-100 transition-colors">
					<b class="font-bold">Tiramisu</b> is a flexible and integrable documentation generator that
					seamlessly fits into your existing website design. With Tiramisu, you can effortlessly create
					stunning documentation that matches your project's aesthetic, allowing you to focus on delivering
					great content.
				</p>
				<div class="mt-8">
					<a
						class="text-green-400 hover:text-green-300 font-semibold flex gap-2 items-center"
						href="/docs/products/tiramisu"
					>
						Learn More<Icon icon="carbon:arrow-right" />
					</a>
				</div>
			</Card>

			<Card class="text-white">
				<div class="relative z-10 flex flex-col h-full">
					<h2 class="font-serif text-xl md:text-3xl leading-snug">
						Your own layer-1 <br />EVM blockchain.
					</h2>
					<p class="mt-8 xl:w-5/6 xxl:w-2/3 text-zinc-300 hover:text-zinc-100 transition-colors">
						<b class="font-bold">Cascade</b> is a blockchain as a service platform that allows you to
						create your own EVM-compatible blockchain. Looking to launch your own token or build a decentralized
						application? Cascade has you covered.
					</p>
					<div class="mt-8">
						<a
							class="text-green-400 hover:text-green-300 font-semibold flex gap-2 items-center"
							href="/cascade"
						>
							Learn More<Icon icon="carbon:arrow-right" />
						</a>
					</div>
				</div>
			</Card>
		</div>
	</Grid>
</Section>

<Section class="w-full max-w-[1920px] mx-auto pt-20 gap-16! pb-24 px-4 md:px-16 xxl:px-0">
	<Subscribe class="mt-16"></Subscribe>
</Section>

<Footer></Footer>

<style>
	.masked {
		mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
	}
	.x-masked {
		mask-image: linear-gradient(to right, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1));
	}
	.masked-full {
		mask-image: linear-gradient(to right, rgba(0, 0, 0, 0.05) 30%, rgba(0, 0, 0, 1));
	}

	.masked-top-down {
		mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 1));
	}
</style>
