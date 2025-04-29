<script lang="ts">
	import { LayerCake, ScaledSvg, Html, flatten } from 'layercake';
	import { stack } from 'd3-shape';
	import { scaleBand, scaleOrdinal } from 'd3-scale';
	import { format } from 'd3-format';

	import Chart from './Chart.svelte';
	import AxisX from './AxisX.svelte';
	import AxisY from './AxisY.svelte';



	interface Props {
		data?: any[];
		xKey: any;
		yKey: any;
		seriesNames?: any;
		yDomain?: any;
	}

	let {
		data = [],
		xKey,
		yKey,
		seriesNames = Object.keys(data[0]).filter((d) => d !== xKey),
		yDomain = [...new Set(data.map((d) => d[yKey]))]
	}: Props = $props();

	data.forEach((d) => {
		seriesNames.forEach((name) => {
			d[name] = +d[name];
		});
	});

	const stackData = stack().keys(seriesNames);
	const series = stackData(data);

	const formatLabelX = (d) => format(`~s`)(d);
</script>

<div class="chart-container max-w-[720px]">
	<LayerCake
		percentRange
		padding={{ top: 0, right: 0, bottom: 20, left: 35 }}
		y={(d) => d.data[yKey]}
		x={[0, 1]}
		yScale={scaleBand().paddingInner(0.05).round(true)}
		{yDomain}
		zScale={scaleOrdinal()}
		zDomain={seriesNames}
		flatData={flatten(series)}
		data={series}
	>
		<Html>
			<AxisX baseline snapLabels format={formatLabelX} />
			<AxisY gridlines={false} />
		</Html>
		<ScaledSvg>
			<Chart />
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
