import { fetchSupply } from "$lib/api/token";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async () => {
  const { circulating } = await fetchSupply();

  return {
    status: 200,
    body: circulating,
  };
};
