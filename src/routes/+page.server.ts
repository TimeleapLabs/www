import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { TIMELEAP_API_URL, WAITLIST_API_KEY } from "$env/static/private";

const API_BASE = TIMELEAP_API_URL || "https://api.timeleap.swiss";

// Email validation regex
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const load: PageServerLoad = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/waitlist/count`, {
      headers: { "x-waitlist-key": WAITLIST_API_KEY || "" },
    });
    const result = await res.json();

    return {
      waitlistCount: result.success ? result.data.count : 0,
    };
  } catch {
    return {
      waitlistCount: 0,
    };
  }
};

export const actions: Actions = {
  signup: async ({ request }) => {
    const data = await request.formData();
    const email = data.get("email")?.toString().trim().toLowerCase();

    // Validate email
    if (!email) {
      return fail(400, { error: "Please enter an email address", email: "" });
    }

    if (!isValidEmail(email)) {
      return fail(400, { error: "Please enter a valid email address", email });
    }

    try {
      // Call API with token
      const res = await fetch(`${API_BASE}/api/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-waitlist-key": WAITLIST_API_KEY || "",
        },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (!result.success) {
        return fail(400, {
          error: result.error?.message || "Something went wrong",
          email,
        });
      }

      return { success: true, position: result.data.position };
    } catch {
      return fail(500, { error: "Failed to connect. Please try again.", email });
    }
  },
};
