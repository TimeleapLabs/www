<script lang="ts">
	export let label: string;
	export let id: string;
	export let value: string = '';
	export let options: Array<{ value: string; label: string; color?: string }> = [];
	export let placeholder: string = 'Select an option';
	export let helperText: string = '';

	let isOpen = false;

	const toggleDropdown = () => {
		isOpen = !isOpen;
	};

	const closeDropdown = () => {
		isOpen = false;
	};
</script>

<div class="flex flex-col gap-4">
	<label for={id} class="text-white text-lg font-semibold">{label} <slot></slot></label>
	<p class="text-sm text-zinc-400">{helperText}</p>

	<div class="relative w-full bg-zinc-800 border border-zinc-500 rounded-2xl shadow-md">
		<!-- Custom Select Button -->
		<button
			class="w-full h-16 px-4 text-zinc-200 font-medium flex justify-between items-center rounded-2xl bg-transparent border-none focus:outline-none cursor-pointer"
			type="button"
			aria-haspopup="true"
			aria-expanded={isOpen}
			on:click={toggleDropdown}
		>
			{#if value}
				<span>{options.find((option) => option.value === value)?.label || placeholder}</span>
			{:else}
				<span>{placeholder}</span>
			{/if}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 text-zinc-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		<!-- Dropdown Menu -->
		{#if isOpen}
			<div class="absolute mt-1 w-full bg-zinc-700 text-zinc-200 rounded-2xl shadow-lg z-10">
				{#each options as option}
					<button
						class={`w-full text-left px-4 py-2 rounded-2xl hover:bg-opacity-80 ${option.color ? option.color : 'hover:bg-zinc-600'}`}
						on:click={() => {
							value = option.value;
							closeDropdown();
						}}
					>
						{option.label}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>
