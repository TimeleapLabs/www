<script lang="ts">
	let { src, alt, caption }: { src: string; alt: string; caption: string } = $props();

	import { tiltAndGlow } from '$lib/utils/tilt';
</script>

<div class="flex flex-col items-center">
	<div
		use:tiltAndGlow={{ strength: 28 }}
		class="relative overflow-hidden z-20 mb-4 hover:-translate-y-2 hover:scale-105 transition-transform duration-300 ease-in-out"
	>
		<div class="glow absolute top-0 left-0 w-full h-full pointer-events-none z-10"></div>
		<img {src} {alt} class="rounded-lg" />
	</div>
	<p class="text-zinc-400 text-xs">{caption}</p>
</div>
