<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Content, Row, Column, Tile } from "carbon-components-svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";
  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";

  import Choice from "src/components/governance/Choice.svelte";
</script>

<Content>
  <Grid noGutter narrow padding>
    <Row>
      <Column max={4}>
        <Tile class="blue-tile">
          <div class="flex-column">
            <ExpressiveHeading size={4}>
              <h1>Kenshi Governance</h1>
            </ExpressiveHeading>
            <p>
              Kenshi governance protocol is a program for engaging the community
              in specific Kenshi related decisions.
            </p>
          </div>
        </Tile>
      </Column>
      <Column max={4}>
        <div class="flex-column align-start">
          <div class="spacer" />
          <p class="body-02">
            You need to connect your wallet to vote or check the results of a
            poll.
          </p>
          <div class="spacer" />
          <ConnectButton primary />
        </div>
      </Column>
    </Row>
    <Row>
      <Column lg={8} md={6} sm={4}>
        <Choice
          poll="63dc3f5253725910dcef7036"
          title="Kenshi Governance"
          body="Should we create and use a governance protocol to engage the community in making decisions on specific subjects?"
          values={[
            { value: 1, title: "Yes" },
            { value: 0, title: "No" },
          ]}
          pills={["Community", "Governance"]}
        />
      </Column>
    </Row>
  </Grid>
</Content>

<Footer />

<style>
  @media only screen and (max-width: 420px) {
    :global(.card.padding) {
      padding: 1.25em 1em;
    }
  }
  @media only screen and (max-width: 380px) {
    :global(.input) {
      font-size: 0.9em;
    }
  }
</style>
