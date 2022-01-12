import { getDB } from "$lib/mongo";
import { sync } from "$lib/blockchain/sync/lockers";

import dotenv from "dotenv";

dotenv.config();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
  await sync().catch(() => {});

  const db = await getDB();
  const collection = db.collection("lockers");

  return {
    status: 200,
    body: await collection.distinct("address", {}),
  };
}
