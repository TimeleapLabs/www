<script>
  import { LayerCake, Svg } from "layercake";

  import Line from "./Line.svelte";
  import Area from "./Area.svelte";
  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";

  export let axisX = true;
  export let axisY = true;

  export let data;
</script>

<div class="chart-container">
  <LayerCake padding={{}} x={"x"} y={"y"} yDomain={[0, null]} {data}>
    <Svg>
      {#if axisX}<AxisX />{/if}
      {#if axisY}<AxisY ticks={4} />{/if}
      <Line />
      <Area />
    </Svg>
  </LayerCake>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 100%;
  }
</style>
