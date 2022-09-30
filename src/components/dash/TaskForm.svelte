<script>
  import Card from "src/components/Card.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import TextArea from "src/components/TextArea.svelte";
  import Select from "src/components/Select.svelte";
  import Button from "src/components/Button.svelte";

  import CircleCheck from "src/icons/CircleCheck.svelte";
  import CircleDashed from "src/icons/CircleDashed.svelte";
  import Db from "src/icons/DB.svelte";
  import CreditCard from "src/icons/CreditCard.svelte";
  import Timer from "src/icons/Timer.svelte";
  import MessageCode from "src/icons/MessageCode.svelte";

  import GaugeMax from "src/icons/GaugeMax.svelte";
  import GaugeHigh from "src/icons/GaugeHigh.svelte";
  import GaugeMed from "src/icons/GaugeMed.svelte";
  import GaugeLow from "src/icons/GaugeLow.svelte";

  import { SpinLine } from "svelte-loading-spinners";
  import { wallet } from "src/stores/wallet";
  import { ethers } from "ethers";
  import { toast } from "@zerodevx/svelte-toast";
  import { check, abiValidator } from "src/lib/dash/validators";
  import { makePayment } from "src/lib/dash/payments";
  import { getSyncPrice } from "src/lib/dash/pricing";

  import CircleQuestion from "src/icons/CircleQuestion.svelte";

  export let showNewTaskForm;
  export let getUserTasks;

  let chain;
  let userAddress;
  let contractAddress;
  let abi;
  let fromBlock;
  let duration = 1;
  let tier = "business";

  const selectTier = (t) => () => (tier = t);

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

  let creatingTask = false;
  let task = {};

  $: task = {
    chain,
    fromBlock: Number(fromBlock),
    duration,
    address: contractAddress,
    abi: abiValidator(abi) ? JSON.parse(abi) : undefined,
    tier,
  };

  const taskFieldNames = {
    chain: "Chain",
    address: "Contract address",
    abi: "ABI",
    fromBlock: "Starting block",
    duration: "Duration",
    tier: "Tier",
  };

  const taskInvalids = {};

  const createTask = async () => {
    if (!check(task, taskFieldNames, taskInvalids, ["address"])) return;

    creatingTask = true;

    const price = getSyncPrice(tier, Number(duration));
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
    <Button flat href="/docs/services/deep-index/sync/start" target="_blank">
      <CircleQuestion />
    </Button>
  </div>
  <div class="card-inner forms">
    <div class="form">
      <h5>Basics</h5>
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
          placeholder="Starting block"
          name="from"
          help="The block number Kenshi starts with to look for your events on the blockchain."
          regex={/^(0|[1-9][0-9]*)$/}
          bind:value={fromBlock}
          bind:valid={taskInvalids.fromBlock}
        />
      </div>
      <TextInput
        placeholder="Duration (Months)"
        name="duration"
        prefix="Duration"
        regex={/^[1-9][0-9]*$/}
        bind:value={duration}
        suffix={duration > 1 ? "months" : "month"}
      />
    </div>
    <div class="form">
      <h5>Contract details</h5>
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
    </div>
  </div>
  <div class="tiers">
    <div
      class="tier"
      class:selected={tier === "startup"}
      on:click={selectTier("startup")}
    >
      <div class="name">
        {#if tier === "startup"}
          <span class="green">
            <CircleCheck />
          </span>
        {:else}
          <span class="grey">
            <CircleDashed />
          </span>
        {/if}
        Startup
      </div>
      <div class="stats">
        <div class="stat">
          <span class="name"><Db /> Storage</span>
          <span class="spacer" />
          <span class="value">2 Gb</span>
        </div>
        <div class="stat">
          <span class="name"><MessageCode /> Max events</span>
          <span class="spacer" />
          <span class="value">3M</span>
        </div>
        <div class="stat">
          <span class="name"><Timer /> Indexing</span>
          <span class="spacer" />
          <span class="value">Normal</span>
        </div>
        <div class="stat">
          <span class="name"><CreditCard /> Price</span>
          <span class="spacer" />
          <span class="value">$49.95/Month</span>
        </div>
      </div>
      <div class="for">
        <GaugeLow /> Suitable for small work loads
      </div>
    </div>
    <div
      class="tier"
      class:selected={tier === "growth"}
      on:click={selectTier("growth")}
    >
      <div class="name">
        {#if tier === "growth"}
          <span class="green">
            <CircleCheck />
          </span>
        {:else}
          <span class="grey">
            <CircleDashed />
          </span>
        {/if}
        Growth
      </div>
      <div class="stats">
        <div class="stat">
          <span class="name"><Db /> Storage</span>
          <span class="spacer" />
          <span class="value">4 Gb</span>
        </div>
        <div class="stat">
          <span class="name"><MessageCode /> Max events</span>
          <span class="spacer" />
          <span class="value">6M</span>
        </div>
        <div class="stat">
          <span class="name"><Timer /> Indexing</span>
          <span class="spacer" />
          <span class="value">Fast</span>
        </div>
        <div class="stat">
          <span class="name"><CreditCard /> Price</span>
          <span class="spacer" />
          <span class="value">$99.95/Month</span>
        </div>
      </div>
      <div class="for">
        <GaugeMed /> Suitable for medium work loads
      </div>
    </div>
    <div
      class="tier"
      class:selected={tier === "business"}
      on:click={selectTier("business")}
    >
      <div class="name">
        {#if tier === "business"}
          <span class="green">
            <CircleCheck />
          </span>
        {:else}
          <span class="grey">
            <CircleDashed />
          </span>
        {/if}
        Business
      </div>
      <div class="stats">
        <div class="stat">
          <span class="name"><Db /> Storage</span>
          <span class="spacer" />
          <span class="value">8 Gb</span>
        </div>
        <div class="stat">
          <span class="name"><MessageCode /> Max events</span>
          <span class="spacer" />
          <span class="value">12M</span>
        </div>
        <div class="stat">
          <span class="name"><Timer /> Indexing</span>
          <span class="spacer" />
          <span class="value">Faster</span>
        </div>
        <div class="stat">
          <span class="name"><CreditCard /> Price</span>
          <span class="spacer" />
          <span class="value">$199.95/Month</span>
        </div>
      </div>
      <div class="for">
        <GaugeHigh /> Suitable for heavy work loads
      </div>
    </div>
    <div
      class="tier"
      class:selected={tier === "enterprise"}
      on:click={selectTier("enterprise")}
    >
      <div class="name">
        {#if tier === "enterprise"}
          <span class="green">
            <CircleCheck />
          </span>
        {:else}
          <span class="grey">
            <CircleDashed />
          </span>
        {/if}
        Enterprise
      </div>
      <div class="stats">
        <div class="stat">
          <span class="name"><Db /> Storage</span>
          <span class="spacer" />
          <span class="value">16 Gb</span>
        </div>
        <div class="stat">
          <span class="name"><MessageCode /> Max events</span>
          <span class="spacer" />
          <span class="value">24M</span>
        </div>
        <div class="stat">
          <span class="name"><Timer /> Indexing</span>
          <span class="spacer" />
          <span class="value">Instant</span>
        </div>
        <div class="stat">
          <span class="name"><CreditCard /> Price</span>
          <span class="spacer" />
          <span class="value">$399.95/Month</span>
        </div>
      </div>
      <div class="for">
        <GaugeMax /> Suitable for extreme work loads
      </div>
    </div>
  </div>
  <div class="buttons">
    <Button on:click={createTask} disabled={creatingTask}>
      {#if creatingTask}
        <SpinLine size="32" color="currentColor" unit="px" duration="4s" />
        Processing
      {:else}
        Create Task ${getSyncPrice(tier, Number(duration))}
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
  @media (max-width: 640px) {
    .split {
      grid-template-columns: 1fr;
    }
  }
  .tiers {
    margin-top: 1em;
    display: grid;
    gap: 2em;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  .tier {
    display: flex;
    gap: 1em;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    cursor: pointer;
    flex-direction: column;
    align-items: flex-start;
  }
  .tier .stats > * {
    padding: 0 1em;
    box-sizing: border-box;
  }
  .tier > .name {
    padding: 0 1em;
    padding-top: 1em;
    width: 100%;
    box-sizing: border-box;
  }
  .tier.selected {
    border-color: var(--secondary-color);
  }
  .tier .for {
    display: flex;
    gap: 1em;
    flex: 1;
    align-items: center;
    padding: 1em;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    box-sizing: border-box;
  }
  .tier.selected .for {
    border-color: var(--secondary-color);
  }
  .tier .name {
    display: flex;
    gap: 1em;
    flex: 1;
    align-items: center;
  }
  .tier > .name {
    font-family: "Frank";
  }
  .tier .stats {
    width: 100%;
    gap: 0.5em;
    display: flex;
    flex-direction: column;
  }
  .tier .stats .stat {
    display: flex;
    width: 100%;
    align-items: center;
  }
  .spacer {
    flex: 1;
  }
  .tier :global(svg) {
    width: 1.25em;
    height: 1.25em;
    max-width: initial;
  }
  .green,
  .grey {
    display: flex;
    align-items: center;
  }
  .green :global(svg) {
    width: 1.25em;
    fill: var(--secondary-color);
  }
  .grey :global(svg) {
    width: 1.25em;
    fill: rgba(0, 0, 0, 0.1);
  }
</style>
