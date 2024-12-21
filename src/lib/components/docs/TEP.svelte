<script lang="ts">
	import Icon from '@iconify/svelte';
	import Alert from '../Alert.svelte';

	const tepToAlertType = {
		draft: 'draft' as const,
		accepted: 'success' as const,
		rejected: 'error' as const,
		implemented: 'success' as const,
		deprecated: 'warning' as const,
		review: 'info' as const
	};

	const tepToAlertTitle = {
		draft: 'Draft' as const,
		accepted: 'Accepted' as const,
		rejected: 'Rejected' as const,
		implemented: 'Implemented' as const,
		deprecated: 'Deprecated' as const,
		review: 'Review' as const
	};

	const tepToAlertText = {
		draft: 'This TEP is still in draft and has not been accepted yet.' as const,
		accepted: 'This TEP has been accepted and is ready to be implemented.' as const,
		rejected: 'This TEP has been rejected and will not be implemented.' as const,
		implemented: 'This TEP has been implemented and is now available.' as const,
		deprecated: 'This TEP has been deprecated and should not be used.' as const,
		review: 'This TEP is currently under review.' as const
	};

	export let author: string;
	export let status: 'draft' | 'accepted' | 'rejected' | 'implemented' | 'deprecated';
	export let type: string;
	export let createdAt: string;
	export let updatedAt: string;
	export let discussion: string;
</script>

<div>
	This TEP was authored by {author} on {createdAt} and last updated on {updatedAt}.
</div>

{#if discussion}
	<div class="flex">
		<a
			class="p-1 flex items-center px-4 rounded-full transition-colors duration-300 ease-in-out text-sm text-white
         focus:outline-none focus:ring focus:ring-gray-300 cursor-pointer hover:bg-zinc-700 bg-zinc-800"
			href={discussion}
			target="_blank"
		>
			Discuss this TEP on GitHub <Icon icon="carbon:chat-launch" class="ml-2" />
		</a>
	</div>
{/if}

<Alert type={tepToAlertType[status]} title={tepToAlertTitle[status]}>
	{tepToAlertText[status]}
</Alert>
