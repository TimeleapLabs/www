<script>
  import Card from "../Card.svelte";

  export let gap = "1em";

  let gallery;
  let dragging;

  const onMouseDown = () => {
    dragging = true;
  };

  const onMouseUp = () => {
    dragging = false;
  };

  const onMouseMove = (e) => {
    if (dragging) {
      e.preventDefault();
      gallery.scrollLeft -= e.movementX;
    }
  };
</script>

<Card flat padding={false}>
  <div
    class="gallery"
    style="--gap: {gap};"
    bind:this={gallery}
    on:mousedown={onMouseDown}
    on:mouseleave={onMouseUp}
    on:mouseup={onMouseUp}
    on:mousemove={onMouseMove}
  >
    <slot />
  </div>
</Card>

<style>
  :global(.card) {
    justify-self: center;
    max-width: 100%;
  }
  .gallery {
    display: flex;
    gap: var(--gap);
    width: 100%;
    overflow: auto;
    padding: 1em;
    box-sizing: border-box;
    cursor: grab;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    align-items: center;
  }
  .gallery::-webkit-scrollbar {
    display: none;
  }
</style>
