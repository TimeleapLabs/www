<script lang="ts">
	import { Section, Grid, Image, Card } from '@timeleap/ui';

	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import { ArrowRight } from 'lucide-svelte';
</script>

<MetaTags />

<Navbar active="none" backButton></Navbar>

<Section class="w-full max-w-[1280px] mx-auto pt-24 gap-16! px-4 md:px-16 xxl:px-0 flex-1 pb-12">
	<Grid extraLargeScreenColumns={3} largeScreenColumns={2}>
		<Card class="p-0! flex text-white bg-zinc-950 hover:bg-zinc-800 transition-colors" href="/blog">
			<div class="px-8 flex-1 content-center">
				<h3 class="font-serif text-2xl">
					Blog <ArrowRight size={'1em'} class="inline-block" />
				</h3>
				<div>Stay up to date</div>
			</div>
			<Image src="/images/products.jpg" alt="Products" width="128px" height="128px"></Image>
		</Card>

		<Card class="p-0! flex text-white bg-zinc-950 hover:bg-zinc-800 transition-colors" href="/docs">
			<div class="px-8 flex-1 content-center">
				<h3 class="font-serif text-2xl">
					Docs <ArrowRight size={'1em'} class="inline-block" />
				</h3>
				<div>Knowledge base</div>
			</div>
			<Image src="/images/docs.jpg" alt="Products" width="128px" height="128px"></Image>
		</Card>

		<Card
			class="p-0! flex text-white bg-zinc-950 hover:bg-zinc-800 transition-colors"
			href="/contact"
		>
			<div class="px-8 flex-1 content-center">
				<h3 class="font-serif text-2xl">
					Contact <ArrowRight size={'1em'} class="inline-block" />
				</h3>
				<div>Talk to an expert</div>
			</div>
			<Image src="/images/mail.jpg" alt="Contact" width="128px" height="128px"></Image>
		</Card>
		<Card
			class="p-0! flex text-white bg-zinc-950 hover:bg-zinc-800 transition-colors"
			href="/stake"
		>
			<div class="px-8 flex-1 content-center">
				<h3 class="font-serif text-2xl">
					Stake <ArrowRight size={'1em'} class="inline-block" />
				</h3>
				<div>Stake KNS</div>
			</div>
			<Image src="/images/stake.png" alt="stake" width="128px" height="128px"></Image>
		</Card>
	</Grid>
</Section>

<Footer></Footer>
