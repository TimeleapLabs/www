<script>
  import "@carbon/charts-svelte/styles.css";

  import DefaultTags from "src/components/seo/DefaultTags.svelte";
  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import Chartjs from "src/components/chartjs/Chartjs.svelte";
  import colors from "src/components/chartjs/colors.js";
  import formatThousands from "format-thousands";
  import Footer from "src/components/Footer.svelte";
  import Unchained from "src/icons/Unchained.svelte";

  import {
    Grid,
    Row,
    Column,
    ProgressBar,
    Tile,
  } from "carbon-components-svelte";

  import { Button, Content } from "carbon-components-svelte";
  import { Book, Play } from "carbon-icons-svelte";

  import {
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Pagination,
  } from "carbon-components-svelte";

  import { onMount } from "svelte";
  import { theme } from "src/stores/theme";

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

  const averageSigners = (prices) =>
    Math.ceil(
      prices.map((price) => price.signers).reduce((a, b) => a + b) /
        prices.length
    );

  const maxSigners = (prices) =>
    Math.max(...prices.map((price) => price.signers));

  $: if (data && $theme) {
    tableData = data.scores
      .sort((a, b) => b.score - a.score)
      .map((item, index) => ({ ...item, rank: index + 1 }));
  }

  $: if (data && $theme) {
    peerData = {
      datasets: [
        {
          label: "Active Peers",
          data: data.prices
            .map((item) => ({
              x: item.block,
              y: item.signers,
            }))
            .sort((a, b) => a.x - b.x),
          fill: true, // Enable fill
          backgroundColor: colors[$theme]["--cds-charts-5-2-5"],
          borderColor: colors[$theme]["--cds-charts-5-2-5-hovered"],
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
          max: Math.max(...data.prices.map((item) => item.block)),
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
          data: data.prices
            .map((item) => ({
              x: item.block,
              y: item.price,
            }))
            .sort((a, b) => a.x - b.x),
          fill: true, // Enable fill
          backgroundColor: colors[$theme]["--cds-charts-5-2-5"],
          borderColor: colors[$theme]["--cds-charts-5-2-5-hovered"],
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
          max: Math.max(...data.prices.map((item) => item.block)),
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
      <Column xlg={8} sm={4}>
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
            <Button
              target="_blank"
              href="https://github.com/KenshiTech/unchained/blob/master/quickstart.md"
              icon={Play}
            >
              Run a Node
            </Button>
          </div>
        </div>
      </Column>
      <Column xlg={8} sm={4}>
        <div class="unchained">
          <Unchained
            textColor={$theme === "white" ? "#000" : "#ccc"}
            color={$theme === "white" ? "#333" : "#000"}
          />
        </div>
      </Column>
    </Row>
    {#if data}
      <Row>
        {#if priceData}
          <Column>
            <Tile>
              <div class="tile-title">
                <ExpressiveHeading size={2}>Ethereum Price</ExpressiveHeading>
                <div class="body-compact-02">
                  Ethereum price as validated by the Unchained network — 48
                  hours
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
                  Active validators on the Unchained network — 48 hours
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
              <div class="body-compact-02">Distinct peers — All-Time</div>
              <div class="number">
                {formatThousands(data.stats.signers, { separator: "," })}
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
                {formatThousands(data.stats.points, { separator: "," })}
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
        <Column xlg={4} md={4}>
          <Tile>
            <div class="info-card">
              <ExpressiveHeading size={2}>Peer Activity</ExpressiveHeading>
              <div class="body-compact-02">Average/Max — 24hr</div>
              <div class="number">
                {averageSigners(data.prices)}/{maxSigners(data.prices)}
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
                  { key: "key", value: "Public Key" },
                  { key: "name", value: "Name" },
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
</style>
