import { sync } from "$lib/blockchain/sync/balances";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET(request) {
  const { address } = request.params;

  await sync(address).catch(() => {});

  return new Response("OK");
}
