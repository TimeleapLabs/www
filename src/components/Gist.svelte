<script>
  import { onMount } from "svelte";

  export let src = "";

  const domain = "https://gist.github.com/";

  src = src.slice(src.length - 3) === ".js" ? src : src + ".js";
  src = src.startsWith(domain) ? src : domain + src;

  let css = "";
  let gist;

  const unescape = (string) => JSON.parse(`"${string}"`);

  onMount(async () => {
    const response = await fetch(`/api/gist/?src=${src}`);
    const body = await response.text();
    const lines = body.split("\n");
    css = lines[0].slice(16, -2);
    gist = unescape(lines[1].slice(16, -2));
  });
</script>

<svelte:head>
  {@html css}
</svelte:head>

{#if gist}
  {@html gist}
{/if}
