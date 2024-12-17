<script>
	import Icon from '@iconify/svelte';
	import { Section, Grid, Image, Button, Card } from '@timeleap/ui';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Subscribe from '$lib/components/Subscribe.svelte';

	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import Terminal from '$lib/components/puzzle/Terminal.svelte';
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
					The Shadowblade<br />
					Chronicles
				</h1>
				<p class="mt-12 text-zinc-100 font-light w-full md:w-3/4 xl:w-2/3 xxl:w-1/2">
					Play the game, solve the puzzles, and uncover the mysteries of the Shadowblade Chronicles.
					<br />
					200,000 KNS tokens for the first person to solve the puzzle hidden within the game.
				</p>
				<div class="mt-16">
					<Button
						class="bg-green-400 text-black hover:bg-green-300 font-semibold"
						animate
						href="/docs"
					>
						See Puzzle Wallet<Icon icon="carbon:arrow-right" />
					</Button>
				</div>
			</div>
			<div class="bg absolute top-0 right-0 left-0 bottom-0 h-full z-0 masked">
				<Image
					src="/images/game/poster.png"
					alt="Hero"
					class="object-cover object-top h-full w-full"
				></Image>
			</div>
		</Card>
	</Grid>

	<Grid
		extraLargeScreenColumns={1}
		largeScreenColumns={1}
		mediumScreenColumns={1}
		class="gap-16! max-w-full box-border"
	>
		<Terminal></Terminal>
	</Grid>
</Section>

<Section class="w-full max-w-[1920px] mx-auto pt-20 gap-16! pb-24 px-4 md:px-16 xxl:px-0">
	<Subscribe class="mt-16"></Subscribe>
</Section>

<Footer></Footer>

<style>
	.masked {
		mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 40%);
	}
</style>
