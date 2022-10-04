<script>
  import DefaultTags from "src/components/seo/DefaultTags.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { page } from "$app/stores";

  $: needsHead = !$page?.url?.pathname?.startsWith("/docs");

  import "../common.css";
</script>

<slot />

<SvelteToast />

{#if needsHead}
  <DefaultTags />
{/if}
