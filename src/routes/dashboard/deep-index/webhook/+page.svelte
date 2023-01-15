<script>
  import { wallet } from "src/stores/wallet";
  import { onMount } from "svelte";
  import { ethers } from "ethers";

  import { Grid, Row, Column, Content } from "carbon-components-svelte";
  import { Button, Tile } from "carbon-components-svelte";
  import { Breadcrumb, BreadcrumbItem } from "carbon-components-svelte";
  import { Add, Book, UpdateNow } from "carbon-icons-svelte";
  import { DataTable, Toolbar, ToolbarMenu } from "carbon-components-svelte";
  import { ToolbarMenuItem, ToolbarContent } from "carbon-components-svelte";
  import { ToolbarSearch, Pagination } from "carbon-components-svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";
  import Footer from "src/components/Footer.svelte";

  import { WebhookProduct } from "src/lib/products/webhook";
  import { chainIcons, chainNames } from "src/lib/chains";

  let userAddress;

  const setAddress = async () => {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner($wallet.accounts?.[0]?.address);
    userAddress = await signer.getAddress();
  };

  $: if ($wallet) setAddress();

  const headers = [
    { key: "chain", value: "Blockchain" },
    { key: "syncTaskId", value: "Sync task" },
    { key: "endpoint", value: "Endpoint" },
    { key: "requests", value: "Requests left" },
    { key: "expiresAt", value: "Expires" },
    { key: "actions", value: "Actions" },
  ];

  let userWebhooks = [];
  let pageSize = 5;
  let page = 1;
  let filteredRowIds = [];

  const getUserWebhooks = async () => {
    userWebhooks = await WebhookProduct.findAll(userAddress);
  };

  $: if (userAddress) {
    getUserWebhooks();
  }

  onMount(() => {
    const interval = setInterval(getUserWebhooks, 60 * 1000);
    return () => clearInterval(interval);
  });
</script>

<Content>
  <Grid noGutter padding narrow>
    <Row>
      <Column>
        <Breadcrumb>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/dashboard/deep-index/webhook" isCurrentPage>
            Deep Index R-API
          </BreadcrumbItem>
        </Breadcrumb>
      </Column>
    </Row>

    <Row>
      <Column lg={4}>
        <Tile class="blue-tile">
          <div class="flex-column">
            <ExpressiveHeading size={5}>
              <h1>Deep Index R-API</h1>
            </ExpressiveHeading>
            <p>
              Stop the long-polling and get events delivered to your HTTP
              endpoints instead.
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
                <p>Connect your wallet to see your R-API tasks.</p>
              </div>
            </Column>
          </Row>
          <Row>
            <Column>
              <Button
                kind="secondary"
                href="/docs/services/deep-index/webhook"
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
        <DataTable {headers} rows={userWebhooks} {pageSize} {page} sortable>
          <Toolbar>
            <ToolbarContent>
              <ToolbarSearch persistent shouldFilterRows bind:filteredRowIds />
              <ToolbarMenu>
                <ToolbarMenuItem
                  primaryFocus
                  href="/docs/services/deep-index/webhook"
                >
                  Documentation
                </ToolbarMenuItem>
              </ToolbarMenu>
              <Button icon={Add} href="/dashboard/deep-index/webhook/new">
                New R-API
              </Button>
            </ToolbarContent>
          </Toolbar>
          <svelte:fragment slot="cell" let:row let:cell>
            {#if cell.key === "actions"}
              <Button
                size="small"
                kind="ghost"
                icon={UpdateNow}
                href="/dashboard/deep-index/webhook/edit/{row.id}"
              >
                Update
              </Button>
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
