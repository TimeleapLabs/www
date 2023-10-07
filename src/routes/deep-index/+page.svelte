<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, CodeSnippet } from "carbon-components-svelte";
  import { Button, Content, ClickableTile } from "carbon-components-svelte";
  import { Tabs, Tab, TabContent } from "carbon-components-svelte";
  import { Accordion, AccordionItem } from "carbon-components-svelte";
  import { ImageLoader, OutboundLink } from "carbon-components-svelte";

  import { Dashboard, Book, ArrowRight } from "carbon-icons-svelte";
  import { LogoPython, ArrowDownRight } from "carbon-icons-svelte";

  import Go from "src/icons/Go.svelte";
  import Node from "src/icons/Node.svelte";

  import DeveloperResources from "src/components/home/DeveloperResources.svelte";
  import HereToHelp from "src/components/home/HereToHelp.svelte";
  import Articles from "src/components/home/Articles.svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";

  import { apollo, mql, rapi } from "src/lib/snippets/all";
  import DefaultTags from "src/components/seo/DefaultTags.svelte";
</script>

<DefaultTags
  title="Kenshi — Deep Index"
  description="Unlock the power of blockchain data with Kenshi's Deep Index. Effortlessly manage, index, and analyze blockchain events. Explore our advanced features and get started today."
/>

<!-- Hero -->

