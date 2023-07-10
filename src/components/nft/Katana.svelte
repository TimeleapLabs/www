<script>
  import { Tile, Tag } from "carbon-components-svelte";
  import { SoftwareResourceCluster } from "carbon-icons-svelte";
  import { CategoryNewEach } from "carbon-icons-svelte";
  import { Row as RowIcon, TypePattern } from "carbon-icons-svelte";
  import { fade } from "svelte/transition";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";

  export let nft;
  export let available = null;

  const getRarity = (rarity) => {
    if (rarity <= 1) {
      return { name: "Frequent Find", color: "gray" };
    } else if (rarity <= 5) {
      return { name: "Uncommon Unearth", color: "cyan" };
    } else if (rarity <= 50) {
      return { name: "Scarce Stumble", color: "blue" };
    } else if (rarity <= 150) {
      return { name: "Rare Reveal", color: "purple" };
    } else {
      return { name: "Exclusive Encounter", color: "magenta" };
    }
  };

  const colorsByTier = {
    "Iron Forge": "gray",
    "Silver Glint": "blue",
    "Dragon's Flame": "purple",
    "Legendary Blade": "magenta",
    "Starforged Vanguard": "red",
  };

  const getTypeColor = (type) => {
    if (type === "Katana" || type === "Great Sword") {
      return "teal";
    }
    return "gray";
  };

  const parsedNft = {
    ...nft,
    rarity: { score: nft.rarity, ...getRarity(nft.rarity) },
    metadata: {
      ...nft.metadata,
      attributes: Object.fromEntries(
        nft.metadata.attributes.map((attr) => [
          attr.trait_type.toLowerCase(),
          attr.value,
        ])
      ),
    },
  };
</script>

<div class="katana" transition:fade={{ duration: 500 }}>
  <img src={parsedNft.metadata.image} alt={parsedNft.metadata.name} />
  <Tile>
    <div class="title">
      <ExpressiveHeading size={3}>
        <h4>{parsedNft.metadata.name}</h4>
      </ExpressiveHeading>
    </div>
    <div class="tags">
      {#if available}
        <Tag type="green">Available</Tag>
      {/if}
      <Tag icon={CategoryNewEach}>
        {parsedNft.metadata.attributes.collection}
      </Tag>
      <Tag
        icon={TypePattern}
        type={getTypeColor(parsedNft.metadata.attributes.type)}
      >
        {parsedNft.metadata.attributes.type}
      </Tag>
      <Tag icon={SoftwareResourceCluster} type={parsedNft.rarity.color}>
        {parsedNft.rarity.name}
      </Tag>
      <Tag
        icon={RowIcon}
        type={colorsByTier[parsedNft.metadata.attributes.tier]}
      >
        {parsedNft.metadata.attributes.tier}
      </Tag>
    </div>
  </Tile>
</div>

<style>
  .katana {
    display: flex;
    flex-direction: column;
  }
  .katana img {
    max-width: 100%;
  }
  .katana .title {
    margin-bottom: 1em;
    margin-left: 0.5em;
  }
</style>
