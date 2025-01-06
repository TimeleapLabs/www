<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button, Navbar } from '@timeleap/ui';
	import ConnectButton from './ConnectButton.svelte';

	type section = 'home' | 'contact' | 'blog' | 'docs' | 'none';

	export let backButton: boolean = false;
	export let active: section = 'home';

	const activeClass = 'md:bg-blue-600';
	const hoverClass = 'hover:bg-zinc-800';

	const classes = {
		home: active === 'home' ? activeClass : hoverClass,
		contact: active === 'contact' ? activeClass : hoverClass,
		blog: active === 'blog' ? activeClass : hoverClass,
		docs: active === 'docs' ? activeClass : hoverClass
	};
</script>

<Navbar
	class="bg-[rgba(0,0,0,.4)] text-white flex rounded-none! py-3 px-2 md:px-16 backdrop-blur-xl fixed top-0 w-full z-50 max-w-[100vw]"
>
	<Button class="{classes.home} p-5! rounded-lg!" href="/">
		<img src="/images/tl.svg" alt="Timeleap" width="16px" />
		Home
	</Button>
	<Button class="{classes.docs} hidden! md:inline-flex! p-5! rounded-lg!" href="/docs">
		<Icon icon="carbon:document-multiple-01" /> Docs
	</Button>
	<Button class="{classes.blog} hidden! md:inline-flex! p-5! rounded-lg!" href="/blog">
		<Icon icon="carbon:blog" /> Blog
	</Button>
	<Button class="{classes.contact} hidden! md:inline-flex! p-5! rounded-lg!" href="/contact">
		<Icon icon="carbon:email" /> Contact
	</Button>
	<div class="flex-1"></div>
	<ConnectButton class="hidden! md:inline-flex! p-5! rounded-lg! hover:bg-zinc-800" />
	{#if backButton}
		<Button
			class="px-6! hover:bg-blue-500 p-5! rounded-lg!"
			on:click={() => window?.history?.go(-1)}
		>
			<Icon icon="carbon:arrow-left" width={24} />
		</Button>
	{:else}
		<Button
			class="px-6! hover:bg-green-300 transition-colors md:hidden!  p-5! rounded-lg!"
			href="/menu"
		>
			<Icon icon="carbon:menu" width={24} />
		</Button>
	{/if}
</Navbar>
