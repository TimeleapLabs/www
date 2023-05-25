<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column } from "carbon-components-svelte";
  import { Button, Content, ClickableTile } from "carbon-components-svelte";
  import { ImageLoader } from "carbon-components-svelte";
  import { Accordion, AccordionItem } from "carbon-components-svelte";

  import { Dashboard, Book } from "carbon-icons-svelte";
  import { ArrowRight, ArrowDownRight } from "carbon-icons-svelte";

  import DeveloperResources from "src/components/home/DeveloperResources.svelte";
  import HereToHelp from "src/components/home/HereToHelp.svelte";
  import Articles from "src/components/home/Articles.svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import DefaultTags from "src/components/seo/DefaultTags.svelte";
</script>

<DefaultTags
  title="Kenshi — Oracle Network"
  description="Unlock the power of blockchain on your IoT devices with Kenshi's Blockchain IoT SDK. Effortlessly process blockchain events on popular platforms like Arduino and ESP32. Discover an unprecedented level of integration and efficiency."
/>

<!-- Hero -->

<Content class="gap">
  <div class="hero">
    <div class="flex-column hero-body">
      <h1>Blockchain IoT SDK.</h1>
      <span class="blue">
        <ArrowDownRight size={48} />
        <ArrowDownRight size={48} />
        <ArrowDownRight size={48} />
      </span>

      <ExpressiveHeading size={4}>
        Empowering Connected Devices: Kenshi Blockchain IoT SDK
      </ExpressiveHeading>

      <p class="body-02">
        Harness the power of blockchain technology right on your IoT devices
        with Kenshi's Blockchain IoT SDK. Seamlessly receive and process
        blockchain events, enhancing the capabilities and connectivity of your
        embedded systems.
      </p>

      <p class="body-01">
        Built for adaptability and efficiency, our SDK integrates effortlessly
        with popular platforms like Arduino and ESP32, enabling a world where
        every device can be part of the blockchain revolution. Discover the
        potential of IoT like never before with Kenshi.
      </p>

      <div class="buttons">
        <Button href="/dashboard" icon={Dashboard}>Dashboard</Button>
        <Button href="/docs/services/iot" kind="secondary" icon={Book}
          >Documentation</Button
        >
      </div>
    </div>

    <div
      class="hero-image"
      style="background-image: url(/images/backgrounds/machines.jpg);"
    />
  </div>

  <Grid>
    <Row>
      <Column sm={4} md={4} lg={4}>
        <div class="flex-column padding">
          <ExpressiveHeading size={2}>
            <h2>
              Empowering IoT with Blockchain: Key Features of Kenshi's IoT SDK
            </h2>
          </ExpressiveHeading>
          <div class="body-01">
            The fusion of IoT and blockchain is a frontier of technological
            innovation, and at Kenshi, we're leading the way. The Kenshi
            Blockchain IoT SDK is designed to provide seamless blockchain
            integration for your IoT devices. Discover its unique features and
            the immense value it brings to users.
          </div>
        </div>
      </Column>
      <Column lg={1} />
      <Column>
        <Accordion>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Seamless Integration</h5>
              <div>Streamline your IoT and Blockchain Ecosystem</div>
            </svelte:fragment>
            <p>
              Kenshi's IoT SDK is built to facilitate effortless integration of
              blockchain functionality into your IoT devices. Our solution
              enables your embedded systems to receive and process blockchain
              events efficiently, enhancing their capabilities and utility.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Wide Platform Support</h5>
              <div>
                Harness the Power of Blockchain Across Various IoT Platforms
              </div>
            </svelte:fragment>
            <p>
              The IoT SDK supports a broad range of popular platforms including
              Arduino and ESP32. This versatility ensures you can leverage
              blockchain functionality on your preferred IoT platform, making
              your development process smoother and more flexible.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Detailed Examples and Documentation</h5>
              <div>Accelerate Your Development with Comprehensive Guides</div>
            </svelte:fragment>
            <p>
              We provide a variety of examples and comprehensive documentation,
              enabling you to quickly understand how to utilize the IoT SDK.
              From receiving blockchain events to leveraging the Arduino IDE for
              development, our resources guide you every step of the way.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Efficient Event Processing</h5>
              <div>Real-time Blockchain Event Reception and Processing</div>
            </svelte:fragment>
            <p>
              Kenshi's IoT SDK allows your IoT devices to efficiently receive
              and process blockchain events in real-time. This real-time
              functionality empowers your IoT devices with up-to-the-minute
              data, enabling smarter and more responsive operations.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Enriched IoT Functionality</h5>
              <div>Elevating Your IoT Devices with Blockchain Capabilities</div>
            </svelte:fragment>
            <p>
              By enabling IoT devices to interact with blockchain networks,
              Kenshi's IoT SDK opens up a world of possibilities. From supply
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
              Expanding Horizons: Use Cases of Kenshi's Blockchain IoT SDK
            </h2>
          </ExpressiveHeading>
          <div class="body-01">
            As blockchain technology continues to revolutionize various sectors,
            the fusion of Internet of Things (IoT) and blockchain promises
            unparalleled opportunities. Here are a few compelling use cases
            where Kenshi's Blockchain IoT SDK can deliver transformative
            impacts.
          </div>
          <div class="body-01">
            At Kenshi, we believe the amalgamation of IoT and blockchain will
            unlock new realms of possibilities, and our Blockchain IoT SDK is
            designed to help you tap into this potential.
          </div>
          <div class="spacer" />
          <ImageLoader src="/images/backgrounds/city.jpg" />
        </div>
      </Column>
      <Column lg={1} />
      <Column>
        <Grid noGutter fullWidth padding>
          <Row>
            <Column lg={8}>
              <ClickableTile class="full-height" href="/docs/services/iot">
                <div class="use-case">
                  <ExpressiveHeading size={4}>
                    <h3>Supply Chain Transparency</h3>
                  </ExpressiveHeading>
                  <div class="body-01">
                    Kenshi's Blockchain IoT SDK can be used to create
                    transparency in supply chains. IoT devices can record key
                    data points and events on the blockchain, providing a
                    tamper-proof, auditable trail of a product's journey from
                    production to consumer.
                  </div>
                  <div class="spacer" />
                  <div class="buttons no-margin">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile class="full-height" href="/docs/services/iot">
                <div class="use-case">
                  <ExpressiveHeading size={4}>
                    <h3>Real-Time Asset Tracking</h3>
                  </ExpressiveHeading>
                  <div class="body-01">
                    IoT devices enabled with Kenshi's SDK can efficiently
                    receive and process blockchain events for asset tracking in
                    real-time. This enhances the precision and reliability of
                    asset management across various industries, such as
                    logistics, manufacturing, and healthcare.
                  </div>
                  <div class="spacer" />
                  <div class="buttons no-margin">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile class="full-height" href="/docs/services/iot">
                <div class="use-case">
                  <ExpressiveHeading size={4}>
                    <h3>Energy Management</h3>
                  </ExpressiveHeading>
                  <div class="body-01">
                    In the energy sector, IoT devices equipped with Kenshi's SDK
                    can facilitate peer-to-peer energy trading on the
                    blockchain. This can enable more efficient use of renewable
                    energy sources, fostering a more sustainable future.
                  </div>
                  <div class="spacer" />
                  <div class="buttons no-margin">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile class="full-height" href="/docs/services/iot">
                <div class="use-case">
                  <ExpressiveHeading size={4}>
                    <h3>Smart Cities</h3>
                  </ExpressiveHeading>
                  <div class="body-01">
                    Kenshi's Blockchain IoT SDK can empower smart city
                    initiatives. By allowing IoT devices in urban environments
                    to interact with blockchain networks, city infrastructures
                    can become more responsive and intelligent. This can enhance
                    everything from traffic management to environmental
                    monitoring.
                  </div>
                  <div class="spacer" />
                  <div class="buttons no-margin">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile class="full-height" href="/docs/services/iot">
                <div class="use-case">
                  <ExpressiveHeading size={4}>
                    <h3>Health Care</h3>
                  </ExpressiveHeading>
                  <div class="body-01">
                    In healthcare, IoT devices with Kenshi's SDK can maintain
                    immutable patient records on the blockchain. This can
                    improve patient care by ensuring accurate, accessible, and
                    secure health data.
                  </div>
                  <div class="spacer" />
                  <div class="buttons no-margin">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile class="full-height" href="/docs/services/iot">
                <div class="use-case">
                  <ExpressiveHeading size={4}>
                    <h3>Decentralized IoT Networks</h3>
                  </ExpressiveHeading>
                  <div class="body-01">
                    Kenshi's SDK can facilitate the creation of decentralized
                    IoT networks. Devices can interact directly with each other
                    via the blockchain, enabling more resilient and efficient
                    networks free from single points of failure.
                  </div>
                  <div class="spacer" />
                  <div class="buttons no-margin">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile class="full-height" href="/docs/services/iot">
                <div class="use-case">
                  <ExpressiveHeading size={4}>
                    <h3>Crypto-enabled Vending Machines</h3>
                  </ExpressiveHeading>
                  <div class="body-01">
                    Kenshi's Blockchain IoT SDK can be instrumental in the
                    development of vending machines that accept cryptocurrency
                    payments. By integrating IoT devices in vending machines
                    with blockchain networks, transactions can be made directly,
                    securely, and swiftly via crypto wallets. This not only
                    caters to the growing base of cryptocurrency users but also
                    reduces dependency on traditional banking systems, making
                    vending machines truly autonomous and globally accessible.
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
      <Column sm={4} lg={6}>
        <div class="flex-column padding onboarding">
          <ExpressiveHeading size={2}>
            <h2>Seamless Integrations</h2>
          </ExpressiveHeading>

          <div class="body-01">
            The Kenshi Blockchain IoT SDK is designed for broad compatibility
            and seamless integration with a variety of platforms and devices.
            Whether you're deploying on ESP32, Arduino boards, or leveraging the
            Zephyr Real-Time Operating System (RTOS) for your embedded devices,
            the SDK is engineered to work effortlessly with your chosen
            technology.
          </div>

          <div class="body-01">
            With robust support for the Arduino IDE, you can streamline the
            development of your blockchain-connected IoT devices. The SDK is
            also compatible with Linux, BSD, and Windows platforms, making it
            adaptable for diverse hardware solutions.
          </div>

          <div class="body-01">
            From home automation to industrial IoT applications, the Kenshi
            Blockchain IoT SDK integrates smoothly into your existing technology
            stack. It empowers your IoT devices to efficiently receive and
            process blockchain events, unlocking new capabilities and
            applications for your projects.
          </div>

          <div class="buttons">
            <Button href="/dashboard" icon={Dashboard}>Dashboard</Button>
            <Button
              href="/docs/services/iot/install"
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
        <ImageLoader src="/images/backgrounds/pcbs.jpg" />
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
