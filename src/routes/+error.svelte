<script>
	import { page } from '$app/stores';
	import { Section, Card, Button } from '@timeleap/ui';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Icon from '@iconify/svelte';
</script>

<svelte:head>
	<title>Timeleap — {$page.status}</title>
</svelte:head>

<Navbar active="home"></Navbar>

<Section class="w-full flex-1 max-w-[1280px] mx-auto py-36 gap-16! px-4 md:px-16 xxl:px-0">
	<div>
		<h1 class="text-8xl text-white font-serif">
			{$page.status}
		</h1>
		<h2 class="text-4xl text-white font-serif">
			{$page.error?.message}
		</h2>
	</div>
	{#if $page.status === 404}
		<p class="text-white mt-8">
			Looks like you've hit a route that doesn't exist. Please check the URL or go back to the
			previous page.
			<br />
			Did you mean to visit the old site at
			<a
				href="https://old.timeleap.swiss{$page.url.pathname}{$page.url.search}"
				class="text-green-400"
				target="_blank"
			>
				https://old.timeleap.swiss{$page.url.pathname}{$page.url.search}
				<Icon icon="carbon:arrow-up-right" class="inline-block" />
			</a>?
		</p>

		<div class="mt-8 flex gap-4">
			<Button
				href="https://old.timeleap.swiss{$page.url.pathname}{$page.url.search}"
				class="bg-blue-400 text-black hover:bg-blue-300 font-semibold"
				animate
			>
				Old Website <Icon icon="carbon:arrow-up-right" />
			</Button>
			<Button href="/" class="bg-green-400 text-black hover:bg-green-300 font-semibold" animate>
				Go Home <Icon icon="carbon:arrow-right" />
			</Button>
		</div>
	{/if}

	<Card class="text-white bg-zinc-900 p-12 mt-8">
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

<Footer></Footer>
