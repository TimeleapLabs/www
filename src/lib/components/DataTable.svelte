<script lang="ts">
	let {
		title,
		description,
		headers = [],
		rows = []
	}: {
		title: string;
		description: string;
		headers: { key: string; value: string }[];
		rows: { [key: string]: unknown; id: string }[];
	} = $props();
</script>

<div class="rounded-xl bg-zinc-900 shadow-sm">
	<div class="mb-4">
		<h2 class="text-xl font-semibold text-white-900">{title}</h2>
		<p class="text-sm text-white-600">{description}</p>
	</div>

	<div class="overflow-x-auto">
		<table class="min-w-full border-collapse">
			<thead>
				<tr class="bg-zinc-700">
					{#each headers as header}
						<th class="text-left px-4 py-3 font-medium text-white-700">{header.value}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each rows as row (row.id)}
					<tr class="border-b hover:bg-zinc-750">
						{#each headers as header}
							<td class="px-4 py-3 text-white-800">{row[header.key]}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
