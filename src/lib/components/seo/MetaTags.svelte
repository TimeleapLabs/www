<script lang="ts">
	import { page } from '$app/stores';

	export let title: string = 'Timeleap — Distributed App Engine';
	export let description: string =
		'Swiss tech company specialized in web3 infrastructure like Blockchain-as-a-Service. Building the Unchained Network, our next-gen distributed computing platform.';

	export let image: string = 'https://timeleap.swiss/images/social.jpg';
	const url = 'https://timeleap.swiss' + $page.url.pathname;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<meta name="title" content={title} />
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={url} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />
</svelte:head>
