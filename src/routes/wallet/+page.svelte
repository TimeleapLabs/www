<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Tile } from "carbon-components-svelte";
  import { Button, Content } from "carbon-components-svelte";

  import { ArrowUpRight, ArrowRight, ArrowDown } from "carbon-icons-svelte";
  import { LogoGithub } from "carbon-icons-svelte";
  import { Accordion, AccordionItem } from "carbon-components-svelte";
  import { Link, ImageLoader } from "carbon-components-svelte";
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

  const goToContact = (e) => {
    e.preventDefault();
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  };
</script>

<!-- Hero -->

<Content class="gap">
  <Grid padding>
    <Row padding>
      <Column padding />
    </Row>
    <Row padding>
      <Column padding lg={8} md={6} sm={4}>
        <div class="hero flex-column">
          <div>
            <h1>White-label, Customizable, Brandable, Crypto Wallet.</h1>
          </div>

          <div>
            <ExpressiveHeading size={3}>
              <div class="muted suppress">
                Timeleap Wallet is a white-label and customizable wallet
                solution for blockchain projects. It is designed to be easy to
                use, secure, and scalable.
              </div>
            </ExpressiveHeading>
          </div>

          <div class="flex-spacer">
            <ExpressiveHeading size={3}>
              <div class="muted suppress">
                Project-specific branding, custom features, and integrations
                with third-party services can be added to Timeleap Wallet to
                create a unique and tailored user experience.
              </div>
            </ExpressiveHeading>
          </div>

          <div class="buttons">
            <Button href="#contact" on:click={goToContact} icon={ArrowDown}>
              Contact Us for more info
            </Button>
          </div>
        </div>
      </Column>
      <Column lg={8} md={6} sm={4}>
        <ImageLoader
          aspectRatio="1x1"
          src="/images/backgrounds/phones.png"
          alt="Timeleap Wallet"
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
              A customizable, white-label wallet solution for your crypto
              project
            </h3>
          </ExpressiveHeading>
          <div class="body-01">
            With Timeleap Wallet, you can create a branded and customized wallet
            for your blockchain project. From simple UI changes to custom
            features and integrations such as staking, NFT support, and more,
            Timeleap Wallet can be tailored to meet your project's unique
            requirements.
          </div>
        </div>
      </Column>
      <Column lg={1} />
      <Column>
        <Accordion>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Built-in Dark Mode</h5>
              <div>
                Built-in Dark Mode for a Sleek and Modern User Experience
              </div>
            </svelte:fragment>
            <p>
              Timeleap Wallet comes with a built-in dark mode that provides a
              sleek and modern user experience. Users can switch between light
              and dark modes with a single click, making it easy to use the
              wallet in any lighting condition.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Custom UI</h5>
              <div>
                Custom UI Design Services for a Unique and Tailored User
                Experience
              </div>
            </svelte:fragment>
            <p>
              Timeleap Wallet offers custom UI design services for projects that
              require a unique and tailored user experience. Our team of
              designers can work with you to create a custom UI that reflects
              your brand and meets your project's specific requirements.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Custom Blockchains</h5>
              <div>Support for Custom Blockchains and Tokens</div>
            </svelte:fragment>
            <p>
              Timeleap Wallet supports custom blockchains and tokens. Whether
              you're building a new blockchain or integrating with an existing
              one, Timeleap Wallet can handle it all.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Protocol-specific Functions</h5>
              <div>
                Protocol-specific Functions for Seamless Integration with
                Blockchains
              </div>
            </svelte:fragment>
            <p>
              Allow users to interact with your blockchain project seamlessly
              with protocol-specific functions. Timeleap Wallet can be
              customized to support functions specific to your blockchain
              protocol, making it easy for users to send and receive assets,
              stake tokens, and more.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Non-custodial</h5>
              <div>
                Non-custodial Wallet for Enhanced Security and User Control
              </div>
            </svelte:fragment>
            <p>
              Timeleap Wallet is a non-custodial wallet, meaning users have full
              control over their assets at all times. With Timeleap Wallet,
              users can securely store, send, and receive assets without relying
              on a third party.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Wallet Connect</h5>
              <div>
                Wallet Connect for Seamless Integration with DApps and Services
              </div>
            </svelte:fragment>
            <p>
              Timeleap Wallet supports Wallet Connect, allowing users to connect
              their wallets to decentralized applications (DApps) and services
              with ease. With Wallet Connect, users can interact with DApps and
              services securely and seamlessly. (this feature is a work in
              progress)
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Analytics (Optional)</h5>
              <div>
                Analytics and Reporting for Insights into User Behavior and
                Engagement
              </div>
            </svelte:fragment>
            <p>
              Timeleap Wallet includes analytics and reporting features that
              provide insights into user behavior and engagement. With
              analytics, you can track user activity, monitor wallet usage, and
              gain valuable insights to optimize your wallet's performance.
            </p>
          </AccordionItem>
        </Accordion>
      </Column>
    </Row>
  </Grid>

  <Grid condensed>
    <Row>
      <Column lg={8} md={6} sm={4}>
        <Tile>
          <div class="banner flex-column padding">
            <ExpressiveHeading size={5}>
              <h2>
                Give your project a competitive
                <br />
                edge with Timeleap Wallet
              </h2>
            </ExpressiveHeading>
            <p>
              Differentiate your project from the competition with a branded and
              customizable wallet solution. Give your users a seamless and
              secure experience with Timeleap Wallet. The Timeleap team is here
              to help you every step of the way. From initial consultation to
              final deployment, we'll work with you to create a wallet that
              meets your project's unique requirements.
            </p>
            <div class="buttons margin">
              <Button href="#contact" on:click={goToContact} icon={ArrowDown}>
                Contact Us Now
              </Button>
            </div>
          </div>
        </Tile>
      </Column>
      <Column lg={8} md={6} sm={4}>
        <div
          class="hero-image contrast noise"
          style="background-image: url(/images/backgrounds/wallet.png);"
        />
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
              <StructuredListCell noWrap>Base License</StructuredListCell>
              <StructuredListCell>Contact Us</StructuredListCell>
              <StructuredListCell>
                The Base License includes the core features of Timeleap Wallet
                and is suitable for most projects. Contact us to discuss pricing
                options and customization.
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Custom UI</StructuredListCell>
              <StructuredListCell>Contact Us</StructuredListCell>
              <StructuredListCell>
                Custom UI design services are available for projects that
                require a unique and tailored user experience. Contact us to
                discuss pricing options.
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Extra Features</StructuredListCell>
              <StructuredListCell>Contact Us</StructuredListCell>
              <StructuredListCell>
                Additional features and integrations with third-party services
                can be added to Timeleap Wallet to create a unique and tailored
                user experience. Contact us to discuss pricing options.
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredList>
      </Column>
    </Row>
  </Grid>

  <DeveloperResources />
  <HereToHelp subject={"Timeleap Wallet Service <> {Your Project Name}"} />
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
  .banner {
    display: flex;
    flex-direction: column;
    gap: 4em;
  }
  .banner .buttons {
    margin-top: 8em;
  }
  .hero {
    gap: 4em;
    padding-top: 8em;
    padding-bottom: 4em;
  }
  .suppress {
    max-width: 540px;
  }
</style>
