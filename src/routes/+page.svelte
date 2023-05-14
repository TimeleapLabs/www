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
  import { ArrowRight, LogoDiscord } from "carbon-icons-svelte";
  import { LogoMedium, LogoNpm } from "carbon-icons-svelte";
  import { Accordion, AccordionItem } from "carbon-components-svelte";

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
  import ContactForm from "src/components/ContactForm.svelte";

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
  <Grid noGutter fullWidth>
    <Row>
      <Column sm={4}>
        <div class="flex-column hero-body">
          <h1>Indexing. Oracles. IoT.</h1>
          <span class="blue">
            <ArrowDownRight size={48} />
            <ArrowDownRight size={48} />
            <ArrowDownRight size={48} />
          </span>

          <div class="spacer" />

          <ExpressiveHeading size={4}>
            Kenshi gives you all the tools you need to build custom solutions on
            the blockchain.
          </ExpressiveHeading>

          <ExpressiveHeading size={3}>
            Build faster and better decentralized apps in no-time.
          </ExpressiveHeading>

          <div class="spacer" />

          <div class="body-02">Available on 8 blockchains and growing</div>
          <div class="blockchains">
            <div class="blockchain">Ethereum <Ethereum /></div>
            <div class="blockchain">Arbitrum <Arbitrum /></div>
            <div class="blockchain">Aurora <Aurora /></div>
            <div class="blockchain">Avalanche <Avalanche /></div>
            <div class="blockchain">Bitgert <Bitgert /></div>
            <div class="blockchain">BNB Chain <BnbChain /></div>
            <div class="blockchain">Fantom <Fantom /></div>
            <div class="blockchain">Polygon <Polygon /></div>
          </div>

          <div class="spacer" />
        </div>
      </Column>
      <Column>
        <div class="hero">
          <ImageLoader src="/images/test/copernico-p_kICQCOM4s-unsplash.jpg" />
        </div>
      </Column>
    </Row>
  </Grid>

  <Grid noGutter>
    <Row>
      <Column>
        <div class="flex-column padding onboarding">
          <ExpressiveHeading size={5}>
            <h2>Easing your Web 3.0 onboarding</h2>
          </ExpressiveHeading>
          <div class="body-01">
            Kenshi offers innovative blockchain solutions for businesses and
            enterprises seeking to harness the power of this transformative
            technology.
          </div>
          <div class="body-01">
            From data indexing and event management to custom oracles and IoT
            integration, Kenshi provides cutting-edge tools designed to
            streamline your operations and unlock new possibilities for your
            business in the blockchain ecosystem.
          </div>
          <div class="buttons">
            <Button href="/dashboard" icon={Dashboard}>Dashboard</Button>
            <Button href="/docs" kind="secondary" icon={Book}>
              Documentation
            </Button>
          </div>
        </div>
      </Column>
      <Column>
        <Grid noGutter fullWidth padding>
          <Row>
            <Column lg={8}>
              <ClickableTile href="/deep-index">
                <div class="product">
                  <ExpressiveHeading size={4}>
                    <h3>Indexing.</h3>
                  </ExpressiveHeading>
                  <div class="body-02">
                    Experience the power of real-time blockchain indexing with
                    Kenshi's Deep Index.
                  </div>
                  <div class="body-01">
                    Our efficient, cost-effective solution supports multiple
                    query languages, transforming data access for seamless Web
                    3.0 integration.
                  </div>
                  <div class="buttons">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile href="/oracle-network">
                <div class="product">
                  <ExpressiveHeading size={4}>
                    <h3>Oracles.</h3>
                  </ExpressiveHeading>
                  <div class="body-02">
                    Craft custom oracles with ease on the Kenshi Oracle Network.
                  </div>
                  <div class="body-01">
                    Tap into the full potential of blockchain technology with
                    our user-friendly and flexible ecosystem. Drive innovation
                    and growth in the Web 3.0 era.
                  </div>
                  <div class="buttons">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile href="/iot-sdk">
                <div class="product">
                  <ExpressiveHeading size={4}>
                    <h3>IoT.</h3>
                  </ExpressiveHeading>
                  <div class="body-02">
                    Bridge the gap between IoT and blockchain with Kenshi's IoT
                    SDK.
                  </div>
                  <div class="body-01">
                    Enable bidirectional communication and seamless integration
                    for innovative IoT applications. Broaden the horizons of Web
                    3.0 technologies.
                  </div>
                  <div class="buttons">
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

  <Grid noGutter>
    <Row>
      <Column sm={4} md={4} lg={4}>
        <div class="flex-column padding">
          <ExpressiveHeading size={2}>
            <h2>Unleash the Power of Web 3.0 with Kenshi</h2>
          </ExpressiveHeading>
          <div class="body-01">
            Transform your digital experience with Kenshi's comprehensive suite
            of blockchain tools.
          </div>
          <div class="body-01">
            Our platform empowers you to craft custom solutions, bridge IoT and
            blockchain, and access real-time data with ease. Experience the
            seamless interaction of Web 2.0 and Web 3.0 data, fueling innovation
            and growth for your business in the Web 3.0 era.
          </div>
        </div>
      </Column>
      <Column lg={1} />
      <Column>
        <Accordion>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Superior Data Accessibility</h5>
              <div>Real-time Blockchain Indexing</div>
            </svelte:fragment>
            <p>
              Kenshi's Deep Index offers real-time blockchain indexing, ensuring
              efficient and cost-effective access to data. Seamlessly integrate
              with Web 3.0, transforming your data handling experience.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Customizable Oracles</h5>
              <div>Low-Code Oracle Platform</div>
            </svelte:fragment>
            <p>
              With Kenshi's Oracle Network, create custom oracles tailored to
              your specific requirements. Harness the full potential of
              blockchain technology, driving innovation and growth in the Web
              3.0 era.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>IoT Integration</h5>
              <div>On 200+ Development Boards</div>
            </svelte:fragment>
            <p>
              Our IoT SDK bridges the gap between Internet of Things and
              blockchain. Enable bidirectional communication for effortless
              integration and unlock new possibilities for IoT applications.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Versatile and User-Friendly</h5>
              <div>Combining Flexibility with Ease of Use</div>
            </svelte:fragment>
            <p>
              Kenshi's platform is designed to be intuitive and user-friendly,
              making it easier to craft tailor-made blockchain solutions.
              Experience the simplicity of Software as a Service (SaaS) and the
              adaptability of Infrastructure as a Service/Platform as a Service
              (IaaS/PaaS).
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Real-time Event Notifications</h5>
              <div>Push Notifications for the Blockchain</div>
            </svelte:fragment>
            <p>
              Stay ahead with real-time data access and event notifications.
              Respond to changes and updates as they happen, keeping your
              operations agile and proactive.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Multi-Language Support</h5>
              <div>Query With Multiple Languages</div>
            </svelte:fragment>
            <p>
              Kenshi's Deep Index is compatible with multiple query languages,
              ensuring smooth and hassle-free integration.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Fully Managed Service</h5>
              <div>Focus on Your Business Use Case</div>
            </svelte:fragment>
            <p>
              We provide a fully managed service to ensure your experience with
              Kenshi is hassle-free, allowing you to focus on what matters most
              - growing your business.
            </p>
          </AccordionItem>
        </Accordion>
      </Column>
    </Row>
  </Grid>

  <div class="matterhorn">
    <Grid noGutter padding>
      <Row>
        <Column lg={6}>
          <Tile>
            <Grid noGutter padding>
              <Row>
                <Column>
                  <ExpressiveHeading size={4}>
                    <h3>About</h3>
                  </ExpressiveHeading>
                </Column>
              </Row>
              <Row>
                <Column lg={14}>
                  <p>
                    Founded in December 2021, Kenshi is a pioneering blockchain
                    technology company headquartered in the heart of
                    Switzerland. With a commitment to innovation and excellence,
                    Kenshi aims to bridge the gap between the traditional web
                    (Web 2.0) and the decentralized future (Web 3.0).
                  </p>
                </Column>
              </Row>
              <Row>
                <Column>
                  <div class="buttons">
                    <Button kind="secondary" icon={ArrowRight}>
                      Learn more
                    </Button>
                  </div>
                </Column>
              </Row>
            </Grid>
          </Tile>
        </Column>
      </Row>
    </Grid>
  </div>

  <Grid noGutter>
    <Row>
      <Column lg={4} md={4}>
        <Grid class="full-height">
          <Row class="full-height">
            <Column>
              <div class="flex-column resources">
                <ExpressiveHeading size={2}>
                  <h2>Developer resources</h2>
                </ExpressiveHeading>

                <div class="body-02">
                  Find examples, tools and documents for integrating the Kenshi
                  products and services into your projects.
                </div>

                <div class="body-01">
                  Join the Kenshi community and connect with like-minded
                  individuals and businesses passionate about blockchain
                  technology. Share your experiences, learn from others, and
                  discover new opportunities for growth and innovation in the
                  dynamic blockchain ecosystem. Stay up-to-date with the latest
                  news, events, and developments, and become an integral part of
                  the Kenshi community today.
                </div>
              </div>
            </Column>
          </Row>
        </Grid>
      </Column>
      <Column />
      <Column lg={10}>
        <Grid padding condensed fullWidth>
          <Row>
            <Column lg={5} md={4} sm={4}>
              <CardButton
                href="https://forum.kenshi.io"
                icon={Forum}
                title="Forum"
                description="A community of blockchain developers and enthusiasts. Learn, discuss, and share!"
              />
            </Column>
            <Column lg={5} md={4} sm={4}>
              <CardButton
                href="https://github.com/KenshiTech"
                icon={LogoGithub}
                title="GitHub"
                description="Find examples for the Kenshi services and contribute to our open-source projects."
              />
            </Column>
            <Column lg={5} md={4} sm={4}>
              <CardButton
                href="https://www.npmjs.com/org/kenshi.io"
                icon={LogoNpm}
                title="NPM"
                description="Check out all the JavaScript and Solidity packages published by Kenshi to NPM."
              />
            </Column>
            <Column lg={5} md={4} sm={4}>
              <CardButton
                href="/blog"
                icon={Blog}
                title="Blog"
                description="Read our blog for use cases, examples and technical articles about Kenshi products."
              />
            </Column>
            <Column lg={5} md={4} sm={4}>
              <CardButton
                href="https://blog.kenshi.io"
                icon={LogoMedium}
                title="Medium"
                description="Subscribe to our Medium publication to get the latest articles in your inbox."
              />
            </Column>
            <Column lg={5} md={4} sm={4}>
              <CardButton
                href="https://t.me/KenshiTech"
                icon={Telegram}
                title="Telegram"
                description="Join our community chat on Telegram to discuss everything Kenshi!"
              />
            </Column>
            <Column lg={5} md={4} sm={4}>
              <CardButton
                href="https://discord.gg/KenshiTech"
                icon={LogoDiscord}
                title="Discord"
                description="Join Kenshi Discord server to discuss the tech or get help with the products."
              />
            </Column>
            <Column lg={5} md={4} sm={4}>
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

  <!--Grid noGutter padding>
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
  </Grid!-->

  <Grid noGutter>
    <Row>
      <Column lg={4}>
        <div class="flex-column blog">
          <ExpressiveHeading size={2}>
            <h2>We're here to help.</h2>
          </ExpressiveHeading>
          <p class="body-02">
            If you have any questions about Kenshi, our suite of products, or
            how we can assist you in your journey towards building custom
            solutions on the blockchain, please reach out to us.
          </p>
          <p class="body-01">
            Our dedicated team is ready to provide you with the information and
            support you need. Whether you're a seasoned developer, a business
            looking to leverage the power of blockchain, or simply curious about
            our platform, your inquiries are always welcome.
          </p>
          <p class="body-01">
            You can contact us directly through this form or reach us at our
            email: <OutboundLink href="mailto:inquiries@kenshi.io">
              inquiries@kenshi.io
            </OutboundLink>.
          </p>
          <p class="body-01">
            We strive to respond to all inquiries as quickly as possible. Your
            journey into the world of Web 3.0 starts here. Get in touch with us
            today.
          </p>
        </div>
      </Column>
      <Column />
      <Column lg={10}>
        <ContactForm />
      </Column>
    </Row>
  </Grid>

  <Grid noGutter padding>
    <Row>
      <Column lg={6}>
        <div class="flex-column blog">
          <ExpressiveHeading size={2}>
            <h2>Read our latest articles</h2>
          </ExpressiveHeading>
          <p>
            Stay ahead of the curve with Kenshi's insightful blog! Dive into a
            wealth of knowledge with our expertly crafted articles, covering the
            latest trends, tips, and breakthroughs in blockchain technology and
            Web 3.0.
          </p>
          <div class="buttons">
            <Button href="/blog" icon={Blog}>Read all articles</Button>
          </div>
        </div>
      </Column>
      <Column />
      <Column lg={8}>
        <BlogToc maxCount={2} lg={16} />
      </Column>
    </Row>
  </Grid>
