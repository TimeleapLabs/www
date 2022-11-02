<script>
  import { Tile, Content } from "carbon-components-svelte";
</script>

<div class="form">
  <div class="content">
    <slot />
  </div>
  <div class="sidebar dark-mode">
    <Tile class="sidebar-tile">
      <div class="sticky">
        <slot name="sidebar" />
      </div>
    </Tile>
  </div>
</div>

<style>
  .form {
    display: grid;
    grid-template-columns: 1fr 24rem;
    margin-top: 3rem;
  }
  .content {
    padding: 2rem;
  }
  .sidebar :global(.sidebar-tile) {
    height: 100%;
  }
  .sticky {
    position: sticky;
    top: 4rem;
    color: var(--cds-text-01);
  }
</style>
