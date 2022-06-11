import { fetchSupply, fetchPancake } from "$lib/api/token";
import { fetchTokenPriceFromPair } from "$lib/api/token";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async () => {
  return {
    status: 200,
    body: {
      ...(await fetchPancake()),
      ...(await fetchSupply()),
      ...(await fetchTokenPriceFromPair()),
    },
  };
};
