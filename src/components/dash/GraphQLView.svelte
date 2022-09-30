<script>
  import Card from "src/components/Card.svelte";
  import Button from "src/components/Button.svelte";
  import Alert from "src/components/Alert.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import Select from "src/components/Select.svelte";

  import Copy from "src/icons/Copy.svelte";
  import Xmark from "src/icons/Xmark.svelte";
  import Eye from "src/icons/Eye.svelte";
  import EyeSlash from "src/icons/EyeSlash.svelte";
  import ArrowRotateRight from "src/icons/ArrowRotateRight.svelte";
  import TrashCan from "src/icons/TrashCan.svelte";

  import { toast } from "@zerodevx/svelte-toast";
  import { SpinLine } from "svelte-loading-spinners";
  import { ethers } from "ethers";
  import { wallet } from "src/stores/wallet";

  import { getGraphQLPrice } from "$lib/dash/pricing";
  import { getRandomBase64 } from "src/lib/dash/random";
  import { makePayment } from "src/lib/dash/payments";
  import { aesGcmDecrypt, aesGcmEncrypt } from "src/lib/crypto";

  import {
    safeJoin,
    conditionNames,
    getFilterValue,
  } from "src/lib/dash/filter";

  export let graphql;
  export let getUserApiKeys;

  let apiKey;
  let requests = "100000";

  let allow = (graphql.allow || []).map((a) => ({
    ...a,
    value: safeJoin(a.value),
  }));

  $: allow = [
    ...allow.filter(({ condition, value }) => condition || value),
    { condition: "", value: "" },
  ];

  const deleteQueryLimit = (i) => () => {
    if (i === 0 && allow.length === 1) {
      allow = { condition: "", value: "" };
    } else {
      allow = allow.filter((_, index) => index != i);
    }
  };

  $: {
    const requestsWithComma = parseInt(
      requests.replace(/,/g, "") || "0"
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
    });
    if (requestsWithComma != requests) requests = requestsWithComma;
  }

  let unencryptedKey;
  let userAddress;
  let hide = true;

  let sharedKey = getRandomBase64();
  let signedSharedKey;

  const signSharedKey = async () => {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    signedSharedKey = await signer.signMessage(sharedKey);
  };

  const setAddress = () => {
    userAddress = $wallet.accounts?.[0]?.address;
  };

  $: if ($wallet) setAddress();

  let showModifyForm = false;
  let showRechargeForm = false;

  $: price = getGraphQLPrice(Number(requests.replace(/,/g, "")));

  const copy = (text) => () => {
    navigator.clipboard?.writeText?.(text);
    toast.push("Copied to clipboard.");
  };

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

  let isRecharging = false;

  const recharge = async () => {
    const nRequests = Number(requests.replace(/,/g, ""));

    if (!nRequests) {
      toast.push("You must sign the shared key first.");
      return;
    }

    const apiKeyRequest = { requests: nRequests, id: graphql.id };

    isRecharging = true;

    const txHash = await makePayment(price, $wallet, userAddress);
    if (!txHash) {
      isRecharging = false;
      return;
    }

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    const timestamp = new Date().valueOf();
    const message = JSON.stringify([apiKeyRequest, txHash, timestamp]);
    const signature = await signer.signMessage(message);
    const payload = { graphql: apiKeyRequest, txHash, signature, timestamp };

    const response = await fetch(
      "https://api.kenshi.io/subscriptions/graphql/recharge",
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
      toast.push("API key recharged successfully");
      showRechargeForm = false;
      getUserApiKeys();
    }

    isRecharging = false;
  };

  let isUpdating;

  const signAndSend = async () => {
    if (apiKey && !signedSharedKey) {
      toast.push("You must sign the shared key first.");
      return;
    }

    const apiKeyRequest = {
      id: graphql.id,
      allow: allow
        .map((item) => ({
          ...item,
          value: item.value.split(",").map((v) => v.trim()),
        }))
        .filter((item) => item.condition && item.value),
    };

    if (apiKey) {
      apiKeyRequest.key = apiKey;
      apiKeyRequest.sharedKey = sharedKey;
      apiKeyRequest.encryptedKey = await aesGcmEncrypt(apiKey, signedSharedKey);
    }

    isUpdating = true;

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    const timestamp = new Date().valueOf();
    const message = JSON.stringify([apiKeyRequest, null, timestamp]);
    const signature = await signer.signMessage(message);

    const payload = {
      graphql: apiKeyRequest,
      txHash: null,
      signature,
      timestamp,
    };

    const response = await fetch(
      "https://api.kenshi.io/subscriptions/graphql/update",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }
    );

    const { errorMessage, statusCode, body } = await response.json();

    if (errorMessage) {
      console.log({ errorMessage, body });
      toast.push("An unexpected error happened while processing your request");
    } else if (statusCode !== 200) {
      toast.push(`Server error: ${body}`);
    } else {
      toast.push("API key updated successfully");
      showModifyForm = false;
      getUserApiKeys();
    }

    isUpdating = false;
  };
</script>

<Card flex>
  {#if showModifyForm}
    <div class="form">
      <div class="header">
        <h4>Modify API key</h4>
        {#if !isUpdating}
          <Button flat on:click={() => (showModifyForm = false)}>
            <Xmark />
          </Button>
        {/if}
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
      <h5>Limit Queries</h5>
      {#each allow.map((q, i) => [q, i]) as [q, i]}
        <div
          class="split"
          class:triple={["arg-is", "block-number-is"].includes(q.condition)}
        >
          <Select
            options={[
              { label: "Contract address is", value: "contract-is" },
              { label: "Event argument is", value: "arg-is" },
              { label: "Event name is", value: "event-name-is" },
              {
                label: "Event signature is",
                value: "event-signature-is",
              },
              {
                label: "Block number is",
                value: "block-number-is",
              },
            ]}
            placeholder="Choose a condition"
            bind:value={q.condition}
          >
            <div class="field-buttons delete" slot="prefix">
              <Button flat on:click={deleteQueryLimit(i)}>
                <TrashCan />
              </Button>
            </div>
          </Select>
          {#if q.condition === "arg-is"}
            <TextInput bind:value={q.arg} placeholder="Argument name" />
          {:else if q.condition === "block-number-is"}
            <Select
              options={[
                { label: "Bigger than", value: "gt" },
                { label: "Smaller than", value: "lt" },
              ]}
              placeholder="Choose comparison"
              bind:value={q.comparison}
            />
          {/if}
          <TextInput bind:value={q.value} placeholder="Value[s]" />
        </div>
      {/each}
    </div>
    <div class="buttons">
      {#if !isUpdating}
        <Button on:click={() => (showModifyForm = false)}>Cancel</Button>
      {/if}
      {#if apiKey && !signedSharedKey}
        <Button on:click={signSharedKey}>Sign shared key</Button>
      {:else}
        <Button on:click={signAndSend} disabled={isUpdating}>
          {#if isUpdating}
            <SpinLine size="32" color="currentColor" unit="px" duration="4s" />
            Processing
          {:else}
            Sign & Send
          {/if}
        </Button>
      {/if}
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
        <TextInput
          placeholder="Duration (Months)"
          name="duration"
          regex={/^[1-9][0-9,]*$/}
          bind:value={requests}
          suffix="requests"
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
          {#if price}
            ${price}
          {/if}
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
  @media (max-width: 640px) {
    .split {
      grid-template-columns: 1fr;
    }
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
  .field-buttons.delete {
    height: 34px;
  }
</style>
