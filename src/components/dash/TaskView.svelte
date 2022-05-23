<script>
  import Card from "src/components/Card.svelte";
  import TextArea from "src/components/TextArea.svelte";
  import Button from "src/components/Button.svelte";
  import Alert from "src/components/Alert.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import Select from "src/components/Select.svelte";

  import Copy from "src/icons/Copy.svelte";
  import Xmark from "src/icons/Xmark.svelte";

  import { toast } from "@zerodevx/svelte-toast";
  import { SpinLine } from "svelte-loading-spinners";
  import { parseArg, validateArg } from "src/lib/dash/args";
  import { check, abiValidator } from "src/lib/dash/validators";
  import { ethers } from "ethers";
  import { getSyncPrice } from "src/lib/dash/pricing";

  export let task;

  let contractAddress = task.address;
  let abi = JSON.stringify(task.abi);
  let signature = task.signature;
  let args = task.args;
  let unitPrice;
  let duration = 1;

  let showModifyForm = false;
  let showRechargeForm = false;

  $: unitPrice = getSyncPrice(task.interval, task.timeout, task.step, 1);

  const chainIcons = {
    "avalanche-fuji": "avalanche",
    "polygon-mumbai": "polygon",
    "fantom-testnet": "fantom",
    "binance-testnet": "binance",
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

  const signAndSend = () => {};
</script>

<Card>
  {#if showModifyForm}
    <div class="form">
      <div class="header">
        <h4>Modify sync task</h4>
        <Button flat on:click={() => (showModifyForm = false)}>
          <Xmark />
        </Button>
      </div>
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
        <div class="description">
          Recharge for ${unitPrice} per month.
        </div>
        <TextInput
          placeholder="Duration"
          name="duration"
          regex={/^[1-9][0-9]*$/}
          bind:value={duration}
          suffix={duration > 1 ? "months" : "month"}
        />
      </div>
    </div>
    <div class="buttons">
      <Button on:click={() => (showRechargeForm = false)}>Cancel</Button>
      <Button on:click={signAndSend}>
        Recharge
        {#if duration}
          - ${duration * unitPrice}
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
              {#if arg.value}
                {arg.value}
              {:else}
                <i class="small">Any</i>
              {/if}
            </div>
          </div>
        {/each}
      </div>
      <div>
        Every {task.interval} seconds, {task.step} blocks at a time, expires on {new Date(
          task.expiresAt
        ).toLocaleDateString("en-US")}.
      </div>
    </div>
    <div class="buttons">
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
  .body {
    display: flex;
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
  .small {
    font-size: 0.85em;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 1em;
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
</style>
