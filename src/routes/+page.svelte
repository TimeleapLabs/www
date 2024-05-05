<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Tile } from "carbon-components-svelte";
  import { Button, Content, ClickableTile } from "carbon-components-svelte";

  import { Dashboard, Book, ArrowDownRight } from "carbon-icons-svelte";
  import { AssemblyCluster } from "carbon-icons-svelte";
  import { ArrowRight, Play } from "carbon-icons-svelte";
  import { Accordion, AccordionItem } from "carbon-components-svelte";
  import { OutboundLink } from "carbon-components-svelte";
  import { ImageLoader, Tag } from "carbon-components-svelte";

  import Fantom from "src/icons/Fantom.svelte";
  import Ethereum from "src/icons/Ethereum.svelte";
  import BnbChain from "src/icons/BNBChain.svelte";
  import Avalanche from "src/icons/Avalanche.svelte";
  import Polygon from "src/icons/Polygon.svelte";
  import Aurora from "src/icons/Aurora.svelte";
  import Bitgert from "src/icons/Bitgert.svelte";
  import Arbitrum from "src/icons/Arbitrum.svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import DeveloperResources from "src/components/home/DeveloperResources.svelte";
  import HereToHelp from "src/components/home/HereToHelp.svelte";
  import Articles from "src/components/home/Articles.svelte";

  import Katanas from "src/components/home/Katanas.svelte";
  import UniSwap from "src/icons/UniSwap.svelte";
  import AdaptiveProductIcon from "src/components/AdaptiveProductIcon.svelte";
  import Product from "src/components/Product.svelte";

  import X from "src/components/animations/X.svelte";
  import HSM from "src/components/3d/view/HSM.svelte";
</script>

<!-- Hero -->

