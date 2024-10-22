import sg from '@sendgrid/mail';
import { SENDGRID_API_KEY, RECAPTCHA_SECRET } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';

sg.setApiKey(SENDGRID_API_KEY);

export const POST: RequestHandler = async ({ request }) => {
	const requestBody = await request.json();
	const { subject, body, topic, name, email, token } = requestBody;

	if (!subject || !body || !topic || !email || !name || !token) {
		return new Response('Missing arguments', { status: 401 });
	}

	const captchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${token}`;
	const captchaReq = await fetch(captchaUrl, { method: 'POST' });
	const captchaRes = await captchaReq.json();

	if (!captchaRes.success || captchaRes.score < 0.5) {
		return new Response('Verification failed', { status: 401 });
	}

	const msg = {
		to: 'inquiries@timeleap.swiss',
		from: 'noreply@timeleap.swiss',
		subject,
		text: [
			`Subject: ${subject}`,
			`Topic: ${topic}`,
			`Name: ${name}`,
			`Email: ${email}`,
			'Body:',
			'',
			body
		].join('\n')
	};

	await sg.send(msg);
	return new Response('OK');
};
