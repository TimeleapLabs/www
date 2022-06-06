<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  import Card from "src/components/Card.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import Select from "src/components/Select.svelte";
  import Button from "src/components/Button.svelte";
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

  import { wallet } from "src/stores/wallet";

  import { toast } from "@zerodevx/svelte-toast";
  import { ethers } from "ethers";
  import { onMount } from "svelte";
  import formatThousands from "format-thousands";

  import kenshiAbi from "src/lib/abi/kenshi";
  import { fetchPancake } from "src/lib/api/token";
  import { page } from "$app/stores";

  let balance;
  let userAddress = $page?.url?.searchParams?.get?.("address");
  let unitPrice;
  let maxBalance;
  let treasury;
  let ableToBuy;
  let saleTax;
  let when = 0;

  let ableToBuyDisplay = "0";
  let reflections = "0";
  let reflectionsDisplay = "0";
  let reflectionsUsdDisplay = "0";

  $: if (maxBalance && balance) {
    const diff = maxBalance.sub(balance);
    if (diff.gt(0)) {
      ableToBuy = diff;
    } else {
      ableToBuy = ethers.BigNumber.from("0");
    }
    ableToBuyDisplay = formatCurrency(ethers.utils.formatUnits(ableToBuy));
  }

  const formatCurrency = (n) => formatThousands(trimDecimals(n), ",");

  const trimDecimals = (n) => {
    const [lhs, rhs] = n.toString().split(".");
    return [lhs, rhs.slice(0, 4).replace(/0+$/, "")].filter(Boolean).join(".");
  };

  $: balanceDisplay =
    formatCurrency(ethers.utils.formatUnits(balance || "0")) || "0";

  $: maxBalanceDisplay =
    formatCurrency(ethers.utils.formatUnits(maxBalance || "0")) || "0";

  $: treasuryDisplay =
    formatCurrency(ethers.utils.formatUnits(treasury || "0")) || "0";

  $: usdBalanceDisplay =
    balance && unitPrice
      ? formatCurrency(
          balance.div("1000000000000000000").toNumber() * unitPrice
        )
      : "0";

  const kenshiAddr = "0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f";
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
    const { price } = await fetchPancake();
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

  $: if (when !== undefined && userAddress) calculateTax();

  $: if ($wallet?.provider) onWallet();

  const copy = (text) => () => {
    navigator.clipboard?.writeText?.(text);
    toast.push("Copied to clipboard.");
  };

  // This API key is available for free to those who want to
  // query Kenshi contract transfer events
  const apikey = "fSDjCXCTyq+cx7+HLXKBA5oGIfqyMwztb+0/7pvTK8I=";
  const owner = "0x51DD193630806aDCFFa9E72569a71A9c12591C33";
  const endpoint = "https://api.kenshi.io/index/graphql";

  const query = (arg) => `{
    getEntries(
      blockchain: "binance-mainnet",
      apikey: "${apikey}",
      owner: "${owner}",
      address: "${kenshiAddr.toLowerCase()}",
      args: [ { name: "${arg}", value: "${userAddress}"}]) {
        event {
          args
        }
      }
  }`;

  const runQuery = (arg) =>
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ query: query(arg) }),
    })
      .then((r) => r.json())
      .then((r) =>
        r.data.getEntries.map((e) =>
          e.event.args
            .filter((a) => a[0] === "amount")
            .pop()
            .pop()
        )
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
    reflectionsDisplay = formatCurrency(reflections);
    reflectionsUsdDisplay = formatCurrency(
      balance.sub(diff).div("1000000000000000000").toNumber() * unitPrice
    );
  };

  $: if (userAddress && unitPrice) updateValues().then(calculateReflections);

  const taxDateOptions = [
    { label: "Today", value: 0 },
    { label: "Tomorrow", value: 86400 },
    ...new Array(28).fill().map((_, i) => ({
      label: `In ${i + 2} days`,
      value: 86400 * (i + 2),
    })),
  ];

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

<Navbar />

<div class="mask">
  <img src="/images/mask.png" alt="Mask" />
</div>

