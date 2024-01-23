import { getUnchainedDbClient } from "$lib/unchained/db";
import { json } from "@sveltejs/kit";
import { Base58 } from "base-ex";

const encoder = new Base58("bitcoin");

const cache = new Map();
let currentSprint;

const count = async (prisma, table) => {
  const [{ estimate }] = await prisma.$queryRaw`
      SELECT reltuples AS estimate
        FROM pg_class
        WHERE oid = ${table}::regclass;`;
  return estimate;
};

const encode = (input) => {
  if (!input) {
    return "N/A";
  }
  return encoder.encode(input);
};

const getSigners = async (prisma, sprint) => {
  if (sprint === currentSprint) {
    return cache.get("signers");
  }

  const rawSigners = await prisma.signer.findMany({
    select: { id: true, name: true, key: true, points: true },
  });

  const signers = rawSigners.map((signer) => ({
    ...signer,
    key: encode(signer.key),
  }));

  cache.set("signers", signers);

  return signers;
};

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
  const prisma = getUnchainedDbClient();
  const sprint = Math.ceil(new Date().valueOf() / 300000);

  const signers = await getSigners(prisma, sprint);

  const datapoints =
    cache.get("datapoints") || (await count(prisma, '"AssetPrice"'));
  cache.set("datapoints", datapoints);

  const validations =
    cache.get("validations") || (await count(prisma, '"SignersOnAssetPrice"'));
  cache.set("validations", validations);

  const lastEightHours = 2400;

  const prices =
    sprint === currentSprint
      ? cache.get("prices")
      : await prisma.assetPrice.findMany({
          orderBy: [{ block: "desc" }],
          take: lastEightHours,
          select: {
            price: true,
            block: true,
            _count: {
              select: { signersOnAssetPrice: true },
            },
          },
        });

  cache.set("prices", prices);

  currentSprint = sprint;

  return json({
    signers,
    prices: prices.map((price) => ({
      price: price.price,
      block: price.block,
      signers: price._count.signersOnAssetPrice,
    })),
    stats: {
      datapoints,
      validations,
    },
  });
}
