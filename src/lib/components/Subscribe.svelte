<script lang="ts">
	import { Card, Grid, Input, Button } from '@timeleap/ui';
	import toast from 'svelte-french-toast';
	import { subscribe, type Topic } from '$lib/api/subscribe';
	import { fade } from 'svelte/transition';
	import { Mail } from 'lucide-svelte';

	let email = $state('');
	let showSubscribe = $state(true);
	let disabled = $state<boolean | undefined>(undefined);

	let { topic = 'newsletter', class: className = '' }: { topic: Topic; class?: string } = $props();

	const handleSubscribe = () => {
		if (!email) {
			toast.error('Please enter your email address');
			return;
		}

		grecaptcha.ready(async () => {
			disabled = true;
			const token = await grecaptcha.execute('6LcFm-UdAAAAAA2HsCcTFj7dA_okrJlKKoYR0rKf', {
				action: 'submit'
			});
			const resp = await subscribe(email, topic, token);
			if (resp.status === 200) {
				showSubscribe = false;
				toast.success('You have successfully subscribed!');
			} else {
				toast.error('An error occurred while subscribing. Please try again later.');
				disabled = undefined;
			}
		});
	};
</script>

{#if showSubscribe}
	<div transition:fade>
		<Card class={`${className} text-white flex flex-col gap-8 pb-10! border border-zinc-800 mx-8`}>
			<Grid
				extraLargeScreenColumns={3}
				largeScreenColumns={3}
				mediumScreenColumns={1}
				class="grid-rows-[auto]"
			>
				<div class="flex gap-4 flex-col">
					<h2 class="white-text text-white font-serif text-4xl mt-6">Get the latest news.</h2>
					<p class="text-gray-400">Subscribe to our newsletter for the latest updates.</p>
				</div>
				<div class="flex flex-col gap-8 col-span-2 row-span-2 md:row-span-1">
					<Input
						type="email"
						label=""
						id="email"
						class="bg-zinc-800 focus:bg-zinc-700 transition-colors"
						placeholder="john@doe.com"
						bind:value={email}
					></Input>
					<div class="text-sm text-gray-400">This form is protected by reCAPTCHA.</div>
					<Button
						class="bg-green-400 hover:bg-green-300 text-black self-start font-medium"
						{disabled}
						on:click={handleSubscribe}
					>
						Subscribe <Mail size={'1em'} strokeWidth={2.5} />
					</Button>
				</div>
			</Grid>
		</Card>
	</div>
{/if}
