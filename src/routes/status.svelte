<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  import Card from "src/components/Card.svelte";

  import { onMount } from "svelte";
  import { Moon } from "svelte-loading-spinners";
  import { toast } from "@zerodevx/svelte-toast";
  import { ethers } from "ethers";

  import LineChart from "src/components/charts/line/Chart.svelte";
  import Copy from "src/icons/Copy.svelte";

  const uptimeEndpoint = "https://api.kenshi.io/isup";
  const vrfLogsEndpoint = "https://api.kenshi.io/vrf/logs";

  const uptimeQuery = (fromTime) => `{
    getEntries(fromTime: "${fromTime}") {
      timestamp
      result {
        blockchain
        name
        url
        up
      }
    }
  }`;

  const vrfLogsQuery = (blockchain) => `{
    getLogs(blockchain: "${blockchain}") {
      requested
      delivered
    }
  }`;

  let uptimes = [];
  let lastUptimeLog;

  const getUptimes = async () => {
    const query = uptimeQuery(
      new Date(new Date().valueOf() - 86400000).toISOString()
    );

    const response = await fetch(uptimeEndpoint, {
      method: "POST",
      body: JSON.stringify({
        query,
      }),
    });

    const { data: { getEntries: entries } = {} } =
      (await response.json()) || {};

    uptimes = entries || uptimes || [];
    lastUptimeLog = uptimes[uptimes.length - 1];
  };

  const groupUptime = (uptime) => {
    return Object.entries(
      uptime.result.reduce((result, entry) => {
        result[entry.blockchain] ||= [];

        result[entry.blockchain].push({
          up: entry.up,
          url: entry.url,
          name: entry.name,
        });

        return result;
      }, {})
    );
  };

  const toTitleCase = (str) =>
    str
      .replace(/-/g, " ")
      .split(/ +/)
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join(" ");

  let chartData = {};

  $: if (uptimes) {
    const data = {};
    for (const entry of uptimes) {
      for (const measure of entry.result) {
        data[measure.blockchain] ||= {};
        data[measure.blockchain][measure.name] ||= [];
        data[measure.blockchain][measure.name].push({
          x: new Date(entry.timestamp).valueOf(),
          y: measure.up ? 1 : 0,
        });
      }
    }
    chartData = data;
  }

  const chainIcons = {
    "avalanche-fuji": "avalanche",
    "polygon-mumbai": "polygon",
    "fantom-testnet": "fantom",
    "binance-testnet": "binance",
  };

  const vrfLogsChains = [
    "avalanche-fuji",
    "polygon-mumbai",
    "fantom-testnet",
    "binance-testnet",
  ];

  const vrfLogs = {};

  const rpcList = {
    "binance-mainnet": "https://bsc-dataseed.binance.org",
    "binance-testnet": "https://data-seed-prebsc-1-s1.binance.org:8545",
    "polygon-mainnet": "https://polygon-rpc.com",
    "polygon-mumbai": "https://rpc-mumbai.maticvigil.com",
    "fantom-mainnet": "https://rpc.ftm.tools",
    "fantom-testnet": "https://rpc.testnet.fantom.network/",
    "avalanche-mainnet": "https://api.avax.network/ext/bc/C/rpc",
    "avalanche-fuji": "https://api.avax-test.network/ext/bc/C/rpc",
  };

  const getBlockTime = async (chain, blockNumber) => {
    const provider = new ethers.providers.JsonRpcProvider(rpcList[chain]);
    const block = await provider.getBlock(blockNumber);
    return block.timestamp;
  };

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

  const getAverageResponseTime = async (chain, values) => {
    const diffs = await Promise.all(
      values.map(async ({ requested, delivered }) => {
        return (
          (await getBlockTime(chain, delivered)) -
          (await getBlockTime(chain, requested))
        );
      })
    );
    return diffs.reduce((a, b) => a + b, 0) / values.length;
  };

  const copyText = (text) => () => {
    if (!text) return;
    navigator.clipboard?.writeText?.(text);
    toast.push("Copied to clipboard.");
  };

  onMount(() => {
    getUptimes();
    vrfLogsChains.map(getVrfLogs);
    const uptimeInterval = setInterval(getUptimes, 60 * 1000);
    const vrfLogIntervals = vrfLogsChains.map((chain) =>
      setInterval(getVrfLogs, 5 * 60 * 1000, chain)
    );
    return () => {
      clearInterval(uptimeInterval);
      vrfLogIntervals.forEach(clearInterval);
    };
  });
