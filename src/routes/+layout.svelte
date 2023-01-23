<script>
  import DefaultTags from "src/components/seo/DefaultTags.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { page } from "$app/stores";
  import { setRef } from "$lib/ref";
  import { onMount } from "svelte";
  import Navbar from "src/components/Navbar.svelte";

  $: needsHead = !$page?.url?.pathname?.match(/^(\/docs|\/blog)/);

  import "carbon-components-svelte/css/all.css";
  import "../common.css";

  let theme = "white"; // "white" | "g10" | "g80" | "g90" | "g100"
  $: if (typeof document !== "undefined") {
    document.documentElement.setAttribute("theme", theme);
  }

  onMount(setRef);
</script>

<Navbar />

<slot />

<SvelteToast />

{#if needsHead}
  <DefaultTags />
{/if}
