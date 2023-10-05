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

  import { AnalyticsProduct } from "src/lib/products/analytics";
  import { goto } from "$app/navigation";

  import { SpinLine } from "svelte-loading-spinners";
  import { getAnalyticsPrice } from "src/lib/dash/pricing";
  import { chainOptions } from "src/lib/dash/deep-index";

  const { values, invalids, check } = AnalyticsProduct.getForm("insert");

  $values = {
    chain: "ethereum-mainnet",
    duration: 1,
    fromBlock: 0,
  };

  $: price = getAnalyticsPrice($values.duration);

  let creatingTask = false;

  const createTask = async () => {
    creatingTask = true;
    const success = await AnalyticsProduct.insert({ values: $values, check });
    creatingTask = false;
    if (success) goto("/dashboard/deep-index/analytics");
  };
</script>

<Content>
  <Grid padding>
    <Row>
      <Column>
        <Breadcrumb>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/dashboard/deep-index/analytics">
            Deep Index Analytics
          </BreadcrumbItem>
          <BreadcrumbItem
            href="/dashboard/deep-index/analytics/new"
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
                <h1>New Analytics Profile</h1>
              </ExpressiveHeading>
              <p class="body-02">
                Create a new Analytics profile to store, index, analyze and
                visualize your smart contract on the Kenshi Analytics page.
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
            href="/docs/services/deep-index/analytics"
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
              <ExpressiveHeading size={2}>Project info</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                This information will be displayed publicly on your Kenshi
                Analytics profile.
              </p>
            </Column>
          </Row>
          <Row>
            <Column lg={8}>
              <TextInput
                placeholder="Foobar"
                name="name"
                helperText="Project Name"
                bind:value={$values.name}
                invalid={$values.name && !!$invalids.name}
                invalidText={$invalids.name}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Name">
                      <p>The name of your project.</p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextInput>
            </Column>
            <Column lg={8}>
              <TextInput
                placeholder="FBR"
                name="symbol"
                helperText="Token symbol"
                bind:value={$values.symbol}
                invalid={$values.symbol && !!$invalids.symbol}
                invalidText={$invalids.symbol}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Symbol">
                      <p>Your token symbol.</p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextInput>
            </Column>
            <Column lg={8}>
              <TextArea
                required
                placeholder="Description"
                helperText="One paragraph about your project to help users understand its purpose (Up to 512 characters)."
                name="description"
                bind:value={$values.description}
                invalid={$values.description && !!$invalids.description}
                invalidText={$invalids.description}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Description">
                      <p>Your project description</p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextArea>
            </Column>
            <Column lg={8}>
              <TextArea
                required
                placeholder="Summary"
                helperText="Short description of the project to show on Analytics Explorer (Up to 128 characters)."
                name="summary"
                bind:value={$values.summary}
                invalid={$values.summary && !!$invalids.summary}
                invalidText={$invalids.summary}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Summary">
                      <p>Your project summary</p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextArea>
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>Links</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column lg={8}>
              <TextInput
                placeholder="https://foo.bar"
                name="website"
                helperText="Address of your project website"
                bind:value={$values.website}
                invalid={$values.website && !!$invalids.website}
                invalidText={$invalids.website}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Website">
                      <p>
                        Where can your users find more details about your
                        project? This can be your main website or your Link3
                        profile.
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextInput>
            </Column>
            <Column lg={8}>
              <TextInput
                placeholder="https://foo.bar/logo.svg"
                name="logo"
                helperText="Your project's logo in SVG or PNG (512x512) format."
                bind:value={$values.logo}
                invalid={$values.logo && !!$invalids.logo}
                invalidText={$invalids.logo}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Logo">
                      <p>
                        Your project's logo in SVG or PNG (512x512) format. SVG
                        is preferred and recommended.
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextInput>
            </Column>
            <Column lg={8}>
              <TextInput
                placeholder="https://foo.bar"
                name="whitepaper"
                helperText="Link to your whitepaper"
                bind:value={$values.whitepaper}
                invalid={$values.website && !!$invalids.whitepaper}
                invalidText={$invalids.whitepaper}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Whitepaper">
                      <p>
                        You can place a link to your documentation or white
                        paper here.
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextInput>
            </Column>
            <Column lg={8}>
              <TextInput
                placeholder="https://twitter.com/foo.bar"
                name="twitter"
                helperText="Link to your Twitter profile"
                bind:value={$values.twitter}
                invalid={$values.twitter && !!$invalids.twitter}
                invalidText={$invalids.twitter}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Twitter">
                      <p>Link to your project profile on Twitter.</p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextInput>
            </Column>
            <Column lg={8}>
              <TextInput
                placeholder="https://discord.gg/foobar"
                name="discord"
                helperText="Link to your Discord server"
                bind:value={$values.discord}
                invalid={$values.discord && !!$invalids.discord}
                invalidText={$invalids.discord}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Discord">
                      <p>Link to your project server on Discord.</p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextInput>
            </Column>
            <Column lg={8}>
              <TextInput
                placeholder="https://t.me/foobar"
                name="telegram"
                helperText="Link to your Telegram chat"
                bind:value={$values.telegram}
                invalid={$values.telegram && !!$invalids.telegram}
                invalidText={$invalids.telegram}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Telegram">
                      <p>Link to your project's community chat on Telegram.</p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextInput>
            </Column>
            <Column lg={8}>
              <TextInput
                placeholder="https://github.com/foobar"
                name="github"
                helperText="Link to your project's GitHub repository"
                bind:value={$values.github}
                invalid={$values.github && !!$invalids.github}
                invalidText={$invalids.github}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Github">
                      <p>
                        Link to your project's GitHub organization or
                        repository.
                      </p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextInput>
            </Column>
            <Column lg={8}>
              <TextInput
                placeholder="https://app.uniswap.org/..."
                name="buylink"
                helperText="Direct link to purchase your project's token"
                bind:value={$values.buylink}
                invalid={$values.buylink && !!$invalids.buylink}
                invalidText={$invalids.buylink}
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Buy Link">
                      <p>Where can users find and buy your token?</p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextInput>
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
                Kenshi Analytics Profile costs $19.95 per month. Choose for how
                many months you'd like to run this profile.
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
