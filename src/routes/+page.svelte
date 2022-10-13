<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  // import Button from "src/components/Button.svelte";
  import CardButton from "src/components/CardButton.svelte";
  import Article from "src/components/Article.svelte";
  import InfoCard from "src/components/InfoCard.svelte";
  import Product from "src/components/Product.svelte";
  import Usage from "src/components/Usage.svelte";

  import VR from "src/icons/VR.svelte";
  import Dice from "src/icons/Dice.svelte";
  import Gamepad from "src/icons/Gamepad.svelte";
  import Slot from "src/icons/Slot.svelte";
  import Shuffle from "src/icons/Shuffle.svelte";

  import DB from "src/icons/DB.svelte";
  import D20 from "src/icons/D20.svelte";
  import Magnify from "src/icons/Magnify.svelte";
  import CloudSensor from "src/icons/CloudSensor.svelte";

  //import ChevronRight from "src/icons/ChevronRight.svelte";
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
  import Alert from "src/components/Alert.svelte";

  import {
    Grid,
    Row,
    Column,
    Tile,
    Button,
    Content,
    ClickableTile,
  } from "carbon-components-svelte";
  import { Dashboard, Book, ChevronRight } from "carbon-icons-svelte";
</script>

<!-- Hero -->

<div class="hero">
  <Tile>
    <Grid noGutter padding>
      <Row>
        <Column>
          <Grid noGutter>
            <Row>
              <Column>
                <h1>Kenshi Blockchain Tech</h1>
              </Column>
            </Row>
            <Row>
              <Column>
                Kenshi provides full-stack developer tooling for the blockchain.
                Whether it's sourcing data from the blockchain, processing it,
                or delivering it to the blockchain, Kenshi has you covered.
              </Column>
            </Row>
            <Row>
              <Column>
                <Button href="/dashboard" icon={Dashboard}>
                  Start building
                </Button>
                <Button href="/docs" kind="secondary" icon={Book}>
                  Documentation
                </Button>
              </Column>
            </Row>
          </Grid>
        </Column>
        <Column />
      </Row>
    </Grid>
  </Tile>
</div>

