<script lang="ts">
	const rain = (canvas: HTMLCanvasElement) => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const drops: { x: number; y: number; speed: number; length: number }[] = [];
		let width = 0;
		let height = 0;

		const resizeCanvas = () => {
			const parent = canvas.parentElement!;
			const { width: parentWidth, height: parentHeight } = parent.getBoundingClientRect();

			width = parentWidth;
			height = parentHeight;

			canvas.width = width * 2; // Retina display
			canvas.height = height * 2;
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;

			// Recreate drops
			drops.length = 0; // Clear existing drops
			for (let i = 0; i < 200; i++) {
				drops.push({
					x: Math.random() * width * 2,
					y: Math.random() * height * 2,
					speed: Math.random() * 5 + 5,
					length: Math.random() * 20 + 10
				});
			}
		};

		const draw = () => {
			ctx.clearRect(0, 0, width * 2, height * 2);

			drops.forEach((drop) => {
				drop.y += drop.speed;
				if (drop.y > height * 2) {
					drop.y = -drop.length;
				}

				ctx.beginPath();
				ctx.moveTo(drop.x, drop.y);
				ctx.lineTo(drop.x, drop.y + drop.length);
				ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
				ctx.stroke();
			});

			requestAnimationFrame(draw);
		};

		resizeCanvas();

		const resizeObserver = new ResizeObserver(resizeCanvas);
		const parent = canvas.parentElement!;
		resizeObserver.observe(parent);

		draw();

		return {
			destroy() {
				resizeObserver.disconnect();
			}
		};
	};
</script>

<canvas class="w-full h-full pointer-events-none" use:rain></canvas>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
