<script>
  import Card from "src/components/Card.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import Select from "src/components/Select.svelte";
  import Button from "src/components/Button.svelte";
  import Alert from "src/components/Alert.svelte";

  import Copy from "src/icons/Copy.svelte";
  import TrashCan from "src/icons/TrashCan.svelte";
  import ArrowRotateRight from "src/icons/ArrowRotateRight.svelte";
  import CircleQuestion from "src/icons/CircleQuestion.svelte";

  import { wallet } from "src/stores/wallet";
  import { toast } from "@zerodevx/svelte-toast";
  import { aesGcmEncrypt } from "src/lib/crypto";
  import { ethers } from "ethers";
  import { SpinLine } from "svelte-loading-spinners";

  import { getGraphQLPrice } from "src/lib/dash/pricing";
  import { getRandomBase64 } from "src/lib/dash/random";
  import { check } from "src/lib/dash/validators";
  import { makePayment } from "src/lib/dash/payments";

  export let showNewGraphQLForm;
  export let getUserApiKeys;

  let userAddress;
  let apiKey = getRandomBase64();
  let sharedKey = getRandomBase64();
  let requests = "100000";
  let apiKeyQueryAllowed = [];
  let graphqlPrice;

  const setAddress = () => {
    userAddress = $wallet.accounts?.[0]?.address;
  };

  $: if ($wallet) setAddress();

  $: apiKeyQueryAllowed = [
    ...apiKeyQueryAllowed.filter(({ condition, value }) => condition || value),
    { condition: "", value: "" },
  ];

  $: {
    const requestsWithComma = parseInt(
      requests.replace(/,/g, "") || "0"
    ).toLocaleString("en-US", {
      minimumFractionDigits: 0,
    });
    if (requestsWithComma != requests) requests = requestsWithComma;
  }

  $: if (requests) {
    graphqlPrice = getGraphQLPrice(parseInt(requests.replace(/,/g, "")));
  } else {
    graphqlPrice = 0;
  }

  let creatingApiKey = false;
  let signedSharedKey;

  const apiKeyFieldNames = {
    key: "API key",
    requests: "Requests",
    sharedKey: "Shared key",
    encryptedKey: "Encrypted API key",
  };

  const apiKeyInvalids = {};

  const deleteQueryLimit = (i) => () => {
    if (i === 0 && apiKeyQueryAllowed.length === 1) {
      apiKeyQueryAllowed = { condition: "", value: "" };
    } else {
      apiKeyQueryAllowed = apiKeyQueryAllowed.filter((_, index) => index != i);
    }
  };

  const createApiKey = async () => {
    if (!signedSharedKey) {
      toast.push("You must sign the shared key first.");
      return;
    }

    const apiKeyRequest = {
      key: apiKey,
      requests,
      allow: apiKeyQueryAllowed
        .map((item) => ({
          ...item,
          value: item.value.split(",").map((v) => v.trim()),
        }))
        .filter((item) => item.condition && item.value),
      sharedKey,
      encryptedKey: await aesGcmEncrypt(apiKey, signedSharedKey),
    };

    if (!check(apiKeyRequest, apiKeyFieldNames, apiKeyInvalids)) return;

    creatingApiKey = true;

    const txHash = await makePayment(graphqlPrice, $wallet, userAddress);
    if (!txHash) {
      creatingApiKey = false;
      return;
    }

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    const timestamp = new Date().valueOf();
    const message = JSON.stringify([apiKeyRequest, txHash, timestamp]);
    const signature = await signer.signMessage(message);
    const payload = { graphql: apiKeyRequest, txHash, signature, timestamp };

    const response = await fetch(
      "https://api.kenshi.io/subscriptions/graphql/insert",
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
      toast.push("API key created successfully");
      getUserApiKeys();
    }

    creatingApiKey = false;
    showNewGraphQLForm = false;
  };

  const signSharedKey = async () => {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    signedSharedKey = await signer.signMessage(sharedKey);
  };

  const copy = (text) => () => {
    navigator.clipboard?.writeText?.(text);
    toast.push("Copied to clipboard.");
  };
</script>

<Card>
  <div class="header">
    <h3>New GraphQL API Key</h3>
    <Button
      flat
      href="https://docs.kenshi.io/services/deep-index/graphql/getting-started.html"
      target="_blank"
    >
      <CircleQuestion />
    </Button>
  </div>
  <div class="card-inner forms">
    <div class="form">
      <h5>Basics</h5>
      <TextInput
        placeholder="API Key"
        bind:value={apiKey}
        bind:invalid={apiKeyInvalids.key}
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
      <TextInput
        bind:value={requests}
        bind:valid={apiKeyInvalids.requests}
        regex={/[1-9][0-9,]*/}
        placeholder="Requests"
        suffix="Requests"
      />
      {#if signedSharedKey}
        <Alert>
          Please note the prices are approximate and you might get more or less
          requests based on how the prices change while we process your request
        </Alert>
      {/if}
    </div>
    <div class="form">
      <h5>Limit Queries</h5>
      {#each apiKeyQueryAllowed.map((q, i) => [q, i]) as [q, i]}
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
  </div>
  <div class="buttons">
    {#if !signedSharedKey}
      <Button on:click={signSharedKey}>Sign shared key</Button>
    {:else}
      <Button on:click={createApiKey} disabled={creatingApiKey}>
        {#if creatingApiKey}
          <SpinLine size="32" color="currentColor" unit="px" duration="4s" />
          Processing
        {:else}
          Create API key
          {#if graphqlPrice}
            ${graphqlPrice}
          {/if}
        {/if}
      </Button>
    {/if}
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
