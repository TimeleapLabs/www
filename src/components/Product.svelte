<script>
  import { Tile, Tag, Link } from "carbon-components-svelte";
  import { ArrowRight } from "carbon-icons-svelte";
  import AdaptiveProductIcon from "./AdaptiveProductIcon.svelte";

  export let title;
  export let icon;
  export let tags = [];
  export let href;
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
    {#if href}
      <div class="link">
        <Link {href} icon={ArrowRight}>Learn more</Link>
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
    max-height: 1em;
    width: auto !important;
    height: auto !important;
  }
  .product {
    display: flex;
    gap: 1em;
    flex-direction: column;
    justify-content: start;
    height: 100%;
  }
  .description {
    flex: 1;
  }
  .link,
  .tags {
    display: flex;
    flex-wrap: wrap;
    flex-wrap: wrap;
    gap: 0.5em;
  }
</style>
