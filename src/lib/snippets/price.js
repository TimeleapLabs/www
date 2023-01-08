export const oracle = `import { ethers } from "ethers";
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
`;

export const contract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Price {
    event PriceRequest();
    event PriceRequestFulfilled(uint256 price);

    /**
     * Emit and event that will be picked up by the Kenshi
     * Oracle Network and sent to your oracle for processing
     */
    function requestPrice() external {
        emit PriceRequest();
    }

    /**
     * This method will be called by the Kenshi Oracle Network
     * with the result returned from your oracle
     */
    function setPrice(uint256 price) external {
        emit PriceRequestFulfilled(price);
    }
}
`;

export const price = { oracle, contract };
