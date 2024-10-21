<script>
	export let title = 'Timeleap — Indexing. Oracles. IoT.';
	export let description =
		'Timeleap is a blockchain tech company offering services such as Custom Oracle Network, blockchain IoT SDK, and Deep Indexing on Ethereum, Arbitrum, Aurora, Avalanche, Fantom, Polygon, Bitgert and the BNB Smart Chain.';
	export let image = 'https://old.timeleap.swiss/images/social.png';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://old.timeleap.swiss/" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://old.timeleap.swiss/" />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />
</svelte:head>
