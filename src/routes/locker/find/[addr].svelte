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
  import Coin from "src/icons/Coin.svelte";
  import Identify from "src/icons/Identify.svelte";

  import { Jumper, Moon } from "svelte-loading-spinners";
  import { ethers } from "ethers";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  import bep20 from "src/lib/abi/bep20";
  import cakeAbi from "src/lib/abi/cake";
  import { wallet } from "src/stores/wallet";
  import { toast } from "@zerodevx/svelte-toast";

  const tokenAddr = $page.params.addr;

  let lockers = [];
  let tokens = [];
  let searching = true;

  let totalSupply;
  let name;
  let symbol;

  const provider = new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed.binance.org/"
  );

  const token = new ethers.Contract(tokenAddr, bep20, provider);

  const copy = (text) => () => {
    navigator.clipboard.writeText(text);
    toast.push("Copied to clipboard");
  };

  const bscScan = (addr) => `https://bscscan.com/token/${addr}`;

  const formatBEP20 = (n) => {
    const [lhs, rhs = ""] = ethers.utils.formatUnits(n).split(".");
    return [lhs, rhs.slice(0, 2)].filter(Boolean).join(".");
  };

  const toPercentage = (lhs, rhs) => {
    return ((100 * parseInt(lhs)) / parseInt(rhs)).toFixed(2);
  };

  const getDisplayName = async (symbol, token) => {
    if (symbol === "Cake-LP") {
      const cake = new ethers.Contract(token.address, cakeAbi, provider);
      const token0Addr = await cake.token0();
      const token1Addr = await cake.token1();
      const token0 = new ethers.Contract(token0Addr, bep20, provider);
      const token1 = new ethers.Contract(token1Addr, bep20, provider);
      const name0 = await token0.name();
      const name1 = await token1.name();
      return `${name0} / ${name1} LP`;
    }
    return await token.name();
  };

  const getLockers = async () => {
    const req = await fetch(`${window.location.origin}/api/lockers`);
    const res = await req.json();
    for (const address of res) {
      const balance = await token.balanceOf(address).catch(() => {});
      if (balance && balance.gt(0)) {
        lockers = [...lockers, { address, balance }];
      }
    }
    searching = false;
  };

  onMount(async () => {
    totalSupply = await token.totalSupply();
    symbol = await token.symbol();
    name = await getDisplayName(symbol, token);
    await getLockers();
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
  <div class="section">
    <div class="samurai-illustration" />
    <div class="title has-button">
      <h2>Find Lockers</h2>
    </div>
    <div>Finding lockers for the following token:</div>
    <div class="token-description">
      {#if !name || !symbol}
        <div class="loading">
          <Moon size="20" color="var(--primary-color)" /> Loading token info...
        </div>
      {:else}
        <div>
          <a href={bscScan(tokenAddr)} target="_blank">
            <div class="token-info glass">
              <span class="icon"><Coin /></span>
              Address
              <span class="spacer" />
              <span class="trim-address">{tokenAddr}</span>
              <External />
            </div>
          </a>
        </div>
        <div>
          <div class="token-info glass">
            <span class="icon"><Identify /></span>
            Token
            <span class="spacer" />
            <div class="trim-text">{name} ({symbol})</div>
          </div>
        </div>
      {/if}
    </div>
  </div>
  <div class="section spacer">
    <div class="guardian-illustration" />
    <div class="title">
      <h2>
        {#if searching}
          Looking for lockers
        {:else if lockers.length}
          Found lockers
        {:else}
          Could not find any lockers
        {/if}
      </h2>
    </div>
    <div class="results">
      {#if searching}
        <div class="loading">
          <Jumper size="48" color="var(--primary-color)" />
          Scanning the blockchain for Kenshi lockers...
        </div>
      {:else if !lockers.length}
        Couldn't find any lockers for {name}
      {/if}
      <div class="lockers">
        {#each lockers as locker}
          <a href="/locker/manage/{locker.address}">
            <div class="glass locker">
              <BinaryLock />
              <div class="trim-address">{locker.address}</div>
              <div class="spacer" />
              {formatBEP20(locker.balance)}
              {symbol}
              - {toPercentage(locker.balance, totalSupply)}%
            </div>
          </a>
        {/each}
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
  .loading {
    display: flex;
    gap: 1em;
    align-items: center;
  }
  .trim-address {
    max-width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: keep-all;
  }
  .trim-text {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: keep-all;
    white-space: nowrap;
  }
  .lockers {
    max-width: 960px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2em;
    margin-top: 1em;
  }
  .lockers .locker {
    display: flex;
    gap: 1em;
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
  .token-description {
    display: grid;
    gap: 2em;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 2em;
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
  .section.spacer {
    position: relative;
  }
  .token-info .icon {
    margin-left: -0.75em;
    margin-right: 0.5em;
    display: inline-flex;
    align-items: center;
  }
  @media (max-width: 1800px) {
  }
  @media (max-width: 1500px) {
    .page {
      padding: 0;
    }
  }
  @media (max-width: 1200px) {
    .samurai-illustration {
      top: 200px;
    }
    .token-description {
      grid-template-columns: 1fr 1fr;
    }
    .guardian-illustration {
      filter: grayscale(1) opacity(0.1);
    }
  }
  @media (max-width: 960px) {
    .token-description {
      grid-template-columns: 1fr;
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
  }
  @media (max-width: 720px) {
    .locker {
      flex-wrap: wrap;
    }
  }
  @media (max-width: 600px) {
    .trim-address {
      max-width: 140px;
    }
    .locker {
      text-align: center;
      justify-content: center;
      border-radius: 1.25em;
    }
    .locker .trim-address {
      max-width: 60vw;
    }
    .locker .spacer {
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
