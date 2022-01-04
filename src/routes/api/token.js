import abi from "$lib/abi/kenshi";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org"
);
const contractAddress = "0x8AdA51404F297bF2603912d1606340223c0a7784";
const contract = new ethers.Contract(contractAddress, abi, provider);

const fetchCirculatingSupply = async () => {
  const initialSupply = ethers.BigNumber.from(
    "10000000000000000000000000000000"
  );
  const totalBurned = await contract.getTotalBurned();
  const dexBalance = await contract.balanceOf(
    "0x65ef7833898c4a0df62bf150bbaba2718876adf3"
  );
  const contractBalance = await contract.balanceOf(
    "0x8AdA51404F297bF2603912d1606340223c0a7784"
  );

  const circulatingSupply = initialSupply
    .sub(totalBurned)
    .sub(dexBalance)
    .sub(contractBalance);

  return ethers.utils.formatUnits(circulatingSupply);
};

const main = async (filter) => {
  switch (filter) {
    case "priceUSD": {
      const data = await fetch(
        `https://api.pancakeswap.info/api/v2/tokens/${contractAddress}`
      );
      const response = await data.json();

      return response.data.price;
    }
    case "priceBNB": {
      const data = await fetch(
        `https://api.pancakeswap.info/api/v2/tokens/${contractAddress}`
      );
      const response = await data.json();

      return response.data["price_BNB"];
    }
    case "circulatingSupply": {
      return await fetchCirculatingSupply();
    }
    default: {
      const data = await fetch(
        `https://api.pancakeswap.info/api/v2/tokens/${contractAddress}`
      );
      const response = await data.json();

      return {
        priceUSD: response.data.price,
        priceBNB: response.data["price_BNB"],
        circulatingSupply: await fetchCirculatingSupply(),
      };
    }
  }
};

export const get = async (req) => {
  const param = req.query;
  const filter = param.get("filter");
  const data = await main(`${filter}`);

  return { body: data };
};
