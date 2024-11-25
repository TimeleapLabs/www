<script lang="ts">
	import { Card, Grid, Input, Button } from '@timeleap/ui';

	import { contact } from '$lib/api/contact';
	import { toast } from '@zerodevx/svelte-toast';

	export let topic = 'general';
	export let subject: string = '';

	let name: string = '';
	let email: string = '';
	let body: string = '';

	let disabled: boolean | undefined = undefined;

	const submitMessage = () => {
		disabled = true;
		console.log(name, email, body, subject, topic);

		if (!name) {
			toast.push('We need to know your name!');
			disabled = undefined;
			return;
		}

		if (!email) {
			toast.push('We need your email to be able to contact you back!');
			disabled = undefined;
			return;
		}

		if (!email.match(/\S+@\S+\.\S+/)) {
			toast.push('Please enter a valid email address');
			disabled = undefined;
			return;
		}

		if (!subject) {
			toast.push('Please enter a subject for your message');
			disabled = undefined;
			return;
		}

		if (!topic) {
			toast.push('Please choose one of the possible topics');
			disabled = undefined;
			return;
		}

		if (!body) {
			toast.push('Please write your message first');
			disabled = undefined;
			return;
		}

		grecaptcha.ready(async () => {
			const token = await grecaptcha.execute('6LcFm-UdAAAAAA2HsCcTFj7dA_okrJlKKoYR0rKf', {
				action: 'submit'
			});
			const resp = await contact(subject, body, name, topic, email, token);
			if (resp.status === 200) {
				toast.push('Your message has been sent successfully!');
				email = '';
				name = '';
				body = '';
				subject = '';
				disabled = undefined;
			} else {
				toast.push('There was an issue sending your message, please try again later');
				disabled = undefined;
			}
		});
	};
</script>

<h2 class="white-text text-white font-serif text-5xl mt-16">Contact Us.</h2>
<Card class="bg-zinc-950 text-white flex flex-col gap-8">
	<Grid extraLargeScreenColumns={2} largeScreenColumns={2}>
		<Input
			type="text"
			label="Name"
			id="name"
			class="bg-zinc-800 focus:bg-zinc-700 transition-colors"
			placeholder="John Doe"
			bind:value={name}
		>
			<span class="text-gray-400 font-light"> Please enter your full name. </span>
		</Input>
		<Input
			type="email"
			label="Email"
			id="email"
			class="bg-zinc-800 focus:bg-zinc-700 transition-colors"
			placeholder="john@doe.com"
			bind:value={email}
		>
			<span class="text-gray-400 font-light"> Please enter a valid email address. </span>
		</Input>
	</Grid>
	<Input
		type="text"
		label="Subject"
		id="subject"
		class="bg-zinc-800 focus:bg-zinc-700 transition-colors"
		placeholder="Subject"
		bind:value={subject}
	>
		<span class="text-gray-400 font-light"> Please enter a subject for your message. </span>
	</Input>

	<div class="flex flex-col gap-4">
		<label for="message" class="text-white">
			Message <span class="text-gray-400 font-light ml-2">
				Please write your message here. We will get back to you as soon as possible.
			</span>
		</label>
		<textarea
			class="bg-zinc-800 focus:bg-zinc-700 transition-colors rounded-3xl outline-hidden p-8"
			id="message"
			rows="5"
			placeholder="Your message here..."
			bind:value={body}
		></textarea>
	</div>

	<div class="text-sm text-gray-400">This form is protected by reCAPTCHA.</div>
	<Button
		class="bg-green-400 hover:bg-green-300 text-black self-start font-semibold"
		{disabled}
		on:click={submitMessage}
	>
		Submit
	</Button>
</Card>
