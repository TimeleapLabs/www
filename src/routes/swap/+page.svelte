<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  import Card from "src/components/Card.svelte";
  //import TextInput from "src/components/TextInput.svelte";
  //import Button from "src/components/Button.svelte";
  import Alert from "src/components/Alert.svelte";

  import CircleCheck from "src/icons/CircleCheck.svelte";
  import CircleDashed from "src/icons/CircleDashed.svelte";
  import MetaMask from "src/icons/MetaMask.svelte";
  import Kenshi from "src/icons/Kenshi.svelte";

  import { onboard } from "src/lib/onboard";
  import { wallet } from "src/stores/wallet";

  import { toast } from "@zerodevx/svelte-toast";
  import { ethers } from "ethers";
  import { SpinLine } from "svelte-loading-spinners";
  import formatThousands from "format-thousands";

  import { Content, Tile, Grid, Row, Column } from "carbon-components-svelte";
  import { TileGroup, RadioTile, Button } from "carbon-components-svelte";
  import { InlineNotification, OutboundLink } from "carbon-components-svelte";
  import { TextInput } from "carbon-components-svelte";
  import { Information, Purchase } from "carbon-icons-svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import Pancake from "src/icons/Pancake.svelte";

  const tokens = [
    {
      address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      icon: "busd",
      name: "BUSD",
      symbol: "BUSD",
    },
    {
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      icon: "bnb",
      name: "Wrapped BNB",
      symbol: "wBNB",
    },
  ];

  let swapFrom = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
  let quoteInput = "1";
  let quoteOutput = 0;
  let userAddress;
  let spin = false;
  let allowedToSpend = "0";
  let fromTokenSymbol = "BUSD";

  const kenshiAddr = "0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f";

  const selectToken = ({ detail }) => {
    swapFrom = detail.address;
    fromTokenSymbol = detail.symbol;
  };

  const swap = async (swapFrom, quoteInput) => {
    spin = true;
    const params = {
      fromTokenAddress: swapFrom,
      toTokenAddress: kenshiAddr,
      amount: ethers.utils.parseUnits(quoteInput),
      fromAddress: userAddress,
      slippage: 6,
      disableEstimate: false,
      allowPartialFill: false,
    };
    try {
      const query = new URLSearchParams(params).toString();
      const resp = await fetch(`https://api.1inch.io/v4.0/56/swap?${query}`);
      const { tx: txData } = await resp.json();
      const provider = new ethers.providers.Web3Provider($wallet.provider);
      const signer = provider.getSigner(userAddress);
      const tx = await signer.sendTransaction({
        data: txData.data,
        to: txData.to,
        from: txData.from,
        value: ethers.BigNumber.from(txData.value).toHexString(),
      });
      await tx.wait(1);
      allowedToSpend = "0";
      toast.push("Swap successful!");
      toast.push("Check your wallet for the tx info.");
    } catch (error) {
      toast.push("Swap failed!");
    }
    spin = false;
  };

  const getAllowance = async (swapFrom) => {
    const params = {
      tokenAddress: swapFrom,
      walletAddress: userAddress,
    };
    const query = new URLSearchParams(params).toString();
    const resp = await fetch(
      `https://api.1inch.io/v4.0/56/approve/allowance?${query}`
    );
    const { allowance } = await resp.json();
    allowedToSpend = allowance;
  };

  const setAddress = () => {
    userAddress = $wallet.accounts?.[0]?.address;
    if (swapFrom) {
      getAllowance(swapFrom);
    }
  };

  $: if ($wallet) setAddress();

  const approve = async (swapFrom, quoteInput) => {
    spin = true;
    const params = {
      tokenAddress: swapFrom,
      amount: ethers.utils.parseUnits(quoteInput),
    };

    try {
      const query = new URLSearchParams(params).toString();
      const resp = await fetch(
        `https://api.1inch.io/v4.0/56/approve/transaction?${query}`
      );
      const { data, to } = await resp.json();
      const provider = new ethers.providers.Web3Provider($wallet.provider);
      const signer = provider.getSigner(userAddress);
      const tx = await signer.sendTransaction({ data, to });
      await tx.wait(1);
      allowedToSpend = ethers.utils.parseUnits(quoteInput);
    } catch (error) {
      console.log(error);
    }

    spin = false;
  };

  const getQuote = async (swapFrom, quoteInput) => {
    getAllowance(swapFrom);
    const params = {
      fromTokenAddress: swapFrom,
      toTokenAddress: kenshiAddr,
      amount: ethers.utils.parseUnits(quoteInput),
    };
    const query = new URLSearchParams(params).toString();
    const resp = await fetch(`https://api.1inch.io/v4.0/56/quote?${query}`);
    const { toTokenAmount } = await resp.json();
    if (toTokenAmount) {
      quoteOutput = formatThousands(
        ethers.utils.formatUnits(toTokenAmount),
        ","
      );
    }
  };

  $: getQuote(swapFrom, quoteInput).catch(() => null);

  const addToMetamask = async () => {
    const params = {
      type: "ERC20",
      options: {
        address: kenshiAddr,
        symbol: "Kenshi",
        decimals: 18,
        image: `${window.location.origin}/images/logo/512x512.png`,
      },
    };

    try {
      await onboard.setChain({ chainId: "0x38" });
    } catch (error) {
      return toast.push("Couldn't switch to the BSC network.");
    }

    $wallet.provider
      .request({ method: "wallet_watchAsset", params })
      .catch(() => {
        toast.push("Couldn't add the token to your wallet.");
      });
  };
