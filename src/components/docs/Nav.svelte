<script>
  import SubNavItem from "./SubNavItem.svelte";
  import navData from "src/lib/docs.nav.js";

  import { SideNav, SideNavItems } from "carbon-components-svelte";

  const topLevel = { title: "Documentation", url: "/docs" };
</script>

<SideNav isOpen fixed class="docs-side-nav">
  <SideNavItems>
    <SubNavItem nav={topLevel} />

    {#each navData as nav}
      <SubNavItem {nav} />
    {/each}
  </SideNavItems>
</SideNav>
