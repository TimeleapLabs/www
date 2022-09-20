<script>
  import { getContext } from "svelte";
  import { TABS } from "./Tabs.svelte";
  import Button from "../Button.svelte";

  const tab = {};
  const { registerTab, selectTab, selectedTab } = getContext(TABS);

  registerTab(tab);
</script>

<Button active={$selectedTab === tab} on:click={() => selectTab(tab)}>
  <slot />
</Button>
