<script>
  import { page } from "$app/stores";

  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Content } from "carbon-components-svelte";
  import { ClickableTile, Tile } from "carbon-components-svelte";
  import { Breadcrumb, BreadcrumbItem } from "carbon-components-svelte";
  import { TextInput } from "carbon-components-svelte";
  import { NumberInput } from "carbon-components-svelte";
  import { TextArea } from "carbon-components-svelte";
  import { Button } from "carbon-components-svelte";
  import { Tooltip, InlineNotification } from "carbon-components-svelte";
  import { Email, Information } from "carbon-icons-svelte";
  import { fixLabelTooltip } from "src/lib/tooltip";
  import { Tabs, Tab, TabContent } from "carbon-components-svelte";
  import { UpdateNow, Purchase } from "carbon-icons-svelte";

  import ArgumentFilter from "src/components/dash/ArgumentFilter.svelte";
  import ObjectArrayField from "src/components/ObjectArrayField.svelte";
  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import { WebhookProduct } from "src/lib/products/webhook";
  import { SpinLine } from "svelte-loading-spinners";
  import { getReverseAPIPrice } from "src/lib/dash/pricing";
  import { wallet } from "src/stores/wallet";
  import { ethers } from "ethers";
  import { valuesFromAllow } from "src/lib/utils";

  let userAddress;

  const setAddress = async () => {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner($wallet.accounts?.[0]?.address);
    userAddress = await signer.getAddress();
  };

  $: if ($wallet) setAddress();

  let userWebhooks = [];

  const getUserTasks = async () => {
    userWebhooks = await WebhookProduct.findAll(userAddress);
  };

  $: if (userAddress) getUserTasks();

  const { id } = $page.params;
  let hookFromId;

  $: if (userWebhooks.length) {
    for (const task of userWebhooks) {
      if (task.id === id) {
        hookFromId = task;
        break;
      }
    }
  }

  const {
    check: checkUpdate,
    values: updateValues,
    invalids: updateInvalids,
  } = WebhookProduct.getForm("update");

  const {
    check: checkCredit,
    values: creditValues,
    invalids: creditInvalids,
  } = WebhookProduct.getForm("credit");

  let contractAddress;
  let abi;
  let duration = 1;

  $creditValues = { duration: 1, requests: 1000000 };

  $: if (hookFromId) {
    $updateValues = {
      endpoint: hookFromId.endpoint,
      ...valuesFromAllow(hookFromId.query),
    };
  }

  let isUpdating = false;

  const update = async () => {
    isUpdating = true;
    await WebhookProduct.update(
      { values: $updateValues, check: checkUpdate },
      hookFromId
    );
    isUpdating = false;
  };

  let isAddingCredit = false;

  const credit = async () => {
    isAddingCredit = true;
    await WebhookProduct.credit(
      { values: $creditValues, check: checkCredit },
      hookFromId
    );
    isAddingCredit = false;
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
            href="/dashboard/deep-index/sync/edit/{id}"
            isCurrentPage
          >
            Update
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
                <h1>Update Task</h1>
              </ExpressiveHeading>
              <p class="body-02">
                Certain properties of an R-API task can be changed after it is
                created. If you want to extend the expiration date of your task
                or add more requests, you can do so in the "Add Credit" tab.
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
              <Tabs type="container">
                <Tab label="Update Details" />
                <Tab label="Add Credit" />
                <svelte:fragment slot="content">
                  <TabContent>
                    <Grid fullWidth noGutter>
                      <Row>
                        <Column>
                          <ExpressiveHeading size={2}
                            >Your endpoint</ExpressiveHeading
                          >
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <p>
                            Kenshi R-API sends blockchain events to your HTTP
                            endpoint. This endpoint needs to return a 2xx code
                            on success, if any other code is returned the sent
                            events will be rescheduled.
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
                            bind:value={$updateValues.endpoint}
                            invalid={$updateValues.endpoint &&
                              !!$updateInvalids.endpoint}
                            invalidText={$updateInvalids.endpoint}
                          >
                            <svelte:fragment slot="labelText">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="R-API endpoint">
                                  <p>
                                    Blockchain events will be sent to this
                                    endpoint.
                                  </p>
                                </Tooltip>
                              </div>
                            </svelte:fragment>
                          </TextInput>
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
                            All events matching these criteria will be sent to
                            your webhook endpoint.
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
                            bind:value={$updateValues.contracts}
                          >
                            <svelte:fragment slot="labelText">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Contracts">
                                  <p>
                                    List of contract addresses to add to the
                                    R-API query.
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
                            bind:value={$updateValues.events}
                          >
                            <svelte:fragment slot="labelText">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Events">
                                  <p>
                                    List of event names to add to the R-API
                                    query. Leave empty to include all events.
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
                            bind:value={$updateValues.maxBlock}
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
                            bind:values={$updateValues.arguments}
                            component={ArgumentFilter}
                          />
                        </Column>
                      </Row>

                      <Row>
                        <Column>
                          <Button
                            on:click={update}
                            disabled={isUpdating}
                            icon={UpdateNow}
                          >
                            {#if isUpdating}
                              <SpinLine
                                size="32"
                                color="currentColor"
                                unit="px"
                                duration="4s"
                              />
                              Processing
                            {:else}
                              Update
                            {/if}
                          </Button>
                        </Column>
                      </Row>
                    </Grid>
                  </TabContent>
                  <TabContent>
                    <Grid fullWidth noGutter>
                      <Row>
                        <Column>
                          <ExpressiveHeading size={2}>
                            Extend expiration date
                          </ExpressiveHeading>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <p>
                            Existing Deep Indexing tasks can be extended to
                            function for a longer period of time.
                          </p>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <NumberInput
                            required
                            placeholder="Duration"
                            name="duration"
                            helperText="Number of months to run this R-API subscription"
                            bind:value={$creditValues.duration}
                            invalid={$creditValues.duration &&
                              !!$creditInvalids.duration}
                            invalidText={$creditInvalids.duration}
                          >
                            <svelte:fragment slot="labelText">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Duration">
                                  <p>
                                    Number of months to add to the R-API
                                    subscription
                                  </p>
                                </Tooltip>
                              </div>
                            </svelte:fragment>
                          </NumberInput>
                        </Column>
                        <Column>
                          <NumberInput
                            required
                            placeholder="Requests"
                            name="requests"
                            helperText="Number of requests to add to this R-API subscription"
                            bind:value={$creditValues.requests}
                            invalid={$creditValues.requests &&
                              !!$creditInvalids.requests}
                            invalidText={$creditInvalids.requests}
                            step={1000000}
                          >
                            <svelte:fragment slot="labelText">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Duration">
                                  <p>
                                    Number of requests to add to this R-API
                                    subscription.
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
                            subtitle="Currently all payments for the Kenshi services are done on the BNB Chain."
                            hideCloseButton
                          />
                        </Column>
                      </Row>

                      <Row>
                        <Column>
                          <Button
                            on:click={credit}
                            disabled={isAddingCredit}
                            icon={Purchase}
                          >
                            {#if isAddingCredit}
                              <SpinLine
                                size="32"
                                color="currentColor"
                                unit="px"
                                duration="4s"
                              />
                              Processing
                            {:else}
                              Extend
                              {#if $creditValues.duration || $creditValues.requests}
                                for ${getReverseAPIPrice(
                                  $creditValues.duration,
                                  $creditValues.requests
                                ).toFixed(2)}
                              {/if}
                            {/if}
                          </Button>
                        </Column>
                      </Row>
                    </Grid>
                  </TabContent>
                </svelte:fragment>
              </Tabs>
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
