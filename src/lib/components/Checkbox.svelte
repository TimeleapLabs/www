<script lang="ts">
	let {
		id = '',
		label = '',
		checked = $bindable(false),
		onChange = (event: Event) => {}
	} = $props();

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
		onchange={handleChange}
	/>
	<label for={id} class="text-sm text-white">{label}</label>
</div>
