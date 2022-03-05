import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { get } from "./env";

dotenv.config();

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let cachedClient;

const connect = async (retries = 5) => {
  if (cachedClient) {
    return cachedClient;
  }
  while (retries--) {
    try {
      const { MONGODB_URI: uri } = await get();
      const connection = new MongoClient(uri, options);
      const client = await connection.connect();
      cachedClient = client;
      return client;
    } catch (error) {
      if (!retries) {
        throw error;
      }
    }
  }
};

export const getDB = async () => {
  const client = await connect();
  const { DB_NAME: dbName } = await get();
  return client.db(dbName);
};
