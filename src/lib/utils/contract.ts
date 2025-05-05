import { ethers } from 'ethers';
import stakingAbi from '$lib/abi/staking';
import stakingStorageAbi from '$lib/abi/stakingStorage';
import katanaAbi from '$lib/abi/katana';
import kenshiAbi from '$lib/abi/kenshi';
import type { Eip1193Provider } from 'ethers';

export const initializeContracts = async (walletProvider: Eip1193Provider) => {
	const provider = new ethers.BrowserProvider(walletProvider);
	const accounts = (await walletProvider.request({ method: 'eth_requestAccounts' })) as string[];
	const signer = await provider.getSigner(accounts[0]);
	const stakingAddr = '0xE894BD5Ec531EC8AAe856AFC3E0Fc948Ab22Efb4';
	const storageAddr = '0x46f0de7e4412883D36e541044683247C3E6B7e30';
	const tokenAddr = '0xf1264873436A0771E440E2b28072FAfcC5EEBd01';
	const nftAddr = '0x13B8046B98c7D86D719fC34e5C3DF5E5e8da897A';

	const staking = new ethers.Contract(stakingAddr, stakingAbi, signer);
	const storage = new ethers.Contract(storageAddr, stakingStorageAbi, signer);
	const token = new ethers.Contract(tokenAddr, kenshiAbi, signer);
	const nft = new ethers.Contract(nftAddr, katanaAbi, signer);

	return { staking, storage, token, nft, signer };
};
