<script lang="ts">
	import { feedback, fetchFeedback } from '$lib/api/feedback';
	import { onMount } from 'svelte';

	let pageId: string = $props();

	const allEmojis = ['🔥', '👍', '🤘', '🎉', '❤️', '🤩'];
	const emojiNames = ['fire', 'thumbsUp', 'rockOn', 'party', 'heart', 'starStruck'];

	const emojis = allEmojis.map((emoji, index) => ({
		emoji,
		name: emojiNames[index]
	}));

	let feedbacks: Record<string, number> = $state({});

	const sendFeedback = (feedbackStr: string) => () => {
		grecaptcha.ready(async () => {
			const token = await grecaptcha.execute('6LcFm-UdAAAAAA2HsCcTFj7dA_okrJlKKoYR0rKf', {
				action: 'submit'
			});
			const resp = await feedback(pageId, feedbackStr, token);
			if (resp.status === 200) {
				feedbacks = await resp.json();
			}
		});
	};

	onMount(async () => {
		const resp = await fetchFeedback(pageId);
		if (resp.status === 200) {
			feedbacks = await resp.json();
		}
	});
</script>

<div class="flex flex-col gap-4 mt-8">
	<div class="text-sm text-gray-500">How was this page?</div>
	<div class="flex gap-2 flex-wrap">
		{#each emojis as { emoji, name }}
			<button
				class="p-1 flex items-center px-4 rounded-full bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring focus:ring-gray-300 cursor-pointer"
				on:click={sendFeedback(name)}
			>
				{emoji}
				{#if feedbacks[name]}
					<span class="ml-2 text-xs">{feedbacks[name]}</span>
				{/if}
			</button>
		{/each}
	</div>
</div>
