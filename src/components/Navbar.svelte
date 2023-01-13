<script>
  import {
    Header,
    HeaderUtilities,
    HeaderAction,
    HeaderGlobalAction,
    HeaderPanelLinks,
    HeaderPanelDivider,
    HeaderPanelLink,
    HeaderNav,
    HeaderNavItem,
    HeaderNavMenu,
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
  } from "carbon-components-svelte";

  import Kenshi from "src/icons/Kenshi.svelte";

  import FullWidthHeaderNavMenu from "src/components/carbon/FullWidthHeaderNavMenu.svelte";
  import VerticalTabs from "src/components/carbon/VerticalTabs.svelte";
  import ThemeSwitcher from "src/components/carbon/ThemeSwitcher.svelte";

  import { UserAvatarFilledAlt, Launch } from "carbon-icons-svelte";

  import ConnectButton from "src/components/ConnectButton.svelte";

  import "carbon-components-svelte/css/all.css";
  import "../common.css";

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
      <VerticalTabs tabs={["Deep Index", "Oracle Network", "IoT SDK"]}>
        <div class="vertical-tab">
          <Grid padding>
            <Row>
              <Column>
                <h3>Deep Index</h3>
              </Column>
            </Row>
            <Row>
              <Column>
                Kenshi Deep Index is a full-stack data consumption and data
                processing solution for the blockchain.
              </Column>
            </Row>
            <Row>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="/docs/services/deep-index/sync">
                  <h4>Deep Index Sync</h4>
                  <div class="body">
                    Sync and index events emitted from your smart contract to
                    enable fast querying.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="/docs/services/deep-index/graphql">
                  <h4>Deep Index GraphQL</h4>
                  <div class="body">
                    Use GraphQL to query events emitted from your smart
                    contracts.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="/docs/services/deep-index/mql">
                  <h4>Deep Index MQL</h4>
                  <div class="body">
                    Use MongoDB Query Language to run complex queries on
                    blockchain data.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="/docs/services/deep-index/webhook">
                  <h4>Deep Index R-API</h4>
                  <div class="body">
                    Receive push notifications from the blockchain on your HTTP
                    endpoints.
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
                Kenshi Oracle Network is an asynchronous, fault-tolerant,
                serverless framework for creating, deploying and operating
                oracles for EVM chains.
              </Column>
            </Row>
            <Row>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="/dashboard/oracle-network/custom">
                  <h4>Custom oracle</h4>
                  <div class="body">
                    Create and deplpoy your custom oracle with the technologies
                    you know.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile
                  href="/docs/services/oracle-network/custom/blueprints#simple-oracle"
                >
                  <h4>Simple oracle</h4>
                  <div class="body">
                    Learn how to create your oracle using a simple example.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile
                  href="/docs/services/oracle-network/custom/blueprints#weather-oracle"
                >
                  <h4>Weather</h4>
                  <div class="body">
                    Looking for weather data on the blockchain? Start here.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile
                  href="/docs/services/oracle-network/custom/blueprints#proof-of-balance-oracle"
                >
                  <h4>Proof of Balance</h4>
                  <div class="body">
                    Check if your users own a specific asset on another
                    blockchain.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile
                  href="/docs/services/oracle-network/custom/blueprints#price-oracle"
                >
                  <h4>Price feed</h4>
                  <div class="body">
                    Learn how to create and deploy your own price feed oracle.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile
                  href="/docs/services/oracle-network/custom/blueprints#vrf-oracle"
                >
                  <h4>VRF</h4>
                  <div class="body">
                    Looking for randomness? Learn how to deploy your dedicated
                    VRF oracle.
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
                The Kenshi IoT SDK allows receiving and processing blockchain
                events on embedded devices.
              </Column>
            </Row>
            <Row>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="/docs/iot/install">
                  <h4>Arduino IDE</h4>
                  <div class="body">
                    Use the Kenshi IoT SDK on ESP32 and Arduino boards with the
                    Arduino IDE.
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
                    Learn how to use the Kenshi IoT SDK for Arduino to receive
                    blockchain events on ESP32.
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
                    Learn how to use the Kenshi IoT SDK to receive blockchain
                    events on Arduino MKR WiFi.
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
                    Latest news about Kenshi, as well as technical articles
                    about Kenshi products.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile
                  href="https://t.me/KenshiTechDevelopers"
                  target="_blank"
                >
                  <h4 class="external">
                    <span>Kenshi Dev Talk</span><Launch />
                  </h4>
                  <div class="body">
                    Join our developer's chat on Telegram to get help
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
          Custom oracles
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
          text="Custom oracles"
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
          text="Proof of Balane oracle"
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
    </SideNavMenu>
    <SideNavMenu text="Developers">
      <SideNavMenuItem href="/dashboard" text="Dashboard" />
      <SideNavMenuItem href="/docs" text="Documentation" />
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
      <SideNavMenuItem
        href="https://t.me/KenshiTechDevelopers"
        text="DevTalk (Telegram)"
        target="_blank"
      />
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
  </SideNavItems>
</SideNav>

<style>
  .vertical-tab {
    padding: 17px 0;
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
</style>
