import { getTags } from "$lib/api/examples";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async () => {
  try {
    const tags = await getTags();
    return { status: 200, body: tags };
  } catch (error) {
    return { status: 400, body: { error: error.message } };
  }
};
