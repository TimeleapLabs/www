import { fetchNFTs } from '$lib/utils/nft';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const nfts = await fetchNFTs();
		return {
			nfts
		};
	} catch (error) {
		console.error('Error fetching NFTs:', error);
		return {
			nfts: []
		};
	}
};
