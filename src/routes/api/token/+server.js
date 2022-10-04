import { fetchSupply, fetchPancake } from "$lib/api/token";
import { fetchTokenPriceFromPair } from "$lib/api/token";
import { json } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
  return json({
    ...(await fetchPancake()),
    ...(await fetchSupply()),
    ...(await fetchTokenPriceFromPair()),
  });
};
