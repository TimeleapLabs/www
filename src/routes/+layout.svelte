<script>
  import DefaultTags from "src/components/seo/DefaultTags.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { page } from "$app/stores";
  import { setRef } from "$lib/ref";
  import { onMount } from "svelte";
  import Navbar from "src/components/Navbar.svelte";
  import {
    InlineNotification,
    NotificationActionButton,
  } from "carbon-components-svelte";
  import { fade } from "svelte/transition";

  $: needsHead = !$page?.url?.pathname?.match(
    /^\/(docs|blog|iot-sdk|deep-index|oracle-network)/
  );

  import "carbon-components-svelte/css/all.css";
  import "../common.css";

  let theme = "white"; // "white" | "g10" | "g80" | "g90" | "g100"
  $: if (typeof document !== "undefined") {
    document.documentElement.setAttribute("theme", theme);
  }

  onMount(setRef);

  let notice = true;
</script>

<Navbar />

<slot />

<SvelteToast />

{#if needsHead}
  <DefaultTags />
{/if}

{#if notice}
  <div class="notice" transition:fade>
    <InlineNotification
      kind="warning"
      title="Migration"
      subtitle="The Kenshi V3 migration is scheduled for Wednesday, May 31st."
      on:close={(e) => {
        e.preventDefault();
        notice = false;
      }}
    >
      <svelte:fragment slot="actions">
        <NotificationActionButton href="/docs/migration">
          Learn more
        </NotificationActionButton>
      </svelte:fragment>
    </InlineNotification>
  </div>
{/if}

<style>
  .notice {
    position: fixed;
    left: 50%;
    bottom: 2em;
    transform: translateX(-50%);
    z-index: 8;
  }
</style>
