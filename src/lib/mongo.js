import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const uri = process.env["MONGODB_URI"];
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
  return client.db(process.env["DB_NAME"]);
};
