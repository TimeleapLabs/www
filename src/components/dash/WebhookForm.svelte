<script>
  import Card from "src/components/Card.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import Select from "src/components/Select.svelte";
  import Button from "src/components/Button.svelte";

  import { wallet } from "src/stores/wallet";
  import { getReverseAPIPrice } from "$lib/dash/pricing";
  import { check } from "src/lib/dash/validators";
  import { makePayment } from "src/lib/dash/payments";
  import { toast } from "@zerodevx/svelte-toast";

  import TrashCan from "src/icons/TrashCan.svelte";

  import { getStepOptions } from "src/lib/dash/blockchain";

  let userAddress;
  let endpoint;
  let timeout;
  let interval;
  let step;
  let price;
  let duration;
  let chain;
  let fromBlock;
  let syncTaskId;
  let query = [];

  $: if (step) {
    const steps = getStepOptions(chain, interval).map(({ value }) => value);
    if (steps[0] > step) {
      step = steps[0];
    } else if (steps[steps.length - 1] < step) {
      step = steps[steps.length - 1];
    }
  }

  const setAddress = () => {
    userAddress = $wallet.accounts?.[0]?.address;
  };

  $: if ($wallet) setAddress();

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

  $: if (interval && timeout && duration) {
    price = getReverseAPIPrice(interval, timeout, duration);
  } else {
    price = 0;
  }

  let creatingWebhook = false;
  let webhookRequest = {};

  $: webhookRequest = {
    endpoint,
    interval,
    timeout,
    duration,
    chain,
    step,
    fromBlock,
    syncTaskId,
    query: query
      .map((item) => ({
        ...item,
        value: item.value.split(",").map((v) => v.trim()),
      }))
      .filter((item) => item.condition && item.value),
  };

  const webhookFieldNames = {
    endpoint: "Endpoint",
    interval: "Interval",
    timeout: "Timeout",
    duration: "Duration",
    query: "Query",
    chain: "Chain",
    step: "Step",
    fromBlock: "From block",
    syncTaskId: "Sync task ID",
  };

  const webhookInvalids = {};

  const requiredConditions = [
    "contract-is",
    "arg-is",
    "event-name-is",
    "event-signature-is",
  ];

  const createWebhook = async () => {
    if (!webhookRequest.query.length) {
      toast.push("Query is required");
      return;
    }

    const conditions = webhookRequest.query.filter((q) =>
      requiredConditions.includes(q.condition)
    );

    if (!conditions.length) {
      toast.push(
        "At least one of contract address, event name, event signature or event argument is required in query"
      );
      return;
    }

    if (!check(webhookRequest, webhookFieldNames, webhookInvalids)) return;

    createWebhook = true;

    const txHash = await makePayment(price, $wallet, userAddress);
    if (!txHash) {
      creatingWebhook = false;
      return;
    }

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    const timestamp = new Date().valueOf();
    const message = JSON.stringify([webhookRequest, txHash, timestamp]);
    const signature = await signer.signMessage(message);
    const payload = { webhook: webhookRequest, txHash, signature, timestamp };

    // SUBMIT

    createWebhook = false;
  };
</script>

<Card>
  <h3>Register new Reverse API endpoint</h3>
  <div class="card-inner forms">
    <div class="form">
      <h5>Basics</h5>
      <TextInput
        placeholder="Endpoint"
        regex={/https?:\/\/.+/}
        bind:value={endpoint}
        bind:valid={webhookInvalids.endpoint}
      />
      <Select
        options={[
          {
            label: "Avalanche Fuji C-Chain",
            value: "avalanche-fuji",
          },
          {
            label: "Binance Smart Chain Testnet",
            value: "binance-testnet",
          },
          { label: "Fantom Testnet", value: "fantom-testnet" },
          { label: "Polygon Mumbai", value: "polygon-mumbai" },
        ]}
        placeholder="Choose a chain"
        bind:value={chain}
      />
      <TextInput
        placeholder="Starting block"
        name="from"
        regex={/^(0|[1-9][0-9]*)$/}
        bind:value={fromBlock}
        bind:valid={webhookInvalids.fromBlock}
      />
      <TextInput
        placeholder="Sync task ID"
        bind:value={syncTaskId}
        bind:valid={webhookInvalids.syncTaskId}
      />
      <TextInput
        placeholder="Duration"
        bind:value={duration}
        bind:valid={webhookInvalids.duration}
        suffix={duration > 1 ? "months" : "month"}
      />
    </div>
    <div class="form">
      <h5>Scheduling</h5>
      <Select
        options={[
          { label: "Every 5 seconds", value: 5 },
          { label: "Every 10 seconds", value: 10 },
          { label: "Every 15 seconds", value: 15 },
          { label: "Every 20 seconds", value: 20 },
          { label: "Every 30 seconds", value: 30 },
          { label: "Every 45 seconds", value: 45 },
          { label: "Every 1 minute", value: 60 },
          { label: "Every 2 minutes", value: 120 },
          { label: "Every 5 minutes", value: 300 },
        ]}
        placeholder="Choose an interval"
        bind:value={interval}
        bind:valid={webhookInvalids.interval}
      />
      <Select
        options={[
          { label: "After 5 seconds", value: 5000 },
          { label: "After 10 seconds", value: 10000 },
          { label: "After 15 seconds", value: 15000 },
          { label: "After 20 seconds", value: 20000 },
          { label: "After 30 seconds", value: 30000 },
        ]}
        placeholder="Choose a timeout"
        bind:value={timeout}
        bind:valid={webhookInvalids.timeout}
      />
      <Select
        options={getStepOptions(chain, interval)}
        placeholder="Choose step"
        bind:value={step}
        bind:valid={webhookInvalids.step}
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
  </div>
  <div class="buttons">
    <Button>
      Register endpoint
      {#if price}
        - ${price}
      {/if}
    </Button>
  </div>
</Card>

<style>
  h3 {
    margin-top: 0;
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
  .split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
  }
  .split.triple {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .field-buttons {
    display: flex;
    gap: 0.5em;
  }
  .field-buttons.delete {
    height: 34px;
  }
</style>
