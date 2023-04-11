<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Content } from "carbon-components-svelte";
  import { ClickableTile, Tile } from "carbon-components-svelte";
  import { Breadcrumb, BreadcrumbItem } from "carbon-components-svelte";
  import { TextInput } from "carbon-components-svelte";
  import { NumberInput } from "carbon-components-svelte";
  import { TextArea, CodeSnippet } from "carbon-components-svelte";
  import { Button } from "carbon-components-svelte";
  import { Tooltip, InlineNotification } from "carbon-components-svelte";
  import { Email, Information } from "carbon-icons-svelte";
  import { fixLabelTooltip } from "src/lib/tooltip";
  import { Tabs, Tab, TabContent } from "carbon-components-svelte";
  import { TextInputSkeleton } from "carbon-components-svelte";
  import { NumberInputSkeleton } from "carbon-components-svelte";
  import { TextAreaSkeleton, Link } from "carbon-components-svelte";
  import { UpdateNow, Purchase } from "carbon-icons-svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import { SpinLine } from "svelte-loading-spinners";
  import { wallet } from "src/stores/wallet";
  import { ethers } from "ethers";
  import { getOraclePrice } from "src/lib/dash/pricing";
  import { OracleProduct } from "$lib/products/oracle";
  import { page } from "$app/stores";

  let price = 0;
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

  $: if (userCustomOracles.length) {
    for (const oracle of userCustomOracles) {
      if (oracle.id === id) {
        oracleFromId = oracle;
        break;
      }
    }
  }

  const {
    values: updateValues,
    invalids: updateInvalids,
    check: updateCheck,
  } = OracleProduct.getForm("update");

  const {
    values: creditValues,
    invalids: creditInvalids,
    check: creditCheck,
  } = OracleProduct.getForm("credit");

  $creditValues = { duration: 1, calls: 10000 };

  $: if (oracleFromId) {
    $updateValues = {
      abi: JSON.stringify(oracleFromId.abi, null, 2),
      address: oracleFromId.address,
      endpoint: oracleFromId.endpoint,
      signature: oracleFromId.signature,
      concurrency: oracleFromId.concurrency,
      confirmations: oracleFromId.confirmations || 0,
    };
  }

  let isUpdating = false;

  const update = async () => {
    isUpdating = true;
    await OracleProduct.update(
      { values: $updateValues, check: updateCheck },
      oracleFromId
    );
    isUpdating = false;
  };

  let isAddingCredit = false;

  const credit = async () => {
    isAddingCredit = true;
    await OracleProduct.credit(
      { values: $creditValues, check: creditCheck },
      oracleFromId
    );
    isAddingCredit = false;
  };

  $: price =
    oracleFromId && $creditValues.duration && $creditValues.calls
      ? getOraclePrice(
          oracleFromId.tier,
          $creditValues.calls,
          $creditValues.duration
        )
      : 0;
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
            href="/dashboard/oracle-network/custom/edit/{id}"
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
                <h1>Update Oracle</h1>
              </ExpressiveHeading>
              <p class="body-02">
                Certain properties of a custom oracle can be changed after it is
                created. If you want to extend the expiration date of your
                oracle, you can do so in the "Add Credit" tab.
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
                            existing oracle.
                          </p>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          {#if oracleFromId}
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
                            Confirmations
                          </ExpressiveHeading>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <p>
                            How many block confirmations do you need before
                            processing an event?
                          </p>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          {#if oracleFromId}
                            <NumberInput
                              placeholder="Confirmations"
                              label="Confirmations"
                              name="confirmations"
                              helperText="Oracle Network waits for {$updateValues.confirmations ||
                                0} blocks before sending an event to your oracle."
                              required
                              bind:value={$updateValues.confirmations}
                              invalid={$updateValues.confirmations &&
                                !!$updateInvalids.confirmations}
                              invalidText={$updateInvalids.confirmations}
                            >
                              <svelte:fragment slot="label">
                                <div use:fixLabelTooltip>
                                  <Tooltip triggerText="Confirmations">
                                    <p>
                                      How many block confirmations do you need
                                      before processing an event?
                                    </p>
                                  </Tooltip>
                                </div>
                              </svelte:fragment>
                            </NumberInput>
                          {:else}
                            <NumberInputSkeleton />
                          {/if}
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <ExpressiveHeading size={2}
                            >Oracle logic</ExpressiveHeading
                          >
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <p>
                            We will send matching events to this endpoint for
                            processing, the returned response will be sent to
                            your smart contact. This endpoint should implement
                            the
                            <Link
                              href="/docs/services/oracle-network/custom/protocol"
                            >
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
                            bind:value={$updateValues.endpoint}
                            invalid={$updateValues.endpoint &&
                              !!$updateInvalids.endpoint}
                            invalidText={$updateInvalids.endpoint}
                          >
                            <svelte:fragment slot="labelText">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Endpoint">
                                  <p>
                                    Address of your oracle's HTTP endpoint.
                                    Kenshi sends matching events to this
                                    endpoint and calls your smart contract with
                                    the response. This endpoint needs to
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
                          <ExpressiveHeading size={2}>
                            Contract ABI
                          </ExpressiveHeading>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <p>
                            Contract ABI can be updated if you have a new
                            version of your contract.
                          </p>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          {#if oracleFromId}
                            <TextArea
                              required
                              placeholder="Human readable contract ABI"
                              helperText="Human readable ABI of your contract."
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
                          <ExpressiveHeading size={2}>
                            Event Signature
                          </ExpressiveHeading>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <p>
                            We will send events with this signature (emitted
                            from your smart contract) to your oracle endpoint.
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
                            bind:value={$updateValues.signature}
                            invalid={$updateValues.signature &&
                              !!$updateInvalids.signature}
                            invalidText={$updateInvalids.signature}
                          >
                            <svelte:fragment slot="labelText">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Signature">
                                  <p>
                                    Signature of the event to look for. We'll
                                    send these events to your oracle endpoint.
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
                            Concurrency
                          </ExpressiveHeading>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <p>
                            How many requests at max should the oracle be able
                            to process at the same time? This affects a
                            multitude of factors, read more
                            <Link
                              href="/docs/services/oracle-network/custom/concurrency"
                            >
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
                            bind:value={$updateValues.concurrency}
                            invalid={$updateValues.concurrency &&
                              !!$updateInvalids.concurrency}
                            invalidText={$updateInvalids.concurrency}
                            required
                            helperText="Defines how many requests can be processed at the same time"
                          >
                            <svelte:fragment slot="label">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Concurrency">
                                  <p>
                                    Defines how many requests can be processed
                                    at the same time. Bigger numbers mean more
                                    requests could be processed per second, but
                                    it also increases the risk of losing gas due
                                    to errors in asynchronous nonce management.
                                  </p>
                                </Tooltip>
                              </div>
                            </svelte:fragment>
                          </NumberInput>
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
                            Add gas
                          </ExpressiveHeading>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <p>
                            To add gas (eth) to your oracle, send them directly
                            to the following wallet address:
                          </p>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <CodeSnippet code={oracleFromId?.gasWallet} />
                        </Column>
                      </Row>
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
                            Existing custom oracles can be extended to function
                            for a longer period of time.
                          </p>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <NumberInput
                            required
                            placeholder="Duration"
                            name="duration"
                            helperText="Number of months to run the custom oracles"
                            bind:value={$creditValues.duration}
                            invalid={$creditValues.duration &&
                              !!$creditInvalids.duration}
                            invalidText={$creditInvalids.duration}
                          >
                            <svelte:fragment slot="labelText">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Duration">
                                  <p>
                                    Number of months to run the custom oracles.
                                  </p>
                                </Tooltip>
                              </div>
                            </svelte:fragment>
                          </NumberInput>
                        </Column>
                        <Column>
                          <NumberInput
                            required
                            placeholder="Calls"
                            name="calls"
                            bind:value={$creditValues.calls}
                            invalid={$creditValues.calls &&
                              !!$creditInvalids.calls}
                            invalidText={$creditInvalids.calls}
                          >
                            <svelte:fragment slot="labelText">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Duration">
                                  <p>
                                    Number of requests that can be processed by
                                    this oracle.
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
                              {#if price}
                                for ${price.toFixed(2)}
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
