<script>
  import { getContext } from "svelte";
  import { TABS } from "./Tabs.svelte";

  const panel = {};
  const { registerPanel, selectedPanel } = getContext(TABS);

  registerPanel(panel);
</script>

{#if $selectedPanel === panel}
  <div class="panel">
    <slot />
  </div>
{/if}

<style>
  .panel {
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
</style>
