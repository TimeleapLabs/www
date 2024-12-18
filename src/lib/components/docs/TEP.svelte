<script lang="ts">
	import Alert from '../Alert.svelte';

	const tepToAlertType = {
		draft: 'draft' as const,
		accepted: 'success' as const,
		rejected: 'error' as const,
		implemented: 'success' as const,
		deprecated: 'warning' as const
	};

	const tepToAlertTitle = {
		draft: 'Draft' as const,
		accepted: 'Accepted' as const,
		rejected: 'Rejected' as const,
		implemented: 'Implemented' as const,
		deprecated: 'Deprecated' as const
	};

	const tepToAlertText = {
		draft: 'This TEP is still in draft and has not been accepted yet.' as const,
		accepted: 'This TEP has been accepted and is ready to be implemented.' as const,
		rejected: 'This TEP has been rejected and will not be implemented.' as const,
		implemented: 'This TEP has been implemented and is now available.' as const,
		deprecated: 'This TEP has been deprecated and should not be used.' as const
	};

	export let author: string;
	export let status: 'draft' | 'accepted' | 'rejected' | 'implemented' | 'deprecated';
	export let type: string;
	export let createdAt: string;
	export let updatedAt: string;
</script>

<div>
	This TEP was authored by {author} on {createdAt} and last updated on {updatedAt}.
</div>

<Alert type={tepToAlertType[status]} title={tepToAlertTitle[status]}>
	{tepToAlertText[status]}
</Alert>
