<script>
  import Footer from "src/components/Footer.svelte";
  import Uptime from "src/components/isup/Uptime.svelte";

  import { Tile, Grid, Column, Row, Content } from "carbon-components-svelte";
  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";

  import { onMount } from "svelte";
  import { Moon } from "svelte-loading-spinners";

  const vrfLogsEndpoint = "https://api.kenshi.io/vrf/logs";

  const vrfLogsQuery = (blockchain) => `{
    getLogs(blockchain: "${blockchain}") {
      requested
      delivered
    }
  }`;

  const toTitleCase = (str) =>
    str
      .replace(/-/g, " ")
      .split(/ +/)
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join(" ");

  const chainIcons = {
    "avalanche-fuji": "avalanche",
    "avalanche-mainnet": "avalanche",
    "polygon-mumbai": "polygon",
    "polygon-mainnet": "polygon",
    "fantom-testnet": "fantom",
    "fantom-mainnet": "fantom",
    "binance-testnet": "binance",
    "binance-mainnet": "binance",
  };

  const vrfLogsChains = [
    "avalanche-fuji",
    "polygon-mumbai",
    "fantom-testnet",
    "binance-testnet",
  ];

  const vrfLogs = {};

  const getVrfLogs = async (chain) => {
    const query = vrfLogsQuery(chain);

    const response = await fetch(vrfLogsEndpoint, {
      method: "POST",
      body: JSON.stringify({
        query,
      }),
    });

    const { data: { getLogs: logs } = {} } = (await response.json()) || {};

    if (logs) {
      vrfLogs[chain] = logs;
    }
  };

  const getAverageResponseTime = async (values) => {
    const average =
      values
        .map(({ requested, delivered }) => delivered - requested)
        .reduce((a, b) => a + b, 0) / values.length;
    return average.toFixed(2);
  };

  onMount(() => {
    vrfLogsChains.map(getVrfLogs);
    const vrfLogIntervals = vrfLogsChains.map((chain) =>
      setInterval(getVrfLogs, 5 * 60 * 1000, chain)
    );
    return () => {
      vrfLogIntervals.forEach(clearInterval);
    };
  });
</script>

