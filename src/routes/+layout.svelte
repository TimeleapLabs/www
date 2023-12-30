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
    /^\/(docs|blog|iot-sdk|deep-index|oracle-network|nft|analytics|unchained)/
  );

  import "carbon-components-svelte/css/all.css";
  import "../common.css";

  let theme = "white"; // "white" | "g10" | "g80" | "g90" | "g100"
  $: if (typeof document !== "undefined") {
    document.documentElement.setAttribute("theme", theme);
  }

  let cookieMessage = false;

  const acceptCookies = () => {
    cookieMessage = false;
    localStorage.setItem("cookieAccepted", "true");
  };

  onMount(() => {
    setRef();
    cookieMessage = localStorage.getItem("cookieAccepted") !== "true";
  });
</script>

<Navbar />

<slot />

<SvelteToast />

{#if needsHead}
  <DefaultTags />
{/if}

{#if cookieMessage}
  <div class="cookie">
    <InlineNotification
      kind="info"
      subtitle="This website uses cookies"
      hideCloseButton
    >
      <svelte:fragment slot="actions">
        <NotificationActionButton on:click={acceptCookies}>
          Accept
        </NotificationActionButton>
        <NotificationActionButton
          href="https://en.wikipedia.org/wiki/HTTP_cookie"
        >
          Leave
        </NotificationActionButton>
      </svelte:fragment>
    </InlineNotification>
  </div>
{/if}

<style>
  .cookie {
    position: fixed;
    right: 1em;
    bottom: 1em;
    max-width: 80%;
  }
  .cookie :global(a) {
    text-decoration: none;
  }
</style>
