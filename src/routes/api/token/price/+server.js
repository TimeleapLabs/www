import { fetchTokenPriceFromPair } from "$lib/api/token";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
  const { price } = await fetchTokenPriceFromPair();
  return new Response(price);
};
