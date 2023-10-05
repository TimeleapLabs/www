<script>
  import Footer from "src/components/Footer.svelte";

  import { wallet } from "src/stores/wallet";
  import { onMount } from "svelte";
  import { ethers } from "ethers";

  import ConnectButton from "src/components/ConnectButton.svelte";

  import { Grid, Row, Column, Content } from "carbon-components-svelte";
  import { Tile } from "carbon-components-svelte";
  import { Button, Link } from "carbon-components-svelte";
  import { Breadcrumb, BreadcrumbItem } from "carbon-components-svelte";
  import { Add, Book, UpdateNow } from "carbon-icons-svelte";
  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";

  import { chainIcons, chainNames } from "src/lib/chains";

  import {
    DataTable,
    Toolbar,
    ToolbarMenu,
    ToolbarMenuItem,
    ToolbarContent,
    ToolbarSearch,
    Pagination,
  } from "carbon-components-svelte";

  let userAddress;

  const setAddress = async () => {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner($wallet.accounts?.[0]?.address);
    userAddress = await signer.getAddress();
  };

  $: if ($wallet) setAddress();

  const syncTaskQuery = (owner) => `{
    getUserSubs(owner: "${owner}", analytics: true) {
      analytics {
        id
        fromBlock
        chain
        address
        expiresAt
      }
    }
  }`;

  const headers = [
    { key: "id", value: "Id" },
    { key: "chain", value: "Blockchain" },
    { key: "address", value: "Contract address" },
    { key: "fromBlock", value: "From block" },
    { key: "actions", value: "Actions" },
  ];

  let userAnalytics = [];
  let pageSize = 5;
  let page = 1;
  let filteredRowIds = [];

  const getUserTasks = async () => {
    const query = syncTaskQuery(userAddress);

    const response = await fetch("https://api.kenshi.io/subscriptions", {
      method: "POST",
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    userAnalytics = result.data?.getUserSubs?.analytics || [];
  };

  $: if (userAddress) {
    getUserTasks();
  }

  onMount(() => {
    const interval = setInterval(getUserTasks, 60 * 1000);
    return () => clearInterval(interval);
  });
</script>

<Content>
  <Grid padding>
    <Row>
      <Column>
        <Breadcrumb>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/dashboard/deep-index/analytics" isCurrentPage>
            Deep Index Analytics
          </BreadcrumbItem>
        </Breadcrumb>
      </Column>
    </Row>

    <Row>
      <Column lg={4}>
        <Tile class="blue-tile">
          <div class="flex-column">
            <ExpressiveHeading size={5}>
              <h1>Deep Index Analytics</h1>
            </ExpressiveHeading>
            <p>
              Get actionable insights about your token and offer transparency to
              your users.
            </p>
          </div>
        </Tile>
      </Column>
      <Column>
        <Grid fullWidth>
          <Row>
            <Column>
              <div class="flex-column">
                <ExpressiveHeading size={2}>
                  <h4>+You</h4>
                </ExpressiveHeading>
                <p>Connect your wallet to see your profiles.</p>
              </div>
            </Column>
          </Row>
          <Row>
            <Column>
              <Button
                kind="secondary"
                href="/docs/services/deep-index/sync"
                icon={Book}
              >
                Documentation
              </Button>
              <ConnectButton primary />
            </Column>
          </Row>
        </Grid>
      </Column>
    </Row>

    <Row>
      <Column>
        <ExpressiveHeading size={3}>Your analytics profiles</ExpressiveHeading>
        <div class="helper-text-01">
          Connect your wallet to see your profiles.
        </div>
      </Column>
    </Row>

    <Row>
      <Column>
        <DataTable {headers} rows={userAnalytics} {pageSize} {page} sortable>
          <Toolbar>
            <ToolbarContent>
              <ToolbarSearch persistent shouldFilterRows bind:filteredRowIds />
              <ToolbarMenu>
                <ToolbarMenuItem
                  primaryFocus
                  href="/docs/services/deep-index/analytics"
                >
                  Documentation
                </ToolbarMenuItem>
              </ToolbarMenu>
              <Button icon={Add} href="/dashboard/deep-index/analytics/new">
                Create Profile
              </Button>
            </ToolbarContent>
          </Toolbar>
          <svelte:fragment slot="cell" let:row let:cell>
            {#if cell.key === "actions"}
              <Link
                icon={UpdateNow}
                href="/dashboard/deep-index/analytics/edit/{row.id}"
              >
                Update
              </Link>
            {:else if cell.key === "expiresAt"}
              {new Date(cell.value).toLocaleDateString()}
            {:else if cell.key === "chain"}
              <span class="chain">
                <img
                  src="/images/chains/{chainIcons[cell.value]}.svg"
                  alt={chainNames[cell.value]}
                />
                {chainNames[cell.value]}
              </span>
            {:else}
              {cell.value}
            {/if}
          </svelte:fragment>
        </DataTable>

        <Pagination
          bind:pageSize
          bind:page
          totalItems={filteredRowIds.length}
          pageSizeInputDisabled
        />
      </Column>
    </Row>
  </Grid>
</Content>

<Footer />

<style>
  .chain img {
    height: 1em;
  }
  .chain {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
  }
</style>
