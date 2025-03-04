<script lang="ts">
	import { Section, Grid, Button, Card } from '@timeleap/ui';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Subscribe from '$lib/components/Subscribe.svelte';
	import UseCase from '$lib/components/home/UseCase.svelte';
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import Carousel from '$lib/components/Carousel.svelte';

	import { ArrowRight, Asterisk, Bitcoin, CpuIcon, Factory } from 'lucide-svelte';
	import { useCases } from '$lib/content/use-cases';

	let filter = 'all';
	let scrollY = 0;

	const getFilteredUseCases = (filter: string) =>
		filter === 'all' ? useCases : useCases.filter((useCase) => useCase.tags.includes(filter));

	const setFilter = (newFilter: string) => () => {
		filter = newFilter;
	};
</script>

<svelte:window on:scroll={() => (scrollY = window.scrollY)} />

<MetaTags />

<Navbar active="home"></Navbar>

<Section class="w-full max-w-[1920px] mx-auto pt-12 gap-32! px-4 md:px-16 xxl:px-0">
	<Grid
		extraLargeScreenColumns={1}
		largeScreenColumns={1}
		mediumScreenColumns={1}
		class="gap-16! pt-10 md:pt-24 max-w-full box-border px-8"
	>
		<Card class="relative h-[440px] md:h-[640px] overflow-hidden px-0!">
			<div class="w-full flex flex-col justify-end h-full z-10 relative">
				<h1 class="font-serif text-3xl md:text-6xl text-white">
					<span class="docs-heading leading-loose"> Timeleap </span><br />
					The Distributed<br />
					Cloud.
				</h1>
				<p class="mt-12 text-zinc-100 font-light w-full md:w-3/4 xl:w-2/3 xxl:w-1/2">
					Timeleap provides you with all the tools you need to build high-performance, distributed
					applications.
				</p>
				<div class="mt-16">
					<Button
						class="bg-green-400 text-black hover:bg-green-300 font-medium"
						animate
						href="/docs"
					>
						Read the Docs <ArrowRight size={'1em'} strokeWidth={2.5} class="inline" />
					</Button>
				</div>
			</div>
		</Card>
	</Grid>

	<div
		class="absolute left-0 top-0 w-full h-full z-0 group-hover:scale-125 transition-transform ease-in-out duration-300 masked-top-down"
	>
		<img
			src="/images/hero.jpg"
			alt="Timeleap hero"
			class="w-full h-full object-cover"
			style="transform: translateY({-Math.min(250, scrollY * 0.5)}px);"
		/>
	</div>
</Section>

<div class="overflow-hidden">
	<Section class="w-full max-w-[1920px] mx-auto pt-32 gap-32! pl-8 md:px-16 xxl:px-0">
		<Section class="gap-4! px-0 md:px-8 xxl:px-0">
			<div
				class="flex md:justify-between items-center flex-wrap justify-center relative z-10 gap-8 pr-8 md:pr-0"
			>
				<h2
					class="font-serif text-2xl md:text-xl leading-snug z-10 docs-heading text-center md:text-left"
				>
					Discover the Possibilities
				</h2>
				<div class="flex flex-wrap items-center justify-center md:justify-end gap-4">
					<Button
						class="hover:bg-zinc-900 font-medium border! border-zinc-800!"
						animate
						on:click={setFilter('compute')}
					>
						<CpuIcon size={'1em'} strokeWidth={2.5} class="inline" />
						Compute
					</Button>
					<Button
						class="hover:bg-zinc-900 font-medium border! border-zinc-800!"
						animate
						on:click={setFilter('blockchain')}
					>
						<Bitcoin size={'1em'} strokeWidth={2.5} class="inline" />
						Blockchain
					</Button>
					<Button
						class="hover:bg-zinc-900 font-medium border! border-zinc-800!"
						animate
						on:click={setFilter('industry-4.0')}
					>
						<Factory size={'1em'} strokeWidth={2.5} class="inline" />
						Industry 4.0
					</Button>
					<Button
						class="hover:bg-zinc-900 font-medium border! border-zinc-800!"
						animate
						on:click={setFilter('all')}
					>
						<Asterisk size={'1em'} strokeWidth={2.5} class="inline" />
						All
					</Button>
				</div>
			</div>
			<div class="relative">
				<div class="absolute -left-[550px] -top-[240px] text-zinc-800 origin-center z-0">
					<Asterisk size={'1100'} strokeWidth={2} style="transform:rotate({scrollY / 10}deg)" />
				</div>
				<div style="transform: translateX({Math.max(0, 720 - scrollY)}px);">
					<Carousel class="gap-8">
						{#each getFilteredUseCases(filter) as { src, title, body, shade }}
							<UseCase {src} {title} {shade}>{body}</UseCase>
						{/each}
					</Carousel>
				</div>
			</div>
		</Section>
	</Section>
</div>

<Section class="w-full max-w-[1920px] mx-auto pt-12 gap-32! px-0 md:px-16 xxl:px-0">
	<Grid
		extraLargeScreenColumns={2}
		largeScreenColumns={2}
		mediumScreenColumns={2}
		smallScreenColumns={1}
		class="gap-4! md:gap-16! grid-rows-[auto] px-4"
	>
		<Card class="text-white flex flex-col gap-4">
			<div>
				<h2 class="font-serif text-2xl leading-snug docs-heading">Build With Timeleap</h2>
			</div>
			<p class="text-zinc-300 flex-1">
				Build your app with our SDK. Distribute your app to a global network of devices. Monitor
				your app's performance in real-time.
			</p>
			<a href="/docs" class="text-green-400 hover:underline">
				Discover our solutions <ArrowRight size={'1em'} strokeWidth={2.5} class="inline" />
			</a>
		</Card>
		<Card class="text-white flex flex-col gap-4">
			<div>
				<h2 class="font-serif text-2xl leading-snug docs-heading">Join the Network</h2>
			</div>
			<p class="text-zinc-300 flex-1">
				Whether you're an individual with spare computing power or a company looking to scale
				distributed workloads, you can run a Timeleap subnet and contribute to a decentralized
				ecosystem—on your terms.
			</p>
			<span class="text-zinc-400">Coming soon</span>
			<!--a href="/docs" class="text-green-400 hover:underline">
				Learn the benefits <ArrowRight size={'1em'} strokeWidth={2.5} class="inline" />
			</a-->
		</Card>
	</Grid>
</Section>

<Section class="w-full max-w-[1920px] mx-auto pt-12 gap-16! pb-24 px-0 md:px-16 xxl:px-0">
	<Subscribe class="mt-16"></Subscribe>
</Section>

<Footer></Footer>

<style>
	.masked-top-down {
		mask-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
	}
</style>
