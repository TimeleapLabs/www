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

  import { UserAvatarFilledAlt } from "carbon-icons-svelte";

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
  _platformName="Deep Index"
  persistentHamburgerMenu={true}
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
      <VerticalTabs tabs={["Deep Index", "Oracle Network"]}>
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
                <ClickableTile href="/docs/services/vrf">
                  <h4>VRF</h4>
                  <div class="body">
                    Looking for randomness on the blockchain? Kenshi delivers
                    verifiable random numbers with unmatched speed.
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
                <ClickableTile href="https://github.com/KenshiTech">
                  <h4>GitHub</h4>
                  <div class="body">
                    Check Kenshi's public software repositories for sample codes
                    and other useful utilities.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="https://blog.kenshi.io/">
                  <h4>Medium</h4>
                  <div class="body">
                    Latest news about Kenshi, as well as technical articles
                    about Kenshi products.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="https://t.me/KenshiTechDevelopers">
                  <h4>Kenshi Dev Talk</h4>
                  <div class="body">
                    Join our developer's chat on Telegram to get help
                    integrating our products into your projects.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="https://discord.gg/KenshiTech">
                  <h4>Discord</h4>
                  <div class="body">
                    Join our community on Discord to get help integrating our
                    products into your projects.
                  </div>
                </ClickableTile>
              </Column>
              <Column lg={4} md={6} sm={12}>
                <ClickableTile href="https://www.npmjs.com/org/kenshi.io">
                  <h4>NPM</h4>
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
        <HeaderPanelLink href="/dashboard/oracle-network/vrf">
          VRF
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
        <SideNavMenuItem href="/docs/services/vrf" text="VRF" />
      </SideNavMenu>
    </SideNavMenu>
    <SideNavMenu text="Developers">
      <SideNavMenuItem href="/dashboard" text="Dashboard" />
      <SideNavMenuItem href="/docs" text="Documentation" />
      <SideNavMenuItem href="https://github.com/KenshiTech" text="GitHub" />
      <SideNavMenuItem href="https://blog.kenshi.io/" text="Medium" />
      <SideNavMenuItem
        href="https://t.me/KenshiTechDevelopers"
        text="DevTalk (Telegram)"
      />
      <SideNavMenuItem href="https://discord.gg/KenshiTech" text="Discord" />
      <SideNavMenuItem href="https://www.npmjs.com/org/kenshi.io" text="NPM" />
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
</style>
