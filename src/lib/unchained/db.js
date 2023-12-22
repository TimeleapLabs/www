import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

export let db;
export let client;

export const getUnchainedDbClient = async () => {
  if (!client) {
    client = new MongoClient(process.env.UNCHAINED_MONGO, {
      compressors: ["zstd"],
    });
    await client.connect();
  }
  return client;
};
