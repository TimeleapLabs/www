<script>
  //import Card from "src/components/Card.svelte";
  //import Button from "src/components/Button.svelte";
  import { Launch, ChevronRight } from "carbon-icons-svelte";
  import { Tile, Button } from "carbon-components-svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";

  export let title;
  export let description;
  export let buttons;
</script>

<div class="wrap">
  <Tile>
    <div class="card-inner community">
      <div class="content">
        <ExpressiveHeading size={4}>
          <h2>{title}</h2>
        </ExpressiveHeading>
        <div>
          {description}
        </div>
        <div class="flex-spacer" />
        <div class="buttons">
          {#each buttons as button}
            <Button
              kind={button.external ? "secondary" : "primary"}
              href={button.href}
              target={button.external ? "_blank" : ""}
              icon={button.external ? Launch : ChevronRight}
            >
              {button.label}
            </Button>
          {/each}
        </div>
      </div>
    </div>
  </Tile>
</div>

<style>
  .wrap :global(.bx--tile) {
    padding: 0;
  }
  @media only screen and (max-width: 640px) {
    .card-inner .buttons {
      justify-content: flex-start;
    }
  }
  .card-inner {
    display: flex;
    gap: 3em;
  }
  .flex-spacer {
    flex: 1;
  }
  .card-inner .content {
    gap: 1em;
    text-align: left;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
  }
  .card-inner .buttons {
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
    width: 100%;
    flex-wrap: wrap;
  }
  .community h2 {
    margin: 0;
  }
  .community .content {
    padding: 2em;
  }
  @media only screen and (max-width: 600px) {
    .community .buttons {
      font-size: 0.9em;
    }
  }
</style>