<Content class="gap">
  <div class="hero">
    <div class="x-wrap">
      <div class="x">
        <X />
      </div>
      <div class="flex-column hero-body">
        <h1>Indexing. Oracles. IoT.</h1>
        <span class="blue">
          <ArrowDownRight size={48} />
          <ArrowDownRight size={48} />
          <ArrowDownRight size={48} />
        </span>

        <div class="flex-spacer" />

        <div>
          <ExpressiveHeading size={4}>
            All the tools you need to build for the blockchain.
          </ExpressiveHeading>

          <ExpressiveHeading size={3}>
            <div class="muted">
              Build faster and better decentralized apps in no-time.
            </div>
          </ExpressiveHeading>
        </div>

        <div>
          <ExpressiveHeading size={2}>
            Visit our
            <OutboundLink href="https://t.me/kenshi">Telegram chat</OutboundLink
            >
            to learn more about Kenshi Unchained:<br /> The decentralized network
            for data validation.
          </ExpressiveHeading>
        </div>

        <div class="flex-spacer" />

        <div class="buttons">
          <Button href="/dashboard" icon={Dashboard}>Dashboard</Button>
          <Button href="/docs" kind="secondary" icon={Book}
            >Documentation</Button
          >
          <Button
            href="https://app.uniswap.org/swap?outputCurrency=0xf1264873436A0771E440E2b28072FAfcC5EEBd01&chain=arbitrum"
            target="_blank"
            kind="secondary"
            icon={UniSwap}
          >
            Token
          </Button>
        </div>

        <div class="flex-spacer" />

        <div class="body-02">Available on 8 blockchains and growing</div>
        <div class="blockchains">
          <div class="blockchain">Ethereum <Ethereum /></div>
          <div class="blockchain">Arbitrum <Arbitrum /></div>
          <div class="blockchain">Aurora <Aurora /></div>
          <div class="blockchain">Avalanche <Avalanche /></div>
          <div class="blockchain">Bitgert <Bitgert /></div>
          <div class="blockchain">BNB Chain <BnbChain /></div>
          <div class="blockchain">Fantom <Fantom /></div>
          <div class="blockchain">Polygon <Polygon /></div>
        </div>

        <div class="flex-spacer" />
      </div>
    </div>

    <div
      class="hero-image contrast noise"
      style="background-image: url(/images/backgrounds/samurai.jpg);"
    />
  </div>

  <Grid>
    <Row>
      <Column sm={4} lg={6}>
        <div class="flex-column padding onboarding">
          <ExpressiveHeading size={5}>
            <h2>Distributed and Decentralized</h2>
          </ExpressiveHeading>
          <div class="body-01">
            Kenshi offers innovative blockchain and distributed computation
            solutions for businesses and enterprises seeking to harness the
            power of this transformative technology.
          </div>
          <div class="body-01">
            From data indexing and event management to IoT and HSM, Kenshi
            provides cutting-edge tools designed to streamline your operations
            and unlock new possibilities for your business in the blockchain
            ecosystem.
          </div>
          <div class="buttons">
            <Button href="/dashboard" icon={Dashboard}>Dashboard</Button>
            <Button href="/docs" kind="secondary" icon={Book}>
              Documentation
            </Button>
          </div>
        </div>
      </Column>
      <Column lg={1} />
      <Column>
        <Grid noGutter fullWidth padding>
          <Row>
            <Column lg={8}>
              <ClickableTile href="/deep-index" class="full-height">
                <div class="product">
                  <ExpressiveHeading size={4}>
                    <h3>Indexing.</h3>
                  </ExpressiveHeading>
                  <div class="body-02">
                    Experience the power of real-time blockchain indexing with
                    Kenshi's Deep Index.
                  </div>
                  <div class="body-01">
                    Our efficient, cost-effective solution supports multiple
                    query languages, transforming data access for seamless Web
                    3.0 integration.
                  </div>
                  <div class="buttons">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile href="/oracle-network" class="full-height">
                <div class="product">
                  <ExpressiveHeading size={4}>
                    <h3>Oracles.</h3>
                  </ExpressiveHeading>
                  <div class="body-02">
                    Craft custom oracles with ease on the Kenshi Oracle Network.
                  </div>
                  <div class="body-01">
                    Tap into the full potential of blockchain technology with
                    our user-friendly and flexible ecosystem. Drive innovation
                    and growth in the Web 3.0 era.
                  </div>
                  <div class="buttons">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile href="/iot-sdk" class="full-height">
                <div class="product">
                  <ExpressiveHeading size={4}>
                    <h3>IoT.</h3>
                  </ExpressiveHeading>
                  <div class="body-02">
                    Bridge the gap between IoT and blockchain with Kenshi's IoT
                    SDK.
                  </div>
                  <div class="body-01">
                    Enable bidirectional communication and seamless integration
                    for innovative IoT applications. Broaden the horizons of Web
                    3.0 technologies.
                  </div>
                  <div class="buttons">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile href="/solidquery" class="full-height">
                <div class="product">
                  <ExpressiveHeading size={4}>
                    <h3>SolidQuery.</h3>
                  </ExpressiveHeading>
                  <div class="body-02">
                    Your Personalized Decentralized Database Generator.
                  </div>
                  <div class="body-01">
                    SolidQuery transforms your data schema into a custom
                    decentralized database. Experience streamlined CRUD
                    operations, on-chain indexing, and personalized data
                    management.
                  </div>
                  <div class="buttons">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
          </Row>
        </Grid>
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row>
      <Column>
        <ExpressiveHeading size={4}>
          <h2 class="highlight">Product Highlights</h2>
        </ExpressiveHeading>
      </Column>
    </Row>
    <Row padding>
      <Column sm={4} md={4} lg={4}>
        <Product icon="unchained" title="Unchained">
          Unchained is a distributed computation platform to run heavy workloads
          such as 3D rendering or training AI models on a decentralized network.
        </Product>
      </Column>
      <Column sm={4} md={4} lg={4}>
        <Product icon="ghostfs" title="GhostFS" tags={["Coming soon"]}>
          GhostFS is a distributed remote storage backend that enables
          developers to analyze large data sets efficiently within a distributed
          network.
        </Product>
      </Column>
      <Column sm={4} md={4} lg={4}>
        <Product icon="tachyon" title="Tachyon" tags={["Coming soon"]}>
          Tachyon (formerly known as Clio) is a programming language targeting
          distributed systems.
        </Product>
      </Column>
      <Column sm={4} md={4} lg={4}>
        <Product icon="sia" title="Sia" tags={["Coming soon"]}>
          Sia is a binary serialization format that is both fast and compact. It
          is specifically designed for communication between distributed
          systems.
        </Product>
      </Column>
      <Column sm={4} md={4} lg={4}>
        <Product icon="hsm" title="HSM" tags={["Coming soon"]}>
          HSM, soon to be released, is a hardware security module that enables
          developers to store and manage cryptographic keys in a secure
          environment.
        </Product>
      </Column>
      <Column sm={4} md={4} lg={4}>
        <Product icon="oracle.network" title="Oracle Network">
          Oracle Network, soon to be merged with Unchained, is a platform that
          enables developers to build their own Oracles and connect Web2 and
          Web3 applications.
        </Product>
      </Column>
      <Column sm={4} md={4} lg={4}>
        <Product icon="deep.index" title="Deep Index">
          Deep Index, soon to be merged with Unchained, is a platform that
          enables developers to index and query data from the blockchain.
        </Product>
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row padding>
      <Column xlg={12} md={6} sm={4}>
        <div class="description flex-column padding">
          <ExpressiveHeading size={4}>
            Introducing Kenshi Unchained
          </ExpressiveHeading>
          <p>
            Unchained is a decentralized, peer-to-peer network for data
            validation. Unchained nodes work to validate data together and are
            rewarded in KNS tokens. The validated data can then be queried by
            consumer in exchange for KNS tokens. This model makes Unchained an
            economically autonomous platform for data validation and exchange.
          </p>
          <div class="buttons margin">
            <Button href="/docs/unchained" icon={Book}>Documentation</Button>
            <Button href="/unchained" icon={Dashboard}>Testnet Stats</Button>
            <Button
              target="_blank"
              href="https://github.com/TimeleapLabs/unchained/blob/master/quickstart.md"
              icon={Play}
              kind={"secondary"}
            >
              Run a Node
            </Button>
          </div>
        </div>
      </Column>
      <Column xlg={4} md={2} sm={4}>
        <AdaptiveProductIcon
          product="unchained"
          alt="Kenshi Unchained"
          width={"240px"}
        />
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row>
      <Column lg={8} md={6} sm={4}>
        <Tile class="noise no-padding">
          <div class="hsm">
            <HSM />
          </div>
        </Tile>
      </Column>
      <Column lg={8} md={6} sm={4}>
        <div class="flex-column padding full-height">
          <ExpressiveHeading size={4}>
            <h2>Hardware Security Module (HSM)</h2>
          </ExpressiveHeading>
          <div class="body-01">
            The Hardware Security Module (HSM) is a secure, tamper-resistant
            device that safeguards and manages cryptographic keys. It provides
            secure key storage and cryptographic operations, ensuring the
            integrity and confidentiality of your data.
          </div>
          <div class="body-01">
            With Timeleap HSM, you can securely store and manage your
            cryptographic keys, API keys, and other secrets; protecting your
            data from unauthorized access and ensuring the security of your
            applications.
          </div>
          <div class="spacer" />
          <div class="tags">
            <Tag>Coming soon</Tag>
          </div>
        </div>
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row>
      <Column sm={4} md={4} lg={4}>
        <div class="flex-column padding">
          <ExpressiveHeading size={2}>
            <h2>Unleash the Power of Web 3.0 with Kenshi</h2>
          </ExpressiveHeading>
          <div class="body-01">
            Transform your digital experience with Kenshi's comprehensive suite
            of blockchain tools.
          </div>
          <div class="body-01">
            Our platform empowers you to craft custom solutions, bridge IoT and
            blockchain, and access real-time data with ease. Experience the
            seamless interaction of Web 2.0 and Web 3.0 data, fueling innovation
            and growth for your business in the Web 3.0 era.
          </div>
        </div>
      </Column>
      <Column lg={1} />
      <Column>
        <Accordion>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Superior Data Accessibility</h5>
              <div>Real-time Blockchain Indexing</div>
            </svelte:fragment>
            <p>
              Kenshi's Deep Index offers real-time blockchain indexing, ensuring
              efficient and cost-effective access to data. Seamlessly integrate
              with Web 3.0, transforming your data handling experience.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Customizable Oracles</h5>
              <div>Low-Code Oracle Platform</div>
            </svelte:fragment>
            <p>
              With Kenshi's Oracle Network, create custom oracles tailored to
              your specific requirements. Harness the full potential of
              blockchain technology, driving innovation and growth in the Web
              3.0 era.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>IoT Integration</h5>
              <div>On 200+ Development Boards</div>
            </svelte:fragment>
            <p>
              Our IoT SDK bridges the gap between Internet of Things and
              blockchain. Enable bidirectional communication for effortless
              integration and unlock new possibilities for IoT applications.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Versatile and User-Friendly</h5>
              <div>Combining Flexibility with Ease of Use</div>
            </svelte:fragment>
            <p>
              Kenshi's platform is designed to be intuitive and user-friendly,
              making it easier to craft tailor-made blockchain solutions.
              Experience the simplicity of Software as a Service (SaaS) and the
              adaptability of Infrastructure as a Service/Platform as a Service
              (IaaS/PaaS).
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Real-time Event Notifications</h5>
              <div>Push Notifications for the Blockchain</div>
            </svelte:fragment>
            <p>
              Stay ahead with real-time data access and event notifications.
              Respond to changes and updates as they happen, keeping your
              operations agile and proactive.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Multi-Language Support</h5>
              <div>Query With Multiple Languages</div>
            </svelte:fragment>
            <p>
              Kenshi's Deep Index is compatible with multiple query languages,
              ensuring smooth and hassle-free integration.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Fully Managed Service</h5>
              <div>Focus on Your Business Use Case</div>
            </svelte:fragment>
            <p>
              We provide a fully managed service to ensure your experience with
              Kenshi is hassle-free, allowing you to focus on what matters most
              - growing your business.
            </p>
          </AccordionItem>
        </Accordion>
      </Column>
    </Row>
  </Grid>

  <div class="matterhorn">
    <div class="background contrast noise" />
    <div class="content">
      <Grid padding>
        <Row>
          <Column lg={6}>
            <Tile class="padding">
              <Grid noGutter padding>
                <Row>
                  <Column>
                    <ExpressiveHeading size={4}>
                      <h3>About</h3>
                    </ExpressiveHeading>
                  </Column>
                </Row>
                <Row>
                  <Column lg={14}>
                    <p>
                      Founded in December 2021, Kenshi is a pioneering
                      blockchain technology company headquartered in the heart
                      of Switzerland, with a commitment to innovation and
                      excellence.
                    </p>
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <p>
                      As of April 2024, Kenshi has rebranded and registered as
                      Timeleap SA, a company dedicated to providing cutting-edge
                      blockchain solutions for businesses and enterprises.
                    </p>
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <div class="buttons">
                      <Button
                        href="/docs/kenshi"
                        kind="secondary"
                        icon={ArrowRight}
                      >
                        Learn more
                      </Button>
                    </div>
                  </Column>
                </Row>
              </Grid>
            </Tile>
          </Column>
        </Row>
      </Grid>
    </div>
  </div>

  <Grid>
    <Row>
      <Column>
        <div class="stake">
          <Tile href="/stake">
            <div class="body">
              <div class="text">
                Looking for KNS staking? Learn more and stake here.
              </div>
              <Button href="/stake" icon={AssemblyCluster}>Stake</Button>
            </div>
          </Tile>
          <div class="image contrast noise">
            <ImageLoader
              src="/images/backgrounds/cubes.png"
              alt="KNS staking"
            />
          </div>
        </div>
      </Column>
    </Row>
  </Grid>

  <Katanas />
  <DeveloperResources />
  <HereToHelp />
  <Articles />
