<script lang="ts">
	import { onMount } from 'svelte';
	import { ethers } from 'ethers';

	import { wallet } from '$lib/stores/wallet';
	import { Button, Card, Grid, Input, Section } from '@timeleap/ui';
	import Icon from '@iconify/svelte';
	import Select from '$lib/components/Select.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import ConnectButton from '$lib/components/ConnectButton.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import { initializeContracts } from '$lib/utils/contract';
	import { durationOf, formatDate, yieldOf } from '$lib/utils/helper';
	import { stakeHelper, unstake } from '$lib/utils/staking';
	import { toast } from '@zerodevx/svelte-toast';
	import { onboard } from '$lib/onboard.js';
	import { getRarity } from '$lib/utils/nft.js';

	let userAddress: string | undefined;
	let staking: ethers.Contract | undefined;
	let storage: ethers.Contract | undefined;
	let token: ethers.Contract | undefined;

	let nft: ethers.Contract | undefined;
	let nfts: NFT[] = [];
	export let data;
	nfts = data.nfts;

	let programs: { id: number; active: boolean; duration: number; rewards: bigint }[] = [];
	let programOptions: { value: string; label: string }[] = [];
	let userStakes: { id: bigint; [key: string]: bigint }[] = [];
	let userNfts: any[] = [];

	let amount: string;
	let balance: bigint;
	let programId: string | undefined;
	let nftId: number = 0;
	let withNft: any;
	let selectedNft = '';

	const setAddress = async (): Promise<void> => {
		const {
			staking: newStaking,
			storage: newStorage,
			token: newToken,
			nft: newNft,
			signer
		} = await initializeContracts($wallet?.provider);

		staking = newStaking;
		storage = newStorage;
		token = newToken;
		nft = newNft;

		try {
			await onboard.setChain({ chainId: '0xa4b1' });
		} catch (error) {
			toast.push("Couldn't change to the Arbitrum network.");
			return;
		}

		userAddress = await signer.getAddress();
	};

	$: if ($wallet?.provider) setAddress();

	const readStakeStats = async (): Promise<void> => {
		if (!storage || !userAddress) {
			return;
		}

		const stakeIds = await storage.findStakesByUser(userAddress);
		const stakeIdsAsBigInts = stakeIds.map((id: string | number | bigint | boolean) => BigInt(id));
		const rawUserStakes: any[] = await storage.getStakesById(stakeIdsAsBigInts);
		userStakes = rawUserStakes
			.map((stake, index) => ({
				...stake,
				id: stakeIds[index],
				unlock: stake.unlock instanceof BigInt ? stake.unlock.toString() : stake.unlock,
				amount: stake.amount instanceof BigInt ? stake.amount.toString() : stake.amount,
				rewards: stake.rewards instanceof BigInt ? stake.rewards.toString() : stake.rewards,
				program: stake.program instanceof BigInt ? stake.program.toString() : stake.program,
				nftId: stake.nftId instanceof BigInt ? stake.nftId.toString() : stake.nftId
			}))
			.reverse();

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

	$: if (userAddress && storage) {
		readStakeStats();
	}

	const readUserNfts = async () => {
		if (!nft) {
			return;
		}
		const bigNfts = await nft.tokensOfOwner(userAddress);
		userNfts = bigNfts.map((n: string) => parseInt(n));
		nftId = userNfts[0];
	};

	async function fetchBalance() {
		if (userAddress && token) {
			try {
				balance = await token.balanceOf(userAddress);
			} catch (error) {
				console.error('Error fetching balance:', error);
				balance = 0n;
			}
		}
	}

	$: if (token && userAddress) {
		fetchBalance();
	}

	async function setMax() {
		amount = ethers.formatUnits(balance);
	}

	$: if (nft && userAddress) {
		readUserNfts();
	}
	$: withNft = selectedNft !== '';

	let isStaking = false;
	const stake = async (): Promise<void> => {
		isStaking = true;
		await stakeHelper(amount, nftId, withNft, staking!, nft!, token!, programId);
		isStaking = false;
	};

	const unstakeHandler = async (id: bigint): Promise<void> => {
		if (!staking) {
			toast.push('Failed to get staking contract');
		} else {
			await unstake(id, staking);
		}
		readStakeStats();
	};

	let expandedIndex: number | null = null;
	function toggleStakeDetails(index: number) {
		expandedIndex = expandedIndex === index ? null : index;
	}

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
							on:click={setMax}
							type="button"
						>
							<span>Set Max</span>
						</button>
					</div>
				</div>

				<div class="flex gap-4">
					<Button
						class="bg-green-400 hover:bg-green-300 text-black font-semibold"
						disabled={isStaking}
						on:click={stake}
					>
						Stake <Icon icon="carbon:money" />
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
								on:click={() => toggleStakeDetails(index)}
								on:keydown={(e) => e.key === 'Enter' && toggleStakeDetails(index)}
							>
								<span class="font-medium">{ethers.formatUnits(stake.amount)} KNS</span>
								<Icon
									icon={expandedIndex === index ? 'carbon:chevron-up' : 'carbon:chevron-down'}
								/>
							</div>
							{#if expandedIndex === index}
								<div class="mt-4 text-sm">
									{#if typeof stake.rewards === 'bigint'}
										<p><strong>Rewards:</strong> {ethers.formatUnits(stake.rewards)} KNS</p>
									{/if}
									<p><strong>NFT:</strong> {stake.nft !== undefined ? stake.nft : '-'}</p>
									<p>
										<strong>Unlock Date:</strong>
										{formatDate(new Date(Number(stake.unlock) * 1000))}
									</p>
									<Button
										class="mt-4 bg-red-500 hover:bg-red-400 text-white font-semibold"
										on:click={() => unstakeHandler(stake.id)}
									>
										Unstake
									</Button>
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
