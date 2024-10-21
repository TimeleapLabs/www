<script>
	import Icon from '@iconify/svelte';
	import { Section, Grid, Image, Button, Card } from '@timeleap/ui';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import Subscribe from '$lib/components/Subscribe.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<svelte:head>
	<title>Timeleap | Distributed App Engine</title>
</svelte:head>

<Navbar active="contact"></Navbar>

<Section class="w-full max-w-[1280px] mx-auto pt-20 pb-24 flex-1 !gap-16 px-4 xl:px-0">
	<Contact></Contact>
</Section>

<Footer></Footer>
