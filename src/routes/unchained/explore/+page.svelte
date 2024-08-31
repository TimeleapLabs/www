<script>
  import "@carbon/charts-svelte/styles.css";

  import DefaultTags from "src/components/seo/DefaultTags.svelte";
  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import Chartjs from "src/components/chartjs/Chartjs.svelte";
  import colors from "src/components/chartjs/colors.js";
  import formatThousands from "format-thousands";
  import Footer from "src/components/Footer.svelte";
  import AdaptiveProductIcon from "src/components/AdaptiveProductIcon.svelte";
  import Sworn from "src/icons/Sworn.svelte";

  import {
    Grid,
    Row,
    Column,
    ProgressBar,
    Tile,
    OutboundLink,
    ClickableTile,
  } from "carbon-components-svelte";

  import { Button, Content } from "carbon-components-svelte";
  import { Book, Play, Chemistry } from "carbon-icons-svelte";

  import {
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Pagination,
  } from "carbon-components-svelte";

  import { onMount } from "svelte";
  import { theme } from "src/stores/theme";

  let sprint = Math.ceil(new Date().valueOf() / 300000);
  let data, interval;
  let peerData, peerOptions;
  let ethPriceData, btcPriceData, arbPriceData, priceOptions;
  let tableData,
    page = 1,
    pageSize = 10,
    filteredRowIds = [];

  const fetchData = async () => {
    const req = await fetch("/api/unchained/dashboard");
    data = await req.json();
    sprint = Math.ceil(new Date().valueOf() / 300000);
  };

  $: if (data && $theme) {
    tableData = data.signers
      .sort((a, b) => b.points - a.points)
      .map((item, index) => ({ ...item, rank: index + 1 }));
  }

  $: if (data && $theme) {
    const annotation = {
      annotations: {
        ...(Math.min(...data.prices.map((item) => item.block)) < 19300142
          ? {
              "v0.11.9": {
                type: "line",
                mode: "vertical",
                scaleID: "x",
                value: 19300142,
                borderColor: "red",
                borderWidth: 1,
                label: {
                  content: "v0.11.9",
                  enabled: true,
                  display: true,
                  position: "top",
                  font: { weight: "bold" },
                },
              },
            }
          : {}),
      },
    };

    peerData = {
      datasets: [
        {
          label: "Active Peers",
          data: data.prices
            .filter(({ asset }) => asset === "ethereum")
            .map((item) => ({ x: item.block, y: item.signers_count }))
            .sort((a, b) => a.x - b.x),
          fill: true, // Enable fill
          backgroundColor: gradient(colors[$theme]["--cds-charts-5-2-5"]),
          borderColor: colors[$theme]["--cds-charts-5-2-5-hovered"],
          borderWidth: 0.2,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    };

    peerOptions = {
      plugins: { legend: { display: false }, annotation },
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: { display: true, text: "Block" },
          max: Math.max(...data.prices.map((item) => item.block)),
          ticks: { maxRotation: 45, minRotation: 45 },
        },
        y: { title: { display: true, text: "Peers" }, beginAtZero: true },
      },
      responsive: true,
      maintainAspectRatio: false,
    };
  }

  const gradient = (color) => {
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = "400px";
    offscreenCanvas.height = "180px";

    const ctx = offscreenCanvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 180);

    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 180);

    return gradient;
  };

  $: if (data && $theme) {
    const commondata = {
      fill: true, // Enable fill
      backgroundColor: gradient(colors[$theme]["--cds-charts-5-2-5"]),
      borderColor: colors[$theme]["--cds-charts-5-2-5-hovered"],
      borderWidth: 0.2,
      tension: 0.4,
      pointRadius: 0,
    };

    ethPriceData = {
      datasets: [
        {
          label: "Ethereum Price",
          data: data.prices
            .filter(({ asset }) => asset === "ethereum")
            .map((item) => ({ x: item.block, y: item.price / 1e18 }))
            .sort((a, b) => a.x - b.x),
          ...commondata,
        },
      ],
    };

    btcPriceData = {
      datasets: [
        {
          label: "Bitcoin Price",
          data: data.prices
            .filter(({ asset }) => asset === "bitcoin")
            .map((item) => ({ x: item.block, y: item.price / 1e18 }))
            .sort((a, b) => a.x - b.x),
          ...commondata,
        },
      ],
    };

    const ethPriceByBlock = Object.fromEntries(
      data.prices
        .filter(({ asset }) => asset === "ethereum")
        .map((asset) => [asset.block, asset.price / 1e18])
    );

    arbPriceData = {
      datasets: [
        {
          label: "Arbitrum Price",
          data: data.prices
            .filter(({ asset }) => asset === "arbitrum")
            .map((item) => ({
              x: item.block,
              y: (ethPriceByBlock[item.block] * item.price) / 1e18,
            }))
            .sort((a, b) => a.x - b.x),
          ...commondata,
        },
      ],
    };

    priceOptions = {
      plugins: { legend: { display: false } },
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: { display: true, text: "Block" },
          max: Math.max(...data.prices.map((item) => item.block)),
          ticks: { maxRotation: 45, minRotation: 45 },
        },
        y: { title: { display: true, text: "Price" } },
      },
      responsive: true,
      maintainAspectRatio: false,
    };
  }

  onMount(async () => {
    await fetchData();
    interval = setInterval(fetchData, 60000);
    return () => {
      clearInterval(interval);
    };
  });
