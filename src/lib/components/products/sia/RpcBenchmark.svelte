<script lang="ts">
	import Chart from '$lib/components/charts/bar/Chart.svelte';
	import { Grid } from '@timeleap/ui';

	const rpcBenchData = [
		{ name: 'JSON', value: 37501, color: 'blue' },
		{ name: 'Sia', value: 39818, color: 'green' },
		{ name: 'CBOR', value: 38110, color: 'blue' },
		{ name: 'MsgPack', value: 38327, color: 'blue' }
	];

	const heavyRpcBenchData = [
		{ name: 'JSON', value: 478, color: 'blue' },
		{ name: 'Sia', value: 1018, color: 'green' },
		{ name: 'CBOR', value: 625, color: 'blue' },
		{ name: 'MsgPack', value: 608, color: 'blue' }
	];
</script>

<Grid
	extraLargeScreenColumns={2}
	largeScreenColumns={2}
	mediumScreenColumns={1}
	smallScreenColumns={1}
>
	<div class="flex flex-col gap-4">
		<h4 class="text-base font-semibold">RPC Benchmark</h4>
		<div class="h-[100px]">
			<Chart data={rpcBenchData} />
		</div>
	</div>

	<div class="flex flex-col gap-4">
		<h4 class="text-base font-semibold">Heavy RPC Benchmark</h4>
		<div class="h-[100px]">
			<Chart data={heavyRpcBenchData} />
		</div>
	</div>
</Grid>
