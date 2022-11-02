<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Content } from "carbon-components-svelte";
  import { ClickableTile, Tile } from "carbon-components-svelte";
  import { Breadcrumb, BreadcrumbItem } from "carbon-components-svelte";
  import { Select, SelectItem } from "carbon-components-svelte";
  import { TextInput } from "carbon-components-svelte";
  import { NumberInput } from "carbon-components-svelte";
  import { TextArea } from "carbon-components-svelte";
  import { Button } from "carbon-components-svelte";
  import { Tooltip, InlineNotification } from "carbon-components-svelte";
  import { Email, Information } from "carbon-icons-svelte";
  import { Purchase } from "carbon-icons-svelte";
  import { fixLabelTooltip } from "src/lib/tooltip";

  import ArgumentFilter from "src/components/dash/ArgumentFilter.svelte";
  import ObjectArrayField from "src/components/ObjectArrayField.svelte";
  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import { WebhookProduct } from "src/lib/products/webhook";
  import { goto } from "$app/navigation";
  import { SpinLine } from "svelte-loading-spinners";
  import { getReverseAPIPrice } from "src/lib/dash/pricing";
  import { chainOptions } from "src/lib/dash/deep-index";
  import { wallet } from "src/stores/wallet";

  const { values, invalids, check } = WebhookProduct.getForm("insert");

  let rowId = 0;

  $values = {
    requests: 1000000,
    fromBlock: 0,
    duration: 1,
    maxBlock: 0,
    arguments: [{ argument: "", value: "", id: rowId++ }],
    query: [],
  };

  $: price = getReverseAPIPrice($values.duration, $values.requests);

  let creatingTask = false;

  const createKey = async () => {
    creatingTask = true;
    const success = await WebhookProduct.insert({ values: $values, check });
    creatingTask = false;
    if (success) goto("/dashboard/deep-index/webhook");
  };
</script>

