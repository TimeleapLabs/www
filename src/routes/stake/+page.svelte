<script>
	import Footer from 'src/components/Footer.svelte';

	import { wallet } from 'src/stores/wallet';
	import { onMount } from 'svelte';
	import { ethers } from 'ethers';

	import ConnectButton from 'src/components/ConnectButton.svelte';

	import { Grid, Row, Column, Content } from 'carbon-components-svelte';
	import { Button, Tile } from 'carbon-components-svelte';
	import { Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
	import { IntentRequestCreate } from 'carbon-icons-svelte';
	import { Upload, ArrowUpRight } from 'carbon-icons-svelte';
	import { DataTable } from 'carbon-components-svelte';
	import { Checkbox, Pagination } from 'carbon-components-svelte';
	import { Select, SelectItem, TextInput } from 'carbon-components-svelte';

	import ExpressiveHeading from 'src/components/carbon/ExpressiveHeading.svelte';

	import { toast } from '@zerodevx/svelte-toast';
	import { onboard } from '$lib/onboard';

	import Katana from 'src/components/nft/Katana.svelte';

	import stakingAbi from '$lib/abi/staking';
	import stakingStorageAbi from '$lib/abi/stakingStorage';
	import katanaAbi from '$lib/abi/katana';
	import kenshiAbi from '$lib/abi/kenshi';

	const stakingAddr = '0xE894BD5Ec531EC8AAe856AFC3E0Fc948Ab22Efb4';
	const storageAddr = '0x46f0de7e4412883D36e541044683247C3E6B7e30';
	const tokenAddr = '0xf1264873436A0771E440E2b28072FAfcC5EEBd01';
	const nftAddr = '0x13B8046B98c7D86D719fC34e5C3DF5E5e8da897A';

	let userAddress;
	let staking;
	let storage;
	let token;
	let nft;
	let nfts;

	let programs;
	let userStakes = [];
	let userNfts = [];

	let amount = '100000';
	let nftId = 0;
	let programId;
	let withNft;

	const formatDate = (date) =>
		date.toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});

	const setAddress = async () => {
		const provider = new ethers.providers.Web3Provider($wallet.provider);
		const signer = provider.getSigner($wallet.accounts?.[0]?.address);

		try {
			await onboard.setChain({ chainId: '0xa4b1' });
		} catch (error) {
			toast.push("Couldn't change to the Arbitrum network.");
			return null;
		}

		userAddress = await signer.getAddress();
		staking = new ethers.Contract(stakingAddr, stakingAbi, signer);
		storage = new ethers.Contract(storageAddr, stakingStorageAbi, signer);
		token = new ethers.Contract(tokenAddr, kenshiAbi, signer);
		nft = new ethers.Contract(nftAddr, katanaAbi, signer);
	};

	$: if ($wallet) setAddress();

	const headers = [
		{ key: 'amount', value: 'Amount' },
		{ key: 'nftId', value: 'NFT' },
		{ key: 'rewards', value: 'Rewards' },
		{ key: 'unlock', value: 'Unlock' },
		{ key: 'actions', value: 'Actions' }
	];

	let pageSize = 5;
	let page = 1;

	const readStakeStats = async () => {
		if (!storage && !userAddress) {
			return;
		}
		const stakeIds = await storage.findStakesByUser(userAddress);
		const rawUserStakes = await storage.getStakesById(stakeIds);
		userStakes = rawUserStakes
			.map((stake, index) => ({
				...stake,
				id: stakeIds[index]
			}))
			.reverse();
		const allPrograms = await storage.getStakeProgramsById([0, 1, 2]);
		programs = allPrograms
			.map((program, id) => ({ ...program, id }))
			.filter((program) => program.active);
	};

	$: if (userAddress && storage) {
		readStakeStats();
	}

	const readUserNfts = async () => {
		const bigNfts = await nft.tokensOfOwner(userAddress);
		userNfts = bigNfts.map((n) => parseInt(n));
		nftId = userNfts[0];
	};

	$: if (nft && userAddress) {
		readUserNfts();
	}

	const setMax = async () => {
		const balance = await token.balanceOf(userAddress);
		amount = ethers.utils.formatUnits(balance);
	};

	$: if (token && userAddress) {
		setMax();
	}

	onMount(async () => {
		nfts = await fetch('https://nft.kenshi.io/katana/data.json')
			.then((res) => res.json())
			.catch(() => []);
		const interval = setInterval(readStakeStats, 60 * 1000);
		return () => clearInterval(interval);
	});

	const durationOf = (program) => {
		const date = new Date(new Date().valueOf() + program.duration * 1000);
		return `${formatDate(date)}`;
	};

	const yieldOf = (program, withNft) => {
		const multiplier = withNft ? 200000n : 100000n;
		const earned = program.rewards.mul(multiplier).div(1000000000000000000n) / 1000;
		const days = program.duration / 86400;
		const apr = (Number(earned) * (365 / days)).toFixed(1);
		return `${earned}% (~${apr}%/Y)`;
	};

	const stakeHelper = async () => {
		if (!amount || !ethers.utils.parseUnits(amount).gt(0)) {
			return toast.push('You need to stake more than 0 tokens!');
		}
		if (withNft && (!Number.isInteger(nftId) || nftId >= 444)) {
			return toast.push('Katana NFT ID is invalid!');
		}
		try {
			await onboard.setChain({ chainId: '0xa4b1' });
		} catch (error) {
			return toast.push("Couldn't change to the Arbitrum network.");
		}
		// approve the tokens
		const tokenAmount = ethers.utils.parseUnits(amount);
		try {
			const tx = await token.approve(stakingAddr, tokenAmount);
			await tx.wait();
		} catch (error) {
			toast.push(error.data?.message || error.message);
			return toast.push('Failed to approve tokens for staking!');
		}
		// approve the nft
		if (withNft) {
			try {
				const tx = await nft.approve(stakingAddr, nftId);
				await tx.wait();
			} catch (error) {
				toast.push(error.data?.message || error.message);
				return toast.push('Failed to approve NFT for staking!');
			}
		}
		// stake!
		try {
			if (withNft) {
				const tx = await staking.stakeTokensWithNft(programId, tokenAmount, nftId);
				await tx.wait();
			} else {
				await staking.stakeTokens(programId, tokenAmount);
			}
		} catch (error) {
			toast.push(error.data?.message || error.message);
			return toast.push('Failed to stake!');
		}
		toast.push('Successfully joined the staking program!');
		readStakeStats();
	};

	let isStaking;
	const stake = async () => {
		isStaking = true;
		await stakeHelper();
		isStaking = false;
	};

	const unstake = (id) => async () => {
		try {
			await onboard.setChain({ chainId: '0xa4b1' });
		} catch (error) {
			return toast.push("Couldn't change to the Arbitrum network.");
		}
		try {
			const tx = await staking.unstake(id);
			await tx.wait();
		} catch (error) {
			toast.push(error.data?.message || error.message);
			return toast.push('Failed to unstake!');
		}
		toast.push('Successfully claimed!');
		readStakeStats();
	};
