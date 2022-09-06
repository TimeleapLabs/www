<script>
  import { getContext } from "svelte";
  import { line, curveLinear } from "d3-shape";

  const { data, xGet, yGet } = getContext("LayerCake");

  export let stroke = "#0c6e6b";
  export let curve = curveLinear;

  $: path = line().x($xGet).y($yGet).curve(curve);

  $: d = path($data);
</script>

<path class="path-line" {d} {stroke} />

<style>
  .path-line {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 1.25;
  }
</style>
