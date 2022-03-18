<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  import Card from "src/components/Card.svelte";

  import { onMount } from "svelte";
  import { Moon } from "svelte-loading-spinners";
  import { toast } from "@zerodevx/svelte-toast";

  import LineChart from "src/components/charts/line/Chart.svelte";
  import Copy from "src/icons/Copy.svelte";

  const uptimeEndpoint = "https://api.kenshi.io/isup";

  const uptimeQuery = (fromTime, toTime) => `{
    getEntries(fromTime: "${fromTime}", toTime: "${toTime}") {
      timestamp
      result {
        blockchain
        name
        url
        up
      }
    }
  }`;

  let uptimes = [];
  let lastUptimeLog;

  const getUptimes = async () => {
    const query = uptimeQuery(
      new Date(new Date().valueOf() - 86400000).toISOString(),
      new Date().toISOString()
    );

    const response = await fetch(uptimeEndpoint, {
      method: "POST",
      body: JSON.stringify({
        query,
      }),
    });

    const { data: { getEntries: entries } = {} } = await response.json();

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

  const copyText = (text) => () => {
    if (!text) return;
    navigator.clipboard?.writeText?.(text);
    toast.push("Copied to clipboard.");
  };

  let uptimeInterval;

  onMount(() => {
    getUptimes();
    uptimeInterval = setInterval(getUptimes, 60 * 1000);
    return () => {
      clearInterval(uptimeInterval);
    };
  });
</script>

<div class="page">
  <Navbar />

  <div class="section">
    <h2>Kenshi Status</h2>
    <div class="uptime-wrap">
      <Card>
        <h3>
          Are JSON-RPC providers up??
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
                <h4>{toTitleCase(chain)}</h4>
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
          <div class="updated">
            Last updated at {new Date(lastUptimeLog.timestamp).toString()}
          </div>
        {/if}
      </Card>
    </div>
  </div>

  <Footer />
</div>

<style>
  .page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  h2 {
    margin-top: 0;
    margin-bottom: 1.5em;
    margin-left: 0.5em;
  }
  h3 {
    margin-top: 0;
  }
  .uptime-wrap h3 {
    display: flex;
    gap: 0.5em;
    align-items: center;
    margin-bottom: 2em;
  }
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
      padding: 1em;
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
  .updated {
    margin-top: 2em;
    color: #666;
  }
  .description {
    margin-bottom: 2em;
  }
</style>
