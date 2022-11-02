<script>
  import { Button } from "carbon-components-svelte";

  export let tabs = [];
  export let active = tabs[0];

  const activate = (tab) => () => (active = tab);

  $: activeIndex = tabs.indexOf(active);
  let tabsEl;

  $: if (tabsEl && activeIndex > -1) {
    for (const el of tabsEl.querySelectorAll(".active")) {
      el.classList.remove("active");
    }
    tabsEl.children[activeIndex].classList.add("active");
  }
</script>

<div class="wrap">
  <div class="tab-names">
    {#each tabs as tab}
      <Button
        kind={tab === active ? "tertiary" : "ghost"}
        on:click={activate(tab)}
      >
        <span>{tab}</span>
      </Button>
    {/each}
  </div>
  <div class="tabs" bind:this={tabsEl}>
    <slot />
  </div>
</div>

<style>
  .tabs > :global(*:not(.active)) {
    display: none;
  }
  .wrap {
    display: flex;
  }
  .tab-names {
    display: flex;
    flex-direction: column;
  }
  .tab-names span {
    white-space: nowrap;
  }
</style>
