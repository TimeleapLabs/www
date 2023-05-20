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
    getUserSubs(owner: "${owner}", syncTasks: true) {
      syncTasks {
        id
        signature
        abi
        args {
          name
          value
        }
        fromBlock
        chain
        address
        frequency
        storage
        expiresAt
      }
    }
  }`;

  const headers = [
    { key: "id", value: "Task ID" },
    { key: "chain", value: "Blockchain" },
    { key: "address", value: "Contract address" },
    { key: "fromBlock", value: "From block" },
    { key: "storage", value: "Storage" },
    { key: "frequency", value: "Frequency" },
    { key: "expiresAt", value: "Expires" },
    { key: "actions", value: "Actions" },
  ];

  let userSyncTasks = [];
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
    userSyncTasks = result.data?.getUserSubs?.syncTasks || [];
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
          <BreadcrumbItem href="/dashboard/deep-index/sync" isCurrentPage>
            Deep Index Sync
          </BreadcrumbItem>
        </Breadcrumb>
      </Column>
    </Row>

    <Row>
      <Column lg={4}>
        <Tile class="blue-tile">
          <div class="flex-column">
            <ExpressiveHeading size={5}>
              <h1>Deep Index Sync</h1>
            </ExpressiveHeading>
            <p>This is the first step to make your contract queryable.</p>
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
                <p>Connect your wallet to see your sync tasks.</p>
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
        <ExpressiveHeading size={3}>Your indexing tasks</ExpressiveHeading>
        <div class="helper-text-01">Connect your wallet to see your tasks.</div>
      </Column>
    </Row>

    <Row>
      <Column>
        <DataTable {headers} rows={userSyncTasks} {pageSize} {page} sortable>
          <Toolbar>
            <ToolbarContent>
              <ToolbarSearch persistent shouldFilterRows bind:filteredRowIds />
              <ToolbarMenu>
                <ToolbarMenuItem
                  primaryFocus
                  href="/docs/services/deep-index/sync"
                >
                  Documentation
                </ToolbarMenuItem>
              </ToolbarMenu>
              <Button icon={Add} href="/dashboard/deep-index/sync/new">
                Create Task
              </Button>
            </ToolbarContent>
          </Toolbar>
          <svelte:fragment slot="cell" let:row let:cell>
            {#if cell.key === "actions"}
              <Link
                icon={UpdateNow}
                href="/dashboard/deep-index/sync/edit/{row.id}"
              >
                Update
              </Link>
            {:else if cell.key === "storage"}
              {cell.value} GB
            {:else if cell.key === "frequency"}
              Every {cell.value} seconds
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
