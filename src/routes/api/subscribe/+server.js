import dotenv from "dotenv";
import sg from "@sendgrid/client";

dotenv.config();
sg.setApiKey(process.env.SENDGRID_API_KEY);

const listIds = {
  hsm: "4656db07-16fe-4d22-ad4a-453ad15df40a",
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
