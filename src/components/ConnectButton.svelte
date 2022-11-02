<script>
  import { onboard } from "$lib/onboard";
  import { wallet } from "src/stores/wallet";
  import { onMount } from "svelte";
  import { Button, Truncate, HeaderPanelLink } from "carbon-components-svelte";

  import { Wallet, Logout } from "carbon-icons-svelte";

  export let primary = false;
  export let header = !primary;

  const kind = primary ? "primary" : "ghost";

  const connect = async () => {
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

{#if header}
  <HeaderPanelLink on:click={connect}>
    {#if $wallet?.provider}
      <div class="menu-connect">
        <Truncate>
          {$wallet?.accounts?.[0]?.address || ""}
        </Truncate>
        Logout
      </div>
    {:else}
      Connect
    {/if}
  </HeaderPanelLink>
{:else}
  <Button {kind} on:click={connect} icon={$wallet?.provider ? Logout : Wallet}>
    {#if $wallet?.provider}
      <Truncate>
        {$wallet?.accounts?.[0]?.address || ""}
      </Truncate>
    {:else}
      Connect
    {/if}
  </Button>
{/if}

<style>
  .menu-connect {
    white-space: nowrap;
    display: flex;
    gap: 2em;
    align-items: center;
  }
</style>
