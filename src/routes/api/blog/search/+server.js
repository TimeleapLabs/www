import { json } from "@sveltejs/kit";
import docPages from "src/lib/blog.search.js";

const getScore = (re) => (page) => ({
  ...page,
  score: page.text.match(re)?.length || 0,
});

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async (event) => {
  const q = event.url.searchParams.get("q");
  if (!q || q.length < 3) {
    return json([]);
  }
  const re = new RegExp(q, "gi");
  const found = docPages
    .map(getScore(re))
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .filter((page) => page.score > 0);
  return json(found);
};
