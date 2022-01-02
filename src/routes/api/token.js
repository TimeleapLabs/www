import abi from "$lib/abi/kenshi";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org"
);
const contractAddress = "0x8AdA51404F297bF2603912d1606340223c0a7784";
const contract = new ethers.Contract(contractAddress, abi, provider);
const fetchCirculatingSupply = async (data) => {
  data.initialSupply = "10000000000000.0";
  await contract
    .getTotalBurned()
    .then((r) => (data.totalBurned = ethers.utils.formatUnits(r)));
  await contract
    .balanceOf("0x65ef7833898c4a0df62bf150bbaba2718876adf3")
    .then((r) => (data.dexBalance = ethers.utils.formatUnits(r)));
  await contract
    .balanceOf("0x8AdA51404F297bF2603912d1606340223c0a7784")
    .then((r) => (data.contractBalance = ethers.utils.formatUnits(r)));
  data.circulatingSupply = (
    data.initialSupply -
    data.totalBurned -
    data.dexBalance -
    data.contractBalance
  ).toString();
};
const main = async (filter) => {
  const data = {};
  switch (filter) {
    case "priceUSD":
      await fetch(
        `https://api.pancakeswap.info/api/v2/tokens/${contractAddress}`
      )
        .then((r) => r.json())
        .then((resData) => (data.priceUSD = resData.data.price));
      break;
    case "priceBNB":
      await fetch(
        `https://api.pancakeswap.info/api/v2/tokens/${contractAddress}`
      )
        .then((r) => r.json())
        .then((resData) => (data.priceBNB = resData.data["price_BNB"]));
      break;
    case "circulatingSupply":
      await fetchCirculatingSupply(data);
      break;
    default:
      await fetch(
        `https://api.pancakeswap.info/api/v2/tokens/${contractAddress}`
      )
        .then((r) => r.json())
        .then((resData) => {
          data.price = resData.data.price;
          data.priceBNB = resData.data["price_BNB"];
        });
      await fetchCirculatingSupply(data);
  }
  return data;
};
export const get = async (req) => {
  const param = req.query;
  const filter = param.get("filter");
  if (param.has("filter")) {
    const data = await main(`${filter}`).then((r) => r);
    return { body: data[filter] };
  } else {
    const data = await main().then((r) => r);
    return { body: data };
  }
};
