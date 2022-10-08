<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  import Button from "src/components/Button.svelte";
  import Alert from "src/components/Alert.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import Select from "src/components/Select.svelte";
  import Card from "src/components/Card.svelte";
  import TextArea from "src/components/TextArea.svelte";

  import Copy from "src/icons/Copy.svelte";
  import CalendarX from "src/icons/CalendarX.svelte";

  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { toast } from "@zerodevx/svelte-toast";

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

  const syncAddrsQuery = () => `{
    getUserSubs(owner: "*", syncAddrs: true) {
      syncAddrs {
        id
        abi
        fromBlock
        chain
        address
        expiresAt
      }
    }
  }`;

  let syncAddrs = [];
  let address = "";
  let chain = "binance-mainnet";

  const getSyncAddrs = async () => {
    const query = syncAddrsQuery();

    const response = await fetch("https://api.kenshi.io/subscriptions", {
      method: "POST",
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    syncAddrs = result.data?.getUserSubs?.syncAddrs || [];
  };

  getSyncAddrs();

  const filter = (tasks, address, chain) =>
    tasks
      .filter((task) => task.chain === chain)
      .filter((task) => task.address.toLowerCase().includes(address));

  onMount(() => {
    const interval = setInterval(getSyncAddrs, 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  });
</script>

<Navbar />

<div class="section small-bottom-pad">
  <h2>Kenshi Deep Index</h2>
  <div class="welcome">
    Welcome to the Kenshi dashboard! Connect your wallet and choose one of the
    Kenshi services below to continue:
  </div>
  <div class="filters">
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
    <TextInput placeholder="Address" bind:value={address} />
  </div>
  <div class="buttons services">
    <Button href="/dashboard">Create a sync task</Button>
    <Button href="/dashboard">Get an API key</Button>
  </div>
</div>

<div class="section">
  <h3>Indexed Contracts</h3>
  <div class="tasks">
    {#each filter(syncAddrs, address.toLowerCase(), chain) as task}
      <div transition:fade>
        <Card flat>
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
            <TextInput
              icon={CalendarX}
              disabled
              value={task.expiresAt
                ? "Expires at " +
                  new Date(task.expiresAt).toLocaleDateString("en-US")
                : "Never expires"}
            />
          </div>
          <div class="buttons">
            <Button on:click={copy(JSON.stringify(task.abi))}>Copy ABI</Button>
          </div>
        </Card>
      </div>
    {/each}
  </div>
</div>

<Footer />

<style>
  h2 {
    margin-bottom: 1.5em;
  }
  h3 {
    margin-top: 0;
  }
  .section {
    padding: 4em;
    padding-top: 0;
  }
  @media screen and (max-width: 960px) {
    .section {
      padding: 1.25em;
    }
    .section :global(.card.padding) {
      padding: 1.25em;
    }
    .section :global(.split) {
      grid-template-columns: 1fr;
    }
  }
  .buttons {
    margin-top: 2em;
    display: flex;
    gap: 1em;
  }
  .filters {
    margin-top: 2em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(512px, 1fr));
    gap: 2em;
  }
  .tasks {
    margin-top: 2.5em;
  }
  .tasks:not(.empty) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(512px, 1fr));
    gap: 2em;
  }
  .body {
    max-width: 840px;
  }
  .buttons.services :global(svg) {
    height: 1em;
    padding-right: 0.25em;
  }
  .small-bottom-pad {
    padding-bottom: 3em;
  }
  .buttons {
    margin-top: 2em;
    display: flex;
    gap: 1em;
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
  .field-buttons {
    display: flex;
    gap: 0.5em;
    margin-right: 0.25em;
    color: var(--secondary-color) !important;
  }
</style>
