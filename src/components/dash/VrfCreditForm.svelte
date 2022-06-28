<script>
  import Card from "src/components/Card.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import Button from "src/components/Button.svelte";
  import Select from "src/components/Select.svelte";

  import CircleQuestion from "src/icons/CircleQuestion.svelte";

  import { wallet } from "src/stores/wallet";
  import { toast } from "@zerodevx/svelte-toast";
  import { ethers } from "ethers";
  import { SpinLine } from "svelte-loading-spinners";

  import { makeKenshiPayment } from "src/lib/dash/payments";

  export let showNewVrfCreditForm;
  export let getUserVrfCredits;

  let userAddress;
  let credit = "100000";
  let allow = [];
  let chain;

  const setAddress = () => {
    userAddress = $wallet.accounts?.[0]?.address;
  };

  $: if ($wallet) setAddress();

  $: allow = [...allow.filter(Boolean), null];

  let creatingVrfSubscription = false;

  const createVrfSubscription = async () => {
    const vrfRequest = {
      allow: allow.filter(Boolean),
      credit,
      chain,
    };

    if (!chain) {
      return toast.push("Chain is required");
    }

    if (!credit || !ethers.utils.parseUnits(credit, 18).gt("0")) {
      return toast.push("Credit needs to be bigger than 0");
    }

    if (!vrfRequest.allow.length) {
      return toast.push("Contract list cannot be empty");
    }

    creatingVrfSubscription = true;

    const txHash = await makeKenshiPayment(
      ethers.utils.parseUnits(credit, 18),
      $wallet,
      userAddress
    );

    if (!txHash) {
      creatingVrfSubscription = false;
      return;
    }

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    const timestamp = new Date().valueOf();
    const message = JSON.stringify([vrfRequest, txHash, timestamp]);
    const signature = await signer.signMessage(message);
    const payload = { vrf: vrfRequest, txHash, signature, timestamp };

    const response = await fetch(
      "https://api.kenshi.io/subscriptions/vrf/insert",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }
    );

    const { errorMessage, statusCode, body } = await response.json();

    if (errorMessage) {
      toast.push("An unexpected error happened while processing your request");
      console.log({ errorMessage });
    } else if (statusCode !== 200) {
      toast.push(`Server error: ${body}`);
    } else {
      toast.push("VRF subscription created successfully");
      getUserVrfCredits();
    }

    creatingVrfSubscription = false;
    showNewVrfCreditForm = false;
  };
</script>

<Card>
  <div class="header">
    <h3>New VRF subscription</h3>
    <Button
      flat
      href="https://docs.kenshi.io/services/vrf/getting-started.html"
      target="_blank"
    >
      <CircleQuestion />
    </Button>
  </div>
  <div class="card-inner forms">
    <div class="form">
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
      <TextInput
        placeholder="Credit"
        bind:value={credit}
        regex={/^[1-9][0-9]*(\.[1-9][0-9]*)?$/}
        suffix="Kenshi"
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
    <div class="form" />
  </div>
  <div class="buttons">
    <Button on:click={createVrfSubscription} disabled={creatingVrfSubscription}>
      {#if creatingVrfSubscription}
        <SpinLine size="32" color="currentColor" unit="px" duration="4s" />
        Processing
      {:else}
        Create VRF subscription
      {/if}
    </Button>
  </div>
</Card>

<style>
  .header {
    display: flex;
    gap: 1em;
    align-items: center;
    margin-bottom: 1em;
  }
  .header h3 {
    flex: 1;
  }
  h3 {
    margin-top: 0;
    margin-bottom: 0;
  }
  .card-inner {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  .forms {
    gap: 2em;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .buttons {
    margin-top: 2em;
    display: flex;
    gap: 1em;
  }
  h5 {
    margin: 0;
  }
</style>
