import abi from "$lib/abi/kenshi";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://arbitrum-one.publicnode.com"
);
const contractAddress = "0xf1264873436A0771E440E2b28072FAfcC5EEBd01";
const usdcAddress = "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d";
const ethUsdcPairAddress = "0xea26b78255df2bbc31c1ebf60010d78670185bd0";
const dexAddress = "0x28e276A456266E5576FFbc33868B9b30CB2AE2E3";
const ethAddress = "0x2170ed0880ac9a755fd29b2688956bd959f933f8";
const contract = new ethers.Contract(contractAddress, abi, provider);
const usdcContract = new ethers.Contract(usdcAddress, abi, provider);
const ethContract = new ethers.Contract(ethAddress, abi, provider);
const initialSupply = ethers.BigNumber.from("1000000000000000000000000000");
const reservedSupply = ethers.BigNumber.from("150000000000000000000000000");

export const fetchSupply = async () => {
  const circulatingSupply = initialSupply.sub(reservedSupply);

  return {
    circulating: ethers.utils.formatUnits(circulatingSupply),
    burned: "0",
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