</script>

<Content>
	<Grid padding>
		<Row>
			<Column>
				<Breadcrumb noTrailingSlash>
					<BreadcrumbItem href="/">Kenshi</BreadcrumbItem>
					<BreadcrumbItem href="/stake" isCurrentPage>Stake</BreadcrumbItem>
				</Breadcrumb>
			</Column>
		</Row>

		<Row>
			<Column lg={4}>
				<Tile class="blue-tile">
					<div class="flex-column">
						<ExpressiveHeading size={5}>
							<h1>Stake KNS</h1>
						</ExpressiveHeading>
						<p>Stake KNS for a set period of time and get ecosystem rewards.</p>
					</div>
				</Tile>
			</Column>
			<Column>
				<Grid fullWidth>
					<Row>
						<Column>
							<div class="flex-column">
								<ExpressiveHeading size={2}>
									<h4>+You</h4>
								</ExpressiveHeading>
								<p>Connect your wallet to stake.</p>
							</div>
						</Column>
					</Row>
					<Row>
						<Column>
							<div class="button-group">
								<Button kind="secondary" href="/nft/katana" icon={IntentRequestCreate}>
									Mint a Katana
								</Button>
								<ConnectButton primary />
							</div>
						</Column>
					</Row>
				</Grid>
			</Column>
		</Row>

		{#if staking && programs}
			<Row>
				<Column>
					<ExpressiveHeading size={5}>Stake</ExpressiveHeading>
					<div class="helper-text-01">
						Your tokens will be locked for the period of the program. At the end of the program you
						will get your tokens, your NFT and your rewards.
					</div>
				</Column>
			</Row>

			<Row>
				<Column>
					<Select
						labelText="Program"
						bind:selected={programId}
						helperText="This is the staking program you will be joining"
					>
						{#each programs as program}
							<SelectItem
								value={program.id}
								text="Until {durationOf(program)} for {yieldOf(program, withNft)} rewards"
							/>
						{/each}
					</Select>
				</Column>
				<Column>
					<TextInput
						bind:value={amount}
						placeholder="KNS to stake"
						labelText="Amount"
						helperText="This is the amount of KNS you will be staking"
					/>
				</Column>
			</Row>

			<Row>
				<Column>
					<Checkbox bind:checked={withNft} labelText="Double staking rewards with a Katana NFT!" />
				</Column>
			</Row>

			{#if withNft}
				<Row>
					<Column>
						<Select
							bind:selected={nftId}
							placeholder="Your Katana NFT Token ID"
							label="Katana"
							helperText="This is the token ID of the Katana you will be staking"
						>
							{#each userNfts as id}
								<SelectItem value={id} text={nfts[id].metadata.name} />
							{/each}
						</Select>
						<div class="buttons">
							<Button disabled={isStaking} on:click={stake} icon={Upload}>Stake now!</Button>
						</div>
					</Column>
					<Column>
						{#if Number.isInteger(nftId) && nftId < 444}
							<div class="nft">
								{#key nftId}
									<Katana nft={nfts[nftId]} />
								{/key}
							</div>
						{/if}
					</Column>
				</Row>
			{/if}

			{#if !withNft}
				<Row>
					<Column>
						<Button disabled={isStaking} on:click={stake} icon={Upload}>Stake now!</Button>
					</Column>
				</Row>
			{/if}
		{/if}

		<Row>
			<Column>
				<ExpressiveHeading size={3}>Joined programs</ExpressiveHeading>
				<div class="helper-text-01">
					Connect your wallet to see the staking programs you've joined.
				</div>
			</Column>
		</Row>

		<Row>
			<Column>
				<DataTable {headers} rows={userStakes} {pageSize} {page} sortable>
					<svelte:fragment slot="cell" let:row let:cell>
						{#if cell.key === 'actions'}
							{#if !row.claimed && row.unlock <= new Date().valueOf() / 1000}
								<Button kind="ghost" size="small" icon={ArrowUpRight} on:click={unstake(row.id)}>
									Claim
								</Button>
							{:else if row.claimed}
								Already claimed.
							{:else}
								Not unlocked yet.
							{/if}
						{:else if cell.key === 'amount'}
							{ethers.utils.formatUnits(cell.value)} KNS
						{:else if cell.key === 'rewards'}
							{ethers.utils.formatUnits(cell.value)} KNS
						{:else if cell.key === 'unlock'}
							{formatDate(new Date(cell.value * 1000))}
							{new Date(cell.value * 1000).toLocaleTimeString()}
						{:else if cell.key === 'nftId'}
							{#if row.hasNft}
								{cell.value}
							{:else}
								N/A
							{/if}
						{:else}
							{cell.value}
						{/if}
					</svelte:fragment>
				</DataTable>
				<Pagination bind:pageSize bind:page totalItems={userStakes.length} pageSizeInputDisabled />
			</Column>
		</Row>
	</Grid>
</Content>

<Footer />

<style>
  .nft {
    display: grid;
  }
  .nft :global(.katana) {
    grid-column: 1;
    grid-row: 1;
  }
  .buttons {
    margin-top: 2em;
  }
  .button-group {
    gap: 1em;
    display: flex;
  }
</style>
