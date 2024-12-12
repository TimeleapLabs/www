export const feedback = (
	pageId: string,
	feedback: string,
	token: string // reCAPTCHA
) =>
	fetch(window.location.origin + `/api/feedback/${pageId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ feedback, token })
	});

export const fetchFeedback = (pageId: string) =>
	fetch(window.location.origin + `/api/feedback/${pageId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json'
		}
	});
