<script>
  import Footer from "src/components/Footer.svelte";

  import { wallet } from "src/stores/wallet";
  import { onMount } from "svelte";
  import { ethers } from "ethers";

  import ConnectButton from "src/components/ConnectButton.svelte";
  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";

  import { Grid, Row, Column, Content } from "carbon-components-svelte";
  import { Tile } from "carbon-components-svelte";
  import { Button, Link } from "carbon-components-svelte";
  import { Breadcrumb, BreadcrumbItem } from "carbon-components-svelte";
  import { WifiBridgeAlt, Book, MagicWand } from "carbon-icons-svelte";
  import { onboard } from "$lib/onboard";
  import { toast } from "@zerodevx/svelte-toast";

  import bridgeAbi from "$lib/abi/bridge";
  import { chainIcons, chainNames } from "src/lib/chains";

  import {
    DataTable,
    Toolbar,
    ToolbarMenu,
    ToolbarMenuItem,
    ToolbarContent,
    ToolbarSearch,
    Pagination,
  } from "carbon-components-svelte";

  const bridgeAddr = "0xbAA748cFCB836380d9C4bE618718F829FFAb61bb";

  let userAddress;

  const setAddress = async () => {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner($wallet.accounts?.[0]?.address);
    userAddress = await signer.getAddress();
  };

  $: if ($wallet) setAddress();

  const headers = [
    { key: "fromChain", value: "Source" },
    { key: "toChain", value: "Destination" },
    { key: "amount", value: "Amount" },
    { key: "signatures", value: "Signatures" },
    { key: "actions", value: "Actions" },
  ];

  let userRequests = [];
  let pageSize = 5;
  let page = 1;
  let filteredRowIds = [];

  const getUserRequests = async () => {
    const query = `{
      getEntries(recipient: "${userAddress}") {
        request {
          fromChain
          toChain
          operators
          recipient
          amount
          nonce
        }
        signatures {
          signer
          signature
        }
      }
    }`;

    const response = await fetch("https://api.kenshi.io/pegswap", {
      method: "POST",
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    userRequests = result.data?.getEntries?.map(
      ({ request, signatures }, id) => ({
        ...request,
        id,
        signatures,
      })
    );
  };

  $: if (userAddress) {
    getUserRequests();
  }

  onMount(() => {
    const interval = setInterval(getUserRequests, 60 * 1000);
    return () => clearInterval(interval);
  });

  const chainIdToName = {
    "0x01": "ethereum-mainnet",
    "0xa4b1": "arbitrum-mainnet",
  };

  const uniqueSignatures = (sigs) =>
    [...new Set(sigs.map((sig) => sig.signer))].length;

  const claim = (id) => async (event) => {
    event.preventDefault();
    const { signatures, ...request } = userRequests[id];

    const signatureMap = Object.fromEntries(
      signatures.map(({ signer, signature }) => {
        const { r, s, v } = ethers.utils.splitSignature(signature);
        return [signer, { r, s, v }];
      })
    );

    try {
      await onboard.setChain({ chainId: request.toChain.replace("0x0", "0x") });
    } catch (error) {
      return toast.push("Couldn't change to the source network.");
    }

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner();

    const bridgeContract = new ethers.Contract(bridgeAddr, bridgeAbi, signer);
    const isClaimed = await bridgeContract.isClaimed(
      request.fromChain,
      request.nonce
    );

    if (isClaimed) {
      return toast.push("Already claimed!");
    }

    console.log(
      {
        fromChain: request.fromChain,
        toChain: request.toChain,
        operators: request.operators,
        recipient: request.recipient,
        amount: request.amount,
        nonce: request.nonce,
      },
      request.operators.map((operator) => signatureMap[operator])
    );

    try {
      const tx = await bridgeContract.claim(
        {
          fromChain: request.fromChain,
          toChain: request.toChain,
          operators: request.operators,
          recipient: request.recipient,
          amount: request.amount,
          nonce: request.nonce,
        },
        request.operators.map((operator) => signatureMap[operator])
      );
      await tx.wait(1);
      return toast.push("Claimed successfully.");
    } catch (error) {
      console.log(error);
      return toast.push("Couldn't claim from the bridge.");
    }
  };
</script>

<Content>
  <Grid padding>
    <Row>
      <Column>
        <Breadcrumb>
          <BreadcrumbItem href="/bridge" isCurrentPage>Bridge</BreadcrumbItem>
        </Breadcrumb>
      </Column>
    </Row>

    <Row>
      <Column lg={4}>
        <Tile class="blue-tile">
          <div class="flex-column">
            <ExpressiveHeading size={5}>
              <h1>Bridge</h1>
            </ExpressiveHeading>
            <p>
              The Kenshi cross-chain bridge allows moving KNS tokens from one
              supported chain to another.
            </p>
          </div>
        </Tile>
      </Column>
      <Column>
        <Grid fullWidth>
          <Row>
            <Column>
              <div class="flex-column">
                <ExpressiveHeading size={2}>
                  <h4>+You</h4>
                </ExpressiveHeading>
                <p>
                  Connect your wallet to see pending and past bridge requests.
                </p>
              </div>
            </Column>
          </Row>
          <Row>
            <Column>
              <Button kind="secondary" href="/docs" icon={Book}>
                Documentation
              </Button>
              <ConnectButton primary />
            </Column>
          </Row>
        </Grid>
      </Column>
    </Row>

    <Row>
      <Column>
        <ExpressiveHeading size={3}>
          Your cross-chain transfer requests
        </ExpressiveHeading>
        <div class="helper-text-01">
          Connect your wallet to see your requests.
        </div>
      </Column>
    </Row>

    <Row>
      <Column>
        <DataTable {headers} rows={userRequests} {pageSize} {page} sortable>
          <Toolbar>
            <ToolbarContent>
              <ToolbarSearch persistent shouldFilterRows bind:filteredRowIds />
              <ToolbarMenu>
                <ToolbarMenuItem primaryFocus href="/docs">
                  Documentation
                </ToolbarMenuItem>
              </ToolbarMenu>
              <Button icon={WifiBridgeAlt} href="/bridge/new">Bridge</Button>
            </ToolbarContent>
          </Toolbar>
          <svelte:fragment slot="cell" let:row let:cell>
            {#if cell.key === "actions"}
              <span class="actions">
                <Link icon={MagicWand} href="#claim" on:click={claim(row.id)}>
                  Claim
                </Link>
              </span>
            {:else if cell.key === "amount"}
              {ethers.utils.formatUnits(cell.value.replace("0x0", "0x"))}
            {:else if cell.key === "signatures"}
              {uniqueSignatures(cell.value)}/2
            {:else if cell.key === "fromChain" || cell.key === "toChain"}
              <span class="chain">
                <img
                  src="/images/chains/{chainIcons[
                    chainIdToName[cell.value]
                  ]}.svg"
                  alt={chainNames[chainIdToName[cell.value]]}
                />
                {chainNames[chainIdToName[cell.value]]}
              </span>
            {:else}
              {cell.value}
            {/if}
          </svelte:fragment>
        </DataTable>

        <Pagination
          bind:pageSize
          bind:page
          totalItems={filteredRowIds.length}
          pageSizeInputDisabled
        />
      </Column>
    </Row>
  </Grid>
</Content>

<Footer />

<style>
  .chain img {
    height: 1em;
  }
  .chain {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
  }
  .actions {
    display: flex;
    gap: 1em;
  }
</style>
