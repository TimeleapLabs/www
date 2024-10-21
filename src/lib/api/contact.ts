export const contact = (
	subject: string,
	body: string,
	name: string,
	topic: string,
	email: string,
	token: string // reCAPTCHA
) =>
	fetch(window.location.origin + '/api/contact', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ subject, body, topic, name, email, token })
	});
