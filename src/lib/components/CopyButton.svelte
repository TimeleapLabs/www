<script lang="ts">
	import { tick } from 'svelte';
	import { Check, Copy } from 'lucide-svelte';

	export let text: string;
	let copied = false;

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			await tick();
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy!', err);
		}
	}
</script>

<button
	on:click={copyToClipboard}
	class="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium transition"
>
	{#if copied}
		Copied!
		<Check class="w-4 h-4 text-green-500" />
	{:else}
		Copy
		<Copy class="w-4 h-4" />
	{/if}
</button>
