<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  import Card from "src/components/Card.svelte";

  import VR from "src/icons/VR.svelte";
  import Dice from "src/icons/Dice.svelte";
  import Gamepad from "src/icons/Gamepad.svelte";
  import Slot from "src/icons/Slot.svelte";
  import Shuffle from "src/icons/Shuffle.svelte";

  import DB from "src/icons/DB.svelte";
  import D20 from "src/icons/D20.svelte";
  import Magnify from "src/icons/Magnify.svelte";
  import CloudSensor from "src/icons/CloudSensor.svelte";

  import ChevronRight from "src/icons/ChevronRight.svelte";
  import External from "src/icons/External.svelte";
  import Arrow from "src/icons/Arrow.svelte";

  import BinaryLock from "src/icons/BinaryLock.svelte";
  import LiquidUp from "src/icons/LiquidUp.svelte";
  import Shield from "src/icons/Shield.svelte";
  import Code from "src/icons/Code.svelte";

  import LayerPlus from "src/icons/LayerPlus.svelte";
  import Infinity from "src/icons/Infinity.svelte";
  import Bolt from "src/icons/Bolt.svelte";
  import CheckDouble from "src/icons/CheckDouble.svelte";
  import BellOn from "src/icons/BellOn.svelte";
  import ChartNetwork from "src/icons/ChartNetwork.svelte";
  import Link from "src/icons/Link.svelte";

  import Gist from "src/components/Gist.svelte";
</script>

<Navbar />

<!-- Hero -->

<div class="hero">
  <div class="content">
    <img src="/images/kenshi.logo.long.png" alt="Kenshi" class="logo" />
    <div class="motto">Cutting-edge tech for your blockchain projects</div>
    <div class="buttons">
      <a
        class="button solid"
        href="https://charts.bogged.finance/?c=bsc&t=0x8AdA51404F297bF2603912d1606340223c0a7784"
        target="_blank"
      >
        <span>View charts <External /></span>
      </a>
      <a class="button" href="http://docs.kenshi.io/">
        <span>Read the docs <ChevronRight /></span>
      </a>
    </div>
  </div>
  <div class="graphics">
    <img src="/images/kenshi.png" alt="Kenshi Samurai" />
  </div>
</div>

<div class="products">
  <div class="mask">
    <img src="/images/mask.png" alt="Mask" />
  </div>
  <div class="start">
    <h2>Start using Kenshi <br /> for your awesome products.</h2>
    <div class="content">
      From development to deployment and further, Kenshi is on your side.
    </div>
  </div>
  <div class="products-list">
    <div class="product">
      <div class="usecases">
        <Shuffle />
        <VR />
        <Dice />
        <Gamepad />
        <Slot />
      </div>
      <h2>VRF Oracle</h2>
      <div class="description">
        Implement dynamic NFTs, games, lotteries and more with Kenshi VRF
        oracles.
      </div>
      <div class="buttons">
        <a
          href="https://docs.kenshi.io/services/vrf/index.html"
          class="button solid"
        >
          <span>Docs <External /></span>
        </a>
        <a
          href="https://blog.kenshi.io/introducing-the-kenshi-vrf-oracle-be1cbc4779c9"
          class="button"
        >
          <span>Learn more <ChevronRight /></span>
        </a>
      </div>
    </div>
    <div class="product">
      <div class="usecases">
        <D20 />
        <DB />
        <Magnify />
        <CloudSensor />
      </div>
      <h2>Deep Index</h2>
      <div class="description">
        Sync, search, query, and consume blockchain data that matters.
      </div>
      <div class="buttons">
        <a
          href="https://docs.kenshi.io/services/deep-index/index.html"
          class="button solid"
        >
          <span>Docs <External /></span>
        </a>
        <a
          href="https://blog.kenshi.io/introducing-the-kenshi-deep-blockchain-indexing-services-7fc4b159a946"
          class="button"
        >
          <span>Learn more <ChevronRight /></span>
        </a>
      </div>
    </div>
  </div>
</div>

