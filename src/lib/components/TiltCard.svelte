<script lang="ts">
	import { Card } from '@timeleap/ui';

	const tiltAndGlow = (card: HTMLElement) => {
		const mousemove = (e: MouseEvent) => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left; // Mouse X position within card
			const y = e.clientY - rect.top; // Mouse Y position within card

			// Calculate rotation for 3D tilt
			const rotateX = (y / rect.height - 0.5) * -10;
			const rotateY = (x / rect.width - 0.5) * -10;

			// Set card rotation
			card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

			// Create glow effect by setting a radial gradient
			const glow = card.querySelector('.glow') as HTMLElement;
			glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.1), transparent 60%)`;
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
	<div class="card w-full overflow-hidden" use:tiltAndGlow>
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
