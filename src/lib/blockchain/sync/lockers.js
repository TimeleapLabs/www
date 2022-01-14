import { ethers } from "ethers";
import abi from "$lib/abi/deployer";
import { getDB } from "$lib/mongo";

const contractAddr = "0xC4f80aEffF6dAD28E0616E77C6D9ef66ac4d5Ef7";
const initialBlock = 14011261;

export const sync = async () => {
  const db = await getDB();
  const collection = db.collection("lockers");
  const parameters = db.collection("parameters");

  const provider = new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed.binance.org/"
  );

  const lastSyncedBlock = await parameters.findOne({
    name: "lastLockerSyncedBlock",
  });
  const { blockNumber = initialBlock } = lastSyncedBlock || {};
  const currentBlock = await provider.getBlockNumber();

  const fromBlock =
    blockNumber + 2500 >= currentBlock ? currentBlock - 2500 : blockNumber;

  const contract = new ethers.Contract(contractAddr, abi, provider);
  const filter = contract.filters.LockerCreated();
  const events = await contract.queryFilter(
    filter,
    fromBlock - 100,
    fromBlock + 2500
  );

  const lockers = events.map((event) => {
    return {
      address: event.args[0],
      blockNumber: event.blockNumber,
      hash: event.transactionHash,
      blockHash: event.blockHash,
      transactionHash: event.transactionHash,
      logIndex: event.logIndex,
      transactionIndex: event.transactionIndex,
    };
  });

  for (const locker of lockers) {
    await collection.updateOne(
      locker,
      { $setOnInsert: locker },
      { upsert: true }
    );
  }

  await parameters.updateOne(
    {
      name: "lastLockerSyncedBlock",
      $or: [{ blockNumber }, { blockNumber: { $exists: false } }],
    },
    { $set: { blockNumber: fromBlock + 2500 } },
    { upsert: true }
  );
};
