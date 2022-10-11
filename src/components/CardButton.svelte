<script>
  import { ClickableTile } from "carbon-components-svelte";
  import { Launch } from "carbon-icons-svelte";

  export let href;
  export let image;
  export let title;
  export let description;
</script>

<div class="wrap">
  <ClickableTile {href} target="_blank">
    <div class="card-button">
      <div class="graphics">
        <img src={image} alt={title} />
      </div>
      <div class="content">
        <div class="vendor">
          <h3>{title}</h3>
          <div class="spacer" />
          <Launch />
        </div>
        <div class="text">{description}</div>
      </div>
    </div>
  </ClickableTile>
</div>

<style>
  .wrap :global(.bx--tile--clickable) {
    padding: 0;
  }
  .card-button {
    display: grid;
    grid-template-columns: 1.5fr 3fr;
    height: 100%;
  }
  .card-button .graphics {
    max-height: 128px;
  }
  .card-button .graphics img {
    height: 100%;
    max-width: 100%;
    object-fit: cover;
  }
  .card-button .content {
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .card-button .vendor {
    display: flex;
    align-items: center;
  }
  .card-button :global(svg) {
    height: 1em;
  }
  .vendor h3 {
    margin: 0;
  }
  .vendor .spacer {
    flex: 1;
  }
</style>
