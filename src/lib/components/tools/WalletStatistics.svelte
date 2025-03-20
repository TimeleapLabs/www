<script lang="ts">
	import { Input } from '@timeleap/ui';
	import { FilePenLineIcon } from 'lucide-svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import DataTable from '$lib/components/DataTable.svelte';

	export let userAddress: string | undefined;
	export let balanceDisplay: string | bigint;
	export let usdBalanceDisplay: string | bigint;
	export let treasuryDisplay: string | bigint;
	export let usdTreasuryDisplay: string | bigint;
	export let reserveDisplay: string | bigint;
	export let usdReserveDisplay: string | bigint;
	export let stakedDisplay: string | bigint;
	export let usdStakedDisplay: string | bigint;
</script>

<div class="flex flex-col gap-12">
	<div>
		<Input
			id="wallet"
			placeholder="Wallet address"
			label="Selected Wallet Address"
			bind:value={userAddress}
			class="bg-zinc-700"
		>
			<FilePenLineIcon />
		</Input>

		{#if userAddress && typeof window !== 'undefined'}
			<CopyButton text={`${window.location.origin}/tools?address=${userAddress}`} />
		{/if}
	</div>

	<DataTable
		title="Balance sheet"
		description="Balance details for your account"
		headers={[
			{ key: 'name', value: 'Name' },
			{ key: 'kenshi', value: 'Kenshi' },
			{ key: 'usd', value: 'USD' }
		]}
		rows={[{ id: '0', name: 'Current', kenshi: balanceDisplay, usd: usdBalanceDisplay }]}
	/>

	<DataTable
		title="Stats"
		description="Global Kenshi stats"
		headers={[
			{ key: 'name', value: 'Name' },
			{ key: 'kenshi', value: 'Kenshi' },
			{ key: 'usd', value: 'USD' }
		]}
		rows={[
			{ id: '0', name: 'Treasury', kenshi: treasuryDisplay, usd: usdTreasuryDisplay },
			{ id: '1', name: 'Reserve', kenshi: reserveDisplay, usd: usdReserveDisplay },
			{ id: '2', name: 'Staked', kenshi: stakedDisplay, usd: usdStakedDisplay }
		]}
	/>
</div>