<Content class="gap">
  <div class="hero">
    <div class="flex-column hero-body">
      <h1>Deep Index.</h1>
      <span class="blue">
        <ArrowDownRight size={48} />
        <ArrowDownRight size={48} />
        <ArrowDownRight size={48} />
      </span>

      <ExpressiveHeading size={4}>
        Unlock the Power of Data with Deep Index
      </ExpressiveHeading>

      <p class="body-02">
        Harness the strength of blockchain technology and make data access more
        efficient than ever before with Kenshi's Deep Index. This innovative
        blockchain indexing solution offers real-time data access and event
        notifications, revolutionizing the way you interact with your blockchain
        data.
      </p>

      <p class="body-01">
        With compatibility across multiple query languages and a fully managed
        service, Deep Index ensures seamless integration into your existing
        systems. Discover a new dimension of data accessibility today.
      </p>

      <div class="buttons">
        <Button href="/dashboard" icon={Dashboard}>Dashboard</Button>
        <Button href="/docs/services/deep-index" kind="secondary" icon={Book}>
          Documentation
        </Button>
      </div>
    </div>

    <div
      class="hero-image"
      style="background-image: url(/images/backgrounds/data.jpg);"
    />
  </div>

  <Grid>
    <Row>
      <Column sm={4} lg={5}>
        <div class="flex-column padding onboarding">
          <ExpressiveHeading size={2}>
            <h2>Revolutionizing Blockchain Data Management</h2>
          </ExpressiveHeading>
          <div class="body-01">
            Kenshi Deep Index is a revolutionary product designed to empower
            businesses and developers in their journey through the ever-evolving
            landscape of blockchain technology. It offers a suite of powerful
            tools and functionalities aimed at addressing the challenges of
            managing, analyzing, and utilizing blockchain data.
          </div>
          <div class="body-01">
            In the rapidly evolving landscape of blockchain technology, the
            ability to efficiently process and analyze data is paramount. The
            Kenshi Deep Index addresses this need by providing a seamless
            experience in handling and interpreting blockchain events.
          </div>
          <div class="body-01">
            Whether you're a startup looking to build a robust foundation or an
            established enterprise aiming to optimize your blockchain
            operations, the Kenshi Deep Index offers a crucial advantage. By
            simplifying data management, it empowers you to make informed
            decisions, respond swiftly to changes, and leverage blockchain
            technology to its fullest potential.
          </div>
          <div class="buttons">
            <Button href="/dashboard" icon={Dashboard}>Dashboard</Button>
            <Button
              href="/docs/services/deep-index"
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
        <Grid noGutter fullWidth padding>
          <Row>
            <Column lg={8}>
              <ClickableTile href="/docs/services/deep-index/sync">
                <div class="product">
                  <ExpressiveHeading size={4}>
                    <h3>Deep Index Sync</h3>
                  </ExpressiveHeading>
                  <div class="body-02">
                    Streamlined Synchronization and Indexing
                  </div>
                  <div class="body-01">
                    Deep Index Sync is an integral part of the Kenshi Deep Index
                    ecosystem. It's designed to seamlessly synchronize and index
                    events emitted by your smart contracts. This feature enables
                    you to rapidly query and analyze blockchain data. By
                    integrating Deep Index Sync into your blockchain
                    infrastructure, you can ensure that every crucial event is
                    captured and indexed efficiently, improving the overall
                    performance and responsiveness of your system.
                  </div>
                  <div class="buttons">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile href="/docs/services/deep-index/graphql">
                <div class="product">
                  <ExpressiveHeading size={4}>
                    <h3>Deep Index GraphQL</h3>
                  </ExpressiveHeading>
                  <div class="body-02">Efficient Querying with GraphQL</div>
                  <div class="body-01">
                    Deep Index GraphQL provides a powerful tool for querying
                    events emitted from your smart contracts. With GraphQL, you
                    can streamline the data retrieval and analysis process. This
                    feature offers precise and efficient data querying, allowing
                    you to fetch exactly what you need from the blockchain.
                    Whether you're dealing with complex data structures or
                    requiring real-time updates, Deep Index GraphQL equips you
                    with the tools to handle your data effectively.
                  </div>
                  <div class="buttons">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile href="/docs/services/deep-index/mql">
                <div class="product">
                  <ExpressiveHeading size={4}>
                    <h3>Deep Index MQL</h3>
                  </ExpressiveHeading>
                  <div class="body-02">
                    Intricate Searches with MongoDB Query Language
                  </div>
                  <div class="body-01">
                    Deep Index MQL leverages the MongoDB Query Language,
                    enabling you to execute intricate searches and analysis on
                    blockchain data. This feature enhances the depth and
                    flexibility of your queries. With MQL, you can perform
                    detailed, nuanced searches across your blockchain data,
                    digging deeper into data patterns and insights. Deep Index
                    MQL empowers you with flexible and intuitive interface for
                    blockchain data analysis.
                  </div>
                  <div class="buttons">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile href="/docs/services/deep-index/webhook">
                <div class="product">
                  <ExpressiveHeading size={4}>
                    <h3>Deep Index R-API</h3>
                  </ExpressiveHeading>
                  <div class="body-02">Real-Time Blockchain Notifications</div>
                  <div class="body-01">
                    Deep Index R-API allows you to utilize webhooks to receive
                    real-time push notifications from the blockchain directly to
                    your HTTP endpoints. By keeping you informed and up-to-date
                    with the latest events, this feature enables you to respond
                    quickly to changes in the blockchain. Whether it's a new
                    transaction or a contract event, Deep Index R-API ensures
                    you never miss a beat in your blockchain operations.
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

  <Grid>
    <Row>
      <Column sm={4} md={4} lg={4}>
        <div class="flex-column padding">
          <ExpressiveHeading size={2}>
            <h2>
              Unleashing the Power of Blockchain Data with Kenshi Deep Index
            </h2>
          </ExpressiveHeading>
          <div class="body-01">
            In the complex world of blockchain, having the right tools to manage
            and interpret data is invaluable. The Kenshi Deep Index brings
            unparalleled advantages to businesses and developers navigating the
            blockchain landscape.
          </div>
        </div>
      </Column>
      <Column lg={1} />
      <Column>
        <Accordion>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Efficient Data Management</h5>
              <div>Unlocking Productivity through Precision</div>
            </svelte:fragment>
            <p>
              Harness the power of our technology to process large volumes of
              blockchain data seamlessly. Experience faster and more efficient
              querying and analysis, unlocking new levels of productivity.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Real-Time Notifications</h5>
              <div>Stay Updated, Stay Ahead</div>
            </svelte:fragment>
            <p>
              Stay ahead of the curve with real-time push notifications. Kenshi
              Deep Index connects directly with the blockchain to your HTTP
              endpoints, delivering updates as they happen.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Flexible Query Capabilities</h5>
              <div>Dive Deeper into Your Data</div>
            </svelte:fragment>
            <p>
              Explore the depth of your data like never before. With our
              versatile data retrieval system, featuring GraphQL and MongoDB
              Query Language, you can execute intricate searches and detailed
              data analysis with ease.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Scalable Solution</h5>
              <div>Grow With Confidence</div>
            </svelte:fragment>
            <p>
              From fledgling startups to established enterprises, the Kenshi
              Deep Index scales to meet your needs. Our solution is designed to
              handle the data demands of any project size with the same level of
              efficiency and reliability.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Integration Ease</h5>
              <div>Simplifying Processes, Amplifying Results</div>
            </svelte:fragment>
            <p>
              We believe in making things simpler. Kenshi Deep Index
              effortlessly integrates with your existing systems and processes,
              significantly reducing development time and effort.
            </p>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="title">
              <h5>Informed Decision Making</h5>
              <div>Transforming Data into Decisions</div>
            </svelte:fragment>
            <p>
              Turn data into actionable insights. With easy access to blockchain
              events and data, Kenshi Deep Index empowers you to make quick,
              accurate, and data-driven decisions.
            </p>
          </AccordionItem>
        </Accordion>
      </Column>
    </Row>
  </Grid>

  <Grid>
    <Row>
      <Column sm={4} lg={5}>
        <div class="flex-column padding integrations">
          <ExpressiveHeading size={2}>
            <h2>Low-Code and No-Code Integrations with Deep Index R-API</h2>
          </ExpressiveHeading>

          <div class="body-01">
            Harness the power of Kenshi's Deep Index R-API, even with minimal
            coding knowledge. Our solution integrates seamlessly with various
            low-code and no-code platforms, providing you with an accessible,
            efficient way to handle blockchain data.
          </div>

          <div class="flex-spacer" />

          <ImageLoader src="/images/backgrounds/code.jpg" />
        </div>
      </Column>
      <Column lg={1} />
      <Column>
        <Grid noGutter fullWidth padding>
          <Row>
            <Column lg={8}>
              <ClickableTile href="/docs/services/deep-index">
                <div class="product">
                  <ExpressiveHeading size={4}>
                    <h3>Workflow Automation</h3>
                  </ExpressiveHeading>
                  <div class="body-01">
                    Easily connect Deep Index R-API with popular low-code
                    platforms like Zapier, Integromat, or n8n. Automate your
                    workflows to receive real-time push notifications from the
                    blockchain directly to your desired endpoints.
                  </div>
                  <div class="buttons">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile href="/docs/services/deep-index">
                <div class="product">
                  <ExpressiveHeading size={4}>
                    <h3>Data Visualization</h3>
                  </ExpressiveHeading>
                  <div class="body-01">
                    Integrate with no-code tools like Google Data Studio or
                    Tableau. Use the rich blockchain data indexed by Deep Index
                    to create insightful visualizations and reports without
                    writing a single line of code.
                  </div>
                  <div class="buttons">
                    <Button kind="ghost" icon={ArrowRight}>Learn more</Button>
                  </div>
                </div>
              </ClickableTile>
            </Column>
            <Column lg={8}>
              <ClickableTile href="/docs/services/deep-index">
                <div class="product">
                  <ExpressiveHeading size={4}>
                    <h3>Event Management</h3>
                  </ExpressiveHeading>
                  <div class="body-01">
                    Leverage the power of Deep Index R-API to manage blockchain
                    events in real-time. Connect with platforms like Airtable or
                    Microsoft Power Automate for efficient event tracking and
                    management.
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

  <Grid>
    <Row>
      <Column sm={4} lg={5}>
        <div class="flex-column padding onboarding">
          <ExpressiveHeading size={2}>
            <h2>Deep Index: Empowering Examples and Seamless Integration</h2>
          </ExpressiveHeading>

          <div class="body-01">
            Our Deep Index offers a range of comprehensive, hands-on examples to
            smoothly integrate our service into your blockchain project. Whether
            you prefer JavaScript, Python, or another language, our platform
            adapts to your needs, ensuring a seamless user experience. Get
            started with Deep Index and unlock the true potential of your
            blockchain data.
          </div>

          <div class="buttons">
            <Button href="/dashboard" icon={Dashboard}>Dashboard</Button>
            <Button
              href="/docs/services/deep-index"
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
        <div class="condensed-tabs">
          <Tabs autoWidth>
            <Tab label="GraphQL" />
            <Tab label="MQL" />
            <Tab label="R-API (Webhooks)" />
            <svelte:fragment slot="content">
              <TabContent>
                <Grid noGutter padding fullWidth>
                  <Row>
                    <Column>
                      Use your favorite
                      <OutboundLink href="https://graphql.org/">
                        GraphQL
                      </OutboundLink>
                      client to query the blockchain
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <CodeSnippet
                        type="multi"
                        code={apollo}
                        class="full-width"
                      />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <h5>See more examples on GitHub</h5>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <div class="buttons no-margin">
                        <Button
                          kind="secondary"
                          href="https://github.com/KenshiTech/graphql-example-node-axios"
                          icon={Node}>Node Axios</Button
                        >
                        <Button
                          kind="secondary"
                          href="https://github.com/KenshiTech/graphql-example-node-fetch"
                          icon={Node}>Node Fetch</Button
                        >
                        <Button
                          kind="secondary"
                          href="https://github.com/KenshiTech/graphql-example-python"
                          icon={LogoPython}
                        >
                          Python Requests
                        </Button>
                        <Button
                          href="https://github.com/KenshiTech/graphql-example-go"
                          kind="secondary"
                          icon={Go}>Go Shurcool</Button
                        >
                      </div>
                    </Column>
                  </Row>
                </Grid>
              </TabContent>
              <TabContent>
                <Grid noGutter padding fullWidth>
                  <Row>
                    <Column>
                      Use
                      <OutboundLink
                        href="https://www.mongodb.com/docs/manual/tutorial/query-documents/"
                      >
                        MongoDB Query Language
                      </OutboundLink>
                      to run complex queries on the blockchain
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <CodeSnippet type="multi" code={mql} class="full-width" />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <h5>See more examples on GitHub</h5>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <div class="buttons no-margin">
                        <Button
                          kind="secondary"
                          href="https://github.com/KenshiTech/mql-example-node-axios"
                          icon={Node}>Node Axios</Button
                        >
                        <Button
                          kind="secondary"
                          href="https://github.com/KenshiTech/mql-example-node-fetch"
                          icon={Node}>Node Fetch</Button
                        >
                        <Button
                          kind="secondary"
                          href="https://github.com/KenshiTech/mql-example-python"
                          icon={LogoPython}
                        >
                          Python Requests
                        </Button>
                        <Button
                          kind="secondary"
                          href="https://github.com/KenshiTech/mql-example-go"
                          icon={Go}>Go net/http</Button
                        >
                      </div>
                    </Column>
                  </Row>
                </Grid>
              </TabContent>
              <TabContent>
                <Grid noGutter padding fullWidth>
                  <Row>
                    <Column>
                      Use
                      <OutboundLink
                        href="https://en.wikipedia.org/wiki/Webhook"
                      >
                        Webhooks
                      </OutboundLink>
                      to get push notifications from the blockchain
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <CodeSnippet
                        type="multi"
                        code={rapi}
                        class="full-width"
                      />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <h5>See more examples on GitHub</h5>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <div class="buttons no-margin">
                        <Button
                          kind="secondary"
                          href="https://github.com/KenshiTech/reverse-api-example-node"
                          icon={Node}
                        >
                          Node Express
                        </Button>
                        <Button
                          kind="secondary"
                          href="https://github.com/KenshiTech/reverse-api-example-python"
                          icon={LogoPython}
                        >
                          Python Flask
                        </Button>
                      </div>
                    </Column>
                  </Row>
                </Grid>
              </TabContent>
            </svelte:fragment>
          </Tabs>
        </div>
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
  .flex-spacer {
    flex: 1;
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

  .buttons:not(.no-margin) {
    margin-top: 4em;
  }

  .padding {
    padding-bottom: 2em;
  }

  .integrations {
    padding-bottom: 1em;
  }

  @media (max-width: 760px) {
    .integrations {
      padding-bottom: 2em;
    }
  }
</style>
