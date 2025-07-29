<div class="relative overflow-hidden p-4 pl-5 border-l-4 border-zinc-500">
	<div
		class="absolute w-1 h-full left-0 top-0 bg-stripe from-zinc-800 to-zinc-600 from-[length:0px] to-[length:5px]"
	></div>

	<div class="flex gap-2 items-start text-zinc-200">
		<span class="text-2xl leading-none select-none text-zinc-500">“</span>
		<div class="text-sm italic text-zinc-300">
			<slot />
		</div>
	</div>
</div>

<style>
	.bg-stripe {
		--background-image-stripe: repeating-linear-gradient(-45deg, var(--tw-gradient-stops));
	}
</style>
