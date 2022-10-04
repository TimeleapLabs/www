import { fetchSupply } from "$lib/api/token";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
  const { circulating } = await fetchSupply();
  return new Response(circulating);
};
