<script lang="ts">
	import BarStacked from '$lib/components/charts/bar-stacked/BarStacked.svelte';
	import { Card } from '@timeleap/ui';

	const serialization = [
		{ value: 92, name: 'JSON' },
		{ value: 614, name: 'Sia' },
		{ value: 286, name: 'CBOR' },
		{ value: 270, name: 'MsgPack' }
	];
	const deserialization = [
		{ value: 416, name: 'JSON' },
		{ value: 528, name: 'Sia' },
		{ value: 285, name: 'CBOR' },
		{ value: 261, name: 'MsgPack' }
	];

	const data = [
		{ name: 'JSON', serialization: 92, deserialization: 417 },
		{ name: 'Sia', serialization: 614, deserialization: 533 },
		{ name: 'CBOR', serialization: 286, deserialization: 287 },
		{ name: 'MsgPack', serialization: 270, deserialization: 270 },
		{ name: 'Protobuf', serialization: 41, deserialization: 190 }
	];

	const sizes = [
		{ size: 1402814, name: 'JSON' },
		{ size: 777815, name: 'Sia' },
		{ size: 1138361, name: 'CBOR' },
		{ size: 1130312, name: 'MsgPack' }
	].map((set) => ({ ...set, size: Math.round(set.size / 1024) }));
</script>

<div class="flex gap-4 mb-4 text-white">
	<div class="flex items-center gap-2">
		<div class="h-4 w-4 bg-gradient-to-r from-green-500 to-green-600 rounded"></div>
		Serialization
	</div>
	<div class="flex items-center gap-2">
		<div class="h-4 w-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
		Deserialization
	</div>
</div>

<div class="w-full h-[140px]">
	<BarStacked {data} xKey="name" yKey="name" />
</div>
