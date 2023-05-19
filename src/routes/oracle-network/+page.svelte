<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Link } from "carbon-components-svelte";
  import { Button, Content, ClickableTile } from "carbon-components-svelte";
  import { Tabs, Tab, TabContent } from "carbon-components-svelte";
  import { CodeSnippet, ImageLoader } from "carbon-components-svelte";
  import { Accordion, AccordionItem } from "carbon-components-svelte";
  import { OutboundLink } from "carbon-components-svelte";

  import { Dashboard, Book } from "carbon-icons-svelte";
  import { ArrowRight, ArrowDownRight } from "carbon-icons-svelte";

  import DeveloperResources from "src/components/home/DeveloperResources.svelte";
  import HereToHelp from "src/components/home/HereToHelp.svelte";
  import Articles from "src/components/home/Articles.svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";

  import { simple, vrf, price, weather, balance } from "src/lib/snippets/all";
  import DefaultTags from "src/components/seo/DefaultTags.svelte";
</script>

<DefaultTags
  title="Kenshi — Oracle Network"
  description="Experience an advanced level of customization with Kenshi's Oracle Network. Design and deploy your custom oracles on EVM-based blockchain networks, ensuring a seamless and personalized experience. Enhance your platform's security and trust with our robust solutions."
/>
<!-- Hero -->

