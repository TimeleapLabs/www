<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Card, Grid, Input, Button } from '@timeleap/ui';
	import { toast } from '@zerodevx/svelte-toast';
	import { subscribe, type Topic } from '$lib/api/subscribe';
	import { fade } from 'svelte/transition';

	let email = '';
	let showSubscribe = true;
	let disabled: boolean | undefined = undefined;

	export let topic: Topic = 'newsletter';

	const handleSubscribe = () => {
		if (!email) {
			toast.push('Please enter your email address');
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
				toast.push('You have successfully subscribed!');
			} else {
				toast.push('An error occurred while subscribing. Please try again later.');
				disabled = undefined;
			}
		});
	};
</script>

{#if showSubscribe}
	<div transition:fade>
		<Card class="{$$props.class || ''} bg-zinc-900 text-white flex flex-col gap-8 !pb-10">
			<Grid extraLargeScreenColumns={3} largeScreenColumns={3}>
				<h2 class="white-text text-white font-serif text-5xl mt-6">Want to stay updated?</h2>
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
						class="bg-green-400 hover:bg-green-300 text-black self-start font-semibold"
						{disabled}
						on:click={handleSubscribe}
					>
						Subscribe <Icon icon="carbon:email" />
					</Button>
				</div>
			</Grid>
		</Card>
	</div>
{/if}
