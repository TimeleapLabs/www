<script lang="ts">
	import { LayerCake, ScaledSvg, Html } from 'layercake';
	import { scaleBand } from 'd3-scale';
	import { format } from 'd3-format';

	import Bar from './Bar.svelte';
	import AxisX from '../bar-stacked/AxisX.svelte';
	import AxisY from '../bar-stacked/AxisY.svelte';

	export let data: Array<{ value: number; color: string; name: string }> = [];

	data.forEach((d) => {
		d.value = +d.value;
	});

	const formatLabelX = (d) => format(`~s`)(d);
</script>

<div class="chart-container">
	<LayerCake
		percentRange
		padding={{ top: 0, right: 20, bottom: 20, left: 35 }}
		x="value"
		y="name"
		z="color"
		yScale={scaleBand().paddingInner(0.05).round(true)}
		yDomain={data.map((d) => d.name)}
		xDomain={[0, null]}
		zDomain={data.map((d) => d.color)}
		{data}
	>
		<Html>
			<AxisX baseline snapLabels format={formatLabelX} />
			<AxisY gridlines={false} />
		</Html>
		<ScaledSvg>
			<Bar />
		</ScaledSvg>
	</LayerCake>
</div>

<style>
	/*
    The wrapper div needs to have an explicit width and height in CSS.
    It can also be a flexbox child or CSS grid element.
    The point being it needs dimensions since the <LayerCake> element will
    expand to fill it.
  */
	.chart-container {
		width: 100%;
		height: 100%;
	}
</style>
