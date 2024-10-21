import { fetchTokenPriceFromPair } from '$lib/api/token';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const { price } = await fetchTokenPriceFromPair();
	return new Response(price.toString());
};
