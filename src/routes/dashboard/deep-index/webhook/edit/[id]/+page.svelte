<script>
  import { page } from "$app/stores";

  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Content } from "carbon-components-svelte";
  import { ClickableTile, Tile } from "carbon-components-svelte";
  import { Breadcrumb, BreadcrumbItem } from "carbon-components-svelte";
  import { TextInput } from "carbon-components-svelte";
  import { NumberInput, TextInputSkeleton } from "carbon-components-svelte";
  import { TextArea, TextAreaSkeleton } from "carbon-components-svelte";
  import { Button } from "carbon-components-svelte";
  import { Tooltip, InlineNotification } from "carbon-components-svelte";
  import { Email, Information } from "carbon-icons-svelte";
  import { fixLabelTooltip } from "src/lib/tooltip";
  import { Tabs, Tab, TabContent } from "carbon-components-svelte";
  import { UpdateNow, Purchase } from "carbon-icons-svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import { WebhookProduct } from "src/lib/products/webhook";
  import { SpinLine } from "svelte-loading-spinners";
  import { getReverseAPIPrice } from "src/lib/dash/pricing";
  import { wallet } from "src/stores/wallet";
  import { ethers } from "ethers";

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

  $creditValues = { duration: 1, requests: 100000 };

  $: if (hookFromId) {
    $updateValues = {
      endpoint: hookFromId.endpoint,
      abi: JSON.stringify(hookFromId.abi, null, 2),
      address: hookFromId.address,
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
                          <ExpressiveHeading size={2}>
                            Contract details
                          </ExpressiveHeading>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <p>
                            You can change the contract address of an already
                            existing task.
                          </p>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          {#if hookFromId}
                            <TextInput
                              required
                              placeholder="Contract address"
                              name="address"
                              helperText="Address of your smart contract, starts with 0x"
                              bind:value={$updateValues.address}
                              invalid={$updateValues.address &&
                                !!$updateInvalids.address}
                              invalidText={$updateInvalids.address}
                            >
                              <svelte:fragment slot="labelText">
                                <div use:fixLabelTooltip>
                                  <Tooltip triggerText="Contract address">
                                    <p>
                                      Address of your smart contract on the
                                      selected blockchain.
                                    </p>
                                  </Tooltip>
                                </div>
                              </svelte:fragment>
                            </TextInput>
                          {:else}
                            <TextInputSkeleton />
                          {/if}
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <ExpressiveHeading size={2}>
                            Event information
                          </ExpressiveHeading>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <p>
                            Contract ABI can be updated if you want to include
                            or exclude some tasks.
                          </p>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          {#if hookFromId}
                            <TextArea
                              required
                              placeholder="Human readable contract ABI"
                              helperText="Human readable ABI of your contract. Exclude any events you don't want to index."
                              name="abi"
                              bind:value={$updateValues.abi}
                              invalid={$updateValues.abi &&
                                !!$updateInvalids.abi}
                              invalidText={$updateInvalids.abi}
                            >
                              <svelte:fragment slot="labelText">
                                <div use:fixLabelTooltip>
                                  <Tooltip triggerText="ABI">
                                    <p>
                                      Human readable ABI of your smart contract.
                                    </p>
                                  </Tooltip>
                                </div>
                              </svelte:fragment>
                            </TextArea>
                          {:else}
                            <TextAreaSkeleton />
                          {/if}
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
                            step={100000}
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
