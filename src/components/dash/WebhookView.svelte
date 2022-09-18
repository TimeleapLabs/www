<script>
  import Card from "src/components/Card.svelte";
  import Button from "src/components/Button.svelte";
  import Alert from "src/components/Alert.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import Select from "src/components/Select.svelte";

  import Copy from "src/icons/Copy.svelte";
  import Xmark from "src/icons/Xmark.svelte";
  import TrashCan from "src/icons/TrashCan.svelte";

  import { toast } from "@zerodevx/svelte-toast";
  import { SpinLine } from "svelte-loading-spinners";
  import { ethers } from "ethers";
  import { getReverseAPIPrice } from "src/lib/dash/pricing";
  import { wallet } from "src/stores/wallet";
  import { makePayment } from "src/lib/dash/payments";

  import {
    conditionNames,
    getFilterValue,
    safeJoin,
  } from "src/lib/dash/filter";

  export let webhook;
  export let getUserWebhooks;

  let endpoint = webhook.endpoint;
  let syncTaskId = webhook.syncTaskId;

  let query = (webhook.query || []).map((q) => ({
    ...q,
    value: safeJoin(q.value),
  }));

  $: query = [
    ...query.filter(({ condition, value }) => condition || value),
    { condition: "", value: "" },
  ];

  const deleteQuery = (i) => () => {
    if (i === 0 && query.length === 1) {
      query = { condition: "", value: "" };
    } else {
      query = query.filter((_, index) => index != i);
    }
  };

  let requests = 10000;
  let duration = 1;
  let showModifyForm = false;
  let showRechargeForm = false;

  $: price = getReverseAPIPrice(
    webhook.interval,
    webhook.timeout,
    Number(duration),
    Number(requests)
  );

  let userAddress;

  const setAddress = () => {
    userAddress = $wallet.accounts?.[0]?.address;
  };

  $: if ($wallet) setAddress();

  const chainIcons = {
    "ethereum-mainnet": "ethereum",
    "ethereum-goerli": "ethereum",
    "avalanche-fuji": "avalanche",
    "avalanche-mainnet": "avalanche",
    "polygon-mumbai": "polygon",
    "polygon-mainnet": "polygon",
    "fantom-testnet": "fantom",
    "fantom-mainnet": "fantom",
    "binance-testnet": "binance",
    "binance-mainnet": "binance",
  };

  const copy = (text) => () => {
    navigator.clipboard?.writeText?.(text);
    toast.push("Copied to clipboard.");
  };

  const requiredConditions = [
    "contract-is",
    "arg-is",
    "event-name-is",
    "event-signature-is",
  ];

  let isUpdating = false;

  const signAndSend = async () => {
    const processedQuery = query
      .map((item) => ({
        ...item,
        value: item.value.split(",").map((v) => v.trim()),
      }))
      .filter((item) => item.condition && item.value);

    if (!processedQuery.length) {
      toast.push("Query is required");
      return;
    }

    const conditions = processedQuery.filter((q) =>
      requiredConditions.includes(q.condition)
    );

    if (!conditions.length) {
      toast.push(
        "At least one of contract address, event name, event signature or event argument is required in query"
      );
      return;
    }

    isUpdating = true;

    const webhookRequest = {
      id: webhook.id,
      query: processedQuery,
      endpoint,
      syncTaskId,
    };

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    const timestamp = new Date().valueOf();
    const message = JSON.stringify([webhookRequest, null, timestamp]);
    const signature = await signer.signMessage(message);

    const payload = {
      webhook: webhookRequest,
      txHash: null,
      signature,
      timestamp,
    };

    const response = await fetch(
      "https://api.kenshi.io/subscriptions/webhook/update",
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
      toast.push("Webhook updated successfully");
      showModifyForm = false;
      getUserWebhooks();
    }

    isUpdating = false;
  };

  let isRecharging = false;

  const recharge = async () => {
    if (!Number(duration)) {
      toast.push("Duration is required");
      return;
    }

    if (!Number.isFinite(Number(requests))) {
      toast.push("Requests is required");
      return;
    }

    const webhookRequest = {
      id: webhook.id,
      duration: Number(duration),
      requests: Number(requests),
    };

    isRecharging = true;

    const txHash = await makePayment(price, $wallet, userAddress);
    if (!txHash) {
      isRecharging = false;
      return;
    }

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    const timestamp = new Date().valueOf();
    const message = JSON.stringify([webhookRequest, txHash, timestamp]);
    const signature = await signer.signMessage(message);
    const payload = { webhook: webhookRequest, txHash, signature, timestamp };

    const response = await fetch(
      "https://api.kenshi.io/subscriptions/webhook/recharge",
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
      toast.push("Webhook recharged successfully");
      showRechargeForm = false;
      getUserWebhooks();
    }

    isRecharging = false;
  };
