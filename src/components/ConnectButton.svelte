<script>
  import { onboard } from "$lib/onboard";
  import Arrow from "src/icons/Arrow.svelte";
</script>

<button on:click={() => onboard.walletSelect()}>
  Connect Wallet <Arrow />
</button>

<style>
  button {
    display: flex;
    gap: 0.5em;
    font-size: 1em;
    border-radius: 1em;
    border: 1px solid rgba(0, 0, 0, 0.1);
    align-items: center;
    padding: 0.4em 1em;
    cursor: pointer;
  }
  button :global(svg) {
    height: 1em;
  }
</style>
