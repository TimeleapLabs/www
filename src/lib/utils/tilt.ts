export const tiltAndGlow = (
	card: HTMLElement,
	{ strength }: { strength: number } = { strength: 20 }
) => {
	const mousemove = (e: MouseEvent) => {
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left; // Mouse X position within card
		const y = e.clientY - rect.top; // Mouse Y position within card

		// Tilt strength should be smaller for wider cards
		const tiltStrength = Math.max(7, strength * (320 / rect.width));

		// Calculate rotation for 3D tilt
		const rotateX = (y / rect.height - 0.5) * tiltStrength;
		const rotateY = (x / rect.width - 0.5) * tiltStrength;

		// Set card rotation
		card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

		// Create glow effect by setting a radial gradient
		const glow = card.querySelector('.glow') as HTMLElement;
		glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(200, 200, 200, 0.1), transparent 60%)`;
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
