<script>
  import Card from "src/components/Card.svelte";
  import TextArea from "src/components/TextArea.svelte";
  import Button from "src/components/Button.svelte";
  import Alert from "src/components/Alert.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import Select from "src/components/Select.svelte";

  import Copy from "src/icons/Copy.svelte";
  import Xmark from "src/icons/Xmark.svelte";
  import Eye from "src/icons/Eye.svelte";
  import EyeSlash from "src/icons/EyeSlash.svelte";
  import ArrowRotateRight from "src/icons/ArrowRotateRight.svelte";

  import { toast } from "@zerodevx/svelte-toast";
  import { SpinLine } from "svelte-loading-spinners";
  import { parseArg, validateArg } from "src/lib/dash/args";
  import { check } from "src/lib/dash/validators";
  import { ethers } from "ethers";
  import { getSyncPrice } from "src/lib/dash/pricing";
  import { wallet } from "src/stores/wallet";

  import { getGraphQLPrice } from "$lib/dash/pricing";
  import { getRandomBase64 } from "src/lib/dash/random";
  import { makePayment } from "src/lib/dash/payments";
  import { aesGcmDecrypt } from "src/lib/crypto";

  export let graphql;

  const safeJoin = (v) => {
    return Array.isArray(v) ? v.join(", ") : v;
  };

  let apiKey;
  let requests = "100000";
  let allow = (graphql.allow || []).map(safeJoin);

  let unencryptedKey;
  let userAddress;
  let hide = true;

  const setAddress = () => {
    userAddress = $wallet.accounts?.[0]?.address;
  };

  $: if ($wallet) setAddress();

  let showModifyForm = false;
  let showRechargeForm = false;

  $: price = getGraphQLPrice(Number(requests));

  const copy = (text) => () => {
    navigator.clipboard?.writeText?.(text);
    toast.push("Copied to clipboard.");
  };

  const signAndSend = () => {};

  const reveal = async () => {
    const { sharedKey, encryptedKey } = graphql;
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    const signedSharedKey = await signer.signMessage(sharedKey);
    unencryptedKey = await aesGcmDecrypt(encryptedKey, signedSharedKey);
  };

  const toggleDisplay = (event) => {
    event.stopPropagation();
    hide = !hide;
  };

  const conditionNames = {
    "contract-is": "Contract address",
    "arg-is": "Argument",
    "event-name-is": "Event name",
    "event-signature-is": "Event signature",
    "block-number-is": "Block",
  };

  const getFilterValue = (filter) => {
    if (filter.condition === "contract-is") {
      return safeJoin(filter.value);
    }
    if (filter.condition === "arg-is") {
      return `${filter.arg} is ${safeJoin(filter.value)}`;
    }
    if (filter.condition === "event-name-is") {
      return safeJoin(filter.value);
    }
    if (filter.condition === "event-signature-is") {
      return safeJoin(filter.value);
    }
    if (filter.condition === "block-number-is") {
      return filter.comparison === "gt"
        ? `> ${safeJoin(filter.value)}`
        : `< ${safeJoin(filter.value)}`;
    }
  };
</script>

<Card flex>
  {#if showModifyForm}
    <div class="form">
      <div class="header">
        <h4>Modify API key</h4>
        <Button flat on:click={() => (showModifyForm = false)}>
          <Xmark />
        </Button>
      </div>
      <TextInput
        placeholder="API Key (Leave empty to keep)"
        bind:value={apiKey}
      >
        <div class="field-buttons" slot="buttons">
          <Button flat on:click={copy(apiKey)}>
            <Copy />
          </Button>
          <Button flat on:click={() => (apiKey = getRandomBase64())}>
            <ArrowRotateRight />
          </Button>
        </div>
      </TextInput>
    </div>
    <div class="buttons">
      <Button on:click={() => (showModifyForm = false)}>Cancel</Button>
      <Button on:click={signAndSend}>Sign & Send</Button>
    </div>
  {:else if showRechargeForm}
    <div class="form">
      <div class="header">
        <h4>Recharge</h4>
        <Button flat on:click={() => (showRechargeForm = false)}>
          <Xmark />
        </Button>
      </div>
      <div class="form">
        <TextInput
          placeholder="Duration"
          name="duration"
          regex={/^[1-9][0-9]*$/}
          bind:value={requests}
        />
      </div>
    </div>
    <div class="buttons">
      <Button on:click={() => (showRechargeForm = false)}>Cancel</Button>
      <Button on:click={signAndSend}>
        Recharge
        {#if price}
          - ${price}
        {/if}
      </Button>
    </div>
  {:else}
    <div class="body">
      {#if unencryptedKey}
        <div class="copy" on:click={copy(unencryptedKey)}>
          <Alert>
            <div class="key">
              <span>
                {#if hide}
                  ●●●●●●●●●●●●●●●●●●●●●●●●
                {:else}
                  {unencryptedKey}
                {/if}
              </span>
              <Button flat on:click={toggleDisplay}>
                {#if hide}
                  <Eye />
                {:else}
                  <EyeSlash />
                {/if}
              </Button>
              <Copy />
            </div>
          </Alert>
        </div>
      {:else}
        <Alert warning>
          The API key is encrypted. Sign the shared key to reveal.
        </Alert>
      {/if}
      <div class="table">
        <div class="row">
          <h5>Filter</h5>
          <h5>Value</h5>
        </div>
        {#each graphql.allow as filter}
          <div class="row">
            <h5>{conditionNames[filter.condition]}</h5>
            <div>{getFilterValue(filter)}</div>
          </div>
        {:else}
          <div class="row">No filters.</div>
        {/each}
      </div>
      <div class="description">
        A total of {graphql.requests} requests are left.
      </div>
    </div>
    <div class="buttons">
      {#if !unencryptedKey}
        <Button on:click={reveal}>Reveal</Button>
      {/if}
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
  .copy {
    cursor: copy;
  }
  .key :global(svg) {
    height: 1em;
    fill: var(--secondary-color) !important;
  }
  .key {
    display: flex;
    gap: 1em;
  }
  .key span {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
  }
  .body {
    display: flex;
    gap: 1em;
    flex-direction: column;
    flex: 1;
  }
  .table {
    display: flex;
    flex-direction: column;
  }
  .table .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0.5em;
  }
  .table .row:first-of-type {
    padding-bottom: 0.25em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .table .row:nth-of-type(2n + 1):not(:first-of-type) {
    background: rgba(0, 0, 0, 0.05);
  }
  .table .row > div {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .small {
    font-size: 0.85em;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 1em;
    flex: 1;
  }
  .split {
    display: grid;
    grid-template-columns: 1fr 1fr;
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
  }
</style>
