<script lang="ts">
	import mermaidJs from 'mermaid';

	export let code: string;
	const randomId = Math.random().toString(36).substring(7);

	const mermaid = (node: HTMLElement) => {
		mermaidJs.initialize({
			startOnLoad: true,
			theme: 'dark'
		});
		mermaidJs.render(`mermaid-${randomId}`, code, node).then((result) => {
			node.innerHTML = result.svg;
		});

		return {
			destroy() {}
		};
	};
</script>

<div use:mermaid></div>
