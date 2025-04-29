<script lang="ts">
	import { page } from '$app/state';
	import { ogImage } from '$lib/seo/client';

	let {
		title = 'Timeleap — Distributed App Engine',
		description = 'Swiss tech company specialized in web3 infrastructure like Blockchain-as-a-Service. Building the Timeleap Network, our next-gen distributed computing platform.',
		ogImageFontSize = 28,
		ogImageText = 'Timeleap:\nDistributed\nApp Engine',
		image = undefined
	} = $props();

	const ogImageUrl = image ?? ogImage(ogImageText, ogImageFontSize);
	const url = 'https://timeleap.swiss' + page.url.pathname;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="color-scheme" content="dark" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	{@html `<meta property="og:image" content="${ogImageUrl}" />`}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	{@html `<meta name="twitter:image" content="${ogImageUrl}" />`}
</svelte:head>