<Content>
  <Grid noGutter padding narrow>
    <Row>
      <Column>
        <Breadcrumb>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/dashboard/deep-index/webhook">
            Deep Index R-API
          </BreadcrumbItem>
          <BreadcrumbItem
            href="/dashboard/deep-index/webhook/new"
            isCurrentPage
          >
            New
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
                <h1>New R-API</h1>
              </ExpressiveHeading>
              <p class="body-02">
                Kenshi R-API enables serverless data flows and integration of
                blockchain data with existing automation tools.
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
            href="/docs/services/deep-index/webhook"
            icon={Information}
          >
            Read the docs
          </Button>
          <ConnectButton primary />
        </div>
      </Column>
      <Column>
        <Grid>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>Your endpoint</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                Kenshi R-API sends blockchain events to your HTTP endpoint. This
                endpoint needs to return a 2xx code on success, if any other
                code is returned the sent events will be rescheduled.
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <TextInput
                required
                name="endpoint"
                labelText="R-API endpoint"
                placeholder="Your HTTP endpoint"
                helperText="To which HTTP endpoint should R-API send your events?"
                bind:value={$values.endpoint}
                invalid={$values.endpoint && !!$invalids.endpoint}
                invalidText={$invalids.endpoint}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="R-API endpoint">
                      <p>Blockchain events will be sent to this endpoint.</p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextInput>
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>Linked Sync task</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                All R-API subscriptions need to be linked with a Deep Index Sync
                task. Metadata from the Sync task is used by R-API to keep track
                of sourced events from the blockchain.
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <Select
                bind:selected={$values.chain}
                required
                helperText="This is the chain where your contract is deployed to."
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Blockchain">
                      <p>
                        Choose the blockchain that hosts your smart contract.
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
                {#each chainOptions as option}
                  <SelectItem value={option.value} text={option.label} />
                {/each}
              </Select>
            </Column>
            <Column>
              <TextInput
                required
                name="sync-task"
                labelText="Sync task ID"
                placeholder="Sync task ID"
                helperText="Sync task ID matching the criteria of this R-API subscription"
                bind:value={$values.syncTaskId}
                invalid={$values.syncTaskId && !!$invalids.syncTaskId}
                invalidText={$invalids.syncTaskId}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Sync task ID">
                      <p>
                        A Deep Index Sync task id for this R-API task to keep
                        track of the sourced events in Kenshi's geographically
                        distributed data cluster.
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextInput>
            </Column>
          </Row>

          <Row>
            <Column>
              <ExpressiveHeading size={2}>Starting point</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                Choose a starting point. R-API sends blockchain events to your
                endpoint starting from this point. You can choose a block number
                in the past, but it should be bigger than the starting block of
                the linked Sync task.
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <NumberInput
                placeholder="Block number"
                name="block"
                helperText="Starting block to check for events"
                label="Starting block"
                required
                bind:value={$values.fromBlock}
                invalid={$values.fromBlock && !!$invalids.fromBlock}
                invalidText={$invalids.fromBlock}
              >
                <svelte:fragment slot="label">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Starting block">
                      <p>
                        From which block number should R-API start notifying
                        your endpoint?
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </NumberInput>
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>Quota and duration</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                R-API pricing is based on how many months your subscription
                lasts, and how many requests in total will be made to your
                endpoint.
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <NumberInput
                placeholder="Duration"
                name="duration"
                helperText="Number of months to keep this service active"
                label="Duration"
                required
                bind:value={$values.duration}
                invalid={$values.duration && !!$invalids.requests}
                invalidText={$invalids.duration}
              >
                <svelte:fragment slot="label">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Duration">
                      <p>
                        Total number of months this service should be active.
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </NumberInput>
            </Column>
            <Column>
              <NumberInput
                placeholder="Requests"
                name="requests"
                helperText="Total number of requests available to this R-API subscription"
                label="Requests"
                required
                bind:value={$values.requests}
                invalid={$values.requests && !!$invalids.requests}
                invalidText={$invalids.requests}
                step={100000}
              >
                <svelte:fragment slot="label">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Requests">
                      <p>
                        Total number of requests that can be made to this API
                        key.
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </NumberInput>
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>Query</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                All events matching these criteria will be sent to your webhook
                endpoint.
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <TextArea
                placeholder="Contract addresses, one per line"
                helperText="Allowed contract addresses, one per line. This is required."
                name="contracts"
                required
                bind:value={$values.contracts}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Contracts">
                      <p>
                        List of contract addresses to add to the R-API query.
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextArea>
            </Column>
          </Row>
          <Row>
            <Column>
              <TextArea
                placeholder="Event names, one per line"
                helperText="Event names, one per line. Leave empty to include all events."
                name="events"
                bind:value={$values.events}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Events">
                      <p>
                        List of event names to add to the R-API query. Leave
                        empty to include all events.
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextArea>
            </Column>
          </Row>
          <Row>
            <Column>
              <NumberInput
                placeholder="Maximum block number"
                label="Max block"
                name="maxBlock"
                helperText="Maximum block number to query"
                bind:value={$values.maxBlock}
              >
                <svelte:fragment slot="label">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Max block">
                      <p>Maximum block number to be queried.</p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </NumberInput>
            </Column>
          </Row>
          <Row>
            <Column>
              <ObjectArrayField
                bind:values={$values.arguments}
                component={ArgumentFilter}
              />
            </Column>
          </Row>

          <Row>
            <Column>
              <InlineNotification
                kind="info"
                title="Payments"
                subtitle="Currently all payments for the Kenshi services are done on the BNB Chain."
                hideCloseButton
              />
            </Column>
          </Row>

          <Row>
            <Column>
              {#if !$wallet?.provider}
                <ConnectButton primary />
              {:else}
                <Button
                  on:click={createKey}
                  disabled={creatingTask}
                  icon={Purchase}
                >
                  {#if creatingTask}
                    <SpinLine
                      size="32"
                      color="currentColor"
                      unit="px"
                      duration="4s"
                    />
                    Processing
                  {:else}
                    Register endpoint ${price}
                  {/if}
                </Button>
              {/if}
            </Column>
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
</style>
