<script lang="ts">
	import { CheckCheck, Library } from 'lucide-svelte';
	import { persisted } from 'svelte-persisted-store';

	const readable = persisted('readable', false);

	const toggleReadable = () => {
		readable.update((r) => !r);
	};
</script>

<button
	class="p-1 flex items-center px-4 rounded-full transition-colors duration-300 ease-in-out
         focus:outline-none focus:ring focus:ring-gray-300 cursor-pointer hover:bg-zinc-700 bg-zinc-800"
	on:click={toggleReadable}
>
	<span class="text-xs mr-4"> Readability Mode </span>
	{#if $readable}
		<CheckCheck size={'1em'} />
	{:else}
		<Library size={'1em'} />
	{/if}
</button>