<div class="discover">
  <h2>Discover all of Kenshi.</h2>
  <div class="products-list">
    <a href="https://docs.kenshi.io/services/locker.html" class="product">
      <BinaryLock />
      <h3>Liquidity Lockers</h3>
      <Arrow />
    </a>
    <a href="https://docs.kenshi.io/services/lbp.html" class="product">
      <LiquidUp />
      <h3>Liquidity Bootstrapping</h3>
      <Arrow />
    </a>
    <a href="https://docs.kenshi.io/services/audits/index.html" class="product">
      <Shield />
      <h3>Security Audits</h3>
      <Arrow />
    </a>
    <a
      href="https://docs.kenshi.io/services/development/index.html"
      class="product"
    >
      <Code />
      <h3>Blockchain Development</h3>
      <Arrow />
    </a>
  </div>
</div>

<div class="cards">
  <Card padding={false}>
    <div class="card-inner community">
      <div class="graphics">
        <img src="/images/token.png" alt="Kenshi Token" />
      </div>
      <div class="content">
        <h2>The Token</h2>
        <div>
          Looking for the ₭enshi token? The Kenshi token is a frictionless yield
          token that can provide a passive income to its holders, and that is
          also used to pay for the Kenshi services.
        </div>
        <div class="spacer" />
        <div class="buttons">
          <a
            href="https://pancakeswap.finance/swap?outputCurrency=0x8AdA51404F297bF2603912d1606340223c0a7784"
            class="button solid"
            target="_blank"
          >
            <span>Buy <External /></span>
          </a>
          <a
            href="https://charts.bogged.finance/?c=bsc&t=0x8AdA51404F297bF2603912d1606340223c0a7784"
            class="button solid"
            target="_blank"
          >
            <span>Charts <External /></span>
          </a>
          <a href="https://docs.kenshi.io/tokenomics.html" class="button">
            <span>Learn more <ChevronRight /></span>
          </a>
        </div>
      </div>
    </div>
  </Card>
  <Card padding={false}>
    <div class="card-inner community">
      <div class="graphics">
        <img src="/images/pfp.png" alt="Kenshi Telegram" />
      </div>
      <div class="content">
        <h2>Community</h2>
        <div>
          Join the Kenshi communities to talk tech, partake in early adopter
          programs, get help with one of our services, or to get the latest
          Kenshi news.
        </div>
        <div class="spacer" />
        <div class="buttons">
          <a
            href="https://t.me/kenshi_token"
            class="button solid"
            target="_blank"
          >
            <span>Telegram <External /></span>
          </a>
          <a
            href="https://twitter.com/kenshi_token"
            class="button solid"
            target="_blank"
          >
            <span>Twitter <External /></span>
          </a>
          <a href="https://docs.kenshi.io/community.html" class="button">
            <span>More <ChevronRight /></span>
          </a>
        </div>
      </div>
    </div>
  </Card>
</div>

<div class="getting-started">
  <div class="guides">
    <div class="guide">
      <div class="description">
        <h2>Getting started is easy.</h2>
        <h3>Use VRF to get randomness.</h3>
        <div class="content">
          <p>
            The Kenshi Verifiable Random Function (VRF) oracle can generate and
            verify pseudorandom numbers to be used by smart contracts on-chain.
          </p>
          <p>
            Enjoy a responsive VRF solution on Binance Smart Chain, Polygon and
            Fantom chains.
          </p>
        </div>
        <div class="spacer" />
        <div class="spacer" />
        <h4>Learn how to get a random number</h4>
        <div class="buttons">
          <a
            href="https://remix.ethereum.org/#url=https://raw.githubusercontent.com/kenshi-token/d20/master/contracts/D20.sol"
            class="button solid"
            target="_blank"
          >
            <span>Remix <External /></span>
          </a>
          <a
            href="https://github.com/kenshi-token?q=vrf&type=all&language=&sort="
            class="button solid"
            target="_blank"
          >
            <span>Github <External /></span>
          </a>
          <a
            href="https://docs.kenshi.io/services/vrf/index.html"
            class="button"
          >
            <span>Docs <ChevronRight /></span>
          </a>
        </div>
      </div>
      <div class="sample">
        <Gist src="pouya-eghbali/2aba0069fa0cd8eded3c0df4d966232e" />
      </div>
    </div>
  </div>
</div>

