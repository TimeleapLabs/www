import { fetchPancake } from "$lib/api/token";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
  const { price_BNB: price } = await fetchPancake();
  return new Response(price);
};
