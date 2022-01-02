<script>
  import Medium from "../../icons/Medium.svelte";
  import Telegram from "../../icons/Telegram.svelte";
  import Twitter from "../../icons/Twitter.svelte";
  import Github from "../../icons/Github.svelte";
  import Reddit from "../../icons/Reddit.svelte";
  import At from "../../icons/At.svelte";
  import Arrow from "../../icons/Arrow.svelte";

  import abi from "src/lib/abi/deployer.js";
  import kenshiAbi from "src/lib/abi/kenshi.js";

  import ConnectButton from "src/components/ConnectButton.svelte";
  import { onboard } from "$lib/onboard";
  import { wallet } from "../../stores/wallet";

  import { onMount } from "svelte";
  import { ethers } from "ethers";
  import { toast } from "@zerodevx/svelte-toast";
  import { goto } from "$app/navigation";

  import Moon from "svelte-loading-spinners/dist/Moon.svelte";

  const formatBNB = (n) =>
    ethers.utils.formatUnits(n).replace(/(?=\.\d{2})\d+/, "");

  const formatKenshi = (n) =>
    parseFloat(
      ethers.utils.formatUnits(n).replace(/(?=\.\d{2})\d+/, "")
    ).toLocaleString("en-US");

  let kenshi;
  let signer;
  let userAddress;
  let paymentMethod = "kenshi";

  // TESTNET CONTRACT ADDRESS
  const contractAddr = "0xaADa8d6030c590b2F7c8a0c6Eb102AE424E5413b";
  const kenshiAddr = "0x8AdA51404F297bF2603912d1606340223c0a7784";

  let lockerCreator;
  let price = ethers.BigNumber.from(0);
  let priceInKenshi = ethers.BigNumber.from(0);
  let acceptedTerms = true;
  let address = "";

  const manage = () => {
    if (address) {
      goto(`/locker/manage/${address}`);
    }
  };

  const switchChain = async (wallet, chainId) => {
    const provider = new ethers.providers.Web3Provider(wallet.provider);
    await provider
      .send("wallet_switchEthereumChain", [{ chainId }])
      .catch(() => {});
  };

  const connectWallet = async (wallet) => {
    await switchChain(wallet, "0x38");
    const provider = new ethers.providers.Web3Provider(wallet.provider);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    updateValues(signer);
  };

  $: if ($wallet) connectWallet($wallet);

  const connectNoWallet = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://bsc-dataseed.binance.org/"
    );
    updateValues(provider);
  };

  const updateValues = async (provider) => {
    lockerCreator = new ethers.Contract(contractAddr, abi, provider);
    price = await lockerCreator.getPrice();
    priceInKenshi = await lockerCreator.getPriceInKenshi();
    listenToPriceChanges();
    kenshi = new ethers.Contract(kenshiAddr, kenshiAbi, provider);
  };

  const waitForLockerCreation = (hash) => {
    return new Promise((resolve) => {
      lockerCreator.on("LockerCreated", async (...args) => {
        const event = args.pop();
        if (event.transactionHash === hash) resolve(args);
      });
    });
  };

  const listenToPriceChanges = () => {
    lockerCreator.on("PriceChanged", async (newPrice) => {
      price = newPrice;
    });
    lockerCreator.on("PriceInKenshiChanged", async (newPrice) => {
      priceInKenshi = newPrice;
    });
  };

  let creating = false;

  const create = async () => {
    toast.push("Creating wallet,<br>Please wait...");
    try {
      creating = true;
      const call = await lockerCreator.newLocker({ value: price });
      const [lockerAddr] = await waitForLockerCreation(call.hash);
      goto(`/locker/manage/${lockerAddr}`);
    } catch (error) {
      creating = false;
    }
  };

  let creatingWithKenshi = false;

  const createWithKenshi = async () => {
    toast.push("Creating wallet,<br>Please wait...");
    try {
      creatingWithKenshi = true;
      await kenshi.approve(contractAddr, priceInKenshi);
      const call = await lockerCreator.newLockerVestKenshi();
      const [lockerAddr] = await waitForLockerCreation(call.hash);
      goto(`/locker/manage/${lockerAddr}`);
    } catch (error) {
      creatingWithKenshi = false;
    }
  };

  onMount(() => {
    if (!$wallet) connectNoWallet();
  });
