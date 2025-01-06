interface NFTMetadata {
	external_url: any;
	image: string;
	name: string;
	attributes: { trait_type: string; value: string }[];
}

interface NFT {
	rarity: number;
	metadata: NFTMetadata;
}
