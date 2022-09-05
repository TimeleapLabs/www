<script>
  import { onMount } from "svelte";

  import { rpcNames, endpoints } from "src/lib/isup/rpc";
  import { toast } from "@zerodevx/svelte-toast";
  import { Moon } from "svelte-loading-spinners";

  import Card from "../Card.svelte";
  import LineChart from "src/components/charts/line/Chart.svelte";
  import Copy from "src/icons/Copy.svelte";

  export let names;
  export let title;
  export let icon;

  const uptimeEndpoint = "https://api.kenshi.io/isup";
  const queryNames = names.map((name) => `"${name}"`).join(", ");

  const uptimeQuery = (fromTime, toTime) => `{
    getEntries(fromTime: "${fromTime}", toTime: "${toTime}", names: [${queryNames}]) {
      timestamp
      name
      latency
      isUp
    }
  }`;

  let uptimes;

  const getUptimes = async () => {
    const query = uptimeQuery(
      new Date(new Date().valueOf() - 86400000).toISOString(),
      new Date(new Date().valueOf()).toISOString()
    );

    const response = await fetch(uptimeEndpoint, {
      method: "POST",
      body: JSON.stringify({ query }),
    });

    const { data: { getEntries: entries } = {} } =
      (await response.json()) || {};

    uptimes = entries || uptimes || [];
  };

  const filterUptimes = (name) =>
    uptimes.filter((uptime) => name === uptime.name);

  const copyText = (text) => () => {
    if (!text) return;
    navigator.clipboard?.writeText?.(text);
    toast.push("Copied to clipboard.");
  };

  const toChartData = (data) => {
    return data
      .map((entry) => ({
        x: new Date(entry.timestamp).valueOf(),
        y: entry.isUp ? 1 : 0,
      }))
      .sort((a, b) => a.x - b.x);
  };

  onMount(() => {
    getUptimes();
  });
</script>

<Card flat slim>
  <div class="title">
    <h4>{title}</h4>
    <img src="/images/chains/{icon}.svg" class="icon" alt={title} />
  </div>
  <div class="uptime header">
    <h5>Provider</h5>
    <h5>Status</h5>
    <h5>24hr Chart</h5>
  </div>
  {#if uptimes?.length}
    {#each names as name}
      <div class="uptime">
        {#if endpoints[name]}
          <span class="name copy" on:click={copyText(endpoints[name])}>
            {rpcNames[name]}
            <Copy />
          </span>
        {:else}
          <span class="name">
            {rpcNames[name]}
          </span>{/if}
        {#await filterUptimes(name) then data}
          <span class="status" class:ok={data[data.length - 1].isUp}>
            {#if data[data.length - 1].isUp}
              OK
            {:else}
              DOWN
            {/if}
          </span>
          <span class="chart">
            <LineChart data={toChartData(data)} axisX={false} axisY={false} />
          </span>
        {/await}
      </div>
    {/each}
  {:else}
    <div class="loading">
      <Moon size="16" />
      Loading
    </div>
  {/if}
</Card>

<style>
  .uptime {
    display: grid;
    margin-bottom: 1em;
    align-items: center;
    gap: 1em;
    grid-template-columns: 1fr 2.5em 86px;
  }
  h5 {
    margin: 0;
  }
  .uptime h5:not(:first-child),
  .uptime span:not(:first-child) {
    text-align: center;
  }
  .uptime .name {
    flex: 1;
  }
  @media screen and (max-width: 720px) {
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
  .loading {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }
</style>
