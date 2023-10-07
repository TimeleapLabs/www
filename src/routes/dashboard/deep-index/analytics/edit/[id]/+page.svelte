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
  import { getAnalyticsPrice } from "src/lib/dash/pricing";
  import { AnalyticsProduct } from "$lib/products/analytics";
  import { page } from "$app/stores";

  let userAddress;
  let userSyncTasks = [];

  const setAddress = async () => {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner($wallet.accounts?.[0]?.address);
    userAddress = await signer.getAddress();
  };

  $: if ($wallet) setAddress();

  const getUserTasks = async () => {
    userSyncTasks = await AnalyticsProduct.findAll(userAddress);
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
  } = AnalyticsProduct.getForm("update");

  const {
    values: creditValues,
    invalids: creditInvalids,
    check: creditCheck,
  } = AnalyticsProduct.getForm("credit");

  $creditValues = { duration: 1 };

  $: if (taskFromId) {
    $updateValues = { address: taskFromId.address, ...taskFromId.metadata };
  }

  let isUpdating = false;

  const update = async () => {
    isUpdating = true;
    await AnalyticsProduct.update(
      { values: $updateValues, check: updateCheck },
      taskFromId
    );
    isUpdating = false;
  };

  let isAddingCredit = false;

  const credit = async () => {
    isAddingCredit = true;
    await AnalyticsProduct.credit(
      { values: $creditValues, check: creditCheck },
      taskFromId
    );
    isAddingCredit = false;
  };

  $: unitPrice =
    $creditValues.frequency && $creditValues.storage ? getAnalyticsPrice(1) : 0;
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
            href="/dashboard/deep-index/analytics/edit/{id}"
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
                <h1>Update Profile</h1>
              </ExpressiveHeading>
              <p class="body-02">
                Certain properties of an Analytics profile can be changed after
                it is created. If you want to extend the expiration date of your
                subscription, you can do so in the "Add Credit" tab.
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
                            existing profile.
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

                      {#if taskFromId}
                        <Row>
                          <Column>
                            <ExpressiveHeading size={2}>
                              Project info
                            </ExpressiveHeading>
                          </Column>
                        </Row>
                        <Row>
                          <Column>
                            <p>
                              This information will be displayed publicly on
                              your Kenshi Analytics profile.
                            </p>
                          </Column>
                        </Row>
                        <Row>
                          <Column lg={8}>
                            <TextInput
                              placeholder="Foobar"
                              name="name"
                              helperText="Project Name"
                              bind:value={$updateValues.name}
                              invalid={$updateValues.name &&
                                !!$updateInvalids.name}
                              invalidText={$updateInvalids.name}
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
                              bind:value={$updateValues.symbol}
                              invalid={$updateValues.symbol &&
                                !!$updateInvalids.symbol}
                              invalidText={$updateInvalids.symbol}
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
                              bind:value={$updateValues.description}
                              invalid={$updateValues.description &&
                                !!$updateInvalids.description}
                              invalidText={$updateInvalids.description}
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
                              bind:value={$updateValues.summary}
                              invalid={$updateValues.summary &&
                                !!$updateInvalids.summary}
                              invalidText={$updateInvalids.summary}
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
                            <ExpressiveHeading size={2}>
                              Links
                            </ExpressiveHeading>
                          </Column>
                        </Row>
                        <Row>
                          <Column lg={8}>
                            <TextInput
                              placeholder="https://foo.bar"
                              name="website"
                              helperText="Address of your project website"
                              bind:value={$updateValues.website}
                              invalid={$updateValues.website &&
                                !!$updateInvalids.website}
                              invalidText={$updateInvalids.website}
                            >
                              <svelte:fragment slot="labelText">
                                <div use:fixLabelTooltip>
                                  <Tooltip triggerText="Website">
                                    <p>
                                      Where can your users find more details
                                      about your project? This can be your main
                                      website or your Link3 profile.
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
                              bind:value={$updateValues.logo}
                              invalid={$updateValues.logo &&
                                !!$updateInvalids.logo}
                              invalidText={$updateInvalids.logo}
                            >
                              <svelte:fragment slot="labelText">
                                <div use:fixLabelTooltip>
                                  <Tooltip triggerText="Logo">
                                    <p>
                                      Your project's logo in SVG or PNG
                                      (512x512) format. SVG is preferred and
                                      recommended.
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
                              bind:value={$updateValues.whitepaper}
                              invalid={$updateValues.website &&
                                !!$updateInvalids.whitepaper}
                              invalidText={$updateInvalids.whitepaper}
                            >
                              <svelte:fragment slot="labelText">
                                <div use:fixLabelTooltip>
                                  <Tooltip triggerText="Whitepaper">
                                    <p>
                                      You can place a link to your documentation
                                      or white paper here.
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
                              bind:value={$updateValues.twitter}
                              invalid={$updateValues.twitter &&
                                !!$updateInvalids.twitter}
                              invalidText={$updateInvalids.twitter}
                            >
                              <svelte:fragment slot="labelText">
                                <div use:fixLabelTooltip>
                                  <Tooltip triggerText="Twitter">
                                    <p>
                                      Link to your project profile on Twitter.
                                    </p>
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
                              bind:value={$updateValues.discord}
                              invalid={$updateValues.discord &&
                                !!$updateInvalids.discord}
                              invalidText={$updateInvalids.discord}
                            >
                              <svelte:fragment slot="labelText">
                                <div use:fixLabelTooltip>
                                  <Tooltip triggerText="Discord">
                                    <p>
                                      Link to your project server on Discord.
                                    </p>
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
                              bind:value={$updateValues.telegram}
                              invalid={$updateValues.telegram &&
                                !!$updateInvalids.telegram}
                              invalidText={$updateInvalids.telegram}
                            >
                              <svelte:fragment slot="labelText">
                                <div use:fixLabelTooltip>
                                  <Tooltip triggerText="Telegram">
                                    <p>
                                      Link to your project's community chat on
                                      Telegram.
                                    </p>
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
                              bind:value={$updateValues.github}
                              invalid={$updateValues.github &&
                                !!$updateInvalids.github}
                              invalidText={$updateInvalids.github}
                            >
                              <svelte:fragment slot="labelText">
                                <div use:fixLabelTooltip>
                                  <Tooltip triggerText="Github">
                                    <p>
                                      Link to your project's GitHub organization
                                      or repository.
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
                              bind:value={$updateValues.buylink}
                              invalid={$updateValues.buylink &&
                                !!$updateInvalids.buylink}
                              invalidText={$updateInvalids.buylink}
                            >
                              <svelte:fragment slot="labelText">
                                <div use:fixLabelTooltip>
                                  <Tooltip triggerText="Buy Link">
                                    <p>
                                      Where can users find and buy your token?
                                    </p>
                                  </Tooltip>
                                </div>
                              </svelte:fragment>
                            </TextInput>
                          </Column>
                        </Row>
                      {/if}

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
                            Kenshi Analytics Profile costs $19.95 per month.
                            Choose for how many months you'd like to run this
                            profile.
                          </p>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <NumberInput
                            required
                            placeholder="Duration"
                            name="duration"
                            helperText="Number of months to run the analyticsprofile"
                            bind:value={$creditValues.duration}
                            invalid={$creditValues.duration &&
                              !!$creditInvalids.duration}
                            invalidText={$creditInvalids.duration}
                          >
                            <svelte:fragment slot="labelText">
                              <div use:fixLabelTooltip>
                                <Tooltip triggerText="Duration">
                                  <p>
                                    Number of months to run the analytics
                                    profile.
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
                            subtitle="Currently all payments for the Kenshi services are done on Arbitrum One."
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
                              {#if $creditValues.duration && unitPrice}
                                for ${(
                                  unitPrice * $creditValues.duration
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
