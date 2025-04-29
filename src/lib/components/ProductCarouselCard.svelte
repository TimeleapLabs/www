<script lang="ts">
	import { Card, Button } from '@timeleap/ui';
	import { ArrowRight } from 'lucide-svelte';

	let { title, href, color = 'sky', video = '', image = '' } = $props();

	const colorToGradientMap = {
		red: 'from-red-600 to-red-900',
		pink: 'from-pink-600 to-pink-900',
		purple: 'from-purple-600 to-purple-900',
		sky: 'from-sky-600 to-sky-900',
		cyan: 'from-cyan-600 to-cyan-900',
		green: 'from-green-600 to-green-900',
		orange: 'from-orange-600 to-orange-900',
		yellow: 'from-yellow-600 to-yellow-900',
		blue: 'from-blue-600 to-blue-900',
		indigo: 'from-indigo-600 to-indigo-900'
	} as { [key: string]: string };

	const gradient = colorToGradientMap[color];
</script>

<Card
	class="text-white flex flex-col bg-linear-to-tr {gradient} border border-zinc-800 md:min-w-[640px] md:w-[640px] relative overflow-hidden snap-start"
>
	<div class="relative z-10">
		<h3 class="font-serif text-5xl leading-snug mt-4">{title}</h3>
		<p class="mt-8 flex-1 text-zinc-100 md:w-2/3">
			<slot />
		</p>
		<div class="mt-16">
			<Button class="bg-green-400 text-black hover:bg-green-300 font-medium" animate {href}>
				Learn More <ArrowRight size={'1em'} />
			</Button>
		</div>
	</div>
	{#if video}
		<div class="absolute top-0 right-0 bottom-0 left-0 bg masked-full w-full z-0">
			<video class="w-full object-cover h-full" autoplay muted loop>
				<source src={video} type="video/mp4" />
				<track kind="captions" />
				Your browser does not support the video tag.
			</video>
		</div>
	{:else if image}
		<div class="absolute top-0 right-0 bottom-0 left-0 bg masked-full z-0">
			<img class="w-full object-cover h-full" src={image} alt="Tiramisu" />
		</div>
	{/if}
</Card>

<style>
	.masked-full {
		mask-image: linear-gradient(to right, rgba(0, 0, 0, 0.05) 30%, rgba(0, 0, 0, 1));
	}
</style>
