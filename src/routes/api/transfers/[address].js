import { getDB } from "$lib/mongo";
import dotenv from "dotenv";
import { ethers } from "ethers";
import abi from "$lib/abi/kenshi";

dotenv.config();

const kenshiAddr = "0x8AdA51404F297bF2603912d1606340223c0a7784";
const initialBlock = 13623924;

const sync = async () => {
  const db = await getDB();
  const collection = db.collection("transfers");
  const parameters = db.collection("parameters");

  const provider = new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed.binance.org/"
  );

  const lastSyncedBlock = await parameters.findOne({ name: "lastSyncedBlock" });
  const { blockNumber = initialBlock } = lastSyncedBlock || {};
  const currentBlock = await provider.getBlockNumber();

  const fromBlock =
    blockNumber + 2500 >= currentBlock ? currentBlock - 2500 : blockNumber;

  const contract = new ethers.Contract(kenshiAddr, abi, provider);
  const filter = contract.filters.Transfer();
  const events = await contract.queryFilter(
    filter,
    fromBlock - 100,
    fromBlock + 2500
  );

  const transfers = events.map((event) => {
    return {
      from: event.args[0],
      to: event.args[1],
      amount: ethers.BigNumber.from(event.args[2]).toString(),
      blockNumber: event.blockNumber,
      hash: event.transactionHash,
      blockHash: event.blockHash,
      transactionHash: event.transactionHash,
      logIndex: event.logIndex,
      transactionIndex: event.transactionIndex,
    };
  });

  for (const transfer of transfers) {
    await collection.updateOne(
      transfer,
      { $setOnInsert: transfer },
      { upsert: true }
    );
  }

  await parameters.updateOne(
    { name: "lastSyncedBlock" },
    { $set: { blockNumber: fromBlock + 2500 } },
    { upsert: true }
  );
};

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(request) {
  const { address } = request.params;

  await sync().catch(() => {});

  const db = await getDB();
  const collection = db.collection("transfers");

  return {
    status: 200,
    body: await collection
      .find({
        $or: [{ from: address }, { to: address }],
      })
      .toArray(),
  };
}
