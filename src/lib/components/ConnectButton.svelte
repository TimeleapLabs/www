<script lang="ts">
	import { onboard } from '$lib/onboard';

	import { wallet, type Wallet } from '$lib/stores/wallet';
	import Icon from '@iconify/svelte';
	import { Button } from '@timeleap/ui';
	import { onMount } from 'svelte';

	let clazz = '';
	export { clazz as class };
	const connect = async (): Promise<void> => {
		if ($wallet?.provider) {
			await onboard.disconnectWallet({ label: $wallet.label ?? '' });
		} else {
			await onboard.connectWallet();
		}
	};

	// Typing the subscription
	const wallets = onboard.state.select('wallets') as {
		subscribe: (callback: (update: Wallet[]) => void) => { unsubscribe: () => void };
	};

	// Unsubscribe function
	let unsubscribe: () => void;

	onMount(() => {
		unsubscribe = wallets.subscribe((update: Wallet[]) => ([$wallet] = update)).unsubscribe;
		return () => {
			try {
				unsubscribe();
			} catch (error) {
				console.error('Error during unsubscribe:', error);
			}
		};
	});
</script>

<Button class={clazz} on:click={connect}>
	{#if $wallet?.provider}
		Disconnect
	{:else}
		Connect <Icon icon="material-symbols:account-balance-wallet" />
	{/if}
</Button>
