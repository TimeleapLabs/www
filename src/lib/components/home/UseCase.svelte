<script lang="ts">
	import { Clock } from 'lucide-svelte';
	import { Button } from '@timeleap/ui';

	import ImageCard from '../ImageCard.svelte';

	const shades = [
		'bg-blue-400/20',
		'bg-green-400/20',
		'bg-yellow-400/20',
		'bg-red-400/20',
		'bg-indigo-400/20',
		'bg-purple-400/20',
		'bg-pink-400/20'
	];

	const getShade = (src: string) => {
		const hash = src.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
		const index = Math.abs(hash) % shades.length;
		return shades[index];
	};

	export let src: string;
	export let title: string;
	export let shade: string | undefined;
</script>

<ImageCard
	{src}
	class="min-w-[300px] md:min-w-[400px] xl:min-w-[400px] xl:w-[400px] group"
	imageClass="contrast-125 grayscale-100 group-hover:contrast-100 group-hover:brightness-100 group-hover:grayscale-0"
>
	<div
		class="{shade || getShade(src)} absolute top-0 right-0 left-0 bottom-0 h-full
			z-0 pointer-events-none group-hover:opacity-0 transition-opacity ease-in"
	/>
	<div class="flex justify-end flex-col h-[500px] md:h-[600px] z-10 relative p-4">
		<h2 class="font-serif text-2xl md:text-3xl leading-snug docs-heading">{title}</h2>
		<p class="mt-8 text-zinc-300">
			<slot />
		</p>
		<div class="mt-12">
			<Button class="bg-green-400 text-black hover:bg-green-300 font-medium" animate>
				Coming Soon <Clock size={'1em'} strokeWidth={2.5} class="inline" />
			</Button>
		</div>
	</div>
</ImageCard>
