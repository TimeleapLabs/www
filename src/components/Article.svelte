<script>
  import { Tile, Button } from "carbon-components-svelte";
  import { Launch } from "carbon-icons-svelte";

  export let image;
  export let title;
  export let description;
  export let href;
</script>

<div class="article">
  <Tile>
    <div class="article-inner">
      <img src={image} alt={title} />
      <div class="padded">
        <h3>{title}</h3>
        <div class="content">
          {description}
        </div>
        <div class="buttons">
          <Button {href} kind="secondary" icon={Launch}>Read article</Button>
        </div>
      </div>
    </div>
  </Tile>
</div>

<style>
  .article :global(.bx--tile) {
    padding: 0;
  }
  .articles .article img {
    max-width: 100%;
  }
  .article-inner {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    height: 100%;
  }
  .article {
    gap: 1em;
    display: flex;
    flex-direction: column;
  }
  .article h3 {
    margin-top: 0;
  }
  .article .buttons {
    display: flex;
    justify-content: start;
    margin-top: 2.5em;
    flex-wrap: wrap;
  }
  .article .padded {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    gap: 1em;
  }
  .article .padded .content {
    flex: 1;
  }
  .padded {
    padding: 2em;
  }
  @media only screen and (max-width: 640px) {
    .padded {
      padding: 1em;
    }
  }
</style>
