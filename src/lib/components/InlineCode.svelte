<script lang="ts">
	import { copyToClipboard } from '$lib/clipboard';
	import toast from 'svelte-french-toast';

	let el: HTMLElement;

	const copyCode = async () => {
		await copyToClipboard(el.innerText);
		toast.success('Copied to clipboard!');
	};
</script>

<button
	class="rounded font-mono px-1 text-gray-200 text-sm bg-zinc-800 border border-zinc-400 hover:cursor-copy inline"
	bind:this={el}
	on:click={copyCode}
>
	<slot></slot>
</button>
