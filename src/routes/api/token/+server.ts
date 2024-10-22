import { fetchSupply } from '$lib/api/token';
import { fetchTokenPriceFromPair } from '$lib/api/token';
import { json, type RequestHandler } from '@sveltejs/kit';
import { getKenshiEthPrice } from '$lib/uniswap';

export const GET: RequestHandler = async () => {
	return json({
		...(await fetchSupply()),
		...(await fetchTokenPriceFromPair()),
		priceEth: await getKenshiEthPrice()
	});
};
