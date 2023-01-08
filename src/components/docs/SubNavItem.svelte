<script>
  import { page } from "$app/stores";

  import {
    SideNavMenu,
    SideNavMenuItem,
    SideNavLink,
  } from "carbon-components-svelte";

  export let indent = 0.5;
  export let nav;
  export let submenu = false;

  $: pathname = $page.url.pathname;
  $: expanded = nav.entries
    ? pathname.startsWith(nav.url)
    : nav.url === pathname;

  $: isSelected = pathname === nav.url;
</script>

<div style="--indent: {indent}rem">
  {#if nav.entries}
    <SideNavMenu {expanded} text={nav.title}>
      <SideNavLink {isSelected} href={nav.url} title={"Intro"} text="Intro" />
      {#each nav.entries as entry}
        <svelte:self indent={indent + 0.75} nav={entry} submenu />
      {/each}
    </SideNavMenu>
  {:else if submenu}
    <SideNavMenuItem
      {isSelected}
      href={nav.url}
      title={nav.title}
      text={nav.title}
    />
  {:else}
    <SideNavLink
      {isSelected}
      href={nav.url}
      title={nav.title}
      text={nav.title}
    />
  {/if}
</div>
