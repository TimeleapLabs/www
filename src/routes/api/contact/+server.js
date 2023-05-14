import dotenv from "dotenv";
import sg from "@sendgrid/mail";

dotenv.config();
sg.setApiKey(process.env.SENDGRID_API_KEY);

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
  const requestBody = await request.json();
  const { subject, body, topic, name, email, token } = requestBody;

  if (!subject || !body || !topic || !email || !name || !token) {
    return new Response("Missing arguments", { status: 401 });
  }

  const secret = process.env.RECAPTCHA_SECRET;
  const captchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;
  const captchaReq = await fetch(captchaUrl, { method: "POST" });
  const captchaRes = await captchaReq.json();

  if (!captchaRes.success || captchaReq.score < 0.5) {
    return new Response("Verification failed", { status: 401 });
  }

  const msg = {
    to: "contact@kenshi.io",
    from: "noreply@kenshi.io",
    subject,
    text: `\
      Subject: ${subject}
      Body: ${body}
      Topic: ${topic}
      Name: ${name}
      Email: ${email}
    `,
    html: `\
      <strong>Subject<Subject>: <p>${subject}</p>
      <strong>Body<Body>: <p>${body}</p>
      <strong>Topic<Topic>: <p>${topic}</p>
      <strong>Name<Name>: <p>${name}</p>
      <strong>Email<Email>: <p>${email}</p>
    `,
  };

  await sg.send(msg);
  return new Response("OK");
}
