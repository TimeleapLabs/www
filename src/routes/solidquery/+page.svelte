<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Link } from "carbon-components-svelte";
  import { Button, Content, ClickableTile } from "carbon-components-svelte";
  import { Tabs, Tab, TabContent } from "carbon-components-svelte";
  import { CodeSnippet, ImageLoader } from "carbon-components-svelte";
  import { Accordion, AccordionItem } from "carbon-components-svelte";
  import { OutboundLink } from "carbon-components-svelte";

  import { Dashboard, Book, GameConsole } from "carbon-icons-svelte";
  import { ArrowRight, ArrowDownRight } from "carbon-icons-svelte";

  import DeveloperResources from "src/components/home/DeveloperResources.svelte";
  import HereToHelp from "src/components/home/HereToHelp.svelte";
  import Articles from "src/components/home/Articles.svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";

  import {
    solidqInstall,
    solidqSchema,
    solidqGenerate,
  } from "src/lib/snippets/all";

  import DefaultTags from "src/components/seo/DefaultTags.svelte";
</script>

<DefaultTags
  title="Kenshi — SolidQuery"
  description="The ultimate tool for generating custom, indexed, and decentralized databases from YAML schemas. Transform your data architecture and leverage the power of blockchain technology for increased transparency, security, and scalability in your data management. Try SolidQuery today and discover a whole new way of handling data."
/>
<!-- Hero -->

