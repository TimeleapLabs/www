<script>
  import Medium from "../icons/Medium.svelte";
  import Telegram from "../icons/Telegram.svelte";
  import Twitter from "../icons/Twitter.svelte";
  import Github from "../icons/Github.svelte";
  import Reddit from "../icons/Reddit.svelte";
  import LinkedIn from "../icons/LinkedIn.svelte";
  import Whale from "../icons/Whale.svelte";
  import Fire from "../icons/Fire.svelte";
  import Reflect from "../icons/Reflect.svelte";
  import Supply from "../icons/Supply.svelte";
  import Reward from "../icons/Reward.svelte";
  import Rewards from "../icons/Rewards.svelte";
  import Chart from "../icons/Chart.svelte";
  import Lock from "../icons/Lock.svelte";
  import Hold from "../icons/Hold.svelte";
  import Droplet from "../icons/Droplet.svelte";
  import Cut from "../icons/Cut.svelte";
  import Flame from "../icons/Flame.svelte";
  import Time from "../icons/Time.svelte";
  import Dollar from "../icons/Dollar.svelte";
  import Gauge from "../icons/Gauge.svelte";
  import Pending from "../icons/Pending.svelte";
  import Done from "../icons/Done.svelte";
  import Arrow from "../icons/Arrow.svelte";
  import Book from "../icons/Book.svelte";
  import Network from "../icons/Network.svelte";
  import Tools from "../icons/Tools.svelte";

  import { scrollto } from "svelte-scrollto";
  import { onMount } from "svelte";

  const launch = new Date("2021-12-12").valueOf();
  const days = Math.round((launch - new Date().valueOf()) / 86400000);

  onMount(() => {
    const { hash } = window.location;
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  });
</script>

