<script>
  import Card from "src/components/Card.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import TextArea from "src/components/TextArea.svelte";
  import Select from "src/components/Select.svelte";
  import Button from "src/components/Button.svelte";

  import { SpinLine } from "svelte-loading-spinners";
  import { wallet } from "src/stores/wallet";
  import { ethers } from "ethers";
  import { getSyncPrice } from "src/lib/dash/pricing";
  import { getStepOptions, getTimeoutOptions } from "src/lib/dash/blockchain";
  import { parseArg, validateArg } from "src/lib/dash/args";
  import { check, abiValidator } from "src/lib/dash/validators";
  import { makePayment } from "src/lib/dash/payments";

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
    signature ||= Object.keys(iface.events || {}).pop();
  } else {
    signatures = [];
    signature = "";
  }

  $: if (interval && timeout && step && duration) {
    price = getSyncPrice(interval, timeout, step, duration);
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
      if (!validateArg(value)) {
        return toast.push(`The "${name}" argument has invalid value`);
      }
    }

    if (!check(task, taskFieldNames, taskInvalids)) return;

    creatingTask = true;

    const txHash = await makePayment(price, $wallet, userAddress);
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
</script>

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
        <SpinLine size="32" color="currentColor" unit="px" duration="4s" />
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
</style>
