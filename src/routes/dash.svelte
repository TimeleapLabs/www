<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  import Card from "src/components/Card.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import TextArea from "src/components/TextArea.svelte";
  import Select from "src/components/Select.svelte";
  import Button from "src/components/Button.svelte";
  import Alert from "src/components/Alert.svelte";

  import Copy from "src/icons/Copy.svelte";
  import ArrowRotateRight from "src/icons/ArrowRotateRight.svelte";

  import { onboard } from "src/lib/onboard";
  import { wallet } from "src/stores/wallet";

  import { toast } from "@zerodevx/svelte-toast";
  import { ethers } from "ethers";
  import { SpinLine } from "svelte-loading-spinners";

  import { fly } from "svelte/transition";

  import External from "src/icons/External.svelte";

  import kenshiAbi from "src/lib/abi/kenshi";

  import { fetchPancake } from "src/lib/api/token";

  const collectorAddress = "";
  const kenshiAddress = "";

  let chain;
  let userAddress;
  let contractAddress;
  let signature;
  let abi;
  let args = [{ name: "", value: "" }];
  let interval;
  let step;
  let timeout;
  let fromBlock;
  let duration;
  let price;

  const getRandomBase64 = (length = 32) =>
    btoa(
      String.fromCharCode.apply(
        null,
        typeof window === "undefined"
          ? []
          : crypto.getRandomValues(new Uint8Array(length))
      )
    );

  let apiKey = getRandomBase64();
  let requests = "100000";
  let apiKeyQueryAllowed = [];
  let graphqlPrice;

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

  let requestEndpoint;
  let requestTimeout;
  let requestInterval;
  let reverseAPIPrice;
  let reverseAPIDuration;
  let query = [];

  $: query = [
    ...query.filter(({ condition, value }) => condition || value),
    { condition: "", value: "" },
  ];

  let showNewTaskForm = false;
  let showNewGraphQLForm = false;
  let showNewWebhookForm = false;

  let userSyncTasks;

  userSyncTasks = [
    {
      chain: "binance-testnet",
      address: "0x8AdA51404F297bF2603912d1606340223c0a7784",
      signature: "Transfer(address,address,uint256)",
      abi: `[ "event Transfer(address indexed from, address indexed to, uint256 amount)" ]`,
      args: [
        { name: "from", value: "" },
        { name: "to", value: "" },
        { name: "amount", value: "" },
      ],
      interval: 5,
      step: 6,
      timeout,
      fromBlock,
      duration: 2,
      expires: new Date(new Date().valueOf() + 86400000 * 30),
    },
  ];

  let iface;

  $: if (abi && abiValidator(abi)) {
    iface = new ethers.utils.Interface(JSON.parse(abi));
  } else {
    iface = null;
  }

  let signatures = [];

  $: if (iface) {
    signatures = Object.keys(iface.events || {}).map((value) => ({
      value,
      label: value,
    }));
    signature ||= Object.keys(iface.events || {}).pop();
  } else {
    signatures = [];
    signature = "";
  }

  const getPrice = (interval, timeout, step, duration) => {
    const storage = 2 + step * 0.1;
    const runs = (30 * 24 * 60 * 60) / interval;
    const ms = runs * timeout;
    return Math.round(duration * (storage + (ms / 3e10) * 62.7) * 100) / 100;
  };

  const getReverseAPIPrice = (interval, timeout, duration) => {
    const runs = (30 * 24 * 60 * 60) / interval;
    const ms = runs * timeout;
    return Math.round(duration * ((ms / 3e10) * 62.7 * 1.2) * 100) / 100;
  };

  $: if (interval && timeout && step && duration) {
    price = getPrice(interval, timeout, step, duration);
  } else {
    price = 0;
  }

  $: if (requestInterval && requestTimeout && reverseAPIDuration) {
    reverseAPIPrice = getReverseAPIPrice(
      requestInterval,
      requestTimeout,
      reverseAPIDuration
    );
  } else {
    reverseAPIPrice = 0;
  }

  $: if (requests) {
    graphqlPrice =
      Math.round((parseInt(requests.replace(/,/g, "")) / 1e6) * 20 * 100) / 100;
  } else {
    graphqlPrice = 0;
  }

  $: if (iface && signature) {
    const { inputs } = iface.events[signature] || {};
    if (inputs) {
      args = inputs.map((input, index) => ({
        name: input.name,
        value: args[index]?.value || "",
      }));
    }
  } else {
    args = [{ name: "", value: "" }];
  }

  $: {
    step = Math.max(
      step,
      Math.min(...getStepOptions(chain, interval).map((option) => option.value))
    );
    timeout = Math.max(
      timeout,
      Math.min(...getTimeoutOptions(step).map((option) => option.value))
    );
  }

  const chainIcons = {
    "avalanche-fuji": "avalanche",
    "polygon-mumbai": "polygon",
    "fantom-testnet": "fantom",
    "binance-testnet": "binance",
  };

  const setAddress = () => {
    userAddress = $wallet.accounts?.[0]?.address;
  };

  $: if ($wallet) setAddress();

  const copy = (text) => () => {
    navigator.clipboard?.writeText?.(text);
    toast.push("Copied to clipboard.");
  };

  const blockTimes = {
    "binance-testnet": 3,
    "fantom-testnet": 1,
    "avalanche-fuji": 3,
    "polygon-mumbai": 2,
  };

  const allStepFunctions = [
    ...new Array(4).fill().map((_, i) => ({
      value: (i + 1) * 6,
      label: `${(i + 1) * 6} blocks at once`,
    })),
    ...new Array(8).fill().map((_, i) => ({
      value: (i + 1) * 12 + 30,
      label: `${(i + 1) * 12 + 30} blocks at once`,
    })),
    ...new Array(4).fill().map((_, i) => ({
      value: (i + 1) * 24 + 126,
      label: `${(i + 1) * 24 + 126} blocks at once`,
    })),
    ...new Array(8).fill().map((_, i) => ({
      value: (i + 1) * 36 + 222,
      label: `${(i + 1) * 36 + 222} blocks at once`,
    })),
  ];

  const getStepOptions = (chain, interval) => {
    if (!chain || !interval) {
      return allStepFunctions;
    }
    const blockTime = blockTimes[chain];
    const minBlocks = (interval / blockTime) * 1.5;
    const maxBlocks = minBlocks * (minBlocks < 10 ? 5 : 3);
    return allStepFunctions
      .filter((option) => option.value > minBlocks)
      .filter((option) => option.value <= maxBlocks);
  };

  const allTimeouts = [
    { label: "After 5 seconds", value: 5000 },
    { label: "After 10 seconds", value: 10000 },
    { label: "After 15 seconds", value: 15000 },
    { label: "After 20 seconds", value: 20000 },
    { label: "After 30 seconds", value: 30000 },
    { label: "After 60 seconds", value: 60000 },
  ];

  const getTimeoutOptions = (step) => {
    if (!step) {
      return allTimeouts;
    }
    return allTimeouts.filter((timeout) => timeout.value > step * 100);
  };

  const parseArg = (arg) =>
    arg.includes(",") ? arg.split(",").map((item) => item.trim()) : arg || null;

  const validateArg = (arg) =>
    Array.isArray(arg)
      ? arg.every(validateArg)
      : arg === null || arg.match(/^0x[0-9a-f]{1,32}$/i);

  let creatingTask = false;
  let task = {};

  $: task = {
    chain,
    fromBlock,
    interval,
    step,
    timeout,
    duration,
    address: contractAddress,
    abi: abiValidator(abi) ? JSON.parse(abi) : undefined,
    signature,
    args: args.map(({ name, value }) => ({ name, value: parseArg(value) })),
  };

  const fieldNames = {
    chain: "Chain",
    address: "Contract address",
    signature: "Signature",
    abi: "ABI",
    args: "Args",
    interval: "Interval",
    step: "Step",
    timeout: "Timeout",
    fromBlock: "Starting block",
    duration: "Duration",
  };

  const taskInvalids = {};

  const usdToKenshi = async (usd) => {
    const { price } = await fetchPancake();
    return price
      ? ethers.utils.parseUnits(Math.ceil(usd / parseFloat(price)).toFixed())
      : NaN;
  };

  const makePayment = async (usd) => {
    const priceInKenshi = await usdToKenshi(usd);

    if (isNaN(priceInKenshi) || priceInKenshi.eq(0)) {
      toast.push("There was an issue calculating the price.");
      return null;
    }

    try {
      await onboard.setChain({ chainId: "0x61" });
    } catch (error) {
      toast.push("Couldn't change to BSC network.");
      return null;
    }

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const kenshi = new ethers.Contract(kenshiAddress, kenshiAbi, provider);
    const balance = await kenshi.balanceOf(userAddress);

    if (priceInKenshi.gt(balance)) {
      toast.push("Balance is lower than the calculated price!");
      return null;
    }

    try {
      const tx = await kenshi.transfer(collectorAddress, priceInKenshi);
      await tx.wait(1);
      return tx.hash;
    } catch (error) {
      toast.push("Payment failed");
      return null;
    }
  };

  const check = (document, fieldNames, invalids) => {
    if (!Object.keys(document).length) {
      toast.push("Please fill in the form first!");
      return false;
    }

    for (const [key, value] of Object.entries(document)) {
      if (!value) {
        toast.push(`${fieldNames[key]} is required.`);
        return false;
      }
    }

    for (const [key, valid] of Object.entries(invalids)) {
      if (!valid) {
        toast.push(`${fieldNames[key]} is invalid.`);
        return false;
      }
    }

    return true;
  };

  const createTask = async () => {
    for (const { name, value } of task.args) {
      if (!validateArg(value)) {
        return toast.push(`The "${name}" argument has invalid value`);
      }
    }

    if (!check(task, fieldNames, taskInvalids)) return;

    creatingTask = true;

    const txHash = await makePayment(price);
    if (!txHash) {
      creatingTask = false;
      return;
    }

    const verificationMessage = JSON.stringify({ task, txHash });
    const signature = await wallet.signMessage(verificationMessage);
    const payload = { task, txHash, signature };

    // To verify: const actualAddress = ethers.utils.verifyMessage(message, signature)

    // Send to the server

    // Report the result to the user

    // Trigger reload user tasks

    creatingTask = false;
  };

  let creatingApiKey = false;
  let apiKeyRequest = {};

  $: apiKeyRequest = {
    key: apiKey,
    requests,
    allow: apiKeyQueryAllowed,
  };

  const apiKeyFieldNames = {
    key: "API key",
    requests: "Requests",
  };

  const apiKeyInvalids = {};

  const createApiKey = async () => {
    if (!check(apiKeyRequest, apiKeyFieldNames, apiKeyInvalids)) return;

    creatingApiKey = true;

    const txHash = await makePayment(graphqlPrice);
    if (!txHash) {
      creatingApiKey = false;
      return;
    }

    const verificationMessage = JSON.stringify({
      graphql: apiKeyRequest,
      txHash,
    });
    const signature = await wallet.signMessage(verificationMessage);
    const payload = { graphql: apiKeyRequest, txHash, signature };

    // SUBMIT

    creatingApiKey = false;
  };

  let creatingWebhook = false;
  let webhookRequest = {};

  $: webhookRequest = {
    endpoint: requestEndpoint,
    interval: requestInterval,
    timeout: requestTimeout,
    duration: reverseAPIDuration,
    query,
  };

  const webhookFieldNames = {
    endpoint: "Endpoint",
    interval: "Interval",
    timeout: "Timeout",
    duration: "Duration",
    query: "Query",
  };

  const webhookInvalids = {};

  const createWebhook = async () => {
    if (!check(webhookRequest, webhookFieldNames, webhookInvalids)) return;

    createWebhook = true;

    const txHash = await makePayment(reverseAPIPrice);
    if (!txHash) {
      creatingWebhook = false;
      return;
    }

    const verificationMessage = JSON.stringify({
      webhook: webhookRequest,
      txHash,
    });

    const signature = await wallet.signMessage(verificationMessage);
    const payload = { webhook: webhookRequest, txHash, signature };

    // SUBMIT

    createWebhook = false;
  };

  const abiValidator = (value) => {
    try {
      const abi = JSON.parse(value);
      return Array.isArray(abi) && new ethers.utils.Interface(abi);
    } catch (error) {
      return false;
    }
  };
