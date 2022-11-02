<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column, Content } from "carbon-components-svelte";
  import { ClickableTile, Tile } from "carbon-components-svelte";
  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";

  import { AssemblyCluster, Query, Webhook } from "carbon-icons-svelte";
  import { ArrowRight, Shuffle } from "carbon-icons-svelte";
</script>

<Content>
  <Grid noGutter padding narrow>
    <Row>
      <Column>
        <ExpressiveHeading size={5}>
          <h1>Kenshi Dashboard</h1>
        </ExpressiveHeading>
      </Column>
    </Row>

    <Row>
      <Column>
        <ExpressiveHeading size={3}>Data Out</ExpressiveHeading>
      </Column>
    </Row>

    <Row>
      <Column sm={4} md={4} lg={4}>
        <Tile class="blue-tile full-height">
          <div class="flex-column">
            <ExpressiveHeading size={5}>
              <h2>Deep Index</h2>
            </ExpressiveHeading>

            <div class="spacer" />

            <div class="body-02 ">
              Deep Index is an all-in-one data consumption, data processing, and
              data flow solution that connects web3 data to web2.
            </div>

            <div class="spacer" />
          </div>
        </Tile>
      </Column>
      <Column sm={4} md={4} lg={4}>
        <ClickableTile class="full-height" href="/dashboard/deep-index/sync">
          <div class="flex-column">
            <AssemblyCluster />
            <ExpressiveHeading size={3}>
              <h2>Sync</h2>
            </ExpressiveHeading>
            <div class="body-compact-02">
              Store and index data from your smart contracts into Kenshi's
              geographically distributed data clusters.
            </div>
            <div class="spacer" />
            <div class="arrow">
              <ArrowRight />
            </div>
          </div>
        </ClickableTile>
      </Column>
      <Column sm={4} md={4} lg={4}>
        <ClickableTile class="full-height" href="/dashboard/deep-index/query">
          <div class="flex-column">
            <Query />
            <ExpressiveHeading size={3}>
              <h2>MQL+GraphQL</h2>
            </ExpressiveHeading>
            <div class="body-compact-02">
              Query data from Kenshi's data clusters using MQL or GraphQL.
            </div>
            <div class="spacer" />
            <div class="arrow">
              <ArrowRight />
            </div>
          </div>
        </ClickableTile>
      </Column>
      <Column sm={4} md={4} lg={4}>
        <ClickableTile class="full-height" href="/dashboard/deep-index/webhook">
          <div class="flex-column">
            <Webhook />
            <ExpressiveHeading size={3}>
              <h2>Reverse API (Webhooks)</h2>
            </ExpressiveHeading>
            <div class="body-compact-02">
              Directly listen to events as they happen on the blockchain and get
              them delivered to you.
            </div>
            <div class="spacer" />
            <div class="arrow">
              <ArrowRight />
            </div>
          </div>
        </ClickableTile>
      </Column>
    </Row>

    <Row>
      <Column>
        <ExpressiveHeading size={3}>Data In</ExpressiveHeading>
      </Column>
    </Row>

    <Row>
      <Column sm={4} md={4} lg={4} max={4}>
        <Tile class="blue-tile full-height">
          <div class="flex-column">
            <ExpressiveHeading size={5}>
              <h1>Oracle Network</h1>
            </ExpressiveHeading>

            <div class="spacer" />

            <div class="body-02 ">
              Kenshi Oracle Network is a high-performance asynchronous oracle
              platform currently hosting the Kenshi VRF.
            </div>

            <div class="spacer" />
          </div>
        </Tile>
      </Column>
      <Column sm={4} md={4} lg={4} max={4}>
        <ClickableTile class="full-height" href="/dashboard/oracle-network/vrf">
          <div class="flex-column">
            <Shuffle />
            <ExpressiveHeading size={3}>
              <h2>VRF</h2>
            </ExpressiveHeading>
            <div class="body-compact-02">
              Get randomness on the blockchain in a secure, reliable and
              tamper-proof way.
            </div>
            <div class="spacer" />
            <div class="arrow">
              <ArrowRight />
            </div>
          </div>
        </ClickableTile>
      </Column>
    </Row>
  </Grid>
</Content>

<Footer />

<style>
  .flex-column {
    gap: 0;
    height: 100%;
  }
  h2 {
    margin-bottom: 1em;
  }
  .arrow {
    display: flex;
    gap: 1em;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1em;
    width: 100%;
  }
</style>
