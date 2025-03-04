<script lang="ts">
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import { Button } from '@timeleap/ui';

	let el: HTMLElement;
	let index = 0;
	let position = 0;
	export let containerClass = '';

	const lastChildInView = () => {
		const lastChild = el.children[el.children.length - 1];
		const lastChildPosition = lastChild.getBoundingClientRect().right;
		const elPosition = el.getBoundingClientRect().right;
		return lastChildPosition <= elPosition + position;
	};

	const getNthChildPosition = (n: number) => {
		const nthChild = el.children[n];
		const relativePosition =
			nthChild.getBoundingClientRect().left - el.getBoundingClientRect().left;
		return relativePosition;
	};

	const next = () => {
		index = lastChildInView() ? 0 : index + 1;
		position = getNthChildPosition(index);
		el.parentElement?.scrollTo({ left: position, behavior: 'smooth' });
	};

	const prev = () => {
		const length = el?.children.length || 0;
		index = index - 1 < 0 ? length - 1 : index - 1;
		position = getNthChildPosition(index);
		el.parentElement?.scrollTo({ left: position, behavior: 'smooth' });
	};
</script>

<div class={containerClass}>
	<div
		class="outer relative overflow-auto snap-x snap-mandatory scroll-smooth scrollbar-hidden py-4"
	>
		<div
			class="transition-transform ease-out duration-300 flex {$$props.class || ''}"
			bind:this={el}
		>
			<slot></slot>
		</div>
	</div>

	<div class="flex gap-4 mt-8">
		<Button
			class="hover:bg-zinc-700 text-white text-2xl px-4! py-7! transition-colors ease-in"
			on:click={prev}
		>
			<ArrowLeft size={'1em'} />
		</Button>
		<Button
			class="hover:bg-zinc-700 text-white text-2xl px-4! py-7! transition-colors ease-in"
			on:click={next}
		>
			<ArrowRight size={'1em'} />
		</Button>
	</div>
</div>
