import { fetchSupply } from "$lib/api/token";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
  const { burned } = await fetchSupply();

  return new Response(burned);
};
