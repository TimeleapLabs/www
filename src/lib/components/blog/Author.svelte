<script lang="ts">
	type AuthorProfile = {
		name: string;
		avatar: string;
		bio: string;
	};

	const authors: Record<string, AuthorProfile> = {
		pouya: {
			name: 'Pouya Eghbali',
			avatar: '/images/authors/pouya.jpg',
			bio: 'Founder & CEO at Timeleap'
		},
		hamed: {
			name: 'Hamed',
			avatar: '/images/authors/developer.jpg',
			bio: 'DevRel Engineer at Timeleap'
		},
    kevin: {
      name: 'Kevin Aguilar',
      avatar: '/images/authors/kevin.jpg',
      bio: 'Co-founder & CTO at Timeleap'
    }
	};

	export let author: keyof typeof authors;
	export let createdAt: string;
</script>

{#if authors[author]}
	<div class="flex items-center gap-4 mt-8">
		<img src={authors[author].avatar} alt={authors[author].name} class="w-12 h-12 rounded-full" />
		<div>
			<h3 class="font-bold">{authors[author].name}</h3>
			<p class="text-gray-400 text-xs italic">{createdAt}</p>
			<p class="text-gray-400 text-xs">{authors[author].bio}</p>
		</div>
	</div>
{/if}
