<script>
	import '../app.css';
	import 'unfonts.css';

	import { onNavigate } from '$app/navigation';
	import { Toaster } from 'svelte-french-toast';

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

<Toaster />

<style>
	:global(.grecaptcha-badge) {
		visibility: hidden;
	}
</style>