<div class="section">
  <h2>Kenshi Tools</h2>
  {#if !userAddress}
    <Alert warning>Connect your wallet to continue.</Alert>
  {:else}
    <Card>
      <div class="card-inner forms">
        <div class="form">
          <h5>Wallet address</h5>
          <TextInput
            placeholder="Wallet address"
            suffix="Wallet"
            bind:value={userAddress}
            icon={Wallet}
          >
            <div class="field-buttons" slot="buttons">
              <Button
                flat
                on:click={copy(
                  `${window.location.origin}/tools?address=${userAddress}`
                )}
              >
                <Link />
              </Button>
            </div>
          </TextInput>
          <h5>Tokens held</h5>
          <div class="split">
            <TextInput
              disabled
              placeholder="Kenshi balance"
              suffix="KENSHI"
              value={balanceDisplay}
              icon={Coin}
            >
              <div class="field-buttons" slot="buttons">
                <Button
                  flat
                  on:click={copy(ethers.utils.formatUnits(balance || "0"))}
                >
                  <Copy />
                </Button>
              </div>
            </TextInput>
            <TextInput
              disabled
              placeholder="Equivalent BUSD value"
              suffix="USD"
              value={usdBalanceDisplay}
              icon={Dollar}
            >
              <div class="field-buttons" slot="buttons">
                <Button
                  flat
                  on:click={copy(usdBalanceDisplay.replace(/,/g, ""))}
                >
                  <Copy />
                </Button>
              </div>
            </TextInput>
          </div>
          <h5>Reflections received</h5>
          <div class="split">
            <TextInput
              disabled
              placeholder="Reflections"
              suffix="KENSHI"
              value={reflectionsDisplay}
              icon={Coin}
            >
              <div class="field-buttons" slot="buttons">
                <Button flat on:click={copy(reflections)}>
                  <Copy />
                </Button>
              </div>
            </TextInput>
            <TextInput
              disabled
              placeholder="Equivalent BUSD value"
              suffix="USD"
              value={reflectionsUsdDisplay}
              icon={Dollar}
            >
              <div class="field-buttons" slot="buttons">
                <Button
                  flat
                  on:click={copy(reflectionsUsdDisplay.replace(/,/g, ""))}
                >
                  <Copy />
                </Button>
              </div>
            </TextInput>
          </div>
          <h5>Able to buy</h5>
          <TextInput
            disabled
            placeholder="Kenshi balance"
            suffix="KENSHI"
            value={ableToBuyDisplay}
            icon={CreditCard}
          >
            <div class="field-buttons" slot="buttons">
              <Button
                flat
                on:click={copy(ethers.utils.formatUnits(ableToBuy || "0"))}
              >
                <Copy />
              </Button>
            </div>
          </TextInput>
        </div>
        <div class="form">
          <h5>Max balance</h5>
          <TextInput
            disabled
            suffix="KENSHI"
            value={maxBalanceDisplay}
            icon={ArrowUp}
          >
            <div class="field-buttons" slot="buttons">
              <Button flat on:click={copy(maxBalanceDisplay.replace(/,/g, ""))}>
                <Copy />
              </Button>
            </div>
          </TextInput>
          <h5>Treasury</h5>
          <TextInput
            disabled
            suffix="Kenshi"
            value={treasuryDisplay}
            icon={Treasure}
          >
            <div class="field-buttons" slot="buttons">
              <Button flat on:click={copy(treasuryDisplay.replace(/,/g, ""))}>
                <Copy />
              </Button>
            </div>
          </TextInput>
          <h5>Selling tax</h5>
          <div class="split">
            <Select
              options={taxDateOptions}
              placeholder="When?"
              icon={Timer}
              bind:value={when}
            />
            <TextInput
              disabled
              placeholder="Tax percentage"
              suffix="percent"
              value={saleTax}
              icon={Percent}
            />
          </div>
        </div>
      </div>
      <div class="buttons">
        <Button
          href="https://pancakeswap.finance/swap?outputCurrency=0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f"
          solid
        >
          Buy Kenshi <External />
        </Button>
        <Button
          href="https://charts.bogged.finance/?c=bsc&t=0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f"
          solid
        >
          Charts <External />
        </Button>
      </div>
    </Card>
  {/if}
</div>

<Footer />

<style>
  h2 {
    margin-top: 0;
    margin-bottom: 1.5em;
    margin-left: 0.5em;
  }
  h5 {
    margin: 0;
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
  }
  .mask {
    position: absolute;
    z-index: -1;
    height: 960px;
    top: -60px;
    padding: 0;
    opacity: 0.6;
    max-width: 80%;
    max-height: 80%;
  }
  .mask img {
    height: 100%;
  }
</style>