<Content>
  <div class="products">
    <Grid noGutter padding>
      <Row>
        <Column>
          <div class="start">
            <h2>Start using Kenshi <br /> for your awesome products.</h2>
            <div class="content">
              From development to deployment and further, Kenshi is on your
              side.
            </div>
          </div>
        </Column>
        <Column>
          <div class="products-list">
            <Product
              title="VRF Oracle"
              description="Implement dynamic NFTs, games, lotteries and more with Kenshi VRF oracles."
              buttons={[
                {
                  href: "/docs/services/vrf",
                  external: true,
                  label: "Docs",
                },
                {
                  href: "https://blog.kenshi.io/introducing-the-kenshi-vrf-oracle-be1cbc4779c9",
                  external: false,
                  label: "Learn more",
                },
              ]}
            >
              <Shuffle />
              <VR />
              <Dice />
              <Gamepad />
              <Slot />
            </Product>

            <Product
              title="Deep Index"
              description="Sync, search, query, and consume blockchain data that matters."
              buttons={[
                {
                  href: "/docs/services/deep-index",
                  external: true,
                  label: "Docs",
                },
                {
                  href: "https://blog.kenshi.io/introducing-the-kenshi-deep-blockchain-indexing-services-7fc4b159a946",
                  external: false,
                  label: "Learn more",
                },
              ]}
            >
              <D20 />
              <DB />
              <Magnify />
              <CloudSensor />
            </Product>
          </div>
        </Column>
      </Row>
    </Grid>
  </div>

  <div class="discover">
    <Grid noGutter padding>
      <Row>
        <Column>
          <h2>Discover all of Kenshi.</h2>
        </Column>
      </Row>
      <Row>
        <Column lg={4}>
          <ClickableTile>
            <div class="discover-tile">
              <h3>Deep Index</h3>
              <p class="body">
                Sync, search, query, and consume blockchain data that matters.
              </p>
              <div class="buttons">
                <Button
                  href="/docs/services/deep-index"
                  kind="tertiary"
                  icon={Book}
                >
                  Docs
                </Button>
                <Button href="/docs/services/deep-index" icon={ChevronRight}>
                  Start
                </Button>
              </div>
            </div>
          </ClickableTile>
        </Column>
        <Column lg={4}>
          <ClickableTile>
            <div class="discover-tile">
              <h3>DeFi Price Feed</h3>
              <p class="body">
                Free to use, real-time, on-chain price feed oracle and library
                based on DeFi and DEX.
              </p>
              <div class="buttons">
                <Button
                  href="/docs/services/deep-index"
                  kind="tertiary"
                  icon={Book}
                >
                  Docs
                </Button>
                <Button href="/docs/services/deep-index" icon={ChevronRight}>
                  Start
                </Button>
              </div>
            </div>
          </ClickableTile>
        </Column>
        <Column lg={4}>
          <ClickableTile>
            <div class="discover-tile">
              <h3>VRF Oracle</h3>
              <p>
                Implement dynamic NFTs, games, lotteries and more with Kenshi
                VRF oracles.
              </p>
              <div class="buttons">
                <Button
                  href="/docs/services/deep-index"
                  kind="tertiary"
                  icon={Book}
                >
                  Docs
                </Button>
                <Button href="/docs/services/deep-index" icon={ChevronRight}>
                  Start
                </Button>
              </div>
            </div>
          </ClickableTile>
        </Column>
        <Column lg={4}>
          <ClickableTile>
            <h3>Liquidity Lockers</h3>
          </ClickableTile>
        </Column>
        <Column lg={4}>
          <ClickableTile>
            <h3>Liquidity Lockers</h3>
          </ClickableTile>
        </Column>
        <Column lg={4}>
          <ClickableTile>
            <h3>Blockchain Development</h3>
          </ClickableTile>
        </Column>
      </Row>
    </Grid>
  </div>

  <div class="cards">
    <Grid noGutter padding>
      <Row>
        <Column>
          <InfoCard
            image="/images/token.png"
            title="The Token"
            description="Looking for the ₭enshi token? The Kenshi token is a frictionless yield token that can provide a passive income to its holders, and that is also used to pay for the Kenshi services."
            buttons={[
              {
                href: "https://charts.bogged.finance/?c=bsc&t=0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f",
                external: true,
                label: "Charts",
              },
              {
                href: "/swap",
                external: false,
                label: "Buy",
              },
              {
                href: "/docs/token",
                external: false,
                label: "Learn more",
              },
            ]}
          />
        </Column>
        <Column>
          <InfoCard
            image="/images/pfp.png"
            title="Community"
            description="Join the Kenshi communities to talk tech, partake in early adopter programs, get help with one of our services, or to get the latest Kenshi news."
            buttons={[
              {
                href: "https://t.me/KenshiTech",
                external: true,
                label: "Telegram",
              },
              {
                href: "https://twitter.com/KenshiTech",
                external: true,
                label: "Twitter",
              },
              {
                href: "/docs/community",
                external: false,
                label: "More",
              },
            ]}
          />
        </Column>
      </Row>
    </Grid>
  </div>

  <div class="getting-started">
    <div class="guides">
      <div class="guide">
        <div class="description">
          <h2>Getting started is easy.</h2>
          <h3>Use VRF to get randomness.</h3>
          <div class="content">
            <p>
              The Kenshi Verifiable Random Function (VRF) oracle can generate
              and verify pseudorandom numbers to be used by smart contracts
              on-chain.
            </p>
            <p>
              Enjoy a responsive VRF solution on BNB Smart Chain, Polygon,
              Fantom and Avalanche chains.
            </p>
          </div>
          <div class="spacer" />
          <div class="spacer" />
          <h4>Learn how to get a random number</h4>
          <div class="buttons">
            <Button
              solid
              href="https://remix.ethereum.org/#url=https://raw.githubusercontent.com/KenshiTech/d20/master/contracts/D20.sol"
              target="_blank"
            >
              Remix <External />
            </Button>
            <Button
              solid
              href="https://github.com/KenshiTech?q=vrf&type=all&language=&sort="
              target="_blank"
            >
              Github <External />
            </Button>
            <Button href="/docs/services/vrf">
              Docs <ChevronRight />
            </Button>
          </div>
        </div>
        <div class="sample">
          <Gist src="pouya-eghbali/2aba0069fa0cd8eded3c0df4d966232e" />
        </div>
      </div>
    </div>
  </div>

  <div class="deep-index">
    <div class="usages">
      <div class="title">
        <h2>All in one blockchain data solution.</h2>
      </div>
      <div class="grid">
        <Usage
          title="Push notifications for the blockchain"
          buttons={[
            {
              href: "https://github.com/KenshiTech?q=reverse-api+OR+graphql&type=public&language=&sort=",
              external: true,
              label: "View examples",
            },
          ]}
        >
          <BellOn />
          <Link />
          <ChartNetwork />
          <div slot="description">
            <p>
              Receive blockchain events directly on your AWS Lambda functions or
              HTTP reverse API endpoints.
            </p>
            <p>Focus on your product, we provide the data.</p>
          </div>
        </Usage>

        <Usage
          title="Never miss an event again"
          buttons={[
            {
              href: "https://blog.kenshi.io/introducing-the-kenshi-deep-blockchain-indexing-services-7fc4b159a946",
              external: true,
              label: "Learn more",
            },
          ]}
        >
          <Bolt />
          <CheckDouble />
          <div slot="description">
            <p>
              Kenshi scans each block multiple times to make sure no event is
              missed.
            </p>
            <p>Reliability for your services is key, you can count on us.</p>
          </div>
        </Usage>

        <Usage
          title="Fully managed, scales to infinity"
          buttons={[
            {
              href: "/docs/services/deep-index",
              external: false,
              label: "Start today",
            },
          ]}
        >
          <LayerPlus />
          <Infinity />
          <div slot="description">
            <p>
              Kenshi is a highly available, managed serverless solution that
              scales to infinity.
            </p>
            <p>
              Never worry about infrastructure again, we've got you covered.
            </p>
          </div>
        </Usage>
      </div>
    </div>
  </div>

  <div class="resources">
    <div class="grid">
      <CardButton
        href="https://github.com/KenshiTech"
        image="/images/pfp/github.png"
        title="Github"
        description="Check Kenshi GitHub repositories"
      />
      <CardButton
        href="https://www.npmjs.com/org/kenshi.io"
        image="/images/pfp/npm.png"
        title="NPM"
        description="See all Kenshi NPM packages"
      />
      <CardButton
        href="https://blog.kenshi.io"
        image="/images/pfp/medium.png"
        title="Medium"
        description="Read Kenshi blog articles"
      />
      <CardButton
        href="https://t.me/KenshiTechDevelopers"
        image="/images/pfp/telegram.png"
        title="Telegram"
        description="Join Kenshi developers chat"
      />
      <CardButton
        href="https://discord.gg/KenshiTech"
        image="/images/pfp/discord.png"
        title="Discord"
        description="Join Kenshi Discord server"
      />
      <CardButton
        href="/docs"
        image="/images/pfp/docs.png"
        title="Docs"
        description="Read Kenshi documentation"
      />
    </div>
    <div class="details">
      <h2>Developer resources</h2>
      <div>
        Find examples, tools and documents for integrating the Kenshi products
        and services into your projects.
      </div>
    </div>
  </div>

  <div class="articles">
    <h2>Latest articles</h2>
    <div class="grid">
      <Article
        image="/images/medium/vrf.png"
        title="Introducing the Kenshi VRF oracles."
        description="VRFs play an important role in the blockchain, as the blockchain lacks the native functionality to securely generate random numbers due to its deterministic nature..."
        href="https://blog.kenshi.io/introducing-the-kenshi-vrf-oracle-be1cbc4779c9"
      />
      <Article
        image="/images/medium/kenshi-deep-index.png"
        title="Introducing the Kenshi Deep Indexing Service."
        description="Information published on the blockchain is publicly available and accessible by anyone who needs it. However, traversing the event logs and searching for specific events is not an easy task..."
        href="https://blog.kenshi.io/introducing-the-kenshi-deep-blockchain-indexing-services-7fc4b159a946"
      />
    </div>
  </div>
