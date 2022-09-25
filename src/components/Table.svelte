<div class="table">
  <table>
    <slot />
  </table>
</div>

<style>
  table {
    border-collapse: collapse;
    text-align: left;
    width: 100%;
    position: relative;
  }
  .table {
    border-radius: 4px;
    border: 1px solid #e4e4e4;
    overflow: auto;
    display: flex;
    align-items: stretch;
  }
  .table :global(.highlight pre) {
    margin: 0;
    white-space: break-spaces;
  }
  .table :global(.highlight),
  .table :global(.highlight pre) {
    display: inline;
    white-space: inherit;
  }
  table :global(td),
  table :global(td *) {
    vertical-align: top;
    min-width: 200px;
    max-width: 400px;
  }
  table :global(th) {
    padding: 0.5em 1em;
    box-sizing: border-box;
    border-bottom: 1px solid #e4e4e4;
  }
  table :global(td) {
    padding: 0.5em 1em;
  }
  table :global(tbody tr:nth-of-type(2n + 1)),
  table :global(tbody tr:nth-of-type(2n + 1) .highlight) {
    background: #f4f4f4;
  }
</style>
