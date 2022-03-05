/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async (request) => {
  const src = request.url.searchParams.get("src");
  const response = await fetch(src);
  const body = await response.text();
  return { status: 200, body };
};
