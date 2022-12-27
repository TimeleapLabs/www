import { ethers } from "ethers";
import fetch from "node-fetch";

const url =
  "https://api.coingecko.com/api/v3/coins/kenshi/market_chart?vs_currency=usd&days=1";

export const handler = async () => {
  const resp = await fetch(url);
  const { prices } = await resp.json();
  const average =
    prices
      .slice(-6) // last 30 minutes
      .map(([_, price]) => price)
      .reduce((a, b) => a + b) / 6;
  return {
    statusCode: 200,
    body: JSON.stringify({
      method: "setPrice",
      args: [ethers.utils.parseUnits(average.toFixed(18)).toString()],
      maxGas: "100000000000000", // 0.0001 ETH
      abort: false,
    }),
  };
};
