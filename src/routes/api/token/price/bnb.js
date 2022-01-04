import { fetchPancake } from "$lib/api/token";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async () => {
  const { price_BNB: price } = await fetchPancake();
  return {
    status: 200,
    body: price,
  };
};
