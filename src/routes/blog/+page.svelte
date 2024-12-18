<script lang="ts">
	import { Button, Section, Card } from '@timeleap/ui';
	import Icon from '@iconify/svelte';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import Code from '$lib/components/Code.svelte';
	import Mermaid from '$lib/components/Mermaid.svelte';
	import Collapsible from '$lib/components/docs/nav/Collapsible.svelte';
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import Feedback from '$lib/components/Feedback.svelte';
	import Readable from '$lib/components/Readable.svelte';
	import Author from '$lib/components/blog/Author.svelte';

	import { getNavForPage, fullNav } from '$lib/blog/nav';
	import { page } from '$app/stores';
	import { persisted } from 'svelte-persisted-store';

	const readable = persisted('readable', false);
	const nav = getNavForPage($page.url.pathname);

	
</script>

<MetaTags title={'Timeleap — Blog'} description="Stay up to date with the latest news and updates from Timeleap." ogImageText={`Timeleap Blog`} ogImageFontSize={48} />
<Navbar active="blog"></Navbar>

<Section
	class="w-full max-w-[1920px] mx-auto pt-20 md:pt-36 gap-8! px-4 md:px-16 xxl:px-0 text-white flex-1"
>
	<div class="md:grid grid-cols-[240px_1fr]">
		<div class="relative hidden md:block">
			<div class="sticky top-24">
				<h4 class="font-serif mb-4">Table of Contents</h4>
				<Collapsible nav={fullNav} />
			</div>
		</div>

		<div class="flex flex-col gap-8 md:px-16 max-w-full min-w-0">
			<div class="flex flex-col gap-8 md:px-16 max-w-full min-w-0">
				<div class="flex gap-4 flex-wrap justify-between">
					<div class="flex gap-2 -mb-8 flex-wrap"><a href="" class="hover:text-green-400 transition-colors">Blog </a></div>
					<Readable />
				</div>

				<div
					class="flex flex-col gap-8 max-w-full {$readable
						? '!max-w-[860px]'
						: ''} transition-all duration-300 ease-in-out"
				>
					<h1 class="font-serif text-4xl md:text-5xl mt-4">Blog </h1>

<p class="text-zinc-300">Welcome to the Timeleap blog! Here you'll find the latest news and updates from Timeleap.

</p>
      <div>
        <h5 class="font-serif text-2xl mt-4">Table of Contents</h5>
        <ul class="list-decimal mt-4 pl-8"><li class="pl-2"><a href="/blog/let-there-be-light" class="hover:text-green-400 transition-colors">Let There Be Light</a></li></ul>
      </div>
    


				</div>

				<Author author={''} createdAt={''} />
				<Feedback pageId={$page.url.pathname.slice(1).replaceAll('/', '__')} />

				{#if nav.next || nav.prev}
					<div class="mt-8 mb-16 flex gap-4 justify-between w-full">
						{#if nav.prev}
							<Button
								class="bg-green-400 text-black hover:bg-green-300 font-semibold"
								animate
								href={nav.prev.href}
							>
								<Icon icon="carbon:arrow-left" />{nav.prev.title}
							</Button>
						{/if}
						{#if nav.next}
							<Button
								class="bg-green-400 text-black hover:bg-green-300 font-semibold"
								animate
								href={nav.next.href}
							>
								{nav.next.title}<Icon icon="carbon:arrow-right" />
							</Button>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div></Section
>

<Footer></Footer>
