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
  import { WatsonHealthAiStatus } from "carbon-icons-svelte";
  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";

  import { OracleProduct } from "src/lib/products/oracle";
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

  const headers = [
    { key: "id", value: "Oracle ID" },
    { key: "blockchain", value: "Blockchain" },
    { key: "address", value: "Contract address" },
    { key: "endpoint", value: "Endpoint" },
    { key: "callsLeft", value: "Calls" },
    { key: "expiresAt", value: "Expires" },
    { key: "actions", value: "Actions" },
  ];

  let userCustomOracles = [];
  let pageSize = 5;
  let page = 1;
  let filteredRowIds = [];

  const getUserOracles = async () => {
    userCustomOracles = await OracleProduct.findAll(userAddress);
  };

  $: if (userAddress) {
    getUserOracles();
  }

  onMount(() => {
    const interval = setInterval(getUserOracles, 60 * 1000);
    return () => clearInterval(interval);
  });
</script>

<Content>
  <Grid noGutter padding narrow>
    <Row>
      <Column>
        <Breadcrumb>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/dashboard/oracle-network/custom" isCurrentPage>
            Custom oracle
          </BreadcrumbItem>
        </Breadcrumb>
      </Column>
    </Row>

    <Row>
      <Column lg={4}>
        <Tile class="blue-tile">
          <div class="flex-column">
            <ExpressiveHeading size={5}>
              <h1>Custom oracle</h1>
            </ExpressiveHeading>
            <p>This is the first step to make your own custom oracle.</p>
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
                <p>Connect your wallet to see your custom oracles.</p>
              </div>
            </Column>
          </Row>
          <Row>
            <Column>
              <Button
                kind="secondary"
                href="/docs/services/oracle-network/custom"
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
        <ExpressiveHeading size={3}>Your custom oracles</ExpressiveHeading>
        <div class="helper-text-01">
          Connect your wallet to see your oracles.
        </div>
      </Column>
    </Row>

    <Row>
      <Column>
        <DataTable
          {headers}
          rows={userCustomOracles}
          {pageSize}
          {page}
          sortable
        >
          <Toolbar>
            <ToolbarContent>
              <ToolbarSearch persistent shouldFilterRows bind:filteredRowIds />
              <ToolbarMenu>
                <ToolbarMenuItem
                  primaryFocus
                  href="/docs/services/oracle-network/custom"
                >
                  Documentation
                </ToolbarMenuItem>
              </ToolbarMenu>
              <Button icon={Add} href="/dashboard/oracle-network/custom/new">
                Create Oracle
              </Button>
            </ToolbarContent>
          </Toolbar>
          <svelte:fragment slot="cell" let:row let:cell>
            {#if cell.key === "actions"}
              <span class="actions">
                <Link
                  icon={UpdateNow}
                  href="/dashboard/oracle-network/custom/edit/{row.id}"
                >
                  Update
                </Link>
                <Link
                  icon={WatsonHealthAiStatus}
                  href="/dashboard/oracle-network/custom/logs/{row.id}"
                >
                  Logs
                </Link>
              </span>
            {:else if cell.key === "expiresAt"}
              {new Date(cell.value).toLocaleDateString()}
            {:else if cell.key === "blockchain"}
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
  .actions {
    display: flex;
    gap: 1em;
  }
</style>
