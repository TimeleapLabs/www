<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Tile } from "carbon-components-svelte";
  import { Button, Content } from "carbon-components-svelte";

  import { ArrowDown, ArrowRight } from "carbon-icons-svelte";
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
  import MailingList from "src/components/MailingList.svelte";
  import DefaultTags from "src/components/seo/DefaultTags.svelte";

  const goToContact = (e) => {
    e.preventDefault();
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  };
</script>

<DefaultTags
  description="Timeleap Blockchain-as-a-Service (BaaS) offers a fully managed solution for deploying custom EVM blockchains at scale. With Timeleap, you get more than just a blockchain platform; you gain access to a suite of optional components designed to enhance your blockchain experience."
  title="Kenshi — Blockchain-as-a-Service"
/>

<!-- Hero -->

<Content class="gap">
  <Grid padding>
    <Row padding>
      <Column padding />
    </Row>
    <Row>
      <Column padding lg={8} md={6} sm={4}>
        <div class="hero flex-column">
          <div>
            <h1>Timeleap Blockchain-as-a-Service</h1>
          </div>

          <div>
            <ExpressiveHeading size={3}>
              <div class="muted">
                Accelerate your business innovation and security with our
                easy-to-integrate Blockchain as a Service platform.
              </div>
            </ExpressiveHeading>
          </div>

          <div class="flex-spacer body-02">
            Experience unparalleled scalability, top-tier security, and seamless
            integration. Empower your enterprise with the future of
            decentralized technology.
          </div>

          <div class="buttons">
            <Button href="#contact" on:click={goToContact} icon={ArrowDown}>
              Request Free Consultation
            </Button>
          </div>
        </div>
      </Column>
      <Column lg={8} md={6} sm={4}>
        <div
          class="hero-image contrast noise"
          style="background-image: url(/images/backgrounds/baas.jpg);"
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
            Timeleap Blockchain-as-a-Service (BaaS) offers a fully managed
            solution for deploying custom EVM blockchains at scale. With
            Timeleap, you get more than just a blockchain platform; you gain
            access to a suite of optional components designed to enhance your
            blockchain experience.
          </div>
          <div class="body-01">
            Our service includes a fully decentralized and non-custodial bridge
            for secure asset transfers, comprehensive indexing for efficient
            data retrieval, reliable oracles for accurate external data
            integration, and a user-friendly crypto wallet for seamless
            transactions.
          </div>
          <div class="buttons">
            <Link href="/wallet" icon={ArrowRight}>Timeleap Wallet</Link>
          </div>
        </div>
      </Column>
    </Row>
  </Grid>

  <Grid padding>
    <Row>
      <Column lg={4}>
        <Tile>
          <div class="scale">
            <code class="numeric">+2,000</code>
            <ExpressiveHeading size={3}>
              Transactions per Second
            </ExpressiveHeading>
          </div>
        </Tile>
      </Column>
      <Column lg={4}>
        <Tile>
          <div class="scale">
            <code class="numeric">~0.9s</code>
            <ExpressiveHeading size={3}>Time to Finality</ExpressiveHeading>
          </div>
        </Tile>
      </Column>
      <Column lg={4}>
        <Tile>
          <div class="scale">
            <code class="numeric">~0.4s</code>
            <ExpressiveHeading size={3}>Average Block Time</ExpressiveHeading>
          </div>
        </Tile>
      </Column>
      <Column lg={4}>
        <Tile>
          <div class="scale">
            <code class="numeric">~60 Gb</code>
            <ExpressiveHeading size={3}>
              Validator Disk Size (100M txns)
            </ExpressiveHeading>
          </div>
        </Tile>
      </Column>
      <Column lg={4}>
        <Tile>
          <div class="scale">
            <code class="numeric">~160 Gb</code>
            <ExpressiveHeading size={3}>
              Archive Disk Size (100M txns)
            </ExpressiveHeading>
          </div>
        </Tile>
      </Column>
    </Row>
  </Grid>

  <Grid padding>
    <Row>
      <Column>
        <ExpressiveHeading size={4}>
          <h2>Integrations</h2>
        </ExpressiveHeading>
      </Column>
    </Row>
    <Row>
      <Column lg={5} md={6} sm={4} class="height-auto">
        <Article
          vertical
          image="/images/backgrounds/wallet.png"
          title="Timeleap Wallet"
          description="Integrate protocol-specific functionality of your chain into a wallet made for your users. Integrate staking, governance, and more into your wallet with ease."
          buttonText="Learn more"
          href="/wallet"
          fullHeight
        />
      </Column>
      <Column lg={5} md={6} sm={4} class="height-auto">
        <Article
          vertical
          image="/images/backgrounds/HSM.png"
          title="Timeleap HSM"
          description="Secure your digital assets and transactions with Timeleap Hardware Security Module Mini. Store and manage your cryptographic keys in a secure environment."
          buttonText="Learn more"
          href="/hsm"
          fullHeight
        />
      </Column>
      <Column lg={5} md={6} sm={4} class="height-auto">
        <Article
          vertical
          image="/images/backgrounds/connected-cubes.jpg"
          title="Unchained"
          description="Decentralized Oracles, indexing, and token bridge services for your blockchain. Unchained is a decentralized network for creating, indexing, validating, analyzing, and processing data."
          buttonText="Learn more"
          href="/hsm"
          fullHeight
        />
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row>
      <Column sm={4} md={4} lg={4}>
        <div class="flex-column padding">
          <ExpressiveHeading size={2}>
            <h3>A blockchain platform you can rely on</h3>
          </ExpressiveHeading>
          <div class="body-01">
            Timeleap BaaS is built on the latest blockchain technology to
            provide you with a secure, scalable, and reliable platform for your
            business. Our platform is designed to meet the needs of enterprises
            and developers who require a robust and flexible blockchain
            solution.
          </div>
          <div class="body-02">
            Whether you're building a decentralized application, creating a
            tokenized asset, or launching a new blockchain network, Timeleap
            BaaS has the tools and services you need to succeed.
          </div>
        </div>
      </Column>
      <Column lg={1} />
      <Column>
        <Accordion>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>EVM Compatible</h5>
              <div>Deploy Custom EVM Blockchains at Scale with Timeleap</div>
            </svelte:fragment>
            <p>
              Timeleap Blockchain-as-a-Service (BaaS) offers full EVM support,
              allowing integration with existing Ethereum-based applications,
              tools, and smart contracts.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Utility for Your Token</h5>
              <div>
                Add Utility to Your Token with Timeleap's Customizable Features
              </div>
            </svelte:fragment>
            <p>
              Your token can be used to pay for gas fees, governance, or
              proof-of-stake on your custom blockchain. Timeleap's customizable
              features allow you to add utility to your token and create a
              unique user experience.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Comprehensive Tooling</h5>
              <div>
                Oracles, Indexing, and Token Bridges for Your Blockchain
              </div>
            </svelte:fragment>
            <p>
              Timeleap BaaS offers a suite of optional components designed to
              enhance your blockchain experience. These components include
              decentralized oracles, comprehensive indexing, and secure token
              bridges.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Non-custodial Bridge</h5>
              <div>Fully Decentralized Bridge for Secure Asset Transfers</div>
            </svelte:fragment>
            <p>
              Timeleap BaaS includes a fully decentralized and non-custodial
              bridge for secure asset transfers between your custom blockchain
              and Ethereum. The bridge ensures secure and reliable asset
              transfers for your users.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>White-label Wallet</h5>
              <div>
                Offer a Custom Wallet Experience to Your Users with Timeleap
              </div>
            </svelte:fragment>
            <p>
              Timeleap BaaS includes a white-label wallet that you can customize
              to match your brand. The wallet allows your users to securely
              store, send, and receive tokens on your custom blockchain.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Battle Tested</h5>
              <div>
                Timeleap BaaS is built on the latest blockchain technology
              </div>
            </svelte:fragment>
            <p>
              Timeleap BaaS is based on Fantom Sonic, a high-performance
              blockchain platform that has been battle-tested in production
              environments. Fantom Sonic is designed to provide fast, secure,
              and reliable blockchain services for enterprises and developers.
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
              <StructuredListCell head>Component</StructuredListCell>
              <StructuredListCell head>Price</StructuredListCell>
              <StructuredListCell head>Notes</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            <StructuredListRow>
              <StructuredListCell noWrap>Chain Setup</StructuredListCell>
              <StructuredListCell>$50,000</StructuredListCell>
              <StructuredListCell>
                Includes deployment of a custom EVM blockchain with 4
                validators, 1 archive node, and a block explorer. Our team will
                guide you through the setup process and provide ongoing support.
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Wallet</StructuredListCell>
              <StructuredListCell>$50,000</StructuredListCell>
              <StructuredListCell>
                Includes deployment of a white-label wallet for your custom
                blockchain. Pricing varies based on customization and features.
                Contact us for a quote.
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Bridge</StructuredListCell>
              <StructuredListCell>$50,000</StructuredListCell>
              <StructuredListCell>
                Includes deployment of a secure asset transfer bridge between
                your custom blockchain and Ethereum. Our team will help you
                configure the bridge and ensure secure asset transfers.
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Infrastructure</StructuredListCell>
              <StructuredListCell>$500+/month/node</StructuredListCell>
              <StructuredListCell>
                Includes hosting, monitoring, and maintenance of your custom
                blockchain infrastructure in Switzerland. Pricing varies based
                on node configuration and usage. Contact us for a quote.
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Indexing & Oracles</StructuredListCell>
              <StructuredListCell>Contact Us</StructuredListCell>
              <StructuredListCell>
                Comprehensive indexing for efficient data retrieval and reliable
                oracles for accurate external data integration. Contact us for
                pricing and availability.
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>
                SLA, Support, and Maintenance
              </StructuredListCell>
              <StructuredListCell>Contact Us</StructuredListCell>
              <StructuredListCell>
                Includes service level agreement, support, and maintenance for
                your custom blockchain. Contact us for pricing and availability.
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Customizations</StructuredListCell>
              <StructuredListCell>Contact Us</StructuredListCell>
              <StructuredListCell>
                Customizations to the Timeleap BaaS platform and wallet are
                available upon request. Contact us for pricing and availability.
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredList>
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row>
      <Column>
        <MailingList topic="baas" buttonText="Sign Up">
          <p class="muted">
            Sign-Up for the latest news and updates on Timeleap
            Blockchain-as-a-Service.
          </p>
        </MailingList>
      </Column>
    </Row>
  </Grid>

  <DeveloperResources />
  <HereToHelp subject="Blockchain-as-a-Service Inquiry" />
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
  .hero {
    gap: 4em;
    padding-top: 8em;
    padding-bottom: 4em;
  }
  .numeric {
    font-size: 3em;
    font-weight: 300;
  }
  .scale {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
    padding: 1em;
  }
</style>
