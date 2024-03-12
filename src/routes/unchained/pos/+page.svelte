<script>
  import "@carbon/charts-svelte/styles.css";

  import DefaultTags from "src/components/seo/DefaultTags.svelte";
  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import Chartjs from "src/components/chartjs/Chartjs.svelte";
  import colors from "src/components/chartjs/colors.js";
  import formatThousands from "format-thousands";
  import Footer from "src/components/Footer.svelte";
  import Unchained from "src/icons/Unchained.svelte";
  import Sworn from "src/icons/Sworn.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import {
    Grid,
    Row,
    Column,
    ProgressBar,
    Tile,
    OutboundLink,
    ClickableTile,
    TextInput,
    DatePicker,
    DatePickerInput,
  } from "carbon-components-svelte";

  import { Button, Content } from "carbon-components-svelte";
  import { Book, ArrowRight, AddAlt, AlarmAdd } from "carbon-icons-svelte";

  import {
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Pagination,
    MultiSelect,
  } from "carbon-components-svelte";

  import { theme } from "src/stores/theme";
  import { recoverAddress, addressFromShake } from "$lib/base32";
  import { toast } from "@zerodevx/svelte-toast";
  import { onboard } from "src/lib/onboard";
  import { onMount } from "svelte";
  import { wallet } from "src/stores/wallet";
  import { ethers } from "ethers";
  import { Buffer } from "buffer";

  import kenshiAbi from "$lib/abi/kenshi";
  import katanaAbi from "$lib/abi/katana";
  import unchainedAbi from "$lib/abi/unchained";

  const nftAddr = "0x14f1A0788c5EF3e1E8Eae4D7f4a1cd1fe9a6eA3b";
  const knsAddr = "0x540aE1165d4b6Bc50d293F38A0FD495979b8F21A";
  const posAddr = "0xdA36f22C0Dab89CA0884489Bf3a00c0C27cEDbec";

  let nft;
  let pos;
  let kns;
  let nfts = [];
  let userAddress;
  let userBalance = ethers.BigNumber.from(0);
  let userNfts = [];
  let userStake;
  let userBls;

  const switchToArb = async () => {
    try {
      await onboard.setChain({ chainId: "0x66eee" });
      return true;
    } catch (error) {
      toast.push("Couldn't change to the Arbitrum network.");
      return false;
    }
  };

  const setAddress = async () => {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner($wallet.accounts?.[0]?.address);

    if (!switchToArb()) return;

    userAddress = await signer.getAddress();
    nft = new ethers.Contract(nftAddr, katanaAbi, signer);
    pos = new ethers.Contract(posAddr, unchainedAbi, signer);
    kns = new ethers.Contract(knsAddr, kenshiAbi, signer);

    userBalance = await kns.balanceOf(userAddress);

    if (userBalance.gt(0)) {
      stake.amount = ethers.utils.formatUnits(userBalance, 18);
    }

    userBls = await pos.blsAddressOf(userAddress);

    if (userBls !== "0x" + "0".repeat(40)) {
      const buf = Buffer.from(userBls.slice(2), "hex");
      bls.key = addressFromShake(buf);
    }
  };

  $: if ($wallet) setAddress();

  const readUserNfts = async () => {
    const bigNfts = await nft.tokensOfOwner(userAddress);
    userNfts = bigNfts.map((n) => parseInt(n));
  };

  const readUserStake = async () => {
    userStake = await pos["stakeOf(address)"](userAddress);
  };

  $: if (nft && userAddress) {
    readUserNfts();
  }

  $: if (pos && userAddress) {
    readUserStake();
  }

  onMount(async () => {
    nfts = await fetch("https://nft.kenshi.io/katana/data.json")
      .then((res) => res.json())
      .catch(() => []);

    const stakeInterval = setInterval(readUserStake, 60000);
    return () => clearInterval(stakeInterval);
  });

  const bls = {
    key: "",
    hex: "",
    error: "",
  };

  $: if (bls.key) {
    try {
      bls.hex = "0x" + recoverAddress(bls.key).toString("hex");
      bls.error = "";
    } catch (error) {
      bls.error = error.message;
    }
  }

  const stake = {
    amount: "0",
    nftIds: [],
    error: "",
  };

  const approve = async (stakeAmount) => {
    try {
      const areNftsApproved = await nft.isApprovedForAll(userAddress, posAddr);

      if (!areNftsApproved) {
        const tx = await nft.setApprovalForAll(posAddr, true);
        await tx.wait();
      }
    } catch (error) {
      toast.push("Couldn't approve the stake.");
      return false;
    }

    try {
      const alreadyApproved = await kns.allowance(userAddress, posAddr);

      if (alreadyApproved.lt(stakeAmount)) {
        const tx = await kns.approve(posAddr, stakeAmount);
        await tx.wait();
      }
    } catch (error) {
      toast.push("Couldn't approve the stake.");
      return false;
    }

    return true;
  };

  const performStake = async () => {
    const stakeAmount = ethers.utils.parseUnits(stake.amount, 18);
    const stakeUnlock = Math.floor(new Date(stake.until) / 1000);
    const stakeDuration = stakeUnlock - Math.floor(Date.now() / 1000);
    const stakeNfts = stake.nftIds;

    if (stakeAmount.lte(0) && stakeNfts.length === 0) {
      toast.push("Please provide a valid stake amount.");
      return;
    }

    if (stakeDuration <= 0) {
      toast.push("The unlock date must be in the future.");
      return;
    }

    if (!(await switchToArb())) return;
    if (!(await approve(stakeAmount))) return;

    try {
      const tx = await pos.stake(stakeDuration, stakeAmount, stakeNfts, false);
      await tx.wait();
    } catch (error) {
      toast.push("Couldn't perform the stake.");
      return;
    }

    toast.push("Stake performed successfully.");
    readUserStake();
  };

  const increaseStake = async () => {
    const stakeAmount = ethers.utils.parseUnits(stake.amount, 18);
    const stakeNfts = stake.nftIds;

    if (stakeAmount.lte(0) && stakeNfts.length === 0) {
      toast.push("Please provide a valid stake amount.");
      return;
    }

    if (!(await switchToArb())) return;
    if (!(await approve(stakeAmount))) return;

    try {
      const tx = await pos.increaseStake(stakeAmount, stakeNfts);
      await tx.wait();
    } catch (error) {
      toast.push("Couldn't increase the stake.");
      return;
    }

    toast.push("Stake increased successfully.");
    readUserStake();
  };

  const extendStake = async () => {
    const currentUnlock = userStake.unlock;
    const newUnlock = Math.floor(new Date(stake.until) / 1000);
    const stakeDuration = newUnlock - currentUnlock;

    if (stakeDuration <= 0) {
      toast.push("The new unlock date must be later than the current unlock.");
      return;
    }

    if (!(await switchToArb())) return;

    try {
      const tx = await pos.extend(stakeDuration);
      await tx.wait();
    } catch (error) {
      toast.push("Couldn't extend the stake.");
      return;
    }

    toast.push("Stake extended successfully.");
    readUserStake();
  };

  const registerBls = async () => {
    if (!bls.key) {
      toast.push("Please provide a BLS address.");
      return;
    }

    if (bls.error) {
      toast.push("The BLS address is invalid.");
      return;
    }

    if (!(await switchToArb())) return;

    try {
      const tx = await pos.setBlsAddress(bls.hex);
      await tx.wait();
    } catch (error) {
      toast.push("Couldn't register the BLS address.");
      return;
    }

    toast.push("BLS address registered successfully.");
  };
