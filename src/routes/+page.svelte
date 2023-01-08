<script>
  import Footer from "src/components/Footer.svelte";
  // import Button from "src/components/Button.svelte";
  import CardButton from "src/components/CardButton.svelte";
  import Article from "src/components/Article.svelte";

  import { Grid, Row, Column, Tile } from "carbon-components-svelte";
  import { Button, Content, ClickableTile } from "carbon-components-svelte";
  import { Tabs, Tab, TabContent } from "carbon-components-svelte";
  import { CodeSnippet } from "carbon-components-svelte";
  import { ImageLoader, OutboundLink, Link } from "carbon-components-svelte";

  import { Dashboard, Book } from "carbon-icons-svelte";
  import { LogoPython, ArrowDown, ArrowDownRight } from "carbon-icons-svelte";

  import Go from "src/icons/Go.svelte";
  import Node from "src/icons/Node.svelte";

  import Fantom from "src/icons/Fantom.svelte";
  import Ethereum from "src/icons/Ethereum.svelte";
  import BnbChain from "src/icons/BNBChain.svelte";
  import Avalanche from "src/icons/Avalanche.svelte";
  import Polygon from "src/icons/Polygon.svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import Github from "src/icons/Github.svelte";
  import Npm from "src/icons/NPM.svelte";
  import Telegram from "src/icons/Telegram.svelte";
  import Medium from "src/icons/Medium.svelte";
  import Discord from "src/icons/Discord.svelte";

  import {
    apollo,
    mql,
    rapi,
    simple,
    vrf,
    price,
    weather,
    balance,
  } from "src/lib/snippets/all";
</script>

<!-- Hero -->

