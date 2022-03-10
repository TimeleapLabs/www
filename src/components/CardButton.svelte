<script>
  import Card from "./Card.svelte";
  import External from "../icons/External.svelte";

  export let href;
  export let image;
  export let title;
  export let description;
</script>

<a {href} target="_blank">
  <Card padding={false}>
    <div class="card-button">
      <div class="graphics">
        <img src={image} alt={title} />
      </div>
      <div class="content">
        <div class="vendor">
          <h3>{title}</h3>
          <div class="spacer" />
          <External />
        </div>
        <div class="text">{description}</div>
      </div>
    </div>
  </Card>
</a>

<style>
  a {
    color: #111;
  }
  a {
    transition: cubic-bezier(0.25, 0.46, 0.45, 0.94) all 0.2s;
    z-index: 0;
  }
  a:hover {
    transform: scale(1.02) translateX(-2px) translateY(-2px);
  }
  a:active {
    transform: scale(0.98) translateX(2px) translateY(2px);
  }
  :global(.card) {
    transition: cubic-bezier(0.25, 0.46, 0.45, 0.94) all 0.2s;
  }
  a:hover :global(.card) {
    box-shadow: 1em 1em 2em 0.5em rgb(0 0 0 / 10%);
  }
  .card-button {
    display: grid;
    grid-template-columns: 1.5fr 3fr;
    height: 100%;
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
