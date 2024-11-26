<script lang="ts">
	import { getContext } from 'svelte';

	const { data, xGet, yGet, zGet, xScale, yScale } = getContext('LayerCake');

	const getGradientFill = (d: any) => {
		return `url(#gradient-${d.color})`;
	};
</script>

<defs>
	{#each $data as d}
		<linearGradient id="gradient-{d.color}" x1="0%" y1="33%" x2="100%" y2="0%">
			<stop offset="0%" stop-color="var(--color-{d.color}-500" />
			<stop offset="100%" stop-color="var(--color-{d.color}-600" />
		</linearGradient>
	{/each}
</defs>

<g class="bar-group">
	{#each $data as d, i}
		<rect
			class="group-rect"
			data-id={i}
			x={$xScale.range()[0]}
			y={$yGet(d) + 5}
			height={$yScale.bandwidth() - 8}
			width={$xGet(d)}
			fill={getGradientFill(d)}
			rx={1}
			ry={8}
		></rect>
	{/each}
</g>
