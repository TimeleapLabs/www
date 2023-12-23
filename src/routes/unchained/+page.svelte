<script>
  import "@carbon/charts-svelte/styles.css";

  import Skeleton from "svelte-skeleton/Skeleton.svelte";
  import DefaultTags from "src/components/seo/DefaultTags.svelte";

  import {
    BarChartSimple,
    DonutChart,
    AlluvialChart,
    CirclePackChart,
    TreemapChart,
    MeterChart,
    AreaChart,
  } from "@carbon/charts-svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import Chartjs from "src/components/chartjs/Chartjs.svelte";
  import colors from "src/components/chartjs/colors.js";

  import Footer from "src/components/Footer.svelte";
  import EdgeMap from "src/components/analytics/EdgeMap.svelte";

  import {
    Grid,
    Row,
    Column,
    OutboundLink,
    InlineNotification,
    ProgressBar,
    Slider,
    Tile,
    TileGroup,
    CodeSnippet,
  } from "carbon-components-svelte";

  import { Button, Content } from "carbon-components-svelte";
  import { ContentSwitcher, Switch } from "carbon-components-svelte";

  import formatThousands from "format-thousands";

  import {
    Events,
    AnalyticsReference,
    Globe,
    Http,
    LogoTwitter,
    LogoDiscord,
    Book,
    Dashboard,
    DashboardReference,
    SendAlt,
    LogoGithub,
    ShoppingCart,
  } from "carbon-icons-svelte";

  import {
    DataTable,
    Toolbar,
    ToolbarMenu,
    ToolbarMenuItem,
    ToolbarContent,
    ToolbarSearch,
    Pagination,
  } from "carbon-components-svelte";

  import { ethers } from "ethers";
  import { onMount } from "svelte";
  import { theme } from "src/stores/theme";
  import { debounce } from "$lib/utils.js";

  let data, interval;
  let peerData, peerOptions;
  let priceData, priceOptions;
  let tableData,
    page = 1,
    pageSize = 10,
    filteredRowIds = [];

  const fetchData = async () => {
    const req = await fetch("/api/unchained/dashboard");
    data = await req.json();
  };

  $: if (data && $theme) {
    tableData = data.scores.map((item) => ({
      id: item._id,
      score: item.count,
    }));
  }

  $: if (data && $theme) {
    peerData = {
      datasets: [
        {
          label: "Active Peers",
          data: data.data
            .map((item) => ({
              x: item.block,
              y: item.validations,
            }))
            .sort((a, b) => a.x - b.x),
          fill: true, // Enable fill
          backgroundColor: colors[$theme]["--cds-charts-1-1-1"],
          borderColor: colors[$theme]["--cds-charts-1-1-1-hovered"],
          borderWidth: 0.2,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    };
    peerOptions = {
      plugins: {
        legend: {
          display: false, // Hide legend
        },
      },
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: {
            display: true,
            text: "Block",
          },
          max: Math.max(...data.data.map((item) => item.block)),
          ticks: {
            maxRotation: 45,
            minRotation: 45,
          },
        },
        y: {
          title: {
            display: true,
            text: "Peers",
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    };
  }

  $: if (data && $theme) {
    priceData = {
      datasets: [
        {
          label: "Ethereum Price",
          data: data.data
            .map((item) => ({
              x: item.block,
              y: item.price,
            }))
            .sort((a, b) => a.x - b.x),
          fill: true, // Enable fill
          backgroundColor: colors[$theme]["--cds-charts-1-1-1"],
          borderColor: colors[$theme]["--cds-charts-1-1-1-hovered"],
          borderWidth: 0.2,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    };
    priceOptions = {
      plugins: {
        legend: {
          display: false, // Hide legend
        },
      },
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: {
            display: true,
            text: "Block",
          },
          max: Math.max(...data.data.map((item) => item.block)),
          ticks: {
            maxRotation: 45,
            minRotation: 45,
          },
        },
        y: {
          title: {
            display: true,
            text: "Price",
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    };
  }

  function createGradient(colors, width) {
    // Create an offscreen canvas
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = width;
    offscreenCanvas.height = 1; // Height can be 1 as we only need a horizontal gradient

    const ctx = offscreenCanvas.getContext("2d");

    // Create a linear gradient across the offscreen canvas
    const gradient = ctx.createLinearGradient(0, 0, width, 0);

    // Add color stops to the gradient
    colors.forEach((color, index) => {
      const position = index / (colors.length - 1);
      gradient.addColorStop(position, color);
    });

    return gradient;
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
/>

<Content class="gap">
  <Grid padding>
    <Row>
      <Column>
        <div class="description">
          <ExpressiveHeading size={4}>Kenshi Unchained</ExpressiveHeading>
          <p>
            Unchained is a decentralized, peer-to-peer network for data
            validation. Unchained nodes work to validate data together and are
            rewarded in KNS tokens. The validated data can then be queried by
            consumer in exchange for KNS tokens. This model makes Unchained an
            economically autonomous platform for data validation and exchange.
          </p>
          <div class="buttons">
            <Button href="/docs/unchained" icon={Book}>Learn more</Button>
          </div>
        </div>
      </Column>
      <Column sm={0} />
    </Row>
    {#if data}
      <Row>
        {#if priceData}
          <Column>
            <Tile>
              <div class="tile-title">
                <ExpressiveHeading size={2}>Ethereum Price</ExpressiveHeading>
                <div class="body-compact-02">
                  Ethereum price as validated by the Unchained network — 7 days
                </div>
              </div>
              <div>
                <Chartjs data={priceData} options={priceOptions} />
              </div>
            </Tile>
          </Column>
        {/if}
        {#if peerData}
          <Column>
            <Tile>
              <div class="tile-title">
                <ExpressiveHeading size={2}>
                  Active Validators
                </ExpressiveHeading>
                <div class="body-compact-02">
                  Active validators on the Unchained network — 7 days
                </div>
              </div>
              <div>
                <Chartjs data={peerData} options={peerOptions} />
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
              <div class="body-compact-02">Distinct peers — 24hr</div>
              <div class="number">
                {data.peers}
              </div>
            </div>
          </Tile>
        </Column>
        <Column xlg={4} md={4}>
          <Tile>
            <div class="info-card">
              <ExpressiveHeading size={2}>Data Points</ExpressiveHeading>
              <div class="body-compact-02">Validated data points — 24hr</div>
              <div class="number">
                {data.points}
              </div>
            </div>
          </Tile>
        </Column>
        <Column xlg={4} md={4}>
          <Tile>
            <div class="info-card">
              <ExpressiveHeading size={2}>Total Validations</ExpressiveHeading>
              <div class="body-compact-02">Total signatures — 24hr</div>
              <div class="number">
                {formatThousands(data.validations, { separator: "," })}
              </div>
            </div>
          </Tile>
        </Column>
        <Column xlg={4} md={4}>
          <Tile>
            <div class="info-card">
              <ExpressiveHeading size={2}>Peer Activity</ExpressiveHeading>
              <div class="body-compact-02">Average/Max — 24hr</div>
              <div class="number">
                {Math.ceil(data.activity.average)}/{data.activity.max}
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
                  { key: "id", value: "Public Key" },
                  { key: "score", value: "Score" },
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
                <Toolbar>
                  <ToolbarContent>
                    <ToolbarSearch
                      persistent
                      shouldFilterRows={(row, value) => {
                        return row.id
                          .toLowerCase()
                          .includes(value.toLowerCase());
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
</style>
