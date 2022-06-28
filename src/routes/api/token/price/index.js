import { fetchTokenPriceFromPair } from "$lib/api/token";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async () => {
  const { price } = await fetchTokenPriceFromPair();
  return {
    status: 200,
    body: price,
  };
};
