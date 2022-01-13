import { sync } from "$lib/blockchain/sync/balances";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(request) {
  const { address } = request.params;

  await sync(address).catch(() => {});

  return {
    status: 200,
    body: "OK",
  };
}
