import { onboard } from '$lib/onboard';
import toast from 'svelte-french-toast';
import { ethers } from 'ethers';

const stakingAddr = '0xE894BD5Ec531EC8AAe856AFC3E0Fc948Ab22Efb4';

export const stakeHelper = async (
	amount: string,
	nftId: number,
	withNft: boolean,
	staking: ethers.Contract,
	nft: ethers.Contract,
	token: ethers.Contract,
	programId: string | null
): Promise<void> => {
	if (!amount || !(ethers.parseUnits(amount) > 0)) {
		toast.error('You need to stake more than 0 tokens!');
		return;
	}

	if (withNft && (!Number.isInteger(nftId) || nftId >= 444)) {
		toast.error('Katana NFT ID is invalid!');
		return;
	}

	try {
		await onboard.setChain({ chainId: '0xa4b1' });
	} catch (err: unknown) {
		console.error(err);
		toast.error("Couldn't change to the Arbitrum network.");
		return;
	}

	const tokenAmount = ethers.parseUnits(amount);

	try {
		const tx = await token.approve(stakingAddr, tokenAmount);
		await tx.wait();
	} catch (err: unknown) {
		const error = err as { info: { error: { message: string } }; message: string };
		const errorMessage =
			error?.info?.error?.message || error?.message || 'Failed to approve tokens for staking!';
		toast.error(errorMessage);
		return;
	}

	if (withNft) {
		try {
			const tx = await nft.approve(stakingAddr, nftId);
			await tx.wait();
		} catch (err: unknown) {
			const error = err as { info: { error: { message: string } }; message: string };
			const errorMessage =
				error?.info?.error?.message || error?.message || 'Failed to approve NFT for staking!';
			toast.error(errorMessage);
			return;
		}
	}

	try {
		if (withNft) {
			const tx = await staking.stakeTokensWithNft(programId, tokenAmount, nftId);
			await tx.wait();
		} else {
			await staking.stakeTokens(programId, tokenAmount);
		}
		toast.success('Successfully joined the staking program!');
	} catch (err: unknown) {
		const error = err as { info: { error: { message: string } }; message: string };
		const errorMessage = error?.info?.error?.message || error?.message || 'Failed to stake!';
		toast.error(errorMessage);
		return;
	}
};

export const unstake = async (id: bigint, staking: ethers.Contract): Promise<void> => {
	if (!staking) return;

	try {
		await onboard.setChain({ chainId: '0xa4b1' });
	} catch (err: unknown) {
		console.error(err);
		toast.error("Couldn't change to the Arbitrum network.");
		return;
	}

	try {
		const tx = await staking.unstake(id);
		await tx.wait();
	} catch (err: unknown) {
		const error = err as { info: { error: { message: string } }; message: string };
		const errorMessage = error?.info?.error?.message || error?.message || 'Failed to unstake!';
		toast.error(errorMessage);
		return;
	}

	toast.success('Successfully claimed!');
};
