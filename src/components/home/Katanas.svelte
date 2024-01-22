<script>
  import { Grid, Row, Column, Button } from "carbon-components-svelte";
  import { Renew, Image, IntentRequestCreate } from "carbon-icons-svelte";
  import ExpressiveHeading from "../carbon/ExpressiveHeading.svelte";

  import Katana from "../nft/Katana.svelte";
  import { onMount } from "svelte";

  let nfts = [];
  let show;

  const random = () => {
    show = Math.floor(Math.random() * nfts.length);
  };

  onMount(async () => {
    nfts = await fetch("https://nft.kenshi.io/katana/data.json")
      .then((res) => res.json())
      .catch(() => []);
    random();
  });
</script>

{#if nfts.length && show >= 0}
  <Grid padding>
    <Row>
      <Column>
        <div class="description">
          <ExpressiveHeading size={5}>
            <h2>Kenshi Katana NFT Collection</h2>
          </ExpressiveHeading>
          <p class="body-02">
            In the age of the Shogunate, the Kenshi were the revered guardians
            of balance, each trained in the ancient arts of combat and strategy.
            Their weapon, the Katana, was a symbol of honor, valor, and duty.
            Forged with precision and imbued with spiritual energy, these swords
            became extensions of the Kenshi themselves.<br /><br />
            Get exclusive community boosts and product discounts by holding a Kenshi
            Katana NFT.
          </p>
          <div class="buttons">
            <Button icon={Renew} on:click={random}>See another</Button>
            <Button href="/nft/katana" icon={IntentRequestCreate}>Mint</Button>
            <Button href="/nft/katana" icon={Image}>Catalogue</Button>
          </div>
        </div>
      </Column>
      <Column xlg={7}>
        <div class="nft">
          {#key show}
            <Katana nft={nfts[show]} />
          {/key}
        </div>
      </Column>
    </Row>
  </Grid>
{/if}

<style>
  p {
    margin-top: 2em;
    flex: 1;
  }
  .description {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .buttons {
    margin-top: 1em;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
  }
  .nft {
    display: grid;
  }
  .nft :global(.katana) {
    grid-column: 1;
    grid-row: 1;
  }
</style>
