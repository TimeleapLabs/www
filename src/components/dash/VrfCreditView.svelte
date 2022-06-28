<script>
  import Card from "src/components/Card.svelte";
  import Button from "src/components/Button.svelte";
  import Alert from "src/components/Alert.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import Select from "src/components/Select.svelte";

  import Copy from "src/icons/Copy.svelte";
  import Xmark from "src/icons/Xmark.svelte";

  import { toast } from "@zerodevx/svelte-toast";
  import { SpinLine } from "svelte-loading-spinners";
  import { ethers } from "ethers";
  import { wallet } from "src/stores/wallet";
  import { makeKenshiPayment } from "src/lib/dash/payments";

  export let vrf;
  export let getUserVrfCredits;

  let chain = vrf.chain;
  let credit = "100000";
  let allow = [...vrf.allow];

  $: allow = [...allow.filter(Boolean), null];

  $: creditDisplay = ethers.utils
    .formatUnits(vrf.credit, 18)
    .split(".")
    .shift();

  let showModifyForm = false;
  let showRechargeForm = false;
  let userAddress;

  const setAddress = () => {
    userAddress = $wallet.accounts?.[0]?.address;
  };

  $: if ($wallet) setAddress();

  const chainIcons = {
    "avalanche-mainnet": "avalanche",
    "polygon-mainnet": "polygon",
    "fantom-mainnet": "fantom",
    "binance-mainnet": "binance",
  };

  const chainNames = {
    "avalanche-mainnet": "Avalanche Mainnet",
    "polygon-mainnet": "Polygon Mainnet",
    "fantom-mainnet": "Fantom Mainnet",
    "binance-mainnet": "BNB Smart Chain Mainnet",
  };

  let isUpdating = false;

  const signAndSend = async () => {
    const vrfRequest = {
      id: vrf.id,
      allow: allow.filter(Boolean),
      chain,
    };

    isUpdating = true;

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    const timestamp = new Date().valueOf();
    const message = JSON.stringify([vrfRequest, null, timestamp]);
    const signature = await signer.signMessage(message);

    const payload = {
      vrf: vrfRequest,
      txHash: null,
      signature,
      timestamp,
    };

    const response = await fetch(
      "https://api.kenshi.io/subscriptions/vrf/update",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }
    );

    const { errorMessage, statusCode, body } = await response.json();

    if (errorMessage) {
      toast.push("An unexpected error happened while processing your request");
    } else if (statusCode !== 200) {
      toast.push(`Server error: ${body}`);
    } else {
      toast.push("VRF subscription updated successfully");
      showModifyForm = false;
      getUserVrfCredits();
    }

    isUpdating = false;
  };

  let isRecharging = false;

  const recharge = async () => {
    if (!credit || !ethers.utils.parseUnits(credit, 18).gt(0)) {
      toast.push("Credit should be bigger than 0");
      return;
    }

    const vrfRequest = { id: vrf.id, credit };

    isRecharging = true;

    const txHash = await makeKenshiPayment(
      ethers.utils.parseUnits(credit, 18),
      $wallet,
      userAddress
    );

    if (!txHash) {
      isRecharging = false;
      return;
    }

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    const timestamp = new Date().valueOf();
    const message = JSON.stringify([vrfRequest, txHash, timestamp]);
    const signature = await signer.signMessage(message);
    const payload = { vrf: vrfRequest, txHash, signature, timestamp };

    const response = await fetch(
      "https://api.kenshi.io/subscriptions/vrf/recharge",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }
    );

    const { errorMessage, statusCode, body } = await response.json();

    if (errorMessage) {
      console.log({ body, errorMessage });
      toast.push("An unexpected error happened while processing your request");
    } else if (statusCode !== 200) {
      toast.push(`Server error: ${body}`);
    } else {
      toast.push("VRF subscription recharged successfully");
      showRechargeForm = false;
      getUserVrfCredits();
    }

    isRecharging = false;
  };

  const copy = (text) => () => {
    navigator.clipboard?.writeText?.(text);
    toast.push("Copied to clipboard.");
  };
