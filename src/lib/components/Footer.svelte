<script>
	import Icon from '@iconify/svelte';
	import { Section, Grid } from '@timeleap/ui';
</script>

<Section class="max-w-[1920px] mx-auto px-4 pb-8 md:px-16">
	<Grid
		extraLargeScreenColumns={4}
		largeScreenColumns={4}
		mediumScreenColumns={3}
		smallScreenColumns={1}
		class="text-white pt-4 md:pb-16"
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
					<Icon icon="carbon:logo-twitter" width="32" height="32" />
				</a>
				<a
					href="https://www.linkedin.com/company/timeleaplabs"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					<Icon icon="carbon:logo-linkedin" width="32" height="32" />
				</a>
				<a
					href="https://github.com/TimeleapLabs"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					<Icon icon="carbon:logo-github" width="32" height="32" />
				</a>
				<a
					href="https://t.me/kenshi"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					<Icon icon="carbon:send-alt" width="32" height="32" />
				</a>
				<a
					href="https://discord.com/invite/timeleap"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					<Icon icon="carbon:logo-discord" width="32" height="32" />
				</a>
				<a
					href="https://forum.kenshi.io"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					<Icon icon="carbon:chat" width="32" height="32" />
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
					KNS on Uniswap <Icon icon="carbon:arrow-up-right" class="inline-block ml-2" />
				</a>
				<a
					href="https://opensea.io/collection/kenshi-katana"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					Katana NFT on OpenSea <Icon icon="carbon:arrow-up-right" class="inline-block ml-2" />
				</a>
				<a
					href="https://old.timeleap.swiss/stake"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-green-400 transition-colors"
				>
					Stake <Icon icon="carbon:arrow-up-right" class="inline-block ml-2" />
				</a>
			</div>
		</div>
		<div>
			<h3 class="font-serif text-xl pb-8">Info</h3>
			<div class="flex gap-4 flex-col text-zinc-400">
				<a href="/docs" class="hover:text-green-400 transition-colors">
					Documentation <Icon icon="carbon:arrow-right" class="inline-block ml-2" />
				</a>
				<a href="/contact" class="hover:text-green-400 transition-colors">
					Talk to an Expert <Icon icon="carbon:arrow-right" class="inline-block ml-2" />
				</a>
				<a href="/tos" class="hover:text-green-400 transition-colors">
					Terms & Conditions <Icon icon="carbon:arrow-right" class="inline-block ml-2" />
				</a>
			</div>
		</div>
	</Grid>
</Section>
