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

  import { onMount } from "svelte";
  import { onboard } from "src/lib/onboard";
  import { wallet } from "src/stores/wallet";

  import { toast } from "@zerodevx/svelte-toast";
  import { ethers } from "ethers";
  import { SpinLine } from "svelte-loading-spinners";
  import { toChecksumAddress } from "ethereum-checksum-address";

  import pegswapAbi from "src/lib/abi/pegswap";
  import kenshiAbi from "src/lib/abi/kenshi";

  let sourceChain;
  let destChain;
  let address;
  let amount;
  let autoclaim = true;

  $: if (sourceChain && sourceChain === destChain) destChain = undefined;

  const chains = {
    mumbai: "0x13881",
    bsc: "0x61",
    ftm: "0xfa2",
    avax: "0xa869",
  };

  const kenshiAddresses = {
    mumbai: "0xA8eeAd1e6a4Cab8010DCA5F7805d7Cb2c2fD9117",
    bsc: "0xc3eD8d7207e5171C6f7565dd5e18720AA9E333dE",
    ftm: "0x039976F40a15Bbaaf055144d59F0a47341AF2dcb",
    avax: "0xd8aA9BeB5ef0eD1Bbb8Efb6EE665888c2E4F7b64",
  };

  const operatorAddresses = {
    mumbai: "0x855C83A8d3C5BDE6A505cdFEB8272b8F47Bd3213",
    bsc: "0x855C83A8d3C5BDE6A505cdFEB8272b8F47Bd3213",
    ftm: "0x855C83A8d3C5BDE6A505cdFEB8272b8F47Bd3213",
    avax: "0x855C83A8d3C5BDE6A505cdFEB8272b8F47Bd3213",
  };

  const pegswapAddresses = {
    mumbai: "0xDb5f4eb0aC90290db12F43cDca2F8b33b56429E8",
    bsc: "0x20D8A34Aaea660d72b6CF8CB535fe01670Bb33C6",
    ftm: "0x2D8152b970dbf426EC2fa8950370f9976508389d",
    avax: "0xeDd8B6480e7328b2a6871646D831084EeB1f27d4",
  };

  const chainIds = {
    "0x61": { key: "bsc", title: "Binance Smart Chain" },
    "0x013881": { key: "mumbai", title: "Polygon Mumbai" },
    "0xa869": { key: "avax", title: "Avalanche Fuji" },
    "0x0fa2": { key: "ftm", title: "Fantom Testnet" },
  };

  $: if (!claiming && sourceChain && $wallet?.provider) {
    onboard.setChain({ chainId: chains[sourceChain] });
  }

  const setAddress = () => {
    address = $wallet.accounts?.[0]?.address;
  };

  $: if ($wallet) setAddress();

  const chainOptions = [
    { label: "Avalanche Fuji C-Chain", value: "avax" },
    { label: "Binance Smart Chain Testnet", value: "bsc" },
    { label: "Fantom Testnet", value: "ftm" },
    { label: "Polygon Mumbai", value: "mumbai" },
  ];

  const sourceOptions = [...chainOptions];

  let destOptions;
  $: destOptions = chainOptions.filter(({ value }) => value != sourceChain);

  const pegswapEndpoint = "https://api.kenshi.io/pegswap";

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
      const query = pegswapRecipientQuery(toChecksumAddress(recipient));

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
    "0x61": "https://data-seed-prebsc-1-s1.binance.org:8545",
    "0x013881": "https://rpc-mumbai.maticvigil.com",
    "0x0fa2": "https://rpc.testnet.fantom.network/",
    "0xa869": "https://api.avax-test.network/ext/bc/C/rpc",
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
      await pegswap.connect(signer).claim(request, v, r, s);
      toast.push("Claimed successfully.");
    } catch (error) {
      toast.push(getErrorMessage(error));
    }

    currentClaim = "";
  };

  const claimPastRequest = async (request, signature) => {
    claiming = true;
    await onboard.setChain({
      chainId: request.toChain.replace(/^0x0*/, "0x"),
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

      await sleep(5000);
    }

    claiming = true;
    message = "Claiming from the destination chain";

    await onboard.setChain({
      chainId: entry.request.toChain.replace(/^0x0*/, "0x"),
    });

    await claim(entry, true);
    claiming = false;
  };

  let spin = false;
  let message;

  const requestSwap = async () => {
    spin = true;
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
        toast.push("Claim request successful");
      }
    } catch (error) {
      return toast.push(getErrorMessage(error));
    }

    spin = false;
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
        <Button on:click={requestSwap} disabled={spin}>
          {#if spin}
            <SpinLine size="32" color="currentColor" unit="px" duration="4s" />
            Processing
          {:else}
            Transfer {amount} ₭enshi
          {/if}
        </Button>
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
