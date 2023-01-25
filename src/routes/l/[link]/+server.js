import { redirect, error } from "@sveltejs/kit";
import links from "src/lib/links.js";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async (event) => {
  const { link } = event.params;
  if (!links[link]) {
    throw error(404, "Not found");
  }
  throw redirect(302, links[link]);
};
