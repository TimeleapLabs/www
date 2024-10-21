import { ethers } from 'ethers';
import { getKenshiUSDPrice } from '$lib/uniswap';

const initialSupply = 1000000000000000000000000000n;
const reservedSupply = 140000000000000000000000000n;

export const fetchSupply = async () => {
	const circulatingSupply = initialSupply - reservedSupply;

	return {
		circulating: ethers.formatUnits(circulatingSupply),
		burned: '0'
	};
};

export const fetchTokenPriceFromPair = async () => {
	return {
		price: await getKenshiUSDPrice()
	};
};