<Content class="gap">
  <div class="hero">
    <div class="flex-column hero-body">
      <h1>SolidQuery.</h1>
      <span class="blue">
        <ArrowDownRight size={48} />
        <ArrowDownRight size={48} />
        <ArrowDownRight size={48} />
      </span>

      <ExpressiveHeading size={4}>
        Empowering Decentralization with SolidQuery - Your Personal Database
        Generator
      </ExpressiveHeading>

      <p class="body-02">
        Welcome to SolidQuery, the revolutionary tool for creating personalized,
        indexed, and decentralized databases from simple YAML schemas. In an era
        where data sovereignty is crucial, we provide you with the power to take
        control of your own data.
      </p>

      <p class="body-01">
        Our platform allows you to leverage blockchain technology, ensuring your
        data remains secure, transparent, and scalable. With SolidQuery, you
        don't just adapt to the future of data management - you define it.
        Experience the cutting edge of decentralized technology today with
        SolidQuery.
      </p>

      <div class="buttons">
        <Button
          href="https://github.com/KenshiTech/SolidQuery"
          target="_blank"
          icon={Book}
        >
          Documentation
        </Button>
        <Button
          href="/solidquery/playground"
          kind="secondary"
          icon={GameConsole}
        >
          Playground
        </Button>
      </div>
    </div>

    <div
      class="hero-image"
      style="background-image: url(/images/backgrounds/database.jpg);"
    />
  </div>

  <Grid>
    <Row>
      <Column sm={4} md={4} lg={4}>
        <div class="flex-column padding">
          <ExpressiveHeading size={2}>
            <h2>
              SolidQuery Features: Your Gateway to Next-Level Smart Contracts
            </h2>
          </ExpressiveHeading>
          <div class="body-01">
            SolidQuery is a revolutionary tool designed to take blockchain
            application development to the next level. Our platform features an
            intuitive interface, advanced functionalities, and a wide range of
            features that make SolidQuery an indispensable tool in the arsenal
            of any smart contract developer. We're committed to helping you
            leverage the full potential of decentralized databases by providing
            a powerful tool that simplifies contract generation and enhances
            your productivity.
          </div>
        </div>
      </Column>
      <Column lg={1} />
      <Column>
        <Accordion>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Schema-based Contract Generation</h5>
              <div>Simplified Development Process</div>
            </svelte:fragment>
            <p>
              SolidQuery uses a YAML schema to generate decentralized databases,
              simplifying the development process. It allows you to focus on
              business logic while it takes care of the repetitive boilerplate
              code for you.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Efficient Indexing Mechanism</h5>
              <div>Fast and Effective Data Access</div>
            </svelte:fragment>
            <p>
              With SolidQuery, you can efficiently index your data fields,
              leading to faster and more effective data access. Our optimized
              indexing mechanism ensures optimal performance even as your data
              scales.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Decentralized Database Support</h5>
              <div>Boosting Security and Privacy</div>
            </svelte:fragment>
            <p>
              SolidQuery allows you to create decentralized databases. This
              boosts security and privacy, enhancing trust in your applications.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Event-driven Design</h5>
              <div>Real-time Monitoring and Updates</div>
            </svelte:fragment>
            <p>
              SolidQuery automatically generates event emitting code for data
              updates, inserts, and deletes. This makes it easier to build
              real-time applications that react promptly to changes in data.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Open Source and Community-driven</h5>
              <div>A Platform for Developers, by Developers</div>
            </svelte:fragment>
            <p>
              SolidQuery is an open-source project. It thrives on the
              contributions and feedback of its user community, ensuring
              constant improvement and updates according to the needs of
              real-world developers.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Streamlined Integration</h5>
              <div>Flexibility and Compatibility</div>
            </svelte:fragment>
            <p>
              SolidQuery is built with flexibility in mind. It is designed to be
              compatible with other tools in the Ethereum development ecosystem.
              You can easily integrate it into your existing workflow.
            </p>
          </AccordionItem>
        </Accordion>
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row>
      <Column sm={4} lg={5}>
        <div class="flex-column padding use-cases">
          <ExpressiveHeading size={2}>
            <h2>Transforming Blockchain Applications: SolidQuery Use Cases</h2>
          </ExpressiveHeading>
          <div class="body-01">
            Data management and efficient contract generation have been
            long-standing challenges in the blockchain and decentralization
            space. SolidQuery's ability to generate customizable, decentralized
            databases has transformative potential across a range of use cases.
          </div>
          <div class="body-01">
            By enabling rapid development of smart contracts from a predefined
            schema, SolidQuery opens new horizons for businesses looking to
            leverage the power of blockchain.
          </div>
          <div class="spacer" />
          <ImageLoader src="/images/backgrounds/decentralized.jpg" />
        </div>
      </Column>
      <Column lg={1} />
      <Column>
        <Grid noGutter fullWidth padding>
          <Row>
            <Column lg={8}>
              <ClickableTile
                class="full-height"
                href="https://github.com/KenshiTech/SolidQuery"
                target="_blank"
              >
                <div class="use-case">
                  <ExpressiveHeading size={4}>
                    <h3>NFT Marketplaces</h3>
                  </ExpressiveHeading>
                  <div class="body-02">Dynamic Metadata Management</div>
                  <div class="body-01">
                    Non-Fungible Tokens (NFTs) have revolutionized digital
                    ownership, but managing the on-chain metadata for a diverse
                    collection of NFTs can be a daunting task. SolidQuery
                    simplifies this by allowing the generation of custom
                    databases for managing dynamic NFT metadata, making it
                    easier to handle various categories of digital assets.
                  </div>
                  <div class="spacer" />
                  <div class="buttons no-margin">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile
                class="full-height"
                href="https://github.com/KenshiTech/SolidQuery"
                target="_blank"
              >
                <div class="use-case">
                  <ExpressiveHeading size={4}>
                    <h3>On-chain Registries</h3>
                  </ExpressiveHeading>
                  <div class="body-02">
                    Enhanced Efficiency and Transparency
                  </div>
                  <div class="body-01">
                    Whether it's a user profile registry, a product listing, or
                    a real estate property database, SolidQuery enables the
                    creation of custom, on-chain registries. The decentralized
                    nature of these databases offers enhanced security, privacy,
                    and transparency - a huge value proposition in today's
                    digital world.
                  </div>
                  <div class="spacer" />
                  <div class="buttons no-margin">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile
                class="full-height"
                href="https://github.com/KenshiTech/SolidQuery"
                target="_blank"
              >
                <div class="use-case">
                  <ExpressiveHeading size={4}>
                    <h3>Decentralized Autonomous Organizations (DAOs)</h3>
                  </ExpressiveHeading>
                  <div class="body-02">Streamlined Governance</div>
                  <div class="body-01">
                    DAOs are at the forefront of the blockchain revolution, but
                    managing members and proposal information on-chain can be
                    complex. With SolidQuery, DAOs can generate a decentralized
                    database tailored to their governance model, making on-chain
                    management of members and proposals easier and more
                    efficient.
                  </div>
                  <div class="spacer" />
                  <div class="buttons no-margin">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile
                class="full-height"
                href="https://github.com/KenshiTech/SolidQuery"
                target="_blank"
              >
                <div class="use-case">
                  <ExpressiveHeading size={4}>
                    <h3>
                      Decentralized Finance (DeFi): Customized Financial
                      Products
                    </h3>
                  </ExpressiveHeading>
                  <div class="body-01">
                    In the world of DeFi, financial products need to be tailored
                    to the specific needs of the platform and its users.
                    SolidQuery can streamline the process of creating such
                    products by generating custom, decentralized databases for
                    various DeFi protocols.
                  </div>
                  <div class="spacer" />
                  <div class="buttons no-margin">
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
      <Column sm={4} lg={5}>
        <div class="flex-column padding onboarding">
          <ExpressiveHeading size={2}>
            <h2>Getting Started with SolidQuery</h2>
          </ExpressiveHeading>

          <div class="body-01">
            SolidQuery makes building your decentralized database simple and
            hassle-free. Here are the quick steps to jumpstart your development
            process with SolidQuery.
          </div>

          <div class="buttons">
            <Button
              href="https://github.com/KenshiTech/SolidQuery"
              target="_blank"
              icon={Book}
            >
              Documentation
            </Button>
            <Button
              href="/solidquery/playground"
              kind="secondary"
              icon={GameConsole}
            >
              Playground
            </Button>
          </div>
        </div>
      </Column>
      <Column lg={1} />

      <Column>
        <div class="steps">
          <h5>1. Install SolidQuery</h5>
          <CodeSnippet code={solidqInstall} />
          <h5>2. Define Your Schema</h5>
          <CodeSnippet type="multi" code={solidqSchema} />
          <h5>3. Generate Your Database</h5>
          <CodeSnippet code={solidqGenerate} />
        </div>
      </Column>
    </Row>
  </Grid>

  <DeveloperResources />
  <HereToHelp />
  <Articles />
</Content>

<Footer />

<style>
  h1 {
    font-weight: 300;
    font-size: 5rem;
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
  .spacer {
    flex: 1;
  }

  .buttons:not(.no-margin) {
    margin-top: 4em;
  }

  .use-case {
    display: flex;
    flex-direction: column;
    gap: 1em;
    height: 100%;
  }

  .use-case > :global(*:not(.buttons)) {
    padding: 0 1.2rem;
  }
  .use-case :global(h3) {
    margin-top: 1rem;
  }
  .padding {
    padding-bottom: 2em;
  }

  .use-cases {
    padding-bottom: 1em;
  }

  @media (max-width: 760px) {
    .use-cases {
      padding-bottom: 2em;
    }
  }
  .steps h5:not(:nth-of-type(1)) {
    margin-top: 1.5rem;
  }
  .steps h5 {
    margin-bottom: 0.5rem;
  }
</style>
