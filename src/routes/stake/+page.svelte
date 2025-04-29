<script lang="ts">
	import { onMount } from 'svelte';
	import { ethers } from 'ethers';

	import { wallet } from '$lib/stores/wallet';
	import { Button, Card, Grid, Input, Section } from '@timeleap/ui';
	import Select from '$lib/components/Select.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import ConnectButton from '$lib/components/ConnectButton.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import { initializeContracts } from '$lib/utils/contract';
	import { durationOf, formatDate, yieldOf } from '$lib/utils/helper';
	import { stakeHelper, unstake } from '$lib/utils/staking';
	import toast from 'svelte-french-toast';
	import { onboard } from '$lib/onboard.js';
	import { getRarity } from '$lib/utils/nft.js';
	import { slide } from 'svelte/transition';
	import { BadgeCheck, ChevronDown, ChevronUp, LockKeyhole, LockKeyholeOpen } from 'lucide-svelte';

	let userAddress: string | undefined;
	let staking: ethers.Contract | undefined;
	let storage: ethers.Contract | undefined;
	let token: ethers.Contract | undefined;
	let nft: ethers.Contract | undefined;

	let nfts: NFT[] = [];
	let data = $props();
	nfts = data.nfts;

	type UserStake = {
		id: bigint;
		unlock: bigint;
		amount: bigint;
		rewards: bigint;
		program: bigint;
		nftId: bigint;
		claimed: boolean;
		hasNft: boolean;
	};

	let programs: { id: number; active: boolean; duration: number; rewards: bigint }[] = [];
	let programOptions: { value: string; label: string }[] = $state([]);
	let userStakes: UserStake[] = $state([]);
	let userNfts: any[] = $state([]);

	let amount: string = $state('');
	let balance: bigint = $state(0n);
	let programId: string | null = $state(null);
	let nftId: number = $state(0);
	let withNft: any = $state();
	let selectedNft = $state('');
	let isStaking = $state(false);
	let expandedIndex: number | null = $state(null);

	async function setMax() {
		amount = ethers.formatUnits(balance);
	}

	const setAddress = async (): Promise<void> => {
		const { signer, ...contracts } = await initializeContracts($wallet?.provider);

		staking = contracts.staking;
		storage = contracts.storage;
		token = contracts.token;
		nft = contracts.nft;

		try {
			await onboard.setChain({ chainId: '0xa4b1' });
		} catch (error) {
			toast.error("Couldn't change to the Arbitrum network.");
			return;
		}

		userAddress = await signer.getAddress();
	};

	const niceKns = (amount: ethers.BigNumberish) =>
		ethers.formatUnits(amount, 18).replace(/(\.\d{2})\d+/, '$1');

	$effect(() => {
		if ($wallet?.provider && !userAddress) {
			setAddress();
		}
	});

	const readStakeStats = async (): Promise<void> => {
		if (!storage || !userAddress) return;

		const stakeIds = Array.from(await storage.findStakesByUser(userAddress));
		const rawUserStakes: UserStake[] = await storage.getStakesById(stakeIds);

		userStakes = rawUserStakes.map((stake, index) => ({
			amount: stake.amount,
			claimed: stake.claimed,
			hasNft: stake.hasNft,
			nftId: stake.nftId,
			program: stake.program,
			rewards: stake.rewards,
			unlock: stake.unlock,
			id: BigInt(stakeIds[index] as string)
		}));

		const allPrograms: any[] = await storage.getStakeProgramsById([0, 1, 2]);
		programs = allPrograms
			.map(([active, rewards, duration], id) => ({
				active,
				rewards: BigInt(rewards),
				duration: Number(duration),
				id
			}))
			.filter((program) => program.active);

		programOptions = programs.map((program) => ({
			value: program.id.toString(),
			label: `Until ${durationOf(program)} for ${yieldOf(program, withNft)}`
		}));
	};

	let stakeStatsInitialized = false;
	$effect(() => {
		if (userAddress && storage && !stakeStatsInitialized) {
			stakeStatsInitialized = true;
			readStakeStats();
		}
	});

	const readUserNfts = async () => {
		if (!nft || !userAddress) return;
		const bigNfts = await nft.tokensOfOwner(userAddress);
		userNfts = bigNfts.map((n: string) => parseInt(n));
		nftId = userNfts[0] ?? 0;
	};

	let nftsInitialized = false;
	$effect(() => {
		if (nft && userAddress && !nftsInitialized) {
			nftsInitialized = true;
			readUserNfts();
		}
	});

	async function fetchBalance() {
		if (!userAddress || !token) return;

		try {
			balance = await token.balanceOf(userAddress);
		} catch (error) {
			console.error('Error fetching balance:', error);
			balance = 0n;
		}
	}

	let balanceFetched = false;
	$effect(() => {
		if (token && userAddress && !balanceFetched) {
			balanceFetched = true;
			fetchBalance();
		}
	});

	$effect(() => {
		withNft = selectedNft !== '';
	});

	const stake = async (): Promise<void> => {
		isStaking = true;
		await stakeHelper(amount, nftId, withNft, staking!, nft!, token!, programId);
		isStaking = false;
	};

	const unstakeHandler = async (id: bigint): Promise<void> => {
		if (!staking) {
			toast.error('Failed to get staking contract');
		} else {
			await unstake(id, staking);
			readStakeStats();
		}
	};

	const toggleStakeDetails = (index: number) => {
		expandedIndex = expandedIndex === index ? null : index;
	};

	onMount(() => {
		const interval = setInterval(readStakeStats, 60 * 1000);
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>Timeleap — Distributed App Engine</title>
</svelte:head>

<Navbar active="stake"></Navbar>

<Section class="w-full max-w-[1280px] mx-auto pt-20 pb-24 flex-1 !gap-16 px-4 md:px-16 xxl:px-0">
	<h2 class="text-white font-serif text-5xl mt-4">Stake KNS</h2>

	<Grid extraLargeScreenColumns={2} largeScreenColumns={2}>
		<!-- Staking Program Card -->
		<Card class="bg-zinc-900 text-white p-8 rounded-lg shadow-lg flex flex-col gap-6">
			<h3 class="text-xl font-semibold">
				{#if $wallet?.provider}
					Choose Your Staking Program
				{:else}
					Stake KNS to Get Rewards
				{/if}
			</h3>
			{#if balance && $wallet?.provider}
				<div>
					Your current balance: {ethers.formatUnits(balance)} KNS
				</div>
			{/if}
			{#if $wallet?.provider}
				<div class="flex flex-col gap-6">
					<!-- Program Selection -->
					<Select
						id="program"
						label=""
						bind:value={programId}
						options={programOptions}
						helperText="Select the staking program you want to join."
						placeholder="Select a Program"
					/>

					<!-- NFT Double Reward Checkbox -->
					<Checkbox
						id="nft-check"
						label="Double staking rewards with a Katana NFT!"
						bind:checked={withNft}
					/>

					<!-- Conditional NFT Selection -->
					{#if withNft}
						<Select
							id="nft-select"
							label="Choose Your Katana NFT"
							bind:value={selectedNft}
							options={userNfts.map((id) => {
								const index = parseInt(id, 10);
								const nft = nfts[index];
								const { theme } = getRarity(nft?.rarity || 0);
								return {
									value: id,
									label: nft?.metadata?.name ?? `NFT #${id}`,
									color: theme
								};
							})}
							helperText="Optional: Select an NFT to boost your rewards."
							placeholder="Select an NFT"
						/>
					{/if}

					<!-- Staking Amount Input and Set Max Button -->
					<Input
						bind:value={amount}
						placeholder="KNS to stake"
						helperText="Enter the amount of KNS to stake."
						type="number"
						label=""
						id="stake-amount"
						class="bg-zinc-800 focus:bg-zinc-700 transition-colors w-full"
					/>
					<div class="flex justify-end -mt-4">
						<button
							class="text-xs text-white cursor-pointer hover:text-green-600"
							onclick={setMax}
							type="button"
						>
							<span>Set Max</span>
						</button>
					</div>
				</div>

				<div class="flex gap-4">
					<Button
						class="bg-green-400 hover:bg-green-300 text-black font-medium"
						disabled={isStaking}
						on:click={stake}
					>
						Stake <LockKeyholeOpen size={'1em'} class="ml-2" />
					</Button>
				</div>
			{:else}
				<p class="text-sm text-gray-400">
					Connect your wallet to participate in staking programs and earn rewards.
				</p>
				<ConnectButton class="bg-zinc-800 hover:bg-zinc-700" />
			{/if}
		</Card>

		<!-- User Stakes Card -->
		{#if userStakes.length > 0 && $wallet?.provider}
			<Card class="bg-zinc-900 text-white p-8 rounded-lg shadow-lg flex flex-col gap-6">
				<h3 class="text-xl font-semibold">Your Current Stakes</h3>
				<ul class="divide-y divide-zinc-800">
					{#each userStakes as stake, index}
						<li class="py-4">
							<div
								role="button"
								tabindex="0"
								class="flex justify-between items-center cursor-pointer"
								onclick={() => toggleStakeDetails(index)}
								onkeydown={(e) => e.key === 'Enter' && toggleStakeDetails(index)}
							>
								<span class="font-medium inline-flex items-center">
									{#if stake.claimed}
										<BadgeCheck size={'1em'} class="mr-4" />
									{:else if Number(stake.unlock) * 1000 < Date.now()}
										<LockKeyholeOpen size={'1em'} class="mr-4" />
									{:else}
										<LockKeyhole size={'1em'} class="mr-4" />
									{/if}
									{niceKns(stake.amount)} KNS
								</span>
								{#if expandedIndex === index}
									<ChevronUp size={'1em'} />
								{:else}
									<ChevronDown size={'1em'} />
								{/if}
							</div>
							{#if expandedIndex === index}
								<div class="mt-4 text-sm" transition:slide={{ axis: 'y', duration: 300 }}>
									{#if typeof stake.rewards === 'bigint'}
										<p><strong>Rewards:</strong> {niceKns(stake.rewards)} KNS</p>
									{/if}
									{#if stake.hasNft}
										<p><strong>NFT:</strong> {stake.nftId}</p>
									{/if}
									<p>
										<strong>Unlock Date:</strong>
										{formatDate(new Date(Number(stake.unlock) * 1000))}
									</p>
									{#if !stake.claimed && Number(stake.unlock) * 1000 < Date.now()}
										<Button
											class="mt-4 bg-red-500 hover:bg-red-400 text-white font-medium"
											on:click={() => unstakeHandler(stake.id)}
										>
											Unstake
										</Button>
									{:else if !stake.claimed}
										<p class="text-sm text-zinc-400">
											You can claim your rewards after the unlock date.
										</p>
									{:else}
										<p class="text-sm text-zinc-400">Already claimed rewards.</p>
									{/if}
								</div>
							{/if}
						</li>
					{/each}
				</ul>
			</Card>
		{/if}
	</Grid>
</Section>
<Footer></Footer>
