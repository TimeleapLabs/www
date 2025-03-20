<script lang="ts">
	import { Button } from '@timeleap/ui';
	import ConnectButton from '$lib/components/ConnectButton.svelte';
	import { CreditCard, Wallet, ExternalLinkIcon } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	import { onboard } from '$lib/onboard';
	import { wallet } from '$lib/stores/wallet';

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

		try {
			await onboard.setChain({ chainId: '0xa4b1' });
		} catch (error) {
			return toast.error("Couldn't switch to the Arbitrum One network.");
		}

		if ($wallet)
			$wallet.provider.request({ method: 'wallet_watchAsset', params }).catch((error: any) => {
				console.error('Error adding token to wallet:', error);
				toast.error("Couldn't add the token to your wallet.");
			});
	};
</script>

<div class="flex flex-col gap-4">
	<p>
		{$wallet?.provider
			? 'You are connected as'
			: "You'll need to connect your wallet to use certain areas of Timeleap tools."}
	</p>
	<ConnectButton class="bg-zinc-800 hover:bg-zinc-700" />
	<div class="buttons flex gap-4">
		<Button
			href="https://app.uniswap.org/swap?outputCurrency=0xf1264873436A0771E440E2b28072FAfcC5EEBd01"
			class="bg-zinc-800 hover:bg-zinc-700"
		>
			Buy Kenshi <CreditCard size={'1em'} strokeWidth={2.5} />
		</Button>
		<Button on:click={addToMetamask} class="bg-zinc-800 hover:bg-zinc-700">
			Add ₭enshi <Wallet />
		</Button>
		<Button
			href="https://dexscreener.com/arbitrum/0x68c685fd52a56f04665b491d491355a624540e85"
			class="bg-zinc-800 hover:bg-zinc-700"
		>
			Charts <ExternalLinkIcon size={'1em'} strokeWidth={2.5} />
		</Button>
	</div>

	<p class="text-sm text-zinc-400 mt-4">
		What you should know about the TLP token: <a
			href="/blog/rebrand"
			class="text-blue-500 hover:underline">Read more</a
		>
	</p>
</div>
