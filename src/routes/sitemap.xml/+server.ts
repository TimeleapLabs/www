import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	const staticPages = Object.keys(import.meta.glob('/src/routes/**/!(_)*.svelte'))
		.filter((page) => {
			const filters = [']', '+layout', '+error', '/src/routes/index.svelte'];
			return !filters.find((filter) => page.includes(filter));
		})
		.map((page) => {
			return page
				.replace('/src/routes', 'https://timeleap.swiss')
				.replace('/+page.svelte', '')
				.replace('.svelte', '');
		});

	const body = render(staticPages);

	const headers = {
		'Cache-Control': `max-age=0, s-max-age=${600}`,
		'Content-Type': 'application/xml'
	};

	return new Response(body, {
		headers
	});
};

const render = (staticPages: string[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${staticPages
	.map(
		(staticPage) => `
  <url>
    <loc>${staticPage}</loc>
    <lastmod>${import.meta.env.VITE_BUILD_DATE}</lastmod>
    <changefreq>weekly</changefreq>
  </url>
`
	)
	.join('')}
</urlset>
`;
