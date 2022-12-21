<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Content } from "carbon-components-svelte";
  import { ClickableTile, Tile } from "carbon-components-svelte";
  import { Breadcrumb, BreadcrumbItem } from "carbon-components-svelte";
  import { Select, SelectItem } from "carbon-components-svelte";
  import { NumberInput } from "carbon-components-svelte";
  import { TextArea } from "carbon-components-svelte";
  import { Button, InlineNotification } from "carbon-components-svelte";
  import { Tooltip } from "carbon-components-svelte";
  import { Email, Information } from "carbon-icons-svelte";
  import { Purchase } from "carbon-icons-svelte";
  import { fixLabelTooltip } from "src/lib/tooltip";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import { goto } from "$app/navigation";
  import { VrfProduct } from "src/lib/products/vrf";
  import { SpinLine } from "svelte-loading-spinners";
  import { wallet } from "src/stores/wallet";

  const { values, invalids, check } = VrfProduct.getForm("insert");

  $values = {
    credit: 100000000,
    chain: "binance-mainnet",
    contracts: "",
  };

  let creatingTask = false;

  const createKey = async () => {
    creatingTask = true;
    const success = await VrfProduct.insert({ values: $values, check });
    creatingTask = false;
    if (success) goto("/dashboard/oracle-network/vrf");
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
            Deep Index R-API
          </BreadcrumbItem>
          <BreadcrumbItem
            href="/dashboard/oracle-network/vrf/new"
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
                <h1>New VRF subscription</h1>
              </ExpressiveHeading>
              <p class="body-02">
                To request randomness from the Kenshi VRF oracle on any of the
                mainnets you need to make a subscription. You don't need a
                subscription if you are developing on testnets.
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
            href="/docs/services/oracle-network/vrf"
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
              <ExpressiveHeading size={2}>Your contracts</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                Tell us which smart contracts this subscription should pay for.
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
                bind:value={$values.allow}
                invalid={$values.allow && !!$invalids.allow}
                invalidText={$invalids.allow}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Contract addresses">
                      <p>
                        Input all the addresses that will use this subscription
                        to pay for VRF requests. One per line.
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextArea>
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>Blockchain</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>To which blockchain are the contracts deplpoyed?</p>
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
                bind:selected={$values.chain}
                invalid={$values.chain && !!$invalids.chain}
                invalidText={$invalids.chain}
              >
                {#each vrfChains as { value, label }}
                  <SelectItem text={label} {value} />
                {/each}
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="R-API endpoint">
                      <p>Blockchain events will be sent to this endpoint.</p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </Select>
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>Credit</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                Add credits to this subscription. This credit will be consumed
                by VRF requests from the above listed smart contracts.
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
                bind:value={$values.credit}
                invalid={$values.credit && !!$invalids.credit}
                invalidText={$invalids.credit}
                step={1000000}
              >
                <svelte:fragment slot="label">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Credits">
                      <p>
                        Total number of Kenshi tokens you would like to add to
                        this subscription.
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
                    Create
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
