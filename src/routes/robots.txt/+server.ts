import type { RequestHandler } from '@sveltejs/kit';

const body = `\
User-agent: *
Allow: /
Sitemap: https://timeleap.swiss/sitemap.xml`;

export const GET: RequestHandler = () => {
	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
};
