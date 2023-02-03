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
            <ExpressiveHeading size={3}>
              <h1>Kenshi Engagement Protocol</h1>
            </ExpressiveHeading>
            <p>
              The Kenshi Engagement Protocol engages with the community by
              giving them a voice and considering their insights into relevant
              topics.
            </p>
          </div>
        </Tile>
      </Column>
      <Column max={6}>
        <div class="flex-column align-start">
          <div class="spacer" />
          <p class="body-02">
            Kenshi outlines specific, well-defined subjects and values the
            community's perspective and expertise, seeking to understand their
            stance on these matters.
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
          title="Kenshi Community Engagement"
          question="Should we move forward with creating a community engagement protocol?"
          body="Dear users, as we strive to build a community that is inclusive and responsive to your needs, we are considering the creation of a community engagement protocol. This protocol would provide a platform for you to voice your opinions and suggestions, helping us to better understand and address your concerns. What are your thoughts on this idea? Should we move forward with creating a community engagement protocol?"
          values={[
            { value: 1, title: "Yes" },
            { value: 0, title: "No" },
          ]}
          selected={1}
          pills={["Community", "Engagement"]}
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
