import abi from "$lib/abi/kenshi";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org"
);
const contractAddress = "0x8AdA51404F297bF2603912d1606340223c0a7784";
const dexAddress = "0x65ef7833898c4a0df62bf150bbaba2718876adf3";
const contract = new ethers.Contract(contractAddress, abi, provider);
const initialSupply = ethers.BigNumber.from("10000000000000000000000000000000");

export const fetchBurnAmount = async () => {
  return await contract.getTotalBurned();
};

export const fetchSupply = async () => {
  const totalBurned = await fetchBurnAmount();
  const dexBalance = await contract.balanceOf(dexAddress);
  const contractBalance = await contract.balanceOf(contractAddress);

  const circulatingSupply = initialSupply
    .sub(totalBurned)
    .sub(dexBalance)
    .sub(contractBalance);

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
