import { generateSocial } from '$lib/seo/social';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (request) => {
	const text = request.url.searchParams.get('text') || '';
	const fontSize = request.url.searchParams.get('fontSize') || '24';
	const dy = request.url.searchParams.get('dy') || '80';
	const image = await generateSocial(text, Number(fontSize), Number(dy));
	request.setHeaders({ 'Content-Type': 'image/png' });
	request.setHeaders({ 'Content-Length': image.length.toString() });
	return new Response(image);
};
