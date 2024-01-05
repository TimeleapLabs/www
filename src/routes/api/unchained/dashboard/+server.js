import { getUnchainedDbClient } from "$lib/unchained/db";
import { json } from "@sveltejs/kit";

const cache = new Map();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
  const prisma = getUnchainedDbClient();

  const scores =
    cache.get("scores") ||
    (await prisma.signer.findMany({
      select: {
        id: true,
        name: true,
        key: true,
        _count: {
          select: {
            signersOnAssetPrice: true,
          },
        },
      },
    }));

  cache.set("scores", scores);

  const signers = cache.get("signers") || (await prisma.signer.count());
  const points = cache.get("points") || (await prisma.assetPrice.count());
  const validations =
    cache.get("validations") || (await prisma.signersOnAssetPrice.count());

  cache.set("signers", signers);
  cache.set("points", points);
  cache.set("validations", validations);

  const twoDaysAgo = 2 * 7200;

  const prices =
    cache.get("prices") ||
    (await prisma.assetPrice.findMany({
      orderBy: [{ block: "desc" }],
      take: twoDaysAgo,
      select: {
        price: true,
        block: true,
        _count: {
          select: { signersOnAssetPrice: true },
        },
      },
    }));

  cache.set("prices", prices);

  return json({
    scores: scores.map((score) => ({
      id: score.id,
      name: score.name,
      key: score.key,
      score: score._count.signersOnAssetPrice,
    })),
    prices: prices.map((price) => ({
      price: price.price,
      block: price.block,
      signers: price._count.signersOnAssetPrice,
    })),
    stats: {
      signers,
      points,
      validations,
    },
  });
}
