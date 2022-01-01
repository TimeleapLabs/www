<script>
  import Medium from "src/icons/Medium.svelte";
  import Telegram from "src/icons/Telegram.svelte";
  import Twitter from "src/icons/Twitter.svelte";
  import Github from "src/icons/Github.svelte";
  import Reddit from "src/icons/Reddit.svelte";
  import At from "src/icons/At.svelte";
  import Arrow from "src/icons/Arrow.svelte";
  import Copy from "src/icons/Copy.svelte";
  import Calendar from "src/icons/Calendar.svelte";
  import UserGear from "src/icons/UserGear.svelte";
  import Wallet from "src/icons/Wallet.svelte";
  import Coins from "src/icons/Coins.svelte";
  import Circulation from "src/icons/Circulation.svelte";
  import ThumbsDown from "src/icons/ThumbsDown.svelte";
  import ThumbsUp from "src/icons/ThumbsUp.svelte";
  import PullRequest from "src/icons/PullRequest.svelte";
  import External from "src/icons/External.svelte";
  import BinaryLock from "src/icons/BinaryLock.svelte";

  import { Jumper } from "svelte-loading-spinners";
  import { ethers } from "ethers";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  import abi from "src/lib/abi/locker.js";
  import bep20 from "src/lib/abi/bep20.js";
  import deployerAbi from "src/lib/abi/deployer";
  import { wallet } from "src/stores/wallet";
  import { toast } from "@zerodevx/svelte-toast";

  import ConnectButton from "src/components/ConnectButton.svelte";

  let kenshi;
  let signer;
  let userAddress;

  $: if (kenshi && userAddress && sellingDate && sellingAmount) {
    const timestamp = Math.floor(new Date(sellingDate).valueOf() / 1000);
    kenshi.getTaxPercentageAt(userAddress, timestamp).then((tax) => {
      sellingTax = tax;
    });
  }

  // MAINNET CONTRACT ADDRESS
  const contractAddr = $page.params.addr;
  const deployerAddr = "0xaADa8d6030c590b2F7c8a0c6Eb102AE424E5413b";

  let locker;
  let lock;
  let owner;
  let isKenshiLocker;
  let lockerVersion;

  let newLockDate;
  let tokenAddr = "";
  let amount = 0;
  let tokenName = "Token";
  let tokens = [];
  let loadingTokens = true;

  $: if (tokenAddr && signer) {
    const token = new ethers.Contract(tokenAddr, bep20, signer);
    token.name().then((name) => {
      tokenName = name;
    });
  }

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

  const connectNoWallet = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://bsc-dataseed.binance.org/"
    );
    updateValues(provider);
  };

  $: if ($wallet) {
    connectWallet($wallet);
  }

  const getLockedTokens = async () => {
    const req = await fetch(
      `${window.location.origin}/api/balance/${contractAddr}`
    );
    if (req.status === 200) {
      return await req.json();
    }
    return [];
  };

  const updateValues = async (signer) => {
    locker = new ethers.Contract(contractAddr, abi, signer);
    const timestamp = await locker.getLock();
    lock = new Date(timestamp * 1000);
    owner = await locker.getOwner();
    newLockDate = lock.toISOString().slice(0, -14);
    const deployer = new ethers.Contract(deployerAddr, deployerAbi, signer);
    isKenshiLocker = await deployer.isKenshiLocker(contractAddr);
    lockerVersion = await locker.getVersion();
    tokens = await getLockedTokens();
    loadingTokens = false;
  };

  const copy = (text) => () => {
    navigator.clipboard.writeText(text);
    toast.push("Copied to clipboard");
  };
  const bscScan = (addr) => `https://bscscan.com/address/${addr}#tokentxns`;

  const setNewLockDate = async () => {
    const date = Math.floor(new Date(newLockDate).valueOf() / 1000);
    await locker.lock(ethers.BigNumber.from(date));
    lock = new Date(newLockDate);
  };

  const getAmountWithDecimals = (decimals, amount) => {
    const multiplyBy = ethers.BigNumber.from("1" + "0".repeat(decimals));
    const str = amount.toString();
    const amountDecimals = str.includes(".") ? str.split(".").pop().length : 0;
    const amountBig = ethers.BigNumber.from(str.replace(".", ""));
    const divBy = ethers.BigNumber.from("1" + "0".repeat(amountDecimals));
    return amountBig.mul(multiplyBy).div(divBy);
  };

  const lockTokens = async () => {
    const token = new ethers.Contract(tokenAddr, bep20, signer);
    const decimals = await token.decimals();
    const amountWithDecimals = getAmountWithDecimals(decimals, amount);
    await token.transfer(contractAddr, amountWithDecimals);
  };

  const withdrawTokens = async () => {
    const token = new ethers.Contract(tokenAddr, bep20, signer);
    const decimals = await token.decimals();
    const amountWithDecimals = getAmountWithDecimals(decimals, amount);
    await locker.withdraw(tokenAddr, owner, amountWithDecimals);
  };

  const formatBEP20 = (n) => {
    const [lhs, rhs = ""] = ethers.utils.formatUnits(n).split(".");
    return [lhs, rhs.slice(0, 2)].filter(Boolean).join(".");
  };

  const toPercentage = (lhs, rhs) => {
    return ((100 * parseInt(lhs)) / parseInt(rhs)).toFixed(2);
  };

  onMount(async () => {
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
  <div class="section manager">
    <div class="samurai-illustration" />
    <div class="title has-button">
      <h2>Manage Locker</h2>
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
        <p>Connect with your wallet in order to manage the locker.</p>
        <a href="/locker" class="red">
          Create your own locker <Arrow />
        </a>
      </div>
      <div>
        <p>
          If it's your first time visiting this page, make sure to copy your
          contract address so you can manage it later.
        </p>
        <a
          href="https://docs.kenshi.io/services/locker.html"
          class="red"
          target="_blank"
        >
          Learn more <Arrow />
        </a>
      </div>
      <div>
        <p class="glass copy contract-addr" on:click={copy(contractAddr)}>
          <BinaryLock />
          Address
          <span class="spacer" />
          <span class="trim-address">{contractAddr}</span>
          <Copy />
        </p>
      </div>
    </div>
  </div>
  <div class="section spacer details">
    <div class="guardian-illustration" />
    {#if lock && owner}
      <div class="title">
        <h2>Locker Details</h2>
      </div>
      <div class="locker-infos">
        <div class="locker-info glass">
          <span class="icon">
            {#if isKenshiLocker}
              <ThumbsUp />
            {:else}
              <ThumbsDown />
            {/if}
          </span>
          Validity
          <div class="spacer" />
          {#if isKenshiLocker}
            <span class="green"> Verified Kenshi Locker</span>
          {:else}
            <span class="red"> Not Kenshi Locker!</span>
          {/if}
        </div>
        <div class="locker-info glass">
          <span class="icon"><PullRequest /></span>
          Locker Version
          <span class="spacer" />
          {lockerVersion}
        </div>
        <div class="locker-info glass">
          <span class="icon"><Calendar /></span>
          Unlocks
          <span class="spacer" />
          {lock.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div class="locker-info glass">
          <span class="icon"><Wallet /></span>
          Balance
          <span class="spacer" />
          <a href={bscScan(contractAddr)} target="_blank"> View on BSC Scan</a>
        </div>
        <div class="locker-info glass copy" on:click={copy(owner)}>
          <span class="icon"><UserGear /></span>
          Owner
          <span class="spacer" />
          <span class="owner">{owner}</span>
          <Copy />
        </div>
      </div>
      <div class="title locked">
        <h2>Locked Tokens</h2>
      </div>
      {#if tokens?.length}
        <div class="locked-infos">
          {#each tokens as token}
            <div class="locked-info glass">
              <div class="locked-token">
                <div class="name">{token.display_name} ({token.symbol})</div>
                <div class="amount">
                  {formatBEP20(token.balance)}
                  locked -
                  {toPercentage(token.balance, token.total_supply)}% of total
                </div>
              </div>
              <a
                class="external"
                href="https://bscscan.com/token/{token.token_address}"
              >
                <External />
              </a>
            </div>
          {/each}
        </div>
      {:else if loadingTokens}
        <div class="loading">
          <Jumper
            size="42"
            color="var(--primary-color)"
            unit="px"
            duration="1s"
          />
          Loading locked tokens...
        </div>
      {:else}
        No tokens found.
      {/if}

      {#if owner === userAddress}
        <div class="admin">
          <h2>Admin</h2>
          <h3>Change Lock Date</h3>
          <div class="change-date">
            <div class="glass input">
              <span class="icon"><Calendar /></span>
              <label for="#lock-date"> Date </label>
              <div class="spacer" />
              <input id="lock-date" type="date" bind:value={newLockDate} />
            </div>
            <div>
              <button on:click={setNewLockDate}> Change </button>
            </div>
          </div>
          <h3>Lock / Withdraw</h3>
          <div class="tips">
            Tip: to lock any tokens, just send them to the locker contract
            address.
          </div>
          <div class="lock-or-withdraw">
            <div class="glass input">
              <span class="icon"><Coins /></span>
              <label for="#token-addr"> {tokenName} </label>
              <div class="spacer" />
              <input
                id="token-addr"
                bind:value={tokenAddr}
                placeholder="Token address"
              />
            </div>
            <div class="glass input">
              <span class="icon"><Circulation /></span>
              <label for="#token-amount"> Amount </label>
              <div class="spacer" />
              <input id="token-amount" type="number" bind:value={amount} />
            </div>
          </div>
          <div class="buttons">
            <button on:click={lockTokens}> Send to locker </button>
            <div class="spacer" />
            — Or —
            <div class="spacer" />
            <button on:click={withdrawTokens}> Withdraw </button>
          </div>
        </div>
      {/if}
    {/if}
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
  .loading {
    display: flex;
    gap: 1em;
    align-items: center;
  }
  .contract-addr {
    gap: 0.5em;
  }
  .trim-address {
    max-width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: keep-all;
  }
  .glass {
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 40px 4px rgb(0 0 0 / 10%);
    border-radius: 3em;
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
  }
  .glass :global(svg) {
    height: 1em;
  }
  .copy {
    cursor: copy;
  }
  .locker-description {
    display: grid;
    gap: 2em;
    grid-template-columns: 1fr 1fr 1fr;
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
  .external {
    margin-left: 1em;
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
  .section.details {
    position: relative;
    flex: 1;
  }
  .locker-infos {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 2em;
  }
  .title.locked {
    margin-top: 4em;
  }
  .locked-infos {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2em;
    max-width: 720px;
  }
  .locked-token {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    flex: 1;
  }
  .locked-token .amount {
    text-align: right;
  }
  .lock-or-withdraw .icon,
  .change-date .icon,
  .locker-info .icon {
    margin-left: -0.75em;
    margin-right: 0.5em;
    display: inline-flex;
    align-items: center;
  }
  .owner {
    max-width: 60%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .admin {
    margin-top: 4em;
  }
  .admin h3 {
    font-size: 1.7em;
  }
  .admin h3:not(:first-of-type) {
    margin-top: 2em;
  }
  .admin button {
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
  .admin button:not(:disabled):hover {
    background: var(--primary-color);
  }
  .lock-or-withdraw,
  .change-date {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    gap: 2em;
    align-items: center;
  }
  input {
    background: transparent;
    border: none;
    font-size: 1em;
    border-radius: 23px;
    padding: 0.5em 1em;
    box-shadow: 0px 0px 16px 4px rgb(0 0 0 / 10%);
    outline: none;
    margin-right: -0.75em;
    width: 140px;
  }
  .glass.input {
    padding: 0.5em 2em;
    padding-right: 1.25em;
  }
  .tips {
    margin-bottom: 2em;
  }
  .buttons {
    display: flex;
    align-items: center;
    margin-top: 2em;
    width: calc(25% - 1em);
  }
  @media (max-width: 1800px) {
  }
  @media (max-width: 1500px) {
    .page {
      padding: 0;
    }
  }
  @media (max-width: 1350px) {
    .locker-infos {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (max-width: 1200px) {
    .samurai-illustration {
      top: 200px;
    }
    .locker-description {
      grid-template-columns: 1fr 1fr;
    }
    .guardian-illustration {
      filter: grayscale(1) opacity(0.1);
    }
    .change-date,
    .lock-or-withdraw {
      grid-template-columns: 1fr 1fr;
    }
    .buttons {
      width: calc(50% - 1em);
    }
  }
  @media (max-width: 960px) {
    .locker-description {
      grid-template-columns: 1fr;
    }
    .locker-infos {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 860px) {
    .samurai-illustration {
      background-size: contain;
      background-repeat: no-repeat;
      width: 600px;
      max-width: 90%;
    }
    .navbar .links:first-of-type a:not(:first-of-type) {
      display: none;
    }
    .section h2 {
      margin-left: 0em;
    }
    .locker-infos {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 720px) {
    .change-date,
    .lock-or-withdraw {
      grid-template-columns: 1fr;
    }
    .buttons {
      width: 100%;
    }
    .locked-info {
      border-radius: 1.5em;
      padding: 1em;
    }
    .locked-token {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1em;
      flex: 1;
    }
    .locked-token .amount {
      text-align: left;
    }
  }
  @media (max-width: 600px) {
    .trim-address {
      max-width: 140px;
    }
    .navbar {
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 1em;
    }
    .locker-description .copy {
      word-break: break-all;
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
      margin-bottom: 1em !important;
      font-size: 2em !important;
    }
    .guardian-illustration {
      width: 90%;
      background-size: contain;
      background-position: 0 60px;
      background-repeat: no-repeat;
    }
  }
</style>
