<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  import Card from "src/components/Card.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import Button from "src/components/Button.svelte";
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

  const selectToken = (token) => () => {
    swapFrom = token.address;
    fromTokenSymbol = token.symbol;
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

<Navbar />

<div class="section">
  <h2>Kenshi Swap</h2>
  <Card>
    <div class="card-inner">
      <div class="forms">
        <div class="form">
          <h3>Swap from</h3>
          <div class="tokens">
            {#each tokens as token}
              <div
                class="token"
                class:selected={swapFrom === token.address}
                on:click={selectToken(token)}
              >
                <img src="/images/tokens/{token.icon}.svg" alt={token.name} />
                <span class="name">{token.name}</span>
                <span class="symbol">{token.symbol}</span>
                {#if swapFrom === token.address}
                  <span class="green">
                    <CircleCheck />
                  </span>
                {:else}
                  <span class="grey">
                    <CircleDashed />
                  </span>
                {/if}
              </div>
            {/each}
          </div>
          <TextInput
            bind:value={quoteInput}
            suffix={fromTokenSymbol}
            placeholder="Amount"
          />
          <Alert>
            To swap from any other tokens you can trade directly on
            <a
              target="_blank"
              href="https://pancakeswap.finance/swap?outputCurrency=0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f"
            >
              PancakeSwap</a
            >.
          </Alert>
          <h3>To get</h3>
          <div class="output">
            <TextInput value={quoteOutput} suffix="₭enshi" icon={Kenshi} />
          </div>
        </div>
        <div />
      </div>
    </div>
    <div class="buttons">
      {#if $wallet?.provider}
        {#if ethers.BigNumber.from(allowedToSpend).gte(ethers.utils.parseUnits(quoteInput))}
          <Button on:click={() => swap(swapFrom, quoteInput)} disabled={spin}>
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
        <Button on:click={addToMetamask}>
          <MetaMask />
          Add ₭enshi
        </Button>
      {:else}
        Connect your wallet to continue.
      {/if}
    </div>
  </Card>
</div>

<Footer />

<style>
  h2 {
    margin-top: 0;
    margin-bottom: 1.5em;
    margin-left: 0.5em;
  }
  h3 {
    margin-top: 0;
    margin-bottom: 0;
  }
  .section {
    padding: 4em;
    padding-top: 2em;
  }
  @media screen and (max-width: 960px) {
    .section {
      padding: 2em;
    }
  }
  .forms {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2em;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .buttons {
    margin-top: 2em;
    display: flex;
    gap: 1em;
  }
  .buttons :global(svg) {
    width: 1em;
  }
  .output :global(.icon svg) {
    fill: var(--primary-color);
  }
  .tokens {
    display: grid;
    gap: 0.5em;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  .token {
    display: flex;
    gap: 1em;
    align-items: center;
    padding: 1em;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    cursor: pointer;
  }
  .token.selected {
    border-color: var(--secondary-color);
  }
  .token img {
    height: 24px;
  }
  .token .name {
    flex: 1;
  }
  .green,
  .grey {
    display: flex;
    align-items: center;
  }
  .green :global(svg) {
    width: 1.25em;
    fill: var(--secondary-color);
  }
  .grey :global(svg) {
    width: 1.25em;
    fill: rgba(0, 0, 0, 0.1);
  }
  a {
    color: black;
    text-decoration: underline;
  }
  @media only screen and (max-width: 640px) {
    .section {
      padding: 1em;
    }
  }
  @media only screen and (max-width: 420px) {
    :global(.card.padding) {
      padding: 1.5em 1.25em;
    }
    .forms > div:nth-of-type(2) {
      display: none;
    }
  }
</style>
