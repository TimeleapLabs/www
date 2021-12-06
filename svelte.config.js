import vercel from "@sveltejs/adapter-vercel";
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
    adapter: vercel(),
    vite: {
      resolve: {
        alias: {
          src: path.resolve("./src"),
        },
      },
    },
  },
};

export default config;
