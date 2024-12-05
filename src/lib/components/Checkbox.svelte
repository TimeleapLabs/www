<script lang="ts">
	export let id = '';
	export let label = '';
	export let checked = false;
	export let onChange: (event: Event) => void = () => {};

	function handleChange(event: Event) {
		onChange(event);
	}
</script>

<div class="flex items-center gap-2">
	<input
		{id}
		type="checkbox"
		class="cursor-pointer rounded-md text-green-500 border-zinc-700 focus:ring-green-500"
		bind:checked
		on:change={handleChange}
	/>
	<label for={id} class="text-sm text-white">{label}</label>
</div>
