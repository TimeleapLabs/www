<script>
  import { theme } from "src/stores/theme";
  import { DonutChart } from "@carbon/charts-svelte";

  import "@carbon/charts-svelte/styles.css";

  export let title;
  export let label;
  export let data;

  let options = {
    title,
    resizable: true,
    legend: {
      alignment: "center",
    },
    donut: {
      center: { label },
      alignment: "center",
    },
    height: "400px",
    theme: $theme,
  };

  $: if ($theme) {
    options = { ...options, theme: $theme };
  }
</script>

{#if data}
  <DonutChart {data} {options} />
{/if}
