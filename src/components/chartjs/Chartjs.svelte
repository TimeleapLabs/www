<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  export let data;
  export let options;
  export let type = "line";
  export let height = "180px";

  let canvas;
  let chart;

  $: if (canvas && data && options) {
    if (!chart) {
      chart = new Chart(canvas.getContext("2d"), {
        type,
        data,
        options,
      });
    } else {
      chart.data = data;
      chart.options = options;
      chart.update();
    }
  }

  onMount(() => () => chart?.destroy());
</script>

<canvas bind:this={canvas} {height} />
