import vercel from "@sveltejs/adapter-vercel";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
    adapter: vercel(),
  },
};

export default config;
