import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://arbitrum.blockpi.network/v1/rpc/public"
);

const poolABI = [
  `  function slot0(
        ) external view returns
        (uint160 sqrtPriceX96,
        int24 tick,
        uint16 observationIndex,
        uint16 observationCardinality,
        uint16 observationCardinalityNext,
        uint8 feeProtocol,
        bool unlocked)`,
];

const getPrice = async (poolAddress, deltaDecimals = 0n, invert = true) => {
  const pool = new ethers.Contract(poolAddress, poolABI, provider);
  const { sqrtPriceX96 } = await pool.slot0();
  const price =
    Number(
      sqrtPriceX96
        .pow(2)
        .mul(10n ** deltaDecimals)
        .mul("1" + "0".repeat(18))
        .div(ethers.BigNumber.from(2).pow(192))
        .toString()
    ) / 1e18;
  return invert ? 1 / price : price;
};

export const ethUsdPool = "0xc31e54c7a869b9fcbecc14363cf510d1c41fa443";
export const kenshiPool = "0x68C685Fd52A56f04665b491D491355a624540e85";

export const getKenshiUSDPrice = async () => {
  const kenshiEthPrice = await getPrice(kenshiPool);
  const ethUsdPrice = await getPrice(ethUsdPool, 12n, false);
  const kenshiUsdPrice = kenshiEthPrice * ethUsdPrice;
  return kenshiUsdPrice;
};

export const getKenshiEthPrice = async () => {
  return await getPrice(kenshiPool);
};
