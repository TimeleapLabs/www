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

  import { VrfProduct } from "src/lib/products/vrf";
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
    { key: "credit", value: "Credits" },
    { key: "allow", value: "Allow list" },
    { key: "actions", value: "Actions" },
  ];

  let userVrfCredits = [];
  let pageSize = 5;
  let page = 1;
  let filteredRowIds = [];

  const getUserVrfCredits = async () => {
    userVrfCredits = await VrfProduct.findAll(userAddress);
  };

  $: if (userAddress) {
    getUserVrfCredits();
  }

  const formatCredits = (n) => {
    try {
      const [lhs, rhs = ""] = ethers.utils.formatUnits(n.toString()).split(".");
      return [lhs, rhs.slice(0, 2)].filter(Boolean).join(".");
    } catch (error) {
      return 0;
    }
  };

  onMount(() => {
    const interval = setInterval(getUserVrfCredits, 60 * 1000);
    return () => clearInterval(interval);
  });
</script>

<Content>
  <Grid noGutter padding narrow>
    <Row>
      <Column>
        <Breadcrumb>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/dashboard/oracle-network/vrf" isCurrentPage>
            vrf
          </BreadcrumbItem>
        </Breadcrumb>
      </Column>
    </Row>

    <Row>
      <Column lg={4}>
        <Tile class="blue-tile">
          <div class="flex-column">
            <ExpressiveHeading size={5}>
              <h1>VRF</h1>
            </ExpressiveHeading>
            <p>
              Verfiable Random Functions can be used to get randomness on the
              blockchain in a fair, secure and verifable way.
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
                <p>Connect your wallet to see your vrf subscriptions.</p>
              </div>
            </Column>
          </Row>
          <Row>
            <Column>
              <Button kind="secondary" href="/docs/services/vrf" icon={Book}>
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
        <ExpressiveHeading size={3}>Your vrf subscriptions</ExpressiveHeading>
        <div class="helper-text-01">
          Connect your wallet to see your subscriptions.
        </div>
      </Column>
    </Row>

    <Row>
      <Column>
        <DataTable
          {headers}
          rows={userVrfCredits}
          {pageSize}
          {page}
          sortable
          expandable
          batchExpansion
        >
          <Toolbar>
            <ToolbarContent>
              <ToolbarSearch persistent shouldFilterRows bind:filteredRowIds />
              <ToolbarMenu>
                <ToolbarMenuItem primaryFocus href="/docs/services/vrf">
                  Documentation
                </ToolbarMenuItem>
              </ToolbarMenu>
              <Button icon={Add} href="/dashboard/oracle-network/vrf/new">
                New subscription
              </Button>
            </ToolbarContent>
          </Toolbar>
          <svelte:fragment slot="cell" let:row let:cell>
            {#if cell.key === "actions"}
              <Button
                size="small"
                kind="ghost"
                icon={UpdateNow}
                href="/dashboard/oracle-network/vrf/edit/{row.id}"
              >
                Update
              </Button>
            {:else if cell.key === "credit"}
              {formatCredits(cell.value)} KENSHI
            {:else if cell.key === "chain"}
              <span class="chain">
                <img
                  src="/images/chains/{chainIcons[cell.value]}.svg"
                  alt={chainNames[cell.value]}
                />
                {chainNames[cell.value]}
              </span>
            {:else if cell.key === "allow"}
              {cell.value.length} Contract{cell.value.length > 1 ? "s" : ""}
            {:else}
              {cell.value}
            {/if}
          </svelte:fragment>
          <svelte:fragment slot="expanded-row" let:row>
            <div class="flex-column expanded">
              <ExpressiveHeading size={1}>
                <h5>Allow list</h5>
              </ExpressiveHeading>
              <div class="addresses">
                {#each row.allow as address}
                  <div>{address}</div>
                {/each}
              </div>
            </div>
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
  .addresses {
    font-family: "IBM Plex Mono", monospace;
  }
  .expanded {
    padding: 1em 0;
  }
</style>
