import { getExamples } from "$lib/api/examples";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async () => {
  const examples = await getExamples();
  return { status: 200, body: examples };
};
