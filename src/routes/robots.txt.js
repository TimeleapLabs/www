const body = `\
User-agent: *
Allow: /
Sitemap: https://kenshi.io/sitemap.xml`;

export async function get() {
  return {
    headers: {
      "Content-Type": "text/plain",
    },
    body,
  };
}
