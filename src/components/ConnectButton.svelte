<script>
  import { onboard } from "$lib/onboard";
  import { wallet } from "src/stores/wallet";
  import { onMount } from "svelte";

  import Wallet from "src/icons/Wallet.svelte";
  import Portal from "src/icons/Portal.svelte";

  export let isMobile;

  const onclick = async () => {
    if ($wallet?.provider) {
      await onboard.disconnectWallet({ label: $wallet.label });
    } else {
      await onboard.connectWallet();
    }
  };

  const wallets = onboard.state.select("wallets");
  const { unsubscribe } = wallets.subscribe((update) => ([$wallet] = update));

  onMount(() => () => {
    try {
      unsubscribe();
    } catch (error) {}
  });
</script>

<button on:click={onclick}>
  {#if $wallet?.provider}
    {#if !isMobile}
      <span class="address">
        {$wallet?.accounts?.[0]?.address || ""}
      </span>
    {/if}
    <Portal />
    {#if !isMobile}
      Logout
    {/if}
  {:else}
    <Wallet />
    {#if !isMobile}
      Connect
    {/if}
  {/if}
</button>

<style>
  button {
    display: flex;
    font-size: 1em;
    border: none;
    align-items: center;
    justify-content: center;
    padding: 0.4em 1em;
    cursor: pointer;
    background: transparent;
    gap: 0.75em;
  }
  button :global(svg) {
    height: 1em;
  }
  .address {
    width: 60px;
    white-space: pre;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }
</style>
