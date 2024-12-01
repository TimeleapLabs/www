<script lang="ts">
	import { Card, Button } from '@timeleap/ui';

	import Code from '$lib/components/Code.svelte';
	import { aiSampleCode } from '$lib/samples/ai';
	import { parallelSampleCode } from '$lib/samples/parallel';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import TiltCard from '../TiltCard.svelte';

	const MAX_SECONDS = 9;

	type Page = 'ai' | 'parallelize';
	let page: Page = 'ai';
	let seconds: number = MAX_SECONDS;
	let stopTicking = false;
	let pauseTicking = false;

	const nextPage = () => {
		page = page === 'ai' ? 'parallelize' : 'ai';
	};

	const setPage = (newPage: Page) => () => {
		seconds = MAX_SECONDS;
		page = newPage;
	};

	const tick = () => {
		if (stopTicking) return;
		if (!pauseTicking) {
			seconds -= 1;
			if (seconds === 0) {
				nextPage();
				seconds = MAX_SECONDS;
			}
		}
		setTimeout(tick, 1000);
	};

	const setPauseTicking = (pause: boolean) => () => {
		pauseTicking = pause;
	};

	onMount(() => {
		tick();
		return () => {
			stopTicking = true;
		};
	});
</script>

<div
	on:mouseenter={setPauseTicking(true)}
	on:mouseleave={setPauseTicking(false)}
	role="doc-example"
	class="text-white h-full"
>
	<Card class="h-full flex flex-col">
		<div class="grid flex-1 max-w-full">
			{#if page === 'ai'}
				<div
					transition:fade={{ duration: 500 }}
					class="col-span-full row-span-full max-w-full min-w-0"
				>
					<div class="max-w-full">
						<TiltCard class="p-0!">
							<Code code={aiSampleCode} />
						</TiltCard>
					</div>
					<div class="text-zinc-300 hover:text-zinc-100 mt-8 transition-colors">
						Run AI models on the edge with Timeleap.
					</div>
				</div>
			{:else if page === 'parallelize'}
				<div
					transition:fade={{ duration: 500 }}
					class="col-span-full row-span-full max-w-full min-w-0"
				>
					<div class="max-w-full">
						<TiltCard class="p-0!">
							<Code code={parallelSampleCode} />
						</TiltCard>
					</div>
					<div class="text-zinc-300 hover:text-zinc-100 mt-8 transition-colors">
						Parallelize your code with Timeleap and crunch numbers faster. Run your code on
						thousands of CPUs and GPUs.
					</div>
				</div>
			{/if}
		</div>
		<div class="mt-8 flex items-center gap-4 flex-wrap">
			<Button
				on:click={setPage('ai')}
				class="text-white hover:text-green-300 font-semibold border-2! border-zinc-800! {page ===
					'ai' && 'bg-zinc-800'}"
			>
				AI
			</Button>
			<Button
				on:click={setPage('parallelize')}
				class="text-white hover:text-green-300 font-semibold border-2! border-zinc-800! {page ===
					'parallelize' && 'bg-zinc-800'}"
			>
				Parallelize
			</Button>
			<div class="flex-1"></div>
			<div class="progress relative grid">
				<svg
					width="32"
					height="32"
					viewBox="0 0 32 32"
					class="circular-progress z-10 col-span-full row-span-full"
					style="--progress: {100 - Math.round((seconds / MAX_SECONDS) * 100)}"
				>
					<circle class="bg"></circle>
					<circle class="fg"></circle>
				</svg>
				<div
					class="rounded-full bg-zinc-800 w-8 h-8 grid items-center justify-center font-mono z-0 col-span-full row-span-full"
				>
					{#key seconds}
						<p transition:fade={{ duration: 300 }} class="col-span-full row-span-full text-sm">
							{seconds}
						</p>
					{/key}
				</div>
			</div>
		</div>
	</Card>
</div>

<style>
	.circular-progress {
		--size: 32px;
		--half-size: calc(var(--size) / 2);
		--stroke-width: 2px;
		--radius: calc((var(--size) - var(--stroke-width)) / 2);
		--circumference: calc(var(--radius) * pi * 2);
		--dash: calc((var(--progress) * var(--circumference)) / 100);
	}

	.circular-progress circle {
		cx: var(--half-size);
		cy: var(--half-size);
		r: var(--radius);
		stroke-width: var(--stroke-width);
		fill: none;
		stroke-linecap: round;
	}

	.circular-progress circle.bg {
		stroke: var(--color-zinc-800);
	}

	.circular-progress circle.fg {
		transform: rotate(-90deg);
		transform-origin: var(--half-size) var(--half-size);
		stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
		transition: stroke-dasharray 0.3s linear 0s;
		stroke: var(--color-green-400);
	}
</style>
