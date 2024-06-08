<script>
  import { ImageLoader } from "carbon-components-svelte";
  import { theme } from "src/stores/theme";

  export let product;
  export let alt;
  export let width = "100%";
  export let height = "2em";
</script>

<div class="wrap">
  <div class="image" style="--max-width: {width}; --max-height: {height}">
    {#key $theme}
      <ImageLoader
        src="/images/products/{product}.{$theme || 'white'}.svg"
        {alt}
        {width}
        {height}
      />
    {/key}
  </div>
</div>

<style>
  .wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
  }
  .image {
    max-width: var(--max-width);
    max-height: var(--max-height);
    width: 100%;
    display: flex;
  }
</style>
