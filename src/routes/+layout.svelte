<script lang="ts">
	import '../app.css';
	import 'unfonts.css';

	import { onNavigate } from '$app/navigation';
	import { Toaster } from 'svelte-french-toast';

	let { children } = $props();

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
	{@render children?.()}
</div>

<Toaster />

<style>
	:global(.grecaptcha-badge) {
		visibility: hidden;
	}
</style>
