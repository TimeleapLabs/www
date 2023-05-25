<script>
  import {
    Header,
    HeaderUtilities,
    HeaderAction,
    HeaderPanelLinks,
    HeaderPanelDivider,
    HeaderPanelLink,
    HeaderNav,
    HeaderNavItem,
    SideNav,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,
    SideNavLink,
    SkipToContent,
    Grid,
    Column,
    Row,
    ClickableTile,
    Link,
  } from "carbon-components-svelte";

  import Kenshi from "src/icons/Kenshi.svelte";

  import FullWidthHeaderNavMenu from "src/components/carbon/FullWidthHeaderNavMenu.svelte";
  import VerticalTabs from "src/components/carbon/VerticalTabs.svelte";
  import ThemeSwitcher from "src/components/carbon/ThemeSwitcher.svelte";

  import { UserAvatarFilledAlt, Launch } from "carbon-icons-svelte";

  import ConnectButton from "src/components/ConnectButton.svelte";

  import "carbon-components-svelte/css/all.css";

  let theme = "white"; // "white" | "g10" | "g80" | "g90" | "g100"
  $: if (typeof document !== "undefined") {
    document.documentElement.setAttribute("theme", theme);
  }

  let isSideNavOpen = false;
  let isOpen1 = false;
  let isOpen2 = false;
</script>

<Header
  _company="Kenshi"
  _platformName="Kenshi"
  persistentHamburgerMenu={true}
  href="/"
  bind:isSideNavOpen
