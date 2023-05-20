<script>
  import Footer from "src/components/Footer.svelte";
  import MetaMask from "src/icons/MetaMask.svelte";

  import { Button } from "carbon-components-svelte";
  import { Grid, Content, Row, Column, Tile } from "carbon-components-svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";
  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import { Launch, Purchase } from "carbon-icons-svelte";
  import { IntentRequestUninstall } from "carbon-icons-svelte";
  import { TextInput, CopyButton } from "carbon-components-svelte";
  import { DataTable, InlineNotification } from "carbon-components-svelte";

  import { wallet } from "src/stores/wallet";

  import { toast } from "@zerodevx/svelte-toast";
  import { ethers } from "ethers";
  import { onMount } from "svelte";
  import { SpinLine } from "svelte-loading-spinners";
  import { onboard } from "src/lib/onboard";

  import formatThousands from "format-thousands";
  import kenshiAbi from "src/lib/abi/kenshi";
  import unstakeAbi from "src/lib/abi/unstake";

  import { fetchTokenPriceFromPair } from "src/lib/api/token";
  import { page } from "$app/stores";

  let balance;
  let userAddress = $page?.url?.searchParams?.get?.("address");
  let unitPrice;
  let maxBalance;
  let treasury;
  let ableToBuy;

  let usdAbleToBuyDisplay = "0";
  let ableToBuyDisplay = "0";

  const formatCurrency = (n, unit = "") =>
    unit + formatThousands(trimDecimals(n), ",");

  const toUsd = (n) =>
    formatCurrency(n.div("1000000000000000000").toNumber() * unitPrice, "$");

  const toKenshi = (n) =>
    formatCurrency(ethers.utils.formatUnits(n || "0")) || "0";

  $: if (maxBalance && balance) {
    const diff = maxBalance.sub(balance);
    if (diff.gt(0)) {
      ableToBuy = diff;
    } else {
      ableToBuy = ethers.BigNumber.from("0");
    }
    ableToBuyDisplay = toKenshi(ableToBuy);
    usdAbleToBuyDisplay = toUsd(ableToBuy);
  }

  const trimDecimals = (n) => {
    const [lhs, rhs = ""] = n.toString().split(".");
    return [lhs, rhs.slice(0, 2).replace(/0+$/, "")].filter(Boolean).join(".");
  };

  $: balanceDisplay = toKenshi(balance || "0");
  $: maxBalanceDisplay = toKenshi(maxBalance || "0");
  $: treasuryDisplay = toKenshi(treasury || "0");

  $: usdBalanceDisplay = balance && unitPrice ? toUsd(balance) : "0";
  $: usdTreasuryDisplay = treasury && unitPrice ? toUsd(treasury) : "0";
  $: usdMaxBalanceDisplay = maxBalance && unitPrice ? toUsd(maxBalance) : "0";

  const kenshiAddr = "0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f";
  const unstakeAddr = "0xA5b18FF6189031d977db28B3D31d15F067eBD1C4";
  const treasuryAddr = "0xD59321c8266534dac369F0eFABDD5b815F1a5eb6";
  const jsonRpcUrl = "https://bsc-dataseed.binance.org";
  const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl);
  const contract = new ethers.Contract(kenshiAddr, kenshiAbi, provider);

  const onWallet = async () => {
    const walletProvider = new ethers.providers.Web3Provider($wallet.provider);
    userAddress = await walletProvider.getSigner().getAddress();
    updateValues();
  };

  const updatePrice = async () => {
    const { price } = await fetchTokenPriceFromPair();
    unitPrice = price || unitPrice;
  };

  const updateValues = async () => {
    if (!userAddress) return;
    balance = await contract.balanceOf(userAddress);
    treasury = await contract.balanceOf(treasuryAddr);
    maxBalance = await contract.getMaxBalance();
  };

  $: if ($wallet?.provider) onWallet();

  // This API key is available for free to those who want to
  // query the Kenshi contract transfer events
  const apikey = "fSDjCXCTyq+cx7+HLXKBA5oGIfqyMwztb+0/7pvTK8I=";
  const owner = "0x51DD193630806aDCFFa9E72569a71A9c12591C33";
  const endpoint = "https://api.kenshi.io/index/graphql";

  const query = (arg, addr) => `{
    getEntries(
      blockchain: "binance-mainnet",
      apikey: "${apikey}",
      owner: "${owner}",
      address: "${kenshiAddr.toLowerCase()}",
      args: [ { name: "${arg}", value: "${addr}"}]) {
        event {
          args
        }
      }
  }`;

  const getArgByName = (args, name) =>
    args
      .filter((a) => a[0] === name)
      .pop()
      .pop();

  $: if (userAddress && unitPrice) updateValues().catch(() => null);

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

  let isUnstaking = false;
  const unstake = async () => {
    isUnstaking = true;
    try {
      const provider = new ethers.providers.Web3Provider($wallet.provider);
      const signer = provider.getSigner(userAddress);
      const contract = new ethers.Contract(unstakeAddr, unstakeAbi, signer);
      await contract.unstake();
      toast.push("Unstaking was successful.");
    } catch (error) {
      toast.push("There was a problem with unstaking. Retry later.");
    }
    isUnstaking = false;
  };

  onMount(() => {
    updatePrice();
    const priceInterval = setInterval(updatePrice, 5 * 60 * 1000);
    const valueInterval = setInterval(updateValues, 5 * 60 * 1000);
    return () => {
      clearInterval(priceInterval);
      clearInterval(valueInterval);
    };
  });