</script>

<Navbar />

<div class="section">
  <h2>Kenshi Status</h2>
  <div class="uptime-wrap">
    <Card>
      <h3>
        JSON-RPC endpoints
        {#if !uptimes.length}
          <Moon size="16" />
        {/if}
      </h3>
      <p class="description">
        Kenshi Is Up oracle checks the status of each JSON-RPC provider every
        one minute. This page queries the Kenshi Is Up GraphQL endpoint and
        displays the recorded data. Click on the provider name to copy its
        address.
      </p>
      {#if lastUptimeLog}
        <div class="uptimes">
          {#each groupUptime(lastUptimeLog) as [chain, providers]}
            <Card flat slim>
              <div class="title">
                <h4>{toTitleCase(chain)}</h4>
                <img
                  src="/images/chains/{chainIcons[chain]}.svg"
                  class="icon"
                  alt={toTitleCase(chain)}
                />
              </div>
              <div class="uptime header">
                <h5>Provider</h5>
                <h5>Status</h5>
                <h5>24hr Chart</h5>
              </div>
              {#each providers as provider}
                <div class="uptime">
                  <span
                    class="name"
                    class:copy={provider.url}
                    on:click={copyText(provider.url)}
                  >
                    {provider.name}
                    {#if provider.url}
                      <Copy />
                    {/if}
                  </span>
                  <span class="status" class:ok={provider.up}>
                    {#if provider.up}
                      OK
                    {:else}
                      DOWN
                    {/if}
                  </span>
                  {#if chartData[chain]?.[provider.name]}
                    <span class="chart">
                      <LineChart
                        data={chartData[chain][provider.name]}
                        axisX={false}
                        axisY={false}
                      />
                    </span>
                  {/if}
                </div>
              {/each}
            </Card>
          {/each}
        </div>
        <div class="chart-description">
          Last updated at {new Date(lastUptimeLog.timestamp).toString()}
        </div>
      {/if}
    </Card>
  </div>
</div>

<div class="section">
  <h2>Kenshi Oracles</h2>
  <div class="logs-wrap">
    <Card>
      <h3>
        VRF Delivery Times
        {#if !Object.keys(vrfLogs).length}
          <Moon size="16" />
        {/if}
      </h3>
      <p class="description">
        Kenshi VRF delivers fast results on all chains thanks to its fully
        serverless design, with no queue or wait time.
      </p>
      <div class="logs">
        {#each Object.entries(vrfLogs) as [chain, values]}
          <Card flat slim>
            <div class="title">
              <h4>{toTitleCase(chain)}</h4>
              <img
                src="/images/chains/{chainIcons[chain]}.svg"
                class="icon"
                alt={toTitleCase(chain)}
              />
            </div>
            Average Response Time:
            {#await getAverageResponseTime(chain, values) then duration}
              {duration}s
            {/await}
          </Card>
        {/each}
      </div>
      {#if Object.keys(vrfLogs).length}
        <div class="chart-description">Based on last 5 VRF requests.</div>
      {/if}
    </Card>
  </div>
</div>

<Footer />

<style>
  h2 {
    margin-top: 0;
    margin-bottom: 1.5em;
    margin-left: 0.5em;
  }
  h3 {
    margin-top: 0;
  }
  .logs-wrap h3,
  .uptime-wrap h3 {
    display: flex;
    gap: 0.5em;
    align-items: center;
    margin-bottom: 2em;
  }
  .logs h4,
  .uptimes h4 {
    margin-top: 0;
  }
  .uptimes h5 {
    margin: 0;
  }
  .uptime {
    display: grid;
    margin-bottom: 1em;
    align-items: center;
    gap: 1em;
    grid-template-columns: 1fr 2.5em 86px;
  }
  .uptime h5:not(:first-child),
  .uptime span:not(:first-child) {
    text-align: center;
  }
  .uptime .name {
    flex: 1;
  }
  .section {
    padding: 4em;
    padding-top: 2em;
    flex: 1;
  }
  .section:first-of-type {
    min-height: 400px;
  }
  .logs,
  .uptimes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1em;
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
  .chart {
    height: 24px;
    width: 86px;
  }
  .uptime.header {
    padding-bottom: 0.5em;
    border-bottom: 1px solid #e4e4e4;
  }
  .copy {
    cursor: copy;
  }
  .name :global(svg) {
    height: 0.9em;
    opacity: 0;
  }
  .name {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }
  .name:hover :global(svg) {
    opacity: 1;
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
