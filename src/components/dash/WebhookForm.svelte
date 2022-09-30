<script>
  import Card from "src/components/Card.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import Select from "src/components/Select.svelte";
  import Button from "src/components/Button.svelte";
  import Checkbox from "src/components/Checkbox.svelte";
  import Alert from "src/components/Alert.svelte";

  import { wallet } from "src/stores/wallet";
  import { getReverseAPIPrice } from "$lib/dash/pricing";
  import { check } from "src/lib/dash/validators";
  import { makePayment } from "src/lib/dash/payments";
  import { toast } from "@zerodevx/svelte-toast";
  import { ethers } from "ethers";
  import { SpinLine } from "svelte-loading-spinners";

  import TrashCan from "src/icons/TrashCan.svelte";
  import CircleQuestion from "src/icons/CircleQuestion.svelte";

  export let showNewWebhookForm;
  export let getUserWebhooks;

  let userAddress;
  let endpoint;
  let price;
  let duration = 1;
  let chain;
  let fromBlock;
  let syncTaskId;
  let requests = "1000000";
  let query = [];

  $: {
    const requestsWithComma = parseInt(
      requests.replace(/,/g, "") || "0"
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
    });
    if (requestsWithComma != requests) requests = requestsWithComma;
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

  $: if (requests && duration) {
    price = getReverseAPIPrice(
      Number(duration),
      Number(requests.replace(/,/g, "") || "0")
    );
  } else {
    price = 0;
  }

  let creatingWebhook = false;
  let webhookRequest = {};

  $: webhookRequest = {
    endpoint,
    duration,
    chain,
    fromBlock: Number(fromBlock),
    requests: Number(requests.replace(/,/g, "") || "0"),
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
    duration: "Duration",
    requests: "Requests",
    query: "Query",
    chain: "Chain",
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

    creatingWebhook = true;

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

    const response = await fetch(
      "https://api.kenshi.io/subscriptions/webhook/insert",
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
      toast.push("Webhook created successfully");
      getUserWebhooks();
    }

    creatingWebhook = false;
    showNewWebhookForm = false;
  };
</script>

<Card>
  <div class="header">
    <h3>Register new Reverse API endpoint</h3>
    <Button flat href="/docs/services/deep-index/webhook/start" target="_blank">
      <CircleQuestion />
    </Button>
  </div>
  <div class="card-inner forms">
    <div class="form">
      <h5>Basics</h5>
      <TextInput
        placeholder="Endpoint"
        regex={/https?:\/\/.+/}
        bind:value={endpoint}
        bind:valid={webhookInvalids.endpoint}
        help="The http endpoint you want to receive the notifications on."
      />
      <div class="split">
        <Select
          options={[
            { label: "Ethereum", value: "ethereum-mainnet" },
            { label: "Ethereum Goerli", value: "ethereum-goerli" },
            {
              label: "Avalanche C-Chain",
              value: "avalanche-mainnet",
            },
            {
              label: "Avalanche Fuji C-Chain",
              value: "avalanche-fuji",
            },
            {
              label: "BNB Smart Chain",
              value: "binance-mainnet",
            },
            {
              label: "BNB Smart Chain Testnet",
              value: "binance-testnet",
            },
            { label: "Fantom", value: "fantom-mainnet" },
            { label: "Fantom Testnet", value: "fantom-testnet" },
            { label: "Polygon", value: "polygon-mainnet" },
            { label: "Polygon Mumbai", value: "polygon-mumbai" },
          ]}
          placeholder="Choose a chain"
          bind:value={chain}
        />
        <TextInput
          placeholder="Sync task ID"
          bind:value={syncTaskId}
          bind:valid={webhookInvalids.syncTaskId}
          help="The Sync task ID that corresponds to the events you want to be notified of.
              This is used to keep track of the last block synced into the Kenshi data clusters."
        />
      </div>
      <div class="split">
        <TextInput
          placeholder="Starting block"
          name="from"
          regex={/^(0|[1-9][0-9]*)$/}
          bind:value={fromBlock}
          bind:valid={webhookInvalids.fromBlock}
          help="The block number from which you want to be notified of the events."
        />
        <TextInput
          placeholder="Duration (Months)"
          prefix="Duration"
          bind:value={duration}
          bind:valid={webhookInvalids.duration}
          suffix={duration > 1 ? "months" : "month"}
        />
      </div>
      <TextInput
        placeholder="Requests"
        bind:value={requests}
        bind:valid={webhookInvalids.requests}
        regex={/[1-9]\d*/}
        suffix={Number(requests.replace(/,/g, "") || "0") > 1
          ? "requests"
          : "request"}
        help="The total number of requests you are expecting Kenshi to make to your
              R-API endpoint."
      />
    </div>
    <div class="form">
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
    <Button on:click={createWebhook} disabled={creatingWebhook}>
      {#if creatingWebhook}
        <SpinLine size="32" color="currentColor" unit="px" duration="4s" />
        Processing
      {:else}
        Register endpoint
        {#if price}
          ${price}
        {/if}
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
