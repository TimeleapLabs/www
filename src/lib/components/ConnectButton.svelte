<script lang="ts">
	import { onboard, type WalletState } from '$lib/onboard';

	import { wallet } from '$lib/stores/wallet';
	import { Button } from '@timeleap/ui';
	import { Wallet as WalletIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';

	const connect = async (): Promise<void> => {
		if ($wallet?.provider) {
			await onboard.disconnectWallet({ label: $wallet.label ?? '' });
		} else {
			await onboard.connectWallet();
		}
	};

	const wallets = onboard.state.select('wallets');

	onMount(() => {
		wallets.subscribe((update) => ([$wallet] = update));
	});

	const formatWalletAddress = (wallet: WalletState): string => {
		const address = wallet.accounts?.[0].address ?? '';
		return address.slice(0, 6);
	};
</script>

<Button class={$$props.class || ''} on:click={connect}>
	{#if $wallet?.provider}
		<span class="text-zinc-400">{formatWalletAddress($wallet)}</span> — <span>Disconnect</span>
	{:else}
		Connect <WalletIcon size="1em" />
	{/if}
</Button>
