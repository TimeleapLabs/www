<script>
  import { Tile, Button } from "carbon-components-svelte";
  import { ArrowUpRight, ArrowRight } from "carbon-icons-svelte";
  import { ImageLoader } from "carbon-components-svelte";
  import { Grid, Row, Column } from "carbon-components-svelte";
  import { Tag } from "carbon-components-svelte";

  export let title;
  export let description;
  export let href;
  export let image;
  export let external = false;
  export let target = external ? "_blank" : "_self";
  export let vertical = false;
  export let buttonText = "Read article";
  export let soon = false;
  export let fullHeight = false;
</script>

<div class="article" class:full-height={fullHeight}>
  <Grid condensed noGutter fullWidth>
    <Row>
      <Column md={vertical && 12} sm={4} class="noise">
        <ImageLoader src={image} alt={title} ratio={"1x1"} />
      </Column>
      <Column md={vertical && 12} sm={4}>
        <Tile>
          <div class="article-inner">
            <div class="padded">
              <h3>{title}</h3>
              <div class="content body-02">
                {description}
              </div>

              {#if soon}
                <div class="buttons">
                  <Tag type="teal">Coming soon</Tag>
                </div>
              {:else if href}
                <div class="buttons">
                  <Button
                    {href}
                    kind="secondary"
                    icon={external ? ArrowUpRight : ArrowRight}
                    {target}
                  >
                    {buttonText}
                  </Button>
                </div>
              {/if}
            </div>
          </div>
        </Tile>
      </Column>
    </Row>
  </Grid>
</div>

<style>
  .article {
    height: 100%;
  }
  .article :global(.bx--grid) {
    padding: 0 1rem;
  }
  @media (max-width: 640px) {
    .article :global(.bx--grid) {
      padding: 0;
      padding-left: 1em;
    }
  }
  .article :global(.bx--col) {
    padding: 0;
  }
  .article :global(.bx--tile) {
    padding: 0;
    height: 100%;
  }
  .article :global(.bx--aspect-ratio--object img) {
    height: 100%;
    object-fit: cover;
    transform: scale(1.02);
  }
  .article :global(.bx--aspect-ratio--object) {
    overflow: hidden;
  }
  .article-inner {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    height: 100%;
    min-height: 288px;
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

  .full-height {
    height: 100%;
  }

  .full-height :global(.bx--grid),
  .full-height :global(.bx--row) {
    height: 100%;
  }
</style>