</Content>

<Footer />

<style>
  .steps {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .tiles h4 {
    margin-bottom: 1em;
  }
  .steps .title {
    flex: 1;
  }
  .padding {
    padding: 1em;
    box-sizing: border-box;
  }
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
    font-size: 4.5rem;
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
    grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
    gap: 1em;
    padding-right: 8em;
    margin-top: 1em;
  }
  .blockchain {
    display: grid;
    grid-template-columns: 1fr 1fr;
    fill: #fff;
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
  .steps {
    display: flex;
    height: 100%;
    flex-direction: column;
  }
  .steps .tiles {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 2px;
  }
  .hero {
    height: calc(100vh - 48px);
    overflow: hidden;
  }
  .hero :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .hero-body {
    padding: 8em;
    box-sizing: border-box;
  }
  @media (max-width: 1080px) {
    .hero-body {
      padding: 4em;
      box-sizing: border-box;
    }
  }
  @media (max-width: 720px) {
    .hero-body {
      padding: 2em;
      box-sizing: border-box;
    }
  }
  .product {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .product > :global(*:not(.buttons)) {
    padding: 0 1.2rem;
  }
  .product :global(h3) {
    margin-top: 1rem;
  }
  .matterhorn {
    background-image: url(/images/test/angelo-burgener-KomZoTHKtGg-unsplash.jpg);
    background-size: cover;
    background-position: center center;
    height: 100vh;
    display: flex;
    align-items: center;
  }
  .onboarding .buttons,
  .blog .buttons {
    margin-top: 4em;
  }
  .resources h2 {
    margin-bottom: 2rem;
  }
</style>
