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
	import TiltImage from '$lib/components/TiltImage.svelte';

	import { getNavForPage, fullNav } from '$lib/blog/nav';
	import { page } from '$app/stores';
	import { persisted } from 'svelte-persisted-store';

	const readable = persisted('readable', false);
	const nav = getNavForPage($page.url.pathname);

	
</script>

<MetaTags title={'Timeleap — Let There Be Light'} description="Stay up to date with the latest news and updates from Timeleap." ogImageText={`Let there
be light`} ogImageFontSize={36} />
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
					<div class="flex gap-2 -mb-8 flex-wrap"><a href="/blog" class="hover:text-green-400 transition-colors">Blog </a><span class="text-zinc-600"> / </span><a href="" class="hover:text-green-400 transition-colors">Let There Be Light </a></div>
					<Readable />
				</div>

				<div
					class="flex flex-col gap-8 max-w-full {$readable
						? '!max-w-[860px]'
						: ''} transition-all duration-300 ease-in-out"
				>
					<h1 class="font-serif text-4xl md:text-5xl mt-4">Let There Be Light </h1>

<p class="text-zinc-300">DevCon was eye-opening. It was the first time the Timeleap team traveled
together, and we got the opportunity to discuss our internal policies, our
vision for the future, and how we can improve our services. We also got to meet
some of our users in person, which was a great experience.

</p><p class="text-zinc-300">In Bangkok, we realized that we've lost touch with our roots. We've been so
focused on building the best product that we've forgotten about the people who
use it. Comparing our social media accounts with other tech companies, we
realized that haven't had a lot of content about the technologies that we make.

</p><p class="text-zinc-300">There are two tech companies in Europe that I've worked with that have taught me
important lessons. One, which shall not be named, is an e-commerce company with
four developers and more than two hundred non-tech employees. The other is a
software company where more than eighty percent of the employees are developers
or tech-related. I want Timeleap to be the latter.

</p><p class="text-zinc-300">I want Timeleap to be a company where developers are the majority. I want us to
be a company that is known for its technology, and we are taking the first steps
to make that happen. Read below to find out all the changes we're making.

</p><h2 class="font-serif text-3xl md:text-4xl mt-4">New Website</h2>

<p class="text-zinc-300">This one isn't that much of a news to our users, but we've launched a new
website tailored to developers. We are rewriting our documentation, our front
page, and our blog to be more developer-friendly.

</p><p class="text-zinc-300">We made our own documentation generator, which we're calling Tiramisu. It
enables us to integrate our blog and docs seamlessly with the rest of our
website. It's flexible and extensible, which allows us to add custom plugins and
features. Things like code playgrounds, interactive examples, plots and more are
now possible.

</p><Code lineNumbers lang="tiramisu" code={`title { Tiramisu }

This is a Tiramisu sample. We're using Tiramisu to write our docs and blog.
We use a custom compiler to convert Tiramisu to Svelte components.

Lear more about Tiramisu link { here, to = /docs/products/tiramisu }`}></Code>

<p class="text-zinc-300">Check the source code of this page <a href="https://github.com/TimeleapLabs/www/blob/master/src/routes/blog/let-there-be-light.tiramisu
" class="hover:text-green-400 transition-colors inline-flex gap-1 items-center border-b border-zinc-500">here<Icon icon="carbon:launch" class="inline" /></a>.

</p><h2 class="font-serif text-3xl md:text-4xl mt-4">New Content Team</h2>

<p class="text-zinc-300">It was one of the most difficult decisions I've had to make, but we've decided
to let go of our marketing team. We are now a company that is run by developers,
and content creation is now integrated into our development process. We have 
weekly strategic meetings to discuss what content we should create, and soon
you should see a lot more content from us.

</p><h2 class="font-serif text-3xl md:text-4xl mt-4">OG Image Generator</h2>

<p class="text-zinc-300">We've built an OG image generator that generates images for our blog, docs, and
other pages of our website. It's a simple tool that allows us to generate images
with custom text and font sizes. We want to keep it simple and focus mainly on
the content, but we also want to make sure that our content is shareable on
social media. The preview image for this page, and the below image are generated
using our dynamic OG image generator.

</p>
			<div class="flex flex-col items-center">
				<img src="/og.png?text=Dynamically%20Generated%0ASocial%20Media%20Preview%20Images&fontSize=20" alt="Dynamically Generated Social Media Preview Images" class="rounded-lg mb-4" />
				<p class="text-zinc-400 text-xs">This image was generated using our OG image generator.
</p>
			</div>
		

<h2 class="font-serif text-3xl md:text-4xl mt-4">Goodbye, Forum!</h2>

<p class="text-zinc-300">We've decided to shut down our forum. GitHub is the biggest social media
platform for developers, and we've decided to move our discussions there. We'll
soon move our TEPs (Timeleap Enhancement Proposals) to GitHub, and we'll also
start using GitHub Discussions for our tech discussions.

</p><p class="text-zinc-300">Collaborators, contributors, and users should now use Tiramisu and GitHub for
making feature requests, performance improvements, security enhancements, API
changes, ecosystem changes, and other enhancements proposals.

</p><p class="text-zinc-300">Using GitHub allows us to be more attractive to developers, and it also helps
link proposals with code changes or sample implementations. Furthermore, it
allows us to seamlessly integrate and reference the proposals in our
documentation.

</p><h1 class="font-serif text-4xl md:text-5xl mt-4">Conclusion </h1>

<p class="text-zinc-300">We are making a lot of changes to Timeleap, and we are excited about the future.
We're close to the end of the year, and we have a lot of exciting things planned
for 2025. Stay tuned for more updates, and don't forget to follow us on social
media to stay up to date with the latest news and updates from Timeleap.

</p>
				</div>

				<Author author={'pouya'} createdAt={'2024-12-18'} />
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
