<script lang="ts">
	import { Button, Section, Card } from '@timeleap/ui';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import Code from '$lib/components/Code.svelte';
	import InlineCode from '$lib/components/InlineCode.svelte';
	import Mermaid from '$lib/components/Mermaid.svelte';
	import Collapsible from '$lib/components/docs/nav/Collapsible.svelte';
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import Feedback from '$lib/components/Feedback.svelte';
	import Readable from '$lib/components/Readable.svelte';
	import Author from '$lib/components/blog/Author.svelte';
	import TiltImage from '$lib/components/TiltImage.svelte';

	import { getNavForPage, fullNav } from '$lib/blog/nav';
	import { page } from '$app/stores';
	import { persisted } from 'svelte-persisted-store';
	import { onMount } from 'svelte';
	import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-svelte';

	const readable = persisted('readable', false);
	const nav = getNavForPage($page.url.pathname);
	$: contentClass = $readable ? '!max-w-[912px]' : '';

	let headings: { id: string; text: string }[] = [];
	let activeHeading = '';

	onMount(() => {
		const contentSection = document.querySelector('.section');
		if (contentSection) {
			headings = Array.from(contentSection.querySelectorAll('h2, h3')).map((el) => ({
				id: el.id || el.textContent?.replace(/\s+/g, '-').toLowerCase() || '',
				text: el.textContent || ''
			}));
		}

		const onScroll = () => {
			let newActiveHeading = activeHeading;
			headings.forEach((heading) => {
				const element = document.getElementById(heading.id);
				if (element) {
					const rect = element.getBoundingClientRect();
					if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
						newActiveHeading = heading.id;
					}
				}
			});

			if (newActiveHeading !== activeHeading) {
				activeHeading = newActiveHeading;
			}
		};

		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	});
	const scrollToHeading = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};
	('$IMPORTS');
</script>

<MetaTags title={'Timeleap — $TITLE'} description="$DESCRIPTION" $OG />
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
			<div class="flex justify-between items-center gap-2 flex-wrap relative z-10">
				<div class="flex gap-2 flex-wrap">$BREADCRUMBS</div>
				<Readable />
			</div>

			<div class="md:grid grid-cols-[1fr_auto] gap-8">
				<div class="flex flex-col gap-8 max-w-full min-w-0">
					<div
						class="flex flex-col gap-8 max-w-full transition-all duration-300 ease-in-out {contentClass}"
					>
						$CONTENT
					</div>

					<Author author={'$AUTHOR'} createdAt={'$CREATED_AT'} />
					<Feedback pageId={$page.url.pathname.slice(1).replaceAll('/', '__')} />
				</div>

				{#if $readable && headings.length && window.innerWidth > 1440}
					<div
						class="hidden sticky top-24 flex-none max-h-[calc(100vh-6rem)] max-w-60 overflow-y-auto p-4 space-y-2 opacity-0 translate-y-4 transition-all duration-300 ease-in-out {$readable
							? 'lg:block opacity-100 translate-y-0'
							: ''}"
					>
						<h4 class="text-lg font-bold mb-2">On this page</h4>
						<ul class="space-y-2">
							{#each headings as heading}
								<li>
									<button
										on:click={() => scrollToHeading(heading.id)}
										class="text-sm transition-colors break-all whitespace-normal w-full text-left
										   {activeHeading === heading.id ? 'text-green-400' : 'text-white'}
										   hover:text-white hover:opacity-90 cursor-pointer"
									>
										{heading.text}
									</button>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>

				{#if nav.next || nav.prev}
					<div class="mt-8 mb-16 flex gap-4 justify-between w-full">
						{#if nav.prev}
							<Button
								class="bg-green-400 text-black hover:bg-green-300 font-medium"
								animate
								href={nav.prev.href}
							>
							<ArrowLeft size={'1em'} />{nav.prev.title}
						</Button>
						{/if}
						{#if nav.next}
							<Button
								class="bg-green-400 text-black hover:bg-green-300 font-medium"
								animate
								href={nav.next.href}
							>
							{nav.next.title}<ArrowRight size={'1em'} />
						</Button>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</Section
>

<Footer></Footer>
