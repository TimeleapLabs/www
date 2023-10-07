<script>
  import Card from "./Card.svelte";
  import Button from "./Button.svelte";

  import Copy from "src/icons/Copy.svelte";
  import FileArrowDown from "src/icons/FileArrowDown.svelte";

  import { toast } from "@zerodevx/svelte-toast";

  export let title;
  export let download;

  let codeEl;

  const copy = () => {
    const text = codeEl.innerText;
    navigator.clipboard?.writeText?.(text);
    toast.push("Copied to clipboard.");
  };
</script>

{#if title}
  <Card flat padding={false}>
    <div class="title">
      <Button flat on:click={copy}>
        <span class="copy">
          <Copy />
          {title}
        </span>
      </Button>
      <div class="flex-spacer" />
      {#if download}
        <a href={download} download=""> <FileArrowDown /> </a>
      {/if}
    </div>
    <div class="code" bind:this={codeEl}>
      <slot />
    </div>
  </Card>
{:else}
  <slot />
{/if}

<style>
  .title {
    padding: 0.75em 1em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
  }
  .flex-spacer {
    flex: 1;
  }
  .copy {
    display: flex;
    gap: 1em;
    color: #333;
    cursor: copy;
  }
  .code {
    padding: 1em;
    overflow: auto;
  }
  .code :global(pre) {
    margin-top: 0;
  }
  .title :global(svg) {
    height: 1em;
  }
</style>
