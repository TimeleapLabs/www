<script>
  import { page } from "$app/stores";

  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Content } from "carbon-components-svelte";
  import { ClickableTile, Tile } from "carbon-components-svelte";
  import { Breadcrumb, BreadcrumbItem } from "carbon-components-svelte";
  import { NumberInput } from "carbon-components-svelte";
  import { TextArea } from "carbon-components-svelte";
  import { Button, InlineNotification } from "carbon-components-svelte";
  import { Tooltip } from "carbon-components-svelte";
  import { Email, Information } from "carbon-icons-svelte";
  import { fixLabelTooltip } from "src/lib/tooltip";
  import { Tabs, Tab, TabContent } from "carbon-components-svelte";
  import { Select, SelectItem } from "carbon-components-svelte";
  import { UpdateNow, Purchase } from "carbon-icons-svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import { VrfProduct } from "src/lib/products/vrf";
  import { SpinLine } from "svelte-loading-spinners";
  import { wallet } from "src/stores/wallet";
  import { ethers } from "ethers";

  let userAddress;

  const setAddress = async () => {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner($wallet.accounts?.[0]?.address);
    userAddress = await signer.getAddress();
  };

  $: if ($wallet) setAddress();

  let userSubs = [];

  const getUserTasks = async () => {
    userSubs = await VrfProduct.findAll(userAddress);
  };

  $: if (userAddress) getUserTasks();

  const { id } = $page.params;
  let subFromId;

  $: if (userSubs.length) {
    for (const task of userSubs) {
      if (task.id === id) {
        subFromId = task;
        break;
      }
    }
  }

  const {
    check: checkUpdate,
    values: updateValues,
    invalids: updateInvalids,
  } = VrfProduct.getForm("update");

  const {
    check: checkCredit,
    values: creditValues,
    invalids: creditInvalids,
  } = VrfProduct.getForm("credit");

  $creditValues = { credit: 100000000 };

  $: if (subFromId) {
    $updateValues = {
      allow: subFromId.allow.join("\n"),
      chain: subFromId.chain,
    };
  }

  let isUpdating = false;

  const update = async () => {
    isUpdating = true;
    await VrfProduct.update(
      { values: $updateValues, check: checkUpdate },
      subFromId
    );
    isUpdating = false;
  };

  let isAddingCredit = false;

  const credit = async () => {
    isAddingCredit = true;
    await VrfProduct.credit(
      { values: $creditValues, check: checkCredit },
      subFromId
    );
    isAddingCredit = false;
  };

  const vrfChains = [
    {
      label: "Avalanche C-Chain",
      value: "avalanche-mainnet",
    },
    {
      label: "BNB Smart Chain",
      value: "binance-mainnet",
    },
    { label: "Fantom", value: "fantom-mainnet" },
    { label: "Polygon", value: "polygon-mainnet" },
  ];
</script>

<Content>
  <Grid noGutter padding narrow>
    <Row>
      <Column>
        <Breadcrumb>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/dashboard/oracle-network/vrf">
            Deep Index Sync
          </BreadcrumbItem>
          <BreadcrumbItem
            href="/dashboard/oracle-network/vrf/edit/{id}"
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
                Certain properties of a VRF subscription can be changed after it
                is created. If you want to add more credit to your subscription,
                you can do so in the "Add Credit" tab.
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

          <Button kind="secondary" href="/docs/services/vrf" icon={Information}>
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
                            Your contracts
                          </ExpressiveHeading>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <p>
                            Tell us which smart contracts this subscription
                            should pay for.
                          </p>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <TextArea
                            required
                            name="contracts"
                            labelText="Contract addresses"
                            placeholder="VRF consumer addresses, one per line"
                            helperText="Addresses of the contracts that this subscription pays for. One per line."
                            bind:value={$updateValues.allow}
                            invalid={$updateValues.allow &&
                              !!$updateInvalids.allow}
                            invalidText={$updateInvalids.allow}
                          >
                            <svelte:fragment slot="labelText">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Contract addresses">
                                  <p>
                                    Input all the addresses that will use this
                                    subscription to pay for VRF requests. One
                                    per line.
                                  </p>
                                </Tooltip>
                              </div>
                            </svelte:fragment>
                          </TextArea>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <ExpressiveHeading size={2}
                            >Blockchain</ExpressiveHeading
                          >
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <p>
                            To which blockchain are the contracts deplpoyed?
                          </p>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <Select
                            required
                            name="chain"
                            labelText="Blockchain"
                            placeholder="Your HTTP endpoint"
                            helperText="To which HTTP endpoint should R-API send your events?"
                            bind:selected={$updateValues.chain}
                            invalid={$updateValues.chain &&
                              !!$updateInvalids.chain}
                            invalidText={$updateInvalids.chain}
                          >
                            {#each vrfChains as { value, label }}
                              <SelectItem text={label} {value} />
                            {/each}
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
                          </Select>
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
                            placeholder="Credits"
                            name="credits"
                            helperText="Number of Kenshi tokens to add to this subscription"
                            label="Credits"
                            required
                            bind:value={$creditValues.credit}
                            invalid={$creditValues.credit &&
                              !!$creditInvalids.credit}
                            invalidText={$creditInvalids.credit}
                            step={1000000}
                          >
                            <svelte:fragment slot="label">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Credits">
                                  <p>
                                    Total number of Kenshi tokens you would like
                                    to add to this subscription.
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
                              Add credit
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
