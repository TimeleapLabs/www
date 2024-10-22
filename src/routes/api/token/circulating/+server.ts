import { fetchSupply } from '$lib/api/token';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const { circulating } = await fetchSupply();
	return new Response(circulating);
};