</script>

<DefaultTags
  description="Unchained is a decentralized, peer-to-peer network for data validation. Unchained nodes work to validate data together and are rewarded in KNS tokens."
  title="Kenshi — Unchained"
  image="/images/social.unchained.png"
/>

<Content class="gap">
  <Grid padding>
    <Row>
      <Column xlg={8} sm={4}>
        <div class="description">
          <ExpressiveHeading size={4}>Unchained PoS Manager</ExpressiveHeading>
          <p>
            Unchained PoS Manager is your dashboard to manage your voting power
            in the Unchained network. Use this dashboard to stake KNS or Katana,
            extend or increase your stake, register your Unchained BLS address,
            or register your multi-sig address.
          </p>
          <div class="buttons">
            <Button href="/docs/unchained" icon={Book}>Learn More</Button>
            <ConnectButton primary />
          </div>
        </div>
      </Column>
      <Column xlg={8} sm={4}>
        <div class="unchained">
          <Unchained
            textColor={$theme === "white" ? "#000" : "#ccc"}
            color={$theme === "white" ? "#333" : "#000"}
          />
        </div>
      </Column>
    </Row>
    <Row>
      <Column>
        <ClickableTile
          href="https://opencollective.com/unchained"
          target="_blank"
        >
          <ExpressiveHeading size={2}>Sponsor Unchained</ExpressiveHeading>
          <div class="open-collective">
            Learn more about sponsorship and support the project on our
            <OutboundLink href="https://opencollective.com/unchained">
              OpenCollective.
            </OutboundLink>
          </div>
        </ClickableTile>
      </Column>
      <Column>
        <ExpressiveHeading size={2}>Partners</ExpressiveHeading>
        <div class="partners">
          <OutboundLink href="https://sworn.network/">
            <Sworn />
          </OutboundLink>
        </div>
      </Column>
    </Row>
    <Row>
      <Column>
        <Tile>
          <ExpressiveHeading size={2}>Stake</ExpressiveHeading>

          <Row>
            <Column lg={9} md={6}>
              <TextInput
                bind:value={stake.amount}
                placeholder="0"
                labelText="Stake amount"
              />
            </Column>
            <Column>
              <DatePicker datePickerType="single" bind:value={stake.until}>
                <DatePickerInput
                  placeholder="Unlock date"
                  labelText="Choose a date"
                />
              </DatePicker>
            </Column>
          </Row>
          <Row>
            <Column>
              {#if nfts.length > 0}
                <div class="nft-select">
                  <MultiSelect
                    bind:selectedIds={stake.nftIds}
                    titleText="NFTs"
                    label="Select NFTs to stake"
                    items={userNfts.map((id) => ({
                      ...nfts[id],
                      text: nfts[id].metadata.name,
                      id,
                    }))}
                    let:item
                  >
                    <div class="nft">
                      <div>
                        <strong>
                          {item.metadata.name}
                        </strong>
                        <div>
                          NFT ID: {item.id}
                        </div>
                      </div>
                      <img
                        src={item.metadata.image}
                        alt={item.metadata.name}
                        width="100"
                      />
                    </div>
                  </MultiSelect>
                </div>
              {/if}
            </Column>
          </Row>
          <div class="form-buttons">
            <Button on:click={extendStake} icon={AlarmAdd}>Extend</Button>
            <Button on:click={increaseStake} icon={AddAlt}>Increase</Button>
            <Button on:click={performStake} icon={ArrowRight}>Stake</Button>
          </div>
        </Tile>
      </Column>
      <Column>
        <Tile>
          <ExpressiveHeading size={2}>Register BLS Address</ExpressiveHeading>
          <Row>
            <Column>
              <TextInput
                bind:value={bls.key}
                placeholder="Your Unchained BLS address"
                labelText="Unchained address"
                invalidText={bls.error}
                invalid={bls.error.length > 0}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <TextInput
                bind:value={bls.hex}
                placeholder="0x..."
                labelText="Hex"
                readonly
              />
            </Column>
          </Row>
          <div class="form-buttons">
            <Button on:click={registerBls} icon={ArrowRight}>Register</Button>
          </div>
        </Tile>
      </Column>
    </Row>
    {#if userStake}
      <Row>
        <Column>
          <DataTable
            headers={[
              { key: "amount", value: "Amount" },
              { key: "nftIds", value: "NFTs" },
              { key: "unlock", value: "Unlock" },
            ]}
            rows={[
              {
                id: 1,
                amount: ethers.utils.formatUnits(userStake.amount, 18),
                nftIds: userStake.nftIds,
                unlock: userStake.unlock,
              },
            ]}
          >
            <svelte:fragment slot="title">
              <ExpressiveHeading size={2}>Your Stake</ExpressiveHeading>
            </svelte:fragment>
            <span slot="description">
              Your current stake in the Unchained network.
            </span>
            <svelte:fragment slot="cell" let:row let:cell>
              {#if cell.key === "nftIds"}
                {#each cell.value as nftId}
                  <img
                    src={nfts[nftId].metadata.image}
                    alt={nfts[nftId].metadata.name}
                    width="50"
                  />
                {:else}
                  No NFTs
                {/each}
              {:else if cell.key === "unlock"}
                {#if cell.value.eq(0)}
                  Unlocked
                {:else}
                  {new Date(cell.value * 1000).toLocaleString()}
                {/if}
              {:else}
                {cell.value}
              {/if}
            </svelte:fragment>
          </DataTable>
        </Column>
      </Row>
    {/if}
  </Grid>
</Content>

<Footer />

<style>
  .description {
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding-top: 2em;
  }
  .form-buttons {
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
    justify-content: flex-end;
    width: 100%;
  }
  .buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
  }
  .partners :global(a) {
    color: var(--cds-text-01);
  }
  .partners {
    margin-top: 0.5em;
  }
  .nft-select :global(.bx--list-box__menu-item) {
    height: auto;
  }
  .nft-select :global(.bx--list-box__menu-item__option) {
    height: auto;
    padding-right: 0;
  }
  .nft-select :global(.bx--checkbox-label-text) {
    display: block;
  }
  .nft {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
  }
  .nft img {
    border-radius: 5px;
  }
  .nft > div {
    flex: 1;
  }
</style>
