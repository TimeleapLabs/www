export const oracle = `import { ethers } from "ethers";
import fetch from "node-fetch";

export const handler = async ({ body }) => {
  const now = new Date();
  const { entry } = JSON.parse(body);
  // Solidity doesn't have floating point numbers;
  // We divide lat and long by 100 for 0.01 precision
  const lat = ethers.BigNumber.from(entry.event.args.lat).toNumber() / 100;
  const long = ethers.BigNumber.from(entry.event.args.long).toNumber() / 100;
  const url = \`https://api.brightsky.dev/weather?lat=$\{lat}&lon=$\{long}&date=$\{now.toISOString()}\`;
  const resp = await fetch(url);
  const { weather } = await resp.json();
  return {
    statusCode: 200,
    body: JSON.stringify({
      method: "setWeather",
      args: [
        entry.event.args.lat,
        entry.event.args.long,
        // Solidity doesn't have floating point numbers;
        // We multiply the temperature by 100 for 0.01 precision
        Math.round(weather[0].temperature * 100),
      ],
      maxGas: "100000000000000", // 0.0001 ETH
      abort: false,
    }),
  };
};
`;

export const contract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Weather {
    event WeatherRequest(uint256 lat, uint256 long);
    event WeatherRequestFulfilled(
        uint256 lat,
        uint256 long,
        uint256 temperature
    );

    /**
     * Emit and event that will be picked up by the Kenshi
     * Oracle Network and sent to your oracle for processing
     *
     * Note: Solidity doesn't have floating point numbers,
     * we assume lat and long are multiplied by 100 to elliminate
     * the decimal part of them
     */
    function requestWeather(uint256 lat, uint256 long) external {
        emit WeatherRequest(lat, long);
    }

    /**
     * This method will be called by the Kenshi Oracle Network
     * with the result returned from your oracle
     */
    function setWeather(
        uint256 lat,
        uint256 long,
        uint256 temperature
    ) external {
        emit WeatherRequestFulfilled(lat, long, temperature);
    }
}
`;

export const weather = { contract, oracle };
