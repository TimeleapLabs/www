<script>
  import { page } from "$app/stores";

  import {
    SideNavMenu,
    SideNavMenuItem,
    SideNavLink,
  } from "carbon-components-svelte";

  export let indent = 0;
  export let nav;
  export let submenu = false;

  $: pathname = $page.url.pathname;
  $: active = nav.entries ? pathname.startsWith(nav.url) : nav.url === pathname;
</script>

{#if nav.entries}
  <SideNavMenu text={nav.title}>
    <SideNavLink href={nav.url} text="Intro" />
    {#each nav.entries as entry}
      <svelte:self indent={indent + 12} nav={entry} submenu />
    {/each}
  </SideNavMenu>
{:else if submenu}
  <SideNavMenuItem href={nav.url} text={nav.title} />
{:else}
  <SideNavLink href={nav.url} text={nav.title} />
{/if}
