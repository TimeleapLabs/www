<script>
  import Medium from "../icons/Medium.svelte";
  import Discord from "../icons/Discord.svelte";
  import Telegram from "../icons/Telegram.svelte";
  import Twitter from "../icons/Twitter.svelte";
  import Github from "../icons/Github.svelte";
  import Reddit from "../icons/Reddit.svelte";
  import LinkedIn from "../icons/LinkedIn.svelte";
  import Heart from "../icons/Heart.svelte";

  import Link from "./Link.svelte";
</script>

<div class="section footer">
  <div class="top">
    <div class="logo" />
    <div class="social">
      <a href="https://t.me/KenshiTech" target="_blank"> <Telegram /> </a>
      <a href="https://discord.gg/KenshiTech" target="_blank"> <Discord /> </a>
      <a href="https://twitter.com/KenshiTech" target="_blank">
        <Twitter />
      </a>
      <a href="https://blog.kenshi.io" target="_blank"> <Medium /> </a>
      <a href="https://www.reddit.com/r/KenshiTech/" target="_blank">
        <Reddit />
      </a>
      <a href="https://github.com/KenshiTech" target="_blank"> <Github /> </a>
      <a href="https://www.linkedin.com/company/kenshiio/" target="_blank">
        <LinkedIn />
      </a>
    </div>
  </div>
  <div class="middle">
    <div class="list">
      <h3>Developers</h3>
      <Link href="/docs">Documentation</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/status">Service Status</Link>
      <Link href="https://t.me/KenshiTechDevelopers" target="_blank">
        Developers chat
      </Link>
      <Link href="/docs/services/vrf">Getting randomness</Link>
      <Link href="/docs/services/deep-index/graphql">Deep Index: GraphQL</Link>
      <Link href="/docs/services/deep-index/mql">Deep Index: MQL</Link>
      <Link href="/docs/services/deep-index/webhook">
        Deep Index: Reverse-API
      </Link>
    </div>
    <div class="list">
      <h3>Products</h3>
      <Link href="/docs/services/vrf">VRF</Link>
      <Link href="/docs/services/deep-index">Deep Index</Link>
      <Link href="/docs/services/locker">Lockers</Link>
    </div>
    <div class="list">
      <h3>Token</h3>
      <Link href="/swap">Buy Kenshi</Link>
      <Link
        href="https://pancakeswap.finance/swap?outputCurrency=0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f"
        target="_blank"
      >
        Buy on PancakeSwap
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
      <Link href="/docs/kenshi">About</Link>
      <Link href="/docs/team">Team</Link>
      <Link href="https://blog.kenshi.io">Blog</Link>
      <Link href="https://www.linkedin.com/company/kenshiio/" target="_blank">
        LinkedIn
      </Link>
      <Link href="/docs/media">Press Kit</Link>
    </div>
  </div>
  <div class="bottom">
    <div class="left">
      <div class="swiss-made">Made with <Heart /> in Switzerland</div>
      <div class="copyright">
        Copyright © {new Date().getFullYear()} - Kenshi
      </div>
    </div>
    <a
      href="https://members.cryptovalley.swiss/companies/2280577"
      target="_blank"
    >
      <img
        class="cva"
        src="/images/cva_logo_member.svg"
        alt="Swiss Crypto Valley member"
      />
    </a>
  </div>
</div>

<style>
  .cva {
    width: 200px;
  }
  .social :global(svg) {
    height: 1.5em;
  }
  .swiss-made :global(svg) {
    height: 1em;
    width: 1em;
    fill: var(--primary-color);
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
      flex-direction: column-reverse;
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
  .left {
    flex: 1;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
