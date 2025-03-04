<script lang="ts">
	import { page } from '$app/stores';
	import { Section, Button } from '@timeleap/ui';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { ArrowRight } from 'lucide-svelte';
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
		</p>

		<div class="mt-8 flex gap-4">
			<Button href="/" class="bg-green-400 text-black hover:bg-green-300 font-medium" animate>
				Go Home <ArrowRight size={'1em'} />
			</Button>
		</div>
	{/if}
</Section>

<Footer></Footer>
