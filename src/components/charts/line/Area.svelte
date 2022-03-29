<script>
  import { getContext } from "svelte";
  import { area, curveLinear } from "d3-shape";
  const { data, xGet, yGet, yScale } = getContext("LayerCake");

  export let fill = "#0c6e6b10";
  export let curve = curveLinear;

  $: path = area()
    .x($xGet)
    .y1($yGet)
    .y0((d) => $yScale(0))
    .curve(curve);

  $: d = path($data);
</script>

<path class="path-area" {d} {fill} />
