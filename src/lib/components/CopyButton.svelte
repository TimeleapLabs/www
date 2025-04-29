<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Copy, CopyCheck, CopyX } from 'lucide-svelte';
	import { Button } from '@timeleap/ui';

	let { toCopy } = $props();

	let state: null | boolean;

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			state = true;
		} catch (error: unknown) {
			state = false;
			if (error instanceof Error) throw new Error(error.message);
			throw new Error(String(error));
		} finally {
			setTimeout(() => (state = null), 500);
		}
	};
</script>

<Button on:click={() => copyToClipboard(toCopy)}>
	<div class="hover:opacity-50 transition-opacity ease-in-out duration-200">
		{#key state}
			<span in:fade out:fade class="absolute inset-0 flex items-center justify-center">
				{#if state === true}
					<CopyCheck class="text-green-300" />
				{:else if state === false}
					<CopyX class="text-red-400" />
				{:else}
					<Copy />
				{/if}
			</span>
		{/key}
	</div>
</Button>
