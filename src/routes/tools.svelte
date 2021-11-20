<script>
  import Medium from "../icons/Medium.svelte";
  import Telegram from "../icons/Telegram.svelte";
  import Twitter from "../icons/Twitter.svelte";
  import Github from "../icons/Github.svelte";
  import Reddit from "../icons/Reddit.svelte";
  import Wallet from "../icons/Wallet.svelte";
  import Dollar from "../icons/Dollar.svelte";
  import Balance from "../icons/Balance.svelte";
  import CreditCard from "../icons/CreditCard.svelte";
  import Sack from "../icons/Sack.svelte";
  import Coins from "../icons/Coins.svelte";
  import Calendar from "../icons/Calendar.svelte";
  import At from "../icons/At.svelte";
  import Arrow from "../icons/Arrow.svelte";
  import Volume from "../icons/Volume.svelte";
  import Reflect from "../icons/ReflectDuo.svelte";
  import BinanceChainWallet from "../icons/BinanceChainWallet.svelte";
  import MetaMask from "../icons/MetaMask.svelte";

  import { ethers } from "ethers";
  import { onMount } from "svelte";
  import abi from "../lib/abi.js";

  const formatCurrency = (n) =>
    ethers.utils.formatUnits(n).replace(/(?=\.\d{2})\d+/, "");

  let sellingDate = new Date().toISOString().slice(0, -14);
  let sellingAmount = 100;
  let sellingTax = 5;
  let sellingTaxCalculated = 5;

  let balance = ethers.BigNumber.from(0);
  let maxBalance = ethers.BigNumber.from(0);

  let kenshi;
  let signer;
  let userAddress;

  $: if (kenshi && userAddress && sellingDate && sellingAmount) {
    const timestamp = Math.floor(new Date(sellingDate).valueOf() / 1000);
    kenshi.getTaxPercentageAt(userAddress, timestamp).then((tax) => {
      sellingTax = tax;
    });
  }

  $: sellingTaxCalculated = sellingAmount - (sellingAmount * sellingTax) / 100;

  // TESTNET CONTRACT ADDRESS
  const contractAddr = "0x07FB314dB4044D14834b529b95Ab289104f2827a";

  const getMaxBuy = (maxBalance, balance) => {
    if (maxBalance.lte(balance)) {
      return ethers.BigNumber.from(0);
    }
    return maxBalance.sub(balance);
  };

  let binanceChainWallet;
  let metaMask;
  let hasWallets;

  $: hasWallets = metaMask || binanceChainWallet;

  const connectWallet = async (wallet) => {
    const provider = new ethers.providers.Web3Provider(wallet);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    updateValues();
  };

  const updateValues = async () => {
    if (signer && userAddress) {
      kenshi = new ethers.Contract(contractAddr, abi, signer);
      balance = await kenshi.balanceOf(userAddress);
      maxBalance = await kenshi.getMaxBalance();
    }
  };

  const walletInterval = setInterval(updateValues, 5000);

  onMount(async () => {
    metaMask = window.ethereum;
    binanceChainWallet = window.BinanceChain;
    return () => {
      clearInterval(walletInterval);
    };
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
        <a href="/#tokenomics">Tokenomics</a>
        <a href="https://docs.kenshi.io">Whitepaper</a>
        <a href="/#roadmap">Roadmap</a>
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
  <div class="section">
    <div class="title">
      <h2>Stats</h2>
      {#if userAddress}
        <div class="user">
          <span class="icon"><At /></span>
          <span class="red"> 0x </span>
          <span class="green">
            {userAddress.slice(2, 6)}...{userAddress.slice(-4)}
          </span>
        </div>
      {:else if hasWallets}
        <div class="connect">
          Connect with
          {#if binanceChainWallet}
            <button on:click={() => connectWallet(binanceChainWallet)}>
              <BinanceChainWallet />
            </button>
          {/if}
          {#if metaMask}
            <button on:click={() => connectWallet(metaMask)}>
              <MetaMask />
            </button>
          {/if}
        </div>
      {/if}
    </div>
    <div class="stats">
      <div class="stat">
        <span class="icon"><Wallet /></span>
        <span> Balance </span>
        <span class="spacer" />
        <span>
          <span class="green">₭</span>
          {formatCurrency(balance)}
        </span>
      </div>
      <div class="stat">
        <span class="icon"><Dollar /></span>
        <span> Wallet Worth </span>
        <span class="spacer" />
        <span>
          <span class="green">$</span>
          123
        </span>
      </div>
      <div class="stat">
        <span class="icon"><Balance /></span>
        <span> Max Balance </span>
        <span class="spacer" />
        <span>
          <span class="green">₭</span>
          {formatCurrency(maxBalance)}
        </span>
      </div>
      <div class="stat">
        <span class="icon"><CreditCard /></span>
        <span> Max Buy </span>
        <span class="spacer" />
        <span>
          <span class="green">₭</span>
          {formatCurrency(getMaxBuy(maxBalance, balance))}
        </span>
      </div>
    </div>
    <div class="kenshi-illustration" />
  </div>
  <div class="section calculators">
    <div class="calculator">
      <h2>Sales Tax Calculator</h2>
      <div class="taxes">
        <div class="red-devil">
          <img src="/images/features.png" alt="Red Devil" />
        </div>
        <div class="tax">
          <span class="icon"><Calendar /></span>
          <label for="#selling-date"> Date </label>
          <div class="spacer" />
          <input id="selling-date" type="date" bind:value={sellingDate} />
        </div>
        <div class="tax">
          <span class="icon"><Coins /></span>
          <label for="#selling-date"> Amount </label>
          <div class="spacer" />
          <input id="selling-amount" type="number" bind:value={sellingAmount} />
        </div>
        <div class="tax">
          <span class="icon"><Sack /></span>
          <label for="#selling-date"> Calculated Tax </label>
          <div class="spacer" />
          <span class="tax-amount">
            {sellingTax}%
            <span class="icon"><Arrow /></span>
            <span class="green">₭</span>
            {sellingTaxCalculated}
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="section calculators wider">
    <div class="guardian-illustration" />
    <div class="samurai-illustration" />
    <div class="calculator">
      <h2>Reflection Calculator</h2>
      <div class="reflections">
        <div class="reflection">
          <span class="icon"><Coins /></span>
          <label for="#selling-date"> Holding </label>
          <div class="spacer" />
          <input id="selling-amount" type="number" bind:value={sellingAmount} />
        </div>
        <div class="reflection">
          <span class="icon"><Calendar /></span>
          <label for="#selling-date"> To Date </label>
          <div class="spacer" />
          <input id="selling-date" type="date" bind:value={sellingDate} />
        </div>
        <div class="reflection">
          <span class="icon"><Volume /></span>
          <label for="#selling-date"> Daily Volume </label>
          <div class="spacer" />
          <input id="selling-amount" type="number" bind:value={sellingAmount} />
        </div>
        <div class="reflection">
          <span class="icon"><Sack /></span>
          <label for="#selling-date"> Average Tax </label>
          <div class="spacer" />
          <input id="selling-amount" type="number" bind:value={sellingAmount} />
        </div>
        <div class="reflection">
          <span class="icon"><Reflect /></span>
          <label for="#selling-date"> Reflections </label>
          <div class="spacer" />
          <span class="tax-amount">
            ≈
            <span class="green">₭</span>
            {sellingTaxCalculated}
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="spacer" />
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
  .kenshi-illustration {
    background: url(/images/kenshi.png);
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    height: 100vh;
    width: 600px;
    right: 5%;
    top: 5%;
    z-index: -1;
    filter: grayscale(1) contrast(1.25) opacity(0.1);
  }
  .stats {
    display: grid;
    gap: 2em;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .taxes {
    display: grid;
    gap: 2em;
    grid-template-columns: 0.5fr 1fr;
  }
  .reflections {
    display: grid;
    gap: 2em;
    grid-template-columns: 1fr 1fr;
    flex: 1;
  }
  .red-devil {
    grid-row: 1 / span 3;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .red-devil img {
    max-width: 100%;
  }
  .stat,
  .reflection,
  .tax {
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
  .reflection .icon,
  .tax .icon,
  .stat .icon {
    height: 2em;
    width: 2em;
    color: var(--primary-color);
    margin-right: 1em;
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
  .section.calculators {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
    position: relative;
  }
  .section.calculators.wider {
    grid-template-columns: 1fr 0.5fr;
  }
  .calculator {
    display: flex;
    flex-direction: column;
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
  input {
    background: transparent;
    border: none;
    font-size: 1em;
    border-radius: 23px;
    padding: 0.5em 1em;
    box-shadow: 0px 0px 16px 4px rgb(0 0 0 / 10%);
    outline: none;
    margin-right: -0.75em;
    width: 132px;
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
    align-items: baseline;
    gap: 1em;
  }
  .user {
    display: flex;
    align-items: center;
    gap: 0.25em;
  }
  .connect {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }
  .tax-amount .icon,
  .user .icon {
    height: 1em;
    width: 1em;
  }
  .tax-amount .icon :global(svg) {
    height: 1em;
    display: flex;
    align-items: center;
  }
  .tax-amount .icon {
    margin-right: 0;
  }
  .tax-amount {
    display: flex;
    gap: 0.5em;
    align-items: center;
  }
  .connect button {
    padding: 0;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
  }
  .connect button :global(svg) {
    height: 1.2em;
    width: auto;
  }
  .samurai-illustration {
    background: url(/images/samurai.png);
    background-size: cover;
    position: absolute;
    height: 1200px;
    width: 800px;
    left: -300px;
    top: -400px;
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
  @media (max-width: 1800px) {
    .stats {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (max-width: 1500px) {
    .page {
      padding: 0;
    }
  }
  @media (max-width: 1350px) {
    .stats {
      grid-template-columns: 1fr 1fr;
    }
    .taxes {
      align-items: center;
    }
  }
  @media (max-width: 1200px) {
    .kenshi-illustration {
      width: 50%;
      height: 100%;
      top: 10%;
    }
  }
  @media (max-width: 960px) {
    .stats {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 860px) {
    .navbar .links:first-of-type a:not(:first-of-type) {
      display: none;
    }
    .taxes {
      display: flex;
      flex-direction: column;
    }
    .taxes .tax {
      width: 80%;
    }
    .taxes .red-devil {
      max-width: 60%;
    }
    .stats {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 600px) {
    .kenshi-illustration {
      display: none;
    }
    .navbar {
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 1em;
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
      padding: 1em;
    }
    .taxes .tax {
      width: 100%;
    }
    .taxes .red-devil {
      max-width: 80%;
    }
    h2 {
      margin-bottom: 0.5em !important;
    }
    .section h2 {
      margin-left: 0.5em;
    }
  }
</style>
