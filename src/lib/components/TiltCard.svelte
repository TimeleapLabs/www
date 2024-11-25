<script lang="ts">
	import { Card } from '@timeleap/ui';

	const tilt = (card: HTMLElement) => {
		const mousemove = (e: MouseEvent) => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left; // Mouse X position within card
			const y = e.clientY - rect.top; // Mouse Y position within card

			// Map mouse position to rotation angles
			const rotateX = (y / rect.height - 0.5) * -20; // Invert Y-axis for correct 3D tilt
			const rotateY = (x / rect.width - 0.5) * 20;

			card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
		};

		const mouseleave = () => {
			card.style.transform = 'rotateX(0) rotateY(0)';
		};

		card.addEventListener('mousemove', mousemove);
		card.addEventListener('mouseleave', mouseleave);

		return {
			destroy() {
				card.removeEventListener('mousemove', mousemove);
				card.removeEventListener('mouseleave', mouseleave);
			}
		};
	};
</script>

<div class="container">
	<div class="card w-full" use:tilt>
		<Card {...$$restProps} class={$$props.class || ''}>
			<slot></slot>
		</Card>
	</div>
</div>

<style>
	.container {
		perspective: 1000px; /* Adds depth for the 3D effect */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.card {
		transition: transform 0.1s ease-in-out;
		transform-style: preserve-3d; /* Ensures 3D transformations apply */
	}
</style>