<div class="deep-index">
  <div class="mask">
    <img src="/images/mask.elephant.png" alt="Mask" />
  </div>
  <div class="usages">
    <div class="title">
      <h2>All in one blockchain data solution.</h2>
    </div>
    <div class="grid">
      <div class="usage">
        <h3>Push notifications for the blockchain</h3>
        <div class="graphics">
          <BellOn />
          <Link />
          <ChartNetwork />
        </div>
        <div class="description">
          <p>
            Receive blockchain events directly on your AWS Lambda functions or
            HTTP reverse API endpoints.
          </p>
          <p>Focus on your product, we provide the data.</p>
        </div>
        <div class="buttons">
          <a
            class="button solid"
            href="https://github.com/kenshi-token?q=reverse-api+OR+graphql&type=public&language=&sort="
            target="_blank"
          >
            <span>View examples <External /></span>
          </a>
        </div>
      </div>
      <div class="usage">
        <h3>Never miss an event again</h3>
        <div class="graphics">
          <Bolt />
          <CheckDouble />
        </div>
        <div class="description">
          <p>
            Kenshi scans each block multiple times to make sure no event is
            missed.
          </p>
          <p>Reliability for your services is key, you can count on us.</p>
        </div>
        <div class="buttons">
          <a
            class="button solid"
            href="https://blog.kenshi.io/introducing-the-kenshi-deep-blockchain-indexing-services-7fc4b159a946"
          >
            <span>Learn more <External /></span>
          </a>
        </div>
      </div>
      <div class="usage">
        <h3>Fully managed, scales to infinity</h3>
        <div class="graphics">
          <LayerPlus />
          <Infinity />
        </div>
        <div class="description">
          <p>
            Kenshi is a highly available, managed serverless solution that
            scales to infinity.
          </p>
          <p>Never worry about infrastructure again, we've got you covered.</p>
        </div>
        <div class="buttons">
          <a
            class="button"
            href="https://docs.kenshi.io/services/deep-index/index.html"
          >
            <span>Start today <ChevronRight /></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="resources">
  <div class="grid">
    <a href="https://github.com/kenshi-token" target="_blank">
      <Card padding={false}>
        <div class="card-button">
          <div class="graphics">
            <img src="/images/pfp/github.png" alt="Kenshi Github" />
          </div>
          <div class="content">
            <div class="vendor">
              <h3>Github</h3>
              <div class="spacer" />
              <External />
            </div>
            <div class="text">Check Kenshi GitHub repositories</div>
          </div>
        </div>
      </Card>
    </a>
    <a href="https://www.npmjs.com/org/kenshi.io" target="_blank">
      <Card padding={false}>
        <div class="card-button">
          <div class="graphics">
            <img src="/images/pfp/npm.png" alt="Kenshi NPM" />
          </div>
          <div class="content">
            <div class="vendor">
              <h3>NPM</h3>
              <div class="spacer" />
              <External />
            </div>
            <div class="text">See all Kenshi NPM packages</div>
          </div>
        </div>
      </Card>
    </a>
    <a href="https://blog.kenshi.io" target="_blank">
      <Card padding={false}>
        <div class="card-button">
          <div class="graphics">
            <img src="/images/pfp/medium.png" alt="Kenshi Blog" />
          </div>
          <div class="content">
            <div class="vendor">
              <h3>Medium</h3>
              <div class="spacer" />
              <External />
            </div>
            <div class="text">Read Kenshi blog articles</div>
          </div>
        </div>
      </Card>
    </a>
    <a href="https://t.me/kenshi_developers" target="_blank">
      <Card padding={false}>
        <div class="card-button">
          <div class="graphics">
            <img src="/images/pfp/telegram.png" alt="Kenshi Telegram" />
          </div>
          <div class="content">
            <div class="vendor">
              <h3>Telegram</h3>
              <div class="spacer" />
              <External />
            </div>
            <div class="text">Join Kenshi developers chat</div>
          </div>
        </div>
      </Card>
    </a>
    <a href="https://docs.kenshi.io" target="_blank">
      <Card padding={false}>
        <div class="card-button">
          <div class="graphics">
            <img src="/images/pfp/docs.png" alt="Kenshi Docs" />
          </div>
          <div class="content">
            <div class="vendor">
              <h3>Docs</h3>
              <div class="spacer" />
              <External />
            </div>
            <div class="text">Read Kenshi documentation</div>
          </div>
        </div>
      </Card>
    </a>
  </div>
  <div class="details">
    <h2>Developer resources</h2>
    <div>
      Find examples, tools and documents for integrating the Kenshi products and
      services into your projects.
    </div>
  </div>
</div>

