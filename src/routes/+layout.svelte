<script>
	import '../app.css';
	import 'unfonts.css';
	import modal from '$lib/wallet-modal';

	import { onNavigate } from '$app/navigation';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="flex min-h-full flex-col">
	<slot />
</div>

<SvelteToast />

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.zinc.950);
	}

	:global(.grecaptcha-badge) {
		visibility: hidden;
	}
</style>
