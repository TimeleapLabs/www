<script lang="ts">
	import { Card } from '@timeleap/ui';

	export let src = '';
	export let alt = '';
	export let imageClass = '';
</script>

<Card
	class="relative p-0! overflow-hidden border border-zinc-800 group bg-black snap-start {$$props.class ||
		''}"
>
	<div class="absolute top-0 right-0 left-0 bottom-0 h-full z-0 opacity-100 masked-top-down">
		<img
			{src}
			{alt}
			class="w-full h-full object-cover group-hover:scale-105 transition-all ease-in {imageClass}"
		/>
	</div>
	<div class="w-full h-full z-10 relative p-4">
		<slot></slot>
	</div>
</Card>

<style>
	.masked-top-down {
		mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1));
	}
</style>
