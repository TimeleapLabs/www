<script lang="ts">
	import { Card } from '@timeleap/ui';
	import { tiltAndGlow } from '$lib/utils/tilt';

	export let containerClass = '';
</script>

<div class="container {containerClass}">
	<div class="card w-full h-full overflow-hidden" use:tiltAndGlow>
		<div class="glow absolute top-0 left-0 w-full h-full pointer-events-none z-10"></div>
		<Card {...$$restProps} class={$$props.class || ''}>
			<slot></slot>
		</Card>
	</div>
</div>

<style>
	.container {
		perspective: 9999px; /* Adds depth for the 3D effect */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.card {
		transition: transform 0.1s ease-in-out; /* Smoothens the tilt effect */
		transform-style: preserve-3d; /* Ensures 3D transformations apply */
		border-radius: var(--border-radius);
	}

	.glow {
		transition: opacity 0.4s ease-in-out; /* Smoothens the glow effect */
		opacity: 0;
	}

	.card:hover .glow {
		opacity: 1;
	}
</style>
