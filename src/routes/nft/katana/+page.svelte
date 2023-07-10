<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column } from "carbon-components-svelte";
  import { Button, Content } from "carbon-components-svelte";

  import { Number_1, Number_3, Number_6, Number_9 } from "carbon-icons-svelte";
  import { SpinLine } from "svelte-loading-spinners";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import Katana from "src/components/nft/Katana.svelte";

  import { inview } from "svelte-inview";
  import { wallet } from "src/stores/wallet.js";
  import { onboard } from "$lib/onboard.js";
  import { ethers } from "ethers";
  import { toast } from "@zerodevx/svelte-toast";
  import { onMount } from "svelte";

  import DefaultTags from "src/components/seo/DefaultTags.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import katana from "$lib/abi/katana.js";

  export let data;

  let pageSize = 24;
  let page = 1;
  let userNfts = [];
  let available = [];
  let userAddress;

  const contractAddr = "";

  let minting = false;

  $: if ($wallet?.provider) {
    fetchUserNfts();
    fetchAvailable();
  }

  const mintOne = async () => {
    minting = true;
    try {
      await onboard.setChain({ chainId: "0xa4b1" });
    } catch (error) {
      toast.push("Couldn't change to the Arbitrum network.");
      minting = false;
      return null;
    }

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    const contract = new ethers.Contract(contractAddr, katana, signer);

    try {
      const tx = await contract.mintRandom(userAddress, {
        value: ethers.utils.parseEther("0.15"),
      });
      await tx.wait(1);
      toast.push("Minting was successful.");
      toast.push(
        "Your NFT will show on this page once the oracle finishes processing your request."
      );
    } catch (error) {
      toast.push("There was an issue minting the NFT!");
    }

    minting = false;
  };

  const mintMany = (n) => async () => {
    minting = true;
    try {
      await onboard.setChain({ chainId: "0xa4b1" });
    } catch (error) {
      toast.push("Couldn't change to the Arbitrum network.");
      minting = false;
      return null;
    }

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    const contract = new ethers.Contract(contractAddr, katana, signer);

    try {
      const tx = await contract.batchMintRandom(userAddress, n, {
        value: ethers.utils.parseEther("0.15").mul(n),
      });
      await tx.wait(1);
      toast.push("Minting was successful.");
      toast.push(
        "Your NFTs will show on this page once the oracle finishes processing your request."
      );
    } catch (error) {
      toast.push("There was an issue minting the NFT!");
    }

    minting = false;
  };

  const fetchUserNfts = async () => {
    if (!$wallet?.provider) {
      return;
    }

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner();
    const user = await signer.getAddress();

    const contract = new ethers.Contract(contractAddr, katana, signer);
    const nfts = await contract.tokensOfOwner(user);
    userNfts = [...nfts].reverse();

    if (user !== userAddress) {
      userAddress = user;
    }
  };

  const fetchAvailable = async () => {
    if (!$wallet?.provider) {
      return;
    }

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const contract = new ethers.Contract(contractAddr, katana, provider);
    const nfts = await contract.getAvailable();

    available = [...nfts].map((n) => parseInt(n));
  };

  onMount(() => {
    const interval = setInterval(fetchUserNfts, 12000);
    return () => clearInterval(interval);
  });

  const enumerate = (arr) => arr.map((item, index) => [item, index]);
</script>

<DefaultTags
  title="Kenshi — Katana NFT"
  description={[
    "In the age of the Shogunate, the Kenshi were the revered guardians of",
    "balance, each trained in the ancient arts of combat and strategy.",
    "Their weapon, the Katana, was a symbol of honor, valor, and duty.",
    "Forged with precision and imbued with spiritual energy, these swords",
    "became extensions of the Kenshi themselves.",
  ].join(" ")}
/>

<Content>
  <Grid padding>
    <Row>
      <Column xlg={8}>
        <ExpressiveHeading size={5}>
          <h1>The Kenshi Katana</h1>
        </ExpressiveHeading>
        <p class="body-02">
          In the age of the Shogunate, the Kenshi were the revered guardians of
          balance, each trained in the ancient arts of combat and strategy.
          Their weapon, the Katana, was a symbol of honor, valor, and duty.
          Forged with precision and imbued with spiritual energy, these swords
          became extensions of the Kenshi themselves.
        </p>
        <p class="body-02">
          Today, the Kenshi and their Katanas come to life through stunning
          digital artistry in this one-of-a-kind NFT collection. Every Kenshi
          Katana NFT is not just a token of ownership, but a virtual embodiment
          of the timeless values that these warriors stood for - honor, courage,
          and wisdom. As a holder, you are not only a collector but also a
          custodian of this rich history and mythology.
        </p>
        {#if contractAddr}
          <div class="buttons">
            {#if !$wallet?.provider}
              <ConnectButton primary />
            {:else}
              <Button disabled={minting} on:click={mintOne} icon={Number_1}>
                {#if minting}
                  <SpinLine
                    size="32"
                    color="currentColor"
                    unit="px"
                    duration="4s"
                  />
                  Minting
                {:else}
                  Mint One
                {/if}
              </Button>
              <Button disabled={minting} on:click={mintMany(3)} icon={Number_3}>
                {#if minting}
                  <SpinLine
                    size="32"
                    color="currentColor"
                    unit="px"
                    duration="4s"
                  />
                  Minting
                {:else}
                  Mint Three
                {/if}
              </Button>
              <Button disabled={minting} on:click={mintMany(6)} icon={Number_6}>
                {#if minting}
                  <SpinLine
                    size="32"
                    color="currentColor"
                    unit="px"
                    duration="4s"
                  />
                  Minting
                {:else}
                  Mint Six
                {/if}
              </Button>
              <Button disabled={minting} on:click={mintMany(9)} icon={Number_9}>
                {#if minting}
                  <SpinLine
                    size="32"
                    color="currentColor"
                    unit="px"
                    duration="4s"
                  />
                  Minting
                {:else}
                  Mint Nine
                {/if}
              </Button>
            {/if}
          </div>
        {:else}
          Coming soon.
        {/if}
      </Column>
    </Row>

    {#if userNfts.length}
      <Row>
        <Column>
          <ExpressiveHeading size={2}>
            <h2>Your Collection</h2>
          </ExpressiveHeading>
        </Column>
      </Row>
      <Row>
        {#key userAddress}
          {#each userNfts as nftId}
            <Column xlg={8} md={12}>
              <Katana nft={data.nfts[parseInt(nftId)]} />
            </Column>
          {/each}
        {/key}
      </Row>
    {/if}

    <Row>
      <Column>
        <ExpressiveHeading size={2}>
          <h2>Catalogue</h2>
        </ExpressiveHeading>
      </Column>
    </Row>
    <Row>
      {#each enumerate(data.nfts.slice(0, page * pageSize)) as [nft, index]}
        <Column xlg={8} md={12}>
          <Katana {nft} available={available.includes(index)} />
        </Column>
      {/each}
    </Row>
  </Grid>
  <div use:inview on:inview_enter={() => page++} />
</Content>

<Footer />

<style>
  p {
    margin-top: 1em;
  }
  .buttons {
    margin-top: 2em;
  }
</style>