</script>

<div class="page">
  <div class="head">
    <div class="navbar">
      <div class="links spaced">
        <a href="/">
          <div class="vertical-logo">
            <div class="logo">
              <img src="/images/kenshi.round.png" alt="Kenshi" />
            </div>
            <div class="logo textual">
              <img src="/images/kenshi.textual.svg" alt="Kenshi" />
            </div>
          </div>
        </a>
        <a href="/#services">Services</a>
        <a href="/#tokenomics">Tokenomics</a>
        <a href="https://docs.kenshi.io">Whitepaper</a>
      </div>
      <div class="spacer" />
      <div class="links">
        <a href="https://t.me/kenshi_token"> <Telegram /> </a>
        <a href="https://twitter.com/kenshi_token"> <Twitter /> </a>
        <a href="https://blog.kenshi.io"> <Medium /> </a>
        <a href="https://www.reddit.com/r/kenshi_token/"> <Reddit /> </a>
        <a href="https://github.com/kenshi-token"> <Github /> </a>
      </div>
    </div>
  </div>
  <div class="section spacer">
    <div class="samurai-illustration" />
    <div class="split">
      <div>
        <div class="title has-button">
          <h2>Locker</h2>
          {#if userAddress}
            <div class="user">
              <span class="icon"><At /></span>
              <span class="red"> 0x </span>
              <span class="green">
                {userAddress.slice(2, 6)}...{userAddress.slice(-4)}
              </span>
            </div>
          {:else}
            <ConnectButton />
          {/if}
        </div>
        <div class="locker-description">
          <div>
            <p>
              Kenshi Lockers can be used to lock any tokens on the Binance Smart
              Chain. You can use this service to lock your liquidity pool tokens
              or to vest team allocations and investor shares.
            </p>
            <!--a href="/locker/manage" class="red"> Manage Locker <Arrow /> </a-->
          </div>
          <div>
            <p>
              Kenshi Lockers provide an easy to use mechanism for locking your
              tokens, as well as a dedicated page for your clients to check the
              status of your locked tokens.
            </p>
            <a
              href="/locker/manage/0xe570334989Fa3b77C6f1cFbc2D1909D4255bA1f6"
              class="red"
            >
              See an example <Arrow />
            </a>
          </div>
        </div>
      </div>
      <div>
        <h2>Manage Locker</h2>
        <div class="manage-locker">
          <p>
            To manage a locker, put the locker address in the field below and
            press on the Go button!
          </p>
          <div class="manage">
            <input
              type="text"
              placeholder="Locker address"
              bind:value={address}
            />
            <button on:click={manage}>Go</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="section creator">
    <div class="guardian-illustration" />
    <div class="create">
      <h2>Locker Creator</h2>
      <div class="create-form">
        <p>
          You can choose to pay in BNB, or get a liquidity locker for free by
          locking a specific amount of Kenshi.
        </p>
        <p>
          Once you create the locker, it's yours forever. Adding tokens,
          relocking or extending the unlock time are free of charge.
        </p>
        <div class="form">
          <label>
            <input
              type="radio"
              name="payment-method"
              value="kenshi"
              checked
              bind:group={paymentMethod}
            />
            Lock {formatKenshi(priceInKenshi)} KENSHI for minimum 1 year
          </label>
          <label>
            <input
              type="radio"
              name="payment-method"
              value="bnb"
              bind:group={paymentMethod}
            />
            Pay with {formatBNB(price)} BNB
          </label>
          <label class="terms">
            <input type="checkbox" bind:checked={acceptedTerms} />
            I accept the Kenshi Locker
            <a href="https://docs.kenshi.io/services/locker.html" class="red">
              terms of service
            </a>.
          </label>
        </div>
        <div class="buttons">
          {#if !userAddress}
            <button on:click={() => onboard.walletSelect()}>
              Connect Wallet
            </button>
          {:else if acceptedTerms}
            {#if paymentMethod === "bnb"}
              <button on:click={create} disabled={creating}>
                {#if creating}
                  <Moon size="16" /> Creating
                {:else}
                  Create - {formatBNB(price)} BNB
                {/if}
              </button>
            {:else}
              <button on:click={createWithKenshi} disabled={creatingWithKenshi}>
                {#if creatingWithKenshi}
                  <Moon size="16" /> Creating
                {:else}
                  Create - {formatKenshi(priceInKenshi)} KENSHI
                {/if}
              </button>
            {/if}
          {:else}
            <button disabled> Please accept TOS first </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
  <div class="section footer">
    <div class="made-with">
      Made with ❤️ by awesome people
      <div class="contact">
        Contact us on
        <a href="https://t.me/kenshi_token">Telegram</a> or
        <a href="https://twitter.com/kenshi_token">Twitter</a>, we're friendly!
      </div>
    </div>
    <div class="spacer" />
    <div class="copyright">Copyright © 2021 - Kenshi</div>
  </div>
</div>

<div class="bar" />

<style>
  .form {
    margin-top: 2em;
    display: flex;
    gap: 0.5em;
    flex-direction: column;
  }
  .terms {
    margin-top: 0.5em;
  }
  .locker-description {
    max-width: 960px;
    font-size: 1.2em;
    font-weight: 200;
    line-height: 1.25em;
  }
  .locker-description p:first-of-type {
    margin-top: 0;
  }
  .locker-description a {
    display: inline-flex;
    gap: 0.5em;
  }
  .locker-description a :global(svg) {
    opacity: 0;
    transition: cubic-bezier(0.19, 1, 0.22, 1) all 0.2s;
  }
  .locker-description a:hover :global(svg) {
    opacity: 1;
  }
  .navbar {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 2em;
  }
  .vertical-logo {
    display: flex;
    align-items: center;
  }
  .vertical-logo img {
    height: 4em;
  }
  .vertical-logo .logo.textual {
    margin-left: 1em;
  }
  .vertical-logo .logo.textual img {
    height: 2em;
  }
  .spacer {
    flex: 1;
  }
  .manage-locker {
    max-width: 640px;
  }
  .split {
    display: flex;
    gap: 4em;
    flex-wrap: wrap;
  }
  a {
    font-family: "Raleway";
    color: #000;
  }
  a :global(svg) {
    width: 1em;
  }
  a {
    transition: cubic-bezier(0.39, 0.575, 0.565, 1) all 0.3s;
  }
  a:not(.button):not(.buy a):not(.red):hover {
    color: var(--primary-color);
  }
  .manage {
    display: flex;
    gap: 1em;
    margin-top: 2em;
  }
  .manage button {
    font-size: 1.25em;
    padding: 0.5em 1em;
    background: #000;
    color: #fff;
    border-radius: 3em;
    font-family: "Raleway";
    display: inline-flex;
    align-items: center;
    transition: cubic-bezier(0.39, 0.575, 0.565, 1) all 0.3s;
    border: none;
    outline: none;
    max-width: 160px;
    justify-content: center;
    cursor: pointer;
  }
  .manage input {
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 40px 4px rgb(0 0 0 / 10%);
    border-radius: 1.5em;
    padding: 1em 2em;
    align-items: center;
    background: linear-gradient(
      166deg,
      rgba(105, 118, 121, 0.2) 44%,
      rgba(33, 43, 46, 0.2) 100%
    );
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(32px);
    color: #000;
    box-sizing: border-box;
    border: none;
    outline: none;
    font-size: 1em;
    flex: 1;
  }
  button:hover {
    background: var(--primary-color);
  }
  .red {
    color: var(--primary-color);
  }
  .green {
    color: var(--secondary-color);
  }
  .page {
    padding: 1em 6em;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 4px);
    box-sizing: border-box;
  }
  .bar {
    height: 4px;
    width: 100%;
    background: url(/images/square.jpg);
    background-size: 20%;
    opacity: 0.4;
  }
  .section {
    padding: 3em;
  }
  .head + .section {
    padding-top: 2em;
  }
  .head {
    padding: 0em 3em;
  }
  .section h2 {
    font-size: 3em;
    margin-top: 0;
    margin-bottom: 1em;
  }
  .footer {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 2em;
    display: flex;
    align-items: center;
    padding-bottom: 1em;
    flex-wrap: wrap;
  }
  .links {
    font-size: 1.2em;
    display: flex;
    gap: 0.5em;
    align-items: center;
    margin-bottom: 1em;
    margin-left: 0.5em;
  }
  .links.spaced {
    gap: 2em;
  }
  .title {
    display: flex;
    align-items: center;
    gap: 1em;
    margin-bottom: 2em;
    flex-wrap: wrap;
  }
  .title h2 {
    margin-bottom: 0.15em;
  }
  .user {
    display: flex;
    align-items: center;
    gap: 0.25em;
  }
  .user .icon {
    height: 1em;
    width: 1em;
  }
  .samurai-illustration {
    background: url(/images/samurai.png);
    background-size: cover;
    position: absolute;
    height: 1200px;
    width: 800px;
    left: -300px;
    bottom: -300px;
    z-index: -1;
    filter: grayscale(1) contrast(0);
    transform: rotate(33deg);
    opacity: 0.1;
  }
  .guardian-illustration {
    background: url(/images/guardian.png);
    background-size: cover;
    position: absolute;
    height: 400px;
    width: 400px;
    right: 0;
    bottom: 0px;
    z-index: -1;
  }
  .section.creator {
    position: relative;
    flex: 1;
  }
  label {
    display: block;
  }
  .buttons {
    margin-top: 2em;
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
  }
  .create-form {
    font-size: 1.2em;
    font-weight: 200;
    line-height: 1.25em;
  }
  .create-form p {
    max-width: 720px;
  }
  .create-form button {
    font-size: 1em;
    padding: 0.75em 1.5em;
    background: #000;
    color: #fff;
    border-radius: 3em;
    font-family: "Raleway";
    display: inline-flex;
    align-items: center;
    transition: cubic-bezier(0.39, 0.575, 0.565, 1) all 0.3s;
    border: none;
    cursor: pointer;
  }
  .create-form button:disabled {
    background: #ccc;
    color: #000;
    cursor: not-allowed;
  }
  .create-form button:not(:disabled):hover {
    background: var(--primary-color);
  }
  @media (max-width: 1800px) {
  }
  @media (max-width: 1500px) {
    .page {
      padding: 0;
    }
  }
  @media (max-width: 1350px) {
    .guardian-illustration {
      filter: grayscale(1) opacity(0.1);
    }
  }
  @media (max-width: 1200px) {
    .samurai-illustration {
      height: 800px;
      width: 600px;
      top: 100px;
    }
  }
  @media (max-width: 960px) {
  }
  @media (max-width: 860px) {
    .navbar .links:first-of-type a:not(:first-of-type) {
      display: none;
    }
    .locker-description {
      grid-template-columns: 1fr 1fr;
    }
    .section h2 {
      margin-left: 0em;
    }
  }
  @media (max-width: 600px) {
    .navbar {
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 1em;
    }
    .locker-description {
      grid-template-columns: 1fr;
      gap: 0em;
    }
    .navbar .spacer {
      flex: 0;
    }
    .head {
      padding: 0 1em;
    }
    .page {
      padding: 0;
    }
    .section {
      padding: 2em;
    }
    h2:not(.has-button h2) {
      margin-bottom: 0.5em !important;
    }
  }
</style>
