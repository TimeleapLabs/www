<script>
  import Card from "src/components/Card.svelte";
  import TextArea from "src/components/TextArea.svelte";
  import Button from "src/components/Button.svelte";
  import Alert from "src/components/Alert.svelte";
  import TextInput from "src/components/TextInput.svelte";

  import Copy from "src/icons/Copy.svelte";
  import Xmark from "src/icons/Xmark.svelte";
  import CreditCard from "src/icons/CreditCard.svelte";
  import CalendarX from "src/icons/CalendarX.svelte";

  import { toast } from "@zerodevx/svelte-toast";
  import { SpinLine } from "svelte-loading-spinners";
  import { check, abiValidator } from "src/lib/dash/validators";
  import { ethers } from "ethers";
  import { wallet } from "src/stores/wallet";
  import { getSyncPrice } from "src/lib/dash/pricing";
  import { makePayment } from "src/lib/dash/payments";

  export let task;
  export let getUserTasks;

  let contractAddress = task.address;
  let abi = JSON.stringify(task.abi);
  let unitPrice;
  let duration = 1;
  let userAddress;
  let expiresAt = new Date(task.expiresAt).toLocaleDateString("en-US");

  const setAddress = () => {
    userAddress = $wallet.accounts?.[0]?.address;
  };

  $: if ($wallet) setAddress();

  let showModifyForm = false;
  let showRechargeForm = false;

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

  let iface;

  $: if (abi && abiValidator(abi)) {
    iface = new ethers.utils.Interface(JSON.parse(abi));
  } else {
    iface = null;
  }

  const tierMap = {
    15: "Basic",
    10: "Growth",
    5: "Business",
    1: "Enterprise",
  };

  $: unitPrice = getSyncPrice(tierMap[task.interval].toLowerCase(), 1);

  const taskFieldNames = {
    address: "Contract address",
    abi: "ABI",
  };

  const taskInvalids = {};
  let isUpdating = false;
  let taskUpdate = {};

  $: taskUpdate = {
    id: task.id,
    address: contractAddress,
    abi: abiValidator(abi) ? JSON.parse(abi) : undefined,
  };

  const signAndSend = async () => {
    if (!check(taskUpdate, taskFieldNames, taskInvalids, ["address"])) return;

    isUpdating = true;

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    const timestamp = new Date().valueOf();
    const message = JSON.stringify([taskUpdate, null, timestamp]);
    const signature = await signer.signMessage(message);

    const payload = {
      task: taskUpdate,
      txHash: null,
      signature,
      timestamp,
    };

    const response = await fetch(
      "https://api.kenshi.io/subscriptions/sync/update",
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
      toast.push("Sync task updated successfully");
      showModifyForm = false;
      getUserTasks();
    }

    isUpdating = false;
  };

  let isRecharging = false;

  const recharge = async () => {
    if (!Number(duration)) {
      toast.push("Duration is required");
    }

    isRecharging = true;

    const txHash = await makePayment(
      Number(duration) * unitPrice,
      $wallet,
      userAddress
    );

    if (!txHash) {
      isRecharging = false;
      return;
    }

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    const timestamp = new Date().valueOf();
    const _task = { id: task.id };
    const message = JSON.stringify([_task, txHash, timestamp]);
    const signature = await signer.signMessage(message);

    const payload = {
      task: _task,
      txHash,
      signature,
      timestamp,
    };

    const response = await fetch(
      "https://api.kenshi.io/subscriptions/sync/recharge",
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
      toast.push("Sync task recharged successfully");
      showRechargeForm = false;
      getUserTasks();
    }

    isRecharging = false;
  };
</script>

<Card>
  {#if showModifyForm}
    <div class="form">
      <div class="header">
        <h4>Modify sync task</h4>
        {#if !isUpdating}
          <Button flat on:click={() => (showModifyForm = false)}>
            <Xmark />
          </Button>
        {/if}
      </div>
      <h5>Event details</h5>
      <TextInput
        placeholder="Contract address"
        name="address"
        regex={/^0x[a-f0-9]{40}$/i}
        bind:value={contractAddress}
        bind:valid={taskInvalids.address}
      />
      <TextArea
        placeholder="Contract ABI"
        name="abi"
        validator={abiValidator}
        bind:value={abi}
        bind:valid={taskInvalids.abi}
      />
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
          Recharge for ${unitPrice} per month.
        </div>
        <TextInput
          placeholder="Duration (Months)"
          name="duration"
          regex={/^[1-9][0-9]*$/}
          bind:value={duration}
          suffix={duration > 1 ? "months" : "month"}
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
          {#if duration}
            ${Number(duration) * unitPrice}
          {/if}
        {/if}
      </Button>
    </div>
  {:else}
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
      <TextInput disabled value={task.id} suffix="Task ID">
        <div class="field-buttons" slot="buttons">
          <Button flat on:click={copy(task.id)}>
            <Copy />
          </Button>
        </div>
      </TextInput>
      <div class="split">
        <TextInput icon={CreditCard} disabled value={tierMap[task.interval]} />
        <TextInput
          icon={CalendarX}
          disabled
          value={"Expires at " + expiresAt}
        />
      </div>
      <TextArea value={task.abi} disabled />
    </div>
    <div class="buttons">
      <Button on:click={() => (showModifyForm = true)}>Modify</Button>
      <Button on:click={() => (showRechargeForm = true)}>Recharge</Button>
    </div>
  {/if}
</Card>

<style>
  .split {
    display: grid;
    grid-template-columns: 1fr 1fr;
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
    gap: 1em;
    flex-direction: column;
  }
  .form {
    display: flex;
    flex-direction: column;
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
</style>
