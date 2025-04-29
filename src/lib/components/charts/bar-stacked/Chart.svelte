<!--
  @component
  Generates an SVG stacked bar chart and sets the color via an ordinal scale in `zScale`.
 -->
<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, yScale } = getContext('LayerCake');

	let columnWidth = $derived((d) => {
		const xVals = $xGet(d);
		return xVals[1] - xVals[0];
	});

	const gradients = [
		{ from: 'color-green-500', to: 'color-green-600' },
		{ from: 'color-blue-500', to: 'color-blue-600' },
		{ from: 'color-orange-500', to: 'color-orange-600' },
		{ from: 'color-purple-500', to: 'color-purple-600' },
		{ from: 'color-sky-500', to: 'color-sky-600' },
		{ from: 'color-yellow-500', to: 'color-yellow-600' },
		{ from: 'color-red-500', to: 'color-red-600' },
		{ from: 'color-pink-500', to: 'color-pink-600' },
		{ from: 'color-cyan-500', to: 'color-cyan-600' }
	];
</script>

<defs>
	{#each $data as _, i}
		<linearGradient id="gradient-{i}" x1="0%" y1="33%" x2="100%" y2="0%">
			<stop offset="0%" stop-color="var(--{gradients[i].from})" />
			<stop offset="100%" stop-color="var(--{gradients[i].to})" />
		</linearGradient>
	{/each}
</defs>

<g class="bar-group">
	{#each $data?.toReversed?.() as series, i}
		{#each series as d, j}
			<rect
				class="group-rect"
				data-id={j}
				x={$xGet(d)[0]}
				y={$yGet(d) + 5}
				height={$yScale.bandwidth() - 8}
				width={columnWidth(d) + (i === 0 ? 4 : 0)}
				class:rounded={i === 0}
				rx={i === 0 ? 1 : 0}
				ry={i === 0 ? 8 : 0}
				fill="url(#gradient-{$data.length - i - 1})"
			/>
		{/each}
	{/each}
</g>

<style>
	.group-rect.rounded {
		transform: translateX(-4px);
	}
</style>
