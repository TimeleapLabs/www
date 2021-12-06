import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const uri = process.env["MONGODB_URI"];
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const connection = new MongoClient(uri, options);
const clientPromise = connection.connect();

export const getDB = async () => {
  const client = await clientPromise;
  return client.db(process.env["DB_NAME"]);
};