<Content>
  <Grid noGutter narrow padding>
    <Row>
      <Column>
        <ExpressiveHeading size={4}>
          <h1>Kenshi Status</h1>
        </ExpressiveHeading>
      </Column>
    </Row>

    <Row>
      <Column>
        <ExpressiveHeading size={3}>
          <h2>JSON-RPC endpoints</h2>
        </ExpressiveHeading>
      </Column>
    </Row>

    <Row>
      <Column>
        <p>
          Kenshi Is Up oracle checks the status of each JSON-RPC provider every
          one minute. This page queries the Kenshi Is Up GraphQL endpoint and
          displays the recorded data. Click on the provider name to copy its
          address.
        </p>
      </Column>
    </Row>

    <Row>
      <Column>
        <ExpressiveHeading size={2}>
          <h3>Mainnets</h3>
        </ExpressiveHeading>
      </Column>
    </Row>

    <Row>
      <Column>
        <Uptime
          title="BSC"
          icon="binance"
          names={[
            "BSC_OFFICIAL_MAINNET",
            "BSC_CHAINSTACK_PRIVATE_MAINNET",
            "BSC_ANKR_MAINNET",
          ]}
        />
      </Column>
      <Column>
        <Uptime
          title="Polygon"
          icon="polygon"
          names={[
            "POLYGON_OFFICIAL_MAINNET",
            "POLYGON_CHAINSTACK_PRIVATE_MAINNET",
            "POLYGON_ANKR_MAINNET",
            "POLYGON_BLAST_MAINNET",
          ]}
        />
      </Column>
      <Column>
        <Uptime
          title="Fantom"
          icon="fantom"
          names={[
            "FANTOM_OFFICIAL_MAINNET",
            "FANTOM_CHAINSTACK_PRIVATE_MAINNET",
            "FANTOM_ANKR_MAINNET",
            "FANTOM_BLAST_MAINNET",
          ]}
        />
      </Column>
      <Column>
        <Uptime
          title="Avalanche"
          icon="avalanche"
          names={[
            "AVALANCHE_OFFICIAL_MAINNET",
            "AVALANCHE_CHAINSTACK_PRIVATE_MAINNET",
            "AVALANCHE_ANKR_MAINNET",
            "AVALANCHE_BLAST_MAINNET",
          ]}
        />
      </Column>
    </Row>

    <Row>
      <Column>
        <ExpressiveHeading size={2}>
          <h3>Testnets</h3>
        </ExpressiveHeading>
      </Column>
    </Row>

    <Row>
      <Column>
        <Uptime
          title="BSC Testnet"
          icon="binance"
          names={[
            "BSC_OFFICIAL_TESTNET",
            "BSC_CHAINSTACK_PRIVATE_TESTNET",
            "BSC_ANKR_TESTNET",
            "BSC_BLAST_TESTNET",
          ]}
        />
      </Column>
      <Column>
        <Uptime
          title="Polygon Mumbai"
          icon="polygon"
          names={[
            "POLYGON_CHAINSTACK_PRIVATE_MUMBAI",
            "POLYGON_CHAINSTACK_LABS_MUMBAI",
            "POLYGON_ANKR_MUMBAI",
            "POLYGON_BLAST_MUMBAI",
            "POLYGON_MATICVIGIL_MUMBAI",
            "POLYGON_MATIC_TODAY_MUMBAI",
          ]}
        />
      </Column>
      <Column>
        <Uptime
          title="Fantom Testnet"
          icon="fantom"
          names={[
            "FANTOM_OFFICIAL_TESTNET",
            "FANTOM_CHAINSTACK_PRIVATE_TESTNET",
            "FANTOM_ANKR_TESTNET",
            "FANTOM_BLAST_TESTNET",
          ]}
        />
      </Column>
      <Column>
        <Uptime
          title="Avalanche Fuji"
          icon="avalanche"
          names={[
            "AVALANCHE_OFFICIAL_FUJI",
            "AVALANCHE_CHAINSTACK_PRIVATE_FUJI",
            "AVALANCHE_ANKR_FUJI",
            "AVALANCHE_BLAST_FUJI",
          ]}
        />
      </Column>
    </Row>

    <Row>
      <Column>
        <ExpressiveHeading size={3}>
          <h2>Kenshi Oracles</h2>
        </ExpressiveHeading>
      </Column>
    </Row>

    <Row>
      <Column>
        <ExpressiveHeading size={2}>
          <h3>
            VRF Delivery Times
            {#if !Object.keys(vrfLogs).length}
              <Moon size="16" />
            {/if}
          </h3>
        </ExpressiveHeading>
      </Column>
    </Row>

    <Row>
      <Column>
        <p>
          Kenshi VRF delivers fast results on all chains thanks to its fully
          serverless design, with no queue or wait time.
        </p>
      </Column>
    </Row>

    <Row>
      {#each Object.entries(vrfLogs) as [chain, values]}
        <Column>
          <Tile>
            <div class="log">
              <div class="title">
                <h4>{toTitleCase(chain)}</h4>
                <img
                  src="/images/chains/{chainIcons[chain]}.svg"
                  class="icon"
                  alt={toTitleCase(chain)}
                />
              </div>
              Average Response Time:
              {#await getAverageResponseTime(values) then duration}
                {duration} blocks
              {/await}
            </div>
          </Tile>
        </Column>
      {/each}
    </Row>
  </Grid>
</Content>

<Footer />

<style>
  .log-wrap h3,
  .uptime-wrap h3 {
    display: flex;
    gap: 0.5em;
    align-items: center;
    margin-bottom: 2em;
  }
  .log h4 {
    margin-top: 0;
  }
  .section {
    padding: 4em;
    padding-top: 2em;
    flex: 1;
  }
  .section:first-of-type {
    min-height: 400px;
  }
  .log,
  .uptimes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 1em;
  }
  @media screen and (max-width: 720px) {
    .log,
    .uptimes {
      grid-template-columns: 1fr;
    }
  }
  @media screen and (max-width: 960px) {
    .section {
      padding: 2em;
    }
  }
  @media screen and (max-width: 720px) {
    .section {
      padding: 1em;
    }
    :global(.card.padding) {
      padding: 1em !important;
    }
  }

  .chart-description {
    margin-top: 2em;
    color: #666;
  }
  .description {
    margin-bottom: 2em;
  }
  .title {
    display: flex;
    gap: 1em;
    align-items: center;
  }
  .title h4 {
    flex: 1;
    margin: 0;
  }
  .title img {
    height: 1em;
  }
  .title {
    margin-bottom: 1em;
  }
</style>
