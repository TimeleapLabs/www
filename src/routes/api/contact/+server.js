import { getDB } from "$lib/mongo";
import dotenv from "dotenv";
import { get } from "$lib/env";

dotenv.config();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
  const requestBody = await request.json();
  const { subject, body, topic, name, email, token } = requestBody;

  if (!subject || !body || !topic || !email || !name || !token) {
    return new Response("Missing arguments", { status: 401 });
  }

  const { RECAPTCHA_SECRET: secret } = await get();
  const captchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;
  const captchaReq = await fetch(captchaUrl, {
    method: "POST",
  });
  const captchaRes = await captchaReq.json();

  if (!captchaRes.success || captchaReq.score < 0.5) {
    return new Response("Verification failed", { status: 401 });
  }

  const db = await getDB();
  const collection = db.collection("contact-messages");

  const ip = request.headers.get("x-forwarded-for") || "localhost";
  const last = await collection.findOne({ ip }, { sort: { time: -1 } });

  if (last?.time && new Date() - last.time < 5000) {
    return new Response("Token expired", { status: 401 });
  }

  try {
    await collection.insertOne({
      name,
      email,
      topic,
      subject,
      body,
      ip,
      time: new Date(),
    });
    return new Response("OK");
  } catch (error) {
    return new Response("Internal error", { status: 500 });
  }
}
