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
  import { wallet } from "src/stores/wallet";
  import { ethers } from "ethers";
  import { aesGcmEncrypt } from "src/lib/crypto";
  import { InlineNotification } from "carbon-components-svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import ObjectArrayField from "src/components/ObjectArrayField.svelte";
  import ArgumentFilter from "src/components/dash/ArgumentFilter.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import { GraphProduct } from "src/lib/products/graph";
  import { goto } from "$app/navigation";
  import { getRandomBase64 } from "src/lib/dash/random";
  import { SpinLine } from "svelte-loading-spinners";
  import { getGraphQLPrice } from "src/lib/dash/pricing";

  let userAddress;

  const setAddress = async () => {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner($wallet.accounts?.[0]?.address);
    userAddress = await signer.getAddress();
  };

  $: if ($wallet) setAddress();

  const { values, invalids, check } = GraphProduct.getForm("insert");

  $values = {
    key: getRandomBase64(),
    requests: 1000000,
    minBlock: 0,
    maxBlock: 0,
    sharedKey: getRandomBase64(),
    encryptedKey: "",
  };

  $: price = getGraphQLPrice($values.requests);

  let creatingTask = false;

  const createKey = async () => {
    creatingTask = true;
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    const signedSharedKey = await signer.signMessage($values.sharedKey);
    $values.encryptedKey = await aesGcmEncrypt($values.key, signedSharedKey);
    const success = await GraphProduct.insert({ values: $values, check });
    creatingTask = false;
    if (success) goto("/dashboard/deep-index/query");
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
          <BreadcrumbItem href="/dashboard/deep-index/query/new" isCurrentPage>
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
                <h1>New API key</h1>
              </ExpressiveHeading>
              <p class="body-02">
                Create a new API key to query all events indexed on Kenshi's
                geographically distributed data clusters.
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
              <ExpressiveHeading size={2}>Your API key</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                Choose a strong API key that'll be used for querying Kenshi's
                geographically distributed data cluster.
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <div class="key">
                <PasswordInput
                  required
                  name="key"
                  labelText="API key"
                  placeholder="API key"
                  helperText="You will use this API key for running queries"
                  bind:value={$values.key}
                  invalid={$values.key && !!$invalids.key}
                  invalidText={$invalids.key}
                  showPasswordLabel="Show API key"
                  hidePasswordLabel="Hide API key"
                >
                  <svelte:fragment slot="labelText">
                    <div use:fixLabelTooltip>
                      <Tooltip triggerText="API key">
                        <p>
                          You will use this API key to run GraphQL or MQL
                          queries.
                        </p>
                      </Tooltip>
                    </div>
                  </svelte:fragment>
                </PasswordInput>
                <Button
                  kind="tertiary"
                  size="field"
                  on:click={() => ($values.key = getRandomBase64(24))}
                  icon={Renew}
                >
                  Generate
                </Button>
              </div>
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>Quota</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                How many requests are you planning to make using this API key?
                This number is consumed per request and does not expire by date.
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <NumberInput
                placeholder="Requests"
                name="requests"
                helperText="Number of requests expected for this API key"
                label="Requests"
                required
                bind:value={$values.requests}
                invalid={$values.requests && !!$invalids.requests}
                invalidText={$invalids.requests}
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
              <ExpressiveHeading size={2}>Restrictions</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                You can restrict this API key to certain events or contracts.
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <TextArea
                placeholder="Contract addresses, one per line"
                helperText="Allowed contract addresses, one per line. Leave empty to allow all addresses."
                name="contracts"
                bind:value={$values.contracts}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Contracts">
                      <p>
                        List of allowed contract addresses to query with this
                        API key. Leave empty to allow all addresses.
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
                bind:value={$values.events}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Events">
                      <p>
                        List of allowed event names to query with this API key.
                        Leave empty to allow all events.
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
                bind:value={$values.minBlock}
              >
                <svelte:fragment slot="label">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Min block">
                      <p>
                        Minimum block number that can be queried with this API
                        key.
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
                bind:value={$values.maxBlock}
              >
                <svelte:fragment slot="label">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Max block">
                      <p>
                        Maximum block number that can be queried with this API
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
                    Create API key ${price}
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
  .key {
    display: flex;
    align-items: center;
    gap: 1em;
  }
  .key > :global(button) {
    margin-top: 4px;
  }
</style>