</Content>

<Footer />

<style>
  .padding {
    padding: 1em;
    box-sizing: border-box;
  }

  h1 {
    font-weight: 300;
    font-size: 4.5rem;
  }

  @media (max-width: 760px) {
    h1 {
      font-size: 2.5rem;
    }
  }
  .blue {
    color: var(--cds-interactive-01);
  }
  .blockchains {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
    gap: 1em 2em;
    padding-right: 8em;
    margin-top: 1em;
  }
  .blockchain {
    display: grid;
    grid-template-columns: 1fr 16px;
    fill: #fff;
  }
  @media (max-width: 720px) {
    .blockchains {
      padding-right: 0em;
    }
  }

  .buttons {
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
    width: 100%;
    flex-wrap: wrap;
  }

  .buttons.margin {
    margin-top: 1em;
  }

  .product {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .product > :global(*:not(.buttons)) {
    padding: 0 1.2rem;
  }
  .product :global(h3) {
    margin-top: 1rem;
  }
  .matterhorn {
    height: 100vh;
    min-height: 768px;
    position: relative;
    display: flex;
    align-items: center;
  }
  .matterhorn .background {
    background-image: url(/images/backgrounds/matterhorn.jpg);
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .matterhorn .content {
    z-index: 5;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .onboarding .buttons {
    margin-top: 4em;
  }
  .description {
    display: flex;
    height: 100%;
  }
  .description p {
    flex: 1;
  }
  .stake {
    display: grid;
    grid-template-columns: 5fr 7fr;
  }
  @media (max-width: 1440px) {
    .stake {
      grid-template-columns: 1fr 1fr;
    }
  }
  .stake .body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 1em 2em;
    box-sizing: border-box;
    gap: 1em;
    line-height: 1.2em;
  }
  @media (max-width: 640px) {
    .stake {
      grid-template-columns: 1fr;
    }
    .stake .body {
      padding: 1em;
    }
  }
  .stake .body .text {
    flex: 1;
  }
  .stake .image :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .x {
    position: absolute;
    opacity: 0.2;
    mask-image: radial-gradient(ellipse at center, transparent 50%, black 100%);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 0;
  }
  .x-wrap {
    position: relative;
  }
  .hero-body {
    z-index: 1;
    position: relative;
  }
  h2.highlight {
    margin-bottom: 1em;
  }
  .hsm {
    height: 360px;
  }
  .spacer {
    flex: 1;
  }
</style>
