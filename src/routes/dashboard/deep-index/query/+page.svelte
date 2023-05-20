<script>
  import Footer from "src/components/Footer.svelte";

  import { wallet } from "src/stores/wallet";
  import { onMount } from "svelte";
  import { ethers } from "ethers";

  import ConnectButton from "src/components/ConnectButton.svelte";

  import { Grid, Row, Column, Content } from "carbon-components-svelte";
  import { Button, Tile } from "carbon-components-svelte";
  import { Breadcrumb, BreadcrumbItem } from "carbon-components-svelte";
  import { Add, Book, UpdateNow } from "carbon-icons-svelte";
  import { CodeSigningService } from "carbon-icons-svelte";
  import { DataTable, Toolbar, ToolbarMenu } from "carbon-components-svelte";
  import { ToolbarMenuItem, ToolbarContent } from "carbon-components-svelte";
  import { ToolbarSearch, Pagination } from "carbon-components-svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import ApiKeyView from "src/components/dash/ApiKeyView.svelte";

  import { GraphProduct } from "src/lib/products/graph";
  import { signedKeys } from "src/stores/signed-keys";
  import { chainIcons, chainNames } from "src/lib/chains";

  const tierMap = {
    15: "Basic",
    10: "Growth",
    5: "Business",
    1: "Enterprise",
  };

  let userAddress;

  const setAddress = async () => {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner($wallet.accounts?.[0]?.address);
    userAddress = await signer.getAddress();
  };

  $: if ($wallet) setAddress();

  const headers = [
    { key: "encryptedKey", value: "API Key" },
    { key: "requests", value: "Remaining requests" },
    { key: "createdAt", value: "Created" },
    { key: "actions", value: "Actions" },
  ];

  let userApiKeys = [];
  let pageSize = 5;
  let page = 1;
  let filteredRowIds = [];

  const getUserApiKeys = async () => {
    userApiKeys = await GraphProduct.findAll(userAddress);
  };

  $: if (userAddress) {
    getUserApiKeys();
  }

  const signSharedKey = (sharedKey) => async () => {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    const signed = await signer.signMessage(sharedKey);
    $signedKeys[sharedKey] = signed;
  };

  onMount(() => {
    const interval = setInterval(getUserApiKeys, 60 * 1000);
    return () => clearInterval(interval);
  });
</script>

<Content>
  <Grid padding>
    <Row>
      <Column>
        <Breadcrumb>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/dashboard/deep-index/query" isCurrentPage>
            Deep Index Query
          </BreadcrumbItem>
        </Breadcrumb>
      </Column>
    </Row>

    <Row>
      <Column lg={4}>
        <Tile class="blue-tile">
          <div class="flex-column">
            <ExpressiveHeading size={5}>
              <h1>Deep Index Query</h1>
            </ExpressiveHeading>
            <p>
              With a GraphQL+MQL API key you can query all events already
              indexed on the Kenshi's geographically distributed data clusters.
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
                <p>Connect your wallet to see your API keys.</p>
              </div>
            </Column>
          </Row>
          <Row>
            <Column>
              <Button
                kind="secondary"
                href="/docs/services/deep-index/graphql"
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
        <ExpressiveHeading size={3}>Your API keys</ExpressiveHeading>
        <div class="helper-text-01">
          Connect your wallet to see your API keys.
        </div>
      </Column>
    </Row>

    <Row>
      <Column>
        <DataTable {headers} rows={userApiKeys} {pageSize} {page} sortable>
          <Toolbar>
            <ToolbarContent>
              <ToolbarSearch persistent shouldFilterRows bind:filteredRowIds />
              <ToolbarMenu>
                <ToolbarMenuItem
                  primaryFocus
                  href="/docs/services/deep-index/graphql"
                >
                  Documentation
                </ToolbarMenuItem>
              </ToolbarMenu>
              <Button icon={Add} href="/dashboard/deep-index/query/new">
                Create API key
              </Button>
            </ToolbarContent>
          </Toolbar>
          <svelte:fragment slot="cell" let:row let:cell>
            {#if cell.key === "actions"}
              <Button
                kind="ghost"
                size="small"
                icon={UpdateNow}
                href="/dashboard/deep-index/query/edit/{row.id}"
              >
                Update
              </Button>
              {#if !$signedKeys[row.sharedKey]}
                <Button
                  kind="ghost"
                  size="small"
                  icon={CodeSigningService}
                  on:click={signSharedKey(row.sharedKey)}
                >
                  Decrypt
                </Button>
              {/if}
            {:else if cell.key === "encryptedKey"}
              {#if !$signedKeys[row.sharedKey]}
                API key is encrypted
              {:else}
                <ApiKeyView
                  sharedKey={row.sharedKey}
                  encryptedKey={row.encryptedKey}
                />
              {/if}
            {:else if cell.key === "interval"}
              {tierMap[cell.value]}
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
