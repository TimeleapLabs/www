<script>
  import Medium from "../icons/Medium.svelte";
  import Discord from "../icons/Discord.svelte";
  import Telegram from "../icons/Telegram.svelte";
  import Twitter from "../icons/Twitter.svelte";
  import Github from "../icons/Github.svelte";
  import Reddit from "../icons/Reddit.svelte";
  import LinkedIn from "../icons/LinkedIn.svelte";

  import Heart from "src/emoji/Heart.svelte";

  import Link from "./Link.svelte";
</script>

<div class="section footer">
  <div class="top">
    <div class="logo" />
    <div class="social">
      <a href="https://t.me/kenshi_token" target="_blank"> <Telegram /> </a>
      <a href="https://discord.gg/YNXMYF6d" target="_blank"> <Discord /> </a>
      <a href="https://twitter.com/kenshi_token" target="_blank">
        <Twitter />
      </a>
      <a href="https://blog.kenshi.io" target="_blank"> <Medium /> </a>
      <a href="https://www.reddit.com/r/kenshi_token/" target="_blank">
        <Reddit />
      </a>
      <a href="https://github.com/kenshi-token" target="_blank"> <Github /> </a>
      <a href="https://www.linkedin.com/company/kenshiio/" target="_blank">
        <LinkedIn />
      </a>
    </div>
  </div>
  <div class="middle">
    <div class="list">
      <h3>Developers</h3>
      <Link href="https://docs.kenshi.io">Documentation</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/status">Service Status</Link>
      <Link href="https://t.me/kenshi_developers" target="_blank">
        Developers chat
      </Link>
      <Link href="https://docs.kenshi.io/services/vrf/index.html">
        Getting randomness
      </Link>
      <Link
        href="https://docs.kenshi.io/services/deep-index/graphql/index.html"
      >
        Deep Index: GraphQL
      </Link>
      <Link
        href="https://docs.kenshi.io/services/deep-index/webhook/index.html"
      >
        Deep Index: Reverse-API
      </Link>
    </div>
    <div class="list">
      <h3>Products</h3>
      <Link href="https://docs.kenshi.io/services/vrf/index.html">VRF</Link>
      <Link href="https://docs.kenshi.io/services/deep-index/index.html">
        Deep Index
      </Link>
      <Link href="https://docs.kenshi.io/services/locker.html">Lockers</Link>
      <Link href="https://docs.kenshi.io/services/lbp.html">
        Liquidity Bootstrapping
      </Link>
    </div>
    <div class="list">
      <h3>Token</h3>
      <Link
        href="https://pancakeswap.finance/swap?outputCurrency=0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f"
        target="_blank"
      >
        Buy Kenshi
      </Link>
      <Link
        href="https://charts.bogged.finance/?c=bsc&t=0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f"
        target="_blank"
      >
        View charts
      </Link>
      <Link href="/tools">Tools</Link>
      <Link href="/pegswap">PegSwap</Link>
      <Link href="/faucet">Faucet</Link>
    </div>
    <div class="list">
      <h3>Contact</h3>
      <Link href="mailto:experts@kenshi.io">Talk to an expert</Link>
      <Link href="mailto:inquiries@kenshi.io">Business inquiries</Link>
      <Link href="mailto:security@kenshi.io">Security</Link>
      <Link href="mailto:support@kenshi.io">Support</Link>
      <Link href="mailto:press@kenshi.io">Press inquiries</Link>
    </div>
    <div class="list">
      <h3>Company</h3>
      <Link href="https://docs.kenshi.io/kenshi.html">About</Link>
      <Link href="https://docs.kenshi.io/team.html">Team</Link>
      <Link href="https://blog.kenshi.io">Blog</Link>
      <Link href="https://www.linkedin.com/company/kenshiio/" target="_blank">
        LinkedIn
      </Link>
      <Link href="https://docs.kenshi.io/media.html">Press Kit</Link>
    </div>
  </div>
  <div class="bottom">
    <div class="copyright">
      Copyright © {new Date().getFullYear()} - Kenshi
    </div>
    <div class="swiss-made">Made with <Heart /> in Switzerland</div>
  </div>
</div>

<style>
  .social :global(svg) {
    height: 1.5em;
  }
  .swiss-made :global(svg) {
    height: 1em;
  }
  .swiss-made {
    display: flex;
    align-items: center;
    gap: 0.5em;
    flex-wrap: wrap;
  }
  .social {
    display: flex;
    gap: 1em;
    align-items: center;
    justify-content: flex-end;
    padding: 0 8em;
    box-sizing: border-box;
  }
  @media only screen and (max-width: 640px) {
    .social {
      padding: 0em 1em;
      justify-content: center;
    }
  }
  .footer {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  .top {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  .middle {
    display: grid;
    padding: 2em;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  @media only screen and (max-width: 640px) {
    .middle {
      padding: 0em;
    }
  }
  .logo {
    background: url("/images/kenshi.logo.long.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-origin: content-box;
    padding: 2em 4em;
    box-sizing: border-box;
    max-width: 520px;
    height: 128px;
  }
  @media only screen and (max-width: 640px) {
    .logo {
      background-position: center;
    }
  }
  .list {
    padding: 1em 2em;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .bottom {
    display: flex;
    padding: 2em 4em;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    flex-wrap: wrap;
    gap: 2em;
  }
  @media only screen and (max-width: 640px) {
    .bottom {
      padding: 1em;
      gap: 1em;
    }
  }
  a {
    color: #000;
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
  }
  .social a:hover {
    color: var(--primary-color);
  }
  .social a:hover :global(svg) {
    fill: var(--primary-color);
  }
  h3 {
    font-size: 1.4em;
  }
  .copyright {
    flex: 1;
    white-space: nowrap;
  }
  @media only screen and (max-width: 1440px) {
    .footer .middle {
      font-size: 0.9em;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }
  }
  @media only screen and (max-width: 600px) {
    .list:last-of-type {
      padding-bottom: 2em;
    }
  }
</style>
