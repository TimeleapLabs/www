import { getDB } from "$lib/mongo";
import dotenv from "dotenv";
import { ethers } from "ethers";
import abi from "$lib/abi/deployer";

dotenv.config();

const contractAddr = "0xC4f80aEffF6dAD28E0616E77C6D9ef66ac4d5Ef7";
const initialBlock = 14011261;
const kenshiLocker = "0xe570334989Fa3b77C6f1cFbc2D1909D4255bA1f6";

const sync = async () => {
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

  console.log({ fromBlock });

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
    { name: "lastLockerSyncedBlock" },
    { $set: { blockNumber: fromBlock + 2500 } },
    { upsert: true }
  );
};

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
  await sync().catch(() => {});

  const db = await getDB();
  const collection = db.collection("lockers");

  return {
    status: 200,
    body: [kenshiLocker, ...(await collection.distinct("address", {}))],
  };
}
