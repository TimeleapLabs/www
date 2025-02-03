<script lang="ts">
	import { Card } from '@timeleap/ui';

	const icons = {
		draft: '✍️',
		success: '✅',
		info: 'ℹ️',
		warning: '⚠️',
		error: '❌',
		danger: '☠️'
	};

	const stripeColors = {
		draft: 'from-zinc-900 to-zinc-800',
		success: 'from-green-800 to-green-300',
		info: 'from-blue-800 to-blue-300',
		warning: 'from-yellow-800 to-yellow-300',
		error: 'from-red-800 to-red-300',
		danger: 'from-red-800 to-red-300'
	};

	const titleColors = {
		draft: 'text-zinc-200',
		success: 'text-green-200',
		info: 'text-blue-200',
		warning: 'text-yellow-200',
		error: 'text-red-200',
		danger: 'text-red-200'
	};

	export let type: keyof typeof icons;
	export let title: string;
</script>

<Card
	class="gap-4 py-4! bg-zinc-950 bg-linear-to-tr from-zinc-950 to-zinc-900 border border-zinc-800 relative overflow-hidden rounded-2xl!"
>
	<div
		class="absolute w-2 h-full bg-stripe {stripeColors[
			type
		]} from-[length:0px] to-[length:5px] left-0 top-0"
	></div>
	<div class="flex items-center gap-2 {titleColors[type]}">
		<span> {icons[type]} </span>
		<h5 class="font-semibold">{title}</h5>
	</div>
	<div class="mt-2 text-sm text-zinc-300">
		<slot></slot>
	</div>
</Card>

<style>
	.bg-stripe {
		--background-image-stripe: repeating-linear-gradient(-45deg, var(--tw-gradient-stops));
	}
</style>
