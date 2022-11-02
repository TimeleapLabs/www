<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Content } from "carbon-components-svelte";
  import { ClickableTile, Tile } from "carbon-components-svelte";
  import { Breadcrumb, BreadcrumbItem } from "carbon-components-svelte";
  import { NumberInput } from "carbon-components-svelte";
  import { TextArea, PasswordInput } from "carbon-components-svelte";
  import { Button } from "carbon-components-svelte";
  import { Tooltip } from "carbon-components-svelte";
  import { Email, Information, Renew } from "carbon-icons-svelte";
  import { Purchase } from "carbon-icons-svelte";
  import { fixLabelTooltip } from "src/lib/tooltip";
  import { Tab, TabContent, Tabs } from "carbon-components-svelte";
  import { ethers } from "ethers";
  import { InlineNotification } from "carbon-components-svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import ObjectArrayField from "src/components/ObjectArrayField.svelte";
  import ArgumentFilter from "src/components/dash/ArgumentFilter.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import { GraphProduct } from "src/lib/products/graph";
  import { getRandomBase64 } from "src/lib/dash/random";
  import { SpinLine } from "svelte-loading-spinners";
  import { getGraphQLPrice } from "src/lib/dash/pricing";
  import { page } from "$app/stores";
  import { wallet } from "src/stores/wallet";
  import { valuesFromAllow } from "src/lib/utils";

  let userAddress;
  let userQuerySubs = [];

  const setAddress = async () => {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner($wallet.accounts?.[0]?.address);
    userAddress = await signer.getAddress();
  };

  $: if ($wallet) setAddress();

  const getUserTasks = async () => {
    userQuerySubs = await GraphProduct.findAll(userAddress);
  };

  $: if (userAddress) getUserTasks();

  const { id } = $page.params;
  let subFromId;

  $: if (userQuerySubs.length) {
    for (const task of userQuerySubs) {
      if (task.id === id) {
        subFromId = task;
        break;
      }
    }
  }

  const {
    values: updateValues,
    invalids: updateInvalids,
    check: updateCheck,
  } = GraphProduct.getForm("update");

  const {
    values: creditValues,
    invalids: creditInvalids,
    check: creditCheck,
  } = GraphProduct.getForm("credit");

  $creditValues = { requests: 1000000 };

  $: if (subFromId) {
    $updateValues = { ...valuesFromAllow(subFromId.allow) };
  }

  let isUpdating = false;

  const update = async () => {
    isUpdating = true;

    if ($updateValues.key) {
      const provider = new ethers.providers.Web3Provider($wallet.provider);
      const signer = provider.getSigner(userAddress);
      const signedSharedKey = await signer.signMessage(subFromId.sharedKey);
      $updateValues.encryptedKey = await aesGcmEncrypt(
        $updateValues.key,
        signedSharedKey
      );
    }

    await GraphProduct.update(
      { values: $updateValues, check: updateCheck },
      subFromId
    );
    isUpdating = false;
  };

  let isAddingCredit = false;

  const credit = async () => {
    isAddingCredit = true;
    await GraphProduct.credit(
      { values: $creditValues, check: creditCheck },
      subFromId
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
          <BreadcrumbItem href="/dashboard/deep-index/query">
            Deep Index Query
          </BreadcrumbItem>
          <BreadcrumbItem
            href="/dashboard/deep-index/query/edit/{id}"
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
                Certain properties of an API key can be changed after it is
                created. If you want to by more credit for your API key, you can
                do so in the "Add Credit" tab.
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
            href="/docs/services/deep-index/graphql"
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
                            >Your API key</ExpressiveHeading
                          >
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <p>
                            Choose a strong API key that'll be used for querying
                            Kenshi's geographically distributed data cluster.
                          </p>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <div class="apikey">
                            <PasswordInput
                              required
                              name="apikey"
                              labelText="API key"
                              placeholder="API key"
                              helperText="You will use this API key for running queries. Leave empty to keep the current API key."
                              bind:value={$updateValues.apikey}
                              invalid={$updateValues.apikey &&
                                !!$updateInvalids.apikey}
                              invalidText={$updateInvalids.apikey}
                              showPasswordLabel="Show API key"
                              hidePasswordLabel="Hide API key"
                            >
                              <svelte:fragment slot="labelText">
                                <div use:fixLabelTooltip>
                                  <Tooltip triggerText="API key">
                                    <p>
                                      You will use this API key to run GraphQL
                                      or MQL queries.
                                    </p>
                                  </Tooltip>
                                </div>
                              </svelte:fragment>
                            </PasswordInput>
                            <Button
                              kind="tertiary"
                              size="field"
                              on:click={() =>
                                ($updateValues.apikey = getRandomBase64())}
                              icon={Renew}
                            >
                              Generate
                            </Button>
                          </div>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <ExpressiveHeading size={2}>
                            Restrictions
                          </ExpressiveHeading>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <p>
                            You can restrict this API key to certain events or
                            contracts.
                          </p>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <TextArea
                            placeholder="Contract addresses, one per line"
                            helperText="Allowed contract addresses, one per line. Leave empty to allow all addresses."
                            name="contracts"
                            bind:value={$updateValues.contracts}
                          >
                            <svelte:fragment slot="labelText">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Contracts">
                                  <p>
                                    List of allowed contract addresses to query
                                    with this API key. Leave empty to allow all
                                    addresses.
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
                            helperText="Allowed event names, one per line. Leave empty to allow all events."
                            name="events"
                            bind:value={$updateValues.events}
                          >
                            <svelte:fragment slot="labelText">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Events">
                                  <p>
                                    List of allowed event names to query with
                                    this API key. Leave empty to allow all
                                    events.
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
                            placeholder="Minimum block number"
                            name="minBlock"
                            label="Min block"
                            helperText="Minimum allowed block number to query"
                            bind:value={$updateValues.minBlock}
                          >
                            <svelte:fragment slot="label">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Min block">
                                  <p>
                                    Minimum block number that can be queried
                                    with this API key.
                                  </p>
                                </Tooltip>
                              </div>
                            </svelte:fragment>
                          </NumberInput>
                        </Column>
                        <Column>
                          <NumberInput
                            placeholder="Maximum block number"
                            label="Max block"
                            name="maxBlock"
                            helperText="Maximum allowed block number to query"
                            bind:value={$updateValues.maxBlock}
                          >
                            <svelte:fragment slot="label">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Max block">
                                  <p>
                                    Maximum block number that can be queried
                                    with this API key.
                                  </p>
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
                            icon={Purchase}
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
                            Get more requests
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
                            placeholder="Requests"
                            name="requests"
                            helperText="Number requests to add to this API key"
                            bind:value={$creditValues.requests}
                            invalid={$creditValues.requests &&
                              !!$creditInvalids.requests}
                            invalidText={$creditInvalids.requests}
                            step={1000000}
                          >
                            <svelte:fragment slot="labelText">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Requests">
                                  <p>
                                    Choose how many requests you want to add to
                                    this API key.
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
                              Add
                              {#if $creditValues.requests}
                                for ${getGraphQLPrice(
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
  .apikey {
    display: flex;
    align-items: center;
    gap: 1em;
  }
  .apikey > :global(button) {
    margin-top: 4px;
  }
</style>
