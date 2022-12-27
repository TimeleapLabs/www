import { ethers } from "ethers";
import fetch from "node-fetch";

export const handler = async ({ body }) => {
  const now = new Date();
  const { entry } = JSON.parse(body);
  // Solidity doesn't have floating point numbers;
  // We divide lat and long by 100 for 0.01 precision
  const lat = ethers.BigNumber.from(entry.event.args.lat).toNumber() / 100;
  const long = ethers.BigNumber.from(entry.event.args.long).toNumber() / 100;
  const url = `https://api.brightsky.dev/weather?lat=${lat}&lon=${long}&date=${now.toISOString()}`;
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
