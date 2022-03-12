<script>
  import Button from "src/components/Button.svelte";
  import ChevronRight from "src/icons/ChevronRight.svelte";
  import External from "src/icons/External.svelte";

  export let title;
  export let buttons;
</script>

<div class="usage">
  <h3>{title}</h3>
  <div class="graphics">
    <slot />
  </div>
  <div class="description">
    <slot name="description" />
  </div>
  <div class="buttons">
    {#each buttons as button}
      <Button
        solid={!!button.external}
        href={button.href}
        target={button.external ? "_blank" : ""}
      >
        {button.label}
        {#if button.external} <External /> {:else} <ChevronRight /> {/if}
      </Button>
    {/each}
  </div>
</div>

<style>
  .usage .graphics {
    display: flex;
    align-items: center;
    padding: 2em 0;
    gap: 1em;
  }
  .usage .graphics :global(svg) {
    height: 1.5em;
  }
  .usage h3 {
    margin: 0;
    margin-top: 0.25em;
  }
  .usage {
    display: flex;
    flex-direction: column;
  }
  .usage .description {
    flex: 1;
  }
  .usage .buttons {
    display: flex;
    gap: 1em;
    margin-top: 1em;
    flex-wrap: wrap;
  }
</style>
