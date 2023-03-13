import abi from "$lib/abi/kenshi";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org"
);
const contractAddress = "0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f";
const usdcAddress = "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d";
const ethUsdcPairAddress = "0xea26b78255df2bbc31c1ebf60010d78670185bd0";
const dexAddress = "0x28e276A456266E5576FFbc33868B9b30CB2AE2E3";
const ethAddress = "0x2170ed0880ac9a755fd29b2688956bd959f933f8";
const contract = new ethers.Contract(contractAddress, abi, provider);
const usdcContract = new ethers.Contract(usdcAddress, abi, provider);
const ethContract = new ethers.Contract(ethAddress, abi, provider);
const initialSupply = ethers.BigNumber.from("10000000000000000000000000000000");

export const fetchBurnAmount = async () => {
  return await contract.getTotalBurned();
};

export const fetchSupply = async () => {
  const totalBurned = await fetchBurnAmount();
  const circulatingSupply = initialSupply.sub(totalBurned);

  return {
    circulating: ethers.utils.formatUnits(circulatingSupply),
    burned: ethers.utils.formatUnits(totalBurned),
  };
};

export const fetchPancake = async () => {
  const req = await fetch(
    `https://api.pancakeswap.info/api/v2/tokens/${contractAddress}`
  );
  const res = await req.json();
  return res?.data || {};
};

const fetchEthPriceFromPair = async () => {
  const usdcBalance = await usdcContract.balanceOf(ethUsdcPairAddress);
  const ethBalance = await ethContract.balanceOf(ethUsdcPairAddress);
  return usdcBalance.mul("1000000000").div(ethBalance).toNumber() / 1000000000;
};

export const fetchTokenPriceFromPair = async () => {
  const ethBalance = await ethContract.balanceOf(dexAddress);
  const kenshiBalance = await contract.balanceOf(dexAddress);
  const priceInEth =
    ethBalance.mul("1000000000000000").div(kenshiBalance).toNumber() /
    1000000000000000;
  const ethPrice = await fetchEthPriceFromPair();
  const price = priceInEth * ethPrice;
  return {
    price: price.toFixed(15),
  };
};