<div class="page">
  <div class="head">
    <div class="hero">
      <div class="main">
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
            <a use:scrollto={"#tokenomics"} href="#tokenomics">Tokenomics</a>
            <a href="https://docs.kenshi.io">Whitepaper</a>
            <a use:scrollto={"#roadmap"} href="#roadmap">Roadmap</a>
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
        <div class="intro">
          <h1>Kenshi</h1>
          is an investment token.
        </div>
        <div class="highlights">
          <div class="highlight">
            <span class="icon">
              <Reflect />
            </span>
            <span> Reflections </span>
          </div>
          <div class="highlight">
            <span class="icon">
              <Fire />
            </span>
            <span> Per Transaction Burns </span>
          </div>
          <div class="highlight">
            <span class="icon">
              <Whale />
            </span>
            <span> Whale-proof </span>
          </div>
        </div>
        <div class="investment-token">
          <h2>What is an investment token?</h2>
          <div class="content">
            An investment token, in terms of <span class="red">Kenshi</span>,
            <br />
            is a token that invests a small portion of each transaction, distributing
            back the earned profits to the holders.
          </div>
        </div>
        <div class="buttons">
          <a href="https://docs.kenshi.io" class="button">
            <span class="icon"><Book /></span>
            Learn More
          </a>
          <a href="/tools" class="button hidden">
            <span class="icon"><Tools /></span>
            Kenshi Tools
          </a>
          <a href="https://poocoin.com" class="button hidden">
            <span class="icon"><Chart /></span>
            View Charts
          </a>
          <a href="https://unicrypt.com" class="button hidden">
            <span class="icon"><Lock /></span>
            Liquidity Locked
          </a>
        </div>
      </div>
      <div class="chart-wrap">
        <div class="chart">
          <div class="logo">
            <img src="/images/kenshi.png" alt="Kenshi" />
          </div>
          <div class="logo textual">
            <img src="/images/kenshi.textual.svg" alt="Kenshi" />
          </div>
          <div class="price">Initial DEX Offering</div>
          <div class="buy">
            <a href="#presale">
              <span class="icon"><Time /></span>
              Opening trades in {days} day{days > 1 ? "s" : ""}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="samurai-illustration" />
    <div class="section-head">
      <h2>Features</h2>
      <a href="http://docs.kenshi.io/features" class="read-more">
        Read More <span class="icon"><Arrow /></span>
      </a>
    </div>
    <div class="features">
      <div class="samurai-robot">
        <img src="/images/features.png" alt="Samurai Robot" />
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><Rewards /></span>
          Reflections
        </div>
        <span class="content">
          2% of the tokens in each transaction are distributed back to the
          holders, giving a passive income to those loyal to the project.
        </span>
        <a
          href="http://docs.kenshi.io/features/reflections.html"
          class="green read-more"
        >
          Calculate how much you'll get <span class="icon"><Arrow /></span>
        </a>
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><Flame /></span>
          Per transaction burns
        </div>
        <span class="content">
          1% of the tokens in every transaction are burned and are taken out of
          circulation forever. This goes on until 50% of the total supply is
          burned.
        </span>
        <a
          href="http://docs.kenshi.io/features/burns.html"
          class="green read-more"
        >
          Learn why this is good <span class="icon"><Arrow /></span>
        </a>
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><Time /></span>
          Variable Tax Rates
        </div>
        <span class="content">
          The longer you hold onto your tokens the less tax you'll pay when you
          sell. Those who want to manipulate the market face an early sale fine.
        </span>
        <a
          href="https://docs.kenshi.io/features/variable-tax.html"
          class="green read-more"
        >
          Read More <span class="icon"><Arrow /></span>
        </a>
      </div>
      <div class="feature">
        <div class="title">
          <span class="icon"><Gauge /></span>
          Adjustable Max Balance
        </div>
        <span class="content">
          There's an adjustable upper limit for how many tokens a wallet can
          hold. This is to prevent unfair advantage for early buyers.
        </span>
        <a
          href="https://docs.kenshi.io/features/max-balance.html"
          class="green read-more"
        >
          Read More <span class="icon"><Arrow /></span>
        </a>
      </div>
    </div>
  </div>

  <div class="section" id="tokenomics">
    <div class="guardian-illustration" />
    <div class="section-head">
      <h2>Tokenomics</h2>
      <a href="https://docs.kenshi.io/tokenomics.html" class="read-more">
        Read More <span class="icon"><Arrow /></span>
      </a>
    </div>
    <div class="tokenomics">
      <div class="tokenomic">
        <span class="icon"><Supply /></span>
        <span class="title">Supply</span>
        <span class="spacer" />
        <span class="value">10 Trillion</span>
      </div>
      <div class="tokenomic">
        <span class="icon"><Cut /></span>
        <span class="title">Sales Tax</span>
        <span class="spacer" />
        <span class="value">+5%</span>
      </div>
      <div class="tokenomic">
        <span class="icon"><Reward /></span>
        <span class="title">Reflected</span>
        <span class="spacer" />
        <span class="value">2%</span>
      </div>
      <div class="tokenomic">
        <span class="icon"><Fire /></span>
        <span class="title">Burned</span>
        <span class="spacer" />
        <span class="value">1%</span>
      </div>
      <div class="tokenomic">
        <span class="icon"><Dollar /></span>
        <span class="title">Invested</span>
        <span class="spacer" />
        <span class="value">2%</span>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-head">
      <h2>Investments</h2>
      <a href="https://docs.kenshi.io/investment/index.html" class="read-more">
        Read More <span class="icon"><Arrow /></span>
      </a>
    </div>
    <div class="investments">
      <div class="investment">
        <div class="icon"><Hold /></div>
        Starting from phase two of the roadmap, holders will enjoy the profits earned
        from Kenshi projects. You can
        <a
          href="https://docs.kenshi.io/investment/projects/index.html"
          class="red">check here</a
        > to learn more about the current projects and those we've planned for the
        future.
      </div>
      <div class="investment">
        <div class="icon"><Network /></div>
        Kenshi projects will mainly focus on blockchain technology and distributed
        systems. As a tech company, we might look into expanding our operations into
        further areas to provide more profits to the holders.
      </div>
      <div class="investment">
        <div class="icon"><Droplet /></div>
        A small percentage of each transaction (currently 2%) is invested on implementing
        and maintining the Kenshi projects. You can check out
        <a href="https://docs.kenshi.io/investment/profits.html" class="red">
          this page
        </a> to learn how the profits are distributed back to the holders.
      </div>
    </div>
  </div>

  <div class="section" id="roadmap">
    <div class="section-head">
      <h2>Current Milestone</h2>
      <a href="https://docs.kenshi.io/milestone.html" class="read-more">
        Read More <span class="icon"><Arrow /></span>
      </a>
    </div>
    <div class="milestone">
      <ul>
        <li>
          <span class="icon"><Done /></span>
          Launch website
        </li>
        <li>
          <span class="icon"><Pending /></span>
          2000 holders
        </li>
        <li>
          <span class="icon"><Pending /></span>
          Social media groups
        </li>
        <li>
          <span class="icon"><Pending /></span>
          Get listed on CMC
        </li>
        <li>
          <span class="icon"><Pending /></span>
          Register company
        </li>
        <li>
          <span class="icon"><Pending /></span>
          Auditing
        </li>
      </ul>
    </div>
  </div>

  <div class="section no-overflow">
    <div class="team-guardian-illustration" />
    <h2>Team</h2>
    <div class="team">
      <div class="member">
        <div class="avatar">
          <img src="/images/dev.png" alt="Pouya" />
        </div>
        <div class="content">
          <div class="role">Founder</div>
          <div class="name">Pouya</div>
          <div class="bio">
            <p>Software developer with a passion for distributed systems</p>
            <p>
              Feel free to check my
              <a href="https://www.linkedin.com/in/pouya-eghbali">LinkedIn</a>
              or
              <a href="https://github.com/pouya-eghbali">GitHub</a>
              profile to learn more about me and my experience.
            </p>
          </div>
          <div class="links">
            <a href="https://twitter.com/pouya_eghbali"> <Twitter /> </a>
            <a href="https://pouyae.medium.com"> <Medium /> </a>
            <a href="https://github.com/pouya-eghbali"> <Github /> </a>
            <a href="https://www.linkedin.com/in/pouya-eghbali">
              <LinkedIn />
            </a>
          </div>
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
  .page {
    padding: 1em 6em;
    position: relative;
    overflow-x: hidden;
  }
  .samurai-robot {
    grid-row: 1 / span 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .samurai-robot img {
    max-width: 100%;
  }
  .samurai-illustration {
    background: url(/images/samurai.png);
    background-size: cover;
    position: absolute;
    height: 1200px;
    width: 800px;
    left: -300px;
    top: 0px;
    z-index: -1;
    filter: grayscale(1) contrast(0);
    transform: rotate(33deg);
    opacity: 0.1;
  }
  .guardian-illustration {
    background: url(/images/guardian.png);
    background-size: cover;
    position: absolute;
    height: 1200px;
    width: 800px;
    right: -300px;
    top: 0px;
    z-index: -1;
    filter: grayscale(1) contrast(1);
    transform: rotate(-33deg);
    opacity: 0.05;
  }
  .team-guardian-illustration {
    background: url(/images/guardian.png);
    background-size: cover;
    position: absolute;
    height: 400px;
    width: 400px;
    right: 0;
    bottom: 0px;
    z-index: -1;
  }
  .no-overflow {
    overflow: hidden;
  }
  .head {
    box-sizing: border-box;
    min-height: 100vh;
    position: relative;
  }
  .vertical-logo {
    display: flex;
    align-items: center;
  }
  .hero {
    display: flex;
    padding: 3em;
    gap: 4em;
  }
  .hero .chart .logo.textual img {
    width: 280px;
    max-width: 100%;
    margin: 1em 0 2em 0;
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
  .hero .price {
    margin-bottom: 3em;
  }
  .main {
    flex: 1;
  }
  .chart {
    box-shadow: 0px 0px 40px 4px rgba(0, 0, 0, 0.1);
    border-radius: 3em;
    padding: 1em;
    padding-bottom: 2em;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    background: linear-gradient(
      166deg,
      rgba(105, 118, 121, 0.2) 44%,
      rgba(33, 43, 46, 0.2) 100%
    );
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(32px);
    color: #000;
  }
  .chart .logo img {
    width: 20em;
  }
  .buy {
    z-index: 2;
    font-family: "Raleway";
  }
  .buy a {
    display: inline-flex;
    color: #000;
    height: 4em;
    border-radius: 3em;
    box-shadow: 0px 0px 40px 4px rgba(0, 0, 0, 0.1);
    align-items: center;
    justify-content: center;
    padding: 0.5em;
    gap: 1em;
    padding-right: 2em;
  }
  .buy a img {
    height: 100%;
  }
  .buy a .icon {
    font-size: 2.5em;
    display: flex;
    align-items: center;
    padding-left: 0.2em;
  }
  .spacer {
    flex: 1;
  }
  .navbar {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  a {
    font-family: "Raleway";
    color: #000;
  }
  a :global(svg) {
    width: 1em;
  }
  .main .links {
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
  .intro h1 {
    display: inline;
    font-size: 1em;
    font-family: "Roboto";
    color: var(--primary-color);
  }
  .intro {
    font-size: 4em;
    padding: 0.5em 0 0.75em;
  }
  .highlights {
    margin-top: 3em;
    display: flex;
    gap: 2em;
    flex-wrap: wrap;
  }
  .highlights .highlight {
    display: flex;
    align-items: center;
    gap: 1em;
  }
  .highlights .highlight .icon {
    height: 2em;
    width: 2em;
    display: inline-flex;
    color: var(--primary-color);
    align-items: center;
    justify-content: center;
  }
  .section {
    padding: 3em 3em 3em 3em;
  }
  .section h2 {
    font-size: 3em;
    margin-top: 0;
    margin-bottom: 1em;
  }
  .tokenomics {
    display: grid;
    gap: 2em;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  .tokenomic {
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
  .tokenomic .icon {
    height: 2em;
    width: 2em;
    color: var(--primary-color);
    margin-right: 1em;
  }
  .investment-token {
    padding-top: 2em;
    font-size: 2em;
  }
  .investment-token h2 {
    font-size: 1.5em;
  }
  .investment-token .content {
    width: 60%;
    font-weight: 300;
    line-height: 1.5em;
  }
  .red {
    color: var(--primary-color);
  }
  .green {
    color: var(--secondary-color);
  }
  .head .buttons {
    margin-top: 4em;
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
  }
  .button {
    font-size: 1.25em;
    padding: 0.75em 1.5em;
    background: #000;
    color: #fff;
    border-radius: 3em;
    font-family: "Raleway";
    display: inline-flex;
    align-items: center;
    transition: cubic-bezier(0.39, 0.575, 0.565, 1) all 0.3s;
  }
  .button:hover {
    background: var(--primary-color);
  }
  .button .icon {
    margin-right: 0.5em;
    display: flex;
  }
  .features {
    display: grid;
    grid-template-columns: 0.5fr 1fr 1fr;
    gap: 4em;
  }
  .feature {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .feature .content {
    font-size: 1.5em;
    font-weight: 300;
    line-height: 1.5em;
  }
  .feature .title {
    font-size: 2em;
    display: flex;
    align-items: center;
    gap: 0.5em;
    color: var(--primary-color);
  }
  .feature .icon {
    height: 1em;
    width: 1em;
    display: inline-block;
  }
  .milestone .icon {
    height: 1em;
    width: 1em;
    display: inline-block;
  }
  .milestone ul {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 4em;
  }
  .milestone ul li {
    display: flex;
    gap: 1em;
  }
  .team img {
    height: 200px;
    border-radius: 1em;
    box-shadow: 0px 0px 40px 4px rgb(0 0 0 / 10%);
    border: 1px solid rgb(0 0 0 / 10%);
  }
  .member {
    display: flex;
    gap: 4em;
  }
  .member .content {
    flex: 1;
  }
  .member .role {
    font-size: 2em;
    font-family: "Raleway";
    color: var(--primary-color);
  }
  .member .name {
    font-size: 1.4em;
    font-family: "Roboto";
    font-weight: 300;
    color: var(--secondary-color);
    margin-bottom: 1em;
  }
  p {
    margin-bottom: 0.25em;
    margin-top: 0.25em;
  }
  .member .links {
    font-size: 1.5em;
    display: flex;
    align-items: center;
    gap: 1em;
  }
  .member .content {
    display: flex;
    flex-direction: column;
  }
  .member .bio {
    flex: 1;
  }
  .footer {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 2em;
    display: flex;
    align-items: center;
    padding-bottom: 1em;
    flex-wrap: wrap;
  }
  .investments {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 4em;
    font-size: 1.4em;
    font-weight: 300;
    line-height: 1.5em;
  }
  a {
    transition: cubic-bezier(0.39, 0.575, 0.565, 1) all 0.3s;
  }
  a:not(.button):not(.buy a):not(.red):hover {
    color: var(--primary-color);
  }
  .feature a.green {
    display: flex;
    align-self: flex-start;
    align-items: flex-end;
    gap: 0.35em;
  }
  a.red {
    border-bottom: 1px solid transparent;
  }
  a.red:hover {
    border-bottom: 1px solid;
  }
  .investments .icon {
    height: 2em;
    margin-bottom: 1em;
  }
  .section-head {
    display: flex;
  }
  .section-head .icon {
    height: 1em;
    display: block;
    width: 1em;
  }
  .section-head .read-more {
    display: inline-flex;
    gap: 0.35em;
    margin-left: 1em;
    color: var(--primary-color);
    align-items: center;
    height: 4em;
    opacity: 0;
    transition: all cubic-bezier(0.215, 0.61, 0.355, 1) 0.2s;
  }
  .section-head:hover .read-more {
    opacity: 1;
  }
  .bar {
    height: 4px;
    width: 100%;
    background: url(/images/square.jpg);
    background-size: 20%;
    opacity: 0.4;
  }
  .section {
    position: relative;
  }
  .head .logo {
    margin-left: -0.5em;
  }
  .hidden {
    display: none !important;
  }
  @media (max-width: 1700px) {
    .tokenomics {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (max-width: 1500px) {
    .page {
      padding: 0;
    }
  }
  @media (max-width: 1250px) {
    .investment-token .content {
      width: 100%;
    }
    .hero .links:first-of-type a:not(:first-of-type) {
      display: none;
    }
    .investments,
    .tokenomics,
    .features {
      grid-template-columns: 1fr 1fr;
      padding: 1em;
      gap: 2em;
    }
    .milestone ul {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 2em;
    }
    .samurai-robot img {
      max-width: 80%;
    }
  }
  @media (max-width: 960px) {
    .team-guardian-illustration {
      height: 350px;
      width: 350px;
    }
  }
  @media (max-width: 900px) {
    .team-guardian-illustration {
      height: 300px;
      width: 300px;
    }
  }
  @media (max-width: 840px) {
    .team-guardian-illustration {
      height: 240px;
      width: 240px;
    }
  }
  @media (max-width: 800px) {
    .team-guardian-illustration {
      display: none;
    }
    .hero {
      flex-direction: column;
    }
    .chart {
      max-width: 400px;
    }
    .chart-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  @media (max-width: 600px) {
    .page {
      padding: 0;
    }
    .section {
      padding: 1em;
    }
    .intro {
      padding-bottom: 0;
    }
    h1,
    h2 {
      margin-bottom: 0.5em !important;
    }
    .section h2 {
      margin-left: 0.5em;
    }
    .hero {
      padding: 2em;
      flex-direction: column;
    }
    .investment-token {
      padding-top: 1em;
      font-size: 1.5em;
    }
    .investment-token h2 {
      text-align: left;
    }
    .investment-token .content {
      font-size: 0.8em;
    }
    .intro {
      font-size: 2em;
    }
    .hero .buttons .button {
      font-size: 1em;
    }
    .hero .buttons {
      gap: 1em;
    }
    .navbar {
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 1em;
    }
    .investments,
    .tokenomics,
    .features {
      grid-template-columns: 1fr;
      padding: 1em;
      gap: 2em;
    }
    .read-more {
      display: none !important;
    }
    .milestone ul {
      padding: 1em;
      grid-template-columns: 1fr 1fr;
      gap: 1.5em;
    }
    .member {
      flex-direction: column;
      gap: 1em;
      padding: 1.5em;
    }
    .member .avatar img {
      height: 100px;
      width: 100px;
      border-radius: 1em;
    }
    .member .content .links {
      margin-top: 1em;
    }
    .team-guardian-illustration {
      display: none;
    }
    .samurai-illustration {
      top: 150px;
    }
    .guardian-illustration {
      top: 100px;
    }
  }
</style>
