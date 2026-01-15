import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

const ALLOWED_PATHS = ['/', '/tos'];

export const load: LayoutServerLoad = async ({ url }) => {
  const path = url.pathname;

  // Allow specific paths
  if (ALLOWED_PATHS.includes(path)) {
    return;
  }

  // Allow API routes
  if (path.startsWith('/api')) {
    return;
  }

  // Allow static assets
  if (path.includes('.')) {
    return;
  }

  // Redirect everything else to home
  throw redirect(307, '/');
};
