import { getExamples } from "$lib/api/examples";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ url }) => {
  try {
    const tags = url.searchParams.get("tags");
    const tagsArray = tags ? tags.split(",") : null;
    const examples = await getExamples(tagsArray);
    return { status: 200, body: examples };
  } catch (error) {
    return { status: 400, body: { error: error.message } };
  }
};
