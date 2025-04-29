interface NFTMetadata {
	external_url: string;
	image: string;
	name: string;
	attributes: { trait_type: string; value: string }[];
}

export interface NFT {
	rarity: number;
	metadata: NFTMetadata;
}

export type BenchmarkResult = {
	name: string;
	serialization: number;
	deserialization: number;
	[key: string]: string | number;
};
