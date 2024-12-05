import { onboard } from '$lib/onboard';
import { toast } from '@zerodevx/svelte-toast';
import { ethers } from 'ethers';

const stakingAddr = '0xE894BD5Ec531EC8AAe856AFC3E0Fc948Ab22Efb4';

export const stakeHelper = async (
	amount: string,
	nftId: number,
	withNft: boolean,
	staking: ethers.Contract,
	nft: ethers.Contract,
	token: ethers.Contract,
	programId: string | undefined
): Promise<void> => {
	if (!amount || !(ethers.parseUnits(amount) > 0)) {
		toast.push('You need to stake more than 0 tokens!');
		return;
	}

	if (withNft && (!Number.isInteger(nftId) || nftId >= 444)) {
		toast.push('Katana NFT ID is invalid!');
		return;
	}

	const tokenAmount = ethers.parseUnits(amount);

	try {
		const tx = await token.approve(stakingAddr, tokenAmount);
		await tx.wait();
	} catch (error: any) {
		const errorMessage =
			error?.info?.error?.message || error?.message || 'Failed to approve tokens for staking!';
		toast.push(errorMessage);
		return;
	}

	if (withNft) {
		try {
			const tx = await nft.approve(stakingAddr, nftId);
			await tx.wait();
		} catch (error: any) {
			const errorMessage =
				error?.info?.error?.message || error?.message || 'Failed to approve NFT for staking!';
			toast.push(errorMessage);
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
		toast.push('Successfully joined the staking program!');
	} catch (error: any) {
		const errorMessage = error?.info?.error?.message || error?.message || 'Failed to stake!';
		toast.push(errorMessage);
		return;
	}
};

export const unstake = (id: bigint, staking: ethers.Contract) => async (): Promise<void> => {
	try {
		await onboard.setChain({ chainId: '0xa4b1' });
	} catch (error) {
		toast.push("Couldn't change to the Arbitrum network.");
		return;
	}

	if (!staking) return;

	try {
		const tx = await staking.unstake(id);
		await tx.wait();
	} catch (error: any) {
		const errorMessage = error?.info?.error?.message || error?.message || 'Failed to unstake!';
		toast.push(errorMessage);
		return;
	}

	toast.push('Successfully claimed!');
};
