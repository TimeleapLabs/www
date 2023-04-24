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
      <Column lg={4} md={4} sm={4}>
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
      <Column lg={4} md={4} sm={4}>
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
          poll="6420a98b4e7872b2a336b12b"
          title="Kenshi Token New Supply"
          question="What should the new token supply be?"
          body="Dear users, we've decided to reduce our token's total supply from 10 trillion. Your input is essential in determining the new total supply. Please cast your vote on the most suitable option for our token. Thank you for your valuable participation!"
          values={[
            { value: 0, title: "100 Million" },
            { value: 1, title: "500 Million" },
            { value: 2, title: "1 Billion" },
            { value: 3, title: "5 Billion" },
            { value: 4, title: "10 Billion" },
          ]}
          selected={2}
          pills={["Relaunch", "Supply"]}
          discussions="https://forum.kenshi.io/t/poll-kenshi-token-new-supply/71"
          finished
        />
      </Column>
      <Column lg={8} md={6} sm={4}>
        <Choice
          poll="6412410e4e7872b2a336b113"
          title="Kenshi Token New Chain"
          question="Which blockchain should we deploy our token on? This will be our token's primary chain."
          body="Dear users, we are excited to have you as part of our growing community! As we prepare to re-launch our token, we'd like to hear your thoughts on which blockchain we should deploy it on. Your feedback will help us make a well-informed decision that best serves the needs of our users."
          values={[
            { value: 0, title: "Ethereum" },
            { value: 1, title: "Avalanche" },
            { value: 2, title: "Arbitrum" },
            { value: 3, title: "Polygon" },
            { value: 4, title: "Fantom" },
          ]}
          pills={["Relaunch", "Chain"]}
          discussions="https://forum.kenshi.io/t/poll-kenshi-token-new-chain/67"
          finished
        />
      </Column>
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
          pills={["Community", "Engagement"]}
          finished
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
