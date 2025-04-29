<script lang="ts">
	import { run } from 'svelte/legacy';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import WalletTools from '$lib/components/tools/WalletTools.svelte';
	import WalletStatistics from '$lib/components/tools/WalletStatistics.svelte';
	import { Card, Section } from '@timeleap/ui';
	import kenshiAbi from '$lib/abi/kenshi';
	import { ethers } from 'ethers';
	import { fetchTokenPriceFromPair } from '$lib/api/token';
	import { wallet } from '$lib/stores/wallet';
	import { onMount } from 'svelte';

	let balance: bigint = $state(0n);
	let unitPrice: number = $state(0);
	let staked: bigint = $state(0n);
	let checksumAddress: string = $state('');

	const formatCurrency = (n: string | bigint | number, unit = '') => {
		return unit + formatThousands(trimDecimals(n), ',');
	};

	const toUsd = (n: bigint) => {
		const ethValue = Number(n) / 1e18;
		const price = unitPrice;
		return formatCurrency(ethValue * price, '$');
	};

	const toKenshi = (n: bigint) => formatCurrency(ethers.formatUnits(n || 0n)) || 0n;

	const trimDecimals = (n: { toString: () => string }) => {
		const [lhs, rhs = ''] = n.toString().split('.');
		return [lhs, rhs.slice(0, 2).replace(/0+$/, '')].filter(Boolean).join('.');
	};

	const formatThousands = (num: string, separator: string = ','): string => {
		return num.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
	};

	let balanceDisplay = $derived(toKenshi(balance || 0n));
	let stakedDisplay = $derived(toKenshi(staked || 0n));

	let usdBalanceDisplay = $derived(balance && unitPrice ? toUsd(balance) : 0n);
	let usdStakedDisplay = $derived(staked && unitPrice ? toUsd(staked) : 0n);

	const kenshiAddr = '0xf1264873436A0771E440E2b28072FAfcC5EEBd01';
	const stakeAddr = '0xE894BD5Ec531EC8AAe856AFC3E0Fc948Ab22Efb4';
	const jsonRpcUrl = 'https://arbitrum.blockpi.network/v1/rpc/public';
	const provider = new ethers.JsonRpcProvider(jsonRpcUrl);
	const contract = new ethers.Contract(kenshiAddr, kenshiAbi, provider);

	const onWallet = async () => {
		if (!$wallet) return;
		const walletProvider = new ethers.BrowserProvider($wallet.provider);
		checksumAddress = await (await walletProvider.getSigner()).getAddress();
		updateValues();
	};

	const updatePrice = async () => {
		const { price } = await fetchTokenPriceFromPair();
		unitPrice = price || unitPrice;
	};

	const updateValues = async () => {
		if (!checksumAddress) return;

		balance = await contract.balanceOf(checksumAddress);
		staked = await contract.balanceOf(stakeAddr);
	};

	$effect(() => {
		if ($wallet?.provider) onWallet();
	});
	$effect(() => {
		if (ethers.isAddress(checksumAddress)) updateValues();
		else balance = 0n;
	});
	onMount(() => {
		updatePrice();
		const priceInterval = setInterval(updatePrice, 5 * 60 * 1000);
		const valueInterval = setInterval(updateValues, 5 * 60 * 1000);
		return () => {
			clearInterval(priceInterval);
			clearInterval(valueInterval);
		};
	});
</script>

<Navbar active="none"></Navbar>

<Section class="md:p-10 p-2">
	<h2 class="relative py-5 md:top-10 top-13 text-white font-serif text-5xl">Timeleap Tools</h2>

	<Card class="bg-zinc-900 text-white md:p-8 rounded-lg shadow-lg">
		<div class="flex flex-wrap md:p-5 gap-10">
			<WalletTools />
			<WalletStatistics
				bind:checksumAddress
				{balanceDisplay}
				{usdBalanceDisplay}
				{stakedDisplay}
				{usdStakedDisplay}
			/>
		</div>
	</Card>
</Section>

<Footer></Footer>