</Content>

<Footer />

<style>
  .discover :global(.bx--tile) {
    height: 100%;
  }
  .discover-tile {
    display: flex;
    flex-direction: column;
    gap: 1em;
    height: 100%;
  }
  .discover-tile .body {
    flex: 1;
  }
  .discover-tile .buttons {
    margin-top: 1em;
  }
  .hero > :global(.bx--tile) {
    background-color: #161616;
    color: #f4f4f4;
    background-image: url(/images/ellipse.png);
    background-size: 50%;
    background-position: 120%;
    background-repeat: no-repeat;
  }
  .buttons {
    display: flex;
    gap: 0;
    flex-wrap: wrap;
    width: 100%;
    flex-wrap: wrap;
  }
  .spacer {
    flex: 1;
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

  .start h2 {
    margin-top: 0;
    font-size: 2em;
  }
  .articles {
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

  .getting-started {
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
    grid-template-columns: repeat(2, minmax(300px, 1fr));
    gap: 4em;
  }
  @media screen and (max-width: 1320px) {
    .guide .sample {
      padding: 0.5em;
    }
  }
  @media screen and (max-width: 960px) {
    .guide {
      display: grid;
      grid-template-columns: minmax(300px, 1fr);
      gap: 4em;
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
  .deep-index {
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
</style>
