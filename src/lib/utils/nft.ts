import type { NFT } from './types';

export const fetchNFTs = async (): Promise<NFT[]> => {
	try {
		const response = await fetch('https://nft.kenshi.io/katana/data.json');
		return await response.json();
	} catch (error) {
		console.error('Failed to fetch NFTs:', error);
		return [];
	}
};

export const getRarity = (rarity: number) => {
	if (rarity <= 1) {
		return { name: 'Frequent Find', theme: 'hover:bg-gray-400' };
	} else if (rarity <= 5) {
		return { name: 'Uncommon Unearth', theme: 'hover:bg-cyan-400' };
	} else if (rarity <= 50) {
		return { name: 'Scarce Stumble', theme: 'hover:bg-blue-400' };
	} else if (rarity <= 150) {
		return { name: 'Rare Reveal', theme: 'hover:bg-purple-400' };
	} else {
		return { name: 'Exclusive Encounter', theme: 'hover:bg-pink-400' };
	}
};
