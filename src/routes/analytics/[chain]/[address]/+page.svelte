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
  } from "@carbon/charts-svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";

  import Footer from "src/components/Footer.svelte";
  import EdgeMap from "src/components/analytics/EdgeMap.svelte";

  import {
    Grid,
    Row,
    Column,
    OutboundLink,
    InlineNotification,
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

  export let data;

  const { transactions = [], metadata = {}, chain } = data;

  const explorers = {
    binance: "https://bscscan.com",
    polygon: "https://polygonscan.com",
    fantom: "https://ftmscan.com",
    avalanche: "https://snowtrace.io",
    ethereum: "https://etherscan.com",
    arbitrum: "https://arbiscan.io",
    aurora: "https://explorer.aurora.dev",
    base: "https://basescan.org",
  };

  const explorerNames = {
    binance: "BscScan",
    polygon: "PolygonScan",
    fantom: "FtmScan",
    avalanche: "SnowTrace",
    ethereum: "EtherScan",
    arbitrum: "ArbiScan",
    aurora: "Aurora Explorer",
    base: "BaseScan",
  };

  const explorer = explorers[chain];
  const explorerName = explorerNames[chain];

  const pages = {
    HOLDERS: 0,
    TRANSACTIONS: 1,
    EDGE_MAP: 2,
  };

  let richData = [];
  let alluData = [];
  let alluNodes = [];
  let distributionData = [];
  let distributionCircleData = [];
  let distributionBarData = [];
  let txChart = [];
  let txTableData = [];

  let currentPage = pages.HOLDERS;
  let totalSupply = 0;
  let innerWidth = 1920;

  const richTable = {
    headers: [
      { key: "address", value: "User" },
      { key: "balance", value: "Balance" },
    ],
    pageSize: 5,
    page: 1,
    filteredRowIds: [],
    sortKey: "balance",
    sortDirection: "descending",
  };

  const txTable = {
    headers: [
      { key: "block", value: "Block" },
      { key: "from", value: "From" },
      { key: "to", value: "To" },
      { key: "amount", value: "Amount" },
      { key: "hash", value: "Transaction" },
    ],
    pageSize: 5,
    page: 1,
    filteredRowIds: [],
    sortKey: "block",
    sortDirection: "descending",
  };

  const https = (url) =>
    url.match(/https?:/) ? url : `https://${url.replace(/^\//, "")}`;

  const populateTxTable = () => {
    txTableData = transactions.map((tx) => ({
      block: tx.block.number,
      from: tx.event.args.from,
      to: tx.event.args.to,
      amount: tx.event.args.amount,
      hash: tx.transaction.hash,
      id: `${tx.transaction.hash}_${tx.log.index}`,
    }));
  };

  const allu = () => {
    alluData = transactions
      .map((tx) => tx.event.args)
      .filter(
        (args) => args.from !== "0x0000000000000000000000000000000000000000"
      )
      .map((args) => ({
        source: args.from.slice(0, 6),
        target: args.to.slice(0, 6),
        value: parseFloat(
          parseFloat(ethers.utils.formatUnits(args.amount)).toFixed(4)
        ),
      }))
      .filter((link) => link.value > 0)
      .slice(-20);
    const users = new Set();
    for (const tx of alluData) {
      users.add(tx.source);
      users.add(tx.target);
    }
    alluNodes = [...users].map((user) => ({ name: user }));
  };

  const distributionBar = () => {
    distributionBarData = richData
      .map((rich) => ({
        group: "Balances",
        address: rich.address,
        balance: parseFloat(ethers.utils.formatUnits(rich.balance)),
      }))
      .filter((rich) => rich.balance > 0)
      .sort((a, b) => b.balance - a.balance)
      .slice(0, innerWidth > 400 ? 25 : 15);
  };

  const distributionCircle = () => {
    const filtered = richData
      .map((rich) => ({
        name: rich.address,
        value: parseFloat(ethers.utils.formatUnits(rich.balance)),
      }))
      .filter((rich) => rich.value > 0)
      .sort((a, b) => b.value - a.value);

    const topTen = filtered.slice(0, 10);
    const topFifty = filtered.slice(10, 50);
    const topHundred = filtered.slice(50, 100);
    const topFiveHundred = filtered.slice(100, 500);
    const topThousand = filtered.slice(100, 1000);
    const rest = filtered.slice(1000);

    distributionCircleData = [
      { name: "Top 10", children: topTen },
      { name: "Top 50", children: topFifty },
      { name: "Top 100", children: topHundred },
      { name: "Top 500", children: topFiveHundred },
      { name: "Top 1000", children: topThousand },
      { name: "Rest", children: rest },
    ];

    distributionBar();
  };

  const distribution = () => {
    const sorted = richData.sort((a, b) =>
      ethers.BigNumber.from(a.balance).lt(b.balance)
    );

    const topTen = sorted
      .slice(0, 10)
      .reduce((a, b) => a.add(b.balance), ethers.BigNumber.from(0));

    const topFifty = sorted
      .slice(0, 50)
      .reduce((a, b) => a.add(b.balance), ethers.BigNumber.from(0));

    const topHundred = sorted
      .slice(0, 100)
      .reduce((a, b) => a.add(b.balance), ethers.BigNumber.from(0));

    const topFiveHundred = sorted
      .slice(0, 500)
      .reduce((a, b) => a.add(b.balance), ethers.BigNumber.from(0));

    const topThousand = sorted
      .slice(0, 1000)
      .reduce((a, b) => a.add(b.balance), ethers.BigNumber.from(0));

    const all = sorted.reduce(
      (a, b) => a.add(b.balance),
      ethers.BigNumber.from(0)
    );

    distributionData = [
      { value: parseFloat(topTen.toString()), group: "Top 10" },
      { value: parseFloat(topFifty.toString()), group: "Top 50" },
      { value: parseFloat(topHundred.toString()), group: "Top 100" },
      { value: parseFloat(topFiveHundred.toString()), group: "Top 500" },
      { value: parseFloat(topThousand.toString()), group: "Top 1000" },
      { value: parseFloat(all.toString()), group: "Everyone" },
    ];

    totalSupply = parseInt(ethers.utils.formatUnits(all));

    distributionCircle();
  };

  const richList = () => {
    const balances = {};
    for (const tx of transactions) {
      const { from, to, amount } = tx.event.args;

      balances[from] = balances[from] || ethers.BigNumber.from(0);
      balances[to] = balances[to] || ethers.BigNumber.from(0);

      if (from !== "0x0000000000000000000000000000000000000000") {
        balances[from] = balances[from].sub(amount);
      }

      balances[to] = balances[to].add(amount);
    }

    richData = Object.entries(balances).map(([address, balance]) => ({
      id: address,
      address,
      balance,
    }));

    distribution();
    allu();
  };

  const populateTxChart = () => {
    txChart = transactions
      .filter(
        (tx) =>
          tx.event.args.from !== "0x0000000000000000000000000000000000000000"
      )
      .map((tx) => ({
        group: "Transfers",
        block: tx.block.number,
        amount: parseFloat(ethers.utils.formatUnits(tx.event.args.amount)),
      }))
      .slice(-100);
  };

  onMount(async () => {
    populateTxTable();
    richList();
    populateTxChart();
  });
</script>

<svelte:window bind:innerWidth />

<DefaultTags
  description={metadata.summary}
  title="Kenshi — Analytics — {metadata.name}"
  image="/images/social.analytics.png"
/>

<Content class="gap">
  <Grid padding>
    <Row>
      <Column lg={2}>
        {#if metadata.logo}
          <img src={https(metadata.logo)} class="logo" alt={metadata.name} />
        {:else}
          <Skeleton height={128} width={128} />
        {/if}
      </Column>
      <Column>
        <div class="flex-column padding">
          {#if metadata.symbol && metadata.name}
            <ExpressiveHeading size={5}>
              <h1>
                <img
                  src={https(metadata.logo)}
                  class="inline-logo"
                  alt={metadata.name}
                />
                {metadata.name} ({metadata.symbol})
              </h1>
            </ExpressiveHeading>
          {:else}
            <Skeleton width="240" height="16">
              <rect width="240" height="16" x="0" y="0" rx="2" ry="2" />
            </Skeleton>
          {/if}
          {#if metadata.description}
            <div class="body-01">
              {metadata.description}
            </div>
          {:else}
            <Skeleton width="100%" height="100">
              <rect width="100%" height="16" x="0" y="0" rx="2" ry="2" />
              <rect width="100%" height="16" x="0" y="28" rx="2" ry="2" />
              <rect width="100%" height="16" x="0" y="56" rx="2" ry="2" />
              <rect width="100%" height="16" x="0" y="84" rx="2" ry="2" />
            </Skeleton>
          {/if}
        </div>
      </Column>
    </Row>
    <Row>
      <Column>
        <div class="buttons">
          {#if metadata.website}
            <Button href={https(metadata.website)} target="_blank" icon={Http}>
              Website
            </Button>
          {/if}
          {#if metadata.whitepaper}
            <Button
              href={https(metadata.whitepaper)}
              target="_blank"
              icon={Book}
              kind="tertiary"
            >
              Whitepaper
            </Button>
          {/if}
          {#if metadata.twitter}
            <Button
              href={https(metadata.twitter)}
              target="_blank"
              icon={LogoTwitter}
              kind="tertiary"
            >
              Twitter
            </Button>
          {/if}
          {#if metadata.discord}
            <Button
              href={https(metadata.discord)}
              target="_blank"
              icon={LogoDiscord}
              kind="tertiary"
            >
              Discord
            </Button>
          {/if}
          {#if metadata.telegram}
            <Button
              href={https(metadata.telegram)}
              target="_blank"
              icon={SendAlt}
              kind="tertiary"
            >
              Telegram
            </Button>
          {/if}
          {#if metadata.github}
            <Button
              href={https(metadata.github)}
              target="_blank"
              icon={LogoGithub}
              kind="tertiary"
            >
              GitHub
            </Button>
          {/if}
          {#if metadata.buylink}
            <Button
              href={https(metadata.buylink)}
              target="_blank"
              icon={ShoppingCart}
              kind="secondary"
            >
              Buy
            </Button>
          {/if}
        </div>
      </Column>
      <Column>
        <div class="notification">
          <InlineNotification kind="info" hideCloseButton title="API Access">
            <div slot="subtitle">
              Looking for API access to this data? Get an
              <OutboundLink href="/dashboard">API Key</OutboundLink> or read the
              <OutboundLink href="/docs/services/deep-index">
                Documentation
              </OutboundLink>.
            </div>
          </InlineNotification>
        </div>
      </Column>
    </Row>
    <Row>
      <Column>
        <ExpressiveHeading size={2}>
          <h2>Analytics</h2>
        </ExpressiveHeading>
      </Column>
    </Row>
    <Row>
      <Column>
        <ContentSwitcher bind:selectedIndex={currentPage}>
          <Switch>
            <div style="display: flex; align-items: center;">
              <Events style="margin-right: 0.5rem;" /> Holders
            </div>
          </Switch>
          <Switch>
            <div style="display: flex; align-items: center;">
              <AnalyticsReference style="margin-right: 0.5rem;" />
              {#if innerWidth > 400}
                Transactions
              {:else}
                Txns
              {/if}
            </div>
          </Switch>
          <Switch>
            <div style="display: flex; align-items: center;">
              <Globe style="margin-right: 0.5rem;" /> Edge Map
            </div>
          </Switch>
        </ContentSwitcher>
      </Column>
    </Row>
    {#if currentPage === pages.HOLDERS}
      <Row>
        <Column sm={4} lg={8}>
          <div class="table-holder">
            <DataTable
              headers={richTable.headers}
              rows={richData}
              pageSize={richTable.pageSize}
              page={richTable.page}
              title="Rich List"
              description="List of Kenshi holders."
              sortable
              bind:sortKey={richTable.sortKey}
              bind:sortDirection={richTable.sortDirection}
            >
              <Toolbar>
                <ToolbarContent>
                  <ToolbarSearch
                    persistent
                    shouldFilterRows
                    bind:filteredRowIds={richTable.filteredRowIds}
                  />
                  <ToolbarMenu>
                    <ToolbarMenuItem
                      primaryFocus
                      href="/docs/services/deep-index"
                    >
                      Documentation
                    </ToolbarMenuItem>
                  </ToolbarMenu>
                </ToolbarContent>
              </Toolbar>
              <svelte:fragment slot="cell" let:row let:cell>
                {#if cell.key === "balance"}
                  {formatThousands(
                    ethers.utils
                      .formatUnits(cell.value)
                      .replace(/(\.\d{4}).*/, "$1"),
                    ","
                  )}
                  {metadata.symbol || ""}
                {:else}
                  {cell.value}
                {/if}
              </svelte:fragment>
            </DataTable>
            <Pagination
              bind:pageSize={richTable.pageSize}
              bind:page={richTable.page}
              totalItems={richTable.filteredRowIds.length}
              pageSizeInputDisabled
            />
          </div>
        </Column>
        <Column>
          {#if distributionData.length}
            <DonutChart
              data={distributionData}
              options={{
                title: "Token Distribution",
                resizable: true,
                legend: {
                  alignment: "center",
                },
                donut: {
                  center: {
                    label: "Total Supply",
                    number: totalSupply,
                  },
                  alignment: "center",
                },
                height: "433px",
                theme: $theme,
              }}
            />
          {/if}
        </Column>
      </Row>
      <Row>
        <Column lg={8}>
          {#if distributionBarData.length}
            <BarChartSimple
              data={distributionBarData}
              options={{
                title: `Balance Chart - Top ${innerWidth > 400 ? 25 : 15}`,
                points: {
                  enabled: false,
                },
                axes: {
                  left: {
                    mapsTo: "balance",
                    title: "Balance",
                    scaleType: "linear",
                  },
                  bottom: {
                    mapsTo: "address",
                    scaleType: "labels",
                    title: "Address",
                    includeZero: false,
                  },
                },
                theme: $theme,
                height: "600px",
              }}
            />
          {/if}
        </Column>
        <Column lg={8}>
          {#if distributionCircleData.length}
            <div class="no-node-groups">
              <CirclePackChart
                data={distributionCircleData}
                options={{
                  title: "Whale Chart",
                  canvasZoom: {
                    enabled: true,
                  },
                  height: "600px",
                  theme: $theme,
                }}
              />
            </div>
          {/if}
        </Column>
      </Row>
      <Row>
        <Column>
          {#if distributionCircleData.length}
            <div class="no-node-groups">
              <TreemapChart
                data={distributionCircleData}
                options={{
                  title: "Holders Map",
                  height: "600px",
                  theme: $theme,
                }}
              />
            </div>
          {/if}
        </Column>
      </Row>
    {:else if currentPage === pages.TRANSACTIONS}
      <Row>
        <Column>
          <div class="table-holder">
            <DataTable
              headers={txTable.headers}
              rows={txTableData}
              pageSize={txTable.pageSize}
              page={txTable.page}
              title="Transactions"
              description="List of Kenshi transactions."
              sortable
              bind:sortKey={txTable.sortKey}
              bind:sortDirection={txTable.sortDirection}
            >
              <Toolbar>
                <ToolbarContent>
                  <ToolbarSearch
                    persistent
                    shouldFilterRows
                    bind:filteredRowIds={txTable.filteredRowIds}
                  />
                  <ToolbarMenu>
                    <ToolbarMenuItem
                      primaryFocus
                      href="/docs/services/deep-index"
                    >
                      Documentation
                    </ToolbarMenuItem>
                  </ToolbarMenu>
                </ToolbarContent>
              </Toolbar>
              <svelte:fragment slot="cell" let:row let:cell>
                {#if cell.key === "amount"}
                  {formatThousands(
                    ethers.utils
                      .formatUnits(cell.value)
                      .replace(/(\.\d{4}).*/, "$1"),
                    ","
                  )}
                  {metadata.symbol || ""}
                {:else if cell.key === "hash"}
                  <OutboundLink href="${explorer}/tx/{cell.value}">
                    {explorerName}
                  </OutboundLink>
                {:else}
                  {cell.value}
                {/if}
              </svelte:fragment>
            </DataTable>
            <Pagination
              bind:pageSize={txTable.pageSize}
              bind:page={txTable.page}
              totalItems={txTable.filteredRowIds.length}
              pageSizeInputDisabled
            />
          </div>
        </Column>
      </Row>
      <Row>
        <Column>
          {#if txChart.length}
            <BarChartSimple
              data={txChart}
              options={{
                title: "Transfers",
                points: {
                  enabled: false,
                },
                axes: {
                  left: {
                    mapsTo: "amount",
                    title: "Amount",
                    scaleType: "linear",
                  },
                  bottom: {
                    mapsTo: "block",
                    scaleType: "linear",
                    title: "Block",
                    includeZero: false,
                  },
                },
                theme: $theme,
                height: "400px",
              }}
            />
          {/if}
        </Column>
      </Row>
      <Row>
        <Column>
          {#if alluData.length}
            <AlluvialChart
              data={alluData}
              options={{
                title: "Last 20 Transactions",
                height: "600px",
                alluvial: {
                  nodes: alluNodes,
                  nodeAlignment: "center",
                },
                legend: {
                  enabled: false,
                },
                theme: $theme,
              }}
            />
          {/if}
        </Column>
      </Row>
    {:else if currentPage === pages.EDGE_MAP}
      {#if transactions.length}
        <EdgeMap {transactions} />
      {/if}
    {/if}
    <Row>
      <Column>
        <div class="footer-buttons buttons">
          <Button href="/analytics" icon={DashboardReference}>
            See All Projects
          </Button>
          <div class="flex-spacer" />
          <Button href="/dashboard" icon={Dashboard}>Add Your Project</Button>
        </div>
      </Column>
    </Row>
  </Grid>
</Content>

<Footer />

<style>
  .logo {
    width: 128px;
  }
  .buttons {
    display: flex;
    gap: 1em;
    margin-top: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }
  .inline-logo {
    height: 1em;
    display: none;
  }
  @media (max-width: 640px) {
    .table-holder :global(.bx--pagination) {
      overflow: hidden;
    }
    h1 {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }
    .logo {
      display: none;
    }
    .inline-logo {
      display: inline-block;
    }
    .table-holder :global(table) {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }
    .notification :global(.bx--inline-notification) {
      max-width: 100%;
    }
    .buttons {
      margin: 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .footer-buttons {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 0.5em;
    }
  }
</style>
