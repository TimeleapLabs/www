<script>
  import Chart from "./charts/line/Chart.svelte";
  import Card from "./Card.svelte";

  export let title;
  export let data;
</script>

<Card flat>
  <h4>{title}</h4>
  <div class="chart">
    <Chart {data} />
  </div>
</Card>

<style>
  .chart {
    height: 320px;
    margin-top: 2em;
  }
</style>
