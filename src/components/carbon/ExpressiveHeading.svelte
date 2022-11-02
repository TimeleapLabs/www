<script>
  export let size;
</script>

<div class="expressive-heading size-{size}">
  <slot />
</div>

<style>
  .expressive-heading.size-1,
  .expressive-heading.size-1 :global(*) {
    font-size: var(--cds-expressive-heading-01-font-size);
    font-weight: var(--cds-expressive-heading-01-font-weight);
    line-height: var(--cds-expressive-heading-01-line-height);
    letter-spacing: var(--cds-expressive-heading-01-letter-spacing);
  }
  .expressive-heading.size-2,
  .expressive-heading.size-2 :global(*) {
    font-size: var(--cds-expressive-heading-02-font-size);
    font-weight: var(--cds-expressive-heading-02-font-weight);
    line-height: var(--cds-expressive-heading-02-line-height);
    letter-spacing: var(--cds-expressive-heading-02-letter-spacing);
  }
  .expressive-heading.size-3,
  .expressive-heading.size-3 :global(*) {
    font-size: var(--cds-expressive-heading-03-font-size);
    font-weight: var(--cds-expressive-heading-03-font-weight);
    line-height: var(--cds-expressive-heading-03-line-height);
    letter-spacing: var(--cds-expressive-heading-03-letter-spacing);
  }
  .expressive-heading.size-4,
  .expressive-heading.size-4 :global(*) {
    font-size: var(--cds-expressive-heading-04-font-size);
    font-weight: var(--cds-expressive-heading-04-font-weight);
    line-height: var(--cds-expressive-heading-04-line-height);
    letter-spacing: var(--cds-expressive-heading-04-letter-spacing);
  }
  .expressive-heading.size-5,
  .expressive-heading.size-5 :global(*) {
    font-size: var(--cds-expressive-heading-05-font-size);
    font-weight: var(--cds-expressive-heading-05-font-weight);
    line-height: var(--cds-expressive-heading-05-line-height);
    letter-spacing: var(--cds-expressive-heading-05-letter-spacing);
  }
  .expressive-heading.size-6,
  .expressive-heading.size-6 :global(*) {
    font-size: var(--cds-expressive-heading-06-font-size);
    font-weight: var(--cds-expressive-heading-06-font-weight);
    line-height: var(--cds-expressive-heading-06-line-height);
    letter-spacing: var(--cds-expressive-heading-06-letter-spacing);
  }
  .expressive-heading.size-7,
  .expressive-heading.size-7 :global(*) {
    font-size: var(--cds-expressive-heading-07-font-size);
    font-weight: var(--cds-expressive-heading-07-font-weight);
    line-height: var(--cds-expressive-heading-07-line-height);
    letter-spacing: var(--cds-expressive-heading-07-letter-spacing);
  }
</style>
