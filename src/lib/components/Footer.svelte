<script lang="ts">
	import {
		Twitter,
		Linkedin,
		Github,
    Send,
		MessagesSquare,
		ArrowUpRight,
		ArrowRight
	} from 'lucide-svelte';
	import { Section, Grid } from '@timeleap/ui';
</script>

<Section class="max-w-[1920px] mx-auto px-12 pb-8 md:px-24">
	<Grid
		extraLargeScreenColumns={4}
		largeScreenColumns={4}
		mediumScreenColumns={3}
		smallScreenColumns={1}
		class="text-white pt-4 md:pb-16 gap-16! auto-rows-auto!"
	>
		<div class="md:pb-48">
			<h3 class="font-serif text-xl pb-8">Timeleap SA.</h3>
			<p class="text-zinc-400">Pl. de l'Industrie 2, 1180 Rolle, Switzerland</p>
			<img class="mt-8" src="/images/timeleap.svg" alt="Logo" width="160px" />
		</div>
		<div>
			<h3 class="font-serif text-xl pb-8">Social Media</h3>
			<div class="flex gap-4 flex-wrap max-w-[240px] text-zinc-400">
				<a
					href="https://twitter.com/TimeleapLabs"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					<Twitter size={24} strokeWidth={1.5} />
				</a>
				<a
					href="https://www.linkedin.com/company/timeleaplabs"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					<Linkedin size={24} strokeWidth={1.5} />
				</a>
				<a
					href="https://github.com/TimeleapLabs"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					<Github size={24} strokeWidth={1.5} />
				</a>
				<a
					href="https://discord.com/invite/Timeleap"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					<Send size={24} strokeWidth={1.5} />
				</a>
				<a
					href="https://forum.timeleap.swiss"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					<MessagesSquare size={24} strokeWidth={1.5} />
				</a>
			</div>
		</div>
		<div>
			<h3 class="font-serif text-xl pb-8">Tokenomics</h3>
			<div class="flex gap-4 flex-col text-zinc-400">
				<a
					href="https://app.uniswap.org/swap?outputCurrency=0xf1264873436A0771E440E2b28072FAfcC5EEBd01"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					KNS on Uniswap <ArrowUpRight size={'1em'} class="inline-block ml-2" />
				</a>
				<a
					href="https://opensea.io/collection/kenshi-katana"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					Katana NFT on OpenSea <ArrowUpRight size={'1em'} class="inline-block ml-2" />
				</a>
				<a href="/stake" class="hover:text-green-400 transition-colors">
					Stake <ArrowRight size={'1em'} class="inline-block ml-2" />
				</a>
				<a href="/tools" class="hover:text-green-400 transition-colors">
					KNS tools <ArrowRight size={'1em'} class="inline-block ml-2" />
				</a>
			</div>
		</div>
		<div>
			<h3 class="font-serif text-xl pb-8">Info</h3>
			<div class="flex gap-4 flex-col text-zinc-400">
				<a href="/docs" class="hover:text-green-400 transition-colors">
					Blog <ArrowRight size={'1em'} class="inline-block ml-2" />
				</a>
				<a href="/docs" class="hover:text-green-400 transition-colors">
					Documentation <ArrowRight size={'1em'} class="inline-block ml-2" />
				</a>
				<a href="/contact" class="hover:text-green-400 transition-colors">
					Talk to an Expert <ArrowRight size={'1em'} class="inline-block ml-2" />
				</a>
				<a href="/tos" class="hover:text-green-400 transition-colors">
					Terms & Conditions <ArrowRight size={'1em'} class="inline-block ml-2" />
				</a>
				<a href="/shadowblade" class="hover:text-green-400 transition-colors">
					Shadowblade Chronicles <ArrowRight size={'1em'} class="inline-block ml-2" />
				</a>
			</div>
		</div>
	</Grid>
</Section>
