import { getUnchainedDbClient } from "$lib/unchained/db";
import { json } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
  const client = await getUnchainedDbClient();
  const db = client.db("unchained");
  const collection = db.collection("assetPrices");

  //const data = await collection.find({ block: { $gt } }).limit(2500).toArray();

  const scores = await collection
    .aggregate([
      { $unwind: "$signers" },
      { $group: { _id: "$signers", count: { $sum: 1 } } },
    ])
    .toArray();

  const hoursAgo24 = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  const hoursAgo48 = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);

  const activity = await collection
    .aggregate([
      { $match: { timestamp: { $gte: hoursAgo24 } } },
      { $project: { signersLength: { $size: "$signers" } } },
      {
        $group: {
          _id: null,
          max: { $max: "$signersLength" },
          average: { $avg: "$signersLength" },
        },
      },
    ])
    .toArray();

  const validations = await collection
    .aggregate([
      { $match: { timestamp: { $gte: hoursAgo24 } } },
      { $project: { signersLength: { $size: "$signers" } } },
      { $group: { _id: null, total: { $sum: "$signersLength" } } },
    ])
    .toArray();

  const uniquePeers = await collection
    .aggregate([
      { $match: { timestamp: { $gte: hoursAgo24 } } },
      { $unwind: "$signers" },
      { $group: { _id: "$signers" } },
      { $group: { _id: null, count: { $sum: 1 } } },
    ])
    .toArray();

  const points = await collection
    .aggregate([
      { $match: { timestamp: { $gte: hoursAgo24 } } },
      { $group: { _id: null, count: { $sum: 1 } } },
    ])
    .toArray();

  const data = await collection
    .aggregate([
      { $match: { timestamp: { $gte: hoursAgo48 } } },
      {
        $project: {
          validations: { $size: "$signers" },
          block: 1,
          timestamp: 1,
          price: 1,
        },
      },
    ])
    .toArray();

  return json({
    scores,
    activity: activity.pop(),
    peers: uniquePeers.pop().count,
    points: points.pop().count,
    validations: validations.pop().total,
    data,
  });
}
