<script>
  import { ClickableTile } from "carbon-components-svelte";
  import ExpressiveHeading from "./carbon/ExpressiveHeading.svelte";
  import { ArrowRight } from "carbon-icons-svelte";

  export let external = false;
  export let target = external ? "_blank" : "_self";
  export let href;
  export let title;
</script>

<ClickableTile {href} {target}>
  <div class="container">
    <ExpressiveHeading size={1}>
      <h2>{title}</h2>
    </ExpressiveHeading>
    <div class="body-01">
      <slot />
    </div>
    <span class="blue arrow">
      <ArrowRight size={24} />
    </span>
  </div>
</ClickableTile>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .arrow {
    margin-top: 1em;
  }
</style>