<Content class="gap">
  <div class="hero">
    <div class="flex-column hero-body">
      <h1>Oracle Network.</h1>
      <span class="blue">
        <ArrowDownRight size={48} />
        <ArrowDownRight size={48} />
        <ArrowDownRight size={48} />
      </span>

      <ExpressiveHeading size={4}>
        Empower Your Blockchain Solutions with Kenshi Oracle Network
      </ExpressiveHeading>

      <p class="body-02">
        Step into the future of decentralized technology with the Kenshi Oracle
        Network. Designed for robustness and versatility, our Oracle Network
        provides a secure and seamless framework for integrating real-world data
        into your blockchain applications. Experience the difference of
        custom-designed oracles, fault-tolerance, and compatibility with
        EVM-based blockchain networks.
      </p>

      <p class="body-01">
        With the Kenshi Oracle Network, realize your blockchain project's
        potential and redefine what's possible in the digital realm. Discover
        the power of reliable, scalable, and efficient blockchain solutions.
        Welcome to the Kenshi Oracle Network - where blockchain meets the real
        world.
      </p>

      <div class="buttons">
        <Button href="/dashboard" icon={Dashboard}>Dashboard</Button>
        <Button
          href="/docs/services/oracle-network/custom"
          kind="secondary"
          icon={Book}
        >
          Documentation
        </Button>
      </div>
    </div>

    <div class="hero-image ">
      <ImageLoader src="/images/backgrounds/network.jpg" />
    </div>
  </div>

  <Grid>
    <Row>
      <Column sm={4} md={4} lg={4}>
        <div class="flex-column padding">
          <ExpressiveHeading size={2}>
            <h2>Unleash the Power of Custom Oracles</h2>
          </ExpressiveHeading>
          <div class="body-01">
            The Kenshi Oracle Network is designed with the user in mind,
            offering unique features that provide unparalleled benefits for
            blockchain applications. Discover the standout qualities that set
            our Oracle Network apart, empowering you to leverage real-world data
            and drive your blockchain project's success.
          </div>
        </div>
      </Column>
      <Column lg={1} />
      <Column>
        <Accordion>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Custom Oracle Design</h5>
              <div>Tailored Blockchain Solutions</div>
            </svelte:fragment>
            <p>
              Create and deploy your custom oracle using familiar technologies.
              Kenshi Oracle Network lets you develop solutions that meet your
              specific needs, providing a seamless and personalized blockchain
              experience.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Asynchronous and Fault-Tolerant</h5>
              <div>Uninterrupted Performance</div>
            </svelte:fragment>
            <p>
              Our Oracle Network is built to be asynchronous and fault-tolerant,
              ensuring continuous and reliable operation. Experience the peace
              of mind knowing your blockchain solutions can withstand and
              recover from potential disruptions or failures.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Serverless Framework</h5>
              <div>Scalability and Efficiency</div>
            </svelte:fragment>
            <p>
              Kenshi Oracle Network is serverless, meaning it scales
              automatically to meet your needs. Without the need to manage
              servers, you can focus more on your project and less on the
              infrastructure, improving efficiency and reducing operational
              costs.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>EVM-Based Blockchain Compatibility</h5>
              <div>Broad Network Integration</div>
            </svelte:fragment>
            <p>
              Designed to operate with EVM-based blockchain networks, Kenshi
              Oracle Network provides broad compatibility and integration
              potential. Benefit from the flexibility to deploy your oracles on
              Ethereum, Binance Smart Chain, or other EVM-compatible
              blockchains.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Real-World Data Integration</h5>
              <div>Bridging the Digital and Physical Divide</div>
            </svelte:fragment>
            <p>
              Harness the power of real-world data within your blockchain
              solutions. Whether it's integrating weather data or verifying
              asset ownership, our Oracle Network can connect the physical and
              digital realms, enhancing the functionality and scope of your
              projects.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Simplified Oracle Creation</h5>
              <div>User-Friendly Blockchain Development</div>
            </svelte:fragment>
            <p>
              With our easy-to-follow example and comprehensive guide, creating
              your own oracle has never been easier. Kenshi Oracle Network is
              designed to be user-friendly, allowing both seasoned developers
              and blockchain newcomers to bring their ideas to life.
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
            <h2>
              Unlock Infinite Possibilities: Use Cases of Kenshi Oracle Network
            </h2>
          </ExpressiveHeading>
          <div class="body-01">
            The Kenshi Oracle Network is not just a framework; it's a key to
            unlock a multitude of blockchain possibilities. By connecting your
            blockchain applications to real-world data, the Oracle Network paves
            the way for a variety of practical applications.
          </div>
          <div class="body-01">
            These are just a few examples of how the Kenshi Oracle Network can
            be leveraged. With its unique customizability and efficiency, the
            Oracle Network can be utilized in numerous other scenarios, fueling
            innovation in the blockchain space.
          </div>
          <div class="spacer" />
          <ImageLoader src="/images/backgrounds/orb.jpg" />
        </div>
      </Column>
      <Column lg={1} />
      <Column>
        <Grid noGutter fullWidth padding>
          <Row>
            <Column lg={8}>
              <ClickableTile
                class="full-height"
                href="/docs/services/oracle-network/custom"
              >
                <div class="use-case">
                  <ExpressiveHeading size={4}>
                    <h3>Decentralized Finance (DeFi)</h3>
                  </ExpressiveHeading>
                  <div class="body-01">
                    With the Kenshi Oracle Network, DeFi applications can access
                    real-time price feeds and other off-chain data, allowing for
                    more accurate and secure financial products.
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
                href="/docs/services/oracle-network/custom"
              >
                <div class="use-case">
                  <ExpressiveHeading size={4}>
                    <h3>Weather Derivatives</h3>
                  </ExpressiveHeading>
                  <div class="body-01">
                    Harnessing the power of the Oracle Network, platforms can
                    offer weather derivatives based on real-time meteorological
                    data, opening up a new world of climate-related financial
                    products.
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
                href="/docs/services/oracle-network/custom"
              >
                <div class="use-case">
                  <ExpressiveHeading size={4}>
                    <h3>Supply Chain Tracking</h3>
                  </ExpressiveHeading>
                  <div class="body-01">
                    The Oracle Network can enable a blockchain-based supply
                    chain to verify and track goods in real-time, enhancing
                    transparency and accountability.
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
                href="/docs/services/oracle-network/custom"
              >
                <div class="use-case">
                  <ExpressiveHeading size={4}>
                    <h3>Proof of Ownership</h3>
                  </ExpressiveHeading>
                  <div class="body-01">
                    By verifying the ownership of assets on alternative
                    blockchains, the Kenshi Oracle Network enhances security and
                    trust within platforms, leading to safer transactions and
                    more reliable applications.
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
                href="/docs/services/oracle-network/custom"
              >
                <div class="use-case">
                  <ExpressiveHeading size={4}>
                    <h3>Insurance</h3>
                  </ExpressiveHeading>
                  <div class="body-01">
                    Oracle Network can aid in the creation of blockchain-based
                    insurance contracts that trigger payouts based on real-world
                    events, such as natural disasters or flight delays.
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
            <h2>
              Blueprints for Success: Custom Oracle Templates at Your Fingertips
            </h2>
          </ExpressiveHeading>

          <div class="body-01">
            Embarking on your oracle creation journey has never been easier with
            Kenshi Oracle Network's blueprints. We understand that every project
            is unique and requires a tailored approach. That's why we offer a
            selection of custom oracle templates, allowing you to implement your
            oracle solutions with speed and precision.
          </div>

          <div class="body-01">
            Our blueprints serve as a robust starting point, guiding you
            step-by-step through the process and fast-tracking your progress.
            With Kenshi's Oracle Network blueprints, you are empowered to
            create, deploy, and operate oracles that are customized to your
            specific needs, enhancing the functionality and efficiency of your
            blockchain applications.
          </div>

          <div class="buttons">
            <Button href="/dashboard" icon={Dashboard}>Dashboard</Button>
            <Button
              href="/docs/services/oracle-network/custom/blueprints"
              kind="secondary"
              icon={Book}
            >
              Documentation
            </Button>
          </div>
        </div>
      </Column>
      <Column lg={1} />

      <Column>
        <div class="condensed-tabs">
          <Tabs autoWidth>
            <Tab label="Simple" />
            <Tab label="Price" />
            <Tab label="Balance" />
            <Tab label="Weather" />
            <Tab label="VRF" />
            <svelte:fragment slot="content">
              <TabContent>
                <Grid noGutter padding fullWidth>
                  <Row>
                    <Column>
                      <p>
                        A very simple blueprint to start from. Extend this to
                        create your custom functionality.
                      </p>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <div class="condensed-tabs">
                        <Tabs autoWidth>
                          <Tab label="Oracle" />
                          <Tab label="Contract" />
                          <svelte:fragment slot="content">
                            <TabContent>
                              <CodeSnippet
                                type="multi"
                                code={simple.oracle}
                                class="full-width"
                              />
                            </TabContent>
                            <TabContent>
                              <CodeSnippet
                                type="multi"
                                code={simple.contract}
                                class="full-width"
                              />
                            </TabContent>
                          </svelte:fragment>
                        </Tabs>
                      </div>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Link
                        href="/docs/services/oracle-network/custom/blueprints#simple-oracle"
                      >
                        Learn more.
                      </Link>
                    </Column>
                  </Row>
                </Grid>
              </TabContent>
              <TabContent>
                <Grid noGutter padding fullWidth>
                  <Row>
                    <Column>
                      <p>
                        The following blueprint shows how to get price data from <OutboundLink
                          href="https://coingecko.com"
                        >
                          coingecko.com
                        </OutboundLink>.
                      </p>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <div class="condensed-tabs">
                        <Tabs autoWidth>
                          <Tab label="Oracle" />
                          <Tab label="Contract" />
                          <svelte:fragment slot="content">
                            <TabContent>
                              <CodeSnippet
                                type="multi"
                                code={price.oracle}
                                class="full-width"
                              />
                            </TabContent>
                            <TabContent>
                              <CodeSnippet
                                type="multi"
                                code={price.contract}
                                class="full-width"
                              />
                            </TabContent>
                          </svelte:fragment>
                        </Tabs>
                      </div>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Link
                        href="/docs/services/oracle-network/custom/blueprints#price-oracle"
                      >
                        Learn more.
                      </Link>
                    </Column>
                  </Row>
                </Grid>
              </TabContent>
              <TabContent>
                <Grid noGutter padding fullWidth>
                  <Row>
                    <Column>
                      <p>
                        The following blueprint shows how to check if the user
                        owns a specific amount of tokens or NFTs on another
                        chain.
                      </p>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <div class="condensed-tabs">
                        <Tabs autoWidth>
                          <Tab label="Oracle" />
                          <Tab label="Contract" />
                          <svelte:fragment slot="content">
                            <TabContent>
                              <CodeSnippet
                                type="multi"
                                code={balance.oracle}
                                class="full-width"
                              />
                            </TabContent>
                            <TabContent>
                              <CodeSnippet
                                type="multi"
                                code={balance.contract}
                                class="full-width"
                              />
                            </TabContent>
                          </svelte:fragment>
                        </Tabs>
                      </div>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Link
                        href="/docs/services/oracle-network/custom/blueprints#proof-of-balance-oracle"
                      >
                        Learn more.
                      </Link>
                    </Column>
                  </Row>
                </Grid>
              </TabContent>
              <TabContent>
                <Grid noGutter padding fullWidth>
                  <Row>
                    <Column>
                      <p>
                        The following blueprint shows how to get weather data
                        from
                        <OutboundLink href="https://brightsky.dev">
                          brightsky.dev
                        </OutboundLink>.
                      </p>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <div class="condensed-tabs">
                        <Tabs autoWidth>
                          <Tab label="Oracle" />
                          <Tab label="Contract" />
                          <svelte:fragment slot="content">
                            <TabContent>
                              <CodeSnippet
                                type="multi"
                                code={weather.oracle}
                                class="full-width"
                              />
                            </TabContent>
                            <TabContent>
                              <CodeSnippet
                                type="multi"
                                code={weather.contract}
                                class="full-width"
                              />
                            </TabContent>
                          </svelte:fragment>
                        </Tabs>
                      </div>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Link
                        href="/docs/services/oracle-network/custom/blueprints#weather-oracle"
                      >
                        Learn more.
                      </Link>
                    </Column>
                  </Row>
                </Grid>
              </TabContent>
              <TabContent>
                <Grid noGutter padding fullWidth>
                  <Row>
                    <Column>
                      <p>
                        The following blueprint shows how to create your own VRF
                        oracle. This example uses the Kenshi VRF libraries,
                        which implement draft 10 of the IETF ECVRF.
                      </p>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <div class="condensed-tabs">
                        <Tabs autoWidth>
                          <Tab label="Oracle" />
                          <Tab label="Contract" />
                          <svelte:fragment slot="content">
                            <TabContent>
                              <CodeSnippet
                                type="multi"
                                code={vrf.oracle}
                                class="full-width"
                              />
                            </TabContent>
                            <TabContent>
                              <CodeSnippet
                                type="multi"
                                code={vrf.contract}
                                class="full-width"
                              />
                            </TabContent>
                          </svelte:fragment>
                        </Tabs>
                      </div>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Link
                        href="/docs/services/oracle-network/custom/blueprints#vrf-oracle"
                      >
                        Learn more.
                      </Link>
                    </Column>
                  </Row>
                </Grid>
              </TabContent>
            </svelte:fragment>
          </Tabs>
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
</style>
