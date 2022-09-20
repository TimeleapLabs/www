<script>
  import ChevronDown from "src/icons/ChevronDown.svelte";
  import ChevronUp from "src/icons/ChevronUp.svelte";

  import { slide } from "svelte/transition";
  import { page } from "$app/stores";

  export let indent = 0;
  export let nav;

  $: pathname = $page.url.pathname;
  $: active = nav.entries ? pathname.startsWith(nav.url) : nav.url === pathname;
  $: expanded = active;

  const expand = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    console.log(e);
    expanded = !expanded;
  };
</script>

<a style="padding-left: {indent}px" href={nav.url} class:active>
  <span class="title">
    {nav.title}
  </span>
  {#if nav.entries}
    <span class="chevron" on:click={expand}>
      {#if expanded}
        <ChevronUp />
      {:else}
        <ChevronDown />
      {/if}
    </span>
  {/if}
</a>

{#if expanded && nav.entries}
  {#each nav.entries as entry}
    <svelte:self indent={indent + 12} nav={entry} />
  {/each}
{/if}

<style>
  a {
    width: 100%;
    display: flex;
    text-decoration: none !important;
    box-sizing: border-box;
  }
  a.active {
    color: var(--primary-color);
  }
  a :global(svg) {
    width: 0.65em;
  }
  a .title {
    flex: 1;
  }
</style>
