import { RECAPTCHA_SECRET } from '$env/static/private';
import { addFeedback, getFeedback } from '$lib/feedback';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

const validFeedbacks = ['fire', 'thumbsDown', 'rockOn', 'party', 'heart', 'starStruck'];
const lastUserFeedback = new Map<string, number>();
const RATE_LIMIT = 30 * 1000; // 30 seconds

export const POST: RequestHandler = async ({ request, params }) => {
	const userIp = request.headers.get('x-forwarded-for') ?? '';

	// Rate limit
	if (
		lastUserFeedback.has(userIp) &&
		Date.now() - (lastUserFeedback.get(userIp) ?? 0) < RATE_LIMIT
	) {
		return new Response('Rate limited', { status: 429 });
	}

	lastUserFeedback.set(userIp, Date.now());

	const pageId = params.pageId;
	const requestBody = await request.json();
	const { feedback, token } = requestBody;

	if (!pageId || !feedback || !validFeedbacks.includes(feedback)) {
		return new Response('Missing arguments', { status: 401 });
	}

	const captchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${token}`;
	const captchaReq = await fetch(captchaUrl, { method: 'POST' });
	const captchaRes = await captchaReq.json();

	if (!captchaRes.success || captchaRes.score < 0.5) {
		return new Response('Verification failed', { status: 401 });
	}

	const updated = await addFeedback(pageId, feedback);
	return json(updated?.feedback ?? {});
};

export const GET: RequestHandler = async ({ params }) => {
	const pageId = params.pageId;

	if (!pageId) {
		return new Response('Missing arguments', { status: 401 });
	}

	const feedback = await getFeedback(pageId);
	return json(feedback?.feedback ?? {});
};
