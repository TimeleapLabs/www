<script>
  //import Card from "src/components/Card.svelte";
  //import Button from "src/components/Button.svelte";
  import { Launch, ChevronRight } from "carbon-icons-svelte";
  import { Tile, Button } from "carbon-components-svelte";

  export let image;
  export let title;
  export let description;
  export let buttons;
</script>

<div class="wrap">
  <Tile>
    <div class="card-inner community">
      <div class="graphics">
        <img src={image} alt={title} />
      </div>
      <div class="content">
        <h2>{title}</h2>
        <div>
          {description}
        </div>
        <div class="spacer" />
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
  .spacer {
    flex: 1;
  }
  .card-inner .content {
    gap: 1em;
    text-align: left;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
  }
  .card-inner h2 {
    font-size: 1.5em;
    color: #111;
    margin-bottom: 0;
  }
  .card-inner .buttons {
    display: flex;
    gap: 0;
    flex-wrap: wrap;
    width: 100%;
    flex-wrap: wrap;
  }
  .card-inner img {
    max-width: 100%;
  }
  .community {
    gap: 0;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
  @media only screen and (max-width: 1200px) {
    .community {
      gap: 0;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr;
    }
  }
  .community h2 {
    margin: 0;
  }
  .community .graphics {
    height: 100%;
  }
  .community img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .community .content {
    padding: 2em;
  }
  @media only screen and (max-width: 600px) {
    .community .buttons {
      font-size: 0.9em;
    }
    .community .graphics {
      max-height: 242px;
    }
  }
</style>
