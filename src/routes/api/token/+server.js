import { fetchSupply } from "$lib/api/token";
import { fetchTokenPriceFromPair } from "$lib/api/token";
import { json } from "@sveltejs/kit";
import { getKenshiEthPrice } from "$lib/uniswap";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
  return json({
    ...(await fetchSupply()),
    ...(await fetchTokenPriceFromPair()),
    priceEth: await getKenshiEthPrice(),
  });
};
