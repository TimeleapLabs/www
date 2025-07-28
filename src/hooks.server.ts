import type { Handle } from '@sveltejs/kit';
import { redirects } from '$lib/redirects';

export const handle: Handle = async ({ event, resolve }) => {
	if (redirects[event.url.pathname]) {
		return Response.redirect(new URL(redirects[event.url.pathname], event.url), 308);
	}

	const response = await resolve(event);
	return response;
};