<div class="articles">
  <h2>Latest articles</h2>
  <div class="grid">
    <div class="article">
      <Card padding={false}>
        <div class="article-inner">
          <img src="/images/medium/vrf.png" alt="Kenshi VRF" />
          <div class="padded">
            <h3>Introducing the Kenshi VRF oracles.</h3>
            <div class="content">
              VRFs play an important role in the blockchain, as the blockchain
              lacks the native functionality to securely generate random numbers
              due to its deterministic nature...
            </div>
            <div class="buttons">
              <a
                class="button solid"
                href="https://blog.kenshi.io/introducing-the-kenshi-vrf-oracle-be1cbc4779c9"
              >
                <span>Read article <External /></span>
              </a>
            </div>
          </div>
        </div>
      </Card>
    </div>
    <div class="article">
      <Card padding={false}>
        <div class="article-inner">
          <img
            src="/images/medium/kenshi-deep-index.png"
            alt="Kenshi Deep Index"
          />
          <div class="padded">
            <h3>Introducing the Kenshi Deep Indexing Service.</h3>
            <div class="content">
              Information published on the blockchain is publicly available and
              accessible by anyone who needs it. However, traversing the event
              logs and searching for specific events is not an easy task...
            </div>
            <div class="buttons">
              <a
                href="https://blog.kenshi.io/introducing-the-kenshi-deep-blockchain-indexing-services-7fc4b159a946"
                class="button solid"
              >
                <span>Read article <External /></span>
              </a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</div>

<Footer />

