import dotenv from "dotenv";
import sg from "@sendgrid/client";

dotenv.config();
sg.setApiKey(process.env.SENDGRID_API_KEY);

const listIds = {
  hsm: "4656db07-16fe-4d22-ad4a-453ad15df40a",
  newsletter: "2d65d30a-d6be-48c0-925a-5d4eb8959a06",
  baas: "db91464e-8500-4612-8dd7-7429a33b57f3",
  ghostfs: "7ef760b6-928c-45d2-9768-986636f4891d",
  wallet: "0dff84df-a1b5-412c-bd75-06fde5b4ac41",
  unchained: "b5574f0c-cb5f-451b-b200-9330c1217701",
};

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
  const requestBody = await request.json();
  const { topic, email, token } = requestBody;

  if (!topic || !email || !token) {
    return new Response("Missing arguments", { status: 401 });
  }

  if (!listIds[topic]) {
    return new Response("Missing arguments", { status: 401 });
  }

  const secret = process.env.RECAPTCHA_SECRET;
  const captchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;
  const captchaReq = await fetch(captchaUrl, { method: "POST" });
  const captchaRes = await captchaReq.json();

  if (!captchaRes.success || captchaRes.score < 0.5) {
    return new Response("Verification failed", { status: 401 });
  }

  const data = {
    list_ids: [listIds[topic]],
    contacts: [{ email }],
  };

  const sgRequest = {
    url: `/v3/marketing/contacts`,
    method: "PUT",
    body: data,
  };

  await sg.request(sgRequest);
  return new Response("OK");
}
