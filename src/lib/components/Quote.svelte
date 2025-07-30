<script>
	export let content = '';
	export let author = '';
</script>

<aside
	class="min-h-10 flex flex-col justify-between border-l-4 border-neutral-400 pl-4 italic text-neutral-300 p-4"
	style="position: relative;"
>
	<p>“ {content}”</p>
	{#if author}
		<p class="text-right mt-2 text-sm font-semibold" style="align-self: flex-end;">— {author}</p>
	{/if}
</aside>
