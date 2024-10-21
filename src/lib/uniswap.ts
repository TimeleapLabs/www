import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://arbitrum.blockpi.network/v1/rpc/public');

const poolABI = [
	`  function slot0(
        ) external view returns
        (uint160 sqrtPriceX96,
        int24 tick,
        uint16 observationIndex,
        uint16 observationCardinality,
        uint16 observationCardinalityNext,
        uint8 feeProtocol,
        bool unlocked)`
];

const getPrice = async (poolAddress: string, deltaDecimals = 0n, invert = true) => {
	const pool = new ethers.Contract(poolAddress, poolABI, provider);
	const { sqrtPriceX96 } = (await pool.slot0()) as { sqrtPriceX96: bigint };
	const price =
		Number(
			(sqrtPriceX96 ** 2n * 10n ** deltaDecimals * BigInt('1' + '0'.repeat(18))) / 2n ** 192n
		) / 1e18;
	return invert ? 1 / price : price;
};

export const ethUsdPool = '0xc31e54c7a869b9fcbecc14363cf510d1c41fa443';
export const kenshiPool = '0x68C685Fd52A56f04665b491D491355a624540e85';

export const getKenshiUSDPrice = async () => {
	const kenshiEthPrice = await getPrice(kenshiPool);
	const ethUsdPrice = await getPrice(ethUsdPool, 12n, false);
	const kenshiUsdPrice = kenshiEthPrice * ethUsdPrice;
	return kenshiUsdPrice;
};

export const getKenshiEthPrice = async () => {
	return await getPrice(kenshiPool);
};
