export type Topic = 'hsm' | 'newsletter' | 'baas' | 'ghostfs' | 'wallet' | 'network';

export const subscribe = (
	email: string,
	topic: Topic,
	token: string // reCAPTCHA
) =>
	fetch(window.location.origin + '/api/subscribe', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, topic, token })
	});