>
  <span slot="platform" class="logo">
    <Kenshi size={24} fill={"#fff"} />
  </span>
  <HeaderNav>
    <HeaderNavItem href="/" text="Kenshi" />
    <HeaderNavItem href="/dashboard" text="Dashboard" />
    <HeaderNavItem href="/docs" text="Docs" />
    <!-- <HeaderNavItem href="/" text="Link 2" /> -->
    <FullWidthHeaderNavMenu text="Products">
      <VerticalTabs
        tabs={["Deep Index", "Oracle Network", "IoT SDK", "SolidQuery"]}
      >
        <div class="vertical-tab">
          <Grid padding>
            <Row>
              <Column>
                <h3>Deep Index</h3>
              </Column>
            </Row>
            <Row>
              <Column>
                Kenshi Deep Index is a powerful blockchain data indexing and
                processing solution, providing full-stack data consumption for
                efficient event management on the blockchain.
              </Column>
            </Row>
            <Row>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="/docs/services/deep-index/sync">
                  <h4>Deep Index Sync</h4>
                  <div class="body">
                    Seamlessly synchronize and index events emitted by your
                    smart contracts, enabling rapid blockchain data querying and
                    analysis.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="/docs/services/deep-index/graphql">
                  <h4>Deep Index GraphQL</h4>
                  <div class="body">
                    Utilize GraphQL for efficient querying of events emitted
                    from your smart contracts, streamlining data retrieval and
                    analysis.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="/docs/services/deep-index/mql">
                  <h4>Deep Index MQL</h4>
                  <div class="body">
                    Leverage MongoDB Query Language to execute intricate
                    searches and analysis on blockchain data, enhancing the
                    depth and flexibility of your queries.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="/docs/services/deep-index/webhook">
                  <h4>Deep Index R-API</h4>
                  <div class="body">
                    Utilize webhooks to receive real-time push notifications
                    from the blockchain directly to your HTTP endpoints, keeping
                    you informed and up-to-date.
                  </div>
                </ClickableTile>
              </Column>
            </Row>
          </Grid>
        </div>
        <div class="vertical-tab">
          <Grid padding>
            <Row>
              <Column>
                <h3>Oracle Network</h3>
              </Column>
            </Row>
            <Row>
              <Column>
                Kenshi Oracle Network is an asynchronous, fault-tolerant, and
                serverless framework designed for creating, deploying, and
                operating custom oracles on EVM-based blockchain networks.
              </Column>
            </Row>
            <Row>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="/dashboard/oracle-network/custom">
                  <h4>Custom Oracle</h4>
                  <div class="body">
                    Design and deploy your custom oracle using familiar
                    technologies, providing a seamless and personalized
                    experience.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile
                  href="/docs/services/oracle-network/custom/blueprints#simple-oracle"
                >
                  <h4>Simple oracle</h4>
                  <div class="body">
                    Discover how to create your own oracle with an
                    easy-to-follow example, guiding you through the process step
                    by step.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile
                  href="/docs/services/oracle-network/custom/blueprints#weather-oracle"
                >
                  <h4>Weather</h4>
                  <div class="body">
                    Need weather data on the blockchain? Begin your journey with
                    our comprehensive guide to integrating meteorological
                    information.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile
                  href="/docs/services/oracle-network/custom/blueprints#proof-of-balance-oracle"
                >
                  <h4>Proof of Balance</h4>
                  <div class="body">
                    Verify your users' ownership of specific assets on
                    alternative blockchains, enhancing security and trust within
                    your platform.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile
                  href="/docs/services/oracle-network/custom/blueprints#price-oracle"
                >
                  <h4>Price Feed</h4>
                  <div class="body">
                    Discover the process of creating and deploying your custom
                    price feed oracle, enabling accurate and up-to-date market
                    data retrieval.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile
                  href="/docs/services/oracle-network/custom/blueprints#vrf-oracle"
                >
                  <h4>VRF</h4>
                  <div class="body">
                    In search of randomness on the blockchain? Explore the steps
                    to deploy your dedicated VRF oracle, ensuring unbiased and
                    unpredictable results for your applications.
                  </div>
                </ClickableTile>
              </Column>
            </Row>
          </Grid>
        </div>
        <div class="vertical-tab">
          <Grid padding>
            <Row>
              <Column>
                <h3>Blockchain IoT SDK</h3>
              </Column>
            </Row>
            <Row>
              <Column>
                The Kenshi Blockchain IoT SDK enables embedded devices to
                receive and process blockchain events efficiently, providing
                seamless integration for IoT and connected systems.
              </Column>
            </Row>
            <Row>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="/docs/iot/install">
                  <h4>Arduino IDE</h4>
                  <div class="body">
                    Utilize the Kenshi Blockchain IoT SDK with ESP32 and Arduino
                    boards, leveraging the Arduino IDE for streamlined
                    development and integration on connected devices.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile
                  href="https://github.com/KenshiTech/iot-sdk/tree/master/SDK/Arduino/examples/blinky32"
                  target="_blank"
                >
                  <h4 class="external">
                    <span>ESP32 Example</span>
                    <Launch />
                  </h4>
                  <div class="body">
                    Discover the process of utilizing the Kenshi Blockchain IoT
                    SDK for Arduino to efficiently receive blockchain events on
                    ESP32 devices, enhancing your embedded systems capabilities.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile
                  href="https://github.com/KenshiTech/iot-sdk/tree/master/SDK/Arduino/examples/blinky"
                  target="_blank"
                >
                  <h4 class="external">
                    <span>Arduino MKR WiFi Example</span>
                    <Launch />
                  </h4>
                  <div class="body">
                    Explore the steps to effectively employ the Kenshi
                    Blockchain IoT SDK for receiving blockchain events on
                    Arduino MKR WiFi boards, expanding the functionality of your
                    connected devices.
                  </div>
                </ClickableTile>
              </Column>
            </Row>
          </Grid>
        </div>
        <div class="vertical-tab">
          <Grid padding>
            <Row>
              <Column>
                <h3>SolidQuery</h3>
              </Column>
            </Row>
            <Row>
              <Column>
                Unleash the power of blockchain data management with SolidQuery.
                Discover our product, explore the playground, and start building
                sophisticated decentralized databases tailored to your needs.
              </Column>
            </Row>
            <Row>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="/docs/iot/install">
                  <h4>SolidQuery</h4>
                  <div class="body">
                    Dive into the vast functionality of SolidQuery. Learn about
                    its innovative decentralized database generation
                    capabilities, view its potential use cases, and start
                    building your own blockchain data solutions.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile
                  href="https://github.com/KenshiTech/iot-sdk/tree/master/SDK/Arduino/examples/blinky32"
                  target="_blank"
                >
                  <h4 class="external">
                    <span>SolidQuery Playground</span>
                    <Launch />
                  </h4>
                  <div class="body">
                    Engage with SolidQuery's playground. Experiment with
                    real-time generation of Solidity contracts from your data
                    schema. Witness firsthand how SolidQuery can revolutionize
                    your blockchain projects.
                  </div>
                </ClickableTile>
              </Column>
            </Row>
          </Grid>
        </div>
      </VerticalTabs>
    </FullWidthHeaderNavMenu>
    <FullWidthHeaderNavMenu text="Developers">
      <VerticalTabs tabs={["Developer Resources"]}>
        <div class="vertical-tab">
          <Grid padding>
            <Row>
              <Column>
                <h3>Developer Resources</h3>
              </Column>
            </Row>
            <Row>
              <Column>
                Kenshi provides comprehensive documentation for all of its
                products, with examples implemented in various languages. Don't
                hesitate to join one of our communities if you have any
                questions.
              </Column>
            </Row>
            <Row>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="/dashboard">
                  <h4>Dashboard</h4>
                  <div class="body">
                    Kenshi Dashboard is the all-in-one solution for subscribing
                    to or managing the Kenshi services.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="/docs">
                  <h4>Documentation</h4>
                  <div class="body">
                    Get more information about Kenshi products or learn how to
                    integrate them into your projects.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile target="_blank" href="https://forum.kenshi.io">
                  <h4 class="external"><span>Forum</span><Launch /></h4>
                  <div class="body">
                    A community of blockchain developers and enthusiasts. Learn,
                    discuss, and share!
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="/blog">
                  <h4>Blog</h4>
                  <div class="body">
                    Latest news about Kenshi, as well as technical articles
                    about Kenshi products.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile
                  href="https://github.com/KenshiTech"
                  target="_blank"
                >
                  <h4 class="external"><span>GitHub</span><Launch /></h4>
                  <div class="body">
                    Check Kenshi's public software repositories for sample codes
                    and other useful utilities.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="https://blog.kenshi.io/" target="_blank">
                  <h4 class="external"><span>Medium</span><Launch /></h4>
                  <div class="body">
                    Subscribe to and read our latest news and tech articles on
                    Medium.com!
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="https://t.me/KenshiTech" target="_blank">
                  <h4 class="external">
                    <span>Telegram</span><Launch />
                  </h4>
                  <div class="body">
                    Join our community chat on Telegram to get help integrating
                    our products into your projects.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile
                  href="https://discord.gg/KenshiTech"
                  target="_blank"
                >
                  <h4 class="external"><span>Discord</span><Launch /></h4>
                  <div class="body">
                    Join our community on Discord to get help integrating our
                    products into your projects.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile
                  href="https://www.npmjs.com/org/kenshi.io"
                  target="_blank"
                >
                  <h4 class="external"><span>NPM</span><Launch /></h4>
                  <div class="body">
                    Kenshi publishes Solidity and Node.js libraries to help you
                    integrate the Kenshi services.
                  </div>
                </ClickableTile>
              </Column>
            </Row>
          </Grid>
        </div>
      </VerticalTabs>
    </FullWidthHeaderNavMenu>
    <FullWidthHeaderNavMenu text="Community">
      <VerticalTabs tabs={["Community"]}>
        <div class="vertical-tab">
          <Grid padding>
            <Row>
              <Column>
                <h3>The Kenshi Community</h3>
              </Column>
            </Row>
            <Row>
              <Column>
                Join one of our communities to learn more about us or
                communicate with others interested in Kenshi. Have a question or
                need support? You can always send an email to
                <Link href="mailto:hi@kenshi.io">hi@kenshi.io</Link>.
              </Column>
            </Row>
            <Row>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="/blog">
                  <h4>Blog</h4>
                  <div class="body">
                    Latest news about Kenshi, as well as technical articles
                    about Kenshi products.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile target="_blank" href="https://forum.kenshi.io">
                  <h4 class="external"><span>Forum</span><Launch /></h4>
                  <div class="body">
                    A community of blockchain developers and enthusiasts. Learn,
                    discuss, and share!
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="https://blog.kenshi.io/" target="_blank">
                  <h4 class="external"><span>Medium</span><Launch /></h4>
                  <div class="body">
                    Subscribe to and read our latest news and tech articles on
                    Medium.com!
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="https://t.me/KenshiTech" target="_blank">
                  <h4 class="external">
                    <span>Telegram</span><Launch />
                  </h4>
                  <div class="body">
                    Join our community chat to talk Kenshi or get help
                    integrating our products into your projects.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile
                  href="https://discord.gg/KenshiTech"
                  target="_blank"
                >
                  <h4 class="external"><span>Discord</span><Launch /></h4>
                  <div class="body">
                    Join our community on Discord to get help integrating our
                    products into your projects.
                  </div>
                </ClickableTile>
              </Column>
            </Row>
          </Grid>
        </div>
      </VerticalTabs>
    </FullWidthHeaderNavMenu>
  </HeaderNav>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderUtilities>
    <ThemeSwitcher />
    <HeaderAction
      bind:isOpen={isOpen1}
      icon={UserAvatarFilledAlt}
      closeIcon={UserAvatarFilledAlt}
    >
      <HeaderPanelLinks>
        <HeaderPanelDivider>Web3 connect</HeaderPanelDivider>
        <ConnectButton />
      </HeaderPanelLinks>
    </HeaderAction>
    <HeaderAction bind:isOpen={isOpen2}>
      <HeaderPanelLinks>
        <HeaderPanelDivider>Deep Index</HeaderPanelDivider>
        <HeaderPanelLink href="/dashboard/deep-index/sync">
          Sync Tasks
        </HeaderPanelLink>
        <HeaderPanelLink href="/dashboard/deep-index/query">
          API Keys
        </HeaderPanelLink>
        <HeaderPanelLink href="/dashboard/deep-index/webhook">
          Webhooks
        </HeaderPanelLink>
        <HeaderPanelDivider>Oracle Network</HeaderPanelDivider>
        <HeaderPanelLink href="/dashboard/oracle-network/custom">
          Custom Oracles
        </HeaderPanelLink>
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink href="/" text="Kenshi" />
    <SideNavLink href="/dashboard" text="Dashboard" />
    <SideNavLink href="/docs" text="Documentation" />
    <SideNavMenu text="Products">
      <SideNavMenu text="Deep Index">
        <SideNavMenuItem href="/docs/services/deep-index/sync" text="Sync" />
        <SideNavMenuItem
          href="/docs/services/deep-index/graphql"
          text="GraphQL"
        />
        <SideNavMenuItem href="/docs/services/deep-index/mql" text="MQL" />
        <SideNavMenuItem
          href="/docs/services/deep-index/webhook"
          text="R-API (Webhooks)"
        />
      </SideNavMenu>
      <SideNavMenu text="Oracle Network">
        <SideNavMenuItem
          href="/dashboard/oracle-network/custom"
          text="Custom Oracles"
        />
      </SideNavMenu>
      <SideNavMenu text="Oracle Blueprints">
        <SideNavMenuItem
          href="/docs/services/oracle-network/custom/blueprints#simple-oracle"
          text="Simple oracle"
        />
        <SideNavMenuItem
          href="/docs/services/oracle-network/custom/blueprints#weather-oracle"
          text="Weather oracle"
        />
        <SideNavMenuItem
          href="/docs/services/oracle-network/custom/blueprints#proof-of-balance-oracle"
          text="Proof of Balance oracle"
        />
        <SideNavMenuItem
          href="/docs/services/oracle-network/custom/blueprints#price-oracle"
          text="Price oracle"
        />
        <SideNavMenuItem
          href="/docs/services/oracle-network/custom/blueprints#vrf-oracle"
          text="VRF oracle"
        />
      </SideNavMenu>
      <SideNavMenu text="Blockchain IoT SDK">
        <SideNavMenuItem
          href="/docs/services/iot/install"
          text="Install for Arduino IDE"
        />
      </SideNavMenu>
      <SideNavMenu text="SolidQuery">
        <SideNavMenuItem href="/solidquery/playground" text="Playground" />
      </SideNavMenu>
    </SideNavMenu>
    <SideNavMenu text="Developers">
      <SideNavMenuItem href="/dashboard" text="Dashboard" />
      <SideNavMenuItem href="/docs" text="Documentation" />
      <SideNavMenuItem
        href="https://forum.kenshi.io"
        text="Forum"
        target="_blank"
      />
      <SideNavMenuItem
        href="https://github.com/KenshiTech"
        text="GitHub"
        target="_blank"
      />
      <SideNavMenuItem
        href="https://blog.kenshi.io/"
        text="Medium"
        target="_blank"
      />
      <SideNavMenuItem href="/blog" text="Blog" />
      <SideNavMenuItem
        href="https://discord.gg/KenshiTech"
        text="Discord"
        target="_blank"
      />
      <SideNavMenuItem
        href="https://www.npmjs.com/org/kenshi.io"
        text="NPM"
        target="_blank"
      />
    </SideNavMenu>
    <SideNavMenu text="Community">
      <SideNavMenuItem
        href="https://blog.kenshi.io/"
        text="Medium"
        target="_blank"
      />
      <SideNavMenuItem
        href="https://forum.kenshi.io"
        text="Forum"
        target="_blank"
      />
      <SideNavMenuItem
        href="https://t.me/KenshiTech"
        text="Telegram"
        target="_blank"
      />
      <SideNavMenuItem
        href="https://discord.gg/KenshiTech"
        text="Discord"
        target="_blank"
      />
    </SideNavMenu>
  </SideNavItems>
</SideNav>

<style>
  .vertical-tab {
    padding: 17px 0;
  }
  .vertical-tab :global(.bx--tile--clickable) {
    height: 100%;
  }
  .logo {
    display: flex;
    margin-right: -1em;
  }
  h4.external {
    display: flex;
    align-items: center;
  }
  h4.external span {
    flex: 1;
  }
  .body {
    margin-top: 1em;
  }
</style>
