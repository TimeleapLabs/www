<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  import Card from "src/components/Card.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import Select from "src/components/Select.svelte";
  import Button from "src/components/Button.svelte";
  import Alert from "src/components/Alert.svelte";
  import Checkbox from "src/components/Checkbox.svelte";

  import MoneyFromBracket from "src/icons/MoneyFromBracket.svelte";
  import LeftFromLine from "src/icons/LeftFromLine.svelte";
  import RightFromLine from "src/icons/RightFromLine.svelte";
  import MetaMask from "src/icons/MetaMask.svelte";

  import { onMount } from "svelte";
  import { onboard } from "src/lib/onboard";
  import { wallet } from "src/stores/wallet";

  import { toast } from "@zerodevx/svelte-toast";
  import { ethers } from "ethers";
  import { SpinLine } from "svelte-loading-spinners";

  import pegswapAbi from "src/lib/abi/pegswap";
  import kenshiAbi from "src/lib/abi/kenshi";

  let sourceChain;
  let destChain;
  let address;
  let amount;
  let autoclaim = true;

  $: if (sourceChain && sourceChain === destChain) destChain = undefined;

  const chains = {
    polygon: "0x89",
    bsc: "0x38",
    ftm: "0xfa",
    avax: "0xa86a",
  };

  const kenshiAddresses = {
    bsc: "0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f",
    polygon: "0x164caf66c45e483F7eE647CcaD275B35B4C75719",
    ftm: "0x164caf66c45e483F7eE647CcaD275B35B4C75719",
    avax: "0x164caf66c45e483F7eE647CcaD275B35B4C75719",
  };

  const operatorAddresses = {
    polygon: "0x855C83A8d3C5BDE6A505cdFEB8272b8F47Bd3213",
    bsc: "0x855C83A8d3C5BDE6A505cdFEB8272b8F47Bd3213",
    ftm: "0x855C83A8d3C5BDE6A505cdFEB8272b8F47Bd3213",
    avax: "0x855C83A8d3C5BDE6A505cdFEB8272b8F47Bd3213",
  };

  const pegswapAddresses = {
    bsc: "0x3CcAa188Dd35E9125D7ade476da123C020aeC84d",
    polygon: "0x8AdA51404F297bF2603912d1606340223c0a7784",
    ftm: "0x8AdA51404F297bF2603912d1606340223c0a7784",
    avax: "0x8AdA51404F297bF2603912d1606340223c0a7784",
  };

  const chainIds = {
    "0x38": { key: "bsc", title: "Binance Smart Chain", shortTitle: "BSC" },
    "0x89": { key: "polygon", title: "Polygon", shortTitle: "MATIC" },
    "0xa86a": { key: "avax", title: "Avalanche", shortTitle: "AVAX" },
    "0xfa": { key: "ftm", title: "Fantom", shortTitle: "FTM" },
  };

  const setAddress = () => {
    address = $wallet.accounts?.[0]?.address;
  };

  $: if ($wallet) setAddress();

  const chainOptions = [
    { label: "Avalanche C-Chain", value: "avax" },
    { label: "Binance Smart Chain", value: "bsc" },
    { label: "Fantom", value: "ftm" },
    { label: "Polygon", value: "polygon" },
  ];

  const sourceOptions = [...chainOptions];

  let destOptions;
  $: destOptions = chainOptions.filter(({ value }) => value != sourceChain);

  const pegswapEndpoint = "https://api.kenshi.io/pegswap";

  const addToMetamask = (address, chainId) => async () => {
    const params = {
      type: "ERC20",
      options: {
        address,
        symbol: "Kenshi",
        decimals: 18,
        image: `${window.location.origin}/images/logo/512x512.png`,
      },
    };

    try {
      await onboard.setChain({ chainId });
    } catch (error) {
      return toast.push("Couldn't switch to the destination network.");
    }

    $wallet.provider
      .request({ method: "wallet_watchAsset", params })
      .catch(() => {
        toast.push("Couldn't add the token to your wallet.");
      });
  };

  const pegswapNonceQuery = (operator, toChain, nonce) => `{
    getEntries(operator: "${operator}", toChain: "${toChain}", nonce: "${nonce}") {
      signature
      request {
        fromChain
        toChain
        operator
        recipient
        amount
        nonce
      }
    }
  }`;

  const pegswapRecipientQuery = (recipient) => `{
    getEntries(recipient: "${recipient}") {
      signature
      request {
        fromChain
        toChain
        operator
        recipient
        amount
        nonce
      }
    }
  }`;

  let userRequests;
  let pendingRequests;

  const getUserRequests = async () => {
    const recipient = $wallet?.accounts?.[0]?.address;
    if (recipient) {
      const query = pegswapRecipientQuery(ethers.utils.getAddress(recipient));

      const response = await fetch(pegswapEndpoint, {
        method: "POST",
        body: JSON.stringify({ query }),
      });

      const { data: { getEntries } = {} } = (await response.json()) || {};
      userRequests = getEntries || userRequests || [];

      const pending = [];

      for (const entry of userRequests) {
        if (entry.signature === currentClaim) continue;
        const claimed = await isClaimed(entry.request);
        if (!claimed) pending.push(entry);
      }

      pendingRequests = pending;
    }
  };

  $: if ($wallet?.accounts?.[0]?.address) getUserRequests();

  const parseLog = (kenshi, pegswap) => (log) => {
    try {
      return kenshi.interface.parseLog(log);
    } catch (error) {}
    try {
      return pegswap.interface.parseLog(log);
    } catch (error) {}
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getErrorMessage = (error) => {
    return (
      error.data?.message?.match(/PegSwap: (.*)/)?.pop() ||
      error.data?.message?.replace(/execution reverted: /, "") ||
      error.data?.message ||
      "Something went wrong!"
    );
  };

  const rpcList = {
    "0x38": "https://bsc-dataseed.binance.org",
    "0x89": "https://polygon-rpc.com",
    "0xfa": "https://rpc.ftm.tools",
    "0xa86a": "https://api.avax.network/ext/bc/C/rpc",
  };

  const isClaimed = async (request) => {
    const rpcUrl = rpcList[request.toChain];
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const pegswapAddr = pegswapAddresses[chainIds[request.toChain].key];
    const pegswap = new ethers.Contract(pegswapAddr, pegswapAbi, provider);
    return await pegswap.isClaimed(request.fromChain, request.nonce);
  };

  let claiming = false;
  let currentClaim = "";

  const claim = async ({ request, signature }) => {
    currentClaim = signature;

    // Switch to the correct chain
    // await onboard.setChain({
    //   chainId: request.toChain.replace(/^0x0*/, "0x"),
    // });

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner();
    const pegswapAddr = pegswapAddresses[chainIds[request.toChain].key];
    const pegswap = new ethers.Contract(pegswapAddr, pegswapAbi, provider);

    try {
      const { v, r, s } = ethers.utils.splitSignature(signature);
      const tx = await pegswap.connect(signer).claim(request, v, r, s);
      await tx.wait(1);
      toast.push("Claimed successfully.");
    } catch (error) {
      toast.push(getErrorMessage(error));
    }

    currentClaim = "";
  };

  const claimPastRequest = async (request, signature) => {
    claiming = true;
    await onboard.setChain({
      chainId: request.toChain.replace(/^0x0+/, "0x"),
    });
    await claim({ request, signature });
    claiming = false;
  };

  const hexZeroPad = (hex) =>
    hex.length % 2 ? hex.replace(/^0x/, "0x0") : hex;

  const waitForNonceAndClaim = async (operator, toChain, nonce) => {
    const paddedChain = hexZeroPad(toChain);
    const paddedNonce = hexZeroPad(nonce.toHexString());
    const query = pegswapNonceQuery(operator, paddedChain, paddedNonce);

    let entry;

    while (!entry) {
      const response = await fetch(pegswapEndpoint, {
        method: "POST",
        body: JSON.stringify({ query }),
      });

      const { data: { getEntries } = {} } = (await response.json()) || {};

      if (getEntries && getEntries.length) {
        entry = getEntries[0];
        break;
      }

      await sleep(2500);
    }

    message = "Switching to the destination chain";

    try {
      await onboard.setChain({
        chainId: entry.request.toChain.replace(/^0x0+/, "0x"),
      });
    } catch (error) {
      toast.push("Unable to switch network!");
      throw error;
    }

    claiming = true;
    message = "Claiming from the destination chain";

    await claim(entry, true);
    claiming = false;
  };

  let requestInProgress = false;
  let message;

  const requestSwap = async () => {
    requestInProgress = true;

    try {
      message = "Switching to the source chain";
      await onboard.setChain({ chainId: chains[sourceChain] });
    } catch (error) {
      requestInProgress = false;
      message = undefined;
      return toast.push("Unable to switch network!");
    }

    message = "Sending your swap request";

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const kenshiAddr = kenshiAddresses[sourceChain];
    const pegswapAddr = pegswapAddresses[sourceChain];
    const kenshi = new ethers.Contract(kenshiAddr, kenshiAbi, provider);
    const pegswap = new ethers.Contract(pegswapAddr, pegswapAbi, provider);

    try {
      const signer = provider.getSigner();
      const parsedAmount = ethers.utils.parseUnits(amount);
      const data = ethers.utils.defaultAbiCoder.encode(
        ["uint256", "address"],
        [chains[destChain], operatorAddresses[destChain]]
      );

      const tx = await kenshi
        .connect(signer)
        ["transferAndCall(address,uint256,bytes)"](
          pegswapAddr,
          parsedAmount,
          data
        );

      message = "Waiting for the transaction";

      const receipt = await tx.wait(1);
      const logs = receipt.logs.map(parseLog(kenshi, pegswap));

      const { nonce } = logs
        .filter((log) => log?.name === "SwapRequested")
        .pop().args;

      message = "Waiting for the oracle";

      if (autoclaim) {
        await waitForNonceAndClaim(
          operatorAddresses[destChain],
          chains[destChain],
          nonce
        );
      } else {
        toast.push("Swap request successful");
      }
    } catch (error) {
      toast.push(getErrorMessage(error));
    }

    requestInProgress = false;
    message = undefined;
  };

  const formatAmount = (amount) => ethers.utils.formatUnits(amount);

  onMount(() => {
    getUserRequests();
    const recipientInterval = setInterval(getUserRequests, 15 * 1000);
    return () => {
      clearInterval(recipientInterval);
    };
  });
</script>

<Navbar />

<div class="section">
  <h2>Kenshi PegSwap</h2>
  <Card>
    <div class="card-inner">
      <div class="form">
        <h3>Kenshi cross-chain transfer</h3>
        <div class="description">
          Use this service to move your Kenshi tokens from one chain into
          another.
        </div>
        <TextInput
          placeholder="Enter destination wallet address"
          name="address"
          regex={/^0x[a-f0-9]+$/i}
          suffix="Destination"
          bind:value={address}
        />
        <TextInput
          placeholder="Amount of tokens to move"
          name="amount"
          suffix="₭enshi"
          regex={/^[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+$/}
          bind:value={amount}
        />
        <Select
          options={sourceOptions}
          placeholder="Choose source chain"
          bind:value={sourceChain}
        />
        <Select
          options={destOptions}
          placeholder="Choose destination chain"
          bind:value={destChain}
        />
        <Checkbox bind:checked={autoclaim}>Claim automatically</Checkbox>
        {#if message}
          <Alert>
            {message}
          </Alert>
        {/if}
      </div>
      <div />
    </div>

    <div class="buttons">
      {#if sourceChain && amount && isFinite(amount) && destChain && address && $wallet?.provider}
        <Button on:click={requestSwap} disabled={requestInProgress}>
          {#if requestInProgress}
            <SpinLine size="32" color="currentColor" unit="px" duration="4s" />
            Processing
          {:else}
            Transfer {amount} ₭enshi
          {/if}
        </Button>
        {#if !requestInProgress}
          <Button
            on:click={addToMetamask(
              kenshiAddresses[destChain],
              chains[destChain]
            )}
          >
            <MetaMask />
            Add {chainIds[chains[destChain]].shortTitle} ₭enshi
          </Button>
        {/if}
      {:else if !$wallet?.provider}
        Connect your wallet to continue.
      {:else}
        Fill the form to continue.
      {/if}
    </div>
  </Card>
</div>

{#if pendingRequests?.length}
  <div class="section">
    <h3>Pending requests</h3>
    <Card>
      <div class="requests">
        {#each pendingRequests as { request, signature }}
          <Card flat padding={false}>
            <div class="request">
              <div class="details">
                <div class="from-chain">
                  <LeftFromLine />
                  {chainIds[request.fromChain].title}
                </div>
                <div class="to-chain">
                  <RightFromLine />{chainIds[request.toChain].title}
                </div>
                <div class="amount">
                  <MoneyFromBracket />
                  {formatAmount(request.amount)} ₭
                </div>
              </div>
              <div class="buttons">
                <Button on:click={claimPastRequest(request, signature)}>
                  Claim
                </Button>
              </div>
            </div>
          </Card>
        {/each}
      </div>
    </Card>
  </div>
{/if}

<Footer />

<style>
  h2 {
    margin-top: 0;
    margin-bottom: 1.5em;
    margin-left: 0.5em;
  }
  h3 {
    margin-top: 0;
  }
  .section {
    padding: 2em 4em;
  }
  .section > h3 {
    margin-bottom: 2em;
  }
  @media screen and (max-width: 960px) {
    .section {
      padding: 1em;
    }
    :global(.card.padding) {
      padding: 1.5em 1.25em;
    }
  }
  .card-inner {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
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
  .description {
    margin-bottom: 1em;
    color: #111;
  }
  .requests {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1em;
  }
  .request .details {
    display: flex;
    gap: 1em;
    flex-direction: column;
  }
  .request .details > div {
    display: grid;
    grid-template-columns: 2em 1fr;
    align-items: center;
  }
  .request :global(svg) {
    margin-right: 0.5em;
    height: 1em;
    justify-self: center;
  }
  .request .buttons {
    padding-top: 1em;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 0;
    display: flex;
    justify-content: end;
  }
  .request .details,
  .request .buttons {
    padding: 1em;
  }
</style>
