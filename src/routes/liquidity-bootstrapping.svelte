<script>
  import Medium from "src/icons/Medium.svelte";
  import Telegram from "src/icons/Telegram.svelte";
  import Twitter from "src/icons/Twitter.svelte";
  import Github from "src/icons/Github.svelte";
  import Reddit from "src/icons/Reddit.svelte";
  import BookDuo from "src/icons/BookDuo.svelte";
  import Rocket from "src/icons/Rocket.svelte";
  import Scale from "src/icons/Scale.svelte";
  import Bank from "src/icons/Bank.svelte";
  import HandShake from "src/icons/HandShake.svelte";

  import ContactForm from "src/components/ContactForm.svelte";
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
    <div class="kenshi-illustration" />
    <div class="robot">
      <img
        src="/images/lbpbot.png"
        alt="Kenshi Liquidity Bootstrapping Oracle"
      />
      <div class="content">
        <h2>Liquidity Bootstrapping Oracle</h2>
        <p>
          The Kenshi Liquidity Bootstrapping Oracle is a bot engineered to
          balance one side of a liquidity pool in favor of the other. This tool
          can be used in situations where a project lacks the required liquidity
          for an acceptable initial DEX offering or launching with a low initial
          price is not desired.
        </p>
      </div>
    </div>
  </div>
  <div class="section">
    <div class="features">
      <div class="feature">
        <div class="title">
          <span class="icon"><Rocket /></span>
          <h3>Launch Big!</h3>
        </div>
        <div class="content">
          Don't worry about the liquidity, focus on your project. Our liquidity
          bootstrapping bot takes care of your liquidity, making it grow little
          by little on each transaction.
        </div>
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><Scale /></span>
          <h3>Configurable</h3>
        </div>
        <div class="content">
          We'll help you configure and fine tune the AMM and LBP formulas for
          your liquidity. Balance the pool in a way that makes the most sense to
          your project.
        </div>
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><Bank /></span>
          <h3>Fully Compatible</h3>
        </div>
        <div class="content">
          Fully compatible with most DEX platforms out there. Supports
          SushiSwap, PancakeSwap, UniSwap and others out of the box with minimal
          coding requirements.
        </div>
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><HandShake /></span>
          <h3>On Your Side</h3>
        </div>
        <div class="content">
          Kenshi will be on your side if you need any help integrating the
          oracle into your smart contracts. If needed, we will develop the
          functions for you.
        </div>
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><BookDuo /></span>
          <h3>Well Documented</h3>
        </div>
        <div class="content">
          Read more about this oracle on our documentation page
          <a href="https://docs.kenshi.io/services/lbp.html">here</a>. Don't
          hesitate to contact us via email or on social media if you have any
          questions.
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div class="samurai-illustration" />
    <div class="title">
      <h2>Interested in this service?</h2>
    </div>
    <div class="interested">
      Fill out the contact form below to get a quote for your project. We will
      contact you back as soon as possible!
    </div>
  </div>
  <div class="section contact">
    <div class="guardian-illustration" />
    <div class="title">
      <h2>Contact Us</h2>
    </div>
    <div class="contact-us">
      <ContactForm topic="lbp" subject="LBP Quotation" />
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
  .features {
    display: grid;
    gap: 2em;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .features .feature .title {
    font-size: 1.4em;
    display: flex;
    align-items: center;
  }
  .features .feature .icon {
    height: 2em;
    width: 2em;
  }
  .features .feature .content {
    font-size: 1.2em;
    font-weight: lighter;
    margin-top: 1.2em;
    line-height: 1.5em;
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
    filter: grayscale(1) contrast(1.25) opacity(0.05);
  }
  .interested {
    font-size: 1.2em;
    line-height: 1.2em;
    font-weight: lighter;
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
  .robot {
    display: grid;
    grid-template-columns: 0.25fr 1fr;
    gap: 6em;
    align-items: center;
  }
  .robot img {
    max-width: 100%;
  }
  .robot h2 {
    margin-top: 0;
  }
  .robot .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    max-width: 720px;
    box-sizing: border-box;
  }
  .robot .content p {
    font-size: 1.2em;
    font-weight: lighter;
    line-height: 1.5em;
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
  }
  .links.spaced {
    gap: 2em;
  }
  .title {
    display: flex;
    align-items: baseline;
    gap: 1em;
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
  .section.contact {
    position: relative;
    flex: 1;
  }
  .contact-us {
    width: 50%;
  }
  @media (max-width: 1800px) {
  }
  @media (max-width: 1500px) {
    .page {
      padding: 0;
    }
  }
  @media (max-width: 1350px) {
  }
  @media (max-width: 1200px) {
    .robot {
      grid-template-columns: 0.4fr 1fr;
    }
    .features {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 960px) {
    .robot {
      grid-template-columns: 0.6fr 1fr;
    }
    .kenshi-illustration {
      display: none;
    }
  }
  @media (max-width: 860px) {
    .navbar .links:first-of-type a:not(:first-of-type) {
      display: none;
    }
    .guardian-illustration {
      filter: grayscale(1) opacity(0.1);
    }
    .contact-us {
      width: 100%;
    }
  }
  @media (max-width: 760px) {
    .robot {
      grid-template-columns: 1fr;
    }
    .robot img {
      max-width: 80%;
      justify-self: center;
    }
    .features {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 600px) {
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
    h2 {
      margin-bottom: 0.5em !important;
    }
  }
</style>
