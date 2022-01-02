import { getDB } from "$lib/mongo";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env["RECAPTCHA_SECRET"];

console.log({ secret });

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {
  const { subject, body, topic, name, email, token } = request.body;

  if (!subject || !body || !topic || !email || !name || !token) {
    return { status: 401 };
  }

  const captchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;
  const captchaReq = await fetch(captchaUrl, {
    method: "POST",
  });
  const captchaRes = await captchaReq.json();

  if (!captchaRes.success || captchaReq.score < 0.5) {
    return { status: 401 };
  }

  const db = await getDB();
  const collection = db.collection("contact-messages");

  const ip = request.headers["x-forwarded-for"] || "localhost";
  const last = await collection.findOne({ ip }, { sort: { time: -1 } });

  if (last?.time && new Date() - last.time < 5000) {
    return { status: 401 };
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
    return { status: 200 };
  } catch (error) {
    return { status: 500 };
  }
}
