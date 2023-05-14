<script>
  import Footer from "src/components/Footer.svelte";
  import CardButton from "src/components/CardButton.svelte";

  import { Grid, Row, Column, Tile } from "carbon-components-svelte";
  import { Button, Content, ClickableTile } from "carbon-components-svelte";
  import { Tabs, Tab, TabContent } from "carbon-components-svelte";
  import { CodeSnippet } from "carbon-components-svelte";
  import { ImageLoader, OutboundLink, Link } from "carbon-components-svelte";

  import { Dashboard, Book, IntentRequestCreate } from "carbon-icons-svelte";
  import { Partnership, AnalyticsReference, Email } from "carbon-icons-svelte";
  import { LogoPython, ArrowDown, ArrowDownRight } from "carbon-icons-svelte";
  import { IotPlatform, LogoGithub, Blog, Forum } from "carbon-icons-svelte";

  import Go from "src/icons/Go.svelte";
  import Node from "src/icons/Node.svelte";

  import Fantom from "src/icons/Fantom.svelte";
  import Ethereum from "src/icons/Ethereum.svelte";
  import BnbChain from "src/icons/BNBChain.svelte";
  import Avalanche from "src/icons/Avalanche.svelte";
  import Polygon from "src/icons/Polygon.svelte";
  import Aurora from "src/icons/Aurora.svelte";
  import Bitgert from "src/icons/Bitgert.svelte";
  import Arbitrum from "src/icons/Arbitrum.svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import BlogToc from "src/components/blog/Toc.svelte";

  import Github from "src/icons/Github.svelte";
  import Npm from "src/icons/NPM.svelte";
  import Telegram from "src/icons/Telegram.svelte";
  import Medium from "src/icons/Medium.svelte";
  import Discord from "src/icons/Discord.svelte";
  import Pancake from "src/icons/Pancake.svelte";

  import { theme } from "src/stores/theme";

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
            platform that allows creating and hosting of custom oracles.
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
      <Column lg={4} md={4}>
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
            <Column lg={4} md={4} sm={4}>
              <CardButton
                href="https://forum.kenshi.io"
                icon={Forum}
                title="Forum"
                description="A community of blockchain developers and enthusiasts. Learn, discuss, and share!"
              />
            </Column>
            <Column lg={4} md={4} sm={4}>
              <CardButton
                href="https://github.com/KenshiTech"
                icon={Github}
                title="GitHub"
                description="Find examples for the Kenshi services and contribute to our open-source projects."
              />
            </Column>
            <Column lg={4} md={4} sm={4}>
              <CardButton
                href="https://www.npmjs.com/org/kenshi.io"
                icon={Npm}
                title="NPM"
                description="Check out all the JavaScript and Solidity packages published by Kenshi to NPM."
              />
            </Column>
            <Column lg={4} md={4} sm={4}>
              <CardButton
                href="/blog"
                icon={Blog}
                title="Blog"
                description="Read our blog for use cases, examples and technical articles about Kenshi products."
              />
            </Column>
            <Column lg={4} md={4} sm={4}>
              <CardButton
                href="https://blog.kenshi.io"
                icon={Medium}
                title="Medium"
                description="Subscribe to our Medium publication to get the latest articles in your inbox."
              />
            </Column>
            <Column lg={4} md={4} sm={4}>
              <CardButton
                href="https://t.me/KenshiTech"
                icon={Telegram}
                title="Telegram"
                description="Join our community chat on Telegram to discuss everything Kenshi!"
              />
            </Column>
            <Column lg={4} md={4} sm={4}>
              <CardButton
                href="https://discord.gg/KenshiTech"
                icon={Discord}
                title="Discord"
                description="Join Kenshi Discord server to discuss the tech or get help with the products."
              />
            </Column>
            <Column lg={4} md={4} sm={4}>
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

  <Grid noGutter padding>
    <Row>
      <Column sm={4} md={10} lg={5}>
        <div class="flex-column fast">
          <ExpressiveHeading size={5}>
            <h2>
              <span class="blue">Together,</span> we drive forward!
            </h2>
          </ExpressiveHeading>

          <div class="spacer" />

          <div class="fluid-paragraph-01">
            Join Kenshi's network of partners to enjoy exclusive offers, volume
            discounts, premium support, and closer collaboration.
          </div>

          <div class="spacer" />

          <ExpressiveHeading size={3}>
            <h4>Influencers and Content Creators</h4>
          </ExpressiveHeading>

          <div class="body-compact-02">
            Earn up to 20% commission by joining one of our referral programs.
            Curious? See who is <Link href="/docs/refer">eligible</Link>.
          </div>

          <div class="spacer" />

          <div class="buttons">
            <Button href="/dashboard" icon={Partnership}>
              Contact us for partnership
            </Button>
            <Button href="/refer" kind="secondary" icon={AnalyticsReference}>
              Referral program
            </Button>
          </div>

          <div class="spacer" />
          <div class="spacer" />
        </div>
      </Column>
      <Column sm={4} md={4} lg={6}>
        <div class="flex-column fast">
          <ExpressiveHeading size={4}>
            <h3>Partner to amazing businesses</h3>
          </ExpressiveHeading>
          <p>
            We are on a constant lookout for collaborating with top-notch
            companies and industry leaders.
          </p>
          <div class="spacer" />
          <div class="partners">
            <Grid noGutter padding fullWidth>
              <Row class="center">
                <Column sm={4} lg={8}>
                  <OutboundLink href="https://chainstack.com">
                    <ImageLoader src="/images/partners/chainstack.svg" />
                  </OutboundLink>
                </Column>
                <Column sm={4} lg={8}>
                  <OutboundLink href="https://unstoppabledomains.com/">
                    <ImageLoader src="/images/partners/ud.svg" />
                  </OutboundLink>
                </Column>
                <Column sm={4} lg={8}>
                  <OutboundLink href="https://cls.global/">
                    <ImageLoader src="/images/partners/cls.svg" />
                  </OutboundLink>
                </Column>
                <Column sm={4} lg={8}>
                  <OutboundLink href="https://lazyfi.gg/">
                    <ImageLoader src="/images/partners/lazyfi.{$theme}.svg" />
                  </OutboundLink>
                </Column>
              </Row>
            </Grid>
          </div>
          <div class="spacer" />
          <ExpressiveHeading size={4}>
            <h3>Supported blockchains</h3>
          </ExpressiveHeading>
          <Grid noGutter padding fullWidth>
            <Row class="supported-chains">
              <Column sm={1} lg={2}>
                <OutboundLink href="https://ethereum.org">
                  <ImageLoader src="/images/chains/ethereum.svg" />
                </OutboundLink>
              </Column>
              <Column sm={1} lg={2}>
                <OutboundLink href="https://arbitrum.io">
                  <ImageLoader src="/images/chains/arbitrum.svg" />
                </OutboundLink>
              </Column>
              <Column sm={1} lg={2}>
                <OutboundLink href="https://aurora.dev">
                  <ImageLoader src="/images/chains/aurora.svg" />
                </OutboundLink>
              </Column>
              <Column sm={1} lg={2}>
                <OutboundLink href="https://www.avax.network">
                  <ImageLoader src="/images/chains/avalanche.svg" />
                </OutboundLink>
              </Column>
              <Column sm={1} lg={2}>
                <OutboundLink href="https://www.bnbchain.org">
                  <ImageLoader src="/images/chains/binance.svg" />
                </OutboundLink>
              </Column>
              <Column sm={1} lg={2}>
                <OutboundLink href="https://bitgert.com">
                  <ImageLoader src="/images/chains/bitgert.svg" />
                </OutboundLink>
              </Column>
              <Column sm={1} lg={2}>
                <OutboundLink href="https://fantom.foundation">
                  <ImageLoader src="/images/chains/fantom.svg" />
                </OutboundLink>
              </Column>
              <Column sm={1} lg={2}>
                <OutboundLink href="https://polygon.technology">
                  <ImageLoader src="/images/chains/polygon.svg" />
                </OutboundLink>
              </Column>
            </Row>
          </Grid>
          <div class="spacer" />
          <p>Reach out to us to launch Kenshi services on your blockchain.</p>
          <Grid noGutter padding fullWidth>
            <Row>
              <Column sm={4} lg={6}>
                <Button
                  href="mailto:chains@kenshi.io"
                  icon={IntentRequestCreate}
                >
                  Add Your Chain
                </Button>
              </Column>
            </Row>
          </Grid>
          <div class="spacer" />
          <div class="spacer" />
          <div class="spacer" />
        </div>
      </Column>
      <Column sm={4} md={4} lg={5}>
        <ImageLoader src="/images/backgrounds/partners.jpg" />
      </Column>
    </Row>
  </Grid>

  <Grid noGutter padding>
    <Row>
      <Column>
        <ExpressiveHeading size={2}>
          <h2>Read our latest articles</h2>
        </ExpressiveHeading>
      </Column>
    </Row>
    <Row>
      <Column>
        <BlogToc maxCount={4} lg={8} />
      </Column>
    </Row>
    <Row>
      <Column>
        <Button href="/blog" icon={Blog}>Read all articles</Button>
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
  .partners :global(img) {
    max-height: 48px;
  }
</style>
