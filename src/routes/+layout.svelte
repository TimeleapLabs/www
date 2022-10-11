<script>
  import DefaultTags from "src/components/seo/DefaultTags.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { page } from "$app/stores";

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
    Content,
    Grid,
    Column,
    Row,
    ClickableTile,
  } from "carbon-components-svelte";

  import NPM from "src/icons/NPM.svelte";

  import FullWidthHeaderNavMenu from "src/components/carbon/FullWidthHeaderNavMenu.svelte";
  import VerticalTabs from "src/components/carbon/VerticalTabs.svelte";

  import SettingsAdjust from "carbon-icons-svelte/lib/SettingsAdjust.svelte";
  import UserAvatarFilledAlt from "carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte";

  $: needsHead = !$page?.url?.pathname?.startsWith("/docs");

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
  company="Kenshi"
  platformName="Deep Index"
  persistentHamburgerMenu={true}
  bind:isSideNavOpen
>
  <HeaderNav>
    <HeaderNavItem href="/" text="Link 1" />
    <HeaderNavItem href="/" text="Link 2" />
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
              <Column max={4}>
                <ClickableTile>
                  <h4>Deep Index Sync</h4>
                  <div class="body">
                    Sync and index events emitted from your smart contract to
                    enable fast querying.
                  </div>
                </ClickableTile>
              </Column>
              <Column max={4}>
                <ClickableTile>
                  <h4>Deep Index GraphQL</h4>
                  <div class="body">
                    Use GraphQL to query events emitted from your smart
                    contracts.
                  </div>
                </ClickableTile>
              </Column>
              <Column max={4}>
                <ClickableTile>
                  <h4>Deep Index MQL</h4>
                  <div class="body">
                    Use MongoDB Query Language to run complex queries on
                    blockchain data.
                  </div>
                </ClickableTile>
              </Column>
              <Column max={4}>
                <ClickableTile>
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
              <Column max={4}>
                <ClickableTile>
                  <h4>VRF</h4>
                  <div class="body">
                    Looking for randomness on the blockchain? Kenshi delivers
                    verifiable random numbers with unmatched speed.
                  </div>
                </ClickableTile>
              </Column>
              <Column max={4}>
                <ClickableTile>
                  <h4>VRF Enterprise</h4>
                  <div class="body">
                    Suitable for high work loads, isolated on the network. We
                    host a private version of our VRF oracle, dedicated to your
                    use.
                  </div>
                </ClickableTile>
              </Column>
            </Row>
          </Grid>
        </div>
      </VerticalTabs>
    </FullWidthHeaderNavMenu>
    <FullWidthHeaderNavMenu text="Developers">
      <VerticalTabs tabs={["Developer Resources", "Oracle Network"]}>
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
              <Column max={4}>
                <ClickableTile>
                  <h4>Dashboard</h4>
                  <div class="body">
                    Kenshi Dashboard is the all-in-one solution for subscribing
                    to or managing the Kenshi services.
                  </div>
                </ClickableTile>
              </Column>
              <Column max={4}>
                <ClickableTile>
                  <h4>Documentation</h4>
                  <div class="body">
                    Get more information about Kenshi products or learn how to
                    integrate them into your projects.
                  </div>
                </ClickableTile>
              </Column>
              <Column max={4}>
                <ClickableTile>
                  <h4>GitHub</h4>
                  <div class="body">
                    Check Kenshi's public software repositories for sample codes
                    and other useful utilities.
                  </div>
                </ClickableTile>
              </Column>
              <Column max={4}>
                <ClickableTile>
                  <h4>Medium</h4>
                  <div class="body">
                    Latest news about Kenshi, as well as technical articles
                    about Kenshi products.
                  </div>
                </ClickableTile>
              </Column>
              <Column max={4}>
                <ClickableTile>
                  <h4>Kenshi Dev Talk</h4>
                  <div class="body">
                    Join our developer's chat on Telegram to get help
                    integrating our products into your projects.
                  </div>
                </ClickableTile>
              </Column>
              <Column max={4}>
                <ClickableTile>
                  <h4>Discord</h4>
                  <div class="body">
                    Join our community on Discord to get help integrating our
                    products into your projects.
                  </div>
                </ClickableTile>
              </Column>
              <Column max={4}>
                <ClickableTile>
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
              <Column max={4}>
                <ClickableTile>
                  <h4>VRF</h4>
                  <div class="body">
                    Looking for randomness on the blockchain? Kenshi delivers
                    verifiable random numbers with unmatched speed.
                  </div>
                </ClickableTile>
              </Column>
              <Column max={4}>
                <ClickableTile>
                  <h4>VRF Enterprise</h4>
                  <div class="body">
                    Suitable for high work loads, isolated on the network. We
                    host a private version of our VRF oracle, dedicated to your
                    use.
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
    <HeaderGlobalAction aria-label="Settings" icon={SettingsAdjust} />
    <HeaderAction
      bind:isOpen={isOpen1}
      icon={UserAvatarFilledAlt}
      closeIcon={UserAvatarFilledAlt}
    >
      <HeaderPanelLinks>
        <HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider>
        <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 2</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 3</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 4</HeaderPanelLink>
        <HeaderPanelDivider>Switcher subject 2</HeaderPanelDivider>
        <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 2</HeaderPanelLink>
        <HeaderPanelDivider>Switcher subject 3</HeaderPanelDivider>
        <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
      </HeaderPanelLinks>
    </HeaderAction>
    <HeaderAction bind:isOpen={isOpen2}>
      <HeaderPanelLinks>
        <HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider>
        <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
        <HeaderPanelDivider>Switcher subject 2</HeaderPanelDivider>
        <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 2</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 3</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 4</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 5</HeaderPanelLink>
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink text="Link 1" />
    <SideNavLink text="Link 2" />
    <SideNavLink text="Link 3" />
    <SideNavMenu text="Menu">
      <SideNavMenuItem href="/" text="Link 1" />
      <SideNavMenuItem href="/" text="Link 2" />
      <SideNavMenuItem href="/" text="Link 3" />
    </SideNavMenu>
  </SideNavItems>
</SideNav>

<slot />

<SvelteToast />

{#if needsHead}
  <DefaultTags />
{/if}

<style>
  .vertical-tab {
    padding: 17px 0;
  }
</style>
