import { ethers } from "ethers";

const abi = ["function balanceOf(address) view returns (uint)"];

export const handler = async ({ body }) => {
  const { entry } = JSON.parse(body);
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_ADDR);
  const contract = new ethers.Contract(entry.event.args.token, abi, provider);
  const balance = await contract.balanceOf(entry.event.args.user);
  return {
    statusCode: 200,
    body: JSON.stringify({
      method: "setBalance",
      args: [balance.toString()],
      maxGas: "100000000000000", // 0.0001 ETH
      abort: false,
    }),
  };
};