</script>

<Card>
  {#if showModifyForm}
    <div class="form">
      <div class="header">
        <h4>Modify VRF subscription</h4>
        {#if !isUpdating}
          <Button flat on:click={() => (showModifyForm = false)}>
            <Xmark />
          </Button>
        {/if}
      </div>
      <h5>Basics</h5>
      <Select
        options={[
          {
            label: "Avalanche C-Chain",
            value: "avalanche-mainnet",
          },
          {
            label: "BNB Smart Chain",
            value: "binance-mainnet",
          },
          { label: "Fantom", value: "fantom-mainnet" },
          { label: "Polygon", value: "polygon-mainnet" },
        ]}
        placeholder="Choose a chain"
        bind:value={chain}
      />
      <h5>Allowed contracts</h5>
      {#each allow.map((_, i) => i) as i}
        <TextInput
          placeholder="Contract address"
          bind:value={allow[i]}
          regex={/^0x[a-fA-F0-9]{40}$/}
        />
      {/each}
    </div>
    <div class="buttons">
      {#if !isUpdating}
        <Button on:click={() => (showModifyForm = false)}>Cancel</Button>
      {/if}
      <Button on:click={signAndSend} disabled={isUpdating}>
        {#if isUpdating}
          <SpinLine size="32" color="currentColor" unit="px" duration="4s" />
          Processing
        {:else}
          Sign & Send
        {/if}
      </Button>
    </div>
  {:else if showRechargeForm}
    <div class="form">
      <div class="header">
        <h4>Recharge</h4>
        {#if !isRecharging}
          <Button flat on:click={() => (showRechargeForm = false)}>
            <Xmark />
          </Button>
        {/if}
      </div>
      <div class="form">
        <div class="description">
          Select the amount you want to add to this subscription.
        </div>
        <TextInput
          placeholder="Credit"
          bind:value={credit}
          regex={/^[1-9][0-9]*(\.[1-9][0-9]*)?$/}
          suffix="Kenshi"
        />
      </div>
    </div>
    <div class="buttons">
      {#if !isRecharging}
        <Button on:click={() => (showRechargeForm = false)}>Cancel</Button>
      {/if}
      <Button on:click={recharge} disabled={isRecharging}>
        {#if isRecharging}
          <SpinLine size="32" color="currentColor" unit="px" duration="4s" />
          Processing
        {:else}
          Recharge
        {/if}
      </Button>
    </div>
  {:else}
    <div class="body">
      <Alert>
        <div class="address">
          <img
            src="/images/chains/{chainIcons[vrf.chain]}.svg"
            alt={vrf.chain}
          />
          <span>{chainNames[vrf.chain]}</span>
        </div>
      </Alert>
      <h5>Allowed contracts</h5>
      {#each vrf.allow as contract}
        <TextInput disabled value={contract}>
          <div class="field-buttons" slot="buttons">
            <Button flat on:click={copy(contract)}>
              <Copy />
            </Button>
          </div>
        </TextInput>
      {/each}
      <div>
        {creditDisplay} Kenshi available in this subscription.
      </div>
    </div>
    <div class="buttons">
      <Button on:click={() => (showModifyForm = true)}>Modify</Button>
      <Button on:click={() => (showRechargeForm = true)}>Recharge</Button>
    </div>
  {/if}
</Card>

<style>
  .buttons {
    margin-top: 2em;
    display: flex;
    gap: 1em;
  }
  h5 {
    margin: 0;
  }
  .address :global(svg),
  .address img {
    height: 1em;
  }
  .address {
    display: flex;
    gap: 0.75em;
    align-items: center;
  }
  .address span {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
  }
  .body {
    display: flex;
    gap: 1em;
    flex-direction: column;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .header {
    display: flex;
    gap: 1em;
  }
  .header h4 {
    flex: 1;
    margin: 0;
  }
  .field-buttons {
    display: flex;
    gap: 0.5em;
    margin-right: 0.25em;
    color: var(--secondary-color) !important;
  }
</style>
