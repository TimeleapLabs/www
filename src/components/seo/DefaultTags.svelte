<script>
  export let title = "Kenshi — Indexing. Oracles. IoT.";
  export let description =
    "Kenshi is a blockchain tech company offering services such as Custom Oracle Network, blockchain IoT SDK, and Deep Indexing on Ethereum, Arbitrum, Aurora, Avalanche, Fantom, Polygon, Bitgert and the BNB Smart Chain.";
</script>

<svelte:head>
  <title>Kenshi — A Blockchain Tech Company</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://kenshi.io/" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="https://kenshi.io/images/social.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://kenshi.io/" />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta
    property="twitter:image"
    content="https://kenshi.io/images/social.png"
  />
</svelte:head>
