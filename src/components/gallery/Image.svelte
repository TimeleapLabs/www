<script>
  import { expoInOut } from "svelte/easing";
  import { Column, Tile } from "carbon-components-svelte";

  export let alt;
  export let src;
  export let radius = 0;
  export let height = "auto";
  export let width = "auto";

  let zoom = false;
  let unzoomImage;

  function zoomEffect(node, { delay = 0, duration = 200 }) {
    const unzoomStyle = getComputedStyle(unzoomImage);
    const zoomStyle = getComputedStyle(node);

    const offset = unzoomImage.getBoundingClientRect();

    const height = +unzoomStyle.height.slice(0, -2);
    const width = +unzoomStyle.width.slice(0, -2);

    const endHeight = +zoomStyle.height.slice(0, -2);
    const endWidth = +zoomStyle.width.slice(0, -2);

    const endLeft = (window.innerWidth - endWidth) / 2;
    const endTop = (window.innerHeight - endHeight) / 2;

    return {
      delay,
      duration,
      easing: expoInOut,
      css: (t) => `
        width: ${width + t * (endWidth - width)}px;
        height: ${height + t * (endHeight - height)}px;
        left: ${offset.left + t * (endLeft - offset.left)}px;
        top: ${offset.top + t * (endTop - offset.top)}px;
        position: absolute;
      `,
    };
  }

  let scrolled = false;
  let track = false;

  const onMouseMove = () => {
    if (track) scrolled = true;
  };

  const onMouseDown = () => {
    track = true;
  };

  const onMouseLeave = () => {
    track = false;
  };

  const onMouseUp = () => {
    track = false;
  };

  const onClick = () => {
    if (!scrolled) {
      zoom = true;
    }
    scrolled = false;
  };
</script>

<Column class="gallery-col" lg={2} sm={2} mg={2} aspectRatio={"1x1"}>
  <Tile light>
    <img
      bind:this={unzoomImage}
      class="unzoom"
      class:faded={zoom}
      style="--radius: {radius}px; --height: {height}; --width: {width}"
      {src}
      {alt}
      on:click={onClick}
      on:mousemove={onMouseMove}
      on:mousedown={onMouseDown}
      on:mouseleave={onMouseLeave}
      on:mouseup={onMouseUp}
    />
  </Tile>
</Column>

{#if zoom}
  <div
    class="zoom"
    on:click={() => (zoom = false)}
    style="--radius: {radius}px"
  >
    <img {src} {alt} transition:zoomEffect />
  </div>
{/if}

<style>
  .unzoom {
    max-width: 100%;
    height: var(--height);
    width: var(--width);
    object-fit: contain;
  }
  .zoom {
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin-top: 0 !important;
    z-index: 1000000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .zoom img {
    object-fit: contain;
    width: 80%;
    height: 80%;
  }
  img.faded {
    opacity: 0.7;
  }
  img {
    border-radius: var(--radius);
  }
</style>
