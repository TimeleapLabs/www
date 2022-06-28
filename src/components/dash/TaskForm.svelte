<script>
  import Card from "src/components/Card.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import TextArea from "src/components/TextArea.svelte";
  import Select from "src/components/Select.svelte";
  import Button from "src/components/Button.svelte";

  import { SpinLine } from "svelte-loading-spinners";
  import { wallet } from "src/stores/wallet";
  import { ethers } from "ethers";
  import { toast } from "@zerodevx/svelte-toast";
  import { getSyncPrice } from "src/lib/dash/pricing";
  import { getStepOptions, getTimeoutOptions } from "src/lib/dash/blockchain";
  import { parseArg, validateArg } from "src/lib/dash/args";
  import { check, abiValidator } from "src/lib/dash/validators";
  import { makePayment } from "src/lib/dash/payments";

  import CircleQuestion from "src/icons/CircleQuestion.svelte";

  export let showNewTaskForm;
  export let getUserTasks;

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

  const setAddress = () => {
    userAddress = $wallet.accounts?.[0]?.address;
  };

  $: if ($wallet) setAddress();

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
    if (!signature || !Object.keys(iface.events || {}).includes(signature)) {
      signature = Object.keys(iface.events || {}).pop();
    }
  } else {
    signatures = [];
    signature = "";
  }

  $: if (interval && timeout && step && duration) {
    price = getSyncPrice(interval, timeout, duration);
  } else {
    price = 0;
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

  $: if (step && chain && interval) {
    const steps = getStepOptions(chain, interval).map((option) => option.value);
    if (steps[0] > step) {
      step = steps[0];
    } else if (steps[steps.length - 1] < step) {
      step = steps[steps.length - 1];
    }
  }

  $: if (timeout && step) {
    const timeouts = getTimeoutOptions(step).map((option) => option.value);
    if (timeouts[0] > timeout) {
      timeout = timeouts[0];
    } else if (timeouts[timeouts.length - 1] < timeout) {
      timeout = timeouts[timeouts.length - 1];
    }
  }

  let creatingTask = false;
  let task = {};

  $: task = {
    chain,
    fromBlock: Number(fromBlock),
    interval,
    step,
    timeout,
    duration,
    address: contractAddress,
    abi: abiValidator(abi) ? JSON.parse(abi) : undefined,
    signature,
    args,
  };

  const taskFieldNames = {
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

  const createTask = async () => {
    for (const { name, value } of task.args) {
      if (!validateArg(parseArg(value))) {
        return toast.push(`The "${name}" argument has invalid value`);
      }
    }

    if (!check(task, taskFieldNames, taskInvalids, ["address"])) return;

    creatingTask = true;

    const txHash = await makePayment(price, $wallet, userAddress);
    if (!txHash) {
      creatingTask = false;
      return;
    }

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    const timestamp = new Date().valueOf();
    const message = JSON.stringify([task, txHash, timestamp]);
    const signature = await signer.signMessage(message);
    const payload = {
      task,
      txHash,
      signature,
      timestamp,
    };

    const response = await fetch(
      "https://api.kenshi.io/subscriptions/sync/insert",
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
      toast.push("Sync task created successfully");
    }

    creatingTask = false;
    showNewTaskForm = false;
    getUserTasks();
  };
</script>

<Card>
  <div class="header">
    <h3>New Deep Indexing Task</h3>
    <Button
      flat
      href="https://docs.kenshi.io/services/deep-index/sync/getting-started.html"
      target="_blank"
    >
      <CircleQuestion />
    </Button>
  </div>
  <div class="card-inner forms">
    <div class="form">
      <h5>Basics</h5>
      <div class="split">
        <Select
          options={[
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
        placeholder="Duration (Months)"
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
        regex={/^0x[a-f0-9]{40}$/i}
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
        <SpinLine size="32" color="currentColor" unit="px" duration="4s" />
        Processing
      {:else}
        Create Task
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
</style>
