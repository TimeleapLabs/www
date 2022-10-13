<script>
  //import Button from "src/components/Button.svelte";
  //import ChevronRight from "src/icons/ChevronRight.svelte";
  //import External from "src/icons/External.svelte";

  import { Button, Tile } from "carbon-components-svelte";
  import { Launch, ChevronRight } from "carbon-icons-svelte";

  export let title;
  export let description;
  export let buttons;
</script>

<Tile>
  <div class="product">
    <div class="usecases">
      <slot />
    </div>
    <h2>{title}</h2>
    <div class="description">
      {description}
    </div>
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
  </div>
</Tile>

<style>
  .product .description {
    flex: 1;
  }
  .product .usecases {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 5fr;
    gap: 1em;
    align-items: center;
  }
  .product .usecases :global(svg) {
    max-height: 1.5em;
  }
  .product {
    display: flex;
    gap: 1em;
    flex-direction: column;
  }
  .product .buttons {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2em;
    flex-wrap: wrap;
  }
</style>
