<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  import Alert from "src/components/Alert.svelte";

  import Copy from "src/icons/Copy.svelte";
  import External from "src/icons/External.svelte";
  import Coin from "src/icons/Coin.svelte";
  import Dollar from "src/icons/Dollar.svelte";
  import ArrowUp from "src/icons/ArrowUp.svelte";
  import Treasure from "src/icons/Treasure.svelte";
  import CreditCard from "src/icons/CreditCard.svelte";
  import Percent from "src/icons/Percent.svelte";
  import Timer from "src/icons/Timer.svelte";
  import Wallet from "src/icons/WalletThin.svelte";
  import Link from "src/icons/Link.svelte";
  import MetaMask from "src/icons/MetaMask.svelte";

  import { Button, Select, SelectItem } from "carbon-components-svelte";
  import { Grid, Content, Row, Column, Tile } from "carbon-components-svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";
  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import { Launch, Purchase, CaretUp } from "carbon-icons-svelte";
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

  import { fetchTokenPriceFromPair } from "src/lib/api/token";
  import { page } from "$app/stores";

  let balance;
  let userAddress = $page?.url?.searchParams?.get?.("address");
  let unitPrice;
  let maxBalance;
  let treasury;
  let ableToBuy;
  let saleTax;
  let when = 0;

  let usdAbleToBuyDisplay = "0";
  let ableToBuyDisplay = "0";
  let reflections = "0";
  let reflectionsDisplay = "0";
  let reflectionsUsdDisplay = "0";

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
  const proxyAddr = "0x0A7eD4314D9109986281bdd6235f1A5623690110";
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

  const calculateTax = async () => {
    saleTax = await contract.getTaxPercentageAt(
      userAddress,
      Math.floor(new Date().valueOf() / 1000 + when)
    );
  };

  const updateValues = async () => {
    if (!userAddress) return;
    balance = await contract.balanceOf(userAddress);
    treasury = await contract.balanceOf(treasuryAddr);
    maxBalance = await contract.getMaxBalance();
    calculateTax();
  };

  $: if (when !== undefined && userAddress) calculateTax().catch(() => null);

  $: if ($wallet?.provider) onWallet();

  const copy = (text) => () => {
    navigator.clipboard?.writeText?.(text);
    toast.push("Copied to clipboard.");
  };

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

  const runQuery = (arg) =>
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        query: query(arg, ethers.utils.getAddress(userAddress)),
      }),
    })
      .then((r) => r.json())
      .then((r) =>
        r.data.getEntries.map((e) => {
          const amount = getArgByName(e.event.args, "amount");
          const to = getArgByName(e.event.args, "to");
          if (to === treasuryAddr) {
            // Account for reflections going out of this account
            return ethers.BigNumber.from(amount).mul(2);
          } else {
            return amount;
          }
        })
      );

  const sumArr = (arr) =>
    arr.reduce((a, b) => a.add(b), ethers.BigNumber.from("0"));

  const calculateReflections = async () => {
    const received = await runQuery("to");
    const sent = await runQuery("from");

    const receivedAmount = sumArr(received);
    const sentAmount = sumArr(sent);
    const diff = receivedAmount.sub(sentAmount);

    reflections = ethers.utils.formatUnits(balance.sub(diff));
    reflectionsDisplay = toKenshi(balance.sub(diff));
    reflectionsUsdDisplay = toUsd(balance.sub(diff));
  };

  $: if (userAddress && unitPrice)
    updateValues()
      .then(calculateReflections)
      .catch(() => null);

  const taxDateOptions = [
    { text: "Today", value: 0 },
    { text: "Tomorrow", value: 86400 },
    ...new Array(28).fill().map((_, i) => ({
      text: `In ${i + 2} days`,
      value: 86400 * (i + 2),
    })),
  ];

  let transferTo = "";
  let transferAmount = "0";
  let transferring = false;

  const maxTransfer = () => {
    transferAmount = ethers.utils.formatUnits(balance, 18);
  };

  const transfer = async () => {
    if (!transferTo) {
      return toast.push("Destination is required");
    }

    if (!transferAmount || !Number(transferAmount)) {
      return toast.push("Amount is required");
    }

    const tax = await contract.getTaxPercentageAt(
      userAddress,
      Math.floor(new Date().valueOf() / 1000)
    );

    if (tax > 5) {
      return toast.push("Fine amount is bigger than zero");
    }

    transferring = true;

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner();

    try {
      await onboard.setChain({ chainId: "0x38" });
    } catch (error) {
      transferring = false;
      return toast.push("Couldn't switch to BNBChain.");
    }

    try {
      const parsedAmount = ethers.utils.parseUnits(transferAmount);
      const data = ethers.utils.defaultAbiCoder.encode(
        ["address"],
        [transferTo]
      );

      const tx = await contract
        .connect(signer)
        ["transferAndCall(address,uint256,bytes)"](
          proxyAddr,
          parsedAmount,
          data
        );

      await tx.wait(1);

      toast.push("Transfer successful.");
    } catch (error) {
      toast.push("Transfer failed.");
    }

    transferring = false;
  };

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
  <Grid noGutter narrow padding>
    <Row>
      <Column max={4}>
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
      <Column max={4}>
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
              {#if userAddress}
                <CopyButton
                  text={`${window.location.origin}/tools?address=${userAddress}`}
                />
              {/if}
            </div>
          </div>
          <div class="buttons">
            <Button href="/swap" icon={Purchase} kind="tertiary">
              Buy Kenshi
            </Button>
            <Button on:click={addToMetamask} icon={MetaMask} kind="tertiary">
              Add ₭enshi
            </Button>
            <Button
              href="https://charts.bogged.finance/?c=bsc&t=0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f"
              solid
              icon={Launch}
              kind="secondary"
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
              {
                id: "2",
                name: "Reflections",
                kenshi: reflectionsDisplay,
                usd: reflectionsUsdDisplay,
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
            <div class="flex-column">
              <Select light labelText="Tax at" bind:selected={when}>
                {#each taxDateOptions as { text, value }}
                  <SelectItem {value} {text} />
                {/each}
              </Select>
              <TextInput
                readonly
                labelText="Tax percentage"
                value={saleTax}
                icon={Percent}
              />
            </div>
          </Tile>
        </Column>
      {/if}
    </Row>
    {#if $wallet?.provider}
      <Row>
        <Column>
          <ExpressiveHeading size={2}>
            <h2>Wallet Transfer</h2>
          </ExpressiveHeading>
        </Column>
      </Row>
      <Row>
        <Column lg={4}>
          <Tile>
            <div class="card-inner forms">
              <div class="form">
                <TextInput
                  labelText="Destination"
                  placeholder="Destination"
                  light
                  bind:value={transferTo}
                />
                <div class="field">
                  <TextInput
                    light
                    placeholder="Amount"
                    labelText="Amount"
                    bind:value={transferAmount}
                  />
                  <Button size="field" on:click={maxTransfer} icon={CaretUp}>
                    MAX
                  </Button>
                </div>
                <InlineNotification kind="warning" hideCloseButton>
                  To be able to make a transfer, your selling tax should be 5%.
                  See the Kenshi tools above to find out about your current tax.
                </InlineNotification>
              </div>
            </div>
            <div class="buttons">
              <Button on:click={transfer} disabled={transferring}>
                {#if transferring}
                  <SpinLine
                    size="32"
                    color="currentColor"
                    unit="px"
                    duration="4s"
                  />
                  Processing
                {:else}
                  Transfer
                {/if}
              </Button>
            </div>
          </Tile>
        </Column>
      </Row>
    {/if}
  </Grid>
</Content>

<Footer />

<style>
  .field {
    display: flex;
    gap: 0;
    align-items: flex-end;
  }
  .section {
    padding: 4em;
    padding-top: 2em;
    flex: 1;
    min-height: 30%;
  }
  @media screen and (max-width: 960px) {
    .section {
      padding: 2em;
    }
  }
  .card-inner {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  .forms {
    gap: 2em;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .split {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1em;
  }
  @media only screen and (max-width: 640px) {
    .split {
      grid-template-columns: 1fr;
    }
    .section {
      padding: 1em;
    }
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
  .mask {
    position: absolute;
    z-index: -1;
    top: 0;
    padding: 0;
    opacity: 0.6;
    height: 80%;
    max-height: 640px;
    width: auto;
  }
  .mask img {
    height: 100%;
    max-width: 100%;
  }
  .alert {
    margin-bottom: 2em;
    max-width: 560px;
  }
  .field-with-buttons {
    display: flex;
    gap: 1em;
    align-items: flex-start;
  }
</style>
