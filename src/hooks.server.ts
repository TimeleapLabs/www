import type { Handle } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

// Routes that should NOT redirect to home
const ALLOWED_PATHS = ["/", "/tos"];

export const handle: Handle = async ({ event, resolve }) => {
  const path = event.url.pathname;

  // Allow root and ToS
  if (ALLOWED_PATHS.includes(path)) {
    return resolve(event);
  }

  // Allow API routes
  if (path.startsWith("/api")) {
    return resolve(event);
  }

  // Allow static assets
  if (path.includes(".")) {
    return resolve(event);
  }

  // Redirect everything else to home
  throw redirect(307, "/");
};
