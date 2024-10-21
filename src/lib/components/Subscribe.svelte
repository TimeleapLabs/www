<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Card, Grid, Input, Button, Switch } from '@timeleap/ui';

	let email = '';
	let subscribe = false;

	let activeColor = '#4ADE80';
	let inactiveColor = '#27272A';
</script>

<Card class="{$$props.class || ''} bg-zinc-900 text-white flex flex-col gap-8 !pb-10">
	<Grid extraLargeScreenColumns={3} largeScreenColumns={3}>
		<h2 class="white-text text-white font-serif text-5xl mt-6">Want to stay updated?</h2>
		<div class="flex flex-col gap-8 col-span-2 row-span-2 md:row-span-1">
			<Input
				type="email"
				label=""
				id="email"
				class="bg-zinc-800 focus:bg-zinc-700 transition-colors"
				placeholder="john@doe.com"
				bind:value={email}
			></Input>
			<Switch
				label="Subscribe to Timeleap newsletter"
				id="subscribe"
				class="transition-colors"
				bind:checked={subscribe}
				color={subscribe ? activeColor : inactiveColor}
			/>
			<div class="text-sm text-gray-400">This form is protected by reCAPTCHA.</div>
			<Button class="bg-green-400 hover:bg-green-300 text-black self-start font-semibold">
				Subscribe <Icon icon="carbon:email" />
			</Button>
		</div>
	</Grid>
</Card>
