import { getDB } from "$lib/mongo";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {
  const { subject, body, topic, name, email } = request.body;

  if (!subject || !body || !topic || !email || !name) {
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
