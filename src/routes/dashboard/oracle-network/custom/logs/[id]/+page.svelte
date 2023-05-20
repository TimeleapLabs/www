<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Content } from "carbon-components-svelte";
  import { ClickableTile, Tile } from "carbon-components-svelte";
  import { Breadcrumb, BreadcrumbItem } from "carbon-components-svelte";
  import { DataTable, DataTableSkeleton } from "carbon-components-svelte";
  import { Pagination, TextArea } from "carbon-components-svelte";
  import { CodeSnippet, CodeSnippetSkeleton } from "carbon-components-svelte";
  import { Button } from "carbon-components-svelte";
  import { Email, Information } from "carbon-icons-svelte";
  import { CheckmarkFilled } from "carbon-icons-svelte";
  import { Misuse, IncompleteCancel } from "carbon-icons-svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import { wallet } from "src/stores/wallet";
  import { ethers } from "ethers";
  import { OracleProduct } from "$lib/products/oracle";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let userAddress;
  let userCustomOracles = [];

  const setAddress = async () => {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner($wallet.accounts?.[0]?.address);
    userAddress = await signer.getAddress();
  };

  $: if ($wallet) setAddress();

  const getUserOracles = async () => {
    userCustomOracles = await OracleProduct.findAll(userAddress);
  };

  $: if (userAddress) getUserOracles();

  const { id } = $page.params;

  let oracleFromId;
  let oracleStats;

  const headers = [
    { key: "status", value: "Status" },
    { key: "retries", value: "Retries" },
    { key: "error", value: "Errors" },
    { key: "date", value: "Date" },
  ];

  let pageSize = 10;
  let tableCurrentPage = 1;

  $: if (userCustomOracles.length) {
    for (const oracle of userCustomOracles) {
      if (oracle.id === id) {
        oracleFromId = oracle;
        break;
      }
    }
  }

  const fetchLogs = async () => {
    const resp = await fetch(`https://api.kenshi.io/oracles/logs/${id}`);
    oracleStats = await resp.json();
  };

  let rows = [];

  $: if (oracleStats) {
    rows = oracleStats.logs
      .map((row) => ({
        id: row._id,
        ...row,
        date:
          new Date(row.succeededAt).valueOf() ||
          new Date(row.canceledAt).valueOf() ||
          new Date(row.failedAt).valueOf(),
        status: row.success,
      }))
      .sort((a, b) => b.date - a.date);
  }

  const formatDate = (iso) =>
    [
      new Date(iso).toLocaleDateString(),
      new Date(iso).toLocaleTimeString(),
    ].join(" ");

  const getErrorMessage = (error) => {
    try {
      return JSON.parse(error).errorMessage || error;
    } catch (_err) {
      return error;
    }
  };

  onMount(() => {
    const interval = setInterval(fetchLogs, 10000);
    fetchLogs();
    return () => {
      clearInterval(interval);
    };
  });
</script>

