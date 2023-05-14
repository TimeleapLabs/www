<script>
  import { ClickableTile } from "carbon-components-svelte";
  import ExpressiveHeading from "./carbon/ExpressiveHeading.svelte";
  import { Launch } from "carbon-icons-svelte";

  export let href;
  export let title;
  export let description;
  export let icon;

  const Icon = icon;
</script>

<div class="wrap">
  <ClickableTile {href}>
    <div class="inner">
      <ExpressiveHeading size={3}>
        <div class="title">
          <Icon />
          <h4>
            {title}
          </h4>
        </div>
      </ExpressiveHeading>
      <p>
        {description}
      </p>
      <div class="icon">
        <Launch />
      </div>
    </div>
  </ClickableTile>
</div>

<style>
  .wrap,
  .wrap :global(.bx--tile) {
    height: 100%;
  }
  p {
    flex: 1;
  }
  .inner {
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: flex-start;
    height: 100%;
    padding: 1em;
  }
  .title {
    display: flex;
    width: 100%;
    gap: 0.5em;
    align-items: center;
  }
</style>