</script>

<Content>
  <Grid noGutter padding narrow>
    <Row>
      <Column lg={4}>
        <div class="stick sidebar">
          <Tile class="blue-tile">
            <div class="form-info">
              <ExpressiveHeading size={4}>
                <h1>Swap</h1>
              </ExpressiveHeading>
              <p class="body-02">
                Kenshi token is a utility token that allows access to Kenshi's
                on-chain services.
              </p>
            </div>
          </Tile>

          <div class="buttons">
            <Button kind="secondary" href="/docs" icon={Information}>
              Read the docs
            </Button>
            <Button
              kind="secondary"
              href="https://pancakeswap.finance/swap?outputCurrency=0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f"
              icon={Pancake}
            >
              PancakeSwap
            </Button>
          </div>
        </div>
      </Column>
      <Column>
        <Grid>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>Swap from</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>Which token do you want to use to get Kenshi?</p>
            </Column>
          </Row>
          <Row>
            <Column>
              <div class="tokens">
                <TileGroup on:select={selectToken} legend="Exchange from">
                  {#each tokens as token}
                    <RadioTile
                      value={token}
                      checked={swapFrom === token.address}
                    >
                      <div class="token">
                        <img
                          src="/images/tokens/{token.icon}.svg"
                          alt={token.name}
                        />
                        <span class="name">{token.name}</span>
                        <span class="symbol">{token.symbol}</span>
                      </div>
                    </RadioTile>
                  {/each}
                </TileGroup>
              </div>
            </Column>
          </Row>
          <Row>
            <Column>
              <InlineNotification kind="info">
                <svelte:fragment slot="subtitle">
                  Want to exchange other tokens into Kenshi? You can always use
                  <OutboundLink
                    href="https://pancakeswap.finance/swap?outputCurrency=0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f"
                  >
                    PancakeSwap
                  </OutboundLink> for that.
                </svelte:fragment>
              </InlineNotification>
            </Column>
          </Row>
          <Row>
            <Column>
              <TextInput
                bind:value={quoteInput}
                labelText="Amount to exchange from {fromTokenSymbol}"
                placeholder="Amount"
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>Review</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>Please review the transaction.</p>
            </Column>
          </Row>
          <Row>
            <Column>
              <TextInput
                readonly
                value={quoteOutput}
                labelText="Number of ₭enshi's you will get"
                icon={Kenshi}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <div class="buttons">
                {#if $wallet?.provider}
                  {#if ethers.BigNumber.from(allowedToSpend).gte(ethers.utils.parseUnits(quoteInput))}
                    <Button
                      on:click={() => swap(swapFrom, quoteInput)}
                      disabled={spin}
                      icon={Purchase}
                    >
                      {#if spin}
                        <SpinLine
                          size="32"
                          color="currentColor"
                          unit="px"
                          duration="4s"
                        />
                        Processing
                      {:else}
                        Swap
                      {/if}
                    </Button>
                  {:else}
                    <Button
                      on:click={() => approve(swapFrom, quoteInput)}
                      disabled={spin}
                      icon={Purchase}
                    >
                      {#if spin}
                        <SpinLine
                          size="32"
                          color="currentColor"
                          unit="px"
                          duration="4s"
                        />
                        Processing
                      {:else}
                        Approve
                      {/if}
                    </Button>
                  {/if}
                  <Button on:click={addToMetamask} icon={MetaMask}>
                    Add ₭enshi
                  </Button>
                {:else}
                  <ConnectButton primary />
                {/if}
              </div>
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
  .buttons {
    display: flex;
    gap: 1em;
  }
  .buttons :global(svg) {
    width: 1em;
  }
  .tokens :global(.bx--tile-group > div) {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  .token {
    display: flex;
    gap: 1em;
    align-items: center;
  }
  .token img {
    height: 1rem;
  }
  .token .name {
    flex: 1;
  }
</style>
