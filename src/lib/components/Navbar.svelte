<script lang="ts">
	import { Button, Navbar } from '@timeleap/ui';
	import { ArrowLeft, BookText, LockKeyholeOpen, Mail, Menu, Pencil } from 'lucide-svelte';

	import ConnectButton from './ConnectButton.svelte';

	type section = 'home' | 'products' | 'contact' | 'docs' | 'blog' | 'stake' | 'none';

	export let backButton: boolean = false;
	export let active: section = 'home';

	const activeClass = 'hover:bg-zinc-700';
	const hoverClass = 'hover:bg-zinc-800';

	const classes = {
		home: active === 'home' ? activeClass : hoverClass,
		contact: active === 'contact' ? activeClass : hoverClass,
		docs: active === 'docs' ? activeClass : hoverClass,
		blog: active === 'blog' ? activeClass : hoverClass,
		stake: active === 'stake' ? activeClass : hoverClass
	};

	let scrollY = 0;

	$: extraClasses = scrollY > 0 ? 'bg-[rgba(0,0,0,.4)] backdrop-blur-xl' : '';
</script>

<svelte:window bind:scrollY />

<Navbar
	class="text-white flex rounded-none! py-3 px-2 md:px-16 fixed top-0 w-full z-50 max-w-[100vw] {extraClasses}"
>
	<Button class="{classes.home} p-5! rounded-lg!" href="/">
		<img src="/images/tl.svg" alt="Timeleap" width="16px" />
		Home
	</Button>
	<Button class="{classes.docs} hidden! md:inline-flex! p-5! rounded-lg!" href="/docs">
		<BookText size={'1em'} /> Docs
	</Button>
	<Button class="{classes.blog} hidden! md:inline-flex! p-5! rounded-lg!" href="/blog">
		<Pencil size={'1em'} /> Blog
	</Button>
	<Button class="{classes.contact} hidden! md:inline-flex! p-5! rounded-lg!" href="/contact">
		<Mail size={'1em'} /> Contact
	</Button>
	<Button class="{classes.stake} !hidden md:!inline-flex !p-5 !rounded-lg" href="/stake">
		<LockKeyholeOpen size={'1em'} /> Stake
	</Button>
	<div class="flex-1"></div>
	<ConnectButton class="hidden! md:inline-flex! p-5! rounded-lg! hover:bg-zinc-800" />
	{#if backButton}
		<Button
			class="px-6! hover:bg-blue-500 p-5! rounded-lg!"
			on:click={() => window?.history?.go(-1)}
		>
			<ArrowLeft size={24} />
		</Button>
	{:else}
		<Button
			class="px-6! hover:bg-green-300 transition-colors md:hidden!  p-5! rounded-lg!"
			href="/menu"
		>
			<Menu size={24} />
		</Button>
	{/if}
</Navbar>
