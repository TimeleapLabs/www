<script>
  import { Tile } from "carbon-components-svelte";
  import { theme } from "src/stores/theme";

  import mermaid from "mermaid";

  export let id = "mermaid";
  export let description;

  let mermaidEl;
  let mermaidTheme;

  $: mermaidTheme = $theme === "g100" ? "dark" : "default";

  $: if (mermaidEl && mermaidTheme) {
    mermaid.initialize({
      theme: mermaidTheme,
    });

    mermaid.run({ nodes: [mermaidEl] });
  }
</script>

<Tile>
  {#key mermaidTheme}
    <pre bind:this={mermaidEl} {id}><slot /></pre>
  {/key}
</Tile>

{#if description}
  <p>{description}</p>
{/if}

<style>
  p {
    margin-top: 1rem;
    text-align: center;
    font-style: italic;
  }
</style>
