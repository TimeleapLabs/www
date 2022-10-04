import { json } from "@sveltejs/kit";
import { getDB } from "$lib/mongo";
import dotenv from "dotenv";

dotenv.config();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET(request) {
  const { address } = request.params;

  const db = await getDB();
  const walletTokens = db.collection("walletTokens");
  const lockersCollection = db.collection("lockers");

  const wallets = await walletTokens.find({ token: address }).toArray();
  const lockers = [];

  for (const { address } of wallets) {
    const isKenshiLocker = await lockersCollection.findOne({ address });
    if (isKenshiLocker) {
      lockers.push(address);
    }
  }

  return json(lockers);
}
