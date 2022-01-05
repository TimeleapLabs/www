import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const uri = process.env["MONGODB_URI"];
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const connect = async (retries = 5) => {
  while (retries--) {
    try {
      const connection = new MongoClient(uri, options);
      const client = await connection.connect();
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
