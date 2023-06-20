<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Content } from "carbon-components-svelte";
  import { ClickableTile, Tile } from "carbon-components-svelte";
  import { Breadcrumb, BreadcrumbItem } from "carbon-components-svelte";
  import { Select, SelectItem } from "carbon-components-svelte";
  import { TextInput } from "carbon-components-svelte";
  import { NumberInput } from "carbon-components-svelte";
  import { TextArea, Slider } from "carbon-components-svelte";
  import { Button } from "carbon-components-svelte";
  import { Tooltip, InlineNotification } from "carbon-components-svelte";
  import { Email, Information } from "carbon-icons-svelte";
  import { fixLabelTooltip } from "src/lib/tooltip";
  import { wallet } from "src/stores/wallet";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import { SyncProduct } from "$lib/products/sync";
  import { goto } from "$app/navigation";

  import { SpinLine } from "svelte-loading-spinners";
  import { getSyncPrice } from "src/lib/dash/pricing";
  import { chainOptions, frequencyOptions } from "src/lib/dash/deep-index";

  const { values, invalids, check } = SyncProduct.getForm("insert");

  $values = {
    chain: "ethereum-mainnet",
    duration: 1,
    fromBlock: 0,
    frequency: 5,
    storage: 0.5,
  };

  $: price = getSyncPrice($values.frequency, $values.storage, $values.duration);

  let creatingTask = false;

  const createTask = async () => {
    creatingTask = true;
    const success = await SyncProduct.insert({ values: $values, check });
    creatingTask = false;
    if (success) goto("/dashboard/deep-index/sync");
  };
</script>

<Content>
  <Grid padding>
    <Row>
      <Column>
        <Breadcrumb>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/dashboard/deep-index/sync">
            Deep Index Sync
          </BreadcrumbItem>
          <BreadcrumbItem href="/dashboard/deep-index/sync/new" isCurrentPage>
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
                <h1>New Deep Indexing Task</h1>
              </ExpressiveHeading>
              <p class="body-02">
                Create a new Deep Indexing sync task to store and index events
                from your smart contract into Kenshi's geographically
                distributed data clusters.
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
              <ExpressiveHeading size={2}>
                First things first!
              </ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>Tell us where your smart contract is so we can index it.</p>
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
                What is the starting point? From which block number should we
                start looking for your events?
              </p>
              <p>
                This is usually the block on which your smart contract was
                created.
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <NumberInput
                placeholder="Starting block"
                label="Block"
                name="from"
                helperText="Kenshi uses this as the starting block to look for events emitted from your smart contract."
                required
                bind:value={$values.fromBlock}
                invalid={$values.fromBlock && !!$invalids.fromBlock}
                invalidText={$invalids.fromBlock}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Block">
                      <p>
                        Defines the start point of event indexing. From which
                        block should we start the indexing?
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
                it can index them.
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <TextArea
                required
                placeholder="Human readable contract ABI"
                helperText="Human readable ABI of your contract. Exclude any events you don't want to index."
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
              <ExpressiveHeading size={2}>Billing</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                Each indexing task's frequency determines how fast events are
                retrieved from the blockchain. Storage defines how many events
                can be indexed.
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <Slider
                step={0.1}
                min={0.1}
                max={400}
                bind:value={$values.storage}
                maxLabel={"400GB"}
                labelText="Storage"
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Storage">
                      <p>Each 0.1GB stores approximately 325,000 events.</p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </Slider>
            </Column>
            <Column>
              <Select
                bind:selected={$values.frequency}
                required
                helperText="You will have {$values.frequency === 1
                  ? 'a few milliseconds'
                  : `up to ${$values.frequency} seconds`} of delay for indexing new events"
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Frequency">
                      <p>
                        This property defines how often we look for your events
                        on the blockchain.
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
                {#each frequencyOptions as option}
                  <SelectItem value={option.value} text={option.label} />
                {/each}
              </Select>
            </Column>
          </Row>

          <Row>
            <Column>
              <NumberInput
                placeholder="Duration (Months)"
                name="duration"
                label="Duration (Months)"
                bind:value={$values.duration}
                invalid={$values.duration && !!$invalids.duration}
                invalidText={$invalids.duration}
                required
              />
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
                <Button on:click={createTask} disabled={creatingTask}>
                  {#if creatingTask}
                    <SpinLine
                      size="32"
                      color="currentColor"
                      unit="px"
                      duration="4s"
                    />
                    Processing
                  {:else}
                    Create Task ${price}
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
