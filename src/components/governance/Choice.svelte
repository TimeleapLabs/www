<script>
  import ExpressiveHeading from "../carbon/ExpressiveHeading.svelte";

  import { Tile, RadioTile, TileGroup } from "carbon-components-svelte";
  import { Grid, Column, Row } from "carbon-components-svelte";
  import { ProgressBar, Tag } from "carbon-components-svelte";
  import { wallet } from "src/stores/wallet";
  import { ethers } from "ethers";
  import { toast } from "@zerodevx/svelte-toast";

  export let poll;
  export let body;
  export let title;
  export let pills;
  export let values;

  let userAddress;
  let selected;
  let provider;
  let votes = {};

  const abi = ["function balanceOf(address user) view returns (uint256)"];
  const address = "0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f";

  const processVoteData = async (data) => {
    const contract = new ethers.Contract(address, abi, provider);
    const computed = {};

    let total = ethers.BigNumber.from(0);

    for (const { user, vote } of data) {
      const balance = await contract.balanceOf(user);
      computed[vote] ||= ethers.BigNumber.from(0);
      computed[vote] = computed[vote].add(balance);
      total = total.add(balance);
    }

    if (total.toString() === "0") {
      return;
    }

    for (const key in computed) {
      computed[key] = computed[key].mul(10000).div(total).toNumber() / 100;
    }

    votes = computed;
  };

  const fetchResults = async () => {
    const res = await fetch(`https://api.kenshi.io/governance/${poll}`);
    const data = await res.json();
    processVoteData(data);
  };

  const sendVote = async (vote) => {
    const message = JSON.stringify({ vote, user: userAddress, poll });
    const signer = provider.getSigner(userAddress);
    const signature = await signer.signMessage(message);
    const req = await fetch(`https://api.kenshi.io/governance/${poll}`, {
      method: "POST",
      body: JSON.stringify({ vote, user: userAddress, poll, signature }),
    });
    if (req.ok) {
      toast.push("Vote submitted!");
    } else {
      const res = await req.text();
      throw new Error(res);
    }
    fetchResults();
  };

  const onSelect = async ({ detail }) => {
    if (!userAddress || !provider) {
      return toast.push("You need to connect your wallet first");
    }
    try {
      await sendVote(detail);
      selected = detail;
    } catch (error) {
      toast.push(error.message);
    }
  };

  const onWallet = async () => {
    provider = new ethers.providers.Web3Provider($wallet.provider);
    userAddress = await provider.getSigner().getAddress();
    fetchResults();
  };

  $: if ($wallet?.provider) onWallet();
</script>

<Tile>
  <ExpressiveHeading>
    <h3>{title}</h3>
  </ExpressiveHeading>
  <div class="body">
    {body}
  </div>
  <Grid noGutter>
    <Row>
      <Column>
        <TileGroup on:select={onSelect} class="grid">
          {#each values as { value, title }}
            <RadioTile light {value} checked={selected === value}>
              {#if Object.keys(votes).length > 0}
                <ProgressBar
                  value={votes[value] || 0}
                  labelText={title}
                  helperText={`${votes[value] || 0}% voted for this`}
                />
              {:else}
                {title}
              {/if}
            </RadioTile>
          {/each}
        </TileGroup>
      </Column>
    </Row>
  </Grid>
  <div class="tags">
    {#each pills as pill}
      <Tag>{pill}</Tag>
    {/each}
  </div>
</Tile>

<style>
  .body {
    margin-top: 2em;
    margin-bottom: 1em;
  }
</style>
