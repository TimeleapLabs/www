<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import WalletTools from '$lib/components/tools/WalletTools.svelte';
	import WalletStatistics from '$lib/components/tools/WalletStatistics.svelte';
	import { Card, Grid, Section } from '@timeleap/ui';
	import kenshiAbi from '$lib/abi/kenshi';
	import { page } from '$app/stores';
	import { ethers } from 'ethers';
	import { fetchTokenPriceFromPair } from '$lib/api/token';
	import { wallet } from '$lib/stores/wallet';
	import { onMount } from 'svelte';

	let userAddress = $page?.url?.searchParams?.get?.('address') ?? undefined;

	let balance: bigint;
	let unitPrice: number;
	let treasury: bigint;
	let reserve: bigint;
	let staked: bigint;

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

	$: balanceDisplay = toKenshi(balance || 0n);
	$: treasuryDisplay = toKenshi(treasury || 0n);
	$: reserveDisplay = toKenshi(reserve || 0n);
	$: stakedDisplay = toKenshi(staked || 0n);

	$: usdBalanceDisplay = balance && unitPrice ? toUsd(balance) : 0n;
	$: usdTreasuryDisplay = treasury && unitPrice ? toUsd(treasury) : 0n;
	$: usdReserveDisplay = reserve && unitPrice ? toUsd(reserve) : 0n;
	$: usdStakedDisplay = staked && unitPrice ? toUsd(staked) : 0n;

	const kenshiAddr = '0xf1264873436A0771E440E2b28072FAfcC5EEBd01';
	const treasuryAddr = '0xD59321c8266534dac369F0eFABDD5b815F1a5eb6';
	const reserveAddr = '0x51DD193630806aDCFFa9E72569a71A9c12591C33';
	const stakeAddr = '0xE894BD5Ec531EC8AAe856AFC3E0Fc948Ab22Efb4';
	const jsonRpcUrl = 'https://arbitrum.blockpi.network/v1/rpc/public';
	const provider = new ethers.JsonRpcProvider(jsonRpcUrl);
	const contract = new ethers.Contract(kenshiAddr, kenshiAbi, provider);

	const onWallet = async () => {
		const walletProvider = new ethers.BrowserProvider($wallet?.provider);
		userAddress = await (await walletProvider.getSigner()).getAddress();
		updateValues();
	};

	const updatePrice = async () => {
		const { price } = await fetchTokenPriceFromPair();
		unitPrice = price || unitPrice;
	};

	const updateValues = async () => {
		if (!userAddress) return;
		balance = await contract.balanceOf(userAddress);
		treasury = await contract.balanceOf(treasuryAddr);
		reserve = await contract.balanceOf(reserveAddr);
		staked = await contract.balanceOf(stakeAddr);
	};

	$: if ($wallet?.provider) onWallet();
	$: if (userAddress && unitPrice) updateValues().catch(() => null);

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

<Section class="w-full max-w-[1280px] mx-auto pt-20 pb-24 flex-1 !gap-16 px-4 md:px-16 xxl:px-0">
	<h2 class="text-white font-serif text-5xl mt-4">Timeleap Tools</h2>

	<Card class="bg-zinc-900 text-white p-8 rounded-lg shadow-lg">
		<Grid extraLargeScreenColumns={2} largeScreenColumns={2}>
			<!-- Left Column: Wallet Tools -->
			<WalletTools />

			<!-- Right Column: Wallet Statistics -->
			<WalletStatistics
				{userAddress}
				{balanceDisplay}
				{usdBalanceDisplay}
				{treasuryDisplay}
				{usdTreasuryDisplay}
				{reserveDisplay}
				{usdReserveDisplay}
				{stakedDisplay}
				{usdStakedDisplay}
			/>
		</Grid>
	</Card>
</Section>

<Footer></Footer>
