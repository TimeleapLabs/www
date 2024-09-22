<script>
  import "@carbon/charts-svelte/styles.css";

  import DefaultTags from "src/components/seo/DefaultTags.svelte";
  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import Footer from "src/components/Footer.svelte";
  import AdaptiveProductIcon from "src/components/AdaptiveProductIcon.svelte";
  import Sworn from "src/icons/Sworn.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import {
    Grid,
    Row,
    Column,
    InlineNotification,
    Tile,
    OutboundLink,
    ClickableTile,
    TextInput,
    DatePicker,
    DatePickerInput,
  } from "carbon-components-svelte";

  import { Button, Content } from "carbon-components-svelte";
  import { Book, ArrowRight, AddAlt, AlarmAdd } from "carbon-icons-svelte";
  import { DataTable, Tag } from "carbon-components-svelte";

  import { toast } from "@zerodevx/svelte-toast";
  import { onboard } from "src/lib/onboard";
  import { onMount } from "svelte";
  import { wallet } from "src/stores/wallet";
  import { ethers } from "ethers";

  import kenshiAbi from "$lib/abi/kenshi";
  import unchainedAbi from "$lib/abi/unchained";

  const knsAddr = "0x1A7df589775579C4BE3cE40dE56B4e11eBB3840c";
  const posAddr = "0x54550AAfe0df642fbcAde11174250542D0d5FE54";

  let pos;
  let kns;
  let userAddress;
  let userBalance = ethers.BigNumber.from(0);
  let userStake;

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
    pos = new ethers.Contract(posAddr, unchainedAbi, signer);
    kns = new ethers.Contract(knsAddr, kenshiAbi, signer);

    userBalance = await kns.balanceOf(userAddress);

    if (userBalance.gt(0)) {
      stake.amount = ethers.utils.formatUnits(userBalance, 18);
    }
  };

  $: if ($wallet) setAddress();

  const readUserStake = async () => {
    userStake = await pos.getStake(userAddress);
  };

  $: if (pos && userAddress) {
    readUserStake();
  }

  onMount(async () => {
    const stakeInterval = setInterval(readUserStake, 60000);
    return () => clearInterval(stakeInterval);
  });

  const stake = {
    amount: "0",
    error: "",
  };

  const approve = async (stakeAmount) => {
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
      const tx = await pos.stake(stakeAmount, stakeDuration, []);
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

    if (stakeAmount.lte(0)) {
      toast.push("Please provide a valid stake amount.");
      return;
    }

    if (!(await switchToArb())) return;
    if (!(await approve(stakeAmount))) return;

    try {
      const tx = await pos.increaseStake(stakeAmount, []);
      await tx.wait();
    } catch (error) {
      toast.push("Couldn't increase the stake.");
      return;
    }

    toast.push("Stake increased successfully.");
    readUserStake();
  };

  const extendStake = async () => {
    const currentUnlock = userStake.end;
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
</script>

<DefaultTags
  description="Unchained is a decentralized, federated network for data validation. Unchained nodes work to validate data together and are rewarded in KNS tokens."
  title="Timeleap — Unchained"
  image="/images/social.unchained.png"
/>

<Content class="gap">
  <Grid padding>
    <Row>
      <Column xlg={8} md={6} sm={4}>
        <div class="description">
          <div class="title">
            <Tag type="red">Testnet</Tag>
            <ExpressiveHeading size={4}>
              Unchained PoS Manager
            </ExpressiveHeading>
          </div>

          <p>
            Unchained PoS Manager is your dashboard to manage your voting power
            in the Unchained network. Use this dashboard to stake KNS or Katana,
            extend or increase your stake.
          </p>
          <div class="buttons">
            <Button href="/docs/unchained" icon={Book}>Learn More</Button>
            <ConnectButton primary />
          </div>
        </div>
      </Column>
      <Column xlg={3} md={2} sm={4}>
        <AdaptiveProductIcon
          product="unchained"
          alt="Kenshi Unchained"
          width={"240px"}
        />
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
    {#if $wallet?.provider}
      <Row>
        <Column lg={8}>
          <Tile>
            <ExpressiveHeading size={2}>Stake</ExpressiveHeading>

            <Row>
              <Column>
                <TextInput
                  bind:value={stake.amount}
                  placeholder="0"
                  labelText="Stake amount"
                  helperText="Enter the amount of KNS tokens you want to stake."
                />
              </Column>
              <Column>
                <DatePicker datePickerType="single" bind:value={stake.until}>
                  <DatePickerInput
                    placeholder="Unlock date"
                    labelText="Choose a date"
                    helperText="Select the date when you want to unlock your stake."
                  />
                </DatePicker>
              </Column>
            </Row>
            <div class="form-buttons">
              <Button on:click={extendStake} icon={AlarmAdd}>Extend</Button>
              <Button on:click={increaseStake} icon={AddAlt}>Increase</Button>
              <Button on:click={performStake} icon={ArrowRight}>Stake</Button>
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
                { key: "unlock", value: "Unlock" },
              ]}
              rows={[
                {
                  id: 1,
                  amount: ethers.utils.formatUnits(userStake.amount, 18),
                  unlock: userStake.end,
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
                {#if cell.key === "unlock"}
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
    {:else}
      <InlineNotification
        kind="info"
        title="Connect your wallet"
        subtitle="To use the Unchained PoS Manager, you need to connect your wallet."
      />
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
    margin-top: 2em;
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
  .title {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }
</style>
