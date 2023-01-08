export const oracle = `import { ethers } from "ethers";

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
      args: [entry.event.args.user, entry.event.args.token, balance.toString()],
      maxGas: "100000000000000", // 0.0001 ETH
      abort: false,
    }),
  };
};
`;

export const contract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Balance {
    event BalanceRequest(address user, address token);
    event BalanceRequestFulfilled(address user, address token, uint256 balance);

    /**
     * Emit and event that will be picked up by the Kenshi
     * Oracle Network and sent to your oracle for processing
     */
    function requestBalance(address user, address token) external {
        emit BalanceRequest(user, token);
    }

    /**
     * This method will be called by the Kenshi Oracle Network
     * with the result returned from your oracle
     */
    function setBalance(
        address user,
        address token,
        uint256 balance
    ) external {
        emit BalanceRequestFulfilled(user, token, balance);
    }
}
`;

export const balance = { contract, oracle };
