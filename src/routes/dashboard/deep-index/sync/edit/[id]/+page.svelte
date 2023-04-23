<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Content } from "carbon-components-svelte";
  import { ClickableTile, Tile } from "carbon-components-svelte";
  import { Breadcrumb, BreadcrumbItem } from "carbon-components-svelte";
  import { TextInput } from "carbon-components-svelte";
  import { NumberInput } from "carbon-components-svelte";
  import { TextArea, Slider } from "carbon-components-svelte";
  import { Button, Select, SelectItem } from "carbon-components-svelte";
  import { Tooltip, InlineNotification } from "carbon-components-svelte";
  import { Email, Information } from "carbon-icons-svelte";
  import { fixLabelTooltip } from "src/lib/tooltip";
  import { Tabs, Tab, TabContent } from "carbon-components-svelte";
  import { TextInputSkeleton } from "carbon-components-svelte";
  import { TextAreaSkeleton } from "carbon-components-svelte";
  import { UpdateNow, Purchase } from "carbon-icons-svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import { SpinLine } from "svelte-loading-spinners";
  import { wallet } from "src/stores/wallet";
  import { ethers } from "ethers";
  import { getSyncPrice } from "src/lib/dash/pricing";
  import { SyncProduct } from "$lib/products/sync";
  import { page } from "$app/stores";
  import { frequencyOptions } from "$lib/dash/deep-index";

  let userAddress;
  let userSyncTasks = [];

  const setAddress = async () => {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner($wallet.accounts?.[0]?.address);
    userAddress = await signer.getAddress();
  };

  $: if ($wallet) setAddress();

  const getUserTasks = async () => {
    userSyncTasks = await SyncProduct.findAll(userAddress);
  };

  $: if (userAddress) getUserTasks();

  const { id } = $page.params;
  let taskFromId;

  $: if (userSyncTasks.length) {
    for (const task of userSyncTasks) {
      if (task.id === id) {
        taskFromId = task;
        break;
      }
    }
  }

  const {
    values: updateValues,
    invalids: updateInvalids,
    check: updateCheck,
  } = SyncProduct.getForm("update");

  const {
    values: creditValues,
    invalids: creditInvalids,
    check: creditCheck,
  } = SyncProduct.getForm("credit");

  $creditValues = { duration: 1 };

  $: if (taskFromId) {
    $updateValues = {
      abi: JSON.stringify(taskFromId.abi, null, 2),
      address: taskFromId.address,
    };
    $creditValues = {
      duration: 1,
      frequency: taskFromId.frequency,
      storage: taskFromId.storage,
    };
  }

  let isUpdating = false;

  const update = async () => {
    isUpdating = true;
    await SyncProduct.update(
      { values: $updateValues, check: updateCheck },
      taskFromId
    );
    isUpdating = false;
  };

  let isAddingCredit = false;

  const credit = async () => {
    isAddingCredit = true;
    await SyncProduct.credit(
      { values: $creditValues, check: creditCheck },
      taskFromId
    );
    isAddingCredit = false;
  };

  $: unitPrice =
    $creditValues.frequency && $creditValues.storage
      ? getSyncPrice($creditValues.frequency, $creditValues.storage, 1)
      : 0;
</script>

<Content>
  <Grid noGutter padding narrow>
    <Row>
      <Column>
        <Breadcrumb>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/dashboard/deep-index/sync">
            Deep Index Sync
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
                Certain properties of a deep indexing task can be changed after
                it is created. If you want to extend the expiration date of your
                task, you can do so in the "Add Credit" tab.
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
            href="/docs/services/deep-index/sync"
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
                          {#if taskFromId}
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
                          {#if taskFromId}
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
                            Each indexing task's frequency determines how fast
                            events are retrieved from the blockchain. Storage
                            defines how many events can be indexed.
                          </p>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <Slider
                            step={0.1}
                            min={0.1}
                            max={400}
                            bind:value={$creditValues.storage}
                            maxLabel={"400GB"}
                            labelText="Storage"
                          >
                            <svelte:fragment slot="labelText">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Storage">
                                  <p>
                                    Each 0.1GB stores approximately 325,000
                                    events.
                                  </p>
                                </Tooltip>
                              </div>
                            </svelte:fragment>
                          </Slider>
                        </Column>
                        <Column>
                          <Select
                            bind:selected={$creditValues.frequency}
                            required
                            helperText="You will have {$creditValues.frequency ===
                            1
                              ? 'a few milliseconds'
                              : `up to ${$creditValues.frequency} seconds`} of delay for indexing new events"
                          >
                            <svelte:fragment slot="labelText">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Frequency">
                                  <p>
                                    This property defines how often we look for
                                    your events on the blockchain.
                                  </p>
                                </Tooltip>
                              </div>
                            </svelte:fragment>
                            {#each frequencyOptions as option}
                              <SelectItem
                                value={option.value}
                                text={option.label}
                              />
                            {/each}
                          </Select>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <NumberInput
                            required
                            placeholder="Duration"
                            name="duration"
                            helperText="Number of months to run the indexing task"
                            bind:value={$creditValues.duration}
                            invalid={$creditValues.duration &&
                              !!$creditInvalids.duration}
                            invalidText={$creditInvalids.duration}
                          >
                            <svelte:fragment slot="labelText">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Duration">
                                  <p>
                                    Number of months to run the indexing task.
                                  </p>
                                </Tooltip>
                              </div>
                            </svelte:fragment>
                          </NumberInput>
                        </Column>
                      </Row>

                      {#if $creditValues.storage < taskFromId.storage}
                        <Row>
                          <Column>
                            <InlineNotification
                              kind="info"
                              title="Storage"
                              subtitle="New storage size cannot be smaller than the current one."
                              hideCloseButton
                            />
                          </Column>
                        </Row>
                      {/if}

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

                      {#if $creditValues.storage >= taskFromId.storage}
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
                                {#if $creditValues.duration && unitPrice}
                                  for ${(
                                    unitPrice * $creditValues.duration
                                  ).toFixed(2)}
                                {/if}
                              {/if}
                            </Button>
                          </Column>
                        </Row>
                      {/if}
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
