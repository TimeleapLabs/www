<script lang="ts">
	import { onboard } from '$lib/onboard';

	import { wallet, type Wallet } from '$lib/stores/wallet';
	import Icon from '@iconify/svelte';
	import { Button } from '@timeleap/ui';
	import { onMount } from 'svelte';

	const connect = async (): Promise<void> => {
		if ($wallet?.provider) {
			await onboard.disconnectWallet({ label: $wallet.label ?? '' });
		} else {
			await onboard.connectWallet();
		}
	};

	const wallets = onboard.state.select('wallets');

	const { unsubscribe } = wallets.subscribe((update) => ([$wallet] = update));

	onMount(() => {
		return () => {
			try {
				unsubscribe();
			} catch (error) {
				console.error('Error during unsubscribe:', error);
			}
		};
	});

	const formatWalletAddress = (wallet: Wallet): string => {
		const address = wallet.accounts?.[0].address ?? '';
		return address.slice(0, 6);
	};
</script>

<Button class={$$props.class || ''} on:click={connect}>
	{#if $wallet?.provider}
		<span class="text-zinc-400">{formatWalletAddress($wallet)}</span> — <span>Disconnect</span>
	{:else}
		Connect <Icon icon="material-symbols:account-balance-wallet" />
	{/if}
</Button>
