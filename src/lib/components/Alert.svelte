<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Card } from '@timeleap/ui';

	export let type: 'success' | 'info' | 'warning' | 'error' = 'info';
	export let title: string;

	const icons = {
		success: 'carbon:checkmark-outline',
		info: 'carbon:information-outline',
		warning: 'carbon:warning-alt',
		error: 'carbon:error-outline'
	};

	const bgColors = {
		success: 'bg-gradient-to-tr from-green-950 to-green-900 border border-green-800',
		info: 'bg-gradient-to-tr from-blue-950 to-blue-900 border border-blue-800',
		warning: 'bg-gradient-to-tr from-amber-950 to-amber-900 border border-amber-800',
		error: 'bg-gradient-to-tr from-red-950 to-red-900 border border-red-800'
	};
</script>

<Card class="gap-4 p-4 rounded-lg shadow-md {bgColors['warning']} my-4">
	<div class="flex items-center gap-2">
		<Icon icon={icons[type]} class="text-xl" />
		<h5 class="font-semibold">{title}</h5>
	</div>
	<div class="mt-4 text-sm text-zinc-300">
		<slot></slot>
	</div>
</Card>