<Content class="gap">
  <Grid noGutter padding>
    <Row>
      <Column md={10} lg={8}>
        <div class="flex-column">
          <h1>
            <span class="blue">Build smarter</span><br />
            applications on the blockchain
          </h1>
          <span class="blue">
            <ArrowDownRight size={48} />
            <ArrowDownRight size={48} />
            <ArrowDownRight size={48} />
          </span>

          <div class="spacer" />

          <ExpressiveHeading size={4}>
            Build hassle-free on all EVM chains.
          </ExpressiveHeading>

          <ExpressiveHeading size={3}>
            Build faster and better decentralized apps in no-time.
          </ExpressiveHeading>

          <div class="spacer" />

          <div class="blockchains">
            <Button kind="tertiary" icon={Ethereum}>Ethereum</Button>
            <Button kind="tertiary" icon={BnbChain}>BNB Chain</Button>
            <Button kind="tertiary" icon={Avalanche}>Avalanche</Button>
            <Button kind="tertiary" icon={Fantom}>Fantom</Button>
            <Button kind="tertiary" icon={Polygon}>Polygon</Button>
            <Button kind="ghost">+ All EVM Chains</Button>
          </div>

          <div class="spacer" />

          <div class="buttons">
            <Button href="/dashboard" icon={Dashboard}>Start building</Button>
            <Button href="/docs" kind="secondary" icon={Book}>
              Documentation
            </Button>
          </div>

          <div class="spacer" />
        </div>
      </Column>
      <Column md={4} lg={5}>
        <ImageLoader src="/images/backgrounds/vr.jpg" />
      </Column>
      <Column md={4} lg={3}>
        <Grid>
          <Row>
            <Column>
              <Link href="#deep-index" class="no-decoration">
                <div class="head-link">
                  <span>Deep Index</span>
                  <div class="text-normal">
                    Query and index any smart contract
                  </div>
                  <ArrowDown size={32} />
                </div>
              </Link>
            </Column>
          </Row>
          <Row>
            <Column>
              <Link href="#oracle-network" class="no-decoration">
                <div class="head-link">
                  <span>Oracle Network</span>
                  <div class="text-normal">
                    Blazing fast oracle implementations
                  </div>
                  <ArrowDown size={32} />
                </div>
              </Link>
            </Column>
          </Row>
        </Grid>
      </Column>
    </Row>
  </Grid>

  <Grid noGutter padding id="deep-index">
    <Row>
      <Column sm={4} md={4} lg={5}>
        <ImageLoader src="/images/backgrounds/data-flow.jpg" />
      </Column>
      <Column sm={4} md={4} lg={5}>
        <div class="flex-column fast">
          <ExpressiveHeading size={5}>
            <h2>
              Deliver data to your users, <span class="blue">FAST</span>
            </h2>
          </ExpressiveHeading>

          <div class="spacer" />

          <div class="fluid-paragraph-01">
            Kenshi deep index allows retrieving, storing, and indexing
            blockchain events into Kenshi's geographically distributed data
            clusters for faster access.
          </div>

          <div class="spacer" />

          <div class="buttons">
            <Button href="/dashboard" icon={Dashboard}>Subscribe now</Button>
            <Button
              href="/docs/services/deep-index"
              kind="secondary"
              icon={Book}
            >
              Documentation
            </Button>
          </div>

          <div class="spacer" />
          <div class="spacer" />
          <div class="spacer" />
        </div>
      </Column>
      <Column sm={4} md={10} lg={6}>
        <div class="condensed-tabs">
          <Tabs autoWidth>
            <Tab label="GraphQL" />
            <Tab label="MQL" />
            <Tab label="R-API (Webhooks)" />
            <svelte:fragment slot="content">
              <TabContent>
                <Grid noGutter padding fullWidth>
                  <Row>
                    <Column>
                      Use your favorite
                      <OutboundLink href="https://graphql.org/">
                        GraphQL
                      </OutboundLink>
                      client to query the blockchain
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <CodeSnippet
                        type="multi"
                        code={apollo}
                        class="full-width"
                      />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <h5>See more examples on GitHub</h5>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <div class="buttons">
                        <Button
                          kind="secondary"
                          href="https://github.com/KenshiTech/graphql-example-node-axios"
                          icon={Node}>Node Axios</Button
                        >
                        <Button
                          kind="secondary"
                          href="https://github.com/KenshiTech/graphql-example-node-fetch"
                          icon={Node}>Node Fetch</Button
                        >
                        <Button
                          kind="secondary"
                          href="https://github.com/KenshiTech/graphql-example-python"
                          icon={LogoPython}
                        >
                          Python Requests
                        </Button>
                        <Button
                          href="https://github.com/KenshiTech/graphql-example-go"
                          kind="secondary"
                          icon={Go}>Go Shurcool</Button
                        >
                      </div>
                    </Column>
                  </Row>
                </Grid>
              </TabContent>
              <TabContent>
                <Grid noGutter padding fullWidth>
                  <Row>
                    <Column>
                      Use
                      <OutboundLink
                        href="https://www.mongodb.com/docs/manual/tutorial/query-documents/"
                      >
                        MongoDB Query Language
                      </OutboundLink>
                      to run complex queries on the blockchain
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <CodeSnippet type="multi" code={mql} class="full-width" />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <h5>See more examples on GitHub</h5>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <div class="buttons">
                        <Button
                          kind="secondary"
                          href="https://github.com/KenshiTech/mql-example-node-axios"
                          icon={Node}>Node Axios</Button
                        >
                        <Button
                          kind="secondary"
                          href="https://github.com/KenshiTech/mql-example-node-fetch"
                          icon={Node}>Node Fetch</Button
                        >
                        <Button
                          kind="secondary"
                          href="https://github.com/KenshiTech/mql-example-python"
                          icon={LogoPython}
                        >
                          Python Requests
                        </Button>
                        <Button
                          kind="secondary"
                          href="https://github.com/KenshiTech/mql-example-go"
                          icon={Go}>Go net/http</Button
                        >
                      </div>
                    </Column>
                  </Row>
                </Grid>
              </TabContent>
              <TabContent>
                <Grid noGutter padding fullWidth>
                  <Row>
                    <Column>
                      Use
                      <OutboundLink
                        href="https://en.wikipedia.org/wiki/Webhook"
                      >
                        Webhooks
                      </OutboundLink>
                      to get push notifications from the blockchain
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <CodeSnippet
                        type="multi"
                        code={rapi}
                        class="full-width"
                      />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <h5>See more examples on GitHub</h5>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <div class="buttons">
                        <Button
                          kind="secondary"
                          href="https://github.com/KenshiTech/reverse-api-example-node"
                          icon={Node}
                        >
                          Node Express
                        </Button>
                        <Button
                          kind="secondary"
                          href="https://github.com/KenshiTech/reverse-api-example-python"
                          icon={LogoPython}
                        >
                          Python Flask
                        </Button>
                      </div>
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

  <Grid noGutter padding>
    <Row>
      <Column sm={4} md={10} lg={5}>
        <div class="flex-column fast">
          <ExpressiveHeading size={5}>
            <h2>
              <span class="blue">Automate</span> the world, with blockchain
            </h2>
          </ExpressiveHeading>

          <div class="spacer" />

          <div class="fluid-paragraph-01">
            Connect your smart contract to the world! Kenshi R-API can stream
            events from your smart contracts directly to already existing
            automation tools!
          </div>

          <div class="spacer" />
          <div class="spacer" />

          <div class="buttons">
            <Button href="/dashboard" icon={Dashboard}>Subscribe now</Button>
            <Button
              href="/docs/services/deep-index/webhook"
              kind="secondary"
              icon={Book}
            >
              Documentation
            </Button>
          </div>

          <div class="spacer" />
          <div class="spacer" />
        </div>
      </Column>
      <Column sm={4} md={4} lg={6}>
        <div class="flex-column fast">
          <ExpressiveHeading size={4}>
            <h3>Integrate with the tools you already know</h3>
          </ExpressiveHeading>
          <p>
            The Kenshi R-API integrations with existing automation and data flow
            tools.
          </p>
          <div class="spacer" />
          <Grid noGutter padding fullWidth>
            <Row>
              <Column sm={4} lg={8}>
                <ClickableTile
                  href="/docs/services/deep-index/webhook/integrations"
                >
                  <div class="integration">
                    <ImageLoader src="/images/integrations/aws.lambda.svg" />
                    <div>
                      Learn how to integrate the Kenshi Deep Index with AWS
                      <OutboundLink href="https://aws.com">Lambda.</OutboundLink
                      >
                    </div>
                  </div>
                </ClickableTile>
              </Column>
              <Column sm={4} lg={8}>
                <ClickableTile
                  href="/docs/services/deep-index/webhook/integrations"
                >
                  <div class="integration">
                    <ImageLoader src="/images/integrations/zapier.svg" />
                    <div>
                      Learn how to integrate the Kenshi Deep Index with
                      <OutboundLink href="https://zapier.com">
                        Zapier.
                      </OutboundLink>
                    </div>
                  </div>
                </ClickableTile>
              </Column>
              <Column sm={4} lg={8}>
                <ClickableTile
                  href="/docs/services/deep-index/webhook/integrations"
                >
                  <div class="integration">
                    <ImageLoader src="/images/integrations/make.com.png" />
                    <div>
                      Learn how to integrate the Kenshi Deep Index with
                      <OutboundLink href="https://make.com">
                        make.com.
                      </OutboundLink>
                    </div>
                  </div>
                </ClickableTile>
              </Column>
              <Column sm={4} lg={8}>
                <ClickableTile
                  href="/docs/services/deep-index/webhook/integrations"
                >
                  <div class="integration">
                    <ImageLoader src="/images/integrations/ifttt.svg" />
                    <div>
                      Learn how to integrate the Kenshi Deep Index with
                      <OutboundLink href="https://ifttt.com">
                        IFTTT.
                      </OutboundLink>
                    </div>
                  </div>
                </ClickableTile>
              </Column>
              <Column sm={4} lg={8}>
                <ClickableTile
                  href="/docs/services/deep-index/webhook/integrations"
                >
                  <div class="integration">
                    <ImageLoader src="/images/integrations/webhooks.png" />
                    <div>
                      Learn how to integrate the Kenshi Deep Index with
                      <OutboundLink
                        href="https://en.wikipedia.org/wiki/Webhook"
                      >
                        webhooks.
                      </OutboundLink>
                    </div>
                  </div>
                </ClickableTile>
              </Column>
            </Row>
          </Grid>
          <div class="spacer" />
          <div class="spacer" />
        </div>
      </Column>
      <Column sm={4} md={4} lg={5}>
        <ImageLoader src="/images/backgrounds/automate.jpg" />
      </Column>
    </Row>
  </Grid>

  <Grid noGutter padding id="oracle-network">
    <Row>
      <Column sm={4} md={4} lg={5}>
        <div class="flex-column fast">
          <ExpressiveHeading size={5}>
            <h2>
              <span class="blue">Connect</span>
              your smart contract
            </h2>
          </ExpressiveHeading>

          <div class="spacer" />

          <div class="fluid-paragraph-01">
            Kenshi Oracle Network is a high-performance asynchronous oracle
            platform that allows creating and hosting custom oracles.
          </div>

          <div class="spacer" />

          <div class="body-02">
            Kenshi takes care of event sourcing, scheduling, security, error
            handling, and data delivery so you can focus on your business.
          </div>

          <div class="spacer" />

          <div class="buttons">
            <Button href="/dashboard" icon={Dashboard}>Subscribe now</Button>
            <Button
              href="/docs/services/oracle-network/vrf"
              kind="secondary"
              icon={Book}
            >
              Documentation
            </Button>
          </div>

          <div class="spacer" />
        </div>
      </Column>
      <Column sm={4} md={4} lg={5}>
        <ImageLoader src="/images/backgrounds/connect.jpg" />
      </Column>
      <Column sm={4} md={10} lg={6}>
        <div class="flex-column fast">
          <ExpressiveHeading size={5}>
            <h3>Get started</h3>
          </ExpressiveHeading>
          <p>
            Use one of our <Link
              href="/docs/services/oracle-network/custom/blueprints"
            >
              Oracle blueprints
            </Link> or sample codes to get started in no time.
          </p>
          <div class="spacer" />
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
                          The following blueprint shows how to get price data
                          from <OutboundLink href="https://coingecko.com">
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
                          The following blueprint shows how to create your own
                          VRF oracle. This example uses the Kenshi VRF
                          libraries, which implement draft 10 of the IETF ECVRF.
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
          <div class="spacer" />
          <div class="spacer" />
        </div>
      </Column>
    </Row>
  </Grid>

  <Grid noGutter padding>
    <Row>
      <Column>
        <Grid noGutter padding fullWidth class="full-height">
          <Row class="full-height">
            <Column>
              <Tile class="blue-tile full-height">
                <div class="flex-column fast">
                  <ExpressiveHeading size={5}>
                    <h2>Developer resources</h2>
                  </ExpressiveHeading>

                  <div class="spacer" />

                  <div class="fluid-paragraph-01">
                    Find examples, tools and documents for integrating the
                    Kenshi products and services into your projects.
                  </div>

                  <div class="spacer" />
                </div>
              </Tile>
            </Column>
          </Row>
        </Grid>
      </Column>
      <Column lg={12}>
        <Grid noGutterRight padding fullWidth class="full-height no-padding">
          <Row class="full-height">
            <Column>
              <CardButton
                href="https://github.com/KenshiTech"
                icon={Github}
                title="GitHub"
                description="Find examples for the Kenshi services and contribute to our open-source projects."
              />
            </Column>
            <Column lg={4}>
              <CardButton
                href="https://www.npmjs.com/org/kenshi.io"
                icon={Npm}
                title="NPM"
                description="Check out all the JavaScript and Solidity packages published by Kenshi to NPM."
              />
            </Column>
            <Column lg={4}>
              <CardButton
                href="https://blog.kenshi.io"
                icon={Medium}
                title="Medium"
                description="Read our blog for use cases, examples and technical articles about Kenshi products."
              />
            </Column>
            <Column lg={4}>
              <CardButton
                href="https://t.me/KenshiTechDevelopers"
                icon={Telegram}
                title="Telegram"
                description="Join a community of developers using Kenshi products to develop their projects."
              />
            </Column>
            <Column lg={4}>
              <CardButton
                href="https://discord.gg/KenshiTech"
                icon={Discord}
                title="Discord"
                description="Join Kenshi Discord server to discuss the tech or get help with the products."
              />
            </Column>
            <Column lg={4}>
              <CardButton
                href="/docs"
                icon={Book}
                title="Docs"
                description="Read the docs to learn how to integrate the Kenshi products into your projects."
              />
            </Column>
          </Row>
        </Grid>
      </Column>
    </Row>
  </Grid>
</Content>

<Footer />

<style>
  .text-normal {
    font-size: 1rem;
    color: var(--cds-text-01, #161616);
  }
  .head-link {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    font-size: 2rem;
    font-weight: 300;
  }
  .head-link:hover span {
    text-decoration: underline;
  }
  h1 {
    font-weight: 300;
    font-size: 5rem;
  }
  .fast h2,
  .fast h2 span {
    font-weight: 300;
    font-size: 3.25rem;
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
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1em;
    padding-right: 8em;
  }
  @media (max-width: 720px) {
    .blockchains {
      padding-right: 0em;
    }
    .fast {
      padding: 0;
    }
  }
  .integration {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .integration :global(img) {
    height: 40px;
    max-width: 70%;
    width: auto !important;
    align-self: flex-start;
    filter: grayscale(1) brightness(0.5) contrast(1.5);
  }
  :global([theme="g100"]) .integration :global(img) {
    filter: grayscale(1) brightness(0.5) contrast(1.5) invert(1);
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
</style>
