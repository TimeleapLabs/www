<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  export let data;
  export let options;
  export let type = "line";

  let canvas;
  let chart;

  $: if (canvas && data && options) {
    chart?.destroy();
    chart = new Chart(canvas.getContext("2d"), {
      type,
      data,
      options,
    });
  }

  onMount(() => () => chart?.destroy());
</script>

<canvas bind:this={canvas} />