</script>

<DefaultTags
  description="Unchained is a decentralized, peer-to-peer network for data validation. Unchained nodes work to validate data together and are rewarded in KNS tokens."
  title="Kenshi — Unchained"
  image="/images/social.unchained.png"
/>

<Content class="gap">
  <Grid padding>
    <Row>
      <Column xlg={12} md={6} sm={4}>
        <div class="description">
          <ExpressiveHeading size={4}>
            <h1>Kenshi Unchained</h1>
          </ExpressiveHeading>
          <p>
            Unchained is a decentralized, peer-to-peer network for data
            validation. Unchained nodes work to validate data together and are
            rewarded in KNS tokens. The validated data can then be queried by
            consumer in exchange for KNS tokens. This model makes Unchained an
            economically autonomous platform for data validation and exchange.
          </p>
          <div class="buttons">
            <Button href="/docs/unchained" icon={Book}>Learn More</Button>
            <Button href="/unchained/pos" icon={Chemistry}>PoS Manager</Button>
            <Button target="_blank" href="/docs/unchained/nodes" icon={Play}>
              Run a Node
            </Button>
          </div>
        </div>
      </Column>
      <Column xlg={3} md={2} sm={4}>
        <AdaptiveProductIcon
          product="unchained"
          alt="Kenshi Unchained"
          width={"240px"}
        />
      </Column>
    </Row>
    <Row>
      <Column>
        <ClickableTile
          href="https://opencollective.com/unchained"
          target="_blank"
        >
          <ExpressiveHeading size={2}>Sponsor Unchained</ExpressiveHeading>
          <div class="open-collective">
            Learn more about sponsorship and support the project on our
            <OutboundLink href="https://opencollective.com/unchained">
              OpenCollective.
            </OutboundLink>
          </div>
        </ClickableTile>
      </Column>
      <Column>
        <ExpressiveHeading size={2}>Partners</ExpressiveHeading>
        <div class="partners">
          <OutboundLink href="https://sworn.network/">
            <Sworn />
          </OutboundLink>
        </div>
      </Column>
    </Row>
    {#if data}
      <Row>
        {#if peerData}
          <Column>
            <Tile>
              <div class="tile-title">
                <ExpressiveHeading size={2}>
                  Active Validators
                </ExpressiveHeading>
                <div class="body-compact-02">
                  Active validators on the Unchained network — 8 hours
                </div>
              </div>
              <div>
                <Chartjs data={peerData} options={peerOptions} />
              </div>
            </Tile>
          </Column>
        {/if}
        {#if ethPriceData}
          <Column>
            <Tile>
              <div class="tile-title">
                <ExpressiveHeading size={2}>Ethereum Price</ExpressiveHeading>
                <div class="body-compact-02">
                  Ethereum price as validated by the Unchained network — 8 hours
                </div>
              </div>
              <div>
                <Chartjs data={ethPriceData} options={priceOptions} />
              </div>
            </Tile>
          </Column>
        {/if}
      </Row>
      <Row>
        {#if btcPriceData}
          <Column>
            <Tile>
              <div class="tile-title">
                <ExpressiveHeading size={2}>Bitcoin Price</ExpressiveHeading>
                <div class="body-compact-02">
                  Bitcoin price as validated by the Unchained network — 8 hours
                </div>
              </div>
              <div>
                <Chartjs data={btcPriceData} options={priceOptions} />
              </div>
            </Tile>
          </Column>
        {/if}
        {#if arbPriceData}
          <Column>
            <Tile>
              <div class="tile-title">
                <ExpressiveHeading size={2}>Arbitrum Price</ExpressiveHeading>
                <div class="body-compact-02">
                  Arbitrum price as validated by the Unchained network — 8 hours
                </div>
              </div>
              <div>
                <Chartjs data={arbPriceData} options={priceOptions} />
              </div>
            </Tile>
          </Column>
        {/if}
      </Row>
      <Row>
        <Column xlg={4} md={4}>
          <Tile>
            <div class="info-card">
              <ExpressiveHeading size={2}>Unique Peers</ExpressiveHeading>
              <div class="body-compact-02">Distinct peers — All-Time</div>
              <div class="number">
                {formatThousands(data.signers.length, { separator: "," })}
              </div>
            </div>
          </Tile>
        </Column>
        <Column xlg={4} md={4}>
          <Tile>
            <div class="info-card">
              <ExpressiveHeading size={2}>Sprint</ExpressiveHeading>
              <div class="body-compact-02">Unchained Sprint — Current</div>
              <div class="number">
                {formatThousands(sprint, { separator: "," })}
              </div>
            </div>
          </Tile>
        </Column>
        <Column xlg={4} md={4}>
          <Tile>
            <div class="info-card">
              <ExpressiveHeading size={2}>Data Points</ExpressiveHeading>
              <div class="body-compact-02">
                Validated data points — All-Time
              </div>
              <div class="number">
                {formatThousands(data.stats.datapoints, { separator: "," })}
              </div>
            </div>
          </Tile>
        </Column>
        <Column xlg={4} md={4}>
          <Tile>
            <div class="info-card">
              <ExpressiveHeading size={2}>Total Validations</ExpressiveHeading>
              <div class="body-compact-02">Total signatures — All-Time</div>
              <div class="number">
                {formatThousands(data.stats.validations, { separator: "," })}
              </div>
            </div>
          </Tile>
        </Column>
      </Row>
      {#if tableData}
        <Row>
          <Column>
            <Tile>
              <DataTable
                headers={[
                  { key: "rank", value: "Rank" },
                  { key: "key", value: "Address" },
                  { key: "name", value: "Name" },
                  { key: "points", value: "Points" },
                ]}
                rows={tableData}
                sortable={true}
                sortKey={"score"}
                sortDirection="descending"
                {pageSize}
                {page}
                title="Leaderboard"
                description="Peer contributions scores — All-time"
              >
                <svelte:fragment slot="cell" let:cell>
                  {#if cell.key === "name"}
                    {cell.value || ""}
                  {:else}
                    {cell.value}
                  {/if}
                </svelte:fragment>
                <Toolbar>
                  <ToolbarContent>
                    <ToolbarSearch
                      persistent
                      shouldFilterRows={(row, value) => {
                        const q = value.toLowerCase();
                        return (
                          row.key.toLowerCase().includes(q) ||
                          (row.name && row.name.toLowerCase().includes(q))
                        );
                      }}
                      bind:filteredRowIds
                    />
                  </ToolbarContent>
                </Toolbar>
              </DataTable>

              <Pagination
                bind:pageSize
                bind:page
                totalItems={filteredRowIds.length}
                pageSizeInputDisabled
              />
            </Tile>
          </Column>
        </Row>
      {/if}
    {:else}
      <Row>
        <Column>
          <ProgressBar />
        </Column>
      </Row>
    {/if}
  </Grid>
</Content>

<Footer />

<style>
  .description {
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding-top: 2em;
  }
  .number {
    font-family: var(
      --cds-code-01-font-family,
      "IBM Plex Mono",
      "Menlo",
      "DejaVu Sans Mono",
      "Bitstream Vera Sans Mono",
      Courier,
      monospace
    );
    text-align: center;
    font-size: 2rem;
    padding: 2rem;
    box-sizing: border-box;
  }
  .info-card {
    text-align: center;
  }
  .tile-title {
    margin-bottom: 2rem;
  }
  .buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
  }
  .partners :global(a) {
    color: var(--cds-text-01);
  }
  .partners {
    margin-top: 0.5em;
  }
</style>
