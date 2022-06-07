import abi from "$lib/abi/kenshi";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org"
);
const contractAddress = "0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f";
const dexAddress = "0xc5049f99e1efc3c83a2cd3f9ef1842530986fb88";
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
