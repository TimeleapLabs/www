<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Tile } from "carbon-components-svelte";
  import { Button, Content, ClickableTile } from "carbon-components-svelte";

  import { Dashboard, Book, ArrowDownRight } from "carbon-icons-svelte";
  import { ArrowRight, Play } from "carbon-icons-svelte";
  import { Accordion, AccordionItem } from "carbon-components-svelte";
  import { OutboundLink } from "carbon-components-svelte";

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
  import Unchained from "src/icons/Unchained.svelte";

  import { theme } from "src/stores/theme";
</script>

<!-- Hero -->

<Content class="gap">
  <div class="hero">
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
          Build faster and better decentralized apps in no-time.
        </ExpressiveHeading>
      </div>

      <div>
        <ExpressiveHeading size={2}>
          Visit our
          <OutboundLink href="https://t.me/kenshi">Telegram chat</OutboundLink>
          to learn more about Kenshi Unchained:<br /> The decentralized network for
          data validation.
        </ExpressiveHeading>
      </div>

      <div class="flex-spacer" />

      <div class="buttons">
        <Button href="/dashboard" icon={Dashboard}>Dashboard</Button>
        <Button href="/docs" kind="secondary" icon={Book}>Documentation</Button>
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

    <div
      class="hero-image"
      style="background-image: url(/images/backgrounds/samurai.jpg);"
    />
  </div>

  <Grid>
    <Row>
      <Column xlg={8} sm={4}>
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
          <div class="buttons">
            <Button href="/unchained" icon={Dashboard}>Testnet stats</Button>
            <Button
              target="_blank"
              href="https://github.com/KenshiTech/unchained/blob/master/quickstart.md"
              icon={Play}
              kind={"secondary"}
            >
              Run a Node
            </Button>
          </div>
        </div>
      </Column>
      <Column lg={1} />
      <Column xlg={7} sm={4}>
        <div class="unchained">
          <Unchained
            textColor={$theme === "white" ? "#000" : "#ccc"}
            color={$theme === "white" ? "#333" : "#000"}
          />
        </div>
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row>
      <Column sm={4} lg={6}>
        <div class="flex-column padding onboarding">
          <ExpressiveHeading size={5}>
            <h2>Easing your Web 3.0 onboarding</h2>
          </ExpressiveHeading>
          <div class="body-01">
            Kenshi offers innovative blockchain solutions for businesses and
            enterprises seeking to harness the power of this transformative
            technology.
          </div>
          <div class="body-01">
            From data indexing and event management to custom oracles and IoT
            integration, Kenshi provides cutting-edge tools designed to
            streamline your operations and unlock new possibilities for your
            business in the blockchain ecosystem.
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
                    Founded in December 2021, Kenshi is a pioneering blockchain
                    technology company headquartered in the heart of
                    Switzerland. With a commitment to innovation and excellence,
                    Kenshi aims to bridge the gap between the traditional web
                    (Web 2.0) and the decentralized future (Web 3.0).
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

  <DeveloperResources />
  <HereToHelp />
  <Articles />
  <Katanas />
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
    background-image: url(/images/backgrounds/matterhorn.jpg);
    background-size: cover;
    background-position: center center;
    height: 100vh;
    display: flex;
    align-items: center;
    min-height: 768px;
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
</style>
