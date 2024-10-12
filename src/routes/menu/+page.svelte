<script>
	import Icon from '@iconify/svelte';

	import Section from '$lib/layout/Section.svelte';
	import Grid from '$lib/layout/Grid.svelte';

	import Image from '$lib/ui/Image.svelte';
	import Button from '$lib/ui/Button.svelte';
	import Navbar from '$lib/ui/Navbar.svelte';
	import Card from '$lib/ui/Card.svelte';

	import Input from '$lib/forms/Input.svelte';
</script>

<svelte:head>
	<title>Timeleap | Distributed App Engine</title>
</svelte:head>

<Section class="w-full max-w-[1200px] mx-auto pt-12 !gap-16 px-4 xl:px-0 flex-1">
	<Navbar class="bg-zinc-900 text-white flex">
		<Button class="hover:bg-zinc-800" href="/">Home</Button>
		<Button class="bg-cyan-900 !hidden md:!inline-flex" href="/menu/products">
			<Icon icon="carbon:carbon" /> Products
		</Button>
		<Button class="hover:bg-zinc-800 !hidden md:!inline-flex">
			<Icon icon="carbon:email" /> Contact
		</Button>
		<div class="flex-1"></div>
		<Button class="bg-blue-500 !px-6 hover:bg-blue-400" on:click={() => window?.history?.go(-1)}>
			<Icon icon="carbon:arrow-left" width={24} />
		</Button>
	</Navbar>

	<Grid extraLargeScreenColumns={3} largeScreenColumns={2}>
		<Card class="!p-0 flex bg-violet-100" href="/menu/products">
			<div class="px-8 flex-1 content-center">
				<h3 class="font-serif text-2xl">Products</h3>
				<div class="text-gray-800">Timeleap products</div>
			</div>
			<Image src="/images/pattern1.svg" alt="Unchained" width="128px" height="128px"></Image>
		</Card>
	</Grid>
</Section>

<Section class="max-w-[1200px] mx-auto px-4 xl:px-0 pt-28">
	<Grid
		extraLargeScreenColumns={4}
		largeScreenColumns={4}
		mediumScreenColumns={3}
		smallScreenColumns={1}
		class="text-white pt-4"
	>
		<div class="md:pb-48 pb-16">
			<h3 class="font-serif text-xl pb-8">Timeleap SA.</h3>
			<p class="text-gray-300">Pl. de l'Industrie 2, 1180 Rolle, Switzerland</p>
			<img class="mt-8" src="/images/timeleap.svg" alt="Logo" width="160px" />
		</div>
		<div>
			<h3 class="font-serif text-xl pb-8">Social Media</h3>
			<div class="flex gap-4 flex-wrap max-w-[240px]">
				<a
					href="https://twitter.com"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					<Icon icon="carbon:logo-twitter" width="32" height="32" />
				</a>
				<a
					href="https://linkedin.com"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					<Icon icon="carbon:logo-linkedin" width="32" height="32" />
				</a>
				<a
					href="https://github.com"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					<Icon icon="carbon:logo-github" width="32" height="32" />
				</a>
				<a
					href="https://github.com"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					<Icon icon="carbon:send-alt" width="32" height="32" />
				</a>
				<a
					href="https://github.com"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					<Icon icon="carbon:logo-discord" width="32" height="32" />
				</a>
				<a
					href="https://github.com"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					<Icon icon="carbon:chat" width="32" height="32" />
				</a>
			</div>
		</div>
		<div>
			<h3 class="font-serif text-xl pb-8">Tokenomics</h3>
			<div class="flex gap-4 flex-col">
				<a
					href="https://twitter.com"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					KNS on Uniswap <Icon icon="carbon:arrow-up-right" class="inline-block ml-2" />
				</a>
				<a
					href="opensea.io/collection/kenshi-katana"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					Katana NFT on OpenSea <Icon icon="carbon:arrow-up-right" class="inline-block ml-2" />
				</a>
				<a
					href="opensea.io/collection/kenshi-katana"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					Stake <Icon icon="carbon:arrow-right" class="inline-block ml-2" />
				</a>
			</div>
		</div>
		<div>
			<h3 class="font-serif text-xl pb-8">Contact</h3>
			<div class="flex gap-4 flex-col">
				<a href="mailto:experts@kenshi.io" class="hover:text-green-400 transition-colors">
					Talk to an Expert <Icon icon="carbon:arrow-up-right" class="inline-block ml-2" />
				</a>
			</div>
		</div></Grid
	>
</Section>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.950);
	}
</style>