<Content>
  <Grid padding>
    <Row>
      <Column>
        <Breadcrumb>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/dashboard/oracle-network/custom">
            Custom Oracle
          </BreadcrumbItem>
          <BreadcrumbItem
            href="/dashboard/oracle-network/custom/logs/{id}"
            isCurrentPage
          >
            Logs
          </BreadcrumbItem>
        </Breadcrumb>
      </Column>
    </Row>

    <Row>
      <Column lg={4}>
        <div class="stick sidebar">
          <Tile class="blue-tile">
            <div class="form-info">
              <ExpressiveHeading size={4}>
                <h1>Custom Oracle Logs</h1>
              </ExpressiveHeading>
              <p class="body-02">
                On this page you can view various statistics about your custom
                oracle, such as the last processed block, the oracle operator
                address, and the delivery logs.
              </p>
            </div>
          </Tile>

          <ClickableTile>
            <div class="form-info">
              <ExpressiveHeading size={4}>
                <h2>Need help?</h2>
              </ExpressiveHeading>
              <p class="body-02">
                Contact us for free consultation. We will help you choose the
                best configuration, and the best plan for your use case.
              </p>
              <div class="icon">
                <Email />
              </div>
            </div>
          </ClickableTile>

          <Button
            kind="secondary"
            href="/docs/services/oracle-network/custom"
            icon={Information}
          >
            Read the docs
          </Button>
          <ConnectButton primary />
        </div>
      </Column>
      <Column>
        <Grid padding>
          <Row>
            <Column>
              <ExpressiveHeading size={3}>
                <h3 class="margin">Oracle Operator</h3>
              </ExpressiveHeading>
              {#if userAddress}
                {#if oracleFromId}
                  <CodeSnippet code={oracleFromId.gasWallet} />
                {:else}
                  <CodeSnippetSkeleton kind="single" />
                {/if}
              {:else}
                <CodeSnippet
                  code={"Connect your wallet to see the operator address."}
                />
              {/if}
            </Column>
            <Column>
              <ExpressiveHeading size={3}>
                <h3 class="margin">Last Processed Block</h3>
              </ExpressiveHeading>
              {#if oracleStats}
                <CodeSnippet code={oracleStats.block} />
              {:else}
                <CodeSnippetSkeleton />
              {/if}
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={3}>
                <h3>Delivery Logs</h3>
              </ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              {#if oracleStats}
                <DataTable
                  expandable
                  nonExpandableRowIds={rows
                    .filter((row) => !row.error)
                    .map((row) => row.id)}
                  sortable
                  {pageSize}
                  page={tableCurrentPage}
                  {headers}
                  {rows}
                >
                  <svelte:fragment slot="expanded-row" let:row>
                    <div class="expanded-error">
                      <TextArea readonly value={getErrorMessage(row.error)} />
                    </div>
                  </svelte:fragment>
                  <svelte:fragment slot="cell" let:row let:cell>
                    {#if cell.key === "status"}
                      <span class="status">
                        {#if row.success}
                          <CheckmarkFilled color="var(--cds-support-success)" />
                          Success
                        {:else if row.canceled}
                          <IncompleteCancel color="var(--cds-support-error)" />
                          Failed
                        {:else}
                          <Misuse color="var(--cds-support-warning)" />
                          Retrying
                        {/if}
                      </span>
                    {:else if cell.key === "date"}
                      <span class="date">
                        {#if row.success}
                          {formatDate(row.succeededAt)}
                        {:else if row.canceled}
                          <IncompleteCancel color="var(--cds-support-error)" />
                          Failed
                        {:else}
                          <Misuse color="var(--cds-support-warning)" />
                          Retrying
                        {/if}
                      </span>
                    {:else if cell.key === "error" && row.success}
                      N/A
                    {:else if cell.key === "error"}
                      <span class="error-message">
                        {getErrorMessage(cell.value)}
                      </span>
                    {:else}
                      {cell.value}
                    {/if}
                  </svelte:fragment>
                </DataTable>
                <Pagination
                  bind:pageSize
                  bind:page={tableCurrentPage}
                  totalItems={rows.length}
                  pageSizeInputDisabled
                />
              {:else}
                <DataTableSkeleton
                  rows={10}
                  sortable
                  {pageSize}
                  page={tableCurrentPage}
                  {headers}
                />
              {/if}
            </Column>
          </Row>
          <Row>
            <Column />
          </Row>
        </Grid>
      </Column>
    </Row>
  </Grid>
</Content>

<Footer />

<style>
  .sidebar {
    padding-top: 1em;
    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: flex-start;
  }
  .form-info {
    display: flex;
    flex-direction: column;
    gap: 2em;
  }
  h3.margin {
    margin-bottom: 1em;
  }
  .status {
    display: inline-flex;
    gap: 0.5em;
    align-items: center;
  }
  .error-message {
    white-space: pre;
    max-width: 440px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
  .expanded-error {
    box-sizing: border-box;
    padding: 1em;
  }
</style>
