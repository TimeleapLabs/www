<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Content } from "carbon-components-svelte";
  import { ClickableTile, Tile } from "carbon-components-svelte";
  import { Breadcrumb, BreadcrumbItem } from "carbon-components-svelte";
  import { Select, SelectItem } from "carbon-components-svelte";
  import { NumberInput, TextInput } from "carbon-components-svelte";
  import { Button } from "carbon-components-svelte";
  import { Tooltip } from "carbon-components-svelte";
  import { Email, Information } from "carbon-icons-svelte";
  import { WifiBridgeAlt } from "carbon-icons-svelte";
  import { fixLabelTooltip } from "src/lib/tooltip";
  import { ethers } from "ethers";
  import { toast } from "@zerodevx/svelte-toast";
  import { onboard } from "$lib/onboard";
  import { goto } from "$app/navigation";
  import bridgeAbi from "$lib/abi/bridge";
  import kenshiAbi from "$lib/abi/kenshi";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import { SpinLine } from "svelte-loading-spinners";
  import { wallet } from "src/stores/wallet";

  let amount = 0;
  let toAddress = "";
  let fromChain = "0x01";
  let toChain = "0xa4b1";

  let userAddress;

  const setAddress = async () => {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner($wallet.accounts?.[0]?.address);
    userAddress = await signer.getAddress();
    toAddress = userAddress;
  };

  $: if ($wallet) setAddress();

  const bridgeAddr = "0xbAA748cFCB836380d9C4bE618718F829FFAb61bb";
  const tokenAddr = "0xf1264873436A0771E440E2b28072FAfcC5EEBd01";
  const totalSupply = "1" + "0".repeat(27);

  const operators = [
    "0x855C83A8d3C5BDE6A505cdFEB8272b8F47Bd3213",
    "0x825823ba12298c90bE7D7be59d8fE2Ac9426907c",
  ];

  const approve = async (contract) => {
    const currentApproval = await contract.allowance(userAddress, bridgeAddr);
    if (!currentApproval.gte(ethers.utils.parseUnits(amount.toFixed(18)))) {
      const tx = await contract.approve(bridgeAddr, totalSupply);
      await tx.wait(1);
    }
  };

  let bridging = false;

  const bridge = async () => {
    bridging = true;
    if (!fromChain) {
      bridging = false;
      return toast.push("Source chain is required.");
    }
    if (!toChain) {
      bridging = false;
      return toast.push("Destination chain is required.");
    }
    if (!amount || amount <= 0) {
      bridging = false;
      return toast.push("Amount needs to be bigger than 0.");
    }
    if (!toAddress) {
      bridging = false;
      return toast.push("Recipient is required.");
    }
    try {
      await onboard.setChain({ chainId: fromChain.replace("0x0", "0x") });
    } catch (error) {
      return toast.push("Couldn't change to the source network.");
    }
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner();
    const token = new ethers.Contract(tokenAddr, kenshiAbi, signer);
    const bridgeContract = new ethers.Contract(bridgeAddr, bridgeAbi, signer);
    await approve(token);
    try {
      const tx = await bridgeContract.bridge(
        toAddress,
        ethers.utils.parseUnits(amount.toFixed(18)),
        toChain,
        operators
      );
      await tx.wait(1);
      bridging = false;
      goto("/bridge");
    } catch (error) {
      bridging = false;
      return toast.push("Bridging failed.");
    }
  };

  const chainOptions = [
    { label: "Ethereum", value: "0x01" },
    { label: "Arbitrum One", value: "0xa4b1" },
  ];
</script>

<Content>
  <Grid padding>
    <Row>
      <Column>
        <Breadcrumb>
          <BreadcrumbItem href="/bridge">Bridge</BreadcrumbItem>
          <BreadcrumbItem href="/bridge/new" isCurrentPage>New</BreadcrumbItem>
        </Breadcrumb>
      </Column>
    </Row>

    <Row>
      <Column lg={4}>
        <div class="stick sidebar">
          <Tile class="blue-tile">
            <div class="form-info">
              <ExpressiveHeading size={4}>
                <h1>Bridge</h1>
              </ExpressiveHeading>
              <p class="body-02">
                The Kenshi cross-chain bridge allows moving KNS tokens from one
                supported chain to another.
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

          <Button kind="secondary" href="/docs" icon={Information}>
            Read the docs
          </Button>
          <ConnectButton primary />
        </div>
      </Column>
      <Column>
        <Grid>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>Chains</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                From which source chain to which destination chain do you want
                to bridge?
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <Select
                bind:selected={fromChain}
                required
                helperText="This is the chain from which you want to move the tokens."
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Source">
                      <p>
                        Choose the blockchain that currently holds your KNS.
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
              <Select
                bind:selected={toChain}
                required
                helperText="This is the chain to which you want to move the tokens."
              >
                <svelte:fragment slot="labelText">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Destination">
                      <p>Choose the blockchain you want your KNS on.</p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
                {#each chainOptions as option}
                  <SelectItem value={option.value} text={option.label} />
                {/each}
              </Select>
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>Amount</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>How many tokens do you want to move?</p>
            </Column>
          </Row>
          <Row>
            <Column>
              <NumberInput
                placeholder="Amount"
                name="amount"
                helperText="Amount of tokens to move"
                label="Tokens"
                required
                bind:value={amount}
              >
                <svelte:fragment slot="label">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Tokens">
                      <p>How many tokens do you want to move?</p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </NumberInput>
            </Column>
          </Row>

          <Row>
            <Column>
              <ExpressiveHeading size={2}>Recipient</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                Who will receive the tokens on the destination chain? You can
                choose your or someone else's address.
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <TextInput
                placeholder="Recipient address"
                name="address"
                helperText="Tokens will be sent to this address"
                label="Recipient"
                required
                bind:value={toAddress}
              >
                <svelte:fragment slot="label">
                  <div use:fixLabelTooltip>
                    <Tooltip triggerText="Recipient">
                      <p>To which address should the tokens go to?</p>
                    </Tooltip>
                  </div>
                </svelte:fragment>
              </TextInput>
            </Column>
          </Row>

          <Row>
            <Column>
              {#if !$wallet?.provider}
                <ConnectButton primary />
              {:else}
                <Button
                  on:click={bridge}
                  disabled={bridging}
                  icon={WifiBridgeAlt}
                >
                  {#if bridging}
                    <SpinLine
                      size="32"
                      color="currentColor"
                      unit="px"
                      duration="4s"
                    />
                    Processing
                  {:else}
                    Bridge
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
