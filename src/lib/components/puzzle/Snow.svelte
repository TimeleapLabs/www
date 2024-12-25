<script lang="ts">
	const snow = (canvas: HTMLCanvasElement) => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const flakes: { x: number; y: number; radius: number; speed: number; drift: number }[] = [];
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

			flakes.length = 0;
			for (let i = 0; i < 100; i++) {
				flakes.push({
					x: Math.random() * width * 2,
					y: Math.random() * height * 2,
					radius: Math.random() * 2 + 1,
					speed: Math.random() * 1 + 5,
					drift: Math.random() * 0.5 - 0.25
				});
			}
		};

		const draw = () => {
			ctx.clearRect(0, 0, width * 2, height * 2);

			flakes.forEach((flake) => {
				flake.y += flake.speed;
				flake.x += flake.drift;

				if (flake.y > height * 2) {
					flake.y = -flake.radius;
					flake.x = Math.random() * width * 2;
				}

				ctx.beginPath();
				ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);

				ctx.shadowBlur = 10;
				ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
				ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
				ctx.fill();

				ctx.shadowBlur = 0;
				ctx.shadowColor = 'transparent';
			});

			requestAnimationFrame(draw);
		};

		resizeCanvas();

		const resizeObserver = new ResizeObserver(resizeCanvas);
		const parent = canvas.parentElement;
		if (parent) {
			resizeObserver.observe(parent);
		}

		draw();

		return {
			destroy() {
				resizeObserver.disconnect();
			}
		};
	};
</script>

<canvas class="w-full h-full pointer-events-none" use:snow></canvas>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
