import { getKenshiEthPrice } from '$lib/uniswap';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const price = await getKenshiEthPrice();
	return new Response(price.toFixed(18));
};
