import { ethers } from "ethers";
import { sync as syncLockers } from "./lockers";
import { getDB } from "$lib/mongo";

const JSONRPC = "https://bsc-dataseed.binance.org/";
const initialBlock = 13623924;

export const sync = async (address) => {
  await syncLockers().catch(() => {});

  const db = await getDB();
  const collection = db.collection("walletTokens");
  const lockers = db.collection("lockers");
  const parameters = db.collection("walletTokensParameters");

  await collection.createIndex({ token: 1, address: 1 });
  await parameters.createIndex({ name: 1, address: 1 });

  const provider = new ethers.providers.JsonRpcProvider(JSONRPC);

  const lastSyncedBlock = await parameters.findOne({
    name: "lastSyncedBlock",
    address,
  });

  const lockerData = await lockers.findOne({ address });
  const { blockNumber = initialBlock } = lastSyncedBlock || lockerData || {};
  const currentBlock = await provider.getBlockNumber();

  const fromBlock =
    blockNumber + 2500 >= currentBlock ? currentBlock - 2500 : blockNumber;

  const topics = [
    ethers.utils.id("Transfer(address,address,uint256)"),
    null,
    ethers.utils.hexZeroPad(address, 32),
  ];

  const formatter = new ethers.providers.Formatter();

  const rawLogs = await provider.send("eth_getLogs", [
    {
      fromBlock: ethers.utils.hexlify(fromBlock - 100),
      toBlock: ethers.utils.hexlify(fromBlock + 2500),
      topics,
    },
  ]);

  const logs = rawLogs.map((log) => formatter.filterLog(log));
  const tokens = [...new Set(logs.map((log) => log.address))];

  for (const token of tokens) {
    await collection.updateOne(
      { token, address },
      { $setOnInsert: { token, address } },
      { upsert: true }
    );
  }

  await parameters.updateOne(
    { name: "lastSyncedBlock", address },
    { $set: { blockNumber: fromBlock + 2500 } },
    { upsert: true }
  );
};
