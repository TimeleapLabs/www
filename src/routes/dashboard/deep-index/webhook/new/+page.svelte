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

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import { WebhookProduct } from "src/lib/products/webhook";
  import { goto } from "$app/navigation";
  import { SpinLine } from "svelte-loading-spinners";
  import { getReverseAPIPrice } from "src/lib/dash/pricing";
  import { chainOptions } from "src/lib/dash/deep-index";
  import { wallet } from "src/stores/wallet";

  const { values, invalids, check } = WebhookProduct.getForm("insert");

  $values = {
    requests: 100000,
    fromBlock: 0,
    duration: 1,
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
  <Grid padding>
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
                      <p>
                        Blockchain events will be sent to this endpoint. You can
                        incorporate &#123;event&#125; into your URL, and the
                        R-API will substitute it with the name of each event
                        sent to your endpoint.
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextInput>
            </Column>
            <Column>
              <TextInput
                name="bearer"
                labelText="Authorization token"
                placeholder="Bearer"
                helperText="Sent to your endpoint in the Authorization header"
                bind:value={$values.bearer}
                invalid={$values.bearer && !!$invalids.bearer}
                invalidText={$invalids.bearer}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Authorization token">
                      <p>
                        This token will be sent to your endpoint in the
                        Authorization header in the form of "Bearer
                        &#123;token&#125;"
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextInput>
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>Your contract</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                Tell us where your smart contract is so we can start listening
                to it.
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
                placeholder="Contract address"
                name="address"
                helperText="Address of your smart contract, starts with 0x"
                bind:value={$values.address}
                invalid={$values.address && !!$invalids.address}
                invalidText={$invalids.address}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Contract address">
                      <p>
                        Address of your smart contract on the selected
                        blockchain.
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
                endpoint starting from this point.
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
              <ExpressiveHeading size={2}>Event information</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                Kenshi needs to understand your smart contract's events before
                it can notify you of them.
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <TextArea
                required
                placeholder="Human readable contract ABI"
                helperText="Human readable ABI of your contract. Exclude any events you don't want to be notified of."
                name="abi"
                bind:value={$values.abi}
                invalid={$values.abi && !!$invalids.abi}
                invalidText={$invalids.abi}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="ABI">
                      <p>Human readable ABI of your smart contract.</p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextArea>
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
                step={10000}
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
              <InlineNotification
                kind="info"
                title="Payments"
                subtitle="Currently all payments for the Kenshi services are done on Arbitrum One."
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
