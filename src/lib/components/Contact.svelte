<script lang="ts">
	import { Card, Grid, Input, Button } from '@timeleap/ui';
</script>

<h2 class="white-text text-white font-serif text-5xl mt-16">Contact Us.</h2>
<Card class="bg-zinc-900 text-white flex flex-col gap-8">
	<Grid extraLargeScreenColumns={2} largeScreenColumns={2}>
		<Input
			type="text"
			label="Name"
			id="name"
			class="bg-zinc-800 focus:bg-zinc-700 transition-colors"
			placeholder="John Doe"
		>
			<span class="text-gray-400 font-light"> Please enter your full name. </span>
		</Input>
		<Input
			type="email"
			label="Email"
			id="email"
			class="bg-zinc-800 focus:bg-zinc-700 transition-colors"
			placeholder="john@doe.com"
		>
			<span class="text-gray-400 font-light"> Please enter a valid email address. </span>
		</Input>
	</Grid>
	<Input
		label="Message"
		class="bg-zinc-800 focus:bg-zinc-700 transition-colors"
		id="message"
		placeholder="Hello there!"
	/>
	<div class="text-sm text-gray-400">This form is protected by reCAPTCHA.</div>
	<Button class="bg-green-400 hover:bg-green-300 text-black self-start font-semibold">
		Submit
	</Button>
</Card>