</script>

<Content>
  <Grid padding>
    <Row>
      <Column lg={4} md={4} sm={4}>
        <Tile class="blue-tile">
          <div class="flex-column">
            <ExpressiveHeading size={4}>
              <h1>Kenshi Tools</h1>
            </ExpressiveHeading>
            <p>
              Kenshi tools gives you an overview of your account and provides
              you with utilities for managing it.
            </p>
          </div>
        </Tile>
      </Column>
      <Column lg={4} md={4} sm={4}>
        <div class="flex-column align-start">
          <p class="body-02">
            You'll need to connect your wallet to use certain areas of Kenshi
            tools.
          </p>
          <div class="spacer" />
          <ConnectButton primary />
        </div>
      </Column>
    </Row>
    <Row>
      <Column>
        <ExpressiveHeading size={2}>
          <h2>Account summary</h2>
        </ExpressiveHeading>
      </Column>
    </Row>
    <Row>
      <Column lg={4}>
        <Tile>
          <div class="card-inner forms">
            <div class="field">
              <TextInput
                light
                placeholder="Wallet address"
                labelText="Wallet"
                bind:value={userAddress}
              />
              {#if userAddress && typeof window !== "undefined"}
                <CopyButton
                  text={`${window.location.origin}/tools?address=${userAddress}`}
                />
              {/if}
            </div>
          </div>
          <div class="buttons">
            <Button
              href="https://pancakeswap.finance/swap?outputCurrency=0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f&chain=bsc"
              icon={Purchase}
              kind="primary"
            >
              Buy Kenshi
            </Button>
            <Button on:click={addToMetamask} icon={MetaMask} kind="tertiary">
              Add ₭enshi
            </Button>
            <Button
              href="https://charts.bogged.finance/?c=bsc&t=0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f"
              solid
              icon={Launch}
              kind="tertiary"
            >
              Charts
            </Button>
          </div>
        </Tile>
      </Column>
      {#if userAddress}
        <Column>
          <DataTable
            title="Balance sheet"
            description="Balance details for your account"
            headers={[
              { key: "name", value: "Name" },
              { key: "kenshi", value: "Kenshi" },
              { key: "usd", value: "USD" },
            ]}
            rows={[
              {
                id: "0",
                name: "Current",
                kenshi: balanceDisplay,
                usd: usdBalanceDisplay,
              },
              {
                id: "1",
                name: "To max",
                kenshi: ableToBuyDisplay,
                usd: usdAbleToBuyDisplay,
              },
            ]}
          />
        </Column>
        <Column>
          <DataTable
            title="Stats"
            description="Global Kenshi stats"
            headers={[
              { key: "name", value: "Name" },
              { key: "kenshi", value: "Kenshi" },
              { key: "usd", value: "USD" },
            ]}
            rows={[
              {
                id: "0",
                name: "Treasury",
                kenshi: treasuryDisplay,
                usd: usdTreasuryDisplay,
              },
              {
                id: "1",
                name: "Max Balance",
                kenshi: maxBalanceDisplay,
                usd: usdMaxBalanceDisplay,
              },
            ]}
          />
        </Column>
        <Column>
          <Tile>
            <ExpressiveHeading size={3}>Unstake</ExpressiveHeading>
            <div class="body-02 tax">Make your account tax-free</div>
            <InlineNotification hideCloseButton kind="info">
              You can click on the button below to completely remove the tax
              from your account. You only need to do this once.
            </InlineNotification>
            <Button
              disabled={isUnstaking}
              on:click={unstake}
              icon={IntentRequestUninstall}
            >
              {#if isUnstaking}
                <SpinLine
                  size="32"
                  color="currentColor"
                  unit="px"
                  duration="4s"
                /> Unstaking..
              {:else}
                Unstake
              {/if}
            </Button>
          </Tile>
        </Column>
      {/if}
    </Row>
  </Grid>
</Content>

<Footer />

<style>
  .field {
    display: flex;
    gap: 0;
    align-items: flex-end;
  }
  .card-inner {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  .forms {
    gap: 2em;
  }

  @media only screen and (max-width: 420px) {
    :global(.card.padding) {
      padding: 1.25em 1em;
    }
  }
  @media only screen and (max-width: 380px) {
    :global(.input) {
      font-size: 0.9em;
    }
  }
  .buttons {
    margin-top: 2em;
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
  }
  .buttons :global(svg) {
    width: 1em;
  }
  .body-02.tax {
    font-size: 0.875rem;
    color: var(--cds-text-secondary, #525252);
  }
</style>
