import abi from "$lib/abi/kenshi";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org"
);
const contractAddress = "0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f";
const busdAddress = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
const dexAddress = "0xc5049f99e1efc3c83a2cd3f9ef1842530986fb88";
const contract = new ethers.Contract(contractAddress, abi, provider);
const busdContract = new ethers.Contract(busdAddress, abi, provider);
const initialSupply = ethers.BigNumber.from("10000000000000000000000000000000");

export const fetchBurnAmount = async () => {
  return await contract.getTotalBurned();
};

export const fetchSupply = async () => {
  const totalBurned = await fetchBurnAmount();
  const contractBalance = await contract.balanceOf(contractAddress);

  const circulatingSupply = initialSupply.sub(totalBurned).sub(contractBalance);

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

export const fetchTokenPriceFromPair = async () => {
  const busdBalance = await busdContract.balanceOf(dexAddress);
  const kenshiBalance = await contract.balanceOf(dexAddress);
  const price =
    busdBalance.mul("1000000000000000").div(kenshiBalance).toNumber() /
    1000000000000000;
  return {
    price: price.toFixed(15),
  };
};
