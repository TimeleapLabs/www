<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Tile } from "carbon-components-svelte";
  import { Button, Content } from "carbon-components-svelte";

  import { ArrowUpRight } from "carbon-icons-svelte";
  import { LogoGithub } from "carbon-icons-svelte";
  import { Accordion, AccordionItem } from "carbon-components-svelte";
  import { OutboundLink } from "carbon-components-svelte";

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
  import MailingList from "src/components/MailingList.svelte";
</script>

<!-- Hero -->

<Content class="gap">
  <Grid padding>
    <Row padding>
      <Column padding />
    </Row>
    <Row>
      <Column padding lg={8} md={6} sm={4}>
        <div class="hero flex-column">
          <div class="product-icon">
            <AdaptiveProductIcon width="96px" product="ghostfs" alt="GhostFS" />
          </div>

          <div>
            <h1>Timeleap GhostFS</h1>
          </div>

          <div class="flex-spacer">
            <ExpressiveHeading size={3}>
              <div class="muted">
                Enable remote storage for your applications with Timeleap
                GhostFS. Let users store and retrieve files securely and
                efficiently.
              </div>
            </ExpressiveHeading>
          </div>

          <div class="buttons">
            <Button
              href="https://github.com/TimeleapLabs/ghostfs"
              icon={LogoGithub}
              target="_blank"
            >
              See Project on GitHub
            </Button>
          </div>
        </div>
      </Column>
      <Column lg={8} md={6} sm={4}>
        <div
          class="hero-image contrast noise"
          style="background-image: url(/images/backgrounds/disk.jpg);"
        />
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row>
      <Column sm={4} lg={4}>
        <div class="flex-column padding onboarding">
          <ExpressiveHeading size={5}>
            <h2>Product Overview</h2>
          </ExpressiveHeading>
        </div>
      </Column>
      <Column sm={4} lg={12}>
        <div class="flex-column padding onboarding">
          <div class="body-02">
            Timeleap GhostFS is a distributed remote storage backend that
            enables developers to analyze large data sets efficiently within a
            distributed network. GhostFS is designed to be secure, scalable, and
            easy to use, providing a seamless experience for developers and
            users.
          </div>
          <div class="body-01">
            GhostFS works with existing technologies and is compatible with
            popular programming languages and frameworks. It is designed to be
            easy to integrate with your existing applications, enabling you to
            leverage the power of distributed storage without the complexity.
          </div>
          <div class="buttons">
            <OutboundLink
              href="https://github.com/TimeleapLabs/ghostfs/releases"
              target="_blank"
            >
              Download GhostFS on GitHub
            </OutboundLink>
          </div>
        </div>
      </Column>
    </Row>
  </Grid>

  <Grid condensed>
    <Row>
      <Column lg={8} md={6} sm={4}>
        <Tile>
          <div class="unchained flex-column padding">
            <ExpressiveHeading size={5}>
              <h2>
                Powering Research Projects
                <br />
                in Switzerland and Europe
              </h2>
            </ExpressiveHeading>
            <p>
              GhostFS is used in the Human Intracerebral EEG Platform (HIP), a
              research project that aims to improve the understanding of
              epilepsy and other neurological disorders. HIP enables researchers
              to analyze intracerebral EEG data from patients with epilepsy,
              providing valuable insights into the brain's electrical activity.
            </p>
            <div class="buttons margin">
              <Button
                href="https://www.ebrains.eu/tools/human-intracerebral-eeg-platform"
                icon={ArrowUpRight}
                target="_blank"
              >
                See Project Website
              </Button>
              <Button
                href="https://github.com/HIP-infrastructure"
                icon={LogoGithub}
                target="_blank"
              >
                See Project on GitHub
              </Button>
            </div>
          </div>
        </Tile>
      </Column>
      <Column lg={8} md={6} sm={4}>
        <div
          class="hero-image contrast noise"
          style="background-image: url(/images/backgrounds/brain.jpg);"
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
              Fast, secure, streaming remote storage backend for your
              applications
            </h3>
          </ExpressiveHeading>
          <div class="body-01">
            GhostFS mounts just like a local disk, enabling you to store and
            retrieve files with ease. Never wait for uploads or downloads again;
            GhostFS streams only the data you need, when you need it.
          </div>
        </div>
      </Column>
      <Column lg={1} />
      <Column>
        <Accordion>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Secure Data Transport</h5>
              <div>End-to-End Encryption</div>
            </svelte:fragment>
            <p>
              GhostFS encrypts data in transit and optionally at rest, ensuring
              that your data is secure and protected from unauthorized access.
              With GhostFS, you can trust that your data is safe and secure.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Streaming Data Access</h5>
              <div>Efficient Data Retrieval</div>
            </svelte:fragment>
            <p>
              GhostFS streams data on demand, enabling you to access only the
              data you need. This reduces latency and improves performance,
              making GhostFS ideal for applications that require fast access to
              large data sets.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Just Like a Local Disk</h5>
              <div>Seamless Integration with Existing Applications</div>
            </svelte:fragment>
            <p>
              GhostFS mounts just like a local disk, enabling you to store and
              retrieve files with ease. This ensures maximum compatibility with
              your existing applications, making it easy to integrate GhostFS
              into your workflow.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Access Control and Permissions</h5>
              <div>Fine-Grained Access Control for Secure Data Management</div>
            </svelte:fragment>
            <p>
              GhostFS employs a token-based access control system, enabling you
              to define fine-grained permissions for your data. This ensures
              that only authorized users can access your data, providing an
              additional layer of security for your applications.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Shares and Soft Mounts</h5>
              <div>Share Data Across Users and Applications</div>
            </svelte:fragment>
            <p>
              GhostFS supports shares and soft mounts, enabling you to share
              data across users and applications seamlessly. This makes it easy
              to collaborate with others and share data between different
              applications, improving productivity and efficiency.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Usage with Other File Systems</h5>
              <div>
                Mix and Match with Other File Systems for Maximum Flexibility
              </div>
            </svelte:fragment>
            <p>
              You can use GhostFS alongside other file systems, enabling you to
              mix and match storage solutions to suit your needs. For example,
              you can use GhostFS with Ceph or ZFS to create a hybrid storage
              solution that combines the benefits of both systems.
            </p>
          </AccordionItem>
        </Accordion>
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
              <StructuredListCell noWrap>Personal/Research</StructuredListCell>
              <StructuredListCell>$0.0</StructuredListCell>
              <StructuredListCell>
                GhostFS is free for personal and research use. You can use it to
                store and retrieve files for your projects without any cost. You
                are free to use GhostFS for any non-commercial purpose.
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>On-demand</StructuredListCell>
              <StructuredListCell>$1 per user per month</StructuredListCell>
              <StructuredListCell>
                Use GhostFS on-demand for your commercial projects. Pay only for
                the users who access GhostFS in a given month. Ideal for
                businesses that require flexible storage solutions.
              </StructuredListCell>
            </StructuredListRow>
            <StructuredListRow>
              <StructuredListCell noWrap>Enterprise</StructuredListCell>
              <StructuredListCell>Contact Us</StructuredListCell>
              <StructuredListCell>
                Contact us for enterprise pricing. We offer custom solutions for
                businesses that require dedicated support, advanced features,
                and high availability.
              </StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredList>
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row>
      <Column>
        <MailingList topic="wallet" buttonText="Sign Up">
          <p class="muted">
            Sign-Up for the latest news and updates on Timeleap GhostFS remote
            file storage.
          </p>
        </MailingList>
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

  .buttons.margin {
    margin-top: 1em;
  }
  .onboarding .buttons {
    margin-top: 4em;
  }
  .unchained {
    display: flex;
    flex-direction: column;
    gap: 4em;
  }
  .unchained .buttons {
    margin-top: 8em;
  }
  .hero {
    gap: 4em;
    padding-top: 8em;
    padding-bottom: 4em;
  }
  .product-icon :global(.wrap) {
    justify-content: start;
  }
</style>
