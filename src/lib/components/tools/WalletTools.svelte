<script lang="ts">
	import { Button } from '@timeleap/ui';
	import ConnectButton from '$lib/components/ConnectButton.svelte';
	import { CreditCard, ExternalLinkIcon } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	import { onboard } from '$lib/onboard';
	import { wallet } from '$lib/stores/wallet';
	import type { ComponentType } from 'svelte';
	import MetamaskIcon from '../icons/MetamaskIcon.svelte';

	const addToMetamask = async () => {
		const params = {
			type: 'ERC20',
			options: {
				address: '0xf1264873436A0771E440E2b28072FAfcC5EEBd01', // Kenshi token address
				symbol: 'KNS',
				decimals: 18,
				image: `${window.location.origin}/images/token/kenshi.png`
			}
		};

		if (!$wallet) await onboard.connectWallet();

		try {
			await onboard.setChain({ chainId: '0xa4b1' });
		} catch (error: unknown) {
			toast.error("Couldn't switch to the Arbitrum One network.");

			if (error instanceof Error) throw new Error(error.message);
			throw new Error(String(error));
		}

		try {
			await $wallet?.provider.request({ method: 'wallet_watchAsset', params });
		} catch (error: unknown) {
			toast.error("Couldn't add the token to your wallet.");

			if (error instanceof Error) throw new Error(error.message);
			throw new Error(String(error));
		}
	};
	interface Links {
		name: string;
		label: string;
		icon: ComponentType;
		url?: string;
		action?: () => Promise<void>;
	}
	const links: Links[] = [
		{
			name: 'uniswap',
			label: 'Buy ₭enshi',
			icon: CreditCard,
			url: 'https://app.uniswap.org/swap?outputCurrency=0xf1264873436A0771E440E2b28072FAfcC5EEBd01'
		},
		{
			name: 'metamask',
			label: 'Add ₭enshi',
			icon: MetamaskIcon,
			action: async () => await addToMetamask()
		},
		{
			name: 'dexscreener',
			label: 'Charts',
			icon: ExternalLinkIcon,
			url: 'https://dexscreener.com/arbitrum/0x68c685fd52a56f04665b491d491355a624540e85'
		}
	];
</script>

<div class="grow-2 flex flex-col gap-4">
	<ConnectButton class="bg-zinc-800 hover:bg-zinc-700" />
	<div class="buttons flex flex-wrap gap-4">
		{#each links as link}
			<Button
				href={link?.url}
				target="_blank"
				on:click={link?.action}
				class="bg-zinc-800 hover:bg-zinc-700 grow"
			>
				<svelte:component this={link.icon} size={'1em'} />
				{link.label}
			</Button>
		{/each}
	</div>
</div>
