import { getKenshiEthPrice } from "$lib/uniswap";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
  const price = await getKenshiEthPrice();
  return new Response(price.toFixed(18));
};
