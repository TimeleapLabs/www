<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  import Section from "src/components/Section.svelte";
  import Articles from "src/components/Articles.svelte";
  import Article from "src/components/Article.svelte";
  import Button from "src/components/Button.svelte";
  import External from "src/icons/External.svelte";
  import { onMount } from "svelte";

  export let examples = [];

  onMount(async () => {
    const res = await fetch("/api/examples");
    examples = await res.json();
  });
</script>

<Navbar />

<Section>
  <Articles title="Examples">
    {#each examples as example}
      <Article
        title={example.name}
        description={example.description}
        image={example.image}
        tags={example.tags}
      >
        <Button href={example.url} target="_blank" solid>
          View website
          <External />
        </Button>
        <Button href={example.source_url} target="_blank" solid>
          View source code
          <External />
        </Button>
      </Article>
    {/each}
  </Articles>
</Section>

<Footer />

<style>
</style>