</script>

<div class="wrap">
  <Card>
    {#if showModifyForm}
      <div class="form">
        <div class="header">
          <h4>Modify webhook</h4>
          {#if !isUpdating}
            <Button flat on:click={() => (showModifyForm = false)}>
              <Xmark />
            </Button>
          {/if}
        </div>

        <h5>Basics</h5>
        <TextInput
          placeholder="Endpoint"
          name="endpoint"
          regex={/https?:\/\/.+/}
          bind:value={endpoint}
        />
        <TextInput
          placeholder="Sync Task ID"
          name="syncTaskId"
          suffix="Task ID"
          bind:value={syncTaskId}
        />

        <h5>Query</h5>
        {#each query.map((q, i) => [q, i]) as [q, i]}
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
                <Button flat on:click={deleteQuery(i)}>
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
            <TextInput bind:value={q.value} placeholder="Value" />
          </div>
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
            Recharge for ${price}.
          </div>
          <TextInput
            placeholder="Duration (Months)"
            name="duration"
            regex={/^[1-9][0-9]*$/}
            bind:value={duration}
            suffix={duration > 1 ? "months" : "month"}
          />
          <TextInput
            placeholder="Requests"
            name="requests"
            regex={/^[1-9][0-9]*$/}
            bind:value={requests}
            suffix={requests > 1 ? "requests" : "request"}
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
        <div class="copy" on:click={copy(webhook.endpoint)}>
          <Alert>
            <div class="address">
              <img
                src="/images/chains/{chainIcons[webhook.chain]}.svg"
                alt={webhook.chain}
              />
              <span>{webhook.endpoint}</span>
              <Copy />
            </div>
          </Alert>
        </div>
        <TextInput disabled value={webhook.syncTaskId} suffix="Sync task ID">
          <div class="field-buttons" slot="buttons">
            <Button flat on:click={copy(webhook.syncTaskId)}>
              <Copy />
            </Button>
          </div>
        </TextInput>
        <div class="table">
          <div class="row">
            <h5>Query</h5>
            <h5>Value</h5>
          </div>
          {#each webhook.query as filter}
            <div class="row">
              <h5>{conditionNames[filter.condition]}</h5>
              <div>{getFilterValue(filter)}</div>
            </div>
          {:else}
            <div class="row">No filters.</div>
          {/each}
        </div>
        <div>
          Every {webhook.interval} seconds, {webhook.step} blocks at a time, expires
          on {new Date(webhook.expiresAt).toLocaleDateString("en-US")}.
        </div>
        <div>
          A total of {webhook.requests || 0} requests are left.
        </div>
      </div>
      <div class="buttons">
        <Button on:click={() => (showModifyForm = true)}>Modify</Button>
        <Button on:click={() => (showRechargeForm = true)}>Recharge</Button>
      </div>
    {/if}
  </Card>
</div>

<style>
  .wrap > :global(.card) {
    display: flex;
    flex-direction: column;
  }
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
    flex: 1;
    gap: 1em;
    flex-direction: column;
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
  .field-buttons.delete {
    height: 34px;
  }
</style>
