<script lang="ts">
	const rain = (canvas: HTMLCanvasElement) => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const { width, height } = canvas.getBoundingClientRect();

		// retina display
		canvas.width = width * 2;
		canvas.height = height * 2;
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;

		const drops = Array.from({ length: 100 }, () => ({
			x: Math.random() * width * 2,
			y: Math.random() * height * 2,
			speed: Math.random() * 2 + 1,
			length: Math.random() * 20 + 10
		}));

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

		draw();
	};
</script>

<canvas class="w-full h-full pointer-events-none" use:rain></canvas>
