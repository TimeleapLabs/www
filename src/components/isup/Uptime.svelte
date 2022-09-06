<script>
  import { onMount } from "svelte";

  import { rpcNames, endpoints } from "src/lib/isup/rpc";
  import { toast } from "@zerodevx/svelte-toast";

  import Card from "../Card.svelte";
  import LineChart from "src/components/charts/line/Chart.svelte";
  import Skeleton from "svelte-skeleton/Skeleton.svelte";

  import Copy from "src/icons/Copy.svelte";
  import Check from "src/icons/Check.svelte";
  import Xmark from "src/icons/Xmark.svelte";
  import Infinity from "src/icons/Infinity.svelte";

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
      new Date(new Date().valueOf() - 3600000).toISOString(), // From 1hr ago
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

  const averageLatency = (data) => {
    const avg = data.reduce((a, b) => a + b.latency, 0) / data.length / 1000;
    return avg.toFixed(2);
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
    <h5>Latency</h5>
    <h5>Up?</h5>
    <h5>Chart</h5>
  </div>
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
      {#if uptimes?.length}
        {#await filterUptimes(name) then data}
          <span class="latency">
            {#await averageLatency(data) then latency}
              {#if latency === "0.00"}
                <Infinity />
              {:else}
                {averageLatency(data)}s
              {/if}
            {/await}
          </span>
          <span class="status" class:ok={data[data.length - 1].isUp}>
            {#if data[data.length - 1].isUp}
              <Check />
            {:else}
              <Xmark />
            {/if}
          </span>
          <span class="chart">
            <LineChart data={toChartData(data)} axisX={false} axisY={false} />
          </span>
        {/await}
      {:else}
        <div class="loading">
          <Skeleton height="16" width="34">
            <rect width="34" height="16" x="0" y="0" rx="2" ry="2" />
          </Skeleton>
        </div>
        <div class="loading">
          <Skeleton height="24" width="24">
            <rect width="24" height="24" x="0" y="0" rx="4" ry="4" />
          </Skeleton>
        </div>
        <div class="loading">
          <Skeleton height="24" width="86">
            <rect width="86" height="24" x="0" y="0" rx="2" ry="2" />
          </Skeleton>
        </div>
      {/if}
    </div>
  {/each}
</Card>

<style>
  .uptime {
    display: grid;
    margin-bottom: 1em;
    align-items: center;
    gap: 1em;
    grid-template-columns: 4fr 3em 2.5em 86px;
  }
  h5 {
    margin: 0;
  }
  .uptime h5:not(:first-child),
  .uptime span:not(:first-child) {
    text-align: center;
  }
  .latency :global(svg) {
    height: 1em;
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

  .status,
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
  }
  .status :global(svg) {
    height: 1em;
  }
  .status.ok :global(svg) {
    fill: var(--secondary-color);
  }
  .status:not(.ok) :global(svg) {
    fill: var(--primary-color);
  }
  .latency {
    font-size: 0.8em;
    text-align: center;
  }
  @media screen and (max-width: 540px) {
    .header,
    .name {
      font-size: 0.8em;
    }
    .chart {
      height: 24px;
      width: 60px;
    }
    .uptime {
      gap: 0.5em;
      grid-template-columns: 3fr 1fr 1fr 60px;
    }
  }
</style>
