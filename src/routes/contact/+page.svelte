<script>
	import { Section } from '@timeleap/ui';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<svelte:head>
	<title>Timeleap — Distributed App Engine</title>
</svelte:head>

<Navbar active="contact"></Navbar>

<Section class="w-full max-w-[1280px] mx-auto pt-20 pb-24 flex-1 gap-16! px-4 md:px-16 xxl:px-0">
	<Contact></Contact>
</Section>

<Footer></Footer>
