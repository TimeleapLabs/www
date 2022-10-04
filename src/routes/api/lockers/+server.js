import { getDB } from "$lib/mongo";
import { sync } from "$lib/blockchain/sync/lockers";
import { json } from "@sveltejs/kit";

import dotenv from "dotenv";

dotenv.config();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
  await sync().catch(() => {});

  const db = await getDB();
  const collection = db.collection("lockers");

  return json(await collection.distinct("address", {}));
}
