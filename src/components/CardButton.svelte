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
      <div class="description body-01">
        {description}
      </div>
      <div class="launch">
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
  .description {
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
  @media (max-width: 640px) {
    .launch,
    .description {
      display: none;
    }
    .title :global(svg) {
      height: 1.25em;
      width: 1.25em;
    }
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      gap: 1rem;
    }
    .title h4 {
      flex: 1;
      font-size: 0.9em;
    }
  }
</style>
