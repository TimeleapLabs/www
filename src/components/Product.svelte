<script>
  import { Button, Tile, Tag } from "carbon-components-svelte";
  import { Launch, ChevronRight } from "carbon-icons-svelte";
  import AdaptiveProductIcon from "./AdaptiveProductIcon.svelte";

  export let title;
  export let icon;
  export let buttons = [];
  export let tags = [];
</script>

<Tile class="full-height">
  <div class="product">
    <h2>
      <AdaptiveProductIcon product={icon} alt={title} />
      {title}
    </h2>
    <div class="description body-01">
      <slot />
    </div>
    <div class="tags">
      {#each tags as tag}
        <Tag>{tag}</Tag>
      {/each}
    </div>
    {#if buttons.length > 0}
      <div class="buttons">
        {#each buttons as button}
          <Button
            kind={button.external ? "secondary" : "primary"}
            icon={button.external ? Launch : ChevronRight}
            href={button.href}
            target={button.external ? "_blank" : ""}
          >
            {button.label}
          </Button>
        {/each}
      </div>
    {/if}
  </div>
</Tile>

<style>
  h2 {
    display: flex;
    gap: 0.5em;
    align-items: center;
  }
  h2 :global(img) {
    max-width: 1em;
    width: auto !important;
    height: auto !important;
  }
  .product {
    display: flex;
    gap: 1em;
    flex-direction: column;
    justify-content: start;
  }
  .product .buttons,
  .tags {
    display: flex;
    flex-wrap: wrap;
    flex-wrap: wrap;
    gap: 0.5em;
  }
</style>
