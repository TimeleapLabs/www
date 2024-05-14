<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Tile } from "carbon-components-svelte";
  import { Button, Content } from "carbon-components-svelte";
  import { Bullhorn } from "carbon-icons-svelte";
  import { Accordion, AccordionItem } from "carbon-components-svelte";
  import { ImageLoader } from "carbon-components-svelte";
  import { Tag, FluidForm, TextInput } from "carbon-components-svelte";

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

  import { toast } from "@zerodevx/svelte-toast";
  import { subscribe } from "src/lib/api/subscribe";

  let showSubscribe = true;
  let email;
  let disabled = undefined;

  const handleSubscribe = () => {
    if (!email) {
      toast.push("Please enter your email address");
      return;
    }
    grecaptcha.ready(async () => {
      disabled = true;
      const token = await grecaptcha.execute(
        "6LcFm-UdAAAAAA2HsCcTFj7dA_okrJlKKoYR0rKf",
        { action: "submit" }
      );
      const resp = await subscribe(email, "hsm", token);
      if (resp.status === 200) {
        showSubscribe = false;
        toast.push("You have successfully subscribed!");
      } else {
        toast.push(
          "An error occurred while subscribing. Please try again later."
        );
        disabled = undefined;
      }
    });
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
            <h1>Top-notch Security <br />For Sensitive Data.</h1>
          </div>

          <div>
            <ExpressiveHeading size={3}>
              <div class="muted suppress">
                Timeleap Hardware Security Module (HSM) is a secure and
                tamper-resistant device that provides top-notch security for
                your sensitive data. With Timeleap HSM, you can securely store
                private keys, manage cryptographic operations, and protect your
                assets, data or API keys from unauthorized access.
              </div>
            </ExpressiveHeading>
          </div>

          <div class="buttons">
            <Tag type="blue">Coming Soon</Tag>
          </div>

          {#if showSubscribe}
            <p class="suppress">
              Sign-Up for our product update notifications and be the first to
              know when it's available for purchase.
            </p>
            <div class="subscribe suppress">
              <FluidForm>
                <TextInput
                  id="email"
                  type="email"
                  labelText="Email Address"
                  placeholder="Enter your email address"
                  bind:value={email}
                />
              </FluidForm>
              <Button kind="primary" on:click={handleSubscribe} icon={Bullhorn}
                >Notify Me</Button
              >
            </div>
          {/if}
        </div>
      </Column>
      <Column lg={8} md={6} sm={4}>
        <div class="noise contrast hero-image">
          <ImageLoader
            aspectRatio="1x1"
            src="/images/backgrounds/data-secure.jpg"
            alt="Timeleap HSM"
          />
        </div>
      </Column>
    </Row>
  </Grid>

  <Grid condensed>
    <Row>
      <Column lg={8} md={6} sm={4}>
        <Tile>
          <div class="banner flex-column padding">
            <ExpressiveHeading size={5}>
              <h2>Secure Your Sensitive<br /> Data with Timeleap HSM</h2>
            </ExpressiveHeading>
            <p>
              Storing sensitive data such as private keys, API keys, and
              cryptographic material in a secure and tamper-resistant device is
              essential for protecting your assets and data from unauthorized
              access. Timeleap HSM provides top-notch security for your
              sensitive data, ensuring that your assets and data are protected
              from unauthorized access and theft.
            </p>
            <div class="buttons margin">
              <Tag type="blue">Coming Soon</Tag>
            </div>
          </div>
        </Tile>
      </Column>
      <Column lg={8} md={6} sm={4}>
        <div
          class="hero-image contrast noise"
          style="background-image: url(/images/backgrounds/HSM-dark.png);"
        />
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row>
      <Column sm={4} md={4} lg={4}>
        <div class="flex-column padding">
          <ExpressiveHeading size={2}>
            <h3>Feature-rich Hardware Security Module</h3>
          </ExpressiveHeading>
          <div class="body-01">
            The Timeleap Hardware Security Module (HSM) is a packed with
            features that provide top-notch security for your sensitive data.
            From secure key storage to cryptographic operations, Timeleap HSM
            has everything you need to protect your assets and data.
          </div>
        </div>
      </Column>
      <Column lg={1} />
      <Column>
        <Accordion>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>TPM 2.0</h5>
              <div>
                Trusted Platform Module (TPM) 2.0 for Secure Key Storage
              </div>
            </svelte:fragment>
            <p>
              Timleap HSM is equipped with an Infineon OPTIGA TPM SLB9673
              security chip that provides secure key storage and cryptographic
              operations. The TPM 2.0 chip is tamper-resistant and provides
              hardware-based security for your sensitive data.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>6x Crypto Secure Elements</h5>
              <div>
                Six Crypto Secure Elements for Enhanced Security and Performance
              </div>
            </svelte:fragment>
            <p>
              Timeleap HSM features six ATECC608B CryptoAuthentication secure
              elements that provide enhanced security and performance for
              cryptographic operations. The secure elements are tamper-resistant
              and provide hardware-based security for your sensitive data. This
              allows storing a total of 96 keys and certificates securely.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Secure Boot</h5>
              <div>
                Secure Boot for Secure Startup and Firmware Verification
              </div>
            </svelte:fragment>
            <p>
              Timeleap HSM includes secure boot functionality that ensures a
              secure startup process and verifies the integrity of the firmware.
              Secure boot provides protection against unauthorized access and
              tampering of the device's firmware.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Cryptographic Algorithms</h5>
              <div>Support for a Wide Range of Cryptographic Algorithms</div>
            </svelte:fragment>
            <p>
              Timeleap HSM supports a wide range of cryptographic algorithms,
              including RSA, ECC, AES, and SHA. With support for multiple
              algorithms, Timeleap HSM provides flexibility and compatibility
              for a variety of cryptographic operations.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>TLS Certificates</h5>
              <div>
                TLS Certificates for Secure Communication and Data Protection
              </div>
            </svelte:fragment>
            <p>
              Timeleap HSM includes support for TLS certificates, enabling
              secure communication and data protection. With TLS certificates,
              you can secure your network connections and protect your data from
              eavesdropping and tampering.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>RNG</h5>
              <div>Random Number Generator (RNG) for Secure Key Generation</div>
            </svelte:fragment>
            <p>
              Timeleap HSM includes a random number generator (RNG) that
              provides secure key generation for cryptographic operations. The
              RNG ensures that keys are generated securely and are resistant to
              attacks based on predictable key generation.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Raspberry Pi Support</h5>
              <div>
                Raspberry Pi Support for Easy Integration with IoT Devices
              </div>
            </svelte:fragment>
            <p>
              Timeleap HSM Mini is compatible with Raspberry Pi, making it easy
              to integrate with IoT devices and projects. With Raspberry Pi
              support, you can add hardware-based security to your IoT projects
              and protect your data and assets from unauthorized access.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Timeleap Firmwares & Applications</h5>
              <div>Timeleap Firmwares & Applications for Various Use Cases</div>
            </svelte:fragment>
            <p>
              Timeleap HSM comes with a range of firmwares and applications that
              support various use cases, including crypto custody management,
              secret management, and secure communication. The firmwares and
              applications provide a secure and tamper-resistant environment for
              managing your digital assets and protecting your sensitive data.
            </p>
          </AccordionItem>
        </Accordion>
      </Column>
    </Row>
  </Grid>

  <Grid padding>
    <Row>
      <Column>
        <ExpressiveHeading size={4}>
          <h2>HSM Use Cases</h2>
        </ExpressiveHeading>
      </Column>
    </Row>
    <Row>
      <Column lg={6} sm={4}>
        <Article
          title="Crypto Custody Management"
          description="You can use Timeleap HSM to securely store, receive, and send digital assets. Timeleap HSM provides a secure and tamper-resistant environment for managing your digital assets, protecting them from unauthorized access and theft. The HSM mini is suitable for small to medium-sized projects, while the HSM enterprise is designed for large-scale projects with high security requirements."
          image="/images/backgrounds/ethereum.jpg"
          vertical
        />
      </Column>
      <Column lg={6} sm={4}>
        <Article
          title="Secret Management"
          description="Timeleap HSM can be used to securely store and manage secrets such as API keys, encryption keys, and other sensitive data. With Timeleap HSM, you can protect your secrets from unauthorized access and ensure that they are only accessible to authorized users. Timeleap HSM is suitable for projects that require a high level of security for their secrets."
          image="/images/backgrounds/secret.jpg"
          vertical
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
              <StructuredListCell head>Series</StructuredListCell>
              <StructuredListCell head>Price</StructuredListCell>
              <StructuredListCell head>Notes</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            <StructuredListRow>
              <StructuredListCell noWrap>Base Board</StructuredListCell>
              <StructuredListCell>Coming soon</StructuredListCell>
              <StructuredListCell>
                The base board is the core component of Timeleap HSM and
                provides the essential features for secure key storage and
                cryptographic operations.
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Bundle</StructuredListCell>
              <StructuredListCell>Coming soon</StructuredListCell>
              <StructuredListCell>
                The bundle includes the base board, Raspberry Pi, and a case for
                easy integration with IoT devices and crypto projects. The
                bundle is suitable for projects that require hardware-based
                security for their projects.
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>
                Secret Management Firmware
              </StructuredListCell>
              <StructuredListCell>Coming soon</StructuredListCell>
              <StructuredListCell>
                The secret management firmware provides a secure and
                tamper-resistant environment for managing secrets such as API
                keys, encryption keys, and other sensitive data. The firmware is
                suitable for projects that require a high level of security for
                their secrets.
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>
                Custody Management Firmware
              </StructuredListCell>
              <StructuredListCell>Coming soon</StructuredListCell>
              <StructuredListCell>
                The custody management firmware provides a secure and
                tamper-resistant environment for managing digital assets such as
                cryptocurrencies, tokens, and other digital assets. The firmware
                is suitable for projects that require a high level of security
                for their digital assets.
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredList>
      </Column>
    </Row>
  </Grid>

  <DeveloperResources />
  <HereToHelp />
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
    padding-top: 4em;
    box-sizing: border-box;
  }
  .suppress {
    max-width: 540px;
  }
  .hero-image {
    overflow: hidden;
  }
  .hero-image :global(img) {
    transform: scale(1.01);
  }
  .subscribe {
    display: flex;
    gap: 0;
    margin-top: 1em;
    width: 100%;
  }
  .subscribe :global(.bx--form--fluid) {
    flex: 1;
  }
</style>
