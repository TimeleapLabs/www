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

	const stripeColors = {
		success: 'from-green-800 to-green-300',
		info: 'from-blue-800 to-blue-300',
		warning: 'from-yellow-800 to-yellow-300',
		error: 'from-red-800 to-red-300'
	};

	const titleColors = {
		success: 'text-green-200',
		info: 'text-blue-200',
		warning: 'text-yellow-200',
		error: 'text-red-200'
	};
</script>

<Card
	class="gap-4 !py-4 bg-zinc-900 my-4 bg-gradient-to-tr from-zinc-950 to-zinc-900 border border-zinc-800 relative overflow-hidden"
>
	<div
		class="absolute w-2 h-full bg-stripe {stripeColors[
			type
		]} from-[length:0_5px] to-[length:5px_10px] left-0 top-0"
	></div>
	<div class="flex items-center gap-2 {titleColors[type]}">
		<Icon icon={icons[type]} class="text-xl" />
		<h5 class="font-semibold">{title}</h5>
	</div>
	<div class="mt-2 text-sm text-zinc-300">
		<slot></slot>
	</div>
</Card>