</script>

<Navbar />

<div class="page">
  <div class="section">
    <h2>Kenshi Dashboard</h2>
    <div class="deep-index">
      <h3>Deep Index</h3>
      <div class="body">
        <p>
          The Kenshi Deep Index consists of multiple services for retrieving,
          querying and processing blockchain data.
        </p>
        {#if !$wallet?.provider}
          <p>Connect your wallet to continue.</p>
        {/if}
      </div>
      <div class="buttons">
        <Button
          href="https://docs.kenshi.io/services/deep-index/index.html"
          solid
        >
          Docs <External />
        </Button>
        {#if $wallet?.provider}
          <Button on:click={() => (showNewTaskForm = !showNewTaskForm)}>
            New Sync Task
          </Button>
        {/if}
      </div>
    </div>
  </div>

  {#if $wallet?.provider && showNewTaskForm}
    <div class="section" transition:fly={{ y: -32 }}>
      <Card>
        <h3>New Deep Indexing Task</h3>
        <div class="card-inner forms">
          <div class="form">
            <h5>Basics</h5>
            <div class="split">
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
                bind:valid={taskInvalids.fromBlock}
              />
            </div>

            <h5>Schedule</h5>
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
            />
            <Select
              options={getStepOptions(chain, interval)}
              placeholder="Choose sync step"
              bind:value={step}
            />
            <Select
              options={getTimeoutOptions(step)}
              placeholder="Choose a timeout"
              bind:value={timeout}
            />
            <TextInput
              placeholder="Duration"
              name="duration"
              regex={/^[1-9][0-9]*$/}
              bind:value={duration}
              suffix={duration > 1 ? "months" : "month"}
            />
          </div>
          <div class="form">
            <h5>Event details</h5>
            <TextInput
              placeholder="Contract address"
              name="address"
              regex={/^0x[a-f0-9]{16}$/i}
              bind:value={contractAddress}
            />
            <TextArea
              placeholder="Contract ABI"
              name="abi"
              validator={abiValidator}
              bind:value={abi}
            />
            <Select
              options={signatures}
              placeholder="Event signature"
              bind:value={signature}
            />

            <h5>Event Arguments</h5>
            {#each args as arg}
              <div class="split">
                <TextInput placeholder="Argument name" bind:value={arg.name} />
                <TextInput
                  placeholder="Argument value[s], seperated by a comma"
                  bind:value={arg.value}
                  validator={(v) => validateArg(parseArg(v))}
                />
              </div>
            {/each}
          </div>
        </div>
        <div class="buttons">
          <Button on:click={createTask} disabled={creatingTask}>
            {#if creatingTask}
              <SpinLine
                size="32"
                color="currentColor"
                unit="px"
                duration="4s"
              />
              Processing
            {:else}
              Create Task
              {#if price}
                - ${price}
              {/if}
            {/if}
          </Button>
        </div>
      </Card>
    </div>
  {/if}

  {#if $wallet?.provider}
    <div class="section">
      <h3>Your Deep Index Sync tasks</h3>
      <div class="tasks" class:empty={userSyncTasks.length === 0}>
        {#each userSyncTasks as task}
          <Card>
            <div class="body">
              <div class="copy" on:click={copy(task.address)}>
                <Alert>
                  <div class="address">
                    <img
                      src="/images/chains/{chainIcons[task.chain]}.svg"
                      alt={task.chain}
                    />
                    <span>{task.address}</span>
                    <Copy />
                  </div>
                </Alert>
              </div>
              <TextArea value={task.abi} disabled />
              <div class="table">
                <div class="row">
                  <h5>Argument name</h5>
                  <h5>Value</h5>
                </div>
                {#each task.args as arg}
                  <div class="row">
                    <h5>{arg.name}</h5>
                    <div>
                      {#if args.value}
                        {args.value}
                      {:else}
                        <i class="small">Any</i>
                      {/if}
                    </div>
                  </div>
                {/each}
              </div>
              <div>
                Every {task.interval} seconds, {task.step} blocks at a time, expires
                on {task.expires.toLocaleDateString("en-US")}.
              </div>
            </div>
            <div class="buttons">
              <Button>Modify</Button>
              <Button>Recharge</Button>
            </div>
          </Card>
        {:else}
          You don't have any tasks.
        {/each}
      </div>
    </div>
    <div class="section">
      <h3>Your GraphQL API keys</h3>
      <div>
        You do not have any GraphQL API keys at the moment. Create one using the
        button below.
      </div>
      <div class="buttons">
        <Button on:click={() => (showNewGraphQLForm = !showNewGraphQLForm)}>
          New GraphQL API Key
        </Button>
      </div>
    </div>
    {#if showNewGraphQLForm}
      <div class="section">
        <Card>
          <h3>New GraphQL API Key</h3>
          <div class="card-inner forms">
            <div class="form">
              <h5>Basics</h5>
              <TextInput
                plcaeholder="API Key"
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
            </div>
            <div class="form">
              <h5>Limit Queries</h5>
              {#each apiKeyQueryAllowed as q}
                <div
                  class="split"
                  class:triple={["arg-is", "block-number-is"].includes(
                    q.condition
                  )}
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
                  />
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
              Create API key
              {#if graphqlPrice}
                - ${graphqlPrice}
              {/if}
            </Button>
          </div>
        </Card>
      </div>
    {/if}
    <div class="section">
      <h3>Reverse API (Webhooks)</h3>
      <div>
        You don't have any Reverse API endpoints registered at the moment.
        Create one using the button below.
      </div>
      <div class="buttons">
        <Button on:click={() => (showNewWebhookForm = !showNewWebhookForm)}>
          New Reverse API
        </Button>
      </div>
    </div>
  {/if}

  {#if showNewWebhookForm}
    <div class="section">
      <Card>
        <h3>Register new Reverse API endpoint</h3>
        <div class="card-inner forms">
          <div class="form">
            <h5>Basics</h5>
            <TextInput
              placeholder="Endpoint"
              regex={/https?:\/\/.+/}
              bind:value={requestEndpoint}
              bind:valid={webhookInvalids.endpoint}
            />
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
              bind:value={requestInterval}
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
              bind:value={requestTimeout}
              bind:valid={webhookInvalids.timeout}
            />
            <TextInput
              placeholder="Duration"
              bind:value={reverseAPIDuration}
              bind:valid={webhookInvalids.duration}
              suffix={reverseAPIDuration > 1 ? "months" : "month"}
            />
          </div>
          <div class="form">
            <h5>Query</h5>
            {#each query as q}
              <div
                class="split"
                class:triple={["arg-is", "block-number-is"].includes(
                  q.condition
                )}
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
                />
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
            {#if reverseAPIPrice}
              - ${reverseAPIPrice}
            {/if}
          </Button>
        </div>
      </Card>
    </div>
  {/if}

  <div class="spacer" />

  <Footer />
</div>

<style>
  h2 {
    margin-bottom: 1.5em;
  }
  h3 {
    margin-top: 0;
  }
  .page {
    display: flex;
    flex-direction: column;
    min-height: calc(100% - 64px);
    box-sizing: border-box;
  }
  .section {
    padding: 4em;
    padding-top: 0;
  }
  .spacer {
    flex: 1;
  }
  @media screen and (max-width: 960px) {
    .section {
      padding: 2em;
    }
  }
  .no-padding-top {
    padding-top: 0;
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
  a {
    color: black;
  }
  .description {
    margin-bottom: 1em;
    color: #111;
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
    gap: 1em;
  }
  .address span {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
  }
  .tasks {
    margin-top: 2.5em;
  }
  .tasks:not(.empty) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(512px, 1fr));
    gap: 1em;
  }
  .tasks .body {
    display: flex;
    gap: 1em;
    flex-direction: column;
  }
  .tasks .table {
    display: flex;
    flex-direction: column;
  }
  .tasks .table .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0.5em;
  }
  .tasks .table .row:first-of-type {
    padding-bottom: 0.25em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .tasks .table .row:nth-of-type(2n + 1):not(:first-of-type) {
    background: rgba(0, 0, 0, 0.05);
  }
  .small {
    font-size: 0.85em;
  }
  .field-buttons {
    display: flex;
    gap: 0.5em;
  }
</style>
