<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Tile } from "carbon-components-svelte";
  import { Button, Content } from "carbon-components-svelte";

  import { ArrowUpRight, ArrowRight } from "carbon-icons-svelte";
  import { LogoGithub } from "carbon-icons-svelte";
  import { Accordion, AccordionItem } from "carbon-components-svelte";
  import { Link, OutboundLink } from "carbon-components-svelte";
  import Article from "src/components/Article.svelte";

  import {
    StructuredList,
    StructuredListHead,
    StructuredListRow,
    StructuredListCell,
    StructuredListBody,
  } from "carbon-components-svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import DeveloperResources from "src/components/home/DeveloperResources.svelte";
  import HereToHelp from "src/components/home/HereToHelp.svelte";
  import AdaptiveProductIcon from "src/components/AdaptiveProductIcon.svelte";
  import MailingList from "src/components/MailingList.svelte";
</script>

<!-- Hero -->

<Content class="gap">
  <Grid padding>
    <Row padding>
      <Column padding />
    </Row>
    <Row>
      <Column padding lg={8} md={6} sm={4}>
        <div class="hero flex-column">
          <div class="product-icon">
            <AdaptiveProductIcon
              width="128px"
              product="unchained"
              alt="Unchained"
            />
          </div>

          <div>
            <h1>Timeleap Unchained</h1>
          </div>

          <div class="flex-spacer">
            <ExpressiveHeading size={3}>
              <div class="muted">
                Unchained is a decentralized, federated network for heavy
                computations and data processing. It enables developers to
                leverage the power of distributed computing to analyze large
                data sets and run complex algorithms efficiently.
              </div>
            </ExpressiveHeading>
          </div>

          <div class="flex-spacer body-02">
            <MailingList topic="wallet" buttonText="Sign Up">
              <p class="muted">
                Sign-Up for the latest news and updates on Timeleap Unchained
                distributed network.
              </p>
            </MailingList>
          </div>

          <div class="buttons">
            <Button
              href="https://github.com/TimeleapLabs/unchained"
              icon={LogoGithub}
              target="_blank"
            >
              See Project on GitHub
            </Button>
            <Button href="/unchained/explore" icon={ArrowRight}>Testnet</Button>
          </div>
        </div>
      </Column>
      <Column lg={8} md={6} sm={4}>
        <div
          class="hero-image contrast noise"
          style="background-image: url(/images/backgrounds/connected-nodes.jpg);"
        />
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row>
      <Column sm={4} lg={4}>
        <div class="flex-column padding onboarding">
          <ExpressiveHeading size={5}>
            <h2>Product Overview</h2>
          </ExpressiveHeading>
        </div>
      </Column>
      <Column sm={4} lg={12}>
        <div class="flex-column padding onboarding">
          <div class="body-02">
            Unchained is a distributed network of nodes lending their computing
            power to run heavy computations and data processing tasks. From
            simple tasks like image processing to complex algorithms like
            machine learning models, Unchained can handle it all.
          </div>
          <div class="body-01">
            Unchained is built to integrate with existing technologies and
            platforms. Whether you are looking to index blockchain data, create
            a decentralized Oracle, run machine learning models, or process
            large data sets, Unchained can help you achieve your goals.
          </div>
          <div class="buttons">
            <Link
              href="https://github.com/TimeleapLabs/ghostfs/releases"
              icon={ArrowRight}
            >
              Read the Docs
            </Link>
          </div>
        </div>
      </Column>
    </Row>
  </Grid>

  <Grid padding>
    <Row>
      <Column>
        <ExpressiveHeading size={4}>
          <h2>Unchained Resources</h2>
        </ExpressiveHeading>
      </Column>
    </Row>
    <Row>
      <Column lg={6} sm={4}>
        <Article
          title="A Practical Guide to Unchained: Index Events and Token Prices on Any EVM Chain"
          description="Unchained is a decentralized network for creating, indexing, validating, analyzing, and processing data. It can run cooperatively with multiple peers who join forces and attest to data validity or process it as a grid..."
          href="https://pouyae.medium.com/introducing-unchained-a-decentralized-network-for-data-processing-and-validation-92d8333eb304"
          image="/images/backgrounds/charts.jpg"
          external
          vertical
        />
      </Column>
      <Column lg={6} sm={4}>
        <Article
          title="Introducing Unchained: A Decentralized Network for Data Processing and Validation"
          description="Unchained is a decentralized network, just like Ethereum or any other blockchain; it’s peer-to-peer, has validated and verified data, can host smart contracts and plugins, has an RPC system similar to Ethereum..."
          href="https://pouyae.medium.com/introducing-unchained-a-decentralized-network-for-data-processing-and-validation-92d8333eb304"
          image="/images/backgrounds/data-orb.jpg"
          external
          vertical
        />
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row>
      <Column sm={4} md={4} lg={4}>
        <div class="flex-column padding">
          <ExpressiveHeading size={2}>
            <h3>
              All the benefits of the blockchain, without the limitations.
            </h3>
          </ExpressiveHeading>
          <div class="body-01">
            Unchained is made to be technology-agnostic, meaning it can work
            with any blockchain, programming language, or platform. This
            flexibility enables developers to build powerful applications that
            leverage the benefits of the blockchain without the limitations.
          </div>
          <div class="body-02">
            Disclaimer: Unchained is currently in development and may be subject
            to change. Please refer to the project's GitHub repository for the
            latest updates and information.
          </div>
        </div>
      </Column>
      <Column lg={1} />
      <Column>
        <Accordion>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Data Indexing</h5>
              <div>
                Index any data whether it's on-chain or off-chain, public or
                private
              </div>
            </svelte:fragment>
            <p>
              Unchained is a decentralized network for creating, indexing,
              validating, analyzing, and processing data. It can run
              cooperatively with multiple peers who join forces and attest to
              data validity or process it as a grid. Unchained can index any
              data whether it's on-chain or off-chain, public or private.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Decentralized Oracles</h5>
              <div>
                Create Decentralized Oracles to Fetch Data from External Sources
              </div>
            </svelte:fragment>
            <p>
              Data validated by Unchained can be used to create decentralized
              oracles that fetch data from external sources. This data can be
              used to trigger smart contracts, provide real-time data to
              applications, and more. Unchained enables developers to create
              decentralized oracles that are secure, reliable, and tamper-proof.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Cross-chain Messaging</h5>
              <div>
                Send Messages and Data Between Different Blockchains and
                Networks
              </div>
            </svelte:fragment>
            <p>
              Unchained enables cross-chain messaging, allowing developers to
              send messages and data between different blockchains and networks.
              This feature enables interoperability between different
              blockchains, allowing them to communicate and share data securely
              and efficiently.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Fully Compliant Token Bridges</h5>
              <div>
                Create Token Bridges to Transfer Assets Between Blockchains
              </div>
            </svelte:fragment>
            <p>
              Unchained enables developers to create fully compliant token
              bridges that allow users to transfer assets between different
              blockchains. These token bridges are secure, reliable, and
              tamper-proof, ensuring that assets are transferred safely and
              efficiently.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Heavy Computations</h5>
              <div>Run Heavy Computations and Data Processing Tasks</div>
            </svelte:fragment>
            <p>
              Unchained is a decentralized network of nodes lending their
              computing power to run heavy computations and data processing
              tasks. From simple tasks like image processing to complex
              algorithms like machine learning models, Unchained can handle it
              all.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>API Hosting</h5>
              <div>Host APIs and Serve Data to Applications and Services</div>
            </svelte:fragment>
            <p>
              Unchained enables developers to host APIs and serve data to
              applications and services. This feature allows developers to
              create decentralized APIs that are secure, reliable, and
              tamper-proof. Unchained APIs can be used to provide real-time data
              to applications, trigger smart contracts, and more.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Technology-Agnostic</h5>
              <div>
                Works with Any Blockchain, Programming Language, or Platform
              </div>
            </svelte:fragment>
            <p>
              Unchained is made to be technology-agnostic, meaning it can work
              with any blockchain, programming language, or platform. This
              flexibility enables developers to build powerful applications that
              leverage the benefits of the blockchain without the limitations.
            </p>
          </AccordionItem>
        </Accordion>
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row>
      <Column sm={4} lg={4}>
        <div class="flex-column padding onboarding">
          <ExpressiveHeading size={5}>
            <h2>Pricing</h2>
          </ExpressiveHeading>
        </div>
      </Column>
      <Column sm={4} lg={12}>
        <StructuredList>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>Tier</StructuredListCell>
              <StructuredListCell head>Price</StructuredListCell>
              <StructuredListCell head>Notes</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            <StructuredListRow>
              <StructuredListCell noWrap>Public</StructuredListCell>
              <StructuredListCell>Varies</StructuredListCell>
              <StructuredListCell>
                The KNS utility token is used to pay for storage and processing
                power on the Unchained network. The price of storage and
                processing power is determined by the market and varies based on
                supply and demand.
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Enterprise</StructuredListCell>
              <StructuredListCell>Contact Us</StructuredListCell>
              <StructuredListCell>
                Enterprise customers can contact us to discuss custom pricing
                options and service level agreements. We offer dedicated support
                and tailored solutions to meet the needs of enterprise
                customers.
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Sovereign Networks</StructuredListCell>
              <StructuredListCell>Contact Us</StructuredListCell>
              <StructuredListCell>
                Sovereign Networks are independent networks that run on the
                Unchained platform. They have their own governance, token
                economy, and rules. Contact us to learn more about creating a
                Sovereign Network.
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredList>
      </Column>
    </Row>
  </Grid>

  <DeveloperResources />
  <HereToHelp />
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
  .buttons {
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
    width: 100%;
    flex-wrap: wrap;
  }
  .onboarding .buttons {
    margin-top: 4em;
  }
  .hero {
    gap: 4em;
    padding-top: 8em;
    padding-bottom: 4em;
  }
  .product-icon :global(.wrap) {
    justify-content: start;
  }
</style>
