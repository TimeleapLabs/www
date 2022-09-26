<script>
  export let cols;
  export let gap;
</script>

<div class="grid" style="--cols: {cols}; --gap: {gap}">
  <slot />
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: var(--cols);
    gap: var(--gap);
  }
  @media only screen and (max-width: 640px) {
    .grid {
      grid-template-columns: 1fr;
      gap: 1em;
    }
  }
</style>
