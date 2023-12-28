import { getUnchainedDbClient } from "$lib/unchained/db";
import { json } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
  const prisma = getUnchainedDbClient();

  const scores = await prisma.signer.findMany({
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
  });

  const signers = await prisma.signer.count();
  const points = await prisma.assetPrice.count();
  const validations = await prisma.signersOnAssetPrice.count();

  const twoDaysAgo = 2 * 7200;

  const prices = await prisma.assetPrice.findMany({
    orderBy: [{ block: "desc" }],
    take: twoDaysAgo,
    select: {
      price: true,
      block: true,
      _count: {
        select: { signersOnAssetPrice: true },
      },
    },
  });

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
