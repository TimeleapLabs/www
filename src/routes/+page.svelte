<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Tile } from "carbon-components-svelte";
  import { Button, Content } from "carbon-components-svelte";

  import { Blockchain, Book, ArrowDownRight } from "carbon-icons-svelte";
  import { AssemblyCluster } from "carbon-icons-svelte";
  import { ArrowRight, Play } from "carbon-icons-svelte";
  import { Accordion, AccordionItem } from "carbon-components-svelte";
  import { Link } from "carbon-components-svelte";
  import { ImageLoader } from "carbon-components-svelte";

  import News from "src/components/News.svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import DeveloperResources from "src/components/home/DeveloperResources.svelte";
  import HereToHelp from "src/components/home/HereToHelp.svelte";
  import Articles from "src/components/home/Articles.svelte";

  import Katanas from "src/components/home/Katanas.svelte";
  import UniSwap from "src/icons/UniSwap.svelte";
  import Product from "src/components/Product.svelte";

  import Article from "src/components/Article.svelte";
  import MailingList from "src/components/MailingList.svelte";
</script>

<!-- Hero -->

<Content class="gap">
  <Grid padding>
    <Row padding>
      <Column padding />
    </Row>
    <Row>
      <Column padding lg={7} md={5} sm={4}>
        <div class="hero flex-column">
          <div>
            <h1>Distributed and Decentralized Computation Solutions.</h1>
            <span class="blue">
              <ArrowDownRight size={48} />
              <ArrowDownRight size={48} />
              <ArrowDownRight size={48} />
            </span>
          </div>

          <div class="flex-spacer">
            <ExpressiveHeading size={3}>
              <div class="muted">
                Build faster and better decentralized apps in no-time.
              </div>
            </ExpressiveHeading>
          </div>

          <div class="buttons">
            <Button href="/docs" icon={Book}>Read the Documentation</Button>
            <Button
              href="https://app.uniswap.org/swap?outputCurrency=0xf1264873436A0771E440E2b28072FAfcC5EEBd01&chain=arbitrum"
              target="_blank"
              icon={UniSwap}
            >
              Get KNS Tokens on UniSwap
            </Button>
          </div>
        </div>
      </Column>
      <Column lg={6} md={5} sm={4}>
        <div
          class="hero-image contrast noise"
          style="background-image: url(/images/backgrounds/three-cubes.jpg);"
        />
      </Column>
      <Column lg={3} md={3} sm={4}>
        <Grid noGutter fullWidth>
          <Row>
            <Column padding>
              <ExpressiveHeading size={3}>
                <h2>Latest Articles</h2>
              </ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column padding>
              <News
                external
                title="A Practical Guide to Unchained"
                href="https://medium.com/@pouyae/a-practical-guide-to-unchained-index-events-and-token-prices-on-any-evm-chain-10074b6f346e"
              >
                Unchained is a decentralized network for creating, indexing,
                validating, analyzing, and processing data.
              </News>
            </Column>
          </Row>
          <Row>
            <Column padding>
              <News
                external
                title="Introducing Unchained"
                href="https://medium.com/@pouyae/introducing-unchained-a-decentralized-network-for-data-processing-and-validation-92d8333eb304"
              >
                Unchained is a decentralized network, just like Ethereum or any
                other blockchain; it's peer-to-peer, has validated and verified
                data, can host smart contracts and plugins...
              </News>
            </Column>
          </Row>
        </Grid>
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row>
      <Column>
        <MailingList topic="newsletter" buttonText="Subscribe">
          <p class="muted">
            Subscribe to our newsletter to stay up-to-date with the latest news
            and updates.
          </p>
        </MailingList>
      </Column>
    </Row>
  </Grid>

  <Grid padding>
    <Row>
      <Column sm={4} lg={8}>
        <div class="flex-column padding onboarding">
          <ExpressiveHeading size={5}>
            <h2>Our cutting-edge technologies</h2>
          </ExpressiveHeading>
        </div>
      </Column>
      <Column sm={4} lg={8}>
        <div class="flex-column padding onboarding">
          <div class="body-02">
            Timeleap offers innovative blockchain and distributed computation
            solutions for businesses and enterprises seeking to harness the
            power of this transformative technology.
          </div>
          <div class="body-01">
            From data indexing and event management to IoT and HSM, Timeleap
            provides cutting-edge tools designed to streamline your operations
            and unlock new possibilities for your business in the blockchain
            ecosystem.
          </div>
          <div class="buttons">
            <Link href="/dashboard" icon={ArrowRight}>
              Go to the Timeleap Dashboard
            </Link>
          </div>
        </div>
      </Column>
    </Row>
    <Row padding>
      <Column sm={4} md={4} lg={4}>
        <Product href="/unchained" icon="unchained" title="Unchained">
          Unchained is a distributed computation platform to run heavy workloads
          such as 3D rendering or training AI models on a decentralized network.
        </Product>
      </Column>
      <Column sm={4} md={4} lg={4}>
        <Product href="/blockchain" icon="baas" title="Blockchain">
          Timeleap's Blockchain-as-a-Service (BaaS) is a comprehensive solution
          for businesses seeking to integrate blockchain technology into their
          operations.
        </Product>
      </Column>
      <Column sm={4} md={4} lg={4}>
        <Product href="/ghostfs" icon="ghostfs" title="GhostFS">
          GhostFS is a distributed remote storage backend that enables
          developers to analyze large data sets efficiently within a distributed
          network.
        </Product>
      </Column>
      <Column sm={4} md={4} lg={4}>
        <Product icon="hsm" title="HSM" href="/hsm">
          HSM, soon to be released, is a hardware security module that enables
          developers to store and manage cryptographic keys in a secure
          environment.
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

  <Grid condensed>
    <Row>
      <Column lg={8} md={6} sm={4}>
        <Tile>
          <div class="unchained flex-column padding">
            <ExpressiveHeading size={5}>
              <h3>
                A Decentralized Network
                <br />
                for Heavy Workloads
              </h3>
            </ExpressiveHeading>
            <p>
              Unchained is a decentralized, federated network for data
              validation. Unchained nodes work to validate data together and are
              rewarded in KNS tokens. The validated data can then be queried by
              consumer in exchange for KNS tokens. This model makes Unchained an
              economically autonomous platform for data validation and exchange.
            </p>
            <div class="buttons margin">
              <Button href="/docs/unchained" icon={Book}>Documentation</Button>
              <Button href="/unchained" icon={Blockchain}>Product Page</Button>
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
        </Tile>
      </Column>
      <Column lg={8} md={6} sm={4}>
        <div
          class="hero-image contrast noise"
          style="background-image: url(/images/backgrounds/robots.jpg);"
        />
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row>
      <Column lg={8} md={6} sm={4} class="height-auto">
        <Article
          vertical
          image="/images/backgrounds/wallet.png"
          title="Timeleap Wallet-as-a-Service"
          description="Timeleap Wallet-as-a-Service is a secure and user-friendly solution for managing your digital assets. With Timeleap Wallet-as-a-Service, you can easily store, send, and receive cryptocurrencies, tokens, and NFTs, all in one place."
          buttonText="Learn more"
          href="/wallet"
        />
      </Column>
      <Column lg={8} md={6} sm={4} class="height-auto">
        <Article
          vertical
          image="/images/backgrounds/HSM.png"
          title="Timeleap Hardware Security Module Mini"
          description="Timeleap Hardware Security Module Mini is a secure and portable device that enables you to store and manage your cryptographic keys in a secure environment. With Timeleap HSM Mini, you can protect your digital assets and secure your transactions."
          buttonText="Learn more"
          href="/hsm"
        />
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row>
      <Column sm={4} md={4} lg={4}>
        <div class="flex-column padding">
          <ExpressiveHeading size={2}>
            <h3>Unleash the Power of Web 3.0 with Kenshi</h3>
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
                      <h3>Reach New Heights</h3>
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
  .unchained {
    display: flex;
    flex-direction: column;
    gap: 4em;
  }
  .unchained .buttons {
    margin-top: 8em;
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
  .hero {
    gap: 4em;
    padding-top: 2em;
    padding-bottom: 2em;
  }
</style>
