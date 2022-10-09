<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  //import Button from "src/components/Button.svelte";
  import Alert from "src/components/Alert.svelte";
  //import TextInput from "src/components/TextInput.svelte";
  //import Select from "src/components/Select.svelte";
  //import Card from "src/components/Card.svelte";
  import TextArea from "src/components/TextArea.svelte";

  import { Select, SelectItem } from "carbon-components-svelte";
  import { TextInput } from "carbon-components-svelte";
  import { Button } from "carbon-components-svelte";
  import { Tile, ClickableTile } from "carbon-components-svelte";
  import { CodeSnippet } from "carbon-components-svelte";
  import { Grid, Row, Column } from "carbon-components-svelte";

  import Api_1 from "carbon-icons-svelte/lib/Api_1.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import Copy from "carbon-icons-svelte/lib/Copy.svelte";
  import Dashboard from "carbon-icons-svelte/lib/Dashboard.svelte";

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

  const copy = (text) => {
    console.log(text);
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

  const chains = {
    "ethereum-mainnet": "Ethereum",
    "ethereum-goerli": "Ethereum Goerli",
    "avalanche-mainnet": "Avalanche C-Chain",
    "avalanche-fuji": "Avalanche Fuji C-Chain",
    "binance-mainnet": "BNB Smart Chain",
    "binance-testnet": "BNB Smart Chain Testnet",
    "fantom-mainnet": "Fantom",
    "fantom-testnet": "Fantom Testnet",
    "polygon-mainnet": "Polygon",
    "polygon-mumbai": "Polygon Mumbai",
  };
</script>

<Grid padding>
  <Row>
    <Column lg={12}>
      <div class="head">
        <h2>Kenshi Deep Index</h2>
        <div class="welcome">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, quae!
          Porro praesentium dignissimos natus, quia rerum dolor vel minima
          assumenda? Corporis, animi ipsa recusandae eaque totam deleniti! Sunt,
          nesciunt alias.
        </div>
        <div class="filters">
          <Select labelText="Chain" bind:selected={chain}>
            {#each Object.entries(chains) as [value, text]}
              <SelectItem {value} {text} />
            {/each}
          </Select>
          <TextInput
            labelText="Address"
            placeholder="Search by contract address"
            bind:value={address}
          />
        </div>
        <div class="buttons">
          <Button href="/dashboard" icon={Add}>Create a sync task</Button>
          <Button href="/dashboard" icon={Api_1}>Get an API key</Button>
        </div>
      </div>
    </Column>
    <Column>
      <ClickableTile href="/dashboard">
        <div class="gap">
          <h5>Index your smart contract</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Voluptatibus harum ipsa blanditiis necessitatibus corrupti tempora
            aspernatur esse molestiae perspiciatis iusto, minus et molestias
            provident illum ratione. Voluptatibus quas ratione tempora.
          </p>
          <Button href="/dashboard" icon={Dashboard}>Start now</Button>
        </div>
      </ClickableTile>
    </Column>
  </Row>
</Grid>

<Grid padding>
  <Row>
    <Column>
      <h3>Indexed Contracts</h3>
    </Column>
  </Row>

  <Row>
    {#each filter(syncAddrs, address.toLowerCase(), chain) as task}
      <Column>
        <div transition:fade>
          <Tile>
            <div class="body">
              <CodeSnippet light>
                <div class="address">
                  <img
                    src="/images/chains/{chainIcons[task.chain]}.svg"
                    alt={task.chain}
                  />
                  <span>{task.address}</span>
                </div>
              </CodeSnippet>
              <CodeSnippet light>{task.id}</CodeSnippet>
            </div>
            <div class="footer">
              <div class="expires">
                {#if task.expiresAt}
                  Expires at
                  {new Date(task.expiresAt).toLocaleDateString("en-US")}
                {:else}
                  Never expires
                {/if}
              </div>
              <Button on:click={copy(JSON.stringify(task.abi))} icon={Copy}>
                Copy ABI
              </Button>
            </div>
          </Tile>
        </div>
      </Column>
    {/each}
  </Row>
</Grid>

<Footer />

<style>
  .filters,
  .buttons {
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
  }

  .buttons {
    margin-top: 1em;
  }

  .footer {
    display: flex;
    align-items: center;
    padding: 1em 0;
    padding-left: 1em;
    box-sizing: border-box;
  }
  .expires {
    flex: 1;
  }
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
  .gap {
    display: flex;
    gap: 1em;
    flex-direction: column;
  }
  .head {
    display: flex;
    gap: 1em;
    flex-direction: column;
    height: 100%;
    padding-bottom: 1em;
    box-sizing: border-box;
  }
  .welcome {
    flex: 1;
  }
</style>
