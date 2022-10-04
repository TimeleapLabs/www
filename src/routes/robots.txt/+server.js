const body = `\
User-agent: *
Allow: /
Sitemap: https://kenshi.io/sitemap.xml`;

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = () => {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
