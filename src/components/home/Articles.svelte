<script>
  import { Grid, Row, Column, Button } from "carbon-components-svelte";
  import ExpressiveHeading from "../carbon/ExpressiveHeading.svelte";
  import BlogToc from "src/components/blog/Toc.svelte";
  import { Blog } from "carbon-icons-svelte";
</script>

<Grid padding>
  <Row>
    <Column lg={6}>
      <div class="flex-column blog">
        <ExpressiveHeading size={2}>
          <h2>Read our latest articles</h2>
        </ExpressiveHeading>
        <p class="body-02">
          Stay ahead of the curve with Kenshi's insightful blog! Dive into a
          wealth of knowledge with our expertly crafted articles, covering the
          latest trends, tips, and breakthroughs in blockchain technology and
          Web 3.0.
        </p>
        <div class="buttons">
          <Button href="/blog" icon={Blog}>Read all articles</Button>
        </div>
      </div>
    </Column>
    <Column />
    <Column lg={8}>
      <BlogToc maxCount={2} lg={16} />
    </Column>
  </Row>
</Grid>

<style>
  .blog .buttons {
    margin-top: 4em;
  }
</style>
