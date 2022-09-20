<script>
  import SubNav from "./SubNav.svelte";
  import navData from "src/lib/docs.nav.js";

  const topLevel = { title: "Documentation", url: "/docs" };
</script>

<h5>Table of Contents</h5>

<SubNav nav={topLevel} />

{#each navData as nav}
  <SubNav {nav} />
{/each}