<style>
  .products {
    position: relative;
  }
  .mask {
    position: absolute;
    z-index: -1;
    height: 960px;
    top: -74%;
    padding: 0;
    opacity: 0.6;
  }
  .mask img {
    height: 100%;
  }
  .hero {
    padding: 6em;
    gap: 6em;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 66px);
    box-sizing: border-box;
    flex-wrap: wrap;
  }
  .hero .content {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    flex-direction: column;
    gap: 6em;
    flex: 3;
  }
  .hero .graphics {
    flex: 2;
    height: 100%;
    min-width: 300px;
  }
  .hero .graphics img {
    width: 540px;
    max-width: 80%;
    height: 100%;
    object-fit: contain;
  }
  @media only screen and (max-width: 640px) {
    .hero .content {
      gap: 3em;
    }
    .hero .content .motto {
      font-size: 2em;
    }
    .hero {
      padding: 1em;
      padding-top: 2em;
      gap: 4em;
      height: auto;
      align-items: center;
    }
    .hero .buttons {
      justify-content: center;
    }
    .hero .graphics {
      display: flex;
      justify-content: center;
    }
  }
  .hero .logo {
    width: 440px;
    max-width: 90%;
  }
  .hero .motto {
    font-size: 3em;
    max-width: 90%;
    font-family: "Frank";
    text-align: center;
    font-weight: 500;
  }
  .buttons {
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
  }
  .spacer {
    flex: 1;
  }
  a.button {
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    padding: 0.5em 1em;
    background: transparent;
    font-size: 1em;
    border-radius: 0.5em;
    display: flex;
    align-items: center;
    gap: 0.75em;
  }
  a.button.solid {
    color: #fff;
    background: #000;
    border: none;
    font-size: 1em;
  }
  a.button :global(svg) {
    height: 0.8em;
    fill: currentColor;
  }
  a.button.solid :global(.fa-secondary) {
    fill: #fff !important;
  }
  a.button.solid :global(.fa-primary) {
    fill: #fff !important;
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 4em;
    padding: 4em;
  }
  @media only screen and (max-width: 640px) {
    .cards {
      padding: 2em 1em;
      gap: 2em;
    }
    .cards .card-inner .buttons {
      justify-content: flex-start;
    }
  }
  .card-inner {
    display: flex;
    gap: 3em;
  }
  .card-inner .content {
    gap: 1em;
    text-align: left;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
  }
  .card-inner h2 {
    font-size: 1.5em;
    color: #111;
    margin-bottom: 0;
  }
  .card-inner .buttons {
    align-items: flex-end;
    justify-content: end;
    width: 100%;
    flex-wrap: wrap;
  }
  .card-inner img {
    max-width: 100%;
  }
  .discover {
    padding: 2em 4em;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 4em;
  }
  @media only screen and (max-width: 640px) {
    .discover {
      padding: 2em 1em;
      gap: 2em;
    }
  }
  .discover h2 {
    font-size: 2em;
    margin: 0;
  }
  .discover .products-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2em;
    padding: 0;
  }
  .discover .product {
    display: flex;
    gap: 0.75em;
    flex-direction: row;
    align-items: center;
    color: #000;
  }
  .discover .product h3 {
    margin: 0;
  }
  .discover .product :global(svg) {
    height: 1.25em;
  }
  .discover a:hover {
    color: var(--primary-color);
  }
  .discover a:hover :global(svg) {
    fill: var(--primary-color);
  }
  .community {
    gap: 0;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
  @media only screen and (max-width: 1200px) {
    .community {
      gap: 0;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr;
    }
  }
  .community h2 {
    margin: 0;
  }
  .community .graphics {
    height: 100%;
  }
  .community img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .community .content {
    padding: 2em;
  }
  @media only screen and (max-width: 600px) {
    .community .buttons {
      font-size: 0.9em;
    }
    .community .graphics {
      max-height: 242px;
    }
  }
  .products {
    padding: 4em;
    padding-bottom: 2em;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2em;
    width: 100%;
    box-sizing: border-box;
  }
  @media only screen and (max-width: 640px) {
    .products {
      padding: 2em 1em;
    }
    .products .start h2 {
      margin-top: 0.75em;
    }
  }
  .products .products-list {
    display: grid;
    gap: 2em;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  .products > div {
    padding: 1em;
  }
  @media only screen and (max-width: 640px) {
    .products > div {
      padding: 0;
    }
  }
  .product .description {
    flex: 1;
  }
  .product .usecases {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 5fr;
    gap: 1em;
    align-items: center;
  }
  .product .usecases :global(svg) {
    max-height: 1.5em;
  }
  .product {
    display: flex;
    gap: 1em;
    flex-direction: column;
  }
  .product .buttons {
    margin-top: 2em;
    flex-wrap: wrap;
  }
  .start h2 {
    margin-top: 0;
    font-size: 2em;
  }
  .articles {
    padding: 4em;
  }
  @media only screen and (max-width: 640px) {
    .articles {
      padding: 2em 1em;
    }
  }
  .articles h2 {
    font-size: 2em;
  }
  .articles .grid {
    margin-top: 4em;
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(280px, calc((100% - 6em) / 4))
    );
    gap: 2em;
  }
  @media only screen and (max-width: 500px) {
    .articles .grid {
      grid-template-columns: 1fr;
    }
  }
  .articles .article img {
    max-width: 100%;
  }
  .article-inner {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    height: 100%;
  }
  .articles .article {
    gap: 1em;
    display: flex;
    flex-direction: column;
  }
  .article h3 {
    margin-top: 0;
  }
  .article .buttons {
    display: flex;
    justify-content: start;
    margin-top: 2.5em;
    flex-wrap: wrap;
  }
  .article .padded {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
  }
  .article .padded .content {
    flex: 1;
  }
  .padded {
    padding: 2em;
  }
  @media only screen and (max-width: 640px) {
    .padded {
      padding: 1em;
    }
  }
  .getting-started {
    padding: 4em;
  }
  @media only screen and (max-width: 640px) {
    .getting-started {
      padding: 2em 0.5em;
    }
    .getting-started h2,
    .getting-started h3 {
      margin-top: 0;
    }
    .getting-started .description {
      padding: 0 0.5em;
    }
  }
  .guides {
    display: flex;
    gap: 4em;
    width: 100%;
    flex-direction: column;
  }
  .guide {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, calc(50% - 2em)));
    gap: 4em;
  }
  @media screen and (max-width: 1320px) {
    .guide {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 100%));
      gap: 4em;
    }
    .guide .sample {
      padding: 0.5em;
    }
  }
  @media screen and (max-width: 600px) {
    .guide {
      gap: 2.5em;
    }
  }
  .guides h2 {
    font-size: 2em;
  }
  .guide .description {
    display: flex;
    flex-direction: column;
  }
  .guide .content {
    width: 80%;
    line-height: 1.2em;
    color: #222;
  }
  @media screen and (max-width: 1200px) {
    .guide .content {
      width: 100%;
    }
  }
  .guide .sample {
    height: 444px;
  }
  .resources {
    padding: 4em;
    display: grid;
    grid-template-columns: 4fr 2fr;
    gap: 4em;
  }
  @media only screen and (max-width: 640px) {
    .resources {
      padding: 2em 1em;
    }
  }
  .resources h2 {
    font-size: 2em;
    margin-bottom: 1em;
    margin-top: 0;
  }
  .resources .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2em;
    justify-content: right;
  }
  .resources .grid .vendor h3 {
    margin: 0;
  }
  @media only screen and (max-width: 800px) {
    .resources .details {
      grid-row: 1;
    }
    .resources {
      grid-template-columns: 1fr;
      width: 100%;
      box-sizing: border-box;
    }
  }
  @media only screen and (max-width: 990px) {
    .mask {
      display: none;
    }
  }
  .card-button {
    display: grid;
    grid-template-columns: 1.5fr 3fr;
    height: 100%;
  }
  .card-button .graphics img {
    height: 100%;
    max-width: 100%;
    object-fit: cover;
  }
  .card-button .content {
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .card-button .vendor {
    display: flex;
    align-items: center;
  }
  .card-button :global(svg) {
    height: 1em;
  }
  .resources a {
    color: #111;
  }
  .deep-index {
    padding: 4em;
    position: relative;
  }
  @media only screen and (max-width: 640px) {
    .deep-index {
      padding: 2em 1em;
    }
  }
  .deep-index h2 {
    font-size: 2em;
  }
  .deep-index .mask {
    right: 0em;
  }
  .usages {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 4em;
  }
  .usages .grid {
    grid-column: span 3;
    display: grid;
    gap: 4em;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  @media only screen and (max-width: 800px) {
    .usages .grid {
      grid-column: span 2;
    }
  }
  @media only screen and (max-width: 600px) {
    .usages {
      gap: 0;
    }
    .usages .grid {
      grid-column: span 1;
      gap: 2em;
    }
  }
  .usages .graphics {
    display: flex;
    align-items: center;
    padding: 2em 0;
    gap: 1em;
  }
  .usages .graphics :global(svg) {
    height: 1.5em;
  }
  .usages h3 {
    margin: 0;
    margin-top: 0.25em;
  }
  .usages h2 {
    margin-top: 0em;
    font-size: 2em;
  }
  .usages p:first-of-type {
    margin-top: 0;
  }
  .usages .description h3 {
    margin-top: 0;
  }
  .usages .usage {
    display: flex;
    flex-direction: column;
  }
  .usages .description {
    flex: 1;
  }
  .usages .usage .buttons {
    margin-top: 1em;
  }
  @media only screen and (max-width: 600px) {
    .resources {
      gap: 2.5em;
    }
    .articles h2 {
      margin: 0;
    }
    .articles .grid {
      margin-top: 2em;
    }
  }
  .resources .grid > a {
    transition: cubic-bezier(0.25, 0.46, 0.45, 0.94) all 0.2s;
    z-index: 0;
  }
  .resources .grid > a:hover {
    transform: scale(1.02) translateX(-2px) translateY(-2px);
  }
  .resources .grid > a:active {
    transform: scale(0.98) translateX(2px) translateY(2px);
  }
  .resources .grid > :global(.card) {
    transition: cubic-bezier(0.25, 0.46, 0.45, 0.94) all 0.2s;
  }
  .resources .grid > a:hover :global(.card) {
    box-shadow: 1em 1em 2em 0.5em rgb(0 0 0 / 10%);
  }
  /* animations */
  .button > span {
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 0.5em;
  }
  .button:not(.solid) {
    position: relative;
  }
  .button:not(.flat):hover {
    color: #fff;
  }
  .button:not(.solid)::after {
    content: "";
    position: absolute;
    right: 0;
    top: -1px;
    bottom: -1px;
    width: 0;
    background: var(--primary-color);
    transition: width cubic-bezier(0.165, 0.84, 0.44, 1) 0.1s;
    z-index: 0;
    border-radius: 0.5em;
  }
  .button:not(.solid):hover::after {
    width: 100%;
    border: 1px solid var(--primary-color);
    box-sizing: content-box;
  }
  .button.solid :global(svg) {
    transition: transform cubic-bezier(0.165, 0.84, 0.44, 1) 0.1s;
  }
  .button.solid:hover :global(svg) {
    transform: rotate(45deg);
  }
  .button {
    transition: transform cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s;
  }
  .button:active {
    transform: scale(0.98);
  }
</style>
