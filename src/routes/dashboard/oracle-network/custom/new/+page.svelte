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
  import { fixLabelTooltip } from "src/lib/tooltip";
  import { Link } from "carbon-components-svelte";
  import { wallet } from "src/stores/wallet";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import { OracleProduct } from "$lib/products/oracle";
  import { goto } from "$app/navigation";

  import { SpinLine } from "svelte-loading-spinners";
  import { getOraclePrice } from "src/lib/dash/pricing";
  import { chainOptions } from "src/lib/dash/deep-index";

  const { values, invalids, check } = OracleProduct.getForm("insert");

  $values = {
    chain: "ethereum-mainnet",
    duration: 1,
    calls: 10000,
    fromBlock: 0,
    concurrency: 10,
  };

  $: price = getOraclePrice($values.calls, $values.duration);

  let creatingOracle = false;

  const createOracle = async () => {
    creatingOracle = true;
    const success = await OracleProduct.insert({ values: $values, check });
    creatingOracle = false;
    if (success) goto("/dashboard/oracle-network/custom");
  };
</script>

<Content>
  <Grid noGutter padding narrow>
    <Row>
      <Column>
        <Breadcrumb>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/dashboard/oracle-network/custom">
            Custom Oracle
          </BreadcrumbItem>
          <BreadcrumbItem
            href="/dashboard/oracle-network/custom/new"
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
                <h1>New Custom Oracle</h1>
              </ExpressiveHeading>
              <p class="body-02">
                Create a new custom oracle on top of Kenshi's blazing fast
                oracle network. Use the technology of your choice to develop the
                business logic of your oracle.
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
              <p>
                Tell us where your smart contract is so we can read your events
                from it.
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
                What is the starting point? From which block number should we
                start looking for your events? This is usually the block on
                which your smart contract was deployed.
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
                <svelte:fragment slot="label">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Block">
                      <p>
                        Defines the start point of event sourcing. From which
                        block should we start looking for events?
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </NumberInput>
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>Oracle logic</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                We will send matching events to this endpoint for processing,
                the returned response will be sent to your smart contact. This
                endpoint should implement the
                <Link href="/docs/services/oracle-network/custom/protocol">
                  Kenshi Custom Oracle Protocol.
                </Link>
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <TextInput
                required
                placeholder="Endpoint"
                name="endpoint"
                helperText="Address of the oracle's HTTP endpoint"
                bind:value={$values.endpoint}
                invalid={$values.endpoint && !!$invalids.endpoint}
                invalidText={$invalids.endpoint}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Endpoint">
                      <p>
                        Address of your oracle's HTTP endpoint. Kenshi sends
                        matching events to this endpoint and calls your smart
                        contract with the response. This endpoint needs to
                        implement the Kenshi Custom Oracle Protocol.
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextInput>
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>Contract ABI</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                Kenshi needs to understand your smart contract to be able to
                look for its events or call its methods.
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <TextArea
                required
                placeholder="Human readable contract ABI"
                helperText="Human readable ABI of your contract."
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
              <ExpressiveHeading size={2}>Event Signature</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                We will send events with this signature (emitted from your smart
                contract) to your oracle endpoint.
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <TextInput
                required
                placeholder="Signature"
                name="signature"
                helperText="Event signature to look for"
                bind:value={$values.signature}
                invalid={$values.signature && !!$invalids.signature}
                invalidText={$invalids.signature}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Signature">
                      <p>
                        Signature of the event to look for. We'll send these
                        events to your oracle endpoint.
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextInput>
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>Concurrency</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                How many requests at max should the oracle be able to process at
                the same time? This affects a multitude of factors, read more
                <Link href="/docs/services/oracle-network/custom/concurrency">
                  here.
                </Link>
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <NumberInput
                placeholder="Concurrency"
                name="concurrency"
                label="Concurrency"
                bind:value={$values.concurrency}
                invalid={$values.concurrency && !!$invalids.concurrency}
                invalidText={$invalids.concurrency}
                required
                helperText="Defines how many requests can be processed at the same time"
              >
                <svelte:fragment slot="label">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Concurrency">
                      <p>
                        Defines how many requests can be processed at the same
                        time. Bigger numbers mean more requests could be
                        processed per second, but it also increases the risk of
                        losing gas due to errors in asynchronous nonce
                        management.
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </NumberInput>
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
                Custom oracle's cost a fixed monthly fee for the infrastructure,
                plus a variable cost depending on how many requests are
                processed.
              </p>
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
            <Column>
              <NumberInput
                placeholder="Calls"
                name="calls"
                label="Calls"
                bind:value={$values.calls}
                invalid={$values.calls && !!$invalids.calls}
                invalidText={$invalids.calls}
                required
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
                <Button on:click={createOracle} disabled={creatingOracle}>
                  {#if creatingOracle}
                    <SpinLine
                      size="32"
                      color="currentColor"
                      unit="px"
                      duration="4s"
                    />
                    Processing
                  {:else}
                    Create Oracle ${price}
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
