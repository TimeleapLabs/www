<script lang="ts">
	import { onMount } from 'svelte';
	import { loadImage } from '$lib/utils/image';

	export let src: string;

	let canvas: HTMLCanvasElement;
	let listener: (e: MouseEvent) => void;

	const draw = async () => {
		// resize canvas to parent
		if (!canvas) return;
		if (!canvas.parentElement) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const width = canvas.parentElement.clientWidth;
		const height = canvas.parentElement.clientHeight;

		const ratio = window.devicePixelRatio || 1;
		canvas.width = width * ratio;
		canvas.height = height * ratio;

		canvas.style.width = width + 'px';
		canvas.style.height = height + 'px';

		ctx.scale(ratio, ratio);

		const img = await loadImage(src);
		const isVertical = img.height > img.width;

		listener = (e: MouseEvent) => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			const position = {
				x: e.clientX - canvas.getBoundingClientRect().left,
				y: e.clientY - canvas.getBoundingClientRect().top
			};
			// how many images can we fit in the canvas?
			const countW = Math.floor(canvas.width / img.width);
			const countH = Math.floor(canvas.height / img.height);
			// draw images
			for (let i = 0; i < countW; i++) {
				for (let j = 0; j < countH; j++) {
					ctx.save();
					// how many degrees should we rotate so the image is always facing the mouse?
					const angle = isVertical
						? -Math.atan2(position.x - i * img.width, position.y - j * img.height)
						: Math.atan2(position.y - j * img.height, position.x - i * img.width);

					ctx.translate(i * img.width + img.width / 2, j * img.height + img.height / 2);
					ctx.rotate(angle);
					ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
					ctx.restore();
				}
			}
		};

		// We should set a global mousemove event listener
		// because the canvas might not cover the whole page
		window.removeEventListener('mousemove', listener);
		window.addEventListener('mousemove', listener);

		listener({ clientX: 0, clientY: 0 } as MouseEvent);
	};

	$: if (canvas) draw();

	onMount(() => {
		return () => {
			window.removeEventListener('mousemove', listener);
		};
	});
</script>

<canvas bind:this={canvas}></canvas>
