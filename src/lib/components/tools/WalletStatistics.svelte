<script lang="ts">
	import { wallet } from '$lib/stores/wallet';
	import { Input } from '@timeleap/ui';
	import { CircleX } from 'lucide-svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import DataTable from '$lib/components/DataTable.svelte';
	import { browser } from '$app/environment';
	import { ethers } from 'ethers';
	import { onMount } from 'svelte';

	export let checksumAddress: string | undefined;
	export let balanceDisplay: string | bigint;
	export let usdBalanceDisplay: string | bigint;
	export let stakedDisplay: string | bigint;
	export let usdStakedDisplay: string | bigint;

	let userAddress: string | undefined;
	let isAddressValid: boolean = true;
	let manuallySet: boolean = true;

	$: if (browser) {
		const url = new URL(window.location.href);

		if ($wallet?.accounts) {
			userAddress = $wallet.accounts[0].address;
			manuallySet = false;
		} else if (!$wallet && !manuallySet) {
			userAddress = undefined;
			manuallySet = true;
		}

		if (userAddress) {
			try {
				const address = ethers.getAddress(userAddress?.toLowerCase());
				ethers.isAddress(address);
				checksumAddress = address;
				url.searchParams.set('address', checksumAddress);
				isAddressValid = true;
			} catch {
				url.searchParams.delete('address');
				checksumAddress = undefined;
				isAddressValid = false;
			} finally {
				window.history.replaceState({}, '', url);
			}
		} else {
			url.searchParams.delete('address');
			checksumAddress = undefined;
			isAddressValid = true;
		}
	}
	onMount(() => {
		const url = new URL(window.location.href);
		const address = url.searchParams.get('address');
		if (address) userAddress = address;
	});
</script>

<div class="min-w-full grow-4 flex flex-col gap-12">
	<div class="relative">
		<Input
			id="wallet"
			placeholder="0x..."
			label="Wallet Address"
			bind:value={userAddress}
			class="bg-zinc-700 pr-12!"
			disabled={$wallet?.accounts}
		></Input>

		{#if userAddress}
			<div
				class="absolute inset-y-0 right-2 md:top-10"
				class:top-10={isAddressValid}
				class:top-3={!isAddressValid}
			>
				<CopyButton toCopy={userAddress} />
			</div>
		{/if}
		{#if !isAddressValid}
			<div
				class="md:absolute md:top-0 md:right-2 mt-2 flex justify-center items-center gap-2 text-red-400"
			>
				<CircleX /> Invalid Address
			</div>
		{/if}
	</div>

	<DataTable
		title="Balance sheet"
		description="Balance details for your account"
		headers={[
			{ key: 'name', value: 'Name' },
			{ key: 'kenshi', value: '₭enshi' },
			{ key: 'usd', value: 'USD' }
		]}
		rows={[{ id: '0', name: 'Current', kenshi: balanceDisplay, usd: usdBalanceDisplay }]}
	/>

	<DataTable
		title="Stats"
		description="Global Kenshi stats"
		headers={[
			{ key: 'name', value: 'Name' },
			{ key: 'kenshi', value: '₭enshi' },
			{ key: 'usd', value: 'USD' }
		]}
		rows={[{ id: '0', name: 'Staked', kenshi: stakedDisplay, usd: usdStakedDisplay }]}
	/>
</div>
