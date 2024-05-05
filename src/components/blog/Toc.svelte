<script>
  import { ClickableTile, Tag } from "carbon-components-svelte";
  import { Grid, Row, Column } from "carbon-components-svelte";

  import ExpressiveHeading from "../carbon/ExpressiveHeading.svelte";
  import shave from "shave";

  import nav from "src/lib/blog.nav.js";

  export let maxCount = nav.length;
  export let lg = 16;
  export let md = 8;
  export let sm = 4;

  const shaveEl = (el) => shave(el, 84);
</script>

<div class="articles">
  <Grid fullWidth noGutter padding>
    <Row>
      {#each nav.slice(0, maxCount) as article}
        <Column {lg} {md} {sm}>
          <ClickableTile class="tile" href={article.url}>
            <div class="container">
              <div class="article">
                <ExpressiveHeading size={3}>
                  <h3>{article.title}</h3>
                </ExpressiveHeading>
                <div class="body-compact-02" use:shaveEl>
                  {article.meta.summary}
                </div>
                <div class="flex-spacer" />
                <div class="tags">
                  {#each article.meta.tags as tag}
                    <Tag>{tag}</Tag>
                  {/each}
                </div>
              </div>
              <div class="banner">
                <img src={article.meta.banner} alt={article.title} />
              </div>
            </div>
          </ClickableTile>
        </Column>
      {/each}
    </Row>
  </Grid>
</div>

<style>
  .flex-spacer {
    flex: 1;
  }
  .articles :global(.bx--row > div > a) {
    height: 100%;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
  }
  .article {
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 1em;
    flex: 1;
  }
  .article h3 {
    margin-top: 0 !important;
  }
  .banner {
    max-width: 100%;
    width: 364px;
    align-self: stretch;
  }
  .banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.1s linear all;
  }
  .articles :global(.tile) {
    padding: 0;
  }
  .articles :global(.tile + .tile) {
    margin-top: 2em;
  }
  .container:hover .banner img {
    filter: brightness(1.1) contrast(0.9);
  }
  @media (max-width: 1680px) {
    .banner {
      max-width: 100%;
      width: 260px;
      align-self: stretch;
    }
  }
  @media (max-width: 720px) {
    .banner {
      max-width: 100%;
      width: 192px;
      align-self: stretch;
    }
  }
  @media (max-width: 440px) {
    .banner {
      max-width: 100%;
      width: 100%;
      max-height: 224px;
    }
  }
</style>
